# VANTAGE — Control Tower Implementation Readiness Checklist

**Status:** Committed v1.0  
**Owner:** Keystone Consultancy trading as VANTAGE  
**Purpose:** Final pre-code checklist before building the VANTAGE Control Tower website.

---

## Build Decision

The next major phase is implementation of the VANTAGE Control Tower MVP under:

`vantage/website/`

No packages should be installed and no application code should be written until this checklist is reviewed.

---

## Files Confirmed Ready

| Area | File | Status |
|---|---|---|
| CEO routing | `vantage/agents/vantage-ceo-controller.md` | Ready |
| Frontend ownership | `vantage/agents/vantage-brand-frontend.md` | Ready |
| Backend/data ownership | `vantage/agents/vantage-backend-data.md` | Ready |
| QA/security ownership | `vantage/agents/vantage-qa-security.md` | Ready |
| Legal risk guard | `vantage/agents/vantage-legal-risk-guard.md` | Ready |
| MVP website scope | `vantage/website/CONTROL_TOWER_MVP_BUILD_BRIEF.md` | Ready |
| Website copy | `vantage/website/CONTROL_TOWER_PAGE_COPY_SPEC.md` | Ready |
| Data storage | `vantage/website/GAP_SCAN_DATA_STORAGE_PLAN.md` | Ready |
| Digital form spec | `vantage/products/gap-scan/GAP_SCAN_DIGITAL_FORM_SPEC.md` | Ready |
| Form schema | `vantage/products/gap-scan/GAP_SCAN_FORM_SCHEMA.md` | Ready |
| Risk scoring | `vantage/products/gap-scan/RISK_SCORING_MODEL.md` | Ready |
| Automation plan | `vantage/automation/GAP_SCAN_AUTOMATION_PLAN.md` | Ready |
| Brand colors | `vantage/brand/colors.md` | Ready |
| Typography | `vantage/brand/typography.md` | Ready |
| Brand assets | `vantage/brand/assets-manifest.md` | Ready |

---

## Routes to Build

| Route | Purpose | MVP priority |
|---|---|---:|
| `/` | Landing page for VANTAGE and BLA 2026 Compliance Sprint | 1 |
| `/gap-scan` | Digital Free Gap Scan form, scoring, and result screen | 1 |
| `/book` | Booking / WhatsApp follow-up page | 2 |
| `/pricing` | BLA Sprint and retainer pricing | 2 |
| `/legal/disclaimer` | Service boundary and legal disclaimer page | 3 |

Do not add extra routes in the MVP without approval from `vantage-ceo-controller`.

---

## Data Fields Locked

The implementation must use `vantage/products/gap-scan/GAP_SCAN_FORM_SCHEMA.md` as the field authority.

Locked data groups:

1. Factory profile
2. Contact profile
3. Audit urgency
4. 25 gap-scan answers
5. Evidence notes
6. Risk scoring output
7. Sales recommendation
8. Follow-up workflow

Do not add new required fields unless the schema file is updated first.

---

## Scoring Model Locked

Use:

`vantage/products/gap-scan/RISK_SCORING_MODEL.md`

Implementation must preserve:

- Critical = 8 risk points
- High = 5 risk points
- Medium = 3 risk points
- Low = 1 risk point
- each `No` answer adds risk points
- Q25 short-answer scoring must follow the scoring model
- risk bands must match the scoring model exactly

Do not present the score as an official audit result or compliance certification.

---

## Copy Locked

Use:

`vantage/website/CONTROL_TOWER_PAGE_COPY_SPEC.md`

Rules:

- Do not paraphrase client-facing copy without updating the copy spec.
- Do not introduce new claims during implementation.
- Use approved VANTAGE language only.
- Route any uncertain claim to `vantage-legal-risk-guard`.

---

## Brand Assets Locked

Use:

- `vantage/brand/colors.md`
- `vantage/brand/typography.md`
- `vantage/brand/assets-manifest.md`

Logo usage:

- Light background: `vantage/brand/logo-wordmark-black-on-white.jpeg`
- Dark background: `vantage/brand/logo-wordmark-white-on-black.jpeg`
- Compact/square placement: `vantage/brand/logo-stacked-black-white.jpeg`

Do not recolor, stretch, distort, or replace the logo during implementation.

---

## Legal Disclaimer Locked

Required short disclaimer:

> VANTAGE provides compliance guidance and audit-preparation support. This is not a legal opinion, certification, official audit, or guarantee of audit outcome.

Required gap scan disclaimer:

> This Free Gap Scan is a preliminary compliance guidance and audit-preparation review. It is not a legal opinion, certification, official audit, or verification. Keystone Consultancy trading as VANTAGE provides remediation support and documentation readiness guidance only. Third-party audit outcomes are determined solely by the relevant audit body.

The disclaimer must appear:

- before `/gap-scan` submission
- on `/gap-scan` result screen
- on `/legal/disclaimer`
- near any page section that discusses compliance risk, gap scan, audit preparation, or BLA Sprint

---

## Google Sheets Storage Decision

MVP storage decision:

**Google Sheets first. Supabase later.**

Reason:

- fastest launch path
- low operational overhead
- manual review remains easy
- no full authentication system needed at MVP

Implementation must follow:

`vantage/website/GAP_SCAN_DATA_STORAGE_PLAN.md`

Do not connect Google Sheets until environment variables and server-side handling are planned.

---

## Automation Boundaries

Automation may prepare internal drafts and records only.

Automation must not automatically send:

- quotation
- MSA
- Sprint Work Order
- invoice
- gap report
- client-facing compliance statement
- legal/commercial document

Munim approval is required before any client-facing output is sent.

---

## Secrets / `.env` Rules

Never commit:

- `.env`
- Google service account JSON
- private keys
- API keys
- Supabase service role key
- OAuth secrets
- production credentials

Allowed:

- `.env.example` with placeholder variable names only

Required later:

```txt
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_SPREADSHEET_ID=
NEXT_PUBLIC_SITE_URL=
```

Never expose private keys using `NEXT_PUBLIC_`.

---

## What Must Not Be Built in MVP

Do not build:

- full SaaS dashboard
- client login system
- Supabase auth
- document upload vault
- Worker Voice bot
- RAG search UI
- automated DOCX generation
- payment gateway
- multi-tenant admin system
- automatic email/WhatsApp sending
- buyer/audit-body submission features

MVP goal is only:

**Landing page + Free Gap Scan + risk result + lead capture + manual Sprint follow-up.**

---

## Acceptance Criteria Before Installing Packages

Packages may be installed only after confirming:

- route list is locked
- copy spec is locked
- form schema is locked
- scoring model is locked
- brand files are committed
- logo assets are committed
- disclaimer language is locked
- Google Sheets MVP decision is accepted
- no unresolved legal-risk blockers exist
- `vantage-ceo-controller` approves implementation start

---

## Acceptance Criteria Before First Deployment

Before first deployment, verify:

- all MVP routes load
- `/gap-scan` includes all required fields
- all 25 questions are present
- scoring matches `RISK_SCORING_MODEL.md`
- lead data storage follows `GAP_SCAN_DATA_STORAGE_PLAN.md`
- disclaimers appear in required places
- no forbidden claims appear
- mobile layout works on small Android screens
- logo assets load correctly
- no secrets are committed
- `.env.example` contains placeholders only
- form submission is tested with dummy data
- High/Critical results trigger Sprint CTA
- all client-facing output is reviewed against legal-risk rules

---

## Implementation Start Instruction

After this checklist is approved, the next task is to initialize the website project under:

`vantage/website/`

Recommended implementation scope:

1. Initialize Next.js app.
2. Add brand tokens.
3. Build static routes.
4. Build `/gap-scan` form UI.
5. Implement local scoring logic.
6. Add placeholder storage layer.
7. Add Google Sheets integration only after secrets plan is ready.

---

## Next Build File

Create:

`vantage/website/WEBSITE_IMPLEMENTATION_TASK_BRIEF.md`

Purpose:

Give Claude/Ruflo the exact first coding task for the VANTAGE Control Tower MVP.
