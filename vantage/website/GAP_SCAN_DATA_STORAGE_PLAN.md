# VANTAGE — Gap Scan Data Storage Plan

**Status:** Committed v1.0  
**Owner:** Keystone Consultancy trading as VANTAGE  
**Product:** Free Gap Scan → BLA 2026 Compliance Sprint  
**Purpose:** Define the exact launch storage plan for Free Gap Scan submissions — Google Sheets at MVP, Supabase when volume demands it.

---

## Legal Positioning

The Free Gap Scan is a preliminary compliance guidance and audit-preparation review. It is not a legal opinion, certification, official audit, or verification. All data collected supports Munim's follow-up workflow and report preparation only.

Data collected during the gap scan — factory records, contact details, answers, and risk scores — is client confidential. It must not be published, shared with third parties, or stored in public folders.

---

## Source Files

| Source | Path |
|---|---|
| Form schema | `vantage/products/gap-scan/GAP_SCAN_FORM_SCHEMA.md` |
| Digital form spec | `vantage/products/gap-scan/GAP_SCAN_DIGITAL_FORM_SPEC.md` |
| Scoring model | `vantage/products/gap-scan/RISK_SCORING_MODEL.md` |
| Report assembly map | `vantage/products/gap-scan/GAP_SCAN_REPORT_ASSEMBLY_MAP.md` |
| MVP build brief | `vantage/website/CONTROL_TOWER_MVP_BUILD_BRIEF.md` |
| Backend data agent | `vantage/agents/vantage-backend-data.md` |
| Sales ops agent | `vantage/agents/vantage-sales-ops.md` |
| Brand frontend agent | `vantage/agents/vantage-brand-frontend.md` |
| Legal positioning | `vantage-source-of-truth/LEGAL_POSITIONING_RULES.md` |
| Revenue streams | `vantage-source-of-truth/REVENUE_STREAMS.md` |

---

## Part 1 — Storage Decision

### Decision: Google Sheets for MVP, Supabase later

**At launch, use Google Sheets.**

Do not build Supabase tables, authentication, or database connections until the Google Sheets workflow is live and producing real leads.

### Why Google Sheets is enough for MVP

| Reason | Detail |
|---|---|
| Zero infrastructure setup | No database, no server, no auth system — Munim is live in hours |
| Immediate visibility | Munim can open the spreadsheet from his phone during a factory visit |
| No DevOps required | Solo operator; no team to manage deployments or database access |
| Easy filtering | Sort by risk band, follow-up priority, or audit date directly in the sheet |
| Free | Google Sheets is free for one operator with low volume |
| Acceptable for early lead volume | MVP target is 6 Sprint clients in Month 1 — Sheets handles this without strain |
| Munim can edit | If a record needs a manual correction after a session, Munim can do it directly |
| WhatsApp follow-up notes | Notes and template tracking fit naturally in a spreadsheet cell |

Google Sheets is the right choice until one or more of these is true:

- Lead volume exceeds 50 active records requiring filtering
- Munim needs a dashboard to view submissions from the website without opening Sheets
- Document tracking requires secure file-path storage
- Worker Voice deploys and requires encrypted row-level access
- Multiple agents or team members need access-controlled views

At that point, migrate to Supabase using the schema in Part 6 of this file.

---

## Part 2 — Google Sheets Workbook

### Workbook name

```
VANTAGE_GapScan_Records
```

Store in Munim's Google Drive under a folder named:

```
VANTAGE / Operations / Gap Scan Records
```

Do not share this workbook publicly. Do not make it readable by anyone except Munim and any future VANTAGE team member with explicit access.

### Sheet tabs — required

| Tab name | Purpose |
|---|---|
| `factories` | One row per factory; factory profile and address |
| `contacts` | One row per contact person; linked to factory |
| `gap_scan_sessions` | One row per scan session; includes audit urgency, risk band, Sprint trigger |
| `gap_scan_answers` | One row per Q01–Q25 answer per session |
| `follow_ups` | One row per follow-up action; linked to session |
| `generated_documents` | One row per document generated; linked to session |

---

## Part 3 — Column Schema by Sheet

### 3.1 `factories` sheet

Every factory that submits a gap scan gets one row. If the same factory submits multiple times, create a new session row in `gap_scan_sessions` and link it — do not duplicate the factory row.

| Column | Field ID | Type | Required | Source | Notes |
|---|---|---|---|---|---|
| A | `factory_id` | Text | Yes | Auto-generated | Format: `FAC-YYYYMMDD-NNN` (e.g., `FAC-20260601-001`) |
| B | `factory_name` | Text | Yes | Form — Factory Profile | Used in all document file names |
| C | `factory_address` | Text | Yes | Form — Factory Profile | Full address; used in MSA and Work Order |
| D | `district_zone` | Text | Yes | Form — Factory Profile | Used for lead segmentation and travel planning |
| E | `worker_count_range` | Text | Yes | Form — Factory Profile | `<100 / 100–500 / 501–2,000 / 2,001–5,000 / 5,000+` |
| F | `main_products` | Text | No | Form — Factory Profile | Woven, knitwear, denim, accessories, etc. |
| G | `main_buyers` | Text | No | Form — Factory Profile | Comma-separated buyer names |
| H | `audit_frameworks` | Text | No | Form — Factory Profile | Comma-separated: BSCI, WRAP, SA8000, Sedex/SMETA, etc. |
| I | `created_at` | Datetime | Yes | Auto-generated | ISO 8601 format: `YYYY-MM-DDTHH:MM:SS` |
| J | `notes` | Text | No | Munim — manual | Internal notes about the factory |

---

### 3.2 `contacts` sheet

One row per contact person. A factory may have multiple contacts over time (e.g., HR Manager and Managing Director each scanned separately).

| Column | Field ID | Type | Required | Source | Notes |
|---|---|---|---|---|---|
| A | `contact_id` | Text | Yes | Auto-generated | Format: `CON-YYYYMMDD-NNN` |
| B | `factory_id` | Text | Yes | Linked from `factories` | Foreign key — must match a row in `factories` |
| C | `contact_name` | Text | Yes | Form — Contact Profile | Full name |
| D | `contact_role` | Text | Yes | Form — Contact Profile | Managing Director / HR Manager / etc. |
| E | `whatsapp_number` | Text | Yes | Form — Contact Profile | Include country code: `+8801XXXXXXXXX` |
| F | `email` | Text | No | Form — Contact Profile | Used for formal document sending |
| G | `decision_maker_present` | Text | No | Form — Contact Profile | `Yes / No / Unknown` |
| H | `created_at` | Datetime | Yes | Auto-generated | ISO 8601 |
| I | `notes` | Text | No | Munim — manual | Relationship notes, language preference, etc. |

---

### 3.3 `gap_scan_sessions` sheet

One row per gap scan session. This is the central record — all other tabs link to it.

| Column | Field ID | Type | Required | Source | Notes |
|---|---|---|---|---|---|
| A | `session_id` | Text | Yes | Auto-generated | Format: `GSS-YYYYMMDD-NNN` |
| B | `factory_id` | Text | Yes | Linked from `factories` | Foreign key |
| C | `contact_id` | Text | Yes | Linked from `contacts` | Foreign key |
| D | `session_date` | Date | Yes | Auto-generated | Date the scan was conducted |
| E | `session_mode` | Text | Yes | Form or Munim | `Virtual / On-site` |
| F | `upcoming_audit` | Text | Yes | Form — Audit Urgency | `Yes / No` |
| G | `upcoming_audit_date` | Date | No | Form — Audit Urgency | Conditional on `upcoming_audit = Yes` |
| H | `audit_standard` | Text | No | Form — Audit Urgency | BSCI, WRAP, Sedex, etc. |
| I | `recent_failed_audit` | Text | Yes | Form — Audit Urgency | `Yes / No` |
| J | `cap_deadline` | Date | No | Form — Audit Urgency | Conditional on `recent_failed_audit = Yes` |
| K | `buyer_pressure` | Text | No | Form — Audit Urgency | `Yes / No` |
| L | `critical_count` | Number | Yes | Scoring model | Count of Critical-risk "No" answers |
| M | `high_count` | Number | Yes | Scoring model | Count of High-risk "No" answers |
| N | `medium_count` | Number | Yes | Scoring model | Count of Medium-risk "No" answers |
| O | `low_count` | Number | Yes | Scoring model | Count of Low-risk "No" answers |
| P | `total_risk_points` | Number | Yes | Scoring model | Raw Risk Score (0–141); **internal only — do not share with factory** |
| Q | `compliance_score` | Number | Yes | Scoring model | `100 − round((total_risk_points ÷ 141) × 100)`; show to factory |
| R | `risk_band` | Text | Yes | Scoring model | `Low Risk / Medium Risk / High Risk / Critical Risk` |
| S | `sprint_triggered` | Text | Yes | Scoring model / trigger rules | `Yes / No` |
| T | `trigger_flags` | Text | No | Scoring model | Comma-separated active triggers: `Document black hole, Harassment cluster`, etc. |
| U | `recommended_offer` | Text | Yes | Sales ops | `No immediate offer / Document health check / BLA 2026 Compliance Sprint / Retainer follow-up` |
| V | `q25_doc_1` | Text | No | Form — Q25 | First missing document named by factory |
| W | `q25_doc_2` | Text | No | Form — Q25 | Second missing document named |
| X | `q25_doc_3` | Text | No | Form — Q25 | Third missing document named |
| Y | `double_gap_flags` | Text | No | Scoring model | Comma-separated Q numbers where Q25 doc matches a Critical question |
| Z | `internal_sales_note` | Text | No | Munim — manual | **Internal only — never share with factory** |
| AA | `status` | Text | Yes | Munim — manual | `New / Contacted / Quoted / MSA Sent / Sprint Active / Delivered / Closed / No Action` |
| AB | `created_at` | Datetime | Yes | Auto-generated | ISO 8601 |

---

### 3.4 `gap_scan_answers` sheet

One row per question per session. Every completed session has exactly 25 rows here (Q01–Q25).

| Column | Field ID | Type | Required | Source | Notes |
|---|---|---|---|---|---|
| A | `answer_id` | Text | Yes | Auto-generated | Format: `ANS-YYYYMMDD-NNN-QXX` |
| B | `session_id` | Text | Yes | Linked from `gap_scan_sessions` | Foreign key |
| C | `question_id` | Text | Yes | Form | `Q01` through `Q25` |
| D | `question_theme` | Text | Yes | Question bank | E.g., "Employment documentation" — from `GAP_SCAN_QUESTION_BANK.md` |
| E | `answer` | Text | Yes | Form | `yes / no / not_sure / not_applicable` (Q1–Q24); `short_text` for Q25 |
| F | `evidence_seen` | Text | Yes | Form | `Yes / No / Not requested` |
| G | `evidence_notes` | Text | No | Form | Notes on what evidence was or was not shown |
| H | `risk_level` | Text | Yes | Question bank | `Critical / High / Medium / Low` |
| I | `risk_points` | Number | Yes | Scoring model | Points scored for this answer (0 if Yes, full weight if No; Q25 sliding: 0/3/5/8) |
| J | `remediation_note` | Text | No | Question bank | Recommended remediation action for this question |

---

### 3.5 `follow_ups` sheet

One row per follow-up action per session. Multiple follow-up rows per session are allowed (e.g., WhatsApp sent, quotation sent, call completed).

| Column | Field ID | Type | Required | Source | Notes |
|---|---|---|---|---|---|
| A | `follow_up_id` | Text | Yes | Auto-generated | Format: `FUP-YYYYMMDD-NNN` |
| B | `session_id` | Text | Yes | Linked from `gap_scan_sessions` | Foreign key |
| C | `factory_id` | Text | Yes | Linked | For quick lookup without join |
| D | `contact_name` | Text | Yes | Linked from `contacts` | For quick reference |
| E | `whatsapp_number` | Text | Yes | Linked from `contacts` | Primary follow-up channel |
| F | `risk_band` | Text | Yes | From session | `Low Risk / Medium Risk / High Risk / Critical Risk` |
| G | `follow_up_priority` | Text | Yes | Sales ops rules | `Same day / Within 24 hours / Within 5 days / 30-day re-contact` |
| H | `recommended_offer` | Text | Yes | From session | `No immediate offer / Document health check / BLA 2026 Compliance Sprint / Retainer follow-up` |
| I | `follow_up_type` | Text | Yes | Munim — manual | `WhatsApp sent / Gap report sent / Quotation sent / Call completed / MSA sent / Invoice sent / No response` |
| J | `whatsapp_template` | Text | No | Sales playbook | Template used: `A / B / C / D / E` (from `FREE_GAP_SCAN_TO_SPRINT_PLAYBOOK.md`) |
| K | `action_date` | Date | Yes | Munim — manual | Date this follow-up action was taken |
| L | `next_action` | Text | No | Munim — manual | What Munim plans to do next |
| M | `next_action_date` | Date | No | Munim — manual | Target date for next action |
| O | `outcome` | Text | No | Munim — manual | `Interested / Not interested / No response / Signed / Paid / Declined` |
| P | `notes` | Text | No | Munim — manual | Free-text notes for this follow-up |
| Q | `created_at` | Datetime | Yes | Auto-generated | ISO 8601 |

**Lead priority rules (set `follow_up_priority` automatically or manually):**

| Condition | Priority |
|---|---|
| `risk_band = Critical` AND `upcoming_audit = Yes` | Same day |
| `risk_band = Critical` | Same day |
| `risk_band = High Risk` | Same day |
| `risk_band = Medium Risk` AND (`upcoming_audit = Yes` OR `q25_doc_1` is not empty) | Within 24 hours |
| `risk_band = Medium Risk` (no audit, no missing docs) | Within 5 days |
| `risk_band = Low Risk` | 30-day re-contact |

---

### 3.6 `generated_documents` sheet

One row per document generated or sent per session. Tracks the entire commercial document trail from gap report to invoice.

| Column | Field ID | Type | Required | Source | Notes |
|---|---|---|---|---|---|
| A | `document_id` | Text | Yes | Auto-generated | Format: `DOC-YYYYMMDD-NNN` |
| B | `session_id` | Text | Yes | Linked from `gap_scan_sessions` | Foreign key |
| C | `factory_id` | Text | Yes | Linked | For quick lookup |
| D | `document_type` | Text | Yes | Munim — manual | `Gap Report / Quotation / MSA / Sprint Work Order / Invoice (50%) / Invoice (balance) / CAP` |
| E | `file_name` | Text | Yes | Assembly map naming convention | E.g., `VANTAGE_1Page_GapReport_AcmeMills_20260601.pdf` |
| F | `file_location` | Text | No | Munim — manual | Google Drive path or folder name — **never a public URL** |
| G | `status` | Text | Yes | Munim — manual | `Draft / Sent / Signed / Paid / Delivered` |
| H | `sent_via` | Text | No | Munim — manual | `WhatsApp / Email / Both` |
| I | `sent_date` | Date | No | Munim — manual | Date document was sent to factory |
| J | `signed_date` | Date | No | Munim — manual | Date factory signed (MSA, Work Order) |
| K | `payment_amount` | Number | No | Munim — manual | In BDT — for invoices only |
| L | `payment_received_date` | Date | No | Munim — manual | Date payment cleared |
| M | `payment_method` | Text | No | Munim — manual | `bKash / Nagad / Bank transfer` |
| N | `notes` | Text | No | Munim — manual | Any notes about this document |
| O | `created_at` | Datetime | Yes | Auto-generated | ISO 8601 |

---

## Part 4 — Field Mapping from GAP_SCAN_FORM_SCHEMA.md

This table maps every field defined in `GAP_SCAN_FORM_SCHEMA.md` to its Google Sheets destination.

### Factory Profile Fields

| Schema field ID | Sheet | Column |
|---|---|---|
| `factory_name` | `factories` | B |
| `factory_address` | `factories` | C |
| `district_zone` | `factories` | D |
| `worker_count_range` | `factories` | E |
| `main_products` | `factories` | F |
| `main_buyers` | `factories` | G |
| `audit_frameworks` | `factories` | H |

### Contact Profile Fields

| Schema field ID | Sheet | Column |
|---|---|---|
| `contact_name` | `contacts` | C |
| `contact_role` | `contacts` | D |
| `whatsapp_number` | `contacts` | E |
| `email` | `contacts` | F |
| `decision_maker_present` | `contacts` | G |

### Audit Urgency Fields

| Schema field ID | Sheet | Column |
|---|---|---|
| `upcoming_audit` | `gap_scan_sessions` | F |
| `upcoming_audit_date` | `gap_scan_sessions` | G |
| `recent_failed_audit` | `gap_scan_sessions` | I |
| `cap_deadline` | `gap_scan_sessions` | J |
| `buyer_pressure` | `gap_scan_sessions` | K |

### Gap Scan Answer Fields (Q01–Q25)

| Schema field | Sheet | Column |
|---|---|---|
| `question_id` | `gap_scan_answers` | C |
| `answer` | `gap_scan_answers` | E |
| `evidence_seen` | `gap_scan_answers` | F |
| `evidence_notes` | `gap_scan_answers` | G |
| `risk_level` | `gap_scan_answers` | H |
| `risk_points` | `gap_scan_answers` | I |
| `remediation_note` | `gap_scan_answers` | J |

### Scoring Output Fields

| Schema field ID | Sheet | Column |
|---|---|---|
| `critical_count` | `gap_scan_sessions` | L |
| `high_count` | `gap_scan_sessions` | M |
| `medium_count` | `gap_scan_sessions` | N |
| `low_count` | `gap_scan_sessions` | O |
| `total_risk_points` | `gap_scan_sessions` | P |
| `risk_band` | `gap_scan_sessions` | R |
| `sprint_triggered` | `gap_scan_sessions` | S |
| `recommended_offer` | `gap_scan_sessions` | U |

---

## Part 5 — Risk Score Storage Rules

### What to store

| Field | Value stored | Audience |
|---|---|---|
| `total_risk_points` | Raw Risk Score (0–141) | Munim only — internal |
| `compliance_score` | Normalised 0–100 score | Client-facing — shareable |
| `risk_band` | Low / Medium / High / Critical | Both — different language per audience |
| `sprint_triggered` | Yes / No | Munim only |
| `trigger_flags` | Comma-separated trigger names | Munim only |

### What not to show factories

- Raw `total_risk_points` — the 0–141 raw score is Munim's internal tool.
- `internal_sales_note` — Munim-only column; never shared.
- `trigger_flags` — internal sales logic; not for client-facing output.

### Score calculation to record

Calculate and store both numbers at the time the session is saved:

```
Compliance Score = 100 − round((total_risk_points ÷ 141) × 100)
```

If the score is calculated in the browser (frontend), it must be sent to the storage layer identically — do not recalculate on the backend. One calculation, one record.

### Q25 sliding score rule

| Factory response | `risk_points` to record in `gap_scan_answers` row for Q25 |
|---|---|
| 0 documents named | 0 |
| 1 document named | 3 |
| 2 documents named | 5 |
| 3 or more documents named | 8 |

Store the exact document names in `q25_doc_1`, `q25_doc_2`, `q25_doc_3` on the `gap_scan_sessions` row.

---

## Part 6 — Manual Workflow for Munim (Phase 1)

This is the manual process while the digital form is in development or during field visits using the printed form.

### Step 1 — During or after the scan session

1. Open `VANTAGE_GapScan_Records` Google Sheet.
2. Add a new row to `factories` if the factory does not already exist. Generate `factory_id`.
3. Add a new row to `contacts` for the person present. Generate `contact_id`. Link to `factory_id`.
4. Add a new row to `gap_scan_sessions`. Generate `session_id`. Link to `factory_id` and `contact_id`.
5. Fill in all audit urgency fields (columns F–K).

### Step 2 — Scoring

6. Add 25 rows to `gap_scan_answers` — one per question Q01–Q25.
7. Fill in `answer`, `evidence_seen`, `evidence_notes`, and `risk_points` for each row.
8. For Q25, record the exact document names in `q25_doc_1/2/3` on the session row.
9. Sum `risk_points` across all 25 answer rows → enter in `total_risk_points`.
10. Calculate `compliance_score` using the formula above → enter.
11. Assign `risk_band`, `sprint_triggered`, and `recommended_offer`.
12. Tick off any `trigger_flags` that apply.

### Step 3 — Follow-up

13. Add a row to `follow_ups`. Set `follow_up_priority` per the priority rules in Part 3.5.
14. Send the correct WhatsApp template (A, B, or C) from `FREE_GAP_SCAN_TO_SPRINT_PLAYBOOK.md`.
15. Record `whatsapp_template` used and `action_date`.
16. Set `next_action` and `next_action_date`.

### Step 4 — Documents

17. For every document generated or sent, add a row to `generated_documents`.
18. Record `document_type`, `file_name`, `status`, `sent_via`, and `sent_date`.
19. As MSA is signed and payments are received, update `signed_date`, `payment_amount`, `payment_received_date`.

### Step 5 — Status tracking

20. Update `status` on the `gap_scan_sessions` row as the deal progresses:
    - `New` → `Contacted` → `Quoted` → `MSA Sent` → `Sprint Active` → `Delivered` → `Closed`
21. Update `outcome` on the `follow_ups` row after each interaction.

---

## Part 7 — WhatsApp Follow-Up Fields

The `follow_ups` sheet contains all WhatsApp-relevant fields. The following columns drive Munim's outreach:

| Column | Purpose |
|---|---|
| `whatsapp_number` (E) | Primary follow-up channel — click to open WhatsApp directly |
| `risk_band` (F) | Determines which template to use |
| `follow_up_priority` (G) | When to send: same day / 24h / 5 days / 30 days |
| `recommended_offer` (H) | Shapes message content |
| `whatsapp_template` (J) | Which template was sent (A = High/Critical, B = Medium, C = Low) |
| `action_date` (K) | When the message was sent |
| `next_action` (L) | What to do next: send quotation / call / wait |
| `next_action_date` (M) | When to do it |
| `outcome` (O) | Result of the follow-up |

**WhatsApp link formula for Google Sheets (add to a helper column if needed):**

```
=HYPERLINK("https://wa.me/"&SUBSTITUTE(E2,"+",""),"Open WhatsApp")
```

This opens the WhatsApp chat for that contact directly from the sheet.

---

## Part 8 — Future Supabase Migration Plan

Do not implement this until the Google Sheets workflow is producing real leads and Munim approves the migration.

### When to migrate

Trigger conditions:

- 50+ active factory records in Sheets requiring complex filtering
- Website form is live and submitting data automatically
- Munim needs a dashboard that does not require opening Sheets
- Worker Voice system needs encrypted grievance storage
- Multiple agents or team members need access-controlled views

### Supabase table plan

| Table | Maps from Google Sheets tab |
|---|---|
| `factories` | `factories` |
| `contacts` | `contacts` |
| `gap_scan_sessions` | `gap_scan_sessions` |
| `gap_scan_answers` | `gap_scan_answers` |
| `follow_up_tasks` | `follow_ups` |
| `generated_documents` | `generated_documents` |
| `service_engagements` | New — tracks Sprint progress phases |
| `invoices` | New — extracted from `generated_documents` for payment tracking |
| `worker_voice_cases` | New — Worker Voice grievance records (Phase 2) |

### Migration approach

1. Export Google Sheets tabs as CSV.
2. Create Supabase tables with the column schemas from Part 3 as the field definitions.
3. Import CSVs via Supabase dashboard or CLI.
4. Generate `factory_id`, `contact_id`, `session_id` UUIDs to replace the short codes.
5. Apply Row Level Security (RLS) so only authenticated users see records.
6. Update the `POST /api/gap-scan/submit` endpoint to write to Supabase instead of Sheets.
7. Keep Google Sheets as a read-only archive for the first 30 days after migration.

---

## Part 9 — Future API Endpoint Plan

Do not build these endpoints until the data schema and storage are stable.

| Endpoint | Method | Purpose | Storage target |
|---|---|---|---|
| `/api/gap-scan/submit` | POST | Receive complete form submission, score, and write to storage | Google Sheets (MVP) → Supabase (later) |
| `/api/gap-scan/score` | POST | Accept Q01–Q25 answers, return risk score and band | Stateless — no storage needed |
| `/api/admin/gap-scans` | GET | Admin list of all sessions with filters | Supabase only — not for MVP |
| `/api/admin/gap-scans/[id]` | GET | Admin detail view of a single session | Supabase only |
| `/api/documents/generate` | POST | Trigger document generation workflow | Phase 2 — not for MVP |
| `/api/follow-up/create` | POST | Create a follow-up task | Phase 2 — not for MVP |
| `/api/notify/munim` | POST | Send WhatsApp notification to Munim when form is submitted | MVP — via WhatsApp Business API |

### MVP `/api/gap-scan/submit` behaviour

At MVP, this endpoint must:

1. Validate required fields (factory name, WhatsApp number, all 25 answers).
2. Calculate total risk score and compliance score server-side.
3. Determine risk band and recommended offer.
4. Check all 7 Sprint trigger rules.
5. Write one row to `gap_scan_sessions` in Google Sheets via service account.
6. Write 25 rows to `gap_scan_answers` in Google Sheets.
7. Write one row to `factories` (or skip if factory already exists).
8. Write one row to `contacts` (or skip if contact already exists).
9. Send WhatsApp notification to Munim (risk band, factory name, WhatsApp number).
10. Return risk band and compliance score to frontend for results screen.

---

## Part 10 — Data Safety Rules

### What must not be stored publicly

| Data | Rule |
|---|---|
| Factory name and address | Private — stored in Sheets/Supabase only, never in public repo |
| Contact name and WhatsApp number | Private — same |
| Risk scores and gap answers | Private — internal to VANTAGE |
| Q25 missing document names | Private — highly sensitive; reveals factory exposure |
| Internal sales notes (`internal_sales_note`) | Private — never shown to factory |
| Trigger flags | Private — internal scoring logic |
| Generated document paths | Private — Google Drive links are never public |
| Factory audit results, CAP records | Private — client confidential per MSA §3.4 |

### What is safe to reference publicly (with no factory names)

- Aggregate statistics, e.g., "60% of factories scanned had incomplete grievance procedures" — only in Intelligence Brief and only with Munim's approval
- Risk band distribution trends — without any factory identification
- Anonymised case notes in Intelligence Brief — only after explicit client consent

### .env and secrets rules

| Secret | Variable name | Where it lives | Rule |
|---|---|---|---|
| Google Sheets workbook ID | `GOOGLE_SHEETS_ID` | `.env.local` only | Never commit to repo |
| Google Service Account JSON | `GOOGLE_SERVICE_ACCOUNT_KEY` | `.env.local` only | Never commit to repo |
| Supabase project URL | `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` | Never commit — add to Vercel environment variables |
| Supabase anon key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` | Never commit — add to Vercel environment variables |
| Supabase service role key | `SUPABASE_SERVICE_ROLE_KEY` | `.env.local` | Server-side only — never exposed to browser |
| WhatsApp Business API token | `WHATSAPP_API_TOKEN` | `.env.local` | Never commit |
| Munim's WhatsApp number | `MUNIM_WHATSAPP_NUMBER` | `.env.local` | Internal — not in frontend code |

### `.env` file rules

- Never commit `.env`, `.env.local`, or `.env.production` to the repository.
- Commit `.env.example` only — with placeholder values, no real keys.
- All production secrets go into Vercel environment variables (dashboard only — not in code).
- Rotate the Google service account key if it is ever accidentally committed.

### `.env.example` format (commit this file — no real values)

```bash
# Google Sheets
GOOGLE_SHEETS_ID=your-google-sheets-workbook-id-here
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}

# Supabase (Phase 2 only — leave blank until migration)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# WhatsApp Business API
WHATSAPP_API_TOKEN=
MUNIM_WHATSAPP_NUMBER=+8801941646278

# App
NEXT_PUBLIC_SITE_URL=https://govantage.vercel.app
```

---

## Part 11 — Acceptance Criteria Before Implementation

The data storage layer may not be implemented until all of the following are confirmed.

### Data schema

- [ ] All 6 sheet tabs are documented with full column schemas (this file).
- [ ] Every field in `GAP_SCAN_FORM_SCHEMA.md` has a mapped destination in a sheet column.
- [ ] Q25 sliding score rule is recorded in this file and matched in the scoring model.
- [ ] Risk band logic matches `RISK_SCORING_MODEL.md §6` exactly.
- [ ] All 7 Sprint trigger flags are stored in `trigger_flags` column.
- [ ] `total_risk_points` is marked internal; `compliance_score` is marked client-facing.

### Google Sheets setup

- [ ] `VANTAGE_GapScan_Records` workbook created in Munim's Google Drive.
- [ ] All 6 tabs created with correct column headers.
- [ ] Workbook is not publicly shared.
- [ ] Google service account is created with editor access to the workbook.
- [ ] Service account key is stored in `.env.local` only — not committed.
- [ ] `GOOGLE_SHEETS_ID` is confirmed and added to `.env.local`.

### Legal and data safety

- [ ] No factory names, contact data, or scan records are committed to the repository.
- [ ] No `.env` file is committed.
- [ ] `.env.example` is committed with placeholder values only.
- [ ] All client-facing score displays use `compliance_score` (0–100), not `total_risk_points`.
- [ ] `internal_sales_note` and `trigger_flags` columns are confirmed as internal-only.
- [ ] Required legal disclaimer appears in the form before submission and on the result screen.

### Implementation gate

- [ ] `GAP_SCAN_DIGITAL_FORM_SPEC.md` is committed and current.
- [ ] `RISK_SCORING_MODEL.md` is committed and current.
- [ ] `CONTROL_TOWER_PAGE_COPY_SPEC.md` is committed and current.
- [ ] This file (`GAP_SCAN_DATA_STORAGE_PLAN.md`) is committed and current.
- [ ] `vantage-ceo-controller` has approved beginning implementation.

---

## Next Build File

Create:

`vantage/products/gap-scan/GAP_REPORT_TEMPLATE_LOGIC.md`

Purpose:

Define how the Risk Score, Q25 named documents, and Sprint trigger flags are converted into the structured output of the 1-page gap report (`VANTAGE_1_Page_Gap_Report_Template.docx`).
