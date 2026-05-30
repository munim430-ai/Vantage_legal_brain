# VANTAGE — Website Implementation Task Brief

**Status:** Committed v1.0  
**Owner:** Keystone Consultancy trading as VANTAGE  
**Purpose:** First coding task brief for building the VANTAGE Control Tower MVP under `vantage/website/`.

---

## Task Objective

Build the first VANTAGE Control Tower website implementation.

The website must support one commercial funnel:

**Factory visitor → Free Gap Scan → risk score → BLA 2026 Compliance Sprint CTA → Munim follow-up.**

This is not a full SaaS dashboard. This is a visually striking public website with a working Free Gap Scan form and local risk scoring.

---

## Source Files to Check Before Coding

Before writing code, read:

- `vantage/website/VISUAL_EXPERIENCE_DIRECTION.md`
- `vantage/website/PUBLIC_REPO_WEBSITE_STACK_DECISION.md`
- `vantage/website/CONTROL_TOWER_IMPLEMENTATION_READINESS_CHECKLIST.md`
- `vantage/website/CONTROL_TOWER_MVP_BUILD_BRIEF.md`
- `vantage/website/CONTROL_TOWER_PAGE_COPY_SPEC.md`
- `vantage/products/gap-scan/GAP_SCAN_DIGITAL_FORM_SPEC.md`
- `vantage/products/gap-scan/GAP_SCAN_FORM_SCHEMA.md`
- `vantage/products/gap-scan/GAP_SCAN_QUESTION_BANK.md`
- `vantage/products/gap-scan/RISK_SCORING_MODEL.md`
- `vantage/website/GAP_SCAN_DATA_STORAGE_PLAN.md`
- `vantage/brand/colors.md`
- `vantage/brand/typography.md`
- `vantage/brand/assets-manifest.md`
- `vantage-source-of-truth/LEGAL_POSITIONING_RULES.md`

If any source conflicts, stop and report the conflict before coding.

---

## Implementation Stack

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui selected components only
- local scoring logic first
- no full SaaS starter
- no auth system
- no payment gateway
- no RAG UI
- no DOCX automation yet

Do not clone a SaaS starter.

---

## Initial Setup Command

Initialize the app inside `vantage/website/` only.

Recommended command:

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"
```

Run it from inside:

```bash
vantage/website/
```

Do not initialize another app outside this folder.

---

## Required MVP Routes

Build these routes:

| Route | Purpose |
|---|---|
| `/` | Premium VANTAGE homepage and BLA 2026 Compliance Sprint offer |
| `/gap-scan` | Digital Free Gap Scan form, local scoring, result screen |
| `/book` | WhatsApp / booking follow-up page |
| `/pricing` | BLA Sprint and retainer pricing |
| `/legal/disclaimer` | Service boundary and disclaimer page |

No additional routes without approval.

---

## Required Directory Shape

Use this shape unless there is a strong technical reason to adjust:

```txt
vantage/website/
  app/
    page.tsx
    gap-scan/page.tsx
    book/page.tsx
    pricing/page.tsx
    legal/disclaimer/page.tsx
    layout.tsx
    globals.css
  components/
    layout/
      Header.tsx
      Footer.tsx
      LegalDisclaimer.tsx
    marketing/
      Hero.tsx
      CommandPanelPreview.tsx
      ProblemCards.tsx
      SprintOffer.tsx
      DashboardPreview.tsx
    gap-scan/
      GapScanForm.tsx
      QuestionGroup.tsx
      ProgressIndicator.tsx
      RiskResultCard.tsx
      SprintCTA.tsx
  lib/
    gap-scan/
      questions.ts
      scoring.ts
      schema.ts
    brand/
      tokens.ts
```

---

## Brand Implementation Rules

Apply VANTAGE tokens before building components.

Use:

- Near Black `#1A1A24`
- Deep Teal `#006D77`
- Soft Gold `#E2B44F`
- White `#FFFFFF`
- Light Grey `#F0F0F0`
- Dark Grey `#505050`

Use logo files:

- Light background: `vantage/brand/logo-wordmark-black-on-white.jpeg`
- Dark background: `vantage/brand/logo-wordmark-white-on-black.jpeg`
- Compact/square use: `vantage/brand/logo-stacked-black-white.jpeg`

Do not use generic SaaS blue, neon gradients, playful icons, sparkles, confetti, or fake certification badges.

---

## Visual Requirement

The website must feel like:

- compliance intelligence command center
- Bloomberg Terminal discipline
- premium institutional consulting
- industrial risk dashboard
- Bangladesh RMG-specific operational tool

It must not feel like:

- generic SaaS landing page
- cheap agency website
- education consultancy website
- playful startup app

Follow `VISUAL_EXPERIENCE_DIRECTION.md` as the design authority.

---

## Homepage Requirements

The homepage must include:

1. Dark command-center hero
2. Risk dashboard preview panel
3. Free Gap Scan CTA
4. BLA 2026 Compliance Sprint offer
5. Problem/risk cards
6. Gap Scan process section
7. Sprint pricing block
8. Legal boundary section
9. WhatsApp/contact CTA

Primary CTA:

`Start Free Gap Scan`

Secondary CTA:

`Book BLA 2026 Sprint Review`

---

## `/gap-scan` Requirements

Build a working frontend version with:

- factory profile fields
- contact profile fields
- audit urgency fields
- 25 gap-scan questions
- answer options: Yes / No / Not sure / Not applicable
- evidence seen toggle
- evidence notes field
- local score calculation
- risk band result screen
- top risk summary
- Sprint CTA for Medium, High, and Critical risk
- required disclaimer before submit and on result screen

Storage can be mocked/local at first. Do not connect Google Sheets until the secrets plan is implemented.

---

## Scoring Rules

Follow `RISK_SCORING_MODEL.md` exactly.

Each No answer adds risk points:

- Critical = 8
- High = 5
- Medium = 3
- Low = 1

Risk bands:

- 0–15 = Low Risk
- 16–35 = Medium Risk
- 36–60 = High Risk
- 61+ = Critical Risk

Do not present the risk score as an official audit result.

---

## Legal Disclaimer Rules

Required short disclaimer:

> VANTAGE provides compliance guidance and audit-preparation support. This is not a legal opinion, certification, official audit, or guarantee of audit outcome.

Required Gap Scan disclaimer:

> This Free Gap Scan is a preliminary compliance guidance and audit-preparation review. It is not a legal opinion, certification, official audit, or verification. Keystone Consultancy trading as VANTAGE provides remediation support and documentation readiness guidance only. Third-party audit outcomes are determined solely by the relevant audit body.

Disclaimers must appear:

- before `/gap-scan` submit button
- on `/gap-scan` result screen
- on `/legal/disclaimer`
- near any page section discussing audit preparation or compliance risk

---

## Forbidden Claims

Do not use:

- certified compliant
- guaranteed audit pass
- official audit
- verified by VANTAGE
- legal advice
- law firm
- government approved
- 100% compliant
- buyer-approved
- BSCI-approved
- WRAP-approved
- SA8000-approved
- Sedex-approved

If any copy requires one of these concepts, stop and route to `vantage-legal-risk-guard`.

---

## What Not to Build Yet

Do not build:

- login/auth
- Supabase schema
- Google Sheets integration
- payment gateway
- document upload vault
- RAG search UI
- DOCX generation
- Worker Voice bot
- multi-tenant admin dashboard
- automated email or WhatsApp sending

---

## First Coding Phase

Phase 1 implementation must stop after:

1. Next.js initialized in `vantage/website/`
2. brand tokens added
3. layout/header/footer created
4. homepage route created
5. `/gap-scan` form UI created
6. local scoring implemented
7. result screen created
8. legal disclaimer page created
9. build passes locally

---

## QA Before Commit

Before committing code, run:

```bash
npm run build
```

If lint/typecheck scripts exist, run them too.

Do not commit broken code.

---

## Required Implementation Output

After implementation, report:

```md
# Website Implementation Output

## Files Created or Edited

## Routes Implemented

## Components Created

## Source Files Checked

## Scoring Logic Status

## Legal Disclaimer Placement

## Brand Rules Applied

## What Was Not Built

## Build/Test Result

## Next Blocker
```

---

## Acceptance Criteria

This implementation is acceptable when:

- all required MVP routes exist
- homepage visually matches command-center direction
- `/gap-scan` includes required fields and 25 questions
- local scoring works
- risk bands display correctly
- Sprint CTA appears for Medium/High/Critical risk
- disclaimers appear in required locations
- no forbidden claims appear
- logo assets load correctly
- mobile layout is usable
- no secrets are committed
- build passes

---

## Next Step After This Brief

After this file is committed, `vantage-ceo-controller` may assign the first actual coding task to `vantage-brand-frontend`, with review by `vantage-qa-security` and `vantage-legal-risk-guard` before deployment.
