# VANTAGE — Visual Experience Direction

**Status:** Committed v1.0  
**Owner:** Keystone Consultancy trading as VANTAGE  
**Purpose:** Define the premium visual direction for the VANTAGE Control Tower website before implementation begins.

---

## Core Visual Concept

VANTAGE Control Tower must feel like a compliance intelligence command center for Bangladesh RMG factories.

The visual language should combine:

- Bloomberg Terminal discipline
- industrial risk dashboard density
- premium institutional consulting restraint
- factory-floor operational urgency
- buyer-facing compliance credibility

The website must not feel like a generic SaaS landing page. It must feel like a tool built for factory owners, compliance managers, HR teams, and buyer-facing operators who need to see risk before it becomes expensive.

---

## Strategic Visual Objective

The website has one commercial job:

**Free Gap Scan → visible risk → BLA 2026 Compliance Sprint.**

Every visual choice must support that funnel.

Visuals should create the feeling that VANTAGE sees problems before the factory sees them.

---

## Reference Feel

Use these references as direction, not imitation:

| Reference | What to borrow | What to avoid |
|---|---|---|
| Bloomberg Terminal | dense intelligence, data seriousness, dark authority | clutter, old interface feel |
| Institutional compliance firms | trust, restraint, precision | bland corporate stock design |
| Industrial dashboards | risk status, operational clarity, structured signals | noisy IoT dashboard aesthetics |
| Premium consulting websites | whitespace, confidence, hierarchy | vague advisory language |
| Factory control rooms | urgency, status panels, operational focus | gimmicky sci-fi UI |

---

## Emotional Target

A factory MD or Compliance Manager should feel:

- this is serious
- this is built for my sector
- this can expose hidden risk fast
- this is safer than waiting for a buyer audit
- this is not a cheap agency service

They should not feel:

- this is another generic software startup
- this is only a pretty landing page
- this is too technical to use
- this is making legal/audit promises

---

## Homepage Hero Direction

The hero should be dark, sharp, and operational.

Suggested hero composition:

- dark near-black background
- VANTAGE wordmark top-left
- large headline focused on seeing compliance risk before buyer pressure
- short subheadline about Free Gap Scan and BLA 2026 Sprint
- primary CTA: Start Free Gap Scan
- secondary CTA: Book BLA 2026 Sprint Review
- right side: mock control-tower panel showing risk score, missing documents, top gaps, and Sprint trigger

Hero must not use generic abstract gradients or floating SaaS cards unless they look like a real risk cockpit.

---

## Homepage Section Visual Treatment

### 1. Hero / Command Panel

Dark surface, strong headline, risk dashboard preview.

Visual elements:

- compliance score tile
- risk band badge
- missing document counter
- audit urgency marker
- CTA strip

### 2. Problem Section

Show factory risk as operational leakage.

Use compact risk cards:

- appointment letters missing
- wage evidence unclear
- grievance records incomplete
- CAP not closed
- audit date approaching

### 3. Free Gap Scan Section

Show a 3-step process:

1. Answer 25 questions
2. See visible risk
3. Receive Sprint recommendation

Use numbered cards, not decorative icons.

### 4. BLA 2026 Sprint Section

This should look like a productized service package.

Include:

- BDT 55,000
- 3–5 working days
- 50% before start / 50% on delivery
- deliverables: gap report, corrective action plan, remediation support

### 5. Risk Dashboard Preview

Use a static dashboard-style section to preview future Control Tower capability.

Possible widgets:

- risk score card
- document readiness meter
- top 5 gaps table
- Sprint trigger status
- follow-up status

Do not build a full SaaS dashboard in MVP; this is a visual preview only.

### 6. Legal Boundary Section

Design this as trust infrastructure, not boring footer text.

State clearly:

- gap scan is not an audit
- VANTAGE provides compliance guidance and remediation support
- no audit result is guaranteed
- VANTAGE does not provide legal advice

---

## `/gap-scan` Visual Direction

The gap scan page must feel like a guided compliance terminal, not a Google Form.

Structure:

- progress rail or step indicator
- grouped question cards
- risk level hint shown subtly
- evidence notes field
- mobile-friendly single-column layout
- result screen with score and Sprint CTA

The result screen must be visually strong:

- large score number
- risk band badge
- top 5 gaps
- missing document list
- recommended next action
- disclaimer block
- WhatsApp CTA

---

## Dashboard-Style Elements

Use these visual motifs across the site:

- score tiles
- risk badges
- document readiness meters
- evidence status chips
- audit urgency markers
- compact tables
- operational timelines
- Sprint status cards

Avoid fake analytics that do not relate to the VANTAGE workflow.

---

## Motion / Interaction Direction

Motion must be restrained and purposeful.

Allowed:

- subtle fade/blur reveal on section entrance
- animated number count for risk score
- progress movement through gap scan steps
- button hover states
- result band reveal
- card elevation on hover

Not allowed:

- confetti
- sparkles
- neon glow effects
- bouncy startup animations
- playful illustrations
- excessive parallax
- animations that slow mobile performance

Use Magic UI only later and only for narrow components approved in `PUBLIC_REPO_WEBSITE_STACK_DECISION.md`.

---

## Dark / Light Mode Usage

Use dark mode strategically, not everywhere.

Recommended:

- homepage hero: dark
- dashboard preview: dark
- gap scan form: light with dark header
- report/result screen: light with strong dark score module
- legal disclaimer page: light, formal, readable

The website should feel premium, not gloomy.

---

## Color Usage

Use brand palette only:

- Near Black `#1A1A24` for authority and dark surfaces
- White `#FFFFFF` for document-style readability
- Deep Teal `#006D77` for trust, CTAs, selected states, risk-control accents
- Soft Gold `#E2B44F` for warnings, premium highlights, key figures
- Light Grey `#F0F0F0` for card backgrounds and dividers
- Dark Grey `#505050` for secondary text

Rules:

- no random blue
- no neon green
- no red-heavy fear design
- no rainbow charts
- no decorative gradients inside compliance content

---

## Typography Direction

Use Inter or system fallback.

Hierarchy:

- large, sharp homepage headline
- compact operational labels
- strong metric typography for score and price
- readable 16px body text
- no decorative fonts
- no all-caps body copy

The typography should feel like an institutional intelligence report translated into a website.

---

## Logo Usage

Use committed brand assets:

- Light background: `vantage/brand/logo-wordmark-black-on-white.jpeg`
- Dark background: `vantage/brand/logo-wordmark-white-on-black.jpeg`
- Compact/square use: `vantage/brand/logo-stacked-black-white.jpeg`

Rules:

- do not stretch logo
- do not recolor logo
- do not add shadows
- do not place logo over noisy backgrounds
- preserve clear space

---

## Mobile Experience

Mobile must be treated as primary.

Requirements:

- fast load on low-end Android
- no horizontal scrolling
- large buttons
- sticky scan progress
- short question sections
- WhatsApp CTAs visible
- result screen readable in one column
- no dense desktop tables on mobile

Factory contacts will likely open the site from WhatsApp, not desktop.

---

## Page Transitions

Use simple transitions:

- fade in route content
- no loading gimmicks
- no full-screen animated intro
- no scroll-hijacking

Speed is more important than spectacle.

---

## Microinteractions

Approved:

- CTA hover states
- risk badge color shift
- progress step activation
- score count-up
- evidence field focus states
- card hover border highlight

Avoid:

- playful button bounce
- loud hover animations
- decorative cursor effects
- unnecessary sound or video

---

## Legal Disclaimer Design Rules

Disclaimers must look intentional, not hidden.

Design guidance:

- use a bordered card or muted panel
- place near CTAs and before form submission
- use plain language
- do not bury disclaimer in tiny grey footer text
- on result screen, place disclaimer below score and above CTA

Required short disclaimer:

> VANTAGE provides compliance guidance and audit-preparation support. This is not a legal opinion, certification, official audit, or guarantee of audit outcome.

---

## What to Avoid

Do not use:

- generic SaaS hero gradients
- cartoon illustrations
- playful icons
- overused startup wave backgrounds
- testimonials with fake names
- fake buyer logos
- fake certifications
- invented audit badges
- cluttered dashboards with irrelevant data
- fear-based red warning overload
- claims of guaranteed audit success

---

## Implementation Constraints

The MVP must remain buildable fast.

Allowed implementation stack:

- fresh Next.js App Router
- TypeScript
- Tailwind CSS
- selected shadcn/ui components
- no full SaaS starter
- no auth system
- no payment gateway
- no full dashboard
- no RAG UI
- no document automation in MVP

Motion and advanced visuals come after the base funnel works.

---

## Acceptance Criteria Before Frontend Coding

Frontend coding may start only when:

- this visual direction file is committed
- public repo stack decision is committed
- readiness checklist is committed
- page copy spec is committed
- gap scan digital form spec is committed
- brand files are committed
- route list is locked
- legal disclaimer text is locked
- MVP scope remains focused on Free Gap Scan to Sprint conversion

---

## Next Build File

Create:

`vantage/website/WEBSITE_IMPLEMENTATION_TASK_BRIEF.md`

Purpose:

Give Claude/Ruflo the exact first coding task for the VANTAGE Control Tower MVP using this visual direction as design authority.
