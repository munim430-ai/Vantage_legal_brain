# VANTAGE Factory Contact Intelligence

> Public-source factory contact discovery, scoring, and lead export for VANTAGE Bangladesh RMG sales operations.

**Version:** 1.0 | **Owner:** Keystone Consultancy trading as VANTAGE | **Operator:** Munim

---

## What This Does

This module automates the research step that Munim previously did manually: finding a garment factory's public email, phone, and WhatsApp contact from their website and recognized public directories, verifying the contact appears on multiple independent sources, scoring contact confidence, and exporting clean lead data ready for the CRM.

**It does NOT send any messages.** It only reads publicly available information.

---

## Quick Start

```bash
# Install
cd vantage/intelligence/factory-contact-intelligence
npm install

# Configure
cp .env.example .env
# Edit .env — set SEARXNG_BASE_URL at minimum

# Start background services (SearXNG, SpiderFoot)
docker compose -f docker/docker-compose.intelligence.yml up -d

# Add your factories to:
data/input/seed_factories.csv   ← copy from seed_factories.example.csv

# Run a single factory:
tsx scripts/run-single-factory.ts FAC-20260601-001

# Run all seed factories overnight:
npm run crawl:seed

# Cross-check collected contacts:
npm run cross-check

# Export to Google Sheets:
# data/output/google_sheets_import.csv is auto-generated after any crawl
```

---

## Architecture

```
seed_factories.csv
      │
      ▼
[Crawlee] crawlFactoryWebsite.ts       ← official website + contact pages
[Crawlee] crawlDirectorySource.ts      ← BGMEA, Open Supply Hub, RSC, Made-in-BD
[SearXNG] searxngQueries.ts            ← cross-reference searches
[theHarvester] harvesterRunner.ts      ← domain email discovery
[SpiderFoot] spiderfootRunner.ts       ← OSINT enrichment
      │
      ▼
Extractors:
  extractEmails.ts                     ← strict regex, reject placeholders
  extractPhones.ts                     ← BD mobile normalization (+8801XXXXXXXXX)
  extractWhatsAppLinks.ts              ← wa.me / api.whatsapp.com links only
  extractSocialLinks.ts                ← LinkedIn, Facebook, YouTube
  extractComplianceSignals.ts          ← WRAP, BSCI, Sedex, BGMEA, buyer signals
      │
      ▼
Scoring:
  contactConfidenceScore.ts            ← +35/+25/+20/+15/+10 / -25/-40 rules
  factoryPriorityScore.ts              ← composite sales priority + angle mapping
      │
      ▼
Outputs:
  data/output/factory_leads.csv
  data/output/factory_leads.json
  data/output/google_sheets_import.csv
  data/output/rejected_contacts.csv
  data/output/source_evidence.json
```

---

## Confidence Scoring Rules

| Signal | Points |
|---|---|
| Contact on official factory website | +35 |
| Contact on recognized public directory | +25 |
| Same contact on 2+ independent sources | +20 |
| Email domain matches company domain | +15 |
| WhatsApp/phone explicitly labeled publicly | +10 |
| Gmail/Yahoo/Hotmail only, no company match | -25 |
| Source looks like spam directory or no factory-name match | -40 |

| Tier | Score Range |
|---|---|
| **High** | 80–100 |
| **Medium** | 60–79 |
| **Low** | 35–59 |
| **Rejected** | 0–34 |

---

## Sales Angle Mapping

| Angle | When Used |
|---|---|
| `rsc_safety_documentation` | Factory is RSC member |
| `buyer_readiness` | Buyer signal found in public data |
| `documentation_visibility` | Compliance signals but weak web presence |
| `md_owner_direct` | High-confidence WhatsApp available |
| `compliance_manager` | Email contact available |
| `free_gap_scan` | Default — no strong signal yet |

---

## Vendor Tools

| Tool | Location | Purpose |
|---|---|---|
| Crawlee | `/vendor/intelligence/crawlee` | Primary TypeScript scraper |
| Scrapy | `/vendor/intelligence/scrapy` | Python bulk directory scraper |
| SearXNG | `/vendor/intelligence/searxng` | Private metasearch cross-check |
| theHarvester | `/vendor/intelligence/theHarvester` | Public OSINT email/domain discovery |
| SpiderFoot | `/vendor/intelligence/spiderfoot` | OSINT enrichment |
| check-if-email-exists | `/vendor/intelligence/check-if-email-exists` | Email deliverability (AGPL — see legal note) |
| OpenRefine | `/vendor/intelligence/openrefine` | Manual data cleaning & deduplication |
| libphonenumber-js | npm dependency | Bangladesh phone normalization |

---

## Legal

Read **`LEGAL_AND_PLATFORM_RULES.md`** before running any crawl.

- Only public data. No login bypass. No WhatsApp automation.
- check-if-email-exists is AGPL-3.0 — acceptable for internal use only.
- Baileys is **not installed** — see legal doc for why.
- All outreach using these leads must use approved VANTAGE language only.

---

## Related VANTAGE Files

- `/vantage/sales/FACTORY_INTELLIGENCE_DOSSIER_TEMPLATE.md` — fill before outreach
- `/vantage/sales/FACTORY_OUTREACH_CRM_TRACKER.md` — log contacts and sends
- `/vantage/sales/FIRST_500_FACTORY_OUTREACH_SCRIPT.md` — approved message templates
- `/vantage/products/gap-scan/` — gap scan product that leads are funneled to
- `/vantage/website/app/api/gap-scan/submit/route.ts` — gap scan submission endpoint

---

## Full Operations Guide

See **`FACTORY_CONTACT_INTELLIGENCE_PLAYBOOK.md`** for the complete step-by-step daily workflow.
