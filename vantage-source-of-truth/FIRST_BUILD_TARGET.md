# VANTAGE — First Build Target: VANTAGE Control Tower

**Status:** Authoritative specification. All website and tooling decisions must align with this document.

---

## 1. What is the VANTAGE Control Tower?

The VANTAGE Control Tower is the public-facing website and client intake system. It is the first piece of software to build.

- **URL:** govantage.vercel.app
- **Stack:** Next.js (App Router) + Tailwind CSS, deployed on Vercel free tier
- **Backend:** Google Sheets (for intake data), Supabase (for Worker Voice, later), no custom backend at launch
- **Repo location:** `/vantage/website/` inside this repo
- **Deployment:** Vercel — connected to GitHub, auto-deploy on push to `main`

It is called "Control Tower" because it is the central point through which factories engage VANTAGE — and through which Munim manages client intake.

---

## 2. Why Build This First?

Before any outreach (WhatsApp broadcast, BGMEA workshop, LinkedIn), there must be a URL to send people to. The Control Tower:

1. Proves VANTAGE is a real, professional service (not a WhatsApp number)
2. Captures factory intake details automatically (no manual WhatsApp back-and-forth)
3. Hosts the BLA 2026 compliance score widget — the primary lead generation tool
4. Provides a location for the Intelligence Brief subscription
5. Establishes VANTAGE's public credibility before the first client meeting

---

## 3. Pages to Build (in priority order)

### Page 1: Landing Page (`/`)
**Purpose:** Convert a factory HR manager who clicked a WhatsApp link or LinkedIn post into a gap scan booking.

**Above the fold (visible without scrolling):**
- VANTAGE logo (top left)
- Tagline: "Bangladesh Labour Compliance — Fast, Affordable, Done Right."
- Sub-headline: "Fix your BLA 2026 gaps before the auditor arrives. 3–5 working days. BDT 55,000."
- Primary CTA button: "Book Your Free Gap Scan" → links to `/book`
- Secondary CTA: "See your compliance score" → links to `/compliance-score`

**Below the fold:**
- The problem (3 sentences: factories face audits, gaps lead to buyer suspensions, most HR teams don't have the bandwidth)
- The VANTAGE approach (3 icons: Fast / Bilingual / AI-assisted)
- What you get in the Sprint (5-item checklist)
- Price block: BDT 55,000 — all inclusive — 50% upfront / 50% on delivery
- Testimonial placeholder (to be filled after first 2 clients)
- Audit standard logos: BSCI / WRAP / SA8000 / Sedex (small row, "We align with:")
- Footer: Keystone Consultancy trading as VANTAGE | govantage.vercel.app | [email] | [WhatsApp]

**Language:** English primary. Toggle button to switch to Bangla (same page, translated content).

### Page 2: Compliance Score (`/compliance-score`)
**Purpose:** Interactive self-assessment tool. Factories answer 10 questions; VANTAGE returns a score and a risk level. Captures factory email/WhatsApp for follow-up.

**How it works:**
1. Factory selects their worker count range (< 100 / 100–500 / 500–2,000 / 2,000+)
2. Factory answers 10 yes/no questions based on most commonly failed BLA 2006 checklist items (leave register present, fire drill records maintained, appointment letters issued, etc.)
3. Score is calculated: each "No" = audit risk points weighted by severity
4. Result screen shows: score out of 100, risk level (Low / Medium / High / Critical), top 3 gaps identified
5. Below result: "Get the full gap scan free — 90 minutes — we find all of them."
6. Email / WhatsApp capture form to receive the full BLA 2026 checklist PDF

**Backend:** Google Sheets (via a Sheets API call or a Vercel serverless function writing to a sheet). No Supabase at launch.

**Language:** English and Bangla (toggle).

### Page 3: Book a Gap Scan (`/book`)
**Purpose:** Factory intake form. Captures everything Munim needs to prepare for the gap scan.

**Fields:**
- Factory name (required)
- Factory address / district (required)
- Contact name (required)
- Role / title (required)
- WhatsApp number (required)
- Email (optional)
- Approximate worker count (dropdown: < 100 / 100–500 / 500–2,000 / 2,000+)
- Upcoming audit? (Yes / No / Not sure) — if Yes: which standard, approximate date
- How did you hear about VANTAGE? (dropdown: WhatsApp / LinkedIn / BGMEA workshop / Audit firm referral / Other)
- Preferred gap scan format (On-site visit / Virtual call)
- Anything else you want to mention (open text, optional)

**On submit:**
- Data written to Google Sheet (Munim's intake tracker)
- Auto-reply WhatsApp message sent to factory (via WhatsApp Business API or manual trigger)
- Thank-you page: "We'll contact you within 24 hours to schedule your gap scan."

**Language:** English and Bangla (toggle).

### Page 4: Intelligence Brief (`/intelligence-brief`)
**Purpose:** Subscribe to the monthly regulatory intelligence report.

**Content:**
- What the brief covers (regulatory changes, audit standard updates, buyer ESG movements)
- Sample issue (abbreviated — shows quality)
- Price: BDT 8,000/month (free for Retainer clients)
- Subscribe form: name, factory name, email, WhatsApp number
- Payment: directed to bKash/Nagad details after form submission

**Language:** English primary.

---

## 4. Technical Constraints

| Constraint | Rule |
|-----------|------|
| Solo operator | No infrastructure that requires daily maintenance |
| No backend at launch | Use Vercel serverless functions + Google Sheets for data |
| Free tier preferred | Vercel free, Google Sheets free, Supabase free tier |
| No React Native | Web only at launch |
| Bangla text support | Must use Hind Siliguri or Noto Sans Bengali; test on Android Chrome |
| Mobile-first | 60%+ of factory HR managers will open on Android mobile |
| Fast load | Target < 2s LCP on 4G mobile connection |
| No cookies / tracking at launch | No cookie consent banner needed; no analytics that require consent |

---

## 5. Pages NOT in First Build

Build these only after the first 3 paying clients:
- Client portal (login, document access)
- Worker Voice dashboard
- Document Factory ordering interface
- Admin dashboard

---

## 6. Domain and Deployment

| Item | Value |
|------|-------|
| Domain | govantage.vercel.app (Vercel subdomain, free) |
| Custom domain (future) | govantage.com or vantage.com.bd (purchase when first revenue clears) |
| Deployment trigger | Push to `main` branch of this repo, Vercel auto-deploys |
| Environment variables | `GOOGLE_SHEETS_API_KEY`, `WHATSAPP_API_TOKEN` — in Vercel project settings, never committed |
| Analytics | Vercel Analytics (built-in, no consent required, no cookies) |

---

## 7. First Paid Offer Supported: BLA 2026 Sprint

The Control Tower exists to sell exactly one thing at launch: **the BLA 2026 Compliance Sprint at BDT 55,000**.

Every page, every CTA, every copy decision must optimize for one conversion: factory HR manager books a free gap scan → Munim conducts gap scan → Sprint is sold.

### Conversion funnel
```
WhatsApp broadcast / LinkedIn post / BGMEA workshop
        ↓
govantage.vercel.app (landing page)
        ↓
/compliance-score  (hook: "how exposed are you?")
        ↓
Email/WhatsApp captured + BLA checklist sent
        ↓
/book  (gap scan booked)
        ↓
Munim conducts 90-minute gap scan
        ↓
Sprint sold at BDT 55,000 (50% upfront)
        ↓
Sprint delivered in 5 days
        ↓
Review call → Retainer upsell
```

---

## 8. Definition of "Done" for First Build

The Control Tower is ready to go live when:

- [ ] Landing page is live at govantage.vercel.app with correct brand, tagline, and Sprint CTA
- [ ] Compliance Score page returns a score for 10 questions in both English and Bangla
- [ ] Book a Gap Scan form writes to Google Sheet and shows thank-you page
- [ ] Intelligence Brief page has a working subscribe form
- [ ] All pages pass mobile rendering test on Android Chrome at 360px width
- [ ] All pages load in < 3 seconds on a simulated 4G connection (Vercel Analytics)
- [ ] Footer shows "Keystone Consultancy trading as VANTAGE" on every page
- [ ] No forbidden phrases (from `BRAND_SYSTEM.md §4`) appear anywhere on the site
- [ ] VANTAGE logo is displayed correctly (pending brand asset upload)
- [ ] Bangla toggle works on landing page, compliance score page, and book page
