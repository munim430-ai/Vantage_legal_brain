# VANTAGE Factory Contact Intelligence — Legal & Platform Rules

**Status:** Active — v1.0
**Owner:** Keystone Consultancy trading as VANTAGE
**For:** Munim — read before every crawl session
**Applies to:** All use of factory-contact-intelligence tools, scripts, and vendor software

---

## 1. What This System Does — Legal Scope

This system collects **publicly available business contact information** from factory websites, official trade directories, and publicly visible web pages. It does not:

- Access anything behind a login, paywall, or authentication prompt.
- Contact WhatsApp numbers or send any messages.
- Collect personal data of individual workers or private persons.
- Reverse-engineer private databases.
- Bypass robots.txt restrictions.

This is standard **open-source intelligence (OSINT)** collection for legitimate B2B commercial prospecting, consistent with PDPA Bangladesh 2023 (draft), GDPR principles for legitimate interest, and standard ethical OSINT practice.

---

## 2. WhatsApp — Non-Negotiable Rules

| Allowed | Not Allowed |
|---|---|
| Extract wa.me links from a factory's own public website | Send any message via WhatsApp |
| Extract api.whatsapp.com/send links from public directory pages | Probe WhatsApp numbers to check if they're registered |
| Record a number labeled "WhatsApp" on a public business directory | Use Baileys or any WhatsApp automation to contact factories |
| Use a WhatsApp number found publicly to compose a manual outreach message in the VANTAGE CRM | Bulk-message factories via WhatsApp API without individual opt-in |
| | Collect employee personal WhatsApp numbers |

**Baileys:** Baileys (`@whiskeysockets/baileys`) is **not installed** by default. If you ever consider using it, consult a lawyer first. Mass WhatsApp automation without business account approval and recipient consent violates Meta's Terms of Service and may violate Bangladesh ICT Act 2006 Section 57. Use the official WhatsApp Business API (via approved BSP) for any automated outreach.

---

## 3. Scraping Rules — Robots.txt and Rate Limiting

- Always respect `robots.txt`. Crawlee honours it by default — do not disable this.
- Default rate: 2 second delay between requests. Do not lower below 1 second.
- Maximum 3 concurrent requests. Do not raise above 5.
- Do not crawl login-protected pages, member-only sections, or behind CAPTCHAs.
- If a site returns HTTP 429 (Too Many Requests), stop immediately and add it to the exclusion list.

---

## 4. License Notices for Vendor Tools

### check-if-email-exists (Reacher)
**License: AGPL-3.0**
- You may use it internally within VANTAGE operations without triggering copyleft.
- If you ever offer email verification as a **paid service to third parties**, you must either:
  - Open-source your entire stack under AGPL, OR
  - Purchase a commercial license from Reacher at https://reacher.email
- **Recommendation:** For current VANTAGE use (internal sales ops only), AGPL is acceptable. Flag this for legal review before any product pivot.

### Crawlee (Apify)
**License: Apache 2.0** — permissive, no restrictions for commercial internal use.

### SearXNG
**License: AGPL-3.0** — same AGPL note as above applies if you expose SearXNG as a public-facing service.

### theHarvester
**License: GPL-2.0** — for internal use only. Do not redistribute modified versions without source disclosure.

### SpiderFoot
**License: MIT** — permissive.

### Scrapy
**License: BSD** — permissive.

### OpenRefine
**License: BSD** — permissive.

### libphonenumber-js
**License: MIT** — permissive.

---

## 5. Data Handling Rules

- Do not store raw scraped HTML or page content beyond the current crawl session.
- `source_evidence.json` records URLs, titles, and extracted contact values only — not full page content.
- Do not share `factory_leads.csv`, `factory_leads.json`, or `source_evidence.json` externally without reviewing each contact for consent appropriateness.
- Delete stale output files (older than 90 days) from `data/output/` using `npm run clean`.
- Do not commit any `.csv`, `.json`, or `.env` output files to git. These are in `.gitignore`.

---

## 6. Outreach Compliance

All outreach using contacts identified by this system must comply with:
- `VANTAGE — Factory Outreach CRM Tracker` — legal positioning section
- `VANTAGE — First 500 Factory Outreach Script` — approved language only
- `VANTAGE — Factory Intelligence Dossier Template` — one dossier per factory before first contact

**Approved terms:** gap scan, compliance guidance, audit-preparation support, corrective action plan.
**Forbidden terms:** audit pass guarantee, certified compliant, legal advice, official audit, government approved, 100% compliant.

---

## 7. Baileys — Risk Documentation (Optional Tool, NOT Installed)

Baileys is an unofficial reverse-engineered WhatsApp library. It is:
- **Not installed** in this module.
- **Not recommended** for VANTAGE operations.
- Potentially a violation of Meta's Terms of Service.
- A risk to your WhatsApp number being permanently banned.
- A grey area under Bangladesh ICT Act 2006 for commercial messaging without consent.

**If you ever need WhatsApp automation:** Use the official WhatsApp Business Platform API via an approved Business Solution Provider (BSP). This is legal, scalable, and protects your business number.

---

## 8. SearXNG Cross-Check Queries

SearXNG queries use public search engines (DuckDuckGo, Bing, etc.) through your self-hosted private proxy. Queries are simple name + contact string lookups. They:
- Do not submit data to any third-party API.
- Do not identify you to the factory being researched.
- Do not constitute "targeted surveillance" of any individual.

---

*Last reviewed: 2026-06-01 | Next review due: 2026-12-01*
