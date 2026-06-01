# VANTAGE Factory Contact Intelligence — Operations Playbook

**Status:** Active — v1.0
**Owner:** Keystone Consultancy trading as VANTAGE
**For:** Munim — daily field use
**Purpose:** How to actually use the Factory Contact Intelligence system from start to first sales message.

---

## Before You Start — One-Time Setup

### 1. Install dependencies

```bash
cd vantage/intelligence/factory-contact-intelligence
npm install
```

### 2. Copy and fill in the environment file

```bash
cp .env.example .env
# Edit .env — minimum required: SEARXNG_BASE_URL if running SearXNG locally
```

### 3. Start Docker services (SearXNG, SpiderFoot, Reacher)

```bash
docker compose -f docker/docker-compose.intelligence.yml up -d
```

Once running:
- SearXNG UI: http://localhost:8080
- SpiderFoot UI: http://localhost:5001

### 4. Prepare your seed file

```bash
cp data/input/seed_factories.example.csv data/input/seed_factories.csv
```

Open `seed_factories.csv` in Excel or Google Sheets and fill in your factories. The minimum columns you need: `factory_id`, `factory_name`, `website`, `district`.

---

## Step 1 — Where to Get Seed Factory Names

Collect factory names and websites from these public sources **before running any crawl**:

| Source | URL | What to collect |
|---|---|---|
| **Open Supply Hub** | opensupplyhub.org | Factory name, OS ID, location, contributors (brands) |
| **BGMEA Member Directory** | bgmea.com.bd/member | Factory name, BGMEA ID, address, product type |
| **BKMEA Directory** | bkmea.com | Factory name, knitwear focus, address |
| **RSC Bangladesh** | rsc-bd.org | Factory name, RSC status |
| **Made in Bangladesh** | made-in-bangladesh.com | Factory website, contact name |
| **Trade fair listings** | bgmea.com.bd, dhakaapparelsummit.com | Factory booth contacts |
| **Buyer public supplier lists** | H&M, Primark, Inditex sustainability reports | Factory name, location |
| **LinkedIn company search** | linkedin.com/search/results/companies | Factory name, worker count, compliance signals |

**Rule:** Fill in the `source_seed` column in your CSV so the system tracks where each factory came from.

---

## Step 2 — Run a Single Factory Check (Daily Field Use)

When Munim finds a new prospect, run a targeted check before composing any outreach message:

```bash
# Set the factory in your seed file first, then:
tsx scripts/run-single-factory.ts FAC-20260601-042

# OR using npm:
FACTORY_ID=FAC-20260601-042 npm run crawl:factory
```

**What happens:**
1. Crawlee visits the factory website (home + contact page + about page)
2. Emails, phones, WhatsApp links are extracted from the public pages
3. Public directories (BGMEA, Open Supply Hub, RSC, Made in Bangladesh) are checked
4. SearXNG runs cross-reference queries: `"[factory name]" "[contact]"`
5. theHarvester checks the company domain for publicly discoverable email addresses
6. Confidence score is computed and contacts are rated High / Medium / Low / Rejected
7. Sales angle is recommended
8. Output files are written to `data/output/`

**Total time per factory:** ~2–5 minutes (respecting rate limits).

**Read the console output:**
```
Confidence: High (82)
Sales angle: buyer_readiness
Emails: info@factoryname.com.bd
WhatsApp: +8801712345678
```

---

## Step 3 — Run a Batch (Seed Crawl)

When you have a full list of 50–500 factories ready:

```bash
npm run crawl:seed
```

This processes every factory in `data/input/seed_factories.csv` sequentially. With default rate limiting (2s delay, 3 pages/factory, 5 sources), expect ~5–10 minutes per factory.

**For 100 factories:** ~10–15 hours. Run overnight.

**Monitor progress:** The console logs each factory as it starts and finishes.

---

## Step 4 — Cross-Check Emails After Batch

After a batch crawl, run the cross-check to improve confidence scores using SearXNG:

```bash
npm run cross-check
```

This re-queries SearXNG for every email and phone in the collected leads, verifying they appear on multiple public sources. Scores update automatically. Re-exports all output files.

---

## Step 5 — How to Treat Confidence Scores

| Tier | Score | What it means | Action |
|---|---|---|---|
| **High** | 80–100 | Contact verified on official website + 1+ other public source | Outreach immediately — add to CRM |
| **Medium** | 60–79 | Contact on 1 public source, partial signals | Outreach with caution — verify manually if time allows |
| **Low** | 35–59 | Contact found but weak verification | Do not outreach yet — try to verify via LinkedIn or phone call |
| **Rejected** | 0–34 | Contact unreliable or spammy source | Do not use — record in `rejected_contacts.csv` |

**One-minute manual check for Medium contacts:**
1. Open the factory's website yourself.
2. Search for the email or phone on their contact page.
3. If you find it: manually upgrade to High in your CRM.
4. If you don't find it: keep as Medium, use phone first instead of email.

---

## Step 6 — How to Treat WhatsApp Numbers Safely

**Legal-safe WhatsApp workflow:**

1. The system only extracts WhatsApp numbers from:
   - `wa.me/...` links on public factory pages
   - `api.whatsapp.com/send?phone=...` links
   - Text explicitly labeled "WhatsApp:" on public pages

2. All extracted numbers are normalized to `+8801XXXXXXXXX` format.

3. Before sending ANY WhatsApp message:
   - Confirm the number was publicly listed by the factory (check `source_url` in evidence file)
   - Send only the approved VANTAGE outreach message (see `FIRST_500_FACTORY_OUTREACH_SCRIPT.md`)
   - Send manually — never via automation

4. After your first message, log it in the CRM tracker with date + response.

5. If no reply after 3 days: send the follow-up message. Maximum 3 contacts per factory.

**If a factory replies "wrong number" or asks to stop: stop immediately and remove from CRM.**

---

## Step 7 — Export to Google Sheets / Twenty CRM / Baserow

### Google Sheets

```bash
# Already generated after any crawl:
data/output/google_sheets_import.csv
```

1. Open Google Sheets → File → Import → Upload → select `google_sheets_import.csv`
2. Import settings: Comma separator, Convert text to numbers = No
3. Paste into your `VANTAGE_Factory_Outreach_CRM` → `factories` tab
4. Match columns to the existing tracker headers — see `FACTORY_OUTREACH_CRM_TRACKER.md`

### Twenty CRM

1. In Twenty CRM, go to Companies → Import → CSV
2. Upload `google_sheets_import.csv`
3. Map fields:
   - `Factory Name` → Company Name
   - `Primary Email` → Email
   - `Primary Phone` → Phone
   - `Website` → Domain Name
   - `Confidence` → Custom field: Contact Confidence
   - `Sales Angle` → Custom field: Sales Angle

### Baserow

1. In your Baserow table, use the Import CSV function
2. Upload `factory_leads.csv` (has all fields including evidence trail)
3. Set `factory_id` as the unique identifier field

---

## Step 8 — Turn a Lead into a Free Gap Scan Message

Once you have a High or Medium confidence contact with a recommended sales angle:

**Step 8a: Fill in the dossier first**
```
FACTORY_INTELLIGENCE_DOSSIER_TEMPLATE.md
```
Open it, fill in the public signals found by the intelligence run. Takes 5–10 minutes.

**Step 8b: Pick the correct message template**

| Sales angle | Which script section to use |
|---|---|
| `buyer_readiness` | Section 3B — Buyer-Facing Factory Opener |
| `documentation_visibility` | Section 3C — Documentation Visibility Angle |
| `rsc_safety_documentation` | Section 3D — RSC/Safety Angle |
| `free_gap_scan` | Section 3A — Standard Free Gap Scan Opener |
| `md_owner_direct` | Section 3A (Bangla) — MD/Owner direct WhatsApp |
| `compliance_manager` | Section 3E — Compliance Manager Email |

**Step 8b: Personalize the message**
Replace the [brackets] in the template with the factory name, district, and one specific signal from the dossier (e.g., a buyer name, compliance certification, or RSC status).

**Step 8c: Send and log**
- Send via WhatsApp (manual), Email, or LinkedIn
- Log in CRM tracker: channel, date, message variant used
- Set follow-up task: 3 days from today

**Step 8d: Gap Scan link**
All messages must point to: `https://vantage-legal-brain.vercel.app/gap-scan`

---

## Step 9 — Daily Workflow Summary (5–10 factories/day)

```
Morning (30 min):
1. Add 5–10 new factories to seed_factories.csv from BGMEA / Open Supply Hub
2. Run: tsx scripts/run-single-factory.ts [ID] for each
3. Check confidence scores in console output

Midday (45 min):
4. Open google_sheets_import.csv — copy new High/Medium rows into CRM
5. Fill in dossier for each (use public signals from evidence file)
6. Compose personalized messages using the correct script angle

Afternoon (30 min):
7. Send 5–10 WhatsApp / email messages manually
8. Log each send in CRM tracker
9. Set follow-up tasks for day+3

Weekly (Friday — 30 min):
10. npm run cross-check (improves confidence on collected leads)
11. npm run clean (archive or delete old output files)
12. Review rejected_contacts.csv — manually verify 2–3 if time allows
```

---

## Appendix A — Understanding the Evidence File

After any crawl, check `data/output/source_evidence.json` to trace exactly where a contact came from:

```json
{
  "FAC-20260601-001": [
    {
      "value": "info@factoryname.com.bd",
      "type": "email",
      "source_url": "https://www.factoryname.com.bd/contact",
      "source_title": "Contact Us — Factory Name",
      "extraction_method": "html_regex",
      "confidence": 70,
      "first_seen_at": "2026-06-01T09:30:00.000Z"
    }
  ]
}
```

Use `source_url` to verify the contact is genuinely public before sending any outreach.

---

## Appendix B — When Not to Use This System

- Do not crawl a factory you have already made contact with (avoid over-researching existing relationships).
- Do not use this system to investigate individual workers or non-managerial staff.
- Do not use this system to build a resale database — it is for VANTAGE internal sales ops only.
- Do not run a crawl on a factory that has explicitly asked you not to contact them.
- Do not share output files with third parties without legal review.

---

## Appendix C — Troubleshooting

| Problem | Fix |
|---|---|
| `Seed file not found` | Copy `seed_factories.example.csv` → `seed_factories.csv` |
| `SearXNG query failed (503)` | Start Docker: `docker compose -f docker/docker-compose.intelligence.yml up -d` |
| `No contacts found for factory` | Check that `website` column in seed CSV is correct and publicly accessible |
| `All contacts Rejected` | Factory likely has no public contact information — try manual LinkedIn search |
| `theHarvester not found` | Check `THEHARVESTER_PATH` in `.env` matches where you installed it |
| `libphonenumber-js error` | Run `npm install` to ensure dependencies are installed |
| Crawlee blocks (robot.txt) | Respect the block — remove that URL from the crawl target |

---

*Playbook version: 1.0 | Built by VANTAGE Intelligence | Do not distribute externally*
