# VANTAGE — DOCX Template Field Map

**Status:** Committed v1.0  
**Owner:** Keystone Consultancy trading as VANTAGE  
**Workflow:** Free Gap Scan → Gap Report → Quotation → MSA → Sprint Work Order → Invoice  
**Purpose:** Map fields from `GAP_SCAN_FORM_SCHEMA.md` to the current DOCX templates before automation is built.

---

## Scope Rules

This file does not confirm that placeholders already exist inside the DOCX files.

All placeholder status must be treated as:

**Needs template inspection**

No DOCX files were parsed or modified to create this map.

---

## Source Files Used

| Source | Path |
|---|---|
| Form schema | `vantage/products/gap-scan/GAP_SCAN_FORM_SCHEMA.md` |
| Assembly map | `vantage/products/gap-scan/GAP_SCAN_REPORT_ASSEMBLY_MAP.md` |
| Legal manifest | `vantage/legal/LEGAL_DOCUMENTS_MANIFEST.md` |
| Product manifest | `vantage/products/PRODUCT_DOCUMENTS_MANIFEST.md` |

---

## Legal Positioning

All generated documents must preserve VANTAGE positioning:

- gap scan, not audit
- compliance guidance, not legal advice
- remediation support, not certification
- no audit result guarantee

Forbidden document language:

- certify
- guarantee audit pass
- official audit
- verification body
- legal advice

---

## Shared Source Field IDs

These fields come from `GAP_SCAN_FORM_SCHEMA.md` and should be reused across templates.

| Field ID | Meaning |
|---|---|
| `factory_name` | Factory name |
| `factory_address` | Factory address |
| `district_zone` | District / industrial zone |
| `worker_count_range` | Worker count range |
| `main_products` | Main products |
| `main_buyers` | Main buyers |
| `audit_frameworks` | Relevant audit frameworks |
| `contact_name` | Contact person |
| `contact_role` | Contact role |
| `whatsapp_number` | WhatsApp number |
| `email` | Email |
| `decision_maker_present` | Whether decision-maker is involved |
| `upcoming_audit` | Upcoming audit status |
| `upcoming_audit_date` | Upcoming audit date |
| `recent_failed_audit` | Recent failed audit or CAP status |
| `cap_deadline` | CAP deadline |
| `buyer_pressure` | Buyer request or pressure status |
| `critical_count` | Number of Critical-risk gaps |
| `high_count` | Number of High-risk gaps |
| `medium_count` | Number of Medium-risk gaps |
| `low_count` | Number of Low-risk gaps |
| `total_risk_points` | Total score from risk model |
| `risk_band` | Low / Medium / High / Critical |
| `sprint_triggered` | Whether Sprint recommendation is triggered |
| `recommended_offer` | Recommended next offer |
| `top_5_gaps` | Highest-priority gaps |
| `missing_documents` | Missing document list |
| `immediate_actions` | Recommended remediation actions |
| `client_facing_summary` | Client-safe summary |
| `internal_sales_note` | Munim-only follow-up note |
| `disclaimer_text` | Required legal positioning disclaimer |

---

## Template 1 — Free Gap Scan Form

| Item | Value |
|---|---|
| Template file path | `vantage/products/VANTAGE_Free_Gap_Scan_Form.docx` |
| Output file pattern | `VANTAGE_GapScan_Form_[FactoryName]_[YYYYMMDD].docx` |
| Placeholder status | Needs template inspection |
| Primary use | Capture initial factory profile, contact details, audit urgency, answers, and evidence notes |

### Fields Required

- `factory_name`
- `factory_address`
- `district_zone`
- `worker_count_range`
- `main_products`
- `main_buyers`
- `audit_frameworks`
- `contact_name`
- `contact_role`
- `whatsapp_number`
- `email`
- `upcoming_audit`
- `upcoming_audit_date`
- `recent_failed_audit`
- `cap_deadline`
- `buyer_pressure`
- `Q01` to `Q25` answer set
- evidence notes for each answered item

### Manually Entered Fields

- scan date
- scan method: on-site / virtual / phone
- notes from Munim
- visible document gaps

### Fields That Must Never Be Auto-Changed

- legal disclaimer text
- brand footer language
- Keystone Consultancy trading name

### Disclaimer Fields

Use `disclaimer_text` from `GAP_SCAN_FORM_SCHEMA.md`.

### Logo / Brand Placement Notes

Use `vantage/brand/logo-wordmark-black-on-white.jpeg` for light document headers.

### Missing Placeholders to Add Later

- `{{factory_name}}`
- `{{contact_name}}`
- `{{whatsapp_number}}`
- `{{scan_date}}`
- `{{risk_band}}`
- `{{disclaimer_text}}`
- `{{Q01_answer}}` through `{{Q25_answer}}`

### Future Automation Notes

Generate client-specific copies only. Do not overwrite the source template.

---

## Template 2 — 1-Page Gap Report

| Item | Value |
|---|---|
| Template file path | `vantage/products/VANTAGE_1_Page_Gap_Report_Template.docx` |
| Output file pattern | `VANTAGE_1Page_GapReport_[FactoryName]_[YYYYMMDD].pdf` |
| Placeholder status | Needs template inspection |
| Primary use | Show risk summary, top gaps, missing documents, and recommended next step |

### Fields Required

- `factory_name`
- `district_zone`
- `worker_count_range`
- `total_risk_points`
- `risk_band`
- `critical_count`
- `high_count`
- `medium_count`
- `low_count`
- `top_5_gaps`
- `missing_documents`
- `immediate_actions`
- `recommended_offer`
- `client_facing_summary`
- `disclaimer_text`

### Manually Entered Fields

- scan date
- prepared by
- final review note
- Munim contact details if not already fixed in template

### Fields That Must Never Be Auto-Changed

- disclaimer text
- legal positioning wording
- VANTAGE / Keystone Consultancy identity
- report type label: Free Gap Scan / Gap Report

### Disclaimer Fields

Use `disclaimer_text` on the report body or footer.

### Logo / Brand Placement Notes

Use `vantage/brand/logo-wordmark-black-on-white.jpeg` for light report layouts or `vantage/brand/logo-wordmark-white-on-black.jpeg` for dark cover/header layouts.

### Missing Placeholders to Add Later

- `{{factory_name}}`
- `{{scan_date}}`
- `{{risk_score}}`
- `{{risk_band}}`
- `{{top_5_gaps}}`
- `{{missing_documents}}`
- `{{recommended_offer}}`
- `{{disclaimer_text}}`

### Future Automation Notes

Generate DOCX first, then export to PDF. Store both versions in the client folder.

---

## Template 3 — Quotation

| Item | Value |
|---|---|
| Template file path | `vantage/legal/VANTAGE_Quotation_Template-1.docx` |
| Output file pattern | `VANTAGE_Quotation_[FactoryName]_[YYYYMMDD].pdf` |
| Placeholder status | Needs template inspection |
| Primary use | Present BLA 2026 Compliance Sprint price, deliverables, and payment terms |

### Fields Required

- `factory_name`
- `factory_address`
- `contact_name`
- `contact_role`
- `whatsapp_number`
- `email`
- `recommended_offer`
- `risk_band`
- `upcoming_audit_date`

### Manually Entered Fields

- quotation number
- quotation date
- validity period
- payment method
- travel charge, if outside Dhaka / Gazipur

### Fields That Must Never Be Auto-Changed

- service boundary wording
- price structure unless approved by Munim
- disclaimer wording
- legal entity name

### Disclaimer Fields

Include short disclaimer: VANTAGE provides compliance guidance and audit-preparation support only. No audit result is guaranteed.

### Logo / Brand Placement Notes

Use light-background logo unless quotation uses dark cover design.

### Missing Placeholders to Add Later

- `{{quotation_number}}`
- `{{quotation_date}}`
- `{{factory_name}}`
- `{{service_name}}`
- `{{price}}`
- `{{payment_terms}}`
- `{{valid_until}}`

### Future Automation Notes

Quotation should be generated only when sales trigger rules approve it.

---

## Template 4 — MSA

| Item | Value |
|---|---|
| Template file path | `vantage/legal/MSA_VANTAGE_v1.docx` |
| Output file pattern | `VANTAGE_MSA_[FactoryName]_[YYYYMMDD].pdf` |
| Placeholder status | Needs template inspection |
| Primary use | Govern the full commercial relationship before paid work begins |

### Fields Required

- `factory_name`
- `factory_address`
- `contact_name`
- `contact_role`
- `email`
- `whatsapp_number`

### Manually Entered Fields

- client legal name if different from factory name
- authorized signatory name
- signatory designation
- agreement date
- term / effective date

### Fields That Must Never Be Auto-Changed

- legal disclaimer clauses
- limitation of liability clauses
- IP ownership clauses
- audit outcome disclaimer
- governing law/dispute language
- Keystone Consultancy identity

### Disclaimer Fields

Do not auto-edit disclaimer clauses. Any disclaimer change requires manual legal review.

### Logo / Brand Placement Notes

Use formal light-background logo only.

### Missing Placeholders to Add Later

- `{{client_legal_name}}`
- `{{factory_name}}`
- `{{factory_address}}`
- `{{authorized_signatory}}`
- `{{signatory_designation}}`
- `{{effective_date}}`

### Future Automation Notes

Automate only party details and dates. Do not automate clause language changes.

---

## Template 5 — Sprint Work Order

| Item | Value |
|---|---|
| Template file path | `vantage/legal/Sprint_Work_Order_VANTAGE.docx` |
| Output file pattern | `VANTAGE_Sprint_WorkOrder_[FactoryName]_[YYYYMMDD].pdf` |
| Placeholder status | Needs template inspection |
| Primary use | Define BLA 2026 Compliance Sprint scope, timeline, deliverables, and payment schedule |

### Fields Required

- `factory_name`
- `factory_address`
- `contact_name`
- `contact_role`
- `whatsapp_number`
- `email`
- `recommended_offer`
- `risk_band`
- `top_5_gaps`
- `missing_documents`

### Manually Entered Fields

- Sprint start date
- target delivery date
- delivery method
- agreed deliverables
- payment confirmation status

### Fields That Must Never Be Auto-Changed

- out-of-scope items
- disclaimer wording
- payment terms unless approved by Munim
- no-guarantee language

### Disclaimer Fields

Use approved VANTAGE service-boundary disclaimer.

### Logo / Brand Placement Notes

Use formal light-background logo.

### Missing Placeholders to Add Later

- `{{sprint_start_date}}`
- `{{delivery_date}}`
- `{{factory_name}}`
- `{{deliverables}}`
- `{{price}}`
- `{{payment_schedule}}`

### Future Automation Notes

Generate only after quotation acceptance.

---

## Template 6 — Invoice

| Item | Value |
|---|---|
| Template file path | `vantage/legal/VANTAGE_Invoice_Template.docx` |
| Output file pattern | `VANTAGE_Invoice_[FactoryName]_[YYYYMMDD].pdf` |
| Placeholder status | Needs template inspection |
| Primary use | Request payment under Keystone Consultancy trading as VANTAGE |

### Fields Required

- `factory_name`
- `factory_address`
- `contact_name`
- `email`
- `recommended_offer`

### Manually Entered Fields

- invoice number
- invoice date
- due date
- service description
- amount due
- payment status
- payment method

### Fields That Must Never Be Auto-Changed

- legal entity name
- payment instruction text unless approved by Munim
- tax/VAT wording unless reviewed

### Disclaimer Fields

Do not describe the service as legal service, certification, verification, or official audit.

### Logo / Brand Placement Notes

Use light-background logo.

### Missing Placeholders to Add Later

- `{{invoice_number}}`
- `{{invoice_date}}`
- `{{due_date}}`
- `{{factory_name}}`
- `{{service_description}}`
- `{{amount_due}}`
- `{{payment_method}}`

### Future Automation Notes

Generate upfront invoice only after MSA and Sprint Work Order are ready for signature or after client approval.

---

## Automation Readiness Checklist

Before automation is built:

- inspect each DOCX template manually
- identify actual placeholders, if any
- add consistent placeholder tags where missing
- confirm disclaimer blocks are locked
- confirm logo placement
- create sample client data JSON
- generate test copies only, never source-template edits
- review outputs with `vantage-legal-risk-guard`

---

## Next Build File

Create:

`vantage/sales/FREE_GAP_SCAN_TO_SPRINT_PLAYBOOK.md`

Purpose:

Give Munim a manual playbook to close BDT 55,000 BLA 2026 Compliance Sprint deals before automation is built.
