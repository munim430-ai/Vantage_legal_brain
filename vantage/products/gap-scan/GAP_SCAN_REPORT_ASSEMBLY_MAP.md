# VANTAGE — Gap Scan Report Assembly Map

**Status:** Committed v1.0  
**Owner:** Keystone Consultancy trading as VANTAGE  
**Workflow:** Free Gap Scan → 1-page Gap Report → BLA 2026 Compliance Sprint recommendation → quotation → MSA → Sprint Work Order → invoice

---

## Purpose

This file defines how a completed Free Gap Scan becomes a client-facing gap report and a paid BLA 2026 Compliance Sprint sales workflow.

The Free Gap Scan is not an audit. It is a fast compliance guidance and audit-preparation assessment used to identify visible risk and recommend remediation support.

---

## Source Files Used

| Source | Path | Role |
|---|---|---|
| Question bank | `vantage/products/gap-scan/GAP_SCAN_QUESTION_BANK.md` | Defines 25 assessment questions, evidence requests, remediation actions, and source paths |
| Scoring model | `vantage/products/gap-scan/RISK_SCORING_MODEL.md` | Converts answers into risk score, risk band, and Sprint trigger |
| Gap report template | `vantage/products/VANTAGE_1_Page_Gap_Report_Template.docx` | Output template for client-facing 1-page report |
| Free scan form | `vantage/products/VANTAGE_Free_Gap_Scan_Form.docx` | Data capture form during scan |
| Quotation template | `vantage/legal/VANTAGE_Quotation_Template-1.docx` | Commercial quote after scan |
| MSA | `vantage/legal/MSA_VANTAGE_v1.docx` | Master agreement before paid work |
| Sprint Work Order | `vantage/legal/Sprint_Work_Order_VANTAGE.docx` | Scope, timeline, and deliverables for Sprint |
| Invoice template | `vantage/legal/VANTAGE_Invoice_Template.docx` | Payment request |

---

## Factory Input Fields Needed

Collect these before or during the Free Gap Scan:

| Field | Required | Use |
|---|---|---|
| Factory name | Yes | Report, quotation, MSA, invoice |
| Factory address | Yes | Report, MSA, work order |
| District / industrial zone | Yes | Segmentation and travel planning |
| Contact person | Yes | Sales follow-up |
| Contact role | Yes | Buyer/decision-maker qualification |
| WhatsApp number | Yes | Follow-up and document collection |
| Email | Optional | Formal document sending |
| Worker count | Yes | Risk context and offer fit |
| Main buyer / audit standard | Optional | Audit-preparation mapping |
| Upcoming audit date | Optional | Urgency trigger |
| Recent failed audit or CAP | Optional | Sprint urgency trigger |
| Documents available during scan | Yes | Evidence-gap scoring |
| Top three missing documents | Yes | Report and Sprint pitch |

---

## Answer-to-Report Mapping

| Input from scan | Report section affected |
|---|---|
| Critical-risk No answers | Executive summary and urgent risk list |
| High-risk No answers | Priority gap table |
| Medium-risk No answers | Planned remediation section |
| Low-risk No answers | Improvement notes |
| Question 25 short answer | Missing-document list and Sprint action plan |
| Evidence not produced | Evidence gap section |
| Upcoming audit date | Time-sensitive recommendation |
| Recent CAP | CAP clean-up recommendation |
| Main buyer / audit framework | Audit-preparation alignment note |

---

## Risk Band Trigger Logic

| Risk band | Score range | Sprint recommendation |
|---|---:|---|
| Low Risk | 0–15 | Do not hard sell. Offer document health check or retainer follow-up. |
| Medium Risk | 16–35 | Recommend BLA 2026 Compliance Sprint if audit is within 8 weeks or if key documents are missing. |
| High Risk | 36–60 | Recommend BLA 2026 Compliance Sprint immediately. |
| Critical Risk | 61+ | Recommend urgent BLA 2026 Compliance Sprint before any buyer/audit submission. |

---

## 1-Page Gap Report Structure

Use `vantage/products/VANTAGE_1_Page_Gap_Report_Template.docx` to produce this structure:

1. Header
   - VANTAGE logo
   - Factory name
   - Scan date
   - Prepared by Keystone Consultancy trading as VANTAGE

2. Disclaimer block
   - This is a gap scan, not an audit.
   - VANTAGE provides compliance guidance and remediation support.
   - No audit outcome is guaranteed.

3. Risk score summary
   - Total score
   - Risk band
   - Number of Critical / High / Medium / Low gaps

4. Top 5 gaps found
   - Gap theme
   - Risk level
   - Evidence missing
   - Immediate remediation action

5. Top missing documents
   - Based on Question 25 and evidence review

6. Recommended next step
   - BLA 2026 Compliance Sprint, Retainer, or document clean-up follow-up

7. Contact block
   - Munim
   - Keystone Consultancy trading as VANTAGE
   - WhatsApp / email / website

---

## Required Disclaimer Text

Use this wording in the report and sales handoff:

> This Free Gap Scan is a preliminary compliance guidance and audit-preparation review. It is not a legal opinion, certification, official audit, or verification. Keystone Consultancy trading as VANTAGE provides remediation support and documentation readiness guidance only. Third-party audit outcomes are determined solely by the relevant audit body.

---

## File Naming Convention

Use this format:

| File type | Naming pattern |
|---|---|
| Completed scan form | `VANTAGE_GapScan_Form_[FactoryName]_[YYYYMMDD].docx` |
| 1-page gap report | `VANTAGE_1Page_GapReport_[FactoryName]_[YYYYMMDD].pdf` |
| Quotation | `VANTAGE_Quotation_[FactoryName]_[YYYYMMDD].pdf` |
| MSA | `VANTAGE_MSA_[FactoryName]_[YYYYMMDD].pdf` |
| Sprint Work Order | `VANTAGE_Sprint_WorkOrder_[FactoryName]_[YYYYMMDD].pdf` |
| Invoice | `VANTAGE_Invoice_[FactoryName]_[YYYYMMDD].pdf` |

Replace spaces in factory names with underscores for internal file storage.

---

## Manual Workflow for Munim

1. Send or print `VANTAGE_Free_Gap_Scan_Form.docx`.
2. Run the 25-question Free Gap Scan.
3. Mark each answer as Yes, No, or short-answer text.
4. Request evidence only for Critical and High-risk gaps.
5. Calculate risk score using `RISK_SCORING_MODEL.md`.
6. Draft the 1-page gap report using `VANTAGE_1_Page_Gap_Report_Template.docx`.
7. If risk band is High or Critical, recommend the BLA 2026 Compliance Sprint.
8. Send quotation using `VANTAGE_Quotation_Template-1.docx`.
9. After agreement, send `MSA_VANTAGE_v1.docx` and `Sprint_Work_Order_VANTAGE.docx`.
10. Issue `VANTAGE_Invoice_Template.docx` for the upfront payment.
11. Start Sprint only after agreement and initial payment are confirmed.

---

## Future Claude / Ruflo Automation Notes

Future automation should produce:

1. Digital Gap Scan intake form
2. Automatic risk score calculation
3. Auto-filled 1-page report draft
4. Auto-filled quotation
5. Auto-filled MSA and Sprint Work Order data fields
6. Auto-filled invoice
7. Follow-up reminder task for Munim
8. Compliance evidence checklist for the factory

Automation must not modify the source DOCX templates directly. It should generate client-specific copies.

---

## Done Criteria for Future Automation

The workflow is ready for automation when:

- All 25 questions have stable IDs.
- Risk scoring model is locked.
- Factory intake fields are standardized.
- DOCX templates contain consistent placeholders.
- Legal Risk Guard has reviewed all client-facing language.
- Output PDF naming is standardized.

---

## Next Build File

Create:

`vantage/products/gap-scan/GAP_SCAN_FORM_SCHEMA.md`

Purpose:

Define the exact data schema for the future digital Free Gap Scan form and report generator.
