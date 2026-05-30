# /vantage

This is the VANTAGE product directory. Everything built for the VANTAGE compliance service lives here.

Do not modify `/ruflo` or `/Bangla-RAG-Pipeline` — those are upstream open-source dependencies.

---

## Directory Map

```
vantage/
├── brand/        Brand assets — logo, color palette, typography, print templates
├── legal/        Legal and commercial document templates — MSA, NDA, SoW, agreements
├── products/     Product specifications and deliverable templates — Gap Scan, CAP, Intelligence Brief, Worker Voice
├── website/      Next.js source for govantage.vercel.app (VANTAGE Control Tower)
├── agents/       VANTAGE-specific ruflo agent SKILL.md definitions
├── docs/         Internal documentation — source of truth index, runbooks, regulatory reference
└── scripts/      Utility scripts — document generation helpers, data migration, intake automation
```

---

## Status

| Directory | Status |
|-----------|--------|
| `brand/` | Placeholder — awaiting brand asset upload |
| `legal/` | Placeholder — awaiting DOCX template commit |
| `products/` | Placeholder — awaiting product spec files |
| `website/` | Placeholder — Next.js project not yet initialized |
| `agents/` | Placeholder — VANTAGE agent definitions not yet written |
| `docs/` | Active — see `docs/SOURCE_OF_TRUTH_INDEX.md` |
| `scripts/` | Placeholder — no scripts yet |

---

## Source of Truth

Business model, brand rules, legal positioning, revenue streams, document stack, and first build target are defined in:

```
/vantage-source-of-truth/
├── BUSINESS_BLUEPRINT.md
├── BRAND_SYSTEM.md
├── LEGAL_POSITIONING_RULES.md
├── REVENUE_STREAMS.md
├── DOCUMENT_STACK.md
└── FIRST_BUILD_TARGET.md
```

All content created in `/vantage/` must align with those files.
