# VANTAGE — Typography System

**Status:** Committed v1.0  
**Owner:** Keystone Consultancy trading as VANTAGE  
**Use for:** Website, PDFs, proposals, reports, dashboards, sales assets, and internal tools.

---

## Core Direction

VANTAGE typography must feel institutional, clear, restrained, and readable. The visual priority is trust and operational clarity.

---

## Primary Typeface

| Role | Typeface | Use |
|---|---|---|
| Primary UI and document font | Inter | Website, dashboard UI, proposal body copy, report body copy |
| Headline font | Inter SemiBold / Bold | Report covers, section titles, hero headings, dashboard headings |
| Technical font | JetBrains Mono or system monospace | Compliance codes, file names, clause IDs, internal logs |

Use system fallbacks when custom font files are unavailable.

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

---

## Type Scale

| Token | Size | Line height | Use |
|---|---:|---:|---|
| Display | 48px | 56px | Website hero headline, report cover title |
| H1 | 36px | 44px | Page titles, major report sections |
| H2 | 28px | 36px | Section titles |
| H3 | 22px | 30px | Subsection titles, dashboard module headers |
| Body Large | 18px | 28px | Lead paragraphs, executive summaries |
| Body | 16px | 24px | Website and document body copy |
| Small | 14px | 20px | Metadata, labels, footnotes |
| Micro | 12px | 16px | Table labels, version notes, captions |

---

## Font Weight Rules

| Weight | Use |
|---|---|
| 400 Regular | Body copy |
| 500 Medium | UI labels, table headers, small emphasis |
| 600 SemiBold | Section headings, key facts, CTA text |
| 700 Bold | Major headings and high-priority numbers only |

Bold must signal importance, not decoration.

---

## Document Formatting Rules

For proposals, reports, and commercial documents:

- Body text: 11–12 pt
- Section headings: 14–16 pt, SemiBold
- Cover title: 22–28 pt, Bold
- Table text: 9–10 pt
- Footer metadata: 8–9 pt
- Use clear hierarchy and enough spacing.
- Do not compress tables into unreadable formats.

---

## Report Hierarchy

Every VANTAGE report should follow this visual order:

1. Cover title
2. Factory or client name
3. Report type
4. Date and version
5. Executive summary
6. Risk table
7. Detailed findings
8. Corrective action plan
9. Disclaimers and source notes

---

## Website Usage Rules

For `vantage/website/`:

- Use large, crisp headings.
- Use short paragraphs.
- Use generous spacing.
- Use card-based layouts for deliverables, pricing, and score results.
- Use tables only when they help buyers compare risk or deliverables.

---

## Forbidden Typography Use

- Script fonts
- Decorative serif fonts
- Casual fonts
- Overly condensed fonts
- All-caps body paragraphs
- Excessive letter spacing in body copy

---

## Tailwind Suggested Mapping

```ts
fontFamily: {
  sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
  mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
}
```
