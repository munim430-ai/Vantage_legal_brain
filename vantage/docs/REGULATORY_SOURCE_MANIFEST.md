# VANTAGE — Regulatory Source Manifest

**Status:** Committed v1.0  
**Owner:** Keystone Consultancy trading as VANTAGE  
**Purpose:** Index the 9-tier Markdown legal/compliance source library used by the VANTAGE compliance intelligence workflow.

---

## Source Library Rules

- Use this manifest before building gap-scan logic, RAG, reports, CAPs, or buyer-facing summaries.
- Do not treat every source as equal authority.
- Prioritize law, rules, official manuals, and audit-framework documents over blogs, examples, or market intelligence.
- Every client-facing claim must cite the specific source file and section where possible.
- VANTAGE provides compliance guidance and audit-preparation support only. It does not certify factories or guarantee audit outcomes.

---

## Authority Levels

| Level | Meaning | Use |
|---|---|---|
| A | Statute, rule, gazette, official government/manual source | Can support core compliance gap logic |
| B | Recognized audit framework or buyer standard | Can support audit-preparation mapping |
| C | Institutional report, ILO/IFC/Better Work guidance, ESG guidance | Can support context and recommendations |
| D | Examples, CAP samples, incident reports, market intelligence | Use as examples only, not primary authority |
| Parked | Unrelated or low-confidence source | Do not use unless manually approved |

---

## Tier Directory Map

| Tier | Directory | Authority default | Use priority |
|---|---|---|---|
| Tier 1 — Labour Law | `vantage/docs/regulations/labour-law/` | A | First |
| Tier 2 — Safety / Fire | `vantage/docs/regulations/safety-fire/` | A/B | Second |
| Tier 3 — Bond / NBR / Export | `vantage/docs/regulations/bond-nbr-export/` | A/B | Later revenue stream |
| Tier 4 — Audit Frameworks | `vantage/docs/audit-standards/` | B/C | Second |
| Tier 5 — Wages / Workers | `vantage/docs/regulations/wages-workers/` | A/C | First |
| Tier 6 — Buyer Standards | `vantage/docs/buyer-requirements/` | B | Third |
| Tier 7 — ESG / Due Diligence | `vantage/docs/esg-due-diligence/` | C | Third |
| Tier 8 — Enforcement Intelligence | `vantage/docs/intelligence/enforcement/` | D | Context only |
| Tier 9 — Audit Findings | `vantage/docs/audit-findings/` | D | Training/examples only |

---

## Tier 1 — Labour Law

**Path:** `vantage/docs/regulations/labour-law/`  
**Use:** Primary legal/compliance base for BLA Sprint, gap scan, CAP inputs.

Files:

- `Anti-harassment workplace guidance.md`
- `BLA_2006_Consolidated_2018_english.md`
- `BLA_Amendment_2026_Brief.md`
- `Child Labour Elimination Policy 2021 onword .md`
- `DIFE Labour Inspection Manual.md`
- `ILO_NAP_2021_2026.md`
- `Preventing and Responding to Sexual Harassment at Work.md`
- `Sexual Harassment Prevention Guidelines.md`
- `Trade Union registration procedures.md`
- `bla 2006 English.md`

---

## Tier 2 — Safety / Fire

**Path:** `vantage/docs/regulations/safety-fire/`  
**Use:** Fire, building, RSC, structural, boiler, and safety compliance support.

Files:

- `BNBC_2020.md`
- `Boiler Inspection Rules.md`
- `Chemical storage handling guidance.md`
- `DIFE Factory Safety Guidelines.md`
- `Fire service assessment report Gardiana Garments .md`
- `RSC CAP escalation guidance.md`
- `RSC Quarterly Progress Reports 1.md`
- `RSC Quarterly Progress Reports 2.md`
- `RSC Quarterly Progress Reports aggregated .md`
- `RSC_Programme_Standards.md`
- `Structural integrity assessment examples.md`
- `Structural integrity guidelines.md`

---

## Tier 3 — Bond / NBR / Export

**Path:** `vantage/docs/regulations/bond-nbr-export/`  
**Use:** Bond License Protector, export documentation, customs, VAT, and foreign exchange guidance.

Files:

- `ASYCUDA operational notices and guidelines .md`
- `Bond Commission procedure.md`
- `EPB export compliance notices.md`
- `Export documentation procedures.md`
- `Export_Policy_Order_2024.md`
- `HS code classification guidance.md`
- `Standard Operating Procedures __For__Import_Export and Customs Clearance.md`
- `Strategic Enforcement Guidelines.md`
- `VAT & Supplementary Duty Act, 2012.md`
- `guideline for forex transection.md`

---

## Tier 4 — Audit Frameworks

**Path:** `vantage/docs/audit-standards/`  
**Use:** Map factory gaps to audit expectations and buyer-facing remediation structure.

Files:

- `Buyer audit methodology notes WEATA.md`
- `Buyer audit methodology notes.md`
- `Compliance-Audit-Checklist-in-Apparel-Industry.md`
- `Higg FEM Verification Protocol .md`
- `Higg FEM overview.md`
- `Higg FSLM overview.md`
- `Progress-Brief_revised by better work .md`
- `Regulatory Alignment Guidance.md`
- `Root-cause-analysis examples SEMTA AUDIT REPORT.md`
- `Root-cause-analysis examples by semta .md`
- `SMETA_Best_Practice_Guidance.md`
- `Sample CAP reports annual by better work .md`
- `The-Impact-of-Better-Work-Bangladesh_2014-2024.md`
- `The-Ultimate-SaaS-Security-Audit-VAPT-Checklist1.md` — parked unless manually approved for VANTAGE security work
- `WRAP principles.md`
- `WRAP-Facilities-Handbook.md`
- `ZDHC supplier guidelines.md`
- `amfori_BSCI_System_Manual.md`

---

## Tier 5 — Wages / Workers

**Path:** `vantage/docs/regulations/wages-workers/`  
**Use:** Wage, worker welfare, participation committee, grievance, maternity, and industrial relations logic.

Files:

- `175029-05-2016Md. Aminul Islam.pdf` — raw PDF; do not use for RAG until converted or reviewed
- `BIPO-TIMES-Aug-2025.md`
- `Bangladesh Labour Rules 2015 — Chapter XII (Wages) + Chapter XV (PF).md`
- `Maternity protection.md`
- `Participation Committee Rules (Labour Rules 2015 Ch. XIII) (1).md`
- `Provident fund guidance ILO.md`
- `Revision-of-the-Minimum-Wage-of-RMG-Workers-in-2023.md`
- `SSTKEbook_GrievanceManagement.md`
- `STATE OF BANGLADESH’S RMGSECTOR TRIPARTISM AND __THE SCOPE OF HARMONIOUS INDUSTRIAL AND LABOUR RELATIONS.md`

---

## Tier 6 — Buyer Standards

**Path:** `vantage/docs/buyer-requirements/`  
**Use:** Buyer-specific standard mapping and audit-preparation context.

Files:

- `EU Corporate Sustainability Due Diligence Directive.md`
- `H&M Group Sustainability Commitment.md`
- `InditexConductCode.md`
- `M&S Global Sourcing Principles.md`
- `PVH Responsible Sourcing Manual.md`
- `SLCP Converged Assessment Framework slconvergence.org → CAF Document Library.md`
- `Target_Business-Partner-Code-of-Conduct.md`
- `_MConverter.eu_H&M Supplier Code of Conduct 2.md`
- `_MConverter.eu_H&M Supplier Code of Conduct.md`
- `_MConverter.eu_Next ethical sourcing standards.md`
- `_MConverter.eu_Primark Code of Conduct.md`
- `inditex_code_of_conduct_for_manufacturers_and_suppliers.md`

---

## Tier 7 — ESG / Due Diligence

**Path:** `vantage/docs/esg-due-diligence/`  
**Use:** International ESG, forced-labour, and due-diligence context.

Files:

- `DIHR_The EU Corporate Sustainability Due Diligence Directive_0.md`
- `German Supply Chain Act.md`
- `IFC Performance Standards 2.md`
- `ILO Core Conventions.md`
- `UN Guiding Principles on Business & Human Rights.md`
- `uflpa-ctpat-enforcment.md`

---

## Tier 8 — Enforcement Intelligence

**Path:** `vantage/docs/intelligence/enforcement/`  
**Use:** Incident context, enforcement examples, and risk signals. Do not use as primary legal authority.

Files:

- `Boiler explosion reports.md`
- `Compliance scandal reports.md`
- `DIFE ERGONOMICS GUIDELINES.md`
- `RSC escalation reports.md`
- `Wage protest reports.md`
- `dife inspection notices pdf 1.md`
- `industrial fire and prevention.md`

---

## Tier 9 — Audit Findings

**Path:** `vantage/docs/audit-findings/`  
**Use:** Training examples, CAP examples, nonconformity patterns, and report-writing references.

Files:

- `AUDIT FINDING AMFORI BSCI.md`
- `AUDIT FUNDING TOSRIFA.md`
- `Audit closure evidence.md`
- `Audit criteria.md`
- `Audit findings examples Internal.md`
- `Better-Work-Global-Compliance-Assessment-Tool (1).md`
- `Major nonconformity examples.md`
- `Remediation examples.md`
- `Zero tolerance examples sedex .md`
- `Zero tolerance examples.md`
- `learning-handbook-five-whys.md`

---

## First RAG Build Scope

Do not index all tiers at once.

First corpus:

1. Tier 1 — Labour Law
2. Tier 5 — Wages / Workers
3. Tier 4 — Audit Frameworks, only BSCI / SMETA / WRAP / Better Work files

Purpose:

**Free Gap Scan → BLA 2026 Compliance Sprint → Gap Report → CAP.**

---

## Exclusion / Manual Review Notes

- `The-Ultimate-SaaS-Security-Audit-VAPT-Checklist1.md` is not RMG factory compliance material. Park unless needed for VANTAGE software security.
- `175029-05-2016Md. Aminul Islam.pdf` is raw PDF. Do not use until converted or manually reviewed.
- Incident reports and audit examples are examples only, not primary legal authority.

---

## Next Required Build File

Create:

`vantage/products/gap-scan/GAP_SCAN_QUESTION_BANK.md`

It should use only Tier 1, Tier 5, and selected Tier 4 sources first.
