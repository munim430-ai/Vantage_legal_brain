# VANTAGE — Free Gap Scan Risk Scoring Model

**Status:** Committed v1.0  
**Owner:** Keystone Consultancy trading as VANTAGE  
**Input:** `vantage/products/gap-scan/GAP_SCAN_QUESTION_BANK.md`  
**Authority:** `vantage/docs/REGULATORY_SOURCE_MANIFEST.md`, `vantage-source-of-truth/LEGAL_POSITIONING_RULES.md`, `vantage-source-of-truth/REVENUE_STREAMS.md`  
**Purpose:** Convert 25 gap scan answers into a numeric risk score, risk band, client-facing language, and Sprint conversion trigger.

---

## Legal Positioning

This scoring model produces compliance guidance and audit preparation risk signals only. It does not constitute an audit, a certification, a legal opinion, or a verified compliance determination. No score produced by this model guarantees an audit outcome.

Approved uses: gap report preparation, corrective action plan input, audit preparation support, remediation support prioritisation.

Forbidden uses: certification claims, audit pass guarantee, legal advice delivery, verification body representation.

---

## 1. Scoring Logic Overview

| Concept | Rule |
|---------|------|
| Direction | Each "No" answer adds risk points to the factory's score |
| "Yes" answer | Adds 0 points |
| "No" answer | Adds the full risk weight for that question |
| Display to client | Two numbers: Risk Score (raw) and Compliance Score (0–100) |
| Risk bands | Applied to the raw Risk Score |
| Sprint trigger | Applied to the raw Risk Score and to specific question flags |

---

## 2. Weight Table by Risk Level

| Risk level | Points per "No" | Meaning |
|------------|----------------|---------|
| Critical | 8 | Likely to cause major nonconformity, zero-tolerance finding, or buyer suspension |
| High | 5 | Likely to be raised as a nonconformity requiring a CAP |
| Medium | 3 | Will be noted in an audit; may be escalated if combined with other gaps |
| Low | 1 | Procedural gap; unlikely to drive a CAP on its own |

---

## 3. Per-Question Weight Reference

| Q# | Theme | Risk level | Weight (points per "No") | BLA / source authority |
|----|-------|-----------|--------------------------|----------------------|
| 1 | Employment documentation | **Critical** | 8 | BLA 2006 §5; `BLA_2006_Consolidated_2018_english.md` |
| 2 | Child labour prevention | **Critical** | 8 | Child Labour Elimination Policy 2021; `Child Labour Elimination Policy 2021 onword .md` |
| 3 | Worker register | **High** | 5 | BLA 2006 §9; `bla 2006 English.md` |
| 4 | Attendance and wage linkage | **High** | 5 | Labour Rules 2015 Ch. XII; `Bangladesh Labour Rules 2015 — Chapter XII.md` |
| 5 | Working hours documentation | **High** | 5 | BLA 2006 §102; `BLA_2006_Consolidated_2018_english.md` |
| 6 | Overtime voluntary and approved | **High** | 5 | SMETA Best Practice; `SMETA_Best_Practice_Guidance.md` |
| 7 | Rest day compliance | **Medium** | 3 | BLA 2006 §103; `BLA_2006_Consolidated_2018_english.md` |
| 8 | Wage slips and payroll records | **High** | 5 | Labour Rules 2015 Ch. XII; `Bangladesh Labour Rules 2015 — Chapter XII.md` |
| 9 | Wage calculation (grade, overtime, deductions) | **Critical** | 8 | Minimum Wage 2023; `Revision-of-the-Minimum-Wage-of-RMG-Workers-in-2023.md` |
| 10 | Wage deduction documentation | **High** | 5 | BSCI System Manual; `amfori_BSCI_System_Manual.md` |
| 11 | Leave records (all types) | **High** | 5 | BLA 2006 §115; `BLA_2006_Consolidated_2018_english.md` |
| 12 | Maternity protection records | **Critical** | 8 | BLA 2006 §46; `Maternity protection.md` |
| 13 | Written grievance procedure | **Critical** | 8 | BLA 2006 §33; `SSTKEbook_GrievanceManagement.md` |
| 14 | Grievance closure and corrective action | **High** | 5 | SMETA root-cause examples; `Root-cause-analysis examples by semta .md` |
| 15 | Anti-harassment policy | **Critical** | 8 | Anti-harassment workplace guidance; `Anti-harassment workplace guidance.md` |
| 16 | Harassment complaint process | **Critical** | 8 | Sexual Harassment Prevention Guidelines; `Sexual Harassment Prevention Guidelines.md` |
| 17 | Participation committee documentation | **High** | 5 | Labour Rules 2015 Ch. XIII; `Participation Committee Rules (Labour Rules 2015 Ch. XIII) (1).md` |
| 18 | Participation committee meeting records | **Medium** | 3 | SMETA Best Practice; `SMETA_Best_Practice_Guidance.md` |
| 19 | Freedom of association policy | **High** | 5 | Trade Union registration procedures; `Trade Union registration procedures.md` |
| 20 | Labour compliance training records | **Medium** | 3 | DIFE Labour Inspection Manual; `DIFE Labour Inspection Manual.md` |
| 21 | Disciplinary actions documented | **High** | 5 | SMETA Best Practice; `SMETA_Best_Practice_Guidance.md` |
| 22 | Termination and separation records | **High** | 5 | BLA 2006; `bla 2006 English.md` |
| 23 | Provident fund or benefit records | **Medium** | 3 | ILO Provident Fund Guidance; `Provident fund guidance ILO.md` |
| 24 | Previous CAP items tracked to closure | **High** | 5 | Better Work CAP reports; `Sample CAP reports annual by better work .md` |
| 25 | Documents factory cannot produce within 24 hours | **Critical** | 0–8 (sliding — see §4) | DIFE Labour Inspection Manual; `DIFE Labour Inspection Manual.md` |

---

## 4. Question 25 — Short-Answer Scoring Rule

Question 25 asks: *"What are the top three compliance documents the factory cannot produce within 24 hours?"*

This is an open response. Score as follows:

| Factory response | Points |
|-----------------|--------|
| Names 0 documents — all documents accessible immediately | 0 |
| Names 1 document — one critical document not immediately available | 3 |
| Names 2 documents — two documents not immediately available | 5 |
| Names 3 documents — three or more documents not immediately available | 8 |

**Additional rule:** If any document named in Q25 is also a Critical-weight item from Q1–Q24, flag that question as a **double gap** in the gap report. A double gap is a Critical question answered "No" whose evidence cannot be produced even if Munim requests it on the day.

**Recording instruction for Munim:** Write the exact document names in the gap scan record. These become the opening items of the gap report and the first three rows of the corrective action plan.

---

## 5. Score Calculation

### Step 1 — Sum raw risk points

Add the points for every "No" answer (using the weight from §3 and the sliding rule for Q25).

```
Risk Score = Σ (weight × 1 if No, or weight × 0 if Yes)
```

### Step 2 — Apply compliance score (client-facing display)

The compliance score normalises the raw risk score to a 0–100 scale. A score of 100 means zero visible gaps across all 25 questions. A score of 0 means every question was answered "No" at maximum weight.

```
Maximum Possible Risk Score = 141
(8 Critical × 8) + (13 High × 5) + (4 Medium × 3) = 64 + 65 + 12 = 141

Compliance Score = 100 − round((Risk Score ÷ 141) × 100)
```

**Example:** A factory answers "No" to Q1, Q9, Q12, Q15, Q25 (3 documents named) and "No" to Q3, Q5, Q8, Q11.

- Critical Nos: Q1(8) + Q9(8) + Q12(8) + Q15(8) + Q25(8) = 40
- High Nos: Q3(5) + Q5(5) + Q8(5) + Q11(5) = 20
- Risk Score = 60
- Compliance Score = 100 − round((60 ÷ 141) × 100) = 100 − 43 = **57 / 100**
- Risk band = **High Risk** (36–60)

---

## 6. Risk Bands

### Band 1 — Low Risk (Risk Score 0–15)

**What it means:** The factory has documented most core requirements. Gaps are procedural rather than structural. Audit risk is present but not acute.

**Client-facing language:**
> "Based on the gap scan, your factory is in a relatively low visible compliance risk position. The gaps identified are procedural and can be addressed with targeted document improvement. VANTAGE recommends a structured gap report to confirm all records are complete and audit-ready before your next buyer review."

**Munim's internal instruction:**
Do not pitch the full Sprint as urgent. Instead, offer the gap report as a standalone document or the first month of the Retainer. Frame it as protecting a position they have already built. If the factory has an upcoming audit within 8 weeks, upgrade the urgency and offer the Sprint.

**Likely upsell:** Retainer or standalone gap report (BDT 15,000–20,000 one-off). Sprint only if audit is imminent.

---

### Band 2 — Medium Risk (Risk Score 16–35)

**What it means:** The factory has multiple High and Medium gaps. An audit would raise several nonconformities. A CAP would be issued. Buyer pressure is likely if not addressed.

**Client-facing language:**
> "The gap scan has identified a number of compliance gaps that are likely to be raised as nonconformities in a formal audit. Without a corrective action plan, these gaps create buyer relationship risk. VANTAGE recommends a structured gap report and corrective action plan to address the priority items before your next audit or buyer visit."

**Munim's internal instruction:**
This is a warm lead. Acknowledge the gaps calmly and specifically — name the two or three most prominent gaps from the scan. Explain that a gap report alone is not enough; remediation support is what closes the gap. Pitch the Sprint as the right package. Use the phrase "audit preparation support" not "fixing you up." Close: "The Sprint takes 5 working days and delivers the gap report, CAP, and up to five remediated documents. Want to start next week?"

**Likely upsell:** Full BLA 2026 Compliance Sprint (BDT 55,000). If factory hesitates on price, offer Document Factory for two or three specific gaps (BDT 3,000–5,000 each).

---

### Band 3 — High Risk (Risk Score 36–60)

**What it means:** The factory has multiple Critical and High gaps. A formal audit would likely produce a major nonconformity finding or a buyer-issued CAP. Buyer suspension is possible if not remediated promptly.

**Client-facing language:**
> "The gap scan has identified significant compliance gaps across multiple areas of BLA 2006 and international audit framework requirements. Based on these findings, your factory is at risk of a major nonconformity finding or buyer compliance action. VANTAGE recommends starting a BLA 2026 Compliance Sprint as soon as possible to prepare a gap report, corrective action plan, and remediation support package."

**Munim's internal instruction:**
This factory needs the Sprint. Do not dilute the pitch with alternatives. Acknowledge the seriousness directly but without alarm — the goal is to be the trusted partner who is going to fix this, not the messenger who scared them. Name the Critical gaps specifically (Q1, Q9, Q12, Q15, Q16 if answered "No"). Explain that the Sprint delivers the gap report, CAP, and up to five policy documents in 5 working days. Ask for the 50% upfront payment to lock in the start date. If the factory says it needs to consult internally, set a follow-up for 48 hours — not longer. After 48 hours the factory likely has an audit notice or buyer communication that resets their urgency.

**Likely upsell:** BLA 2026 Compliance Sprint (BDT 55,000) as the primary close. Pitch Worker Voice at the review call if Q13 and Q14 were both "No."

---

### Band 4 — Critical Risk (Risk Score 61+)

**What it means:** The factory has answered "No" to most Critical and High questions. An audit at any point in the near term would result in a major finding, suspension, or zero-tolerance escalation. Buyer relationships are directly at risk.

**Client-facing language:**
> "The gap scan has identified critical compliance gaps that represent an immediate risk to your factory's buyer relationships and audit standing. Based on these findings, VANTAGE strongly recommends starting a BLA 2026 Compliance Sprint within the next five working days. The Sprint will produce a full gap report, corrective action plan, and priority remediation support to reduce your exposure before any audit or buyer visit."

**Munim's internal instruction:**
This is a same-session close. Do not leave without a commitment. The factory is at genuine risk; treating this with urgency is appropriate and in the factory's interest. Name each Critical gap by question number and explain its audit consequence in one sentence each. Do not use fear language — use consequence language. Then move immediately to the Sprint offer: "The Sprint fixes this in 5 working days. I need 50% today to block your slot for Monday." If the factory cannot pay today, accept a written commitment and invoice within 24 hours. Do not agree to a longer delay — a factory at Critical Risk that waits two weeks is a factory that will receive an audit notice first. After the Sprint is sold, schedule the Worker Voice conversation for the review call.

**Likely upsell:** BLA 2026 Compliance Sprint (BDT 55,000) — immediate close. Retainer at the review call. Worker Voice if Q13, Q15, and Q16 were all "No."

---

## 7. Automatic Sprint Trigger Rules

These rules trigger a Sprint pitch regardless of the total risk score. Apply each rule independently after scoring.

| Trigger | Rule | Why |
|---------|------|-----|
| **Document black hole** | Q25 names 3 documents | A factory that cannot produce its core records within 24 hours cannot survive an unannounced audit or buyer document request. Immediate pitch. |
| **Welfare cluster** | Q12 AND Q13 AND Q15 all answered "No" | Maternity, grievance, and harassment gaps together create zero-tolerance risk under SMETA 4-Pillar and Sedex. A single buyer complaint triggers suspension. Immediate Sprint + Worker Voice upsell. |
| **Harassment cluster** | Q15 AND Q16 both answered "No" | No anti-harassment policy AND no complaint process. Under BLA 2006 §33 and most buyer codes this is a standalone major nonconformity. Immediate pitch. |
| **Wage evidence absent** | Q8 AND Q9 both answered "No" | No wage slips plus incorrect wage records is a double violation of BLA 2006 wage provisions and a frequent zero-tolerance trigger in BSCI and SMETA. Immediate pitch. |
| **Child labour exposure** | Q2 answered "No" | No age verification on file is a zero-tolerance finding in every major audit standard (BSCI, WRAP, SA8000, Sedex). Sprint is the minimum response; Munim should ask directly whether any worker on site may be under 18. |
| **Open CAP unmanaged** | Q24 answered "No" AND any Critical question answered "No" | The factory has previous audit findings it has not tracked, plus current Critical gaps. Any follow-up audit will escalate. Immediate Sprint framed as "CAP clean-up and reset." |
| **Critical score threshold** | Raw Risk Score ≥ 61 | Band 4 — same-session close as described in §6. |

---

## 8. Scoring Worksheet Template

Munim uses this during the session. Fill in after all 25 answers are recorded.

```
Factory name: ___________________________
Date: ___________________________
Conducted by: Munim / Keystone Consultancy trading as VANTAGE

Q#  | Risk   | Weight | Answer | Points scored
----|--------|--------|--------|---------------
1   | Crit   | 8      | Yes/No |
2   | Crit   | 8      | Yes/No |
3   | High   | 5      | Yes/No |
4   | High   | 5      | Yes/No |
5   | High   | 5      | Yes/No |
6   | High   | 5      | Yes/No |
7   | Med    | 3      | Yes/No |
8   | High   | 5      | Yes/No |
9   | Crit   | 8      | Yes/No |
10  | High   | 5      | Yes/No |
11  | High   | 5      | Yes/No |
12  | Crit   | 8      | Yes/No |
13  | Crit   | 8      | Yes/No |
14  | High   | 5      | Yes/No |
15  | Crit   | 8      | Yes/No |
16  | Crit   | 8      | Yes/No |
17  | High   | 5      | Yes/No |
18  | Med    | 3      | Yes/No |
19  | High   | 5      | Yes/No |
20  | Med    | 3      | Yes/No |
21  | High   | 5      | Yes/No |
22  | High   | 5      | Yes/No |
23  | Med    | 3      | Yes/No |
24  | High   | 5      | Yes/No |
25  | Crit   | 0–8    | [docs] |

TOTAL RISK SCORE: ___ / 141
COMPLIANCE SCORE: 100 − round((___ ÷ 141) × 100) = ___ / 100

RISK BAND: [ ] Low (0–15)  [ ] Medium (16–35)  [ ] High (36–60)  [ ] Critical (61+)

SPRINT TRIGGERS FIRED:
[ ] Document black hole (Q25 = 3 docs)
[ ] Welfare cluster (Q12 + Q13 + Q15 all No)
[ ] Harassment cluster (Q15 + Q16 both No)
[ ] Wage evidence absent (Q8 + Q9 both No)
[ ] Child labour exposure (Q2 = No)
[ ] Open CAP unmanaged (Q24 = No + any Critical = No)
[ ] Critical score threshold (≥ 61)

ACTION: [ ] Sprint pitch today  [ ] Follow-up in 48h  [ ] Retainer only
```

---

## 9. Score Display Rules

### What to show the factory (client-facing)

Show the **Compliance Score** (0–100). Higher = better. Do not show the raw risk score to the factory — the risk score is Munim's internal tool.

Recommended display on the 1-page gap report:

```
Your VANTAGE Compliance Score: [XX] / 100
Risk Level: [Low / Medium / High / Critical]
```

Followed by the top 3–5 gap items by weight, highest first.

### What Munim tracks internally

The raw Risk Score and each trigger flag. These feed the Sprint pitch and the corrective action plan priority order.

---

## 10. Legal Positioning Notes

- The Compliance Score and Risk Score are outputs of a structured gap scan session. They are compliance guidance based on the documents and answers provided during the session.
- The score does not constitute an audit result, an audit certification, or a verified compliance determination.
- Scores produced by this model must not be represented as the output of a third-party audit body (BSCI, WRAP, SA8000, Sedex, DIFE, or any other body).
- The gap scan session on which the score is based is a point-in-time assessment. Scores may change if additional documents are reviewed or if the factory updates its records.
- All scores and gap reports are subject to the disclaimer in the VANTAGE MSA and the services disclaimer in `vantage-source-of-truth/LEGAL_POSITIONING_RULES.md §3.1`.
- No score produced by this model guarantees an audit outcome. See `LEGAL_POSITIONING_RULES.md §3.2` for the exact audit outcome disclaimer wording.
- The AI output disclaimer must appear on any AI-assisted gap report: *"Generated by VANTAGE AI-assisted tools and reviewed by a compliance specialist. This document is compliance guidance, not legal advice."*

---

## 11. Source Authority Map

All scoring weights are derived from the following authority-level sources per `vantage/docs/REGULATORY_SOURCE_MANIFEST.md`:

| Questions | Primary source tier | Authority level |
|-----------|-------------------|----------------|
| Q1, Q5, Q7, Q11 | Tier 1 — Labour Law (`BLA_2006_Consolidated_2018_english.md`) | A |
| Q2 | Tier 1 — Labour Law (`Child Labour Elimination Policy 2021 onword .md`) | A |
| Q3, Q22 | Tier 1 — Labour Law (`bla 2006 English.md`) | A |
| Q4, Q8 | Tier 5 — Wages/Workers (`Bangladesh Labour Rules 2015 — Chapter XII.md`) | A |
| Q6, Q18, Q21 | Tier 4 — Audit Frameworks (`SMETA_Best_Practice_Guidance.md`) | B |
| Q9 | Tier 5 — Wages/Workers (`Revision-of-the-Minimum-Wage-of-RMG-Workers-in-2023.md`) | A |
| Q10 | Tier 4 — Audit Frameworks (`amfori_BSCI_System_Manual.md`) | B |
| Q12 | Tier 5 — Wages/Workers (`Maternity protection.md`) | A/C |
| Q13, Q14 | Tier 5 — Wages/Workers (`SSTKEbook_GrievanceManagement.md`) | C |
| Q15 | Tier 1 — Labour Law (`Anti-harassment workplace guidance.md`) | A |
| Q16 | Tier 1 — Labour Law (`Sexual Harassment Prevention Guidelines.md`) | A |
| Q17 | Tier 5 — Wages/Workers (`Participation Committee Rules (Labour Rules 2015 Ch. XIII) (1).md`) | A |
| Q19 | Tier 1 — Labour Law (`Trade Union registration procedures.md`) | A |
| Q20, Q25 | Tier 1 — Labour Law (`DIFE Labour Inspection Manual.md`) | A |
| Q23 | Tier 5 — Wages/Workers (`Provident fund guidance ILO.md`) | C |
| Q24 | Tier 9 — Audit Findings (`Sample CAP reports annual by better work .md`) | D |

---

## Next Build File

Create `vantage/products/gap-scan/GAP_REPORT_TEMPLATE_LOGIC.md` to define how the Risk Score, Q25 named documents, and trigger flags are converted into the structured output of the 1-page gap report (`VANTAGE_1_Page_Gap_Report_Template.docx`).
