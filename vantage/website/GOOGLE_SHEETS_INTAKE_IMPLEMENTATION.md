# VANTAGE — Google Sheets Intake Implementation Guide

**Status:** Ready to configure  
**Owner:** Keystone Consultancy trading as VANTAGE  
**Purpose:** Steps to connect the `/gap-scan` form submission to `VANTAGE_GapScan_Leads` Google Sheets storage.

The website works without these credentials — submissions display results locally with `stored: false` until credentials are added.

---

## Workbook

**Name:** `VANTAGE_GapScan_Leads`

Create in Google Drive under:

```
VANTAGE / Operations / Gap Scan Records
```

Do not share publicly. Do not use a public folder.

---

## Required Tabs

Create these 6 tabs in the workbook. Tab names are case-sensitive.

### `factories`

| Col | Field | Notes |
|---|---|---|
| A | factory_id | e.g. FAC-20260601-001 |
| B | factory_name | |
| C | factory_address | |
| D | district_zone | |
| E | worker_count_range | |
| F | main_products | |
| G | main_buyers | |
| H | audit_frameworks | comma-separated |
| I | created_at | ISO 8601 |
| J | notes | Munim — manual |

### `contacts`

| Col | Field | Notes |
|---|---|---|
| A | contact_id | e.g. CON-20260601-001 |
| B | factory_id | linked |
| C | contact_name | |
| D | contact_role | |
| E | whatsapp_number | |
| F | email | |
| G | decision_maker_present | |
| H | created_at | |
| I | notes | Munim — manual |

### `gap_scan_sessions`

| Col | Field | Notes |
|---|---|---|
| A | session_id | e.g. GSS-20260601-001 |
| B | factory_id | linked |
| C | contact_id | linked |
| D | session_date | |
| E | session_mode | Virtual / On-site |
| F | upcoming_audit | |
| G | upcoming_audit_date | |
| H | audit_standard | |
| I | recent_failed_audit | |
| J | cap_deadline | |
| K | buyer_pressure | |
| L | critical_count | |
| M | high_count | |
| N | medium_count | |
| O | low_count | |
| P | total_risk_points | **Internal — do not share with factory** |
| Q | compliance_score | Client-facing (0–100) |
| R | risk_band | |
| S | sprint_triggered | Yes / No |
| T | trigger_flags | **Internal** |
| U | recommended_offer | |
| V | q25_doc_1 | |
| W | q25_doc_2 | |
| X | q25_doc_3 | |
| Y | double_gap_flags | Munim — manual |
| Z | internal_sales_note | **Internal — never share** |
| AA | status | New / Contacted / Quoted / Sprint Active / Delivered / Closed |
| AB | created_at | |

### `gap_scan_answers`

One row per question per session. Each session writes 25 rows (Q01–Q25).

| Col | Field | Notes |
|---|---|---|
| A | answer_id | e.g. ANS-20260601-001-Q01 |
| B | session_id | linked |
| C | question_id | Q01–Q25 |
| D | question_theme | |
| E | answer | yes / no / not_sure / not_applicable |
| F | evidence_seen | |
| G | evidence_notes | |
| H | risk_level | Critical / High / Medium / Low |
| I | risk_points | 0 if Yes; weight if No |
| J | remediation_note | future |

### `follow_ups`

One row per submission. Munim updates manually as follow-up progresses.

| Col | Field | Notes |
|---|---|---|
| A | follow_up_id | e.g. FUP-20260601-001 |
| B | session_id | linked |
| C | factory_id | linked |
| D | contact_name | |
| E | whatsapp_number | |
| F | risk_band | |
| G | follow_up_priority | Same day / Within 24 hours / Within 5 days / 30-day re-contact |
| H | recommended_offer | |
| I | follow_up_type | Munim fills: WhatsApp sent / Call completed / etc. |
| J | whatsapp_template | A / B / C |
| K | action_date | Munim fills |
| L | next_action | |
| M | next_action_date | |
| N | outcome | Munim fills |
| O | notes | WhatsApp draft text pre-filled by automation |
| P | created_at | |

### `generated_documents`

Not written automatically. Munim fills manually as documents are created and sent. See `GAP_SCAN_DATA_STORAGE_PLAN.md §3.6` for column schema.

---

## Vercel Environment Variables

Add these in the Vercel dashboard under: **Project → Settings → Environment Variables**

| Variable | Where to get it |
|---|---|
| `GOOGLE_SHEETS_SPREADSHEET_ID` | Google Sheets URL: `docs.google.com/spreadsheets/d/**[ID]**/edit` |
| `GOOGLE_SHEETS_CLIENT_EMAIL` | Google Cloud → IAM → Service Accounts → email field |
| `GOOGLE_SHEETS_PRIVATE_KEY` | Service account JSON key file → `private_key` value |

**Private key format in Vercel:** paste the full key value exactly as it appears in the JSON file. Vercel handles newlines correctly. Do not add extra quotes.

**Never** add these to `.env`, `.env.local` committed to the repo, or any file tracked by git.

---

## Google Service Account Setup

1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project (or use an existing one).
3. Enable the **Google Sheets API**.
4. Go to **IAM & Admin → Service Accounts → Create Service Account**.
5. Give it a name: `vantage-sheets-writer`.
6. Skip optional fields. Click Done.
7. Open the service account → **Keys → Add Key → Create new key → JSON**.
8. Download the JSON file. Store it securely — never commit it.
9. Copy `client_email` → paste as `GOOGLE_SHEETS_CLIENT_EMAIL`.
10. Copy `private_key` → paste as `GOOGLE_SHEETS_PRIVATE_KEY`.

**Share the Google Sheet with the service account email as Editor.**

Open `VANTAGE_GapScan_Leads` → Share → paste `client_email` value → set role to **Editor** → Send.

---

## Test Procedure

### 1. Check env config

Visit:

```
https://govantage.vercel.app/api/health/gap-scan-storage
```

Expected response when configured:

```json
{
  "googleSheetsConfigured": true,
  "requiredEnvPresent": {
    "GOOGLE_SHEETS_SPREADSHEET_ID": true,
    "GOOGLE_SHEETS_CLIENT_EMAIL": true,
    "GOOGLE_SHEETS_PRIVATE_KEY": true
  }
}
```

Expected response when NOT configured:

```json
{
  "googleSheetsConfigured": false,
  "requiredEnvPresent": {
    "GOOGLE_SHEETS_SPREADSHEET_ID": false,
    "GOOGLE_SHEETS_CLIENT_EMAIL": false,
    "GOOGLE_SHEETS_PRIVATE_KEY": false
  }
}
```

### 2. Submit a test scan

1. Open `https://govantage.vercel.app/gap-scan`.
2. Complete all 5 steps with test data.
3. Submit.
4. Expected banner: **"Your scan was received. VANTAGE will follow up on WhatsApp."**
5. Open `VANTAGE_GapScan_Leads` — verify:
   - 1 new row in `factories`
   - 1 new row in `contacts`
   - 1 new row in `gap_scan_sessions`
   - 25 new rows in `gap_scan_answers` (Q01–Q25)
   - 1 new row in `follow_ups`

### 3. Verify without credentials

Before env is set, submitting the form shows:

```
"Your scan result is shown below. Lead storage is not connected yet."
```

The result screen still displays correctly. No error is thrown.

---

## Safety Notes

- No Google credentials appear in frontend code or browser network responses.
- `total_risk_points`, `trigger_flags`, and `internal_sales_note` are never returned to the browser.
- Scan results are not published. No public endpoint exposes submission data.
- No WhatsApp or email is sent automatically. Munim sends follow-ups manually.
- No legal or commercial documents are generated or sent automatically.
- The `generated_documents` tab is filled manually by Munim only.
- If Sheets write fails, the result screen still works. Munim is alerted by the absence of a new row.

---

## API Response Reference

### `POST /api/gap-scan/submit`

**When env is not configured:**
```json
{
  "success": true,
  "stored": false,
  "reason": "Google Sheets storage is not configured",
  "compliance_score": 57,
  "risk_band": "High Risk",
  "sprint_triggered": true,
  "recommended_offer": "BLA 2026 Compliance Sprint",
  "top_gaps": [...],
  "missing_documents": [...]
}
```

**When Sheets write succeeds:**
```json
{
  "success": true,
  "stored": true,
  "session_id": "GSS-20260601-001",
  "compliance_score": 57,
  "risk_band": "High Risk",
  "sprint_triggered": true,
  "recommended_offer": "BLA 2026 Compliance Sprint",
  "top_gaps": [...],
  "missing_documents": [...]
}
```

**When Sheets write fails:**
```json
{
  "success": false,
  "stored": false,
  "error": "Submission could not be stored. Your results are shown below.",
  "compliance_score": 57,
  "risk_band": "High Risk",
  ...
}
```

### `GET /api/health/gap-scan-storage`

Returns env presence booleans only. Never returns real env values.
