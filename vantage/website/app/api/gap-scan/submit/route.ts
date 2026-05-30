import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { calculateScore, scoreQ25 } from "@/lib/gap-scan/scoring";
import { QUESTIONS } from "@/lib/gap-scan/questions";
import type { GapScanFormData, QuestionAnswer } from "@/lib/gap-scan/schema";

// ── Types ──────────────────────────────────────────────────────────────────

interface SubmitBody extends GapScanFormData {
  // no additions — exact form shape
}

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

// ── Priority ───────────────────────────────────────────────────────────────

function followUpPriority(
  riskBand: string,
  upcomingAudit: string,
  q25Doc1: string
): string {
  if (riskBand === "Critical Risk" || riskBand === "High Risk") return "Same day";
  if (riskBand === "Medium Risk" && (upcomingAudit === "yes" || q25Doc1.trim())) return "Within 24 hours";
  if (riskBand === "Medium Risk") return "Within 5 days";
  return "30-day re-contact";
}

function nextActionDate(priority: string): string {
  const d = new Date();
  if (priority === "Within 24 hours") d.setDate(d.getDate() + 1);
  else if (priority === "Within 5 days") d.setDate(d.getDate() + 5);
  else if (priority === "30-day re-contact") d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
}

function recommendedOffer(riskBand: string, sprintTriggered: boolean): string {
  if (riskBand === "Low Risk" && !sprintTriggered) return "Document health check";
  if (riskBand === "Medium Risk" && !sprintTriggered) return "BLA 2026 Compliance Sprint (soft)";
  return "BLA 2026 Compliance Sprint";
}

function whatsappTemplate(riskBand: string): string {
  if (riskBand === "High Risk" || riskBand === "Critical Risk") return "A";
  if (riskBand === "Medium Risk") return "B";
  return "C";
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

function validate(body: Partial<SubmitBody>): string | null {
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

// ── Sheets client ──────────────────────────────────────────────────────────

function getSheetsClient() {
  const email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const key = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!email || !key || !spreadsheetId) {
    throw new Error("Google Sheets environment variables not configured");
  }

  const auth = new google.auth.JWT({
    email,
    key: key.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return { sheets: google.sheets({ version: "v4", auth }), spreadsheetId };
}

async function appendRow(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  tab: string,
  row: (string | number)[]
) {
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

// ── POST handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: Partial<SubmitBody>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Step 1 — Validate
  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const data = body as SubmitBody;

  // Step 2–3 — Generate IDs + score (server-side, authoritative)
  const factory_id = makeId("FAC");
  const contact_id = makeId("CON");
  const session_id = makeId("GSS");
  const now = isoNow();

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

  const lowCount =
    (data.answers ?? []).filter((a) => {
      const q = QUESTIONS.find((q) => q.id === a.questionId);
      return q?.riskLevel === "Low" && (a.answer === "no" || a.answer === "not_sure");
    }).length;

  // Step 4 — Lead priority
  const priority = followUpPriority(riskBand, data.upcoming_audit, data.q25_doc1);
  const offer = recommendedOffer(riskBand, sprintTriggered);
  const template = whatsappTemplate(riskBand);
  const nextAction = nextActionDate(priority);
  const triggerFlags = triggerFlagsString(triggers);
  const q25Points = scoreQ25(data.q25_doc1 ?? "", data.q25_doc2 ?? "", data.q25_doc3 ?? "");

  // Step 5 — Write to Sheets
  try {
    const { sheets, spreadsheetId } = getSheetsClient();

    // factories
    await appendRow(sheets, spreadsheetId, "factories", [
      factory_id,
      data.factory_name,
      data.factory_address,
      data.district_zone,
      data.worker_count_range,
      data.main_products ?? "",
      data.main_buyers ?? "",
      (data.audit_frameworks ?? []).join(", "),
      now,
    ]);

    // contacts
    await appendRow(sheets, spreadsheetId, "contacts", [
      contact_id,
      factory_id,
      data.contact_name,
      data.contact_role,
      data.whatsapp_number,
      data.email ?? "",
      data.decision_maker_present ?? "",
      now,
    ]);

    // gap_scan_sessions
    await appendRow(sheets, spreadsheetId, "gap_scan_sessions", [
      session_id,
      factory_id,
      contact_id,
      now.split(" ")[0],   // session_date
      "Virtual",           // session_mode — default; Munim updates if on-site
      data.upcoming_audit,
      data.upcoming_audit_date ?? "",
      (data.audit_frameworks ?? []).join(", "),
      data.recent_failed_audit,
      data.cap_deadline ?? "",
      data.buyer_pressure ?? "",
      criticalCount,
      highCount,
      mediumCount,
      lowCount,
      riskScore,
      complianceScore,
      riskBand,
      sprintTriggered ? "Yes" : "No",
      triggerFlags,
      offer,
      data.q25_doc1 ?? "",
      data.q25_doc2 ?? "",
      data.q25_doc3 ?? "",
      "",  // double_gap_flags — computed manually by Munim for now
      "",  // internal_sales_note — Munim only
      "New",
      now,
    ]);

    // gap_scan_answers — Q1–Q24
    for (const ans of data.answers) {
      const q = QUESTIONS.find((q) => q.id === ans.questionId);
      if (!q) continue;
      const points =
        ans.answer === "no" || ans.answer === "not_sure" ? q.weight : 0;
      const answerId = `ANS-${datestamp()}-${session_id.split("-")[2]}-Q${String(ans.questionId).padStart(2, "0")}`;
      await appendRow(sheets, spreadsheetId, "gap_scan_answers", [
        answerId,
        session_id,
        `Q${String(ans.questionId).padStart(2, "0")}`,
        q.theme,
        ans.answer ?? "",
        "",          // evidence_seen — form doesn't collect this yet
        ans.evidenceNote ?? "",
        q.riskLevel,
        points,
        "",          // remediation_note — future
      ]);
    }

    // gap_scan_answers — Q25
    const q25AnswerId = `ANS-${datestamp()}-${session_id.split("-")[2]}-Q25`;
    await appendRow(sheets, spreadsheetId, "gap_scan_answers", [
      q25AnswerId,
      session_id,
      "Q25",
      "Audit readiness",
      [data.q25_doc1, data.q25_doc2, data.q25_doc3].filter(Boolean).join(" | "),
      "",
      "",
      "Critical",
      q25Points,
      "",
    ]);

    // follow_ups — Step 6
    const follow_up_id = makeId("FUP");
    await appendRow(sheets, spreadsheetId, "follow_ups", [
      follow_up_id,
      session_id,
      factory_id,
      data.contact_name,
      data.whatsapp_number,
      riskBand,
      priority,
      offer,
      "Pending — not yet sent",
      template,
      "",      // action_date — Munim fills
      `Send Template ${template} WhatsApp`,
      nextAction,
      "",      // outcome
      `WhatsApp draft — ready to send. Review before sending. Contact: ${data.contact_name}, Score: ${complianceScore}/100, Band: ${riskBand}`,
      now,
    ]);
  } catch (sheetsError) {
    // Log but do not fail the request — result screen must still work
    console.error("[gap-scan/submit] Sheets write failed:", sheetsError);
    // In production, Munim would be notified separately; local JSON fallback is manual per the automation plan
  }

  // Step 9 — Return result to browser (no internal fields exposed)
  return NextResponse.json({
    session_id,
    compliance_score: complianceScore,
    risk_band: riskBand,
    sprint_triggered: sprintTriggered,
    recommended_offer: offer,
    top_gaps: topGaps,
    missing_documents: missingDocuments,
  });
}
