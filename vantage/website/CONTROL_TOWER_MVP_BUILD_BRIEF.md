# VANTAGE — Control Tower MVP Build Brief

**Status:** Committed v1.0  
**Owner:** Keystone Consultancy trading as VANTAGE  
**Product:** VANTAGE Control Tower  
**Purpose:** Define the first practical website build that converts factories from interest into Free Gap Scan submissions and BLA 2026 Compliance Sprint leads.

---

## Build Objective

Create the first VANTAGE Control Tower website under `vantage/website/`.

The MVP must support one commercial path:

**Factory visitor → Free Gap Scan → risk score → BLA 2026 Compliance Sprint recommendation → Munim follow-up.**

Do not build the full SaaS dashboard yet.

---

## Source Files

| Source | Path |
|---|---|
| First build target | `vantage-source-of-truth/FIRST_BUILD_TARGET.md` |
| Revenue streams | `vantage-source-of-truth/REVENUE_STREAMS.md` |
| Legal positioning | `vantage-source-of-truth/LEGAL_POSITIONING_RULES.md` |
| Brand system | `vantage-source-of-truth/BRAND_SYSTEM.md` |
| Brand colors | `vantage/brand/colors.md` |
| Typography | `vantage/brand/typography.md` |
| Brand assets | `vantage/brand/assets-manifest.md` |
| Digital form spec | `vantage/products/gap-scan/GAP_SCAN_DIGITAL_FORM_SPEC.md` |
| Form schema | `vantage/products/gap-scan/GAP_SCAN_FORM_SCHEMA.md` |
| Question bank | `vantage/products/gap-scan/GAP_SCAN_QUESTION_BANK.md` |
| Scoring model | `vantage/products/gap-scan/RISK_SCORING_MODEL.md` |

---

## MVP Routes

| Route | Purpose | Priority |
|---|---|---:|
| `/` | Landing page for VANTAGE and BLA 2026 Compliance Sprint | 1 |
| `/gap-scan` | Digital Free Gap Scan form and result screen | 1 |
| `/book` | Simple booking/contact page for Munim follow-up | 2 |
| `/pricing` | Service pricing for BLA Sprint and retainer | 2 |
| `/legal/disclaimer` | Legal disclaimer and service boundary page | 3 |

---

## Landing Page Requirements

The homepage must communicate:

- VANTAGE helps Bangladesh RMG factories fix BLA gaps before buyer/audit pressure.
- First paid offer: BLA 2026 Compliance Sprint.
- Price: BDT 55,000.
- Delivery time: 3–5 working days.
- Primary CTA: Start Free Gap Scan.
- Secondary CTA: Book a call / WhatsApp Munim.

Approved CTA labels:

- Start Free Gap Scan
- Book BLA 2026 Sprint Review
- Get 1-page gap summary
- Talk to VANTAGE on WhatsApp

---

## `/gap-scan` Requirements

Build according to:

`vantage/products/gap-scan/GAP_SCAN_DIGITAL_FORM_SPEC.md`

Minimum MVP behavior:

1. Collect factory/contact fields.
2. Ask the 25 gap-scan questions.
3. Calculate score locally in the browser or server function.
4. Show risk band.
5. Show top risk categories.
6. Trigger BLA Sprint CTA for Medium, High, and Critical risk.
7. Display required disclaimer before submission and on results.

Storage for MVP:

- Google Sheets or local JSON export is acceptable.
- Supabase comes later unless explicitly approved.

---

## Visual Direction

Use VANTAGE brand files:

- Near black, white, deep teal, soft gold.
- Institutional layout.
- Clean cards.
- Sharp typography.
- No playful SaaS styling.
- Mobile-first because users will arrive from WhatsApp.

Logo usage:

- Light backgrounds: `vantage/brand/logo-wordmark-black-on-white.jpeg`
- Dark headers: `vantage/brand/logo-wordmark-white-on-black.jpeg`

---

## Legal Positioning Requirements

Every page that mentions gap scan, audit preparation, BLA, buyer readiness, or compliance must include the correct boundary language.

Required short disclaimer:

> VANTAGE provides compliance guidance and audit-preparation support. This is not a legal opinion, certification, official audit, or guarantee of audit outcome.

Do not use these claims:

- certified compliant
- guaranteed audit pass
- official audit
- verified by VANTAGE
- legal advice

---

## Lead Capture Requirements

Each lead must capture:

- factory name
- district / zone
- contact name
- role
- WhatsApp number
- worker count range
- audit urgency
- risk band
- recommended offer

Munim follow-up priority:

| Lead condition | Priority |
|---|---|
| Critical risk + audit within 8 weeks | Same day |
| High risk | Same day |
| Medium risk + missing documents | Within 24 hours |
| Low risk | Retainer or newsletter follow-up |

---

## What Not to Build Yet

Do not build these in MVP:

- full client dashboard
- login system
- Supabase auth
- document upload vault
- worker voice bot
- RAG search UI
- automated DOCX generation
- payment gateway
- multi-tenant SaaS admin

---

## Acceptance Criteria

The MVP build plan is complete when:

- `/` route has clear BLA Sprint offer and Free Gap Scan CTA.
- `/gap-scan` route uses the 25-question bank.
- risk score follows `RISK_SCORING_MODEL.md`.
- lead data can be captured manually or through Google Sheets.
- all brand files are referenced correctly.
- all client-facing language follows legal positioning rules.
- no unapproved audit/certification claims appear.

---

## Next Build File

Create:

`vantage/website/CONTROL_TOWER_PAGE_COPY_SPEC.md`

Purpose:

Write the exact copy blocks for the MVP website routes before implementation.
