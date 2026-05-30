// Server-side only — never import from client components.
// Credentials are read exclusively from process.env at call time.

import { google } from "googleapis";

// ── Env check ──────────────────────────────────────────────────────────────

export function isGoogleSheetsConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID &&
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL &&
      process.env.GOOGLE_SHEETS_PRIVATE_KEY
  );
}

// ── Internal client builder ────────────────────────────────────────────────

function getClient() {
  const email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL!;
  const rawKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY!;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

  // Handle both escaped \\n (Vercel env) and real newlines
  const key = rawKey.includes("\\n") ? rawKey.replace(/\\n/g, "\n") : rawKey;

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return { sheets: google.sheets({ version: "v4", auth }), spreadsheetId };
}

async function appendRow(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  tab: string,
  row: (string | number)[]
): Promise<void> {
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

// ── Row types ──────────────────────────────────────────────────────────────

export interface FactoryRow {
  factory_id: string;
  factory_name: string;
  factory_address: string;
  district_zone: string;
  worker_count_range: string;
  main_products: string;
  main_buyers: string;
  audit_frameworks: string;
  created_at: string;
}

export interface ContactRow {
  contact_id: string;
  factory_id: string;
  contact_name: string;
  contact_role: string;
  whatsapp_number: string;
  email: string;
  decision_maker_present: string;
  created_at: string;
}

export interface GapScanSessionRow {
  session_id: string;
  factory_id: string;
  contact_id: string;
  session_date: string;
  session_mode: string;
  upcoming_audit: string;
  upcoming_audit_date: string;
  audit_standard: string;
  recent_failed_audit: string;
  cap_deadline: string;
  buyer_pressure: string;
  critical_count: number;
  high_count: number;
  medium_count: number;
  low_count: number;
  total_risk_points: number;
  compliance_score: number;
  risk_band: string;
  sprint_triggered: string;
  trigger_flags: string;
  recommended_offer: string;
  q25_doc_1: string;
  q25_doc_2: string;
  q25_doc_3: string;
  double_gap_flags: string;
  internal_sales_note: string;
  status: string;
  created_at: string;
}

export interface GapScanAnswerRow {
  answer_id: string;
  session_id: string;
  question_id: string;
  question_theme: string;
  answer: string;
  evidence_seen: string;
  evidence_notes: string;
  risk_level: string;
  risk_points: number;
  remediation_note: string;
}

export interface FollowUpRow {
  follow_up_id: string;
  session_id: string;
  factory_id: string;
  contact_name: string;
  whatsapp_number: string;
  risk_band: string;
  follow_up_priority: string;
  recommended_offer: string;
  follow_up_type: string;
  whatsapp_template: string;
  action_date: string;
  next_action: string;
  next_action_date: string;
  outcome: string;
  notes: string;
  created_at: string;
}

// ── Exported append functions ──────────────────────────────────────────────

export async function appendFactoryRow(row: FactoryRow): Promise<void> {
  const { sheets, spreadsheetId } = getClient();
  await appendRow(sheets, spreadsheetId, "factories", [
    row.factory_id,
    row.factory_name,
    row.factory_address,
    row.district_zone,
    row.worker_count_range,
    row.main_products,
    row.main_buyers,
    row.audit_frameworks,
    row.created_at,
  ]);
}

export async function appendContactRow(row: ContactRow): Promise<void> {
  const { sheets, spreadsheetId } = getClient();
  await appendRow(sheets, spreadsheetId, "contacts", [
    row.contact_id,
    row.factory_id,
    row.contact_name,
    row.contact_role,
    row.whatsapp_number,
    row.email,
    row.decision_maker_present,
    row.created_at,
  ]);
}

export async function appendGapScanSessionRow(row: GapScanSessionRow): Promise<void> {
  const { sheets, spreadsheetId } = getClient();
  await appendRow(sheets, spreadsheetId, "gap_scan_sessions", [
    row.session_id,
    row.factory_id,
    row.contact_id,
    row.session_date,
    row.session_mode,
    row.upcoming_audit,
    row.upcoming_audit_date,
    row.audit_standard,
    row.recent_failed_audit,
    row.cap_deadline,
    row.buyer_pressure,
    row.critical_count,
    row.high_count,
    row.medium_count,
    row.low_count,
    row.total_risk_points,
    row.compliance_score,
    row.risk_band,
    row.sprint_triggered,
    row.trigger_flags,
    row.recommended_offer,
    row.q25_doc_1,
    row.q25_doc_2,
    row.q25_doc_3,
    row.double_gap_flags,
    row.internal_sales_note,
    row.status,
    row.created_at,
  ]);
}

export async function appendGapScanAnswerRows(rows: GapScanAnswerRow[]): Promise<void> {
  const { sheets, spreadsheetId } = getClient();
  for (const row of rows) {
    await appendRow(sheets, spreadsheetId, "gap_scan_answers", [
      row.answer_id,
      row.session_id,
      row.question_id,
      row.question_theme,
      row.answer,
      row.evidence_seen,
      row.evidence_notes,
      row.risk_level,
      row.risk_points,
      row.remediation_note,
    ]);
  }
}

export async function appendFollowUpRow(row: FollowUpRow): Promise<void> {
  const { sheets, spreadsheetId } = getClient();
  await appendRow(sheets, spreadsheetId, "follow_ups", [
    row.follow_up_id,
    row.session_id,
    row.factory_id,
    row.contact_name,
    row.whatsapp_number,
    row.risk_band,
    row.follow_up_priority,
    row.recommended_offer,
    row.follow_up_type,
    row.whatsapp_template,
    row.action_date,
    row.next_action,
    row.next_action_date,
    row.outcome,
    row.notes,
    row.created_at,
  ]);
}
