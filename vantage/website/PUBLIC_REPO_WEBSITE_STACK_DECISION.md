# VANTAGE Control Tower — Public Repo Website Stack Decision

**Status:** Committed v1.0  
**Owner:** Keystone Consultancy trading as VANTAGE  
**Purpose:** Evaluate public repositories and UI toolkits before Control Tower website implementation. Commit before any npm install.

---

## VANTAGE Visual Direction — Evaluation Criteria

Every tool below is assessed against this baseline:

- Primary brand: Near Black `#1A1A24`, Deep Teal `#006D77`, Soft Gold `#E2B44F`
- Font: Inter (SemiBold for headings, Regular for body)
- Tone: institutional, compliance-grade, restrained, trust-building — not a consumer SaaS product
- Audience: RMG factory HR managers, compliance officers, buying house representatives
- Forms: multi-step gap scan, mobile-first
- Dashboard: future Control Tower with risk score cards and charts
- Risk to avoid: generic SaaS look that undermines professional compliance positioning

---

## 1. shadcn/ui — `shadcn-ui/ui`

**Repository:** `https://github.com/shadcn-ui/ui`  
**License:** MIT (code is copied into your project — you own the output)

### What it is

Not a traditional installed package. The `shadcn` CLI copies selected component source files directly into your codebase under `components/ui/`. Built on Radix UI primitives (accessible, headless) + Tailwind CSS utility classes. Includes: Button, Card, Dialog, Form, Input, Select, Label, Badge, Table, Tabs, Sheet, Separator, and 40+ more.

### Use case for VANTAGE

- Primary component library for the website and Control Tower
- Provides accessible form inputs for the `/gap-scan` multi-step form
- Cards for pricing, results, and dashboard layouts
- Dialogs, Sheets, and Tabs for future admin views

### Use now or later

**Use now — required from day one.** All other components build on top of it.

### License check required

No — MIT, code is your own after copying. No attribution required. No viral clause.

### Risk of generic SaaS look

**Low if tokens are replaced.** Default Zinc/Slate color scheme looks generic. The VANTAGE brand tokens must replace the default `--background`, `--foreground`, `--primary`, and `--accent` CSS variables in `globals.css` before any component is used. With VANTAGE tokens applied, components lose the generic SaaS appearance.

### How it supports VANTAGE visual direction

- Fully Tailwind-based: brand tokens drop in via `tailwind.config.ts` and CSS custom properties
- Components are accessible by default (WCAG 2.1 AA via Radix primitives)
- Forms use React Hook Form + Zod validation — matches `GAP_SCAN_FORM_SCHEMA.md` requirement
- No imposed visual identity — it adapts to whatever tokens you provide

### How to use

**Copy selected components.** Do not `npm install shadcn-ui`. Use the CLI to pull only what is needed:

```bash
npx shadcn@latest add button card input label select form badge table
```

Do not copy the full registry unless a component is actively used.

---

## 2. Magic UI — `magicuidesign/magicui`

**Repository:** `https://github.com/magicuidesign/magicui`  
**License:** MIT

### What it is

A collection of animated React components built on top of Framer Motion + Tailwind. Provides: Animated Number, Word Fade In, Shine Button, Marquee, Animated Beam, Particle Effects, Typing Animation, Dot Pattern backgrounds, Globe, and similar motion-heavy effects.

### Use case for VANTAGE

Narrow use only. Suitable for:

- Animated compliance score counter on the `/gap-scan` result screen (Animated Number)
- Risk band reveal animation (Word Fade In or Blur Fade)
- Potentially a subtle animated background on the `/` hero section (Dot Pattern — VANTAGE colors only)

### Use now or later

**Use later — after the base layout and form are working.** Motion is a refinement, not a foundation.

### License check required

**Yes — verify before use.** The repo is MIT at the repository level, but individual components may depend on Framer Motion (MIT) and any third-party icon sets. Confirm at the time of installation that no component's animation library carries a non-MIT clause.

### Risk of generic SaaS look

**High if used broadly.** Magic UI components are designed for modern startup landing pages (Rays, Confetti, Neon Gradients, Sparkles). These effects are visually incompatible with VANTAGE's compliance-grade positioning. Using them on results screens or pricing pages would undermine the institutional tone.

**Narrow allowlist:** Animated Number, Word Fade In, Blur Fade. No Neon Gradient, no Confetti, no Sparkle Button.

### How it supports VANTAGE visual direction

Only when constrained to numerical animation and simple text reveal. The compliance score (e.g. "57/100") benefits from an Animated Number counter. All other Magic UI effects are off-brand for a compliance platform.

### How to use

**Copy selected components only.** Do not install the full Magic UI package. Copy only the Animated Number and Blur Fade component source files into `components/motion/` and adapt to VANTAGE tokens. Do not run `npx magicui-cli add` for the full component set.

---

## 3. Tremor — `tremorlabs/tremor`

**Repository:** `https://github.com/tremorlabs/tremor`  
**License:** Apache-2.0 (v2 and earlier); Tremor Raw (v3+) is MIT-compatible

### What it is

React component library purpose-built for dashboards and analytics. Components include: AreaChart, BarChart, DonutChart, LineChart, KPI Card (Metric), ProgressBar, BadgeDelta, Tracker, and Sparklines. Built on Recharts + Tailwind. Tremor v3 ("Tremor Raw") is now copy-paste style like shadcn.

### Use case for VANTAGE

Future Control Tower dashboard:

- Risk score trend chart per factory over time (AreaChart)
- Category score breakdown (BarChart or RadialBar)
- Document completeness tracker (ProgressBar)
- Compliance band distribution across all factories (DonutChart)
- KPI cards: factories scanned, sprints active, documents pending

### Use now or later

**Use later — Phase 2 (Control Tower dashboard).** The MVP website (`/`, `/gap-scan`, `/pricing`, `/book`) does not need charts. Reserve Tremor for when the multi-factory analytics view is built.

### License check required

**Yes — verify version.** Tremor v2 was Apache-2.0 (permissive, compatible with commercial use, requires attribution in NOTICE file). Tremor Raw (v3+) components are MIT. Confirm the version used before copying. Apache-2.0 is not a blocker for commercial use but requires a NOTICE file entry.

### Risk of generic SaaS look

**Medium.** Tremor has a recognisable default appearance (indigo/blue, corporate tables, rounded metric cards). With Tailwind overrides and VANTAGE tokens, the charts adapt well. The default indigo color must be replaced with VANTAGE Deep Teal `#006D77` for chart lines and bars, and Soft Gold `#E2B44F` for accent/warning series.

### How it supports VANTAGE visual direction

Risk scoring data is central to VANTAGE's value proposition. Clients will need to see their compliance trajectory over time. Tremor charts fill this gap without requiring a custom charting layer. The component library is compliance-dashboard-appropriate in structure — tabular data, KPI metrics, progress indicators.

### How to use

**Use only for reference until Phase 2.** When the Control Tower dashboard is built, use Tremor Raw (v3+) copy-paste components rather than the installed package, so Tailwind overrides apply cleanly. Copy only components actively used.

---

## 4. Satori — `vercel/satori`

**Repository:** `https://github.com/vercel/satori`  
**License:** Mozilla Public License 2.0 (MPL-2.0)

### What it is

Satori is **not a UI component library.** It converts JSX/React component trees into SVG at the server edge. It is the engine behind Vercel's `@vercel/og` for generating Open Graph (OG) social share images. Produces a static SVG or PNG from a React element tree without a browser.

### Use case for VANTAGE

One specific use:

- Generate a custom OG image for each Gap Scan result page:
  `vantage/og?score=57&band=High+Risk&factory=Kader+Knitwear`
- Each shared link to a Gap Scan result shows a branded image with the compliance score and VANTAGE logo on Facebook, WhatsApp, and LinkedIn — drives awareness when factory managers share results

This is a strong secondary marketing channel: a factory manager shares their result with a buyer via WhatsApp and the preview card carries the VANTAGE brand.

### Use now or later

**Use later — Phase 2.** OG image generation is not required for the MVP. Implement when the result page is stable and the branded share card adds marketing value.

### License check required

**Yes — MPL-2.0 requires review.** MPL-2.0 is a weak copyleft license. It requires that modifications to MPL-licensed files be released under MPL-2.0, but does not require the broader application to be open-sourced. For VANTAGE, this means:
- Using Satori through the `@vercel/og` package (which wraps it) avoids direct file modification.
- Do not fork or modify the Satori source.
- Using `@vercel/og` as a dependency is the safe commercial path. Confirm with a legal check before releasing under a commercial codebase.

### Risk of generic SaaS look

**None — it generates whatever you design.** Satori renders a JSX template you write. The output will match VANTAGE's brand colors and typography because you design the JSX card. No risk of imposing a look.

### How it supports VANTAGE visual direction

The OG image template should show:
- VANTAGE wordmark (logo-wordmark-white-on-black.jpeg on `#1A1A24` background)
- Factory compliance score in large numerals
- Risk band badge in VANTAGE Deep Teal or Soft Gold
- Tagline: "Compliance guidance for Bangladesh RMG"

### How to use

**Reference only now.** When Phase 2 OG images are needed, use through `@vercel/og` (not direct Satori import). Do not install today.

---

## 5. SaasLaunch — `ShipKitCo/saaslaunch-nextjs`

**Repository:** `https://github.com/ShipKitCo/saaslaunch-nextjs`  
**License:** Requires verification — likely commercial or source-available (not confirmed MIT)

### What it is

A Next.js SaaS boilerplate/starter kit. Typically includes: Clerk or NextAuth for authentication, Stripe for billing, database ORM (Prisma or Drizzle), email (Resend), dashboard shell, marketing landing page layout, and sometimes shadcn/ui pre-integrated.

### Use case for VANTAGE

None at current stage. VANTAGE does not require:

- User authentication (factories submit a public form, no login required)
- Stripe or payment processing (payments are offline: bKash or bank transfer)
- SaaS subscription billing logic
- User dashboard with login

The components bundled in a SaaS starter are solving problems VANTAGE does not yet have.

### Use now or later

**Do not use at any stage.** The starter kit imposes an entire application architecture designed for a SaaS product with paying logged-in users. VANTAGE in its MVP phase is: a public website, a submission form, and a Google Sheets backend. Using a SaaS starter would introduce Clerk/Stripe complexity into a codebase that needs none of it.

When VANTAGE eventually needs a factory login portal (Phase 3 or beyond), evaluate a starter at that point — but only after confirming the license allows commercial use without royalties.

### License check required

**Yes — critical.** SaaS starters often carry commercial licenses that require payment for production use or restrict resale. Do not install without reading the LICENSE file. Using under a commercial license that requires per-seat or per-project fees would create ongoing cost.

### Risk of generic SaaS look

**Very high.** SaaS starters are designed to look like Notion, Linear, or Vercel. They are built for horizontal consumer SaaS products. VANTAGE is a vertical compliance services business. The default layout, nav structure, pricing tables, and visual hierarchy are all wrong for the target audience.

### How it supports VANTAGE visual direction

**It does not.** A SaaS starter actively works against VANTAGE's institutional positioning.

### How to use

**Reference only — and only for specific isolated patterns (e.g., multi-step form state management technique).** Do not copy the starter, do not clone it, do not install it.

---

## 6. Bazz Blocks SaaS Starter — `arbaz-17/bazz-blocks-saas-starter`

**Repository:** `https://github.com/arbaz-17/bazz-blocks-saas-starter`  
**License:** Requires verification — unconfirmed

### What it is

A less well-known Next.js SaaS starter. Likely includes: shadcn/ui components, some form handling, marketing sections (hero, features, pricing, FAQ, footer), and possibly authentication. A smaller project than ShipKitCo — fewer community validations, less maintenance activity.

### Use case for VANTAGE

None. Same assessment as ShipKitCo/saaslaunch-nextjs above, with additional concerns:

- Lower repository maturity — fewer contributors, fewer real-world production deployments
- Higher risk of abandoned maintenance
- Unknown license terms

### Use now or later

**Do not use.** Lower community validation means higher risk. VANTAGE's codebase should be built on reliable, actively maintained foundations.

### License check required

**Yes — but not necessary to proceed with.** Since the recommendation is not to use this, the license check is moot unless Munim specifically identifies a component pattern from this repo worth referencing.

### Risk of generic SaaS look

**Very high.** SaaS starters mirror each other visually. The default hero, feature cards, and pricing section from any starter will look like dozens of other startup websites. VANTAGE's compliance positioning requires a visual language that looks institutional and sector-specific.

### How it supports VANTAGE visual direction

**It does not.**

### How to use

**Reference only — and only if a specific layout pattern cannot be found in shadcn/ui or the official Next.js examples.** Do not install, do not copy the template structure.

---

## Final Recommendation

### 1. Base project

**Next.js App Router — initialised fresh with `create-next-app`.**

Do not use a SaaS starter as the base. Initialise clean with:

```bash
npx create-next-app@latest control-tower \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"
```

Apply VANTAGE brand tokens to `tailwind.config.ts` and `globals.css` before writing any component. This ensures no generic theme bleeds through.

### 2. UI component system

**shadcn/ui — copy selected components only.**

Copy components using the shadcn CLI as each is needed. Immediately replace the default CSS variable tokens with VANTAGE values:

```css
/* globals.css — replace shadcn defaults with VANTAGE tokens */
:root {
  --background: #FFFFFF;
  --foreground: #1A1A24;
  --primary: #1A1A24;
  --primary-foreground: #FFFFFF;
  --secondary: #F0F0F0;
  --secondary-foreground: #1A1A24;
  --accent: #006D77;
  --accent-foreground: #FFFFFF;
  --muted: #F0F0F0;
  --muted-foreground: #505050;
  --border: #DADAE7;
  --ring: #006D77;
}
```

First components to copy: `button`, `card`, `input`, `label`, `select`, `form`, `badge`, `progress`.

### 3. Motion/visual component source

**Magic UI — copy Animated Number and Blur Fade source only.**

Copy these two component files into `components/motion/` manually. Do not use the Magic UI CLI to install the full set. These provide the animated compliance score counter on the result screen. All other Magic UI effects (Neon Gradient, Sparkles, Confetti, Rays) are forbidden on VANTAGE surfaces.

Framer Motion will be a project dependency once these components are added. Pin to a stable version.

### 4. Dashboard/chart component source

**Tremor Raw (v3+) — copy selected components, Phase 2 only.**

Do not add Tremor to the MVP website build. When the Control Tower analytics dashboard is built, use Tremor Raw (copy-paste, not installed package). Override chart colors with Deep Teal `#006D77` for primary series and Soft Gold `#E2B44F` for accent series. Recharts will become a project dependency at that point.

For Phase 2 OG image generation: use `@vercel/og` (which wraps Satori). MPL-2.0 risk is managed by not modifying the Satori source.

### 5. What not to use

| Tool | Decision | Reason |
|---|---|---|
| ShipKitCo/saaslaunch-nextjs | Do not use | SaaS-first architecture, generic look, authentication and billing complexity VANTAGE does not need, license unconfirmed |
| arbaz-17/bazz-blocks-saas-starter | Do not use | Low maturity, unconfirmed license, generic SaaS aesthetic, same problems as ShipKitCo |
| Magic UI (full set) | Do not use — two components only | Majority of effects are off-brand for a compliance platform |
| Tremor (in MVP) | Do not use yet | Charts are Phase 2; no analytics in MVP routes |
| Satori (in MVP) | Do not use yet | OG images are Phase 2 |
| Any SaaS starter as base project | Do not use | Imposes wrong architecture, wrong visual identity, wrong feature set |

---

## Pre-Implementation Checklist

Before running `npx create-next-app`:

- [ ] `GAP_SCAN_DIGITAL_FORM_SPEC.md` committed — confirmed ✓
- [ ] `CONTROL_TOWER_MVP_BUILD_BRIEF.md` committed — confirmed ✓
- [ ] `CONTROL_TOWER_PAGE_COPY_SPEC.md` committed — confirmed ✓
- [ ] `GAP_SCAN_DATA_STORAGE_PLAN.md` committed — confirmed ✓
- [ ] `RISK_SCORING_MODEL.md` committed — confirmed ✓
- [ ] Brand tokens (colors.md, typography.md) committed — confirmed ✓
- [ ] This file committed — confirmed ✓
- [ ] `CONTROL_TOWER_IMPLEMENTATION_READINESS_CHECKLIST.md` reviewed

---

## Next Build File

When Munim is ready to start website implementation:

1. Confirm `CONTROL_TOWER_IMPLEMENTATION_READINESS_CHECKLIST.md` passes
2. Initialise Next.js project in `vantage/website/`
3. Apply VANTAGE brand tokens
4. Copy first shadcn/ui components
5. Build `/` landing page first
