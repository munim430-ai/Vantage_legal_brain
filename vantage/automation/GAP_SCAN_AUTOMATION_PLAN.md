# VANTAGE — Gap Scan Automation Plan

**Status:** Committed v1.0  
**Owner:** Keystone Consultancy trading as VANTAGE  
**For:** Munim — defines the first automation plan before any code is written  
**Purpose:** Document the exact automated workflow for Free Gap Scan submission → Google Sheets storage → risk scoring → lead priority → Munim follow-up task → WhatsApp draft → quotation trigger.

---

## Legal Positioning

The Free Gap Scan is a compliance guidance and audit-preparation review. It is not an audit, legal opinion, or certification. No automated output from this workflow represents an audit result, compliance determination, or legal advice.

All client-facing text generated or drafted by this automation must be reviewed by Munim before it is sent. No automated system may send legal documents, compliance statements, or pricing offers to clients without explicit Munim approval.

---

## Source Files

| Source | Path |
|---|---|
| Automation agent | `vantage/agents/vantage-automation.md` |
| Backend data agent | `vantage/agents/vantage-backend-data.md` |
| Sales ops agent | `vantage/agents/vantage-sales-ops.md` |
| Document pipeline agent | `vantage/agents/vantage-document-pipeline.md` |
| QA/security agent | `vantage/agents/vantage-qa-security.md` |
| Legal risk guard | `vantage/agents/vantage-legal-risk-guard.md` |
| Data storage plan | `vantage/website/GAP_SCAN_DATA_STORAGE_PLAN.md` |
| Form schema | `vantage/products/gap-scan/GAP_SCAN_FORM_SCHEMA.md` |
| Digital form spec | `vantage/products/gap-scan/GAP_SCAN_DIGITAL_FORM_SPEC.md` |
| Scoring model | `vantage/products/gap-scan/RISK_SCORING_MODEL.md` |
| Report assembly map | `vantage/products/gap-scan/GAP_SCAN_REPORT_ASSEMBLY_MAP.md` |
| DOCX field map | `vantage/products/gap-scan/DOCX_TEMPLATE_FIELD_MAP.md` |
| Sales playbook | `vantage/sales/FREE_GAP_SCAN_TO_SPRINT_PLAYBOOK.md` |
| Legal positioning | `vantage-source-of-truth/LEGAL_POSITIONING_RULES.md` |
| Revenue streams | `vantage-source-of-truth/REVENUE_STREAMS.md` |

---

## Part 1 — Workflow Objective

Convert a completed Free Gap Scan form submission into a structured lead record with a risk score, a prioritised follow-up task, and a ready-to-send WhatsApp draft — without Munim having to manually open a spreadsheet or calculate anything.

**Outcome for Munim:** receive a WhatsApp notification immediately after a submission, open the follow-up sheet, see the risk band and recommended action, copy the pre-drafted WhatsApp message, and send it from his phone.

**Revenue link:** faster follow-up → higher close rate → more BLA 2026 Compliance Sprints at BDT 55,000 each.

---

## Part 2 — Workflow Trigger

| Property | Value |
|---|---|
| Trigger event | Factory submits the `/gap-scan` form on the VANTAGE Control Tower website |
| Trigger mechanism | `POST /api/gap-scan/submit` server-side API route |
| Trigger timing | Immediately on form submission — synchronous for scoring, asynchronous for Sheets write and notification |
| Manual trigger (fallback) | Munim manually enters session data into `VANTAGE_GapScan_Records` Google Sheet using the manual workflow from `GAP_SCAN_DATA_STORAGE_PLAN.md §6` |

---

## Part 3 — Required Inputs

The workflow cannot proceed without these fields. Validation must block submission if any required field is empty or malformed.

### Required — Factory Profile

| Field ID | Validation |
|---|---|
| `factory_name` | Non-empty string; min 3 characters |
| `factory_address` | Non-empty string |
| `district_zone` | Non-empty string |
| `worker_count_range` | Must be one of: `<100 / 100–500 / 501–2,000 / 2,001–5,000 / 5,000+` |

### Required — Contact Profile

| Field ID | Validation |
|---|---|
| `contact_name` | Non-empty string |
| `contact_role` | Non-empty string |
| `whatsapp_number` | Must match `+880XXXXXXXXXX` or `880XXXXXXXXXX` format; min 11 digits |

### Required — Audit Urgency

| Field ID | Validation |
|---|---|
| `upcoming_audit` | `yes` or `no` |
| `upcoming_audit_date` | Required if `upcoming_audit = yes`; must be a future date |
| `recent_failed_audit` | `yes` or `no` |
| `cap_deadline` | Required if `recent_failed_audit = yes`; must be a future date |

### Required — Gap Scan Answers

| Field ID | Validation |
|---|---|
| Q01–Q24 | Each must be `yes` or `no`; null answers are not accepted |
| Q25 | Short-answer text; may be empty (scores 0 points); if present, record all document names |

### Optional

| Field ID | Validation if present |
|---|---|
| `main_products` | Free text |
| `main_buyers` | Free text |
| `audit_frameworks` | Array of strings from approved list |
| `email` | Valid email format if provided |
| `decision_maker_present` | `yes` or `no` or omitted |
| `buyer_pressure` | `yes` or `no` or omitted |

---

## Part 4 — Step-by-Step Automation Flow

This is the complete workflow executed after a valid form submission passes validation.

### Step 1 — Validate submission

**Who:** Server-side API route (`POST /api/gap-scan/submit`)  
**What:** Check all required fields are present and valid.  
**On fail:** Return 400 error with field-level validation messages. Do not proceed to Step 2.  
**On pass:** Proceed.

---

### Step 2 — Generate IDs

**Who:** Server-side  
**What:** Generate three IDs for the new records.

```
factory_id  = FAC-[YYYYMMDD]-[NNN]   (sequential per day)
contact_id  = CON-[YYYYMMDD]-NNN
session_id  = GSS-[YYYYMMDD]-NNN
```

**Note:** If the factory already exists in the `factories` tab (matched by `factory_name` + `district_zone`), reuse the existing `factory_id`. Do not create duplicate factory rows.

---

### Step 3 — Calculate risk score

**Who:** Server-side scoring function  
**What:** Apply the scoring logic from `RISK_SCORING_MODEL.md §3–§5`.

**Scoring rules:**

```
For Q01–Q24:
  answer = "yes"  → risk_points = 0
  answer = "no"   → risk_points = question weight (Critical=8, High=5, Medium=3, Low=1)

For Q25 (sliding rule):
  0 documents named → 0 points
  1 document named  → 3 points
  2 documents named → 5 points
  3+ documents named → 8 points

total_risk_points = sum of all risk_points (max = 141)
compliance_score = 100 − round((total_risk_points ÷ 141) × 100)
```

**Risk band assignment:**

| total_risk_points | risk_band |
|---|---|
| 0–15 | Low Risk |
| 16–35 | Medium Risk |
| 36–60 | High Risk |
| 61+ | Critical Risk |

**Sprint trigger check (tick all that apply):**

| Trigger name | Rule |
|---|---|
| Document black hole | Q25 names 3 or more documents |
| Welfare cluster | Q12 AND Q13 AND Q15 all = No |
| Harassment cluster | Q15 AND Q16 both = No |
| Wage evidence absent | Q08 AND Q09 both = No |
| Child labour exposure | Q02 = No |
| Open CAP unmanaged | Q24 = No AND any Critical question = No |
| Critical score threshold | total_risk_points ≥ 61 |

**sprint_triggered = Yes** if any trigger fires.

**recommended_offer assignment:**

| Condition | recommended_offer |
|---|---|
| risk_band = Low Risk AND sprint_triggered = No | Document health check |
| risk_band = Medium Risk AND sprint_triggered = No | BLA 2026 Compliance Sprint (soft) |
| risk_band = Medium Risk AND sprint_triggered = Yes | BLA 2026 Compliance Sprint |
| risk_band = High Risk | BLA 2026 Compliance Sprint |
| risk_band = Critical Risk | BLA 2026 Compliance Sprint |

---

### Step 4 — Assign lead priority

**Who:** Server-side, after scoring  
**What:** Set `follow_up_priority` based on scoring output and urgency flags.

| Condition | follow_up_priority |
|---|---|
| risk_band = Critical Risk | Same day |
| risk_band = High Risk | Same day |
| risk_band = Medium Risk AND (`upcoming_audit = yes` OR Q25 names ≥ 1 document) | Within 24 hours |
| risk_band = Medium Risk (no urgency flag) | Within 5 days |
| risk_band = Low Risk | 30-day re-contact |

---

### Step 5 — Write to Google Sheets

**Who:** Server-side, using Google Sheets API via service account credentials  
**What:** Write records to four tabs in `VANTAGE_GapScan_Records`.

**Tab write order — do not change:**
1. Write to `factories` (skip if factory already exists)
2. Write to `contacts`
3. Write to `gap_scan_sessions`
4. Write 25 rows to `gap_scan_answers`

**On fail:** Retry up to 3 times with 2-second backoff. If all retries fail, write submission data to a local JSON fallback file and alert Munim immediately. Do not lose the submission.

**Failure fallback file naming:**
```
vantage_failed_submissions/VANTAGE_FailedSubmission_[YYYYMMDD_HHMMSS].json
```

Store locally. Munim enters the data manually from this file.

---

### Step 6 — Create follow-up record

**Who:** Server-side, after Step 5 succeeds  
**What:** Write one row to the `follow_ups` tab in Google Sheets.

Fields to write:

| Column | Value |
|---|---|
| `follow_up_id` | Generated: `FUP-[YYYYMMDD]-NNN` |
| `session_id` | From Step 2 |
| `factory_id` | From Step 2 |
| `contact_name` | From form |
| `whatsapp_number` | From form |
| `risk_band` | From Step 3 |
| `follow_up_priority` | From Step 4 |
| `recommended_offer` | From Step 3 |
| `follow_up_type` | `Pending — not yet sent` |
| `whatsapp_template` | Template letter: A (High/Critical), B (Medium), C (Low) |
| `action_date` | Empty — to be filled by Munim when sent |
| `next_action` | See WhatsApp draft rules in Part 5 |
| `next_action_date` | Calculated from follow_up_priority + submission date |
| `outcome` | `New` |
| `created_at` | ISO 8601 timestamp |

---

### Step 7 — Generate WhatsApp follow-up draft

**Who:** Server-side text assembly (no AI generation — use pre-approved templates from `FREE_GAP_SCAN_TO_SPRINT_PLAYBOOK.md`)  
**What:** Assemble the correct WhatsApp template with the factory's actual values substituted.

Template selection:

| risk_band | Template |
|---|---|
| High Risk or Critical Risk | Template A |
| Medium Risk | Template B |
| Low Risk | Template C |

Variable substitutions in all templates:

| Placeholder | Value |
|---|---|
| `[নাম]` / `[Name]` | `contact_name` |
| `[XX]/100` | `compliance_score` |
| `[High / Critical]` / `[Medium]` / `[Low]` | `risk_band` |

Store the assembled draft in the `notes` column of the `follow_ups` row. Label it: `WhatsApp draft — ready to send. Review before sending.`

This draft is **not sent automatically.** Munim copies and sends it manually.

---

### Step 8 — Notify Munim

**Who:** Server-side, after Steps 5–7 complete  
**What:** Send Munim a WhatsApp Business API message with the submission summary.

**Munim notification format:**

```
VANTAGE — New Gap Scan Submission

Factory: [factory_name]
District: [district_zone]
Contact: [contact_name] ([contact_role])
WhatsApp: [whatsapp_number]

Risk Band: [risk_band]
Compliance Score: [compliance_score]/100
Sprint Triggered: [Yes/No]
Follow-up Priority: [follow_up_priority]

Recommended Offer: [recommended_offer]

WhatsApp draft is ready in the follow_ups sheet.
Open VANTAGE_GapScan_Records to review and send.
```

**On fail:** Log the failure. Do not block the submission flow. Munim checks the sheet on a regular schedule as a fallback.

---

### Step 9 — Return result to browser

**Who:** API route, returning JSON to frontend  
**What:** Send risk band, compliance score, and recommended action to the browser for the result screen.

```json
{
  "session_id": "GSS-20260601-001",
  "compliance_score": 57,
  "risk_band": "High Risk",
  "sprint_triggered": true,
  "recommended_offer": "BLA 2026 Compliance Sprint",
  "top_gaps": [
    { "question_id": "Q01", "theme": "Employment documentation", "risk_level": "Critical" },
    { "question_id": "Q09", "theme": "Wage calculation", "risk_level": "Critical" },
    { "question_id": "Q15", "theme": "Anti-harassment policy", "risk_level": "Critical" }
  ],
  "missing_documents": ["appointment letters", "wage calculation sheet", "anti-harassment policy"]
}
```

The frontend uses this to render the risk band result screen per `GAP_SCAN_DIGITAL_FORM_SPEC.md`.

**Do not include in the response:**
- `total_risk_points` (internal only)
- `internal_sales_note`
- `trigger_flags`
- Any factory data beyond what the user submitted

---

## Part 5 — Google Sheets Tabs Affected

| Tab | Steps that write to it | Fields written |
|---|---|---|
| `factories` | Step 5 | `factory_id`, `factory_name`, `factory_address`, `district_zone`, `worker_count_range`, `main_products`, `main_buyers`, `audit_frameworks`, `created_at` |
| `contacts` | Step 5 | `contact_id`, `factory_id`, `contact_name`, `contact_role`, `whatsapp_number`, `email`, `decision_maker_present`, `created_at` |
| `gap_scan_sessions` | Step 5 | All session fields including scoring output, trigger flags, Q25 documents, recommended offer, status = New |
| `gap_scan_answers` | Step 5 | 25 rows: `answer_id`, `session_id`, `question_id`, `question_theme`, `answer`, `evidence_seen`, `evidence_notes`, `risk_level`, `risk_points`, `remediation_note` |
| `follow_ups` | Step 6 | Follow-up record with priority, template selection, WhatsApp draft in notes, next action date |
| `generated_documents` | Not written by automation — Munim fills this manually as documents are created | — |

**Fields never written automatically:**

| Field | Reason |
|---|---|
| `internal_sales_note` | Munim writes these after reviewing the factory |
| `generated_documents` rows | Document generation requires Munim approval |
| Payment columns | No payment is collected in MVP |
| `signed_date` | Contract signing is manual |

---

## Part 6 — Lead Priority Rules

Applied at Step 4. These rules are deterministic — no AI inference.

| Priority | Condition | Required follow-up action |
|---|---|---|
| Same day | `risk_band = Critical Risk` | Send Template A WhatsApp within 2 hours; prepare quotation |
| Same day | `risk_band = High Risk` | Send Template A WhatsApp same day; prepare quotation |
| Within 24 hours | `risk_band = Medium Risk` AND (`upcoming_audit = yes` OR Q25 names ≥ 1 doc) | Send Template B WhatsApp; offer Sprint if audit is within 8 weeks |
| Within 5 days | `risk_band = Medium Risk` (no urgency) | Send Template B WhatsApp this week |
| 30-day re-contact | `risk_band = Low Risk` | Send Template C WhatsApp; offer Retainer or Document Health Check |

`next_action_date` is calculated as:

| Priority | next_action_date |
|---|---|
| Same day | `submission_date` |
| Within 24 hours | `submission_date + 1 day` |
| Within 5 days | `submission_date + 5 days` |
| 30-day re-contact | `submission_date + 30 days` |

---

## Part 7 — WhatsApp Draft Generation Rules

The automation assembles a WhatsApp draft from fixed templates only. It does not generate new language, rephrase, or infer. Variable substitution is the only allowed operation.

### Template A — High Risk or Critical Risk

Variables: `[contact_name]`, `[compliance_score]`, `[risk_band]`

Source: `FREE_GAP_SCAN_TO_SPRINT_PLAYBOOK.md §7 Template A`

Generated draft is stored in `follow_ups.notes`. Munim copies it and sends from his phone.

### Template B — Medium Risk

Variables: `[contact_name]`, `[compliance_score]`

Source: `FREE_GAP_SCAN_TO_SPRINT_PLAYBOOK.md §7 Template B`

### Template C — Low Risk

Variables: `[contact_name]`, `[compliance_score]`

Source: `FREE_GAP_SCAN_TO_SPRINT_PLAYBOOK.md §7 Template C`

### Rules for all templates

- Never substitute risk band language that is stronger than the actual calculated band.
- Never include the raw `total_risk_points` value in a client-facing draft.
- Always include Munim's sign-off: `— Munim / Keystone Consultancy trading as VANTAGE`
- Never add guarantees, certifications, or legal-opinion language to any template.
- If template substitution fails (e.g., `contact_name` is empty), log the error and leave the field blank in the draft. Do not guess or substitute a placeholder.

---

## Part 8 — Manual Approval Gates

**Six hard gates.** Automation stops at each one. Munim must explicitly approve before the workflow continues.

| Gate | Trigger | What Munim does |
|---|---|---|
| **Gate 1 — Send WhatsApp follow-up** | WhatsApp draft is ready in `follow_ups.notes` | Munim reviews the draft, copies it, sends it manually from his phone. Updates `follow_up_type` to "WhatsApp sent" and `action_date`. |
| **Gate 2 — Send gap report** | Sprint is triggered AND Munim has reviewed the risk score output | Munim fills `VANTAGE_1_Page_Gap_Report_Template.docx`, exports as PDF, adds a row to `generated_documents`, and sends manually. |
| **Gate 3 — Send quotation** | Factory has expressed interest after Template A or B follow-up | Munim fills `VANTAGE_Quotation_Template-1.docx`, exports as PDF, and sends. Records in `generated_documents`. |
| **Gate 4 — Send MSA** | Factory has verbally agreed to the Sprint | Munim sends `MSA_VANTAGE_v1.docx`. Does not proceed to Gate 5 until MSA is signed. |
| **Gate 5 — Send Sprint Work Order** | MSA is signed | Munim sends `Sprint_Work_Order_VANTAGE.docx`. Sprint cannot start until this is signed. |
| **Gate 6 — Send invoice** | Work Order is signed | Munim issues invoice for 50% upfront via `VANTAGE_Invoice_Template.docx`. Sprint starts after payment is confirmed. |

**No automation may bypass any gate.** If a future workflow is proposed that skips a gate, reject it and route to `vantage-legal-risk-guard`.

---

## Part 9 — Failure Handling

### Validation failure (Step 1)

- Return 400 HTTP status with field-level error messages.
- Do not proceed.
- Frontend displays validation errors per `GAP_SCAN_DIGITAL_FORM_SPEC.md §8`.

### Scoring failure (Step 3)

- Log the error with the full input data.
- Return 500 to frontend with a user-facing message: "There was an error calculating your results. Your submission has been saved. Munim will review it and be in touch within 24 hours."
- Preserve the raw form data in `vantage_failed_submissions/`.
- Do not block the user from re-submitting.

### Google Sheets write failure (Step 5)

- Retry up to 3 times with 2-second exponential backoff.
- On persistent failure: write submission data to `vantage_failed_submissions/VANTAGE_FailedSubmission_[YYYYMMDD_HHMMSS].json`.
- Notify Munim via WhatsApp: "Failed Sheets write for [factory_name]. Manual entry required. Check failed_submissions folder."
- Return 200 to frontend — the user experience must not be affected. The user's result screen is calculated from the scoring step, which already succeeded.

### Follow-up creation failure (Step 6)

- Log the error.
- Proceed to Step 7 and Step 8 regardless.
- Munim creates the follow-up row manually from the Munim notification received in Step 8.

### Munim notification failure (Step 8)

- Log the failure.
- Do not block the submission flow.
- Munim checks the sheet directly as fallback — this is part of the daily operating routine.

### General principle

**Never lose a submission.** Every step must preserve the raw data before attempting any transformation or write. The factory's submission is the priority.

---

## Part 10 — Data Safety Rules

| Rule | Detail |
|---|---|
| Factory data is confidential | `factory_name`, address, contact, WhatsApp number, and scan answers are never exposed publicly |
| `total_risk_points` is internal | Never returned to the browser; never shown to the factory |
| `internal_sales_note` is internal | Never auto-populated; Munim writes it; never sent to client |
| `trigger_flags` are internal | Not shown in client-facing result screens or WhatsApp drafts |
| Google Sheets credentials are server-side only | Service account key must never appear in frontend code or be prefixed `NEXT_PUBLIC_` |
| WhatsApp drafts are staged, not sent | Automation generates the draft text; Munim sends from his phone |
| Failed submissions are stored locally | `vantage_failed_submissions/` folder must be excluded from public access |
| No worker personal data in MVP | The form does not collect worker names, NIDs, or individual grievance data |
| Scan results are not published | No public endpoint or public URL exposes scan results |
| Error messages are safe | Stack traces, schema details, and raw data must never appear in user-facing error messages |

---

## Part 11 — Secrets Required Later

Do not create these yet. These are the environment variables that must exist before the automated workflow can run.

Add them to `.env.local` when implementation begins. Add placeholder entries to `.env.example` at the same time.

**`.env.example` entries (commit this file — no real values):**

```bash
# Google Sheets — Gap Scan Records
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id-here
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"

# WhatsApp Business API — Munim notification only
WHATSAPP_API_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
MUNIM_WHATSAPP_NUMBER=+8801941646278

# App
NEXT_PUBLIC_SITE_URL=https://govantage.vercel.app
NODE_ENV=production
```

**Rules:**
- Never commit `.env.local` or any file with real values.
- `GOOGLE_SHEETS_PRIVATE_KEY` must be stored with escaped newlines (`\n`) — never as a multi-line value in a commit.
- `MUNIM_WHATSAPP_NUMBER` is the destination for submission notifications — server-side only.
- Add all production values to Vercel environment variables dashboard — never in the codebase.

---

## Part 12 — What Must Not Be Automated Yet

The following must remain manual until explicitly approved:

| Workflow | Reason |
|---|---|
| Sending the gap report to the factory | Contains risk scores and remediation guidance — requires Munim review |
| Sending a quotation | Commercial commitment — must be Munim's decision |
| Sending the MSA | Legal document — requires Munim's judgement on client readiness |
| Sending the Sprint Work Order | Scope commitment — requires review |
| Sending any invoice | Financial transaction — must be manually authorised |
| Generating a filled DOCX or PDF from templates | Requires human review before sending any client-facing compliance statement |
| Submitting anything to a buyer, audit body, or regulator | Not within VANTAGE scope — would require legal review |
| Generating recommendations using AI inference | All client-facing text must come from approved templates only until AI review pipeline is in place |
| Running CAP follow-up reminders | Requires a complete Sprint tracking workflow — not in MVP |
| Worker Voice grievance intake | Entirely separate system — not part of this workflow |

---

## Part 13 — Legal-Risk Review Requirements

`vantage-legal-risk-guard` must approve the following before implementation:

| Item | Why |
|---|---|
| WhatsApp draft templates A, B, and C | Client-facing compliance language must be verified |
| Munim notification template (Step 8) | Must not contain language that implies audit authority |
| Browser result screen copy | Risk band labels and Sprint CTA copy must follow LEGAL_POSITIONING_RULES.md |
| Error message copy | Must not accidentally make compliance claims |
| The disclaimer shown before form submission | Exact wording must match LEGAL_POSITIONING_RULES.md §3.1 |
| The disclaimer shown on the result screen | Exact wording must match `GAP_SCAN_FORM_SCHEMA.md` Required Disclaimer Text |

**Specific language to flag for review before use:**
- Any sentence containing "audit-ready," "compliant," "pass," "certified," "verified"
- Any sentence implying that a score guarantees an audit outcome
- Any sentence claiming VANTAGE is affiliated with BGMEA, BSCI, Sedex, DIFE, or any buyer

---

## Part 14 — QA and Security Review Requirements

`vantage-qa-security` must pass the following checks before the automation goes live:

### Form submission flow

- [ ] Required fields cannot be bypassed
- [ ] WhatsApp number validates `+880XXXXXXXXXX` format
- [ ] Q01–Q24 do not accept null answers
- [ ] Q25 accepts empty response (scores 0 points)
- [ ] Scoring produces identical results for identical inputs
- [ ] Risk band assignment matches `RISK_SCORING_MODEL.md §6` exactly
- [ ] All 7 sprint triggers are evaluated

### Google Sheets integration

- [ ] Service account credentials are never in frontend code
- [ ] Spreadsheet is not publicly accessible
- [ ] Sheet writes go through server-side API route only
- [ ] Failed write fallback creates a local JSON file and alerts Munim
- [ ] No factory data appears in browser network responses beyond the result payload

### Secrets and deployment

- [ ] No `.env` or `.env.local` is committed
- [ ] `.env.example` contains only placeholder values
- [ ] Vercel environment variables are configured in dashboard
- [ ] Production deployment does not log raw factory data

### Legal wording

- [ ] Disclaimer appears on the form before submission
- [ ] Disclaimer appears on the result screen
- [ ] No forbidden claims appear in any automated text
- [ ] WhatsApp draft templates match approved text from playbook exactly

---

## Part 15 — Future n8n Workflow Outline

When n8n is connected (Phase 2), the manual API-based workflow above becomes an n8n workflow. This outline is for planning only — do not build until approved.

### n8n Workflow: Gap Scan Intake and Follow-Up

```
[Trigger: Webhook — POST /api/gap-scan/n8n]
  ↓
[Node 1: Validate Inputs]
  → fail → [Slack/WhatsApp alert to Munim: validation error]
  → pass ↓
[Node 2: Calculate Risk Score]
  ↓
[Node 3: Assign Lead Priority]
  ↓
[Node 4: Google Sheets — Write Factory row (if new)]
[Node 5: Google Sheets — Write Contact row]
[Node 6: Google Sheets — Write Session row]
[Node 7: Google Sheets — Write 25 Answer rows]
[Node 8: Google Sheets — Write Follow-Up row]
  → fail → [Write JSON fallback + WhatsApp alert to Munim]
  → pass ↓
[Node 9: Assemble WhatsApp Draft (template substitution)]
[Node 10: Update Follow-Up row — add draft to notes column]
  ↓
[Node 11: Send Munim Notification — WhatsApp Business API]
  ↓
[Node 12: Return Result to Browser — risk band, score, top gaps]
```

**n8n notes:**
- Use the Google Sheets node with OAuth2 (not service account JSON) for easier credential rotation.
- WhatsApp node uses Meta Cloud API or Twilio WhatsApp.
- Error branch from any node should write to Google Sheets `error_log` tab and send Munim a WhatsApp alert.
- All nodes must log their output for debugging.

---

## Part 16 — Future Supabase Migration Notes

When volume justifies Supabase (see `GAP_SCAN_DATA_STORAGE_PLAN.md §8`), the automation workflow changes as follows:

| Step | Current (Google Sheets) | Future (Supabase) |
|---|---|---|
| Step 5 — Write factory | Append row to `factories` tab | `INSERT INTO factories (...)` |
| Step 5 — Write contact | Append row to `contacts` tab | `INSERT INTO contacts (...)` |
| Step 5 — Write session | Append row to `gap_scan_sessions` tab | `INSERT INTO gap_scan_sessions (...)` |
| Step 5 — Write answers | Append 25 rows to `gap_scan_answers` | `INSERT INTO gap_scan_answers (...)` (batch) |
| Step 6 — Write follow-up | Append row to `follow_ups` tab | `INSERT INTO follow_up_tasks (...)` |
| Step 8 — Query follow-up | Sheet lookup | `SELECT` query with RLS filter |
| Admin view | Google Sheets UI | Dedicated `/admin/gap-scans` page with Supabase query |

**Migration approach:**
1. Build automation against Google Sheets API.
2. Design Supabase tables to match the sheet schema from `GAP_SCAN_DATA_STORAGE_PLAN.md §3`.
3. When switching, only the data-write functions change — scoring, validation, template assembly, and notification remain identical.
4. Run both in parallel for 2 weeks to verify data parity before switching off Sheets writes.

**Supabase secrets to add at migration time:**

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

`SUPABASE_SERVICE_ROLE_KEY` is server-side only — must never have `NEXT_PUBLIC_` prefix.

---

## Part 17 — Acceptance Criteria Before Implementation

The automation workflow may not be implemented until all of the following are confirmed.

### Prerequisite files (all must be committed and current)

- [ ] `GAP_SCAN_FORM_SCHEMA.md` ✓
- [ ] `GAP_SCAN_DIGITAL_FORM_SPEC.md` ✓
- [ ] `RISK_SCORING_MODEL.md` ✓
- [ ] `GAP_SCAN_DATA_STORAGE_PLAN.md` ✓
- [ ] `FREE_GAP_SCAN_TO_SPRINT_PLAYBOOK.md` ✓
- [ ] `DOCX_TEMPLATE_FIELD_MAP.md` ✓
- [ ] This file (`GAP_SCAN_AUTOMATION_PLAN.md`) ✓

### Legal review gate

- [ ] WhatsApp templates A, B, C reviewed and approved by `vantage-legal-risk-guard`
- [ ] Munim notification template reviewed
- [ ] Result screen copy reviewed
- [ ] All disclaimer text confirmed against `LEGAL_POSITIONING_RULES.md`

### QA/security gate

- [ ] All 14 QA checks in Part 14 passing
- [ ] Google Sheets credentials confirmed as server-side only
- [ ] `.env.example` committed with placeholders
- [ ] Rollback plan documented (revert to manual `GAP_SCAN_DATA_STORAGE_PLAN.md §6` workflow)

### Manual workflow gate

- [ ] Manual workflow from `GAP_SCAN_DATA_STORAGE_PLAN.md §6` has been executed at least once on a real scan
- [ ] `VANTAGE_GapScan_Records` Google Sheet exists and all 6 tabs are set up
- [ ] Munim can open the sheet and read a submission record without assistance

### Infrastructure gate

- [ ] `GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY` exist in Vercel environment variables
- [ ] `WHATSAPP_API_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `MUNIM_WHATSAPP_NUMBER` exist in Vercel environment variables
- [ ] None of the above are committed to the repository

### Implementation gate

- [ ] Website `/gap-scan` form is live on govantage.vercel.app
- [ ] `POST /api/gap-scan/submit` route exists and passes validation tests
- [ ] Scoring function produces correct output for test inputs

---

## Next Build File

Create:

`vantage/products/gap-scan/GAP_REPORT_TEMPLATE_LOGIC.md`

Purpose:

Define how the Risk Score, Q25 named documents, and Sprint trigger flags from a completed gap scan session are assembled into the 1-page gap report using `VANTAGE_1_Page_Gap_Report_Template.docx`.
