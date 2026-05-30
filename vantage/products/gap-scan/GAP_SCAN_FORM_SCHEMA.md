# VANTAGE — Gap Scan Form Schema

**Status:** Committed v1.0  
**Owner:** Keystone Consultancy trading as VANTAGE  
**Product:** Free Gap Scan → BLA 2026 Compliance Sprint  
**Purpose:** Define the exact data fields needed for the future digital Free Gap Scan form, risk scoring engine, 1-page gap report generator, quotation workflow, MSA workflow, Sprint Work Order workflow, and invoice workflow.

---

## Source Files

| Source | Path |
|---|---|
| Question bank | `vantage/products/gap-scan/GAP_SCAN_QUESTION_BANK.md` |
| Scoring model | `vantage/products/gap-scan/RISK_SCORING_MODEL.md` |
| Assembly map | `vantage/products/gap-scan/GAP_SCAN_REPORT_ASSEMBLY_MAP.md` |
| Legal rules | `vantage-source-of-truth/LEGAL_POSITIONING_RULES.md` |
| Revenue streams | `vantage-source-of-truth/REVENUE_STREAMS.md` |

---

## Legal Positioning

This schema supports a preliminary compliance guidance and audit-preparation gap scan. It must not be used to represent VANTAGE as a certifier, legal adviser, official auditor, or verification body.

---

## Data Groups

The digital form should contain these data groups:

1. Factory profile
2. Contact profile
3. Audit urgency
4. Document availability
5. 25 gap-scan answers
6. Evidence notes
7. Risk scoring output
8. Sales recommendation
9. Follow-up workflow

---

## Factory Profile Fields

| Field ID | Field label | Type | Required | Use |
|---|---|---|---|---|
| `factory_name` | Factory name | Text | Yes | Report, quotation, MSA, work order, invoice |
| `factory_address` | Factory address | Textarea | Yes | Report, MSA, work order |
| `district_zone` | District / industrial zone | Select/Text | Yes | Lead segmentation |
| `worker_count_range` | Worker count range | Select | Yes | Risk context and offer fit |
| `main_products` | Main products | Text | No | Buyer/audit context |
| `main_buyers` | Main buyers | Text | No | Buyer-readiness context |
| `audit_frameworks` | Relevant audit frameworks | Multi-select | No | Audit-preparation mapping |

Suggested `worker_count_range` options:

- `<100`
- `100–500`
- `501–2,000`
- `2,001–5,000`
- `5,000+`

Suggested `audit_frameworks` options:

- BSCI
- WRAP
- SA8000
- Sedex / SMETA
- SLCP
- Better Work
- RSC
- Buyer internal audit
- Unknown

---

## Contact Profile Fields

| Field ID | Field label | Type | Required | Use |
|---|---|---|---|---|
| `contact_name` | Contact name | Text | Yes | Follow-up |
| `contact_role` | Contact role | Select/Text | Yes | Buyer qualification |
| `whatsapp_number` | WhatsApp number | Phone | Yes | Primary follow-up |
| `email` | Email | Email | No | Formal document sending |
| `decision_maker_present` | Is decision-maker involved? | Yes/No | No | Sales priority |

Suggested `contact_role` options:

- Managing Director
- Director
- Factory Manager
- HR Manager
- Compliance Manager
- Admin Manager
- Other

---

## Audit Urgency Fields

| Field ID | Field label | Type | Required | Use |
|---|---|---|---|---|
| `upcoming_audit` | Is there an upcoming audit? | Yes/No | Yes | Urgency trigger |
| `upcoming_audit_date` | Upcoming audit date | Date | Conditional | Sprint urgency |
| `recent_failed_audit` | Any recent failed audit or CAP? | Yes/No | Yes | Sprint urgency |
| `cap_deadline` | CAP deadline | Date | Conditional | Urgency and scope |
| `buyer_pressure` | Any buyer request/demand letter? | Yes/No | No | Sales urgency |

---

## Gap Scan Answer Schema

Each question answer must use this structure:

```json
{
  "question_id": "Q01",
  "answer": "yes | no | not_sure | not_applicable | short_text",
  "evidence_seen": true,
  "evidence_notes": "string",
  "risk_level": "Critical | High | Medium | Low",
  "risk_points": 0,
  "remediation_note": "string"
}
```

Question IDs must run from `Q01` to `Q25` and map directly to `GAP_SCAN_QUESTION_BANK.md`.

---

## Scoring Fields

| Field ID | Type | Description |
|---|---|---|
| `critical_count` | Number | Number of Critical-risk gaps |
| `high_count` | Number | Number of High-risk gaps |
| `medium_count` | Number | Number of Medium-risk gaps |
| `low_count` | Number | Number of Low-risk gaps |
| `total_risk_points` | Number | Total risk points from scoring model |
| `risk_band` | Select | Low Risk / Medium Risk / High Risk / Critical Risk |
| `sprint_triggered` | Boolean | Whether BLA 2026 Compliance Sprint should be recommended |
| `recommended_offer` | Select | No immediate offer / Document health check / BLA 2026 Compliance Sprint / Retainer follow-up |

---

## Output Fields for Report Generator

| Field ID | Description |
|---|---|
| `top_5_gaps` | Five highest-priority gaps by risk level and evidence gap |
| `missing_documents` | Top missing documents from Question 25 and evidence review |
| `immediate_actions` | Recommended remediation support actions |
| `client_facing_summary` | Plain-language summary for the factory |
| `internal_sales_note` | Munim-only sales note |
| `disclaimer_text` | Required legal positioning disclaimer |

---

## Required Disclaimer Text

Use this exact disclaimer in generated gap reports:

> This Free Gap Scan is a preliminary compliance guidance and audit-preparation review. It is not a legal opinion, certification, official audit, or verification. Keystone Consultancy trading as VANTAGE provides remediation support and documentation readiness guidance only. Third-party audit outcomes are determined solely by the relevant audit body.

---

## File Naming Outputs

| Output | Naming pattern |
|---|---|
| JSON scan record | `VANTAGE_GapScan_Record_[FactoryName]_[YYYYMMDD].json` |
| Completed form | `VANTAGE_GapScan_Form_[FactoryName]_[YYYYMMDD].docx` |
| 1-page report | `VANTAGE_1Page_GapReport_[FactoryName]_[YYYYMMDD].pdf` |
| Quotation | `VANTAGE_Quotation_[FactoryName]_[YYYYMMDD].pdf` |
| MSA | `VANTAGE_MSA_[FactoryName]_[YYYYMMDD].pdf` |
| Work Order | `VANTAGE_Sprint_WorkOrder_[FactoryName]_[YYYYMMDD].pdf` |
| Invoice | `VANTAGE_Invoice_[FactoryName]_[YYYYMMDD].pdf` |

---

## Future Storage Notes

At launch, this schema can be implemented with Google Sheets or a local JSON file. Later, use Supabase tables for:

- factories
- contacts
- gap_scan_sessions
- gap_scan_answers
- gap_scan_scores
- generated_documents
- follow_up_tasks

---

## Next Build File

Create:

`vantage/products/gap-scan/GAP_SCAN_DIGITAL_FORM_SPEC.md`

Purpose:

Turn this schema into a practical form/page specification for the future VANTAGE Control Tower website.
