# SOURCE_OF_TRUTH_INDEX.md

This file is the navigation index for all VANTAGE authoritative source documents.
When building any feature, agent, or document — start here.

---

## 1. Business and Strategy

| Document | Location | What it answers |
|----------|----------|----------------|
| Business Blueprint | `/vantage-source-of-truth/BUSINESS_BLUEPRINT.md` | What VANTAGE is, legal entity, market, target customer, operating model, channels, revenue targets |
| Revenue Streams | `/vantage-source-of-truth/REVENUE_STREAMS.md` | All products, exact BDT prices, payment terms, what is/is not included, upsell paths, pricing rules |

---

## 2. Brand and Communication

| Document | Location | What it answers |
|----------|----------|----------------|
| Brand System | `/vantage-source-of-truth/BRAND_SYSTEM.md` | Name, taglines, tone of voice, approved phrases, forbidden phrases, visual identity placeholders, document formatting, social media rules |

---

## 3. Legal and Compliance

| Document | Location | What it answers |
|----------|----------|----------------|
| Legal Positioning Rules | `/vantage-source-of-truth/LEGAL_POSITIONING_RULES.md` | What VANTAGE can/cannot do, exact disclaimer wording for contracts, document authority hierarchy, regulatory citation format, data/privacy rules, IP ownership, AI output review requirements |

---

## 4. Documents and Templates

| Document | Location | What it answers |
|----------|----------|----------------|
| Document Stack | `/vantage-source-of-truth/DOCUMENT_STACK.md` | Complete inventory of every document, its purpose, format, language, lawyer-review status, readiness, and file naming convention |

### Template locations (once committed)

| Template | Target location | Status |
|----------|----------------|--------|
| NDA | `vantage/legal/NDA_template.docx` | Placeholder |
| MSA | `vantage/legal/MSA_template.docx` | Placeholder |
| Sprint Scope of Work | `vantage/legal/Sprint_SoW_template.docx` | Placeholder |
| Worker Voice Agreement | `vantage/legal/WorkerVoice_Agreement_template.docx` | Placeholder |
| Service Proposal | `vantage/products/Proposal_template.docx` | Placeholder |
| Free Gap Scan Card | `vantage/products/GapScan_Card.pdf` | Placeholder |
| BLA 2026 Quick Checklist | `vantage/products/BLA2026_Checklist.pdf` | Not yet created |
| Gap Report template | `vantage/products/GapReport_template.docx` | Not yet created |
| CAP template | `vantage/products/CAP_template.docx` | Not yet created |
| Policy document templates (10) | `vantage/products/policies/` | Not yet created |
| Intelligence Brief template | `vantage/products/IntelligenceBrief_template.docx` | Not yet created |

### Brand assets (once committed)

| Asset | Target location | Status |
|-------|----------------|--------|
| VANTAGE logo (SVG) | `vantage/brand/logo.svg` | Placeholder |
| VANTAGE logo (PNG, white) | `vantage/brand/logo-white.png` | Placeholder |
| VANTAGE logo (PNG, dark) | `vantage/brand/logo-dark.png` | Placeholder |
| Color palette | `vantage/brand/colors.md` | Placeholder |
| Typography spec | `vantage/brand/typography.md` | Placeholder |
| Gap Scan card (print-ready) | `vantage/brand/GapScan_Card_print.pdf` | Placeholder |

---

## 5. Product Build

| Document | Location | What it answers |
|----------|----------|----------------|
| First Build Target | `/vantage-source-of-truth/FIRST_BUILD_TARGET.md` | VANTAGE Control Tower spec (govantage.vercel.app): pages, tech stack, conversion funnel, definition of done |

### Code locations (once built)

| Component | Target location | Status |
|-----------|----------------|--------|
| Next.js website | `vantage/website/` | Placeholder — not initialized |
| VANTAGE agent definitions | `vantage/agents/` | Placeholder — not written |
| Utility scripts | `vantage/scripts/` | Placeholder — none yet |

---

## 6. Regulatory Reference (to be added)

| Document | Target location | Status |
|----------|----------------|--------|
| BLA 2006 full text | `vantage/docs/regulations/BLA_2006.md` | Not yet committed |
| BLA Amendment 2013 | `vantage/docs/regulations/BLA_Amendment_2013.md` | Not yet committed |
| BLA Amendment 2018 | `vantage/docs/regulations/BLA_Amendment_2018.md` | Not yet committed |
| BEPZA Worker Welfare Act | `vantage/docs/regulations/BEPZA_Worker_Welfare_Act.md` | Not yet committed |
| BSCI audit checklist | `vantage/docs/audit-standards/BSCI_checklist.md` | Not yet committed |
| WRAP certification criteria | `vantage/docs/audit-standards/WRAP_criteria.md` | Not yet committed |
| SA8000 standard summary | `vantage/docs/audit-standards/SA8000_summary.md` | Not yet committed |
| Sedex/SMETA 4-Pillar guide | `vantage/docs/audit-standards/SMETA_4Pillar.md` | Not yet committed |

---

## 7. Operational Runbooks (to be added)

| Document | Target location | Status |
|----------|----------------|--------|
| Client Onboarding Checklist | `vantage/docs/runbooks/client_onboarding.md` | Not yet created |
| Sprint Delivery Runbook | `vantage/docs/runbooks/sprint_delivery.md` | Not yet created |
| Worker Voice Setup Runbook | `vantage/docs/runbooks/worker_voice_setup.md` | Not yet created |
| Intelligence Brief Production Runbook | `vantage/docs/runbooks/intelligence_brief.md` | Not yet created |

---

## How to Use This Index

1. Before writing any code, copy, or document — check the relevant source-of-truth file.
2. Before any agent generates client-facing output — verify it against `BRAND_SYSTEM.md` (approved/forbidden phrases) and `LEGAL_POSITIONING_RULES.md` (disclaimers).
3. Before committing a template — update the Status column in this index from "Placeholder" or "Not yet created" to "Committed — v[N]".
4. When a regulation changes — update the relevant file in `vantage/docs/regulations/` and note the change date.
