# VANTAGE — Brand Color System

**Status:** Committed v1.0  
**Owner:** Keystone Consultancy trading as VANTAGE  
**Use for:** Website, PDFs, proposals, reports, dashboards, sales assets, internal tools.

---

## Primary Palette

| Token | Name | Hex | RGB | Use |
|---|---|---:|---|---|
| `--vantage-near-black` | Near Black | `#1A1A24` | `26, 26, 36` | Primary brand color, headings, dark backgrounds, premium surfaces |
| `--vantage-white` | Pure White | `#FFFFFF` | `255, 255, 255` | Primary background, document pages, clean surfaces |

---

## Secondary Palette

| Token | Name | Hex | RGB | Use |
|---|---|---:|---|---|
| `--vantage-deep-teal` | Deep Teal | `#006D77` | `0, 109, 119` | Trust signal, risk maps, dashboard accents, secondary CTAs |
| `--vantage-soft-gold` | Soft Gold | `#E2B44F` | `226, 180, 79` | Premium highlight, warning accents, key numbers, paid-offer emphasis |

---

## Neutral Palette

| Token | Name | Hex | RGB | Use |
|---|---|---:|---|---|
| `--vantage-light-grey` | Light Grey | `#F0F0F0` | `240, 240, 240` | Cards, dividers, secondary backgrounds |
| `--vantage-medium-grey` | Medium Grey | `#A0A0A0` | `160, 160, 160` | Muted labels, disabled states |
| `--vantage-dark-grey` | Dark Grey | `#505050` | `80, 80, 80` | Secondary text, footer text, document metadata |

---

## Approved Tints / Shades

| Token | Hex | Use |
|---|---:|---|
| `--vantage-near-black-90` | `#32323B` | Hover states, secondary dark surfaces |
| `--vantage-near-black-70` | `#5C5C66` | Muted dark UI elements |
| `--vantage-near-black-50` | `#868691` | Borders, chart grid lines |
| `--vantage-near-black-30` | `#B0B0BC` | Light divider lines |
| `--vantage-near-black-10` | `#DADAE7` | Subtle backgrounds |

---

## Accessibility Rules

Approved high-contrast pairings:

| Text | Background | Status |
|---|---|---|
| `#1A1A24` | `#FFFFFF` | Approved |
| `#FFFFFF` | `#1A1A24` | Approved |
| `#505050` | `#FFFFFF` | Approved |
| `#FFFFFF` | `#505050` | Approved |
| `#006D77` | `#FFFFFF` | Approved |
| `#FFFFFF` | `#006D77` | Approved |

Do not use low-contrast grey text on near-black backgrounds.

---

## Usage Ratio

- **60% neutral palette** — page backgrounds, document space, primary readability.
- **30% near black** — brand authority, headings, top bars, primary visual identity.
- **10% accents** — teal and gold for calls-to-action, key metrics, risk markers.

---

## Approved CSS Tokens

```css
:root {
  --vantage-near-black: #1A1A24;
  --vantage-deep-teal: #006D77;
  --vantage-soft-gold: #E2B44F;
  --vantage-white: #FFFFFF;
  --vantage-light-grey: #F0F0F0;
  --vantage-medium-grey: #A0A0A0;
  --vantage-dark-grey: #505050;
}
```

---

## Forbidden Color Use

- Neon colors
- Random blues, reds, greens, or purples outside the palette
- Multiple bright accent colors on one screen
- Low-contrast text pairings
- Decorative gradients in compliance document body pages
