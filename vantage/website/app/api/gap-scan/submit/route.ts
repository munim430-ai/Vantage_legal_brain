import { NextRequest, NextResponse } from "next/server";
import { calculateScore, scoreQ25 } from "@/lib/gap-scan/scoring";
import { QUESTIONS } from "@/lib/gap-scan/questions";
import type { GapScanFormData, QuestionAnswer } from "@/lib/gap-scan/schema";
import {
  isGoogleSheetsConfigured,
  appendFactoryRow,
  appendContactRow,
  appendGapScanSessionRow,
  appendGapScanAnswerRows,
  appendFollowUpRow,
} from "@/lib/server/google-sheets";
import {
  getFollowUpPriority,
  getNextActionDate,
  getRecommendedOffer,
  getWhatsAppTemplate,
} from "@/lib/gap-scan/lead-priority";

// ── ID helpers ─────────────────────────────────────────────────────────────

function datestamp(): string {
  const d = new Date();
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
}

function makeId(prefix: string): string {
  return `${prefix}-${datestamp()}-${String(Math.floor(Math.random() * 900) + 100)}`;
}

function isoNow(): string {
  return new Date().toISOString().replace("T", " ").slice(0, 19);
}

function triggerFlagsString(triggers: Record<string, boolean>): string {
  const labels: Record<string, string> = {
    documentBlackHole: "Document black hole",
    welfareCluster: "Welfare cluster",
    harassmentCluster: "Harassment cluster",
    wageEvidenceAbsent: "Wage evidence absent",
    childLabourExposure: "Child labour exposure",
    openCapUnmanaged: "Open CAP unmanaged",
    criticalThreshold: "Critical score threshold",
  };
  return Object.entries(triggers)
    .filter(([, v]) => v)
    .map(([k]) => labels[k] ?? k)
    .join(", ");
}

// ── Validation ─────────────────────────────────────────────────────────────

function validate(body: Partial<GapScanFormData>): string | null {
  if (!body.factory_name?.trim() || body.factory_name.trim().length < 3)
    return "factory_name is required (min 3 characters)";
  if (!body.factory_address?.trim()) return "factory_address is required";
  if (!body.district_zone?.trim()) return "district_zone is required";
  if (!body.worker_count_range?.trim()) return "worker_count_range is required";
  if (!body.contact_name?.trim()) return "contact_name is required";
  if (!body.contact_role?.trim()) return "contact_role is required";
  if (!body.whatsapp_number?.trim()) return "whatsapp_number is required";
  if (!/^(01\d{9}|\+?880\d{10})$/.test(body.whatsapp_number.trim()))
    return "whatsapp_number must be a valid Bangladesh mobile number";
  if (!body.upcoming_audit) return "upcoming_audit is required";
  if (body.upcoming_audit === "yes" && !body.upcoming_audit_date)
    return "upcoming_audit_date is required when upcoming_audit is yes";
  if (!body.recent_failed_audit) return "recent_failed_audit is required";
  if (body.recent_failed_audit === "yes" && !body.cap_deadline)
    return "cap_deadline is required when recent_failed_audit is yes";
  if (!Array.isArray(body.answers) || body.answers.length < 24)
    return "All 24 structured questions must be answered";
  const unanswered = (body.answers as QuestionAnswer[]).filter(
    (a) => a.answer === null || a.answer === undefined
  );
  if (unanswered.length > 0)
    return `${unanswered.length} question(s) have no answer`;
  return null;
}

// ── POST handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: Partial<GapScanFormData>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Step 1 — Validate (always runs regardless of Sheets config)
  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const data = body as GapScanFormData;

  // Step 2 — Generate IDs
  const factory_id = makeId("FAC");
  const contact_id = makeId("CON");
  const session_id = makeId("GSS");
  const now = isoNow();

  // Step 3 — Score server-side (authoritative; frontend score is never trusted)
  const scored = calculateScore(data);
  const {
    riskScore,
    complianceScore,
    riskBand,
    sprintTriggered,
    triggers,
    topGaps,
    missingDocuments,
    criticalCount,
    highCount,
    mediumCount,
  } = scored;

  const lowCount = (data.answers ?? []).filter((a) => {
    const q = QUESTIONS.find((q) => q.id === a.questionId);
    return q?.riskLevel === "Low" && (a.answer === "no" || a.answer === "not_sure");
  }).length;

  // Step 4 — Lead priority
  const priority = getFollowUpPriority(
    riskBand,
    data.upcoming_audit,
    data.recent_failed_audit,
    data.q25_doc1 ?? "",
    data.q25_doc2 ?? "",
    data.q25_doc3 ?? ""
  );
  const offer = getRecommendedOffer(riskBand, sprintTriggered);
  const template = getWhatsAppTemplate(riskBand);
  const nextAction = getNextActionDate(priority);
  const triggerFlags = triggerFlagsString(triggers);
  const q25Points = scoreQ25(data.q25_doc1 ?? "", data.q25_doc2 ?? "", data.q25_doc3 ?? "");

  // Shared result payload (never includes total_risk_points, trigger_flags, or internal fields)
  const resultPayload = {
    compliance_score: complianceScore,
    risk_band: riskBand,
    sprint_triggered: sprintTriggered,
    recommended_offer: offer,
    top_gaps: topGaps,
    missing_documents: missingDocuments,
  };

  // Step 5 — If env not configured, return gracefully without attempting Sheets
  if (!isGoogleSheetsConfigured()) {
    return NextResponse.json({
      success: true,
      stored: false,
      reason: "Google Sheets storage is not configured",
      ...resultPayload,
    });
  }

  // Step 6 — Write to Sheets
  try {
    // Answer rows: Q01–Q24
    const answerRows = data.answers.map((ans) => {
      const q = QUESTIONS.find((q) => q.id === ans.questionId);
      const points = ans.answer === "no" || ans.answer === "not_sure" ? (q?.weight ?? 0) : 0;
      return {
        answer_id: `ANS-${datestamp()}-${session_id.split("-")[2]}-Q${String(ans.questionId).padStart(2, "0")}`,
        session_id,
        question_id: `Q${String(ans.questionId).padStart(2, "0")}`,
        question_theme: q?.theme ?? "",
        answer: ans.answer ?? "",
        evidence_seen: "",
        evidence_notes: ans.evidenceNote ?? "",
        risk_level: q?.riskLevel ?? "",
        risk_points: points,
        remediation_note: "",
      };
    });

    // Q25 answer row
    answerRows.push({
      answer_id: `ANS-${datestamp()}-${session_id.split("-")[2]}-Q25`,
      session_id,
      question_id: "Q25",
      question_theme: "Audit readiness",
      answer: [data.q25_doc1, data.q25_doc2, data.q25_doc3].filter(Boolean).join(" | "),
      evidence_seen: "",
      evidence_notes: "",
      risk_level: "Critical",
      risk_points: q25Points,
      remediation_note: "",
    });

    // Write in order per GAP_SCAN_AUTOMATION_PLAN.md §4 Step 5
    await appendFactoryRow({
      factory_id,
      factory_name: data.factory_name,
      factory_address: data.factory_address,
      district_zone: data.district_zone,
      worker_count_range: data.worker_count_range,
      main_products: data.main_products ?? "",
      main_buyers: data.main_buyers ?? "",
      audit_frameworks: (data.audit_frameworks ?? []).join(", "),
      created_at: now,
    });

    await appendContactRow({
      contact_id,
      factory_id,
      contact_name: data.contact_name,
      contact_role: data.contact_role,
      whatsapp_number: data.whatsapp_number,
      email: data.email ?? "",
      decision_maker_present: data.decision_maker_present ?? "",
      created_at: now,
    });

    await appendGapScanSessionRow({
      session_id,
      factory_id,
      contact_id,
      session_date: now.split(" ")[0],
      session_mode: "Virtual",
      upcoming_audit: data.upcoming_audit,
      upcoming_audit_date: data.upcoming_audit_date ?? "",
      audit_standard: (data.audit_frameworks ?? []).join(", "),
      recent_failed_audit: data.recent_failed_audit,
      cap_deadline: data.cap_deadline ?? "",
      buyer_pressure: data.buyer_pressure ?? "",
      critical_count: criticalCount,
      high_count: highCount,
      medium_count: mediumCount,
      low_count: lowCount,
      total_risk_points: riskScore,
      compliance_score: complianceScore,
      risk_band: riskBand,
      sprint_triggered: sprintTriggered ? "Yes" : "No",
      trigger_flags: triggerFlags,
      recommended_offer: offer,
      q25_doc_1: data.q25_doc1 ?? "",
      q25_doc_2: data.q25_doc2 ?? "",
      q25_doc_3: data.q25_doc3 ?? "",
      double_gap_flags: "",
      internal_sales_note: "",
      status: "New",
      created_at: now,
    });

    await appendGapScanAnswerRows(answerRows);

    await appendFollowUpRow({
      follow_up_id: makeId("FUP"),
      session_id,
      factory_id,
      contact_name: data.contact_name,
      whatsapp_number: data.whatsapp_number,
      risk_band: riskBand,
      follow_up_priority: priority,
      recommended_offer: offer,
      follow_up_type: "Pending — not yet sent",
      whatsapp_template: template,
      action_date: "",
      next_action: `Send Template ${template} WhatsApp`,
      next_action_date: nextAction,
      outcome: "",
      notes: `WhatsApp draft — ready to send. Review before sending. Contact: ${data.contact_name}, Score: ${complianceScore}/100, Band: ${riskBand}`,
      created_at: now,
    });

    return NextResponse.json({
      success: true,
      stored: true,
      session_id,
      ...resultPayload,
    });
  } catch {
    // Never leak stack trace, credentials, or Google API internals
    console.error("[gap-scan/submit] Sheets write failed");
    return NextResponse.json({
      success: false,
      stored: false,
      error: "Submission could not be stored. Your results are shown below.",
      ...resultPayload,
    });
  }
}
