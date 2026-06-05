"use client";

import { useState } from "react";
import type { Question } from "@/lib/gap-scan/questions";
import type { AnswerValue, QuestionAnswer } from "@/lib/gap-scan/schema";

const RISK_BADGE: Record<string, string> = {
  Critical: "bg-vantage-black text-white",
  High: "bg-vantage-teal text-white",
  Medium: "bg-vantage-gold text-vantage-black",
  Low: "bg-vantage-light-grey text-vantage-dark-grey",
};

interface QuestionCardProps {
  question: Question;
  answer: QuestionAnswer;
  onChange: (updated: QuestionAnswer) => void;
}

const OPTIONS: { value: AnswerValue; label: string }[] = [
  { value: "yes", label: "Yes — documents are present and up to date" },
  { value: "no", label: "No — documents are missing or incomplete" },
  { value: "not_sure", label: "Not sure" },
  { value: "not_applicable", label: "Not applicable to this factory" },
];

export function QuestionCard({ question, answer, onChange }: QuestionCardProps) {
  const [showNote, setShowNote] = useState(!!answer.evidenceNote);

  return (
    <div className="border border-vantage-black-10 rounded-xl p-5 bg-white">
      <div className="flex items-start gap-3 mb-4">
        <span
          className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded shrink-0 mt-0.5 ${RISK_BADGE[question.riskLevel]}`}
        >
          {question.riskLevel}
        </span>
        <p className="text-sm font-medium text-vantage-black leading-snug">
          <span className="text-vantage-medium-grey mr-1 font-mono text-xs">
            Q{question.id}
          </span>
          {question.text}
        </p>
      </div>

      <div className="space-y-2.5 ml-1">
        {OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="radio"
              name={`q${question.id}`}
              value={opt.value}
              checked={answer.answer === opt.value}
              onChange={() => onChange({ ...answer, answer: opt.value })}
              className="w-4 h-4 accent-vantage-teal cursor-pointer shrink-0"
            />
            <span className="text-sm text-vantage-dark-grey group-hover:text-vantage-black transition-colors">
              {opt.label}
            </span>
          </label>
        ))}
      </div>

      {!showNote ? (
        <button
          type="button"
          onClick={() => setShowNote(true)}
          className="mt-3 text-xs text-vantage-teal hover:underline"
        >
          + Add evidence note
        </button>
      ) : (
        <textarea
          className="mt-3 w-full text-xs border border-vantage-black-10 rounded-lg p-2.5 text-vantage-black placeholder-vantage-medium-grey focus:outline-none focus:border-vantage-gold resize-none"
          rows={2}
          maxLength={500}
          placeholder="Note what evidence was reviewed (optional)"
          value={answer.evidenceNote}
          onChange={(e) => onChange({ ...answer, evidenceNote: e.target.value })}
        />
      )}
    </div>
  );
}

interface Q25CardProps {
  doc1: string;
  doc2: string;
  doc3: string;
  onChange: (docs: { doc1: string; doc2: string; doc3: string }) => void;
}

const inputCls =
  "w-full text-sm border border-vantage-black-10 rounded px-3 py-2.5 focus:outline-none focus:border-vantage-gold transition-colors";

export function Q25Card({ doc1, doc2, doc3, onChange }: Q25CardProps) {
  return (
    <div className="border border-vantage-black-10 rounded-xl p-5 bg-white">
      <div className="flex items-start gap-3 mb-4">
        <span
          className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded shrink-0 mt-0.5 ${RISK_BADGE.Critical}`}
        >
          Critical
        </span>
        <p className="text-sm font-medium text-vantage-black leading-snug">
          <span className="text-vantage-medium-grey mr-1 font-mono text-xs">Q25</span>
          What are the top three compliance documents the factory cannot produce within 24 hours?
        </p>
      </div>

      <div className="space-y-2 ml-1">
        <input
          type="text"
          placeholder="Document 1 — e.g. Leave register"
          value={doc1}
          onChange={(e) => onChange({ doc1: e.target.value, doc2, doc3 })}
          maxLength={200}
          className={inputCls}
        />
        <input
          type="text"
          placeholder="Document 2 (optional)"
          value={doc2}
          onChange={(e) => onChange({ doc1, doc2: e.target.value, doc3 })}
          maxLength={200}
          className={inputCls}
        />
        <input
          type="text"
          placeholder="Document 3 (optional)"
          value={doc3}
          onChange={(e) => onChange({ doc1, doc2, doc3: e.target.value })}
          maxLength={200}
          className={inputCls}
        />
        <p className="text-xs text-vantage-medium-grey">
          Leave blank if all key documents are immediately available.
        </p>
      </div>
    </div>
  );
}
