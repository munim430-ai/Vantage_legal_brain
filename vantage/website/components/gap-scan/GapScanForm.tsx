"use client";

import { useState, useEffect, useCallback } from "react";
import { QUESTIONS } from "@/lib/gap-scan/questions";
import { calculateScore } from "@/lib/gap-scan/scoring";
import type { GapScanFormData, QuestionAnswer, ScoringResult } from "@/lib/gap-scan/schema";
import { QuestionCard, Q25Card } from "./QuestionGroup";
import ProgressIndicator from "./ProgressIndicator";
import RiskResultCard from "./RiskResultCard";
import LegalDisclaimer from "@/components/layout/LegalDisclaimer";
import VantageField from "@/components/ui/VantageField";
import { inputClass } from "@/components/ui/VantageInput";

const DISTRICT_OPTIONS = [
  "Dhaka", "Gazipur", "Ashulia", "Narayanganj", "Chittagong", "Comilla EPZ", "Other",
];
const WORKER_COUNT_OPTIONS = [
  "Less than 100", "100–500", "501–2,000", "2,001–5,000", "More than 5,000",
];
const ROLE_OPTIONS = [
  "Managing Director", "Director", "Factory Manager", "HR Manager",
  "Compliance Manager", "Admin Manager", "Other",
];
const AUDIT_FRAMEWORKS = [
  "BSCI", "WRAP", "SA8000", "Sedex/SMETA", "SLCP", "Better Work", "RSC",
  "Buyer internal audit", "Unknown",
];

function initAnswers(): QuestionAnswer[] {
  return QUESTIONS.slice(0, 24).map((q) => ({
    questionId: q.id,
    answer: null,
    evidenceNote: "",
  }));
}

function initForm(): GapScanFormData {
  return {
    factory_name: "", factory_address: "", district_zone: "", worker_count_range: "",
    main_products: "", main_buyers: "", audit_frameworks: [],
    contact_name: "", contact_role: "", whatsapp_number: "", email: "",
    decision_maker_present: "",
    upcoming_audit: "", upcoming_audit_date: "", recent_failed_audit: "",
    cap_deadline: "", buyer_pressure: "",
    answers: initAnswers(),
    q25_doc1: "", q25_doc2: "", q25_doc3: "",
  };
}

export default function GapScanForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<GapScanFormData>(initForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ScoringResult | null>(null);
  const [liveScore, setLiveScore] = useState<ScoringResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [storageNotice, setStorageNotice] = useState<{
    message: string;
    variant: "success" | "info" | "warning";
  } | null>(null);

  // Restore from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vantage_gap_scan");
      if (saved) {
        const parsed = JSON.parse(saved) as GapScanFormData;
        setForm(parsed);
      }
    } catch {}
  }, []);

  // Auto-save
  useEffect(() => {
    try {
      localStorage.setItem("vantage_gap_scan", JSON.stringify(form));
    } catch {}
  }, [form]);

  // Live scoring during step 4
  useEffect(() => {
    if (step === 4) {
      setLiveScore(calculateScore(form));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.answers, form.q25_doc1, form.q25_doc2, form.q25_doc3, step]);

  const updateField = useCallback(
    <K extends keyof GapScanFormData>(key: K, value: GapScanFormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        const e = { ...prev };
        delete e[key];
        return e;
      });
    },
    []
  );

  const toggleFramework = (fw: string) => {
    setForm((prev) => {
      const current = prev.audit_frameworks;
      return {
        ...prev,
        audit_frameworks: current.includes(fw)
          ? current.filter((f) => f !== fw)
          : [...current, fw],
      };
    });
  };

  const updateAnswer = (updated: QuestionAnswer) => {
    setForm((prev) => ({
      ...prev,
      answers: prev.answers.map((a) =>
        a.questionId === updated.questionId ? updated : a
      ),
    }));
  };

  const validateStep = (s: number): Record<string, string> => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!form.factory_name.trim()) e.factory_name = "Factory name is required";
      if (!form.factory_address.trim()) e.factory_address = "Factory address is required";
      if (!form.district_zone) e.district_zone = "District is required";
      if (!form.worker_count_range) e.worker_count_range = "Worker count is required";
    }
    if (s === 2) {
      if (!form.contact_name.trim()) e.contact_name = "Your name is required";
      if (!form.contact_role) e.contact_role = "Your role is required";
      if (!form.whatsapp_number.trim()) {
        e.whatsapp_number = "WhatsApp number is required";
      } else if (!/^01\d{9}$/.test(form.whatsapp_number.trim())) {
        e.whatsapp_number = "Enter a valid Bangladesh mobile number (01XXXXXXXXX, 11 digits)";
      }
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        e.email = "Enter a valid email address";
      }
    }
    if (s === 3) {
      if (!form.upcoming_audit) e.upcoming_audit = "Please select an option";
      if (form.upcoming_audit === "yes" && !form.upcoming_audit_date)
        e.upcoming_audit_date = "Please enter the approximate audit date";
      if (!form.recent_failed_audit) e.recent_failed_audit = "Please select an option";
      if (form.recent_failed_audit === "yes" && !form.cap_deadline)
        e.cap_deadline = "Please enter the CAP deadline";
    }
    if (s === 4) {
      const unanswered = form.answers.filter((a) => a.answer === null);
      if (unanswered.length > 0)
        e.questions = `Please answer all questions. ${unanswered.length} question${unanswered.length > 1 ? "s" : ""} remaining.`;
    }
    return e;
  };

  const handleContinue = () => {
    const e = validateStep(step);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const e = validateStep(4);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setSubmitting(true);
    setStorageNotice(null);

    const localScored = calculateScore(form);

    try {
      const res = await fetch("/api/gap-scan/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStorageNotice({
          message:
            "Your score was generated, but the submission could not be stored. Please contact VANTAGE on WhatsApp.",
          variant: "warning",
        });
      } else if (data.stored === true) {
        setStorageNotice({
          message: "Your scan was received. VANTAGE will follow up on WhatsApp.",
          variant: "success",
        });
      } else if (data.success === true && data.stored === false) {
        setStorageNotice({
          message: "Your scan result is shown below. Lead storage is not connected yet.",
          variant: "info",
        });
      } else {
        setStorageNotice({
          message:
            "Your score was generated, but the submission could not be stored. Please contact VANTAGE on WhatsApp.",
          variant: "warning",
        });
      }
    } catch {
      setStorageNotice({
        message:
          "Your score was generated, but the submission could not be stored. Please contact VANTAGE on WhatsApp.",
        variant: "warning",
      });
    } finally {
      setSubmitting(false);
    }

    setResult(localScored);
    localStorage.removeItem("vantage_gap_scan");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        {storageNotice && (
          <div className="mb-6 border-l-4 border-black px-4 py-3 text-sm text-black">
            {storageNotice.message}
          </div>
        )}
        <RiskResultCard
          result={result}
          factoryName={form.factory_name}
          contactName={form.contact_name}
          contactWhatsApp={form.whatsapp_number}
        />
      </div>
    );
  }

  const answeredCount = form.answers.filter((a) => a.answer !== null).length;
  const q25Answered =
    form.q25_doc1.trim() !== "" ||
    form.q25_doc2.trim() !== "" ||
    form.q25_doc3.trim() !== "";
  const totalAnswered = answeredCount + (q25Answered ? 1 : 0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <ProgressIndicator currentStep={step} />
      </div>

      {/* Step 1 — Factory Details */}
      {step === 1 && (
        <div className="space-y-6">
          <LegalDisclaimer variant="full" className="mb-6" />
          <h2 className="text-xl md:text-2xl font-black text-black tracking-tight">
            Step 1 — Factory Details
          </h2>
          <p className="text-sm text-black">
            Tell us about your factory so we can apply the right compliance context to your results.
          </p>

          <VantageField label="Factory name" required error={errors.factory_name}>
            <input
              type="text"
              maxLength={120}
              value={form.factory_name}
              onChange={(e) => updateField("factory_name", e.target.value)}
              className={inputClass(!!errors.factory_name)}
              placeholder="e.g. Kader Knitwear Ltd"
            />
          </VantageField>

          <VantageField label="Factory address" required error={errors.factory_address}>
            <textarea
              maxLength={300}
              rows={2}
              value={form.factory_address}
              onChange={(e) => updateField("factory_address", e.target.value)}
              className={`${inputClass(!!errors.factory_address)} resize-none`}
              placeholder="Full factory address"
            />
          </VantageField>

          <VantageField
            label="District / Industrial zone"
            required
            error={errors.district_zone}
          >
            <select
              value={form.district_zone}
              onChange={(e) => updateField("district_zone", e.target.value)}
              className={inputClass(!!errors.district_zone)}
            >
              <option value="">Select district</option>
              {DISTRICT_OPTIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </VantageField>

          <VantageField
            label="Number of workers"
            required
            error={errors.worker_count_range}
          >
            <select
              value={form.worker_count_range}
              onChange={(e) => updateField("worker_count_range", e.target.value)}
              className={inputClass(!!errors.worker_count_range)}
            >
              <option value="">Select range</option>
              {WORKER_COUNT_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </VantageField>

          <VantageField label="Main products (optional)">
            <input
              type="text"
              maxLength={100}
              value={form.main_products}
              onChange={(e) => updateField("main_products", e.target.value)}
              className={inputClass(false)}
              placeholder="e.g. Woven, knitwear, denim"
            />
          </VantageField>

          <VantageField label="Main buyers (optional)">
            <input
              type="text"
              maxLength={200}
              value={form.main_buyers}
              onChange={(e) => updateField("main_buyers", e.target.value)}
              className={inputClass(false)}
              placeholder="If comfortable sharing"
            />
          </VantageField>

          <VantageField label="Upcoming audit frameworks (optional)">
            <div className="flex flex-wrap gap-2 mt-1">
              {AUDIT_FRAMEWORKS.map((fw) => (
                <button
                  key={fw}
                  type="button"
                  onClick={() => toggleFramework(fw)}
                  className={`text-xs px-3 py-1.5 rounded border transition-all ${
                    form.audit_frameworks.includes(fw)
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black hover:bg-black hover:text-white"
                  }`}
                >
                  {fw}
                </button>
              ))}
            </div>
          </VantageField>
        </div>
      )}

      {/* Step 2 — Your Details */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black text-black tracking-tight">
            Step 2 — Your Details
          </h2>

          <VantageField label="Your name" required error={errors.contact_name}>
            <input
              type="text"
              maxLength={100}
              value={form.contact_name}
              onChange={(e) => updateField("contact_name", e.target.value)}
              className={inputClass(!!errors.contact_name)}
              autoComplete="name"
            />
          </VantageField>

          <VantageField label="Your role" required error={errors.contact_role}>
            <select
              value={form.contact_role}
              onChange={(e) => updateField("contact_role", e.target.value)}
              className={inputClass(!!errors.contact_role)}
            >
              <option value="">Select your role</option>
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </VantageField>

          <VantageField
            label="WhatsApp number"
            required
            error={errors.whatsapp_number}
            hint="VANTAGE uses your WhatsApp number to send your gap scan results and follow up within 24 hours. Your data is not shared with third parties. Reply STOP at any time to opt out."
          >
            <input
              type="tel"
              value={form.whatsapp_number}
              onChange={(e) => updateField("whatsapp_number", e.target.value)}
              className={inputClass(!!errors.whatsapp_number)}
              placeholder="01XXXXXXXXX"
              autoComplete="tel"
              inputMode="tel"
              maxLength={11}
            />
          </VantageField>

          <VantageField label="Email address (optional)" error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={inputClass(!!errors.email)}
              autoComplete="email"
              inputMode="email"
            />
          </VantageField>

          <VantageField label="Are you the decision-maker for compliance services?">
            <div className="flex gap-4 mt-1">
              {["yes", "no"].map((v) => (
                <label key={v} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="decision_maker"
                    value={v}
                    checked={form.decision_maker_present === v}
                    onChange={() => updateField("decision_maker_present", v)}
                    className="accent-black"
                  />
                  <span className="text-sm text-black capitalize">{v}</span>
                </label>
              ))}
            </div>
          </VantageField>
        </div>
      )}

      {/* Step 3 — Audit Urgency */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black text-black tracking-tight">
            Step 3 — Audit Urgency
          </h2>
          <p className="text-sm text-black">
            This information helps us prioritise your gap scan results and recommend the right
            level of support.
          </p>

          <VantageField
            label="Is there an upcoming audit scheduled?"
            required
            error={errors.upcoming_audit}
          >
            <RadioGroup
              name="upcoming_audit"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "not_sure", label: "Not sure" },
              ]}
              value={form.upcoming_audit}
              onChange={(v) => updateField("upcoming_audit", v)}
            />
          </VantageField>

          {form.upcoming_audit === "yes" && (
            <VantageField
              label="Approximate audit date"
              required
              error={errors.upcoming_audit_date}
            >
              <input
                type="date"
                value={form.upcoming_audit_date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => updateField("upcoming_audit_date", e.target.value)}
                className={inputClass(!!errors.upcoming_audit_date)}
              />
            </VantageField>
          )}

          <VantageField
            label="Has the factory received a CAP from a recent audit?"
            required
            error={errors.recent_failed_audit}
          >
            <RadioGroup
              name="recent_failed_audit"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={form.recent_failed_audit}
              onChange={(v) => updateField("recent_failed_audit", v)}
            />
          </VantageField>

          {form.recent_failed_audit === "yes" && (
            <VantageField
              label="CAP deadline"
              required
              error={errors.cap_deadline}
            >
              <input
                type="date"
                value={form.cap_deadline}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => updateField("cap_deadline", e.target.value)}
                className={inputClass(!!errors.cap_deadline)}
              />
            </VantageField>
          )}

          <VantageField label="Has the factory received a buyer compliance request or demand letter?">
            <RadioGroup
              name="buyer_pressure"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={form.buyer_pressure}
              onChange={(v) => updateField("buyer_pressure", v)}
            />
          </VantageField>
        </div>
      )}

      {/* Step 4 — Gap Scan Questions */}
      {step === 4 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-black text-black tracking-tight">
              Step 4 — Gap Scan Questions
            </h2>
            <span className="text-sm text-black font-mono">
              {totalAnswered} / 25
            </span>
          </div>

          <p className="text-sm text-black mb-6">
            Answer each question based on your factory&apos;s current records and processes.
            &ldquo;Not sure&rdquo; is scored the same as &ldquo;No&rdquo; &mdash; the
            conservative approach.
          </p>

          {errors.questions && (
            <div className="border-l-4 border-black px-4 py-3 text-sm text-black mb-4">
              {errors.questions}
            </div>
          )}

          {/* Live score bar */}
          {liveScore && (
            <div className="sticky top-0 z-10 bg-black text-white px-4 py-3 rounded mb-4 flex items-center justify-between text-sm font-mono">
              <span>
                Score: <strong>{liveScore.complianceScore}/100</strong>
              </span>
              <span className="text-white">{liveScore.riskBand}</span>
              <span className="text-white">
                ⬤ {liveScore.criticalCount} Critical
              </span>
            </div>
          )}

          <div className="space-y-4">
            {QUESTIONS.slice(0, 24).map((q) => {
              const answer = form.answers.find((a) => a.questionId === q.id)!;
              return (
                <QuestionCard
                  key={q.id}
                  question={q}
                  answer={answer}
                  onChange={updateAnswer}
                />
              );
            })}

            <Q25Card
              doc1={form.q25_doc1}
              doc2={form.q25_doc2}
              doc3={form.q25_doc3}
              onChange={({ doc1, doc2, doc3 }) => {
                updateField("q25_doc1", doc1);
                updateField("q25_doc2", doc2);
                updateField("q25_doc3", doc3);
              }}
            />
          </div>
        </div>
      )}

      {/* Step 5 — Review & Submit */}
      {step === 5 && (
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black text-black tracking-tight">
            Step 5 — Review and Submit
          </h2>

          {liveScore && (
            <div className="border border-black rounded-xl p-5">
              <div className="text-sm text-black space-y-1 font-mono">
                <div>
                  Questions answered: <strong>{totalAnswered} of 25</strong>
                </div>
                <div>
                  Risk score: <strong>{liveScore.riskScore} / 141</strong>
                </div>
                <div>
                  Compliance score: <strong>{liveScore.complianceScore} / 100</strong>
                </div>
                <div>
                  Risk level: <strong>{liveScore.riskBand}</strong>
                </div>
              </div>
            </div>
          )}

          <div className="border border-black rounded-xl p-5 text-sm text-black space-y-1">
            <div>
              <strong>Factory:</strong> {form.factory_name || "—"}
            </div>
            <div>
              <strong>District:</strong> {form.district_zone || "—"}
            </div>
            <div>
              <strong>Contact:</strong> {form.contact_name || "—"} (
              {form.contact_role || "—"})
            </div>
            <div>
              <strong>WhatsApp:</strong> {form.whatsapp_number || "—"}
            </div>
          </div>

          <LegalDisclaimer variant="full" />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-black text-white font-bold py-4 rounded-full hover:opacity-80 transition-all text-base disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting…" : "Submit Gap Scan →"}
          </button>
        </div>
      )}

      {/* Navigation */}
      {step < 5 && (
        <div className="flex justify-between mt-10">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="border border-black text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all text-sm"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={handleContinue}
            className="bg-black text-white font-bold px-8 py-3 rounded-full hover:opacity-80 transition-all text-sm"
          >
            Continue →
          </button>
        </div>
      )}
      {step === 5 && step > 1 && (
        <div className="mt-4">
          <button
            type="button"
            onClick={handleBack}
            className="border border-black text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all text-sm"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4 mt-1">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="accent-black w-4 h-4"
          />
          <span className="text-sm text-black">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
