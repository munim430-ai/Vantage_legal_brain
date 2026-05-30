# VANTAGE — Gap Scan Digital Form Specification

**Status:** Committed v1.0  
**Owner:** Keystone Consultancy trading as VANTAGE  
**Product:** Free Gap Scan → BLA 2026 Compliance Sprint  
**Page route:** `/gap-scan`  
**Sources:** `GAP_SCAN_FORM_SCHEMA.md`, `GAP_SCAN_QUESTION_BANK.md`, `RISK_SCORING_MODEL.md`, `GAP_SCAN_REPORT_ASSEMBLY_MAP.md`, `FIRST_BUILD_TARGET.md`, `vantage/brand/colors.md`, `vantage/brand/typography.md`, `vantage/brand/assets-manifest.md`

---

## Legal Positioning

This form delivers a preliminary compliance guidance and audit-preparation gap scan. It must not be represented as an audit, a legal opinion, a certification, or the output of a verification body. All generated scores and reports are subject to the disclaimer in `vantage-source-of-truth/LEGAL_POSITIONING_RULES.md §3.1` and §3.2.

Approved terminology on all screens: **compliance guidance**, **audit preparation**, **gap report**, **corrective action plan**, **remediation support**.

Forbidden on all screens: certify, guarantee audit pass, legal advice, official audit, verification body.

---

## 1. Page Route and Entry Points

| Property | Value |
|----------|-------|
| Route | `/gap-scan` |
| Page title (English) | Free BLA 2026 Gap Scan — VANTAGE |
| Page title (Bangla) | বিনামূল্যে বিএলএ ২০২৬ গ্যাপ স্ক্যান — VANTAGE |
| Entry point 1 | CTA button "Book Your Free Gap Scan" on `/` landing page |
| Entry point 2 | CTA button "See your compliance score" on `/` landing page (auto-scrolls to form start) |
| Entry point 3 | Direct WhatsApp link shared in broadcasts |
| Entry point 4 | Direct URL shared in LinkedIn posts and BGMEA workshop handouts |
| Meta description | "Free 25-question BLA 2026 compliance gap scan for Bangladesh RMG factories. Get your compliance score in 90 minutes. No cost. No commitment." |

---

## 2. User Flow

```
Factory HR manager or Director arrives at /gap-scan
        ↓
Language toggle visible at top right (EN / বাং)
        ↓
Step 1 — Factory Profile (7 fields)
        ↓
Step 2 — Contact Profile (5 fields)
        ↓
Step 3 — Audit Urgency (5 fields)
        ↓
Step 4 — 25-Question Gap Scan
         Q1–Q24: Yes / No / Not Sure / Not Applicable
         Q25: Short text (top 3 documents not producible in 24h)
         Running risk score visible in sidebar (desktop) or sticky bar (mobile)
        ↓
Step 5 — Evidence Notes (optional per Critical/High gap)
        ↓
[Submit]
        ↓
Client-facing Result Screen
  - Compliance Score (X / 100)
  - Risk Band (Low / Medium / High / Critical)
  - Top 5 gaps listed
  - Missing documents listed
  - CTA: Sprint / Retainer / Document check (determined by risk band)
        ↓
[Munim receives submission notification via WhatsApp and email]
[Data saved to Google Sheets or Supabase depending on phase]
        ↓
Factory receives auto-reply WhatsApp: "VANTAGE received your gap scan. We will contact you within 24 hours."
```

---

## 3. Form Layout

The form uses a **multi-step wizard layout** with a visible progress indicator at the top.

```
[VANTAGE logo]  [EN | বাং]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 1 of 5  [Factory Profile]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[form fields]
[Back] [Continue →]
```

Progress steps (5):
1. Factory Profile
2. Contact Profile
3. Audit Urgency
4. Gap Scan Questions (Q1–Q25)
5. Evidence Notes → Submit

On desktop (≥ 768px): progress bar across the top, running score sidebar on the right during Step 4.  
On mobile (< 768px): step indicator at top, running score in sticky bottom bar during Step 4.

---

## 4. Form Sections and Fields

### Section 1 — Factory Profile

| Field ID | Label (EN) | Label (বাং) | Type | Required | Validation |
|----------|-----------|-----------|------|----------|------------|
| `factory_name` | Factory name | কারখানার নাম | Text | Yes | Non-empty, max 120 chars |
| `factory_address` | Factory address | কারখানার ঠিকানা | Textarea | Yes | Non-empty, max 300 chars |
| `district_zone` | District / Industrial zone | জেলা / শিল্প এলাকা | Select + free text | Yes | Must select or type |
| `worker_count_range` | Number of workers | কর্মীর সংখ্যা | Select | Yes | Must select one |
| `main_products` | Main products (e.g. woven, knitwear) | প্রধান পণ্য | Text | No | Max 100 chars |
| `main_buyers` | Main buyers (if comfortable sharing) | প্রধান ক্রেতা | Text | No | Max 200 chars |
| `audit_frameworks` | Upcoming audit frameworks | অডিট ফ্রেমওয়ার্ক | Multi-select checkboxes | No | Any valid selection |

`district_zone` options: Dhaka, Gazipur, Ashulia, Narayanganj, Chittagong, Comilla EPZ, Other (with text field).

`worker_count_range` options: Less than 100 / 100–500 / 501–2,000 / 2,001–5,000 / More than 5,000.

`audit_frameworks` checkboxes: BSCI / WRAP / SA8000 / Sedex/SMETA / SLCP / Better Work / RSC / Buyer internal audit / Unknown.

---

### Section 2 — Contact Profile

| Field ID | Label (EN) | Label (বাং) | Type | Required | Validation |
|----------|-----------|-----------|------|----------|------------|
| `contact_name` | Your name | আপনার নাম | Text | Yes | Non-empty, max 100 chars |
| `contact_role` | Your role | আপনার পদ | Select + free text | Yes | Must select or type |
| `whatsapp_number` | WhatsApp number | হোয়াটসঅ্যাপ নম্বর | Phone | Yes | Bangladesh format: 01XXXXXXXXX; 11 digits |
| `email` | Email address (optional) | ইমেইল (ঐচ্ছিক) | Email | No | Valid email format if provided |
| `decision_maker_present` | Are you the decision-maker for compliance services? | আপনি কি কমপ্লায়েন্স সেবার সিদ্ধান্তগ্রহণকারী? | Yes / No | No | — |

`contact_role` options: Managing Director / Director / Factory Manager / HR Manager / Compliance Manager / Admin Manager / Other.

---

### Section 3 — Audit Urgency

| Field ID | Label (EN) | Label (বাং) | Type | Required | Validation |
|----------|-----------|-----------|------|----------|------------|
| `upcoming_audit` | Is there an upcoming audit scheduled? | কি কোনো আসন্ন অডিট নির্ধারিত আছে? | Yes / No / Not sure | Yes | Must select |
| `upcoming_audit_date` | If yes — approximate audit date | যদি হ্যাঁ — আনুমানিক অডিটের তারিখ | Date picker | Conditional (if `upcoming_audit` = Yes) | Must be a future date |
| `recent_failed_audit` | Has the factory received a CAP from a recent audit? | কারখানাটি কি সম্প্রতি কোনো CAP পেয়েছে? | Yes / No | Yes | Must select |
| `cap_deadline` | If yes — CAP deadline | যদি হ্যাঁ — CAP এর সময়সীমা | Date picker | Conditional (if `recent_failed_audit` = Yes) | Must be a future date |
| `buyer_pressure` | Has the factory received a buyer compliance request or demand letter? | কারখানাটি কি ক্রেতার কমপ্লায়েন্স অনুরোধ পেয়েছে? | Yes / No | No | — |

---

### Section 4 — 25-Question Gap Scan

This is the core section. All 25 questions are displayed in a single scrollable list (not paginated) within Step 4.

#### Answer option layout per question (Q1–Q24):

```
┌─────────────────────────────────────────────────────────────┐
│  Q1  ● Critical risk                                        │
│  Do all workers have written appointment letters...?        │
│                                                             │
│  ○ Yes — documents are present and up to date              │
│  ○ No — documents are missing or incomplete                │
│  ○ Not sure                                                 │
│  ○ Not applicable to this factory                           │
│                                                             │
│  [+ Add evidence note]   (expands inline text field)        │
└─────────────────────────────────────────────────────────────┘
```

Risk level badge colours (small pill label beside each question number):
- Critical → `#1A1A24` background, `#FFFFFF` text
- High → `#006D77` background, `#FFFFFF` text  
- Medium → `#E2B44F` background, `#1A1A24` text
- Low → `#F0F0F0` background, `#505050` text

#### Question 25 layout (short answer):

```
┌─────────────────────────────────────────────────────────────┐
│  Q25  ● Critical risk                                       │
│  What are the top three compliance documents the factory    │
│  cannot produce within 24 hours?                            │
│                                                             │
│  Document 1: [________________________]                     │
│  Document 2: [________________________]   (optional)        │
│  Document 3: [________________________]   (optional)        │
│                                                             │
│  Leave blank if all documents are immediately available.    │
└─────────────────────────────────────────────────────────────┘
```

Scoring logic for Q25 is applied automatically:
- 0 fields filled → 0 points
- 1 field filled → 3 points
- 2 fields filled → 5 points
- 3 fields filled → 8 points

#### Running score display (during Step 4):

**Desktop sidebar (right panel, sticky):**
```
Your Compliance Score
━━━━━━━━━━━━━━━━━━━━
        57
       / 100
━━━━━━━━━━━━━━━━━━━━
Risk level: HIGH
━━━━━━━━━━━━━━━━━━━━
● Critical gaps:  3
● High gaps:      4
● Medium gaps:    1
━━━━━━━━━━━━━━━━━━━━
Questions answered: 18 / 25
```

**Mobile sticky bar (bottom of viewport):**
```
Score: 57/100 · Risk: HIGH · ⬤ 3 Critical
```

The score updates in real time as each answer is selected. The risk band label updates when the score crosses a threshold.

---

### Section 5 — Evidence Notes

After Q1–Q25 are answered, the form shows a summary of all "No" answers grouped by risk level. For each Critical and High "No," Munim (or the factory contact) can enter an inline evidence note.

Label (EN): "Add a note about what evidence was reviewed (optional)"  
Label (বাং): "কী প্রমাণ পর্যালোচনা করা হয়েছে তা লিখুন (ঐচ্ছিক)"

These notes feed directly into the gap report body and the corrective action plan.

---

## 5. Save and Submit Behaviour

### Auto-save
- Auto-save to `localStorage` every time the user moves between steps.
- On page reload, restore the in-progress form with a banner: "You have an incomplete gap scan. Continue where you left off?"
- Auto-save does **not** write to the backend until Submit is clicked.

### Partial submission option
- After Step 3 (Audit Urgency), a "Save and continue later" link appears.
- Generates a unique URL (UUID-based) that the factory contact can use to return.
- URL stored in `localStorage` only at launch; in Supabase `gap_scan_sessions` table in Phase 2.

### Final submit
- Validate all required fields before allowing submission (see §10 Validation Rules).
- Show a submission confirmation spinner for 1–2 seconds.
- On success: navigate to the Result Screen.
- On failure: show an inline error banner: "Submission failed. Your answers are saved. Please try again or contact VANTAGE on WhatsApp." Include the WhatsApp link.

### What happens on submit
1. Risk score is calculated client-side (see §6).
2. Form data is serialised to a JSON object matching the `GAP_SCAN_FORM_SCHEMA.md` structure.
3. JSON is posted to a Vercel serverless function (`/api/gap-scan/submit`).
4. Serverless function writes to Google Sheets (Phase 1) or Supabase (Phase 2) — see §12.
5. Serverless function sends Munim a WhatsApp notification via WhatsApp Business API (or Twilio fallback) with the factory name, score, risk band, and top 3 gaps.
6. Serverless function sends the factory contact an auto-reply WhatsApp: "VANTAGE received your gap scan. We will contact you within 24 hours to discuss your results."
7. User is redirected to the Result Screen.

---

## 6. Risk Score Calculation (Client-Side)

The score is calculated in the browser in real time. No server round-trip is needed for score display.

```
Risk Score = sum of points for all "No" answers
  Q1-Q24: use weight from RISK_SCORING_MODEL.md per-question weight table
  Q25: 0 docs = 0 pts, 1 doc = 3 pts, 2 docs = 5 pts, 3 docs = 8 pts
  "Not sure" = treated as "No" for scoring (conservative approach)
  "Not applicable" = 0 points

Maximum possible Risk Score = 141

Compliance Score = 100 − round((Risk Score ÷ 141) × 100)

Risk band:
  0–15   → Low Risk
  16–35  → Medium Risk
  36–60  → High Risk
  61+    → Critical Risk

Sprint trigger flags (boolean, evaluated after scoring):
  document_black_hole   = Q25 has 3 documents named
  welfare_cluster       = Q12 No AND Q13 No AND Q15 No
  harassment_cluster    = Q15 No AND Q16 No
  wage_evidence_absent  = Q8 No AND Q9 No
  child_labour_exposure = Q2 No
  open_cap_unmanaged    = Q24 No AND any Critical question No
  critical_threshold    = Risk Score ≥ 61
```

Any trigger flag being `true` sets `sprint_triggered = true` regardless of total score.

---

## 7. Result Screen

The Result Screen is shown immediately after successful submission. It is also accessible at `/gap-scan/result/[session_id]` for returning to a completed scan.

### Layout

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[VANTAGE logo]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your BLA 2026 Compliance Score

          57 / 100
         HIGH RISK

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gap summary
  ● Critical gaps:   3
  ● High gaps:       5
  ● Medium gaps:     2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Top 5 gaps identified
  1. [Q1 — Employment documentation]   ● Critical
  2. [Q9 — Wage calculation records]   ● Critical
  3. [Q15 — Anti-harassment policy]    ● Critical
  4. [Q5 — Working hours documentation] ● High
  5. [Q11 — Leave records]             ● High
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Missing documents (from Q25)
  1. [Document named by factory]
  2. [Document named by factory]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[CTA block — see §8]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Disclaimer block — see §13]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Score display colours on Result Screen:

| Risk band | Score number colour | Background accent |
|-----------|--------------------|--------------------|
| Low Risk | `#006D77` (teal) | `#F0F0F0` |
| Medium Risk | `#E2B44F` (gold) | `#F0F0F0` |
| High Risk | `#1A1A24` (near-black) | `#DADAE7` |
| Critical Risk | `#FFFFFF` | `#1A1A24` (near-black full-bleed) |

---

## 8. CTA Logic

The primary CTA on the Result Screen is determined by the risk band and sprint trigger flags.

### Band 1 — Low Risk (0–15) — no sprint triggers fired

**Headline:** "Your factory has a low visible compliance risk."  
**Bangla:** "আপনার কারখানার দৃশ্যমান কমপ্লায়েন্স ঝুঁকি কম।"  
**Body:** "The gaps identified are procedural and can be addressed with targeted document improvement. VANTAGE recommends a structured gap report to confirm your records are audit-ready."

**Primary CTA button:** "Request a Full Gap Report" → links to `/book`  
**Secondary CTA:** "Subscribe to the Intelligence Brief" → links to `/intelligence-brief`

---

### Band 2 — Medium Risk (16–35)

**Headline:** "Your factory has compliance gaps that will be raised in an audit."  
**Bangla:** "আপনার কারখানায় এমন কমপ্লায়েন্স গ্যাপ আছে যা অডিটে উঠে আসবে।"  
**Body:** "A corrective action plan is needed before your next buyer review. VANTAGE can prepare a full gap report and corrective action plan through the BLA 2026 Compliance Sprint."

**Primary CTA button:** "Start the BLA 2026 Compliance Sprint" → links to `/book?offer=sprint`  
**Secondary CTA link:** "Talk to VANTAGE on WhatsApp first" → WhatsApp link

---

### Band 3 — High Risk (36–60)

**Headline:** "Your factory has significant compliance gaps across multiple areas."  
**Bangla:** "আপনার কারখানায় একাধিক ক্ষেত্রে গুরুত্বপূর্ণ কমপ্লায়েন্স গ্যাপ রয়েছে।"  
**Body:** "These gaps create a risk of nonconformity findings or buyer compliance action. VANTAGE recommends starting a BLA 2026 Compliance Sprint as soon as possible to prepare a gap report, corrective action plan, and remediation support package."

**Primary CTA button:** "Start the BLA 2026 Compliance Sprint — BDT 55,000" → links to `/book?offer=sprint`  
**Urgency note (if `upcoming_audit_date` is within 45 days):** "Your audit is in [X] days. Sprint delivery is 5 working days."

---

### Band 4 — Critical Risk (61+) or any sprint trigger fired

**Full-bleed dark background (`#1A1A24`), white text.**  
**Headline:** "Your factory has critical compliance gaps."  
**Bangla:** "আপনার কারখানায় গুরুতর কমপ্লায়েন্স গ্যাপ রয়েছে।"  
**Body:** "These gaps represent an immediate risk to your buyer relationships. VANTAGE recommends starting a BLA 2026 Compliance Sprint within the next 5 working days."

**Primary CTA button (gold `#E2B44F`, near-black text):** "Book Your Sprint Now — BDT 55,000" → links to `/book?offer=sprint&urgency=critical`  
**Secondary CTA:** "WhatsApp VANTAGE now" → WhatsApp link with pre-filled message: "I just completed the gap scan. My score is [X]/100. I want to book the Sprint."

**Trigger-specific addition (welfare cluster):** "Your factory has gaps in maternity protection, grievance handling, and anti-harassment policy. These are zero-tolerance areas in Sedex/SMETA audits. Ask about the Worker Voice add-on when you book."

---

### Sprint CTA — All bands (if `upcoming_audit` = Yes and date < 30 days)

Regardless of band, if `upcoming_audit_date` is within 30 days, add an urgency banner above the CTA:

```
⚠ Your audit is in [X] days.
VANTAGE Sprint delivery is 5 working days.
Book before [date 6 working days before audit date].
```

---

## 9. Bangla / English Toggle Requirements

| Requirement | Detail |
|-------------|--------|
| Toggle placement | Top right of all pages and form steps, persistent across navigation |
| Toggle label | `EN` / `বাং` — text only, no flag icons |
| Default language | English |
| Switching behaviour | Instantly re-renders all visible text with no page reload |
| Scope | All form labels, question text, placeholder text, answer options, CTA copy, result screen copy, error messages, disclaimer text |
| Bangla font | Hind Siliguri or Noto Sans Bengali, loaded via Google Fonts or bundled |
| Bangla font weight | Regular (400) for body, SemiBold (600) for headings |
| Bangla font size | Match English size scale; do not reduce for Bangla |
| Input language | Both toggles accept mixed Bangla/English input — do not restrict typing |
| Storage | Selected language saved to `localStorage` as `vantage_lang` |
| Questions | Q1–Q24 are phrased as Yes/No regardless of language — both translations must maintain the same answer polarity |
| Q25 | Short-answer field accepts Bangla or English input — store as-is |
| RTL | Not required — Bangla is LTR |

---

## 10. Mobile-First UI Requirements

| Requirement | Detail |
|-------------|--------|
| Minimum viewport | 320px width |
| Primary target | Android Chrome on a budget device (~360px, ~4G) |
| LCP target | < 3 seconds on simulated 4G (Vercel Analytics) |
| Touch targets | Minimum 44 × 44px for all buttons, radio options, and checkboxes |
| Radio/checkbox size | Custom styled — minimum 20 × 20px visual target with 44px touch padding |
| Font rendering | Anti-aliased; do not use sub-12px text on mobile |
| Form input | `font-size: 16px` minimum on all inputs to prevent iOS zoom-on-focus |
| Step navigation | "Back" and "Continue" buttons at bottom of each step, full-width on mobile |
| Question list | Each question is a full-width card with the risk badge, question text, and answer options in vertical stack |
| Evidence notes | Collapsible — tap "+ Add note" to expand inline textarea |
| Running score | Sticky bottom bar, 48px height, showing score/100, risk band, and critical gap count — updates live |
| Result screen | Single column on mobile; score centred at top; gaps in a flat card list |
| Auto-complete | `autocomplete="tel"` on WhatsApp field; `autocomplete="email"` on email field |
| Images | No hero images on the gap scan page — text and colour only |
| Logo | `logo-wordmark-black-on-white.jpeg` in the dark header → swap to `logo-wordmark-white-on-black.jpeg`; minimum width 120px |

---

## 11. Admin / Munim View Requirements

The admin view is not a public page. It is accessed at `/admin/gap-scan` with a simple authentication gate (environment variable password check at launch; NextAuth in Phase 2).

### Admin list view (`/admin/gap-scan`)

A table of all completed gap scan submissions, sortable and filterable.

| Column | Description |
|--------|-------------|
| Date | Submission date/time |
| Factory name | Linked to detail view |
| District | From `district_zone` |
| Score | Compliance Score (X/100) |
| Risk band | Colour-coded badge |
| Sprint triggered | Yes / No |
| Contact | Name + WhatsApp number |
| Status | New / Contacted / Sprint sold / No sale |

**Filters:** Risk band, date range, district, sprint triggered, status.  
**Export:** "Export to CSV" button for Google Sheets import.

### Admin detail view (`/admin/gap-scan/[session_id]`)

Full record for one gap scan submission:
- All factory and contact fields
- All 25 Q&A answers with risk level and evidence notes
- Risk scoring breakdown (per-question points table)
- Sprint trigger flags
- Munim's internal sales note (generated from `RISK_SCORING_MODEL.md` band instruction)
- Action buttons: "Mark as contacted" / "Mark as Sprint sold" / "Send WhatsApp follow-up" (pre-filled message template) / "Download gap report PDF" (Phase 2 — auto-fill from template)

### Admin notifications

On each new submission, Munim receives a WhatsApp message:

```
VANTAGE Gap Scan submitted
Factory: [factory_name]
Score: [score]/100 · [risk_band]
Critical gaps: [count]
Sprint triggers: [list]
Contact: [contact_name] · [whatsapp_number]
→ View: govantage.vercel.app/admin/gap-scan/[session_id]
```

---

## 12. Storage Options

### Phase 1 — Google Sheets (launch)

Write each submission as a new row in a designated Google Sheet via the Google Sheets API v4.

| Sheet tab | Contents |
|-----------|----------|
| `submissions` | One row per submission — all factory, contact, urgency, and score fields |
| `answers` | One row per question answer — `session_id`, `question_id`, `answer`, `points`, `evidence_notes` |
| `triggers` | One row per submission — `session_id` + each of the 7 sprint trigger boolean flags |

Authentication: Google Service Account credentials stored in Vercel environment variables (`GOOGLE_SERVICE_ACCOUNT_KEY`). Never committed to the repo.

Limitations: No real-time filtering, no row-level security, no Bangla text search. Acceptable for < 50 submissions/month.

### Phase 2 — Supabase

Migrate to Supabase when submissions exceed 50/month or when the admin view requires filtering and live updates.

Tables:

```sql
factories          (id, factory_name, address, district_zone, worker_count_range, main_products, main_buyers, created_at)
contacts           (id, factory_id, contact_name, contact_role, whatsapp_number, email, decision_maker_present)
gap_scan_sessions  (id, factory_id, contact_id, submitted_at, language, risk_score, compliance_score, risk_band, sprint_triggered, recommended_offer, status)
gap_scan_answers   (id, session_id, question_id, answer, evidence_seen, evidence_notes, risk_level, risk_points, remediation_note)
sprint_triggers    (id, session_id, document_black_hole, welfare_cluster, harassment_cluster, wage_evidence_absent, child_labour_exposure, open_cap_unmanaged, critical_threshold)
follow_up_tasks    (id, session_id, assigned_to, status, notes, due_date)
```

Row-level security: Munim's authenticated session only. Worker grievance data (if Worker Voice is added) is in a separate schema with separate access controls.

Environment variables for Supabase: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`. Never committed to the repo.

---

## 13. Validation Rules

| Field | Rule |
|-------|------|
| `factory_name` | Required; non-empty; max 120 characters |
| `factory_address` | Required; non-empty; max 300 characters |
| `district_zone` | Required; must select or type |
| `worker_count_range` | Required; must select one option |
| `contact_name` | Required; non-empty; max 100 characters |
| `contact_role` | Required; must select or type |
| `whatsapp_number` | Required; Bangladesh mobile format: starts with `01`, 11 digits total, numeric only |
| `email` | Optional; if provided must pass RFC 5322 format check |
| `upcoming_audit` | Required; must select Yes / No / Not sure |
| `upcoming_audit_date` | Required if `upcoming_audit = Yes`; must be a future date |
| `recent_failed_audit` | Required; must select Yes / No |
| `cap_deadline` | Required if `recent_failed_audit = Yes`; must be a future date |
| Q1–Q24 answers | All 24 must have a selection before submission is allowed (Yes / No / Not sure / Not applicable) |
| Q25 | Optional — 0 to 3 fields may be filled; each field max 200 characters |
| Evidence notes | Optional per question; max 500 characters per note |

**Inline validation:** Errors appear below the relevant field immediately on blur. Do not use a modal or toast for field errors.

**Step-level gate:** "Continue" button is disabled until all required fields in the current step are valid. An error summary appears at the top of the step if the user taps "Continue" before completing required fields.

**Submission gate:** Final "Submit" button is disabled until all Q1–Q24 have answers. Show a count: "22 / 24 questions answered" updating in real time.

---

## 14. Legal Disclaimer Placement

### Required disclaimer text (exact wording — do not alter)

> This Free Gap Scan is a preliminary compliance guidance and audit-preparation review. It is not a legal opinion, certification, official audit, or verification. Keystone Consultancy trading as VANTAGE provides remediation support and documentation readiness guidance only. Third-party audit outcomes are determined solely by the relevant audit body.

### Placement rules

| Location | Placement |
|----------|-----------|
| Form Step 1 (Factory Profile) | Below the page title, above the first field, in a shaded box (`--vantage-light-grey` background) |
| Result Screen | Below the CTA block, above the page footer, in a shaded box |
| Admin detail view | Below the risk score summary |
| Any generated report or PDF | Required — see `GAP_SCAN_REPORT_ASSEMBLY_MAP.md §Required Disclaimer Text` |

Additional note below the disclaimer on the form:

> "VANTAGE is not affiliated with BSCI, WRAP, SA8000, Sedex, DIFE, or any buyer compliance programme."

### Privacy note (below WhatsApp field in Section 2)

> "VANTAGE uses your WhatsApp number to send your gap scan results and follow up within 24 hours. Your data is not shared with third parties. Reply STOP at any time to opt out."  
> Bangla: "VANTAGE আপনার হোয়াটসঅ্যাপ নম্বর ব্যবহার করে আপনার ফলাফল পাঠাতে এবং ২৪ ঘণ্টার মধ্যে যোগাযোগ করতে। আপনার তথ্য তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।"

---

## 15. Brand Usage Rules

All rules are derived from `vantage/brand/colors.md`, `vantage/brand/typography.md`, and `vantage/brand/assets-manifest.md`.

### Logo

- Use `logo-wordmark-white-on-black.jpeg` in the dark header navigation bar.
- Use `logo-wordmark-black-on-white.jpeg` if a light header variant is used.
- Minimum display width: 120px. Do not scale below this.
- Replace with SVG (`logo-wordmark.svg`) when that asset is created — see `assets-manifest.md`.

### Colours

- Page background: `#FFFFFF`
- Navigation bar: `#1A1A24`
- Primary text: `#1A1A24`
- Secondary text: `#505050`
- Card backgrounds: `#F0F0F0`
- Primary button (Sprint CTA): `#1A1A24` background, `#FFFFFF` text
- Critical band CTA button: `#E2B44F` background, `#1A1A24` text
- Risk badge — Critical: `#1A1A24` background
- Risk badge — High: `#006D77` background
- Risk badge — Medium: `#E2B44F` background
- Disabled state: `#A0A0A0`

### Typography

- All headings: Inter SemiBold or Bold
- Body: Inter Regular 400
- Bangla text: Hind Siliguri or Noto Sans Bengali, same weight scale
- Form labels: Inter Medium 500, 14px
- Input text: Inter Regular 400, 16px minimum (prevents iOS zoom)
- Step counter: Inter Medium 500, 14px, `#505050`
- Compliance score number (Result Screen): Inter Bold 700, 64px (desktop), 48px (mobile)

### Forbidden on this page

- No decorative gradients
- No flag icons on the language toggle
- No clip-art or generic compliance imagery
- No competitor names or logos
- No colours outside the approved palette

---

## 16. Acceptance Criteria

The `/gap-scan` page and flow are complete when all of the following pass:

### Functional

- [ ] All 5 form steps render in sequence with working Back/Continue navigation
- [ ] All 27 required fields validate correctly (inline errors on blur, step gate on Continue)
- [ ] Q1–Q24 accept Yes / No / Not Sure / Not Applicable
- [ ] Q25 accepts 0 to 3 short-text entries and scores correctly (0 / 3 / 5 / 8 pts)
- [ ] Running score updates in real time after each answer change
- [ ] Risk band label updates when score crosses band thresholds
- [ ] All 7 sprint trigger flags evaluate correctly at Submit
- [ ] Submit posts to `/api/gap-scan/submit` and receives a success or error response
- [ ] On success, user is navigated to the Result Screen
- [ ] Result Screen shows correct score, risk band, top 5 gaps, missing documents, and correct CTA for each band
- [ ] Auto-reply WhatsApp message is sent to the factory contact on submission
- [ ] Munim receives a WhatsApp notification on submission
- [ ] Data is written to Google Sheets (Phase 1) with all required fields populated

### Language

- [ ] EN / বাং toggle switches all visible text with no page reload
- [ ] Bangla text renders in Hind Siliguri or Noto Sans Bengali at correct sizes
- [ ] All 25 questions are translated and display correctly in both languages
- [ ] CTA copy, error messages, and disclaimer text are translated

### Mobile

- [ ] Form renders correctly at 320px and 360px viewport widths
- [ ] All touch targets are minimum 44 × 44px
- [ ] No input zooms on iOS (all inputs 16px font-size minimum)
- [ ] Sticky score bar visible and updating during Q1–Q25 on mobile
- [ ] LCP < 3 seconds on Vercel Analytics simulated 4G

### Brand

- [ ] VANTAGE logo displayed at minimum 120px width in the header
- [ ] All colours match the approved palette from `colors.md`
- [ ] No forbidden phrases appear on any screen (certify, guarantee audit pass, legal advice, official audit, verification body)
- [ ] Required disclaimer appears on Step 1 and the Result Screen
- [ ] Privacy note appears below the WhatsApp field

### Admin

- [ ] `/admin/gap-scan` requires authentication before displaying any data
- [ ] Admin list view shows all submissions with correct fields and colour-coded risk badges
- [ ] Admin detail view shows full Q&A breakdown and sprint trigger flags
- [ ] "Export to CSV" produces a valid file with all submission fields

---

## Next Build File

Create `vantage/website/CONTROL_TOWER_SITE_SPEC.md` to define the full Next.js project structure, page map, navigation, shared components, and deployment configuration for the complete VANTAGE Control Tower website including `/`, `/gap-scan`, `/book`, `/compliance-score`, and `/intelligence-brief`.
