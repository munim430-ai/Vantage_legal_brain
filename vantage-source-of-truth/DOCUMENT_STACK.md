# VANTAGE — Document Stack

**Status:** Authoritative inventory of every document VANTAGE uses, its purpose, format, and current readiness status.

All documents are owned by Keystone Consultancy. Templates live in `/vantage-source-of-truth/templates/` once committed. Client-specific copies live in Google Drive (per-client folder).

---

## 1. Legal / Commercial Documents (Pre-Engagement)

These must be signed before any billable work begins.

### 1.1 Non-Disclosure Agreement (NDA)

| Field | Value |
|-------|-------|
| Purpose | Protects factory's confidential data before gap scan or document review |
| Signed by | Factory Director + Munim (Keystone Consultancy) |
| When | Before any factory documents are shared with VANTAGE |
| Format | 2-page PDF + editable DOCX |
| Language | English primary; Bangla summary of key terms |
| Version | v1.0 — lawyer-reviewed |
| Status | **Template exists (DOCX uploaded) — needs commit to repo** |
| File name | `VANTAGE_NDA_[FactoryName]_[YYYYMMDD].pdf` |

Key clauses:
- 3-year confidentiality period
- Covers all factory documents, worker data, audit results, buyer relationships
- Mutual: factory also cannot disclose VANTAGE's methodologies or pricing to competitors
- Governing law: Bangladesh

### 1.2 Master Services Agreement (MSA)

| Field | Value |
|-------|-------|
| Purpose | Governs the entire commercial relationship between factory and VANTAGE |
| Signed by | Factory Director + Munim (Keystone Consultancy) |
| When | Before any Sprint or Retainer begins |
| Format | 6-page PDF + editable DOCX |
| Language | English |
| Version | v1.0 — lawyer-reviewed and approved |
| Status | **Template exists (DOCX uploaded) — needs commit to repo** |
| File name | `VANTAGE_MSA_[FactoryName]_[YYYYMMDD].pdf` |

Key clauses:
- Services disclaimer (VANTAGE is not a law firm)
- Audit outcome disclaimer (no guarantee of audit results)
- Limitation of liability (capped at 3-month fees)
- Payment terms (50/50 split)
- IP ownership (Keystone retains templates; client licences deliverables)
- Termination (30-day notice for Retainer; Sprint fees non-refundable after delivery)
- Governing law: Bangladesh
- Dispute resolution: mediation first, then Dhaka courts

### 1.3 Sprint Scope of Work (SoW)

| Field | Value |
|-------|-------|
| Purpose | Defines exact deliverables, timeline, and price for one Sprint engagement |
| Signed by | Factory HR Manager (or Director) + Munim |
| When | At same time as MSA or immediately after |
| Format | 2-page PDF + editable DOCX |
| Language | English |
| Version | v1.0 — base template ready |
| Status | **Template exists (DOCX uploaded) — needs commit to repo** |
| File name | `VANTAGE_Sprint_SoW_[FactoryName]_[YYYYMMDD].pdf` |

Fixed sections:
- Factory name, address, contact person
- Sprint start date, delivery date (target: 5 working days from start)
- Agreed deliverables (checklist from §Revenue Streams §1)
- Price (BDT 55,000 fixed)
- Payment schedule (BDT 27,500 before start / BDT 27,500 on delivery)
- Payment method
- Out-of-scope items list

### 1.4 Worker Voice Agreement

| Field | Value |
|-------|-------|
| Purpose | Governs the Worker Voice grievance bot deployment; establishes factory as data controller |
| Signed by | Factory Director + Munim |
| When | Before Worker Voice bot goes live |
| Format | 3-page PDF + editable DOCX |
| Language | English |
| Version | v1.0 — base template ready |
| Status | **Template exists (DOCX uploaded) — needs commit to repo** |
| File name | `VANTAGE_WorkerVoice_Agreement_[FactoryName]_[YYYYMMDD].pdf` |

Key clauses:
- Factory is data controller; Keystone Consultancy is data processor
- VANTAGE will not identify individual workers to management without consent
- VANTAGE may escalate to factory Director (not management) if imminent safety risk
- Factory agrees to display Worker Voice poster in Bangla in all work areas
- Monthly reporting format and schedule
- Monthly fee (BDT 15,000) and payment terms

---

## 2. Sales / Marketing Documents

These are sent to prospects before or during the sales conversation. They are NOT legally binding unless incorporated into an MSA.

### 2.1 Service Proposal

| Field | Value |
|-------|-------|
| Purpose | Introduces VANTAGE, outlines the Sprint offer, and provides pricing |
| Sent to | Factory Director or HR Manager (warm lead) |
| Format | 4-page PDF |
| Language | English (Bangla summary page optional) |
| Version | v1.0 — base template ready |
| Status | **Template exists (DOCX uploaded) — needs commit to repo** |
| File name | `VANTAGE_Proposal_[FactoryName]_[YYYYMMDD].pdf` |

Sections:
1. The Problem (BLA gaps cost factories buyer relationships)
2. The VANTAGE Approach (fast, affordable, bilingual)
3. What You Get (Sprint deliverables list)
4. Investment (BDT 55,000, payment terms)
5. Why VANTAGE (credentials, methodology)
6. Next Step (sign NDA → gap scan → Sprint)

### 2.2 Free Gap Scan Card

| Field | Value |
|-------|-------|
| Purpose | Physical or digital card offering the free gap scan — given during field visits or at BGMEA workshops |
| Format | A6 card (print-ready PDF, front and back) |
| Language | Bangla (front) / English (back) |
| Version | v1.0 — base template ready |
| Status | **Template exists (DOCX uploaded) — needs commit to repo** |

Front (Bangla):
> বিনামূল্যে বিএলএ গ্যাপ স্ক্যান — আজই বুক করুন
> আপনার কারখানা কি আসছে অডিটের জন্য প্রস্তুত? ৯০ মিনিটে জানুন।
> [WhatsApp number] | govantage.vercel.app

Back (English):
> Free BLA 2026 Gap Scan — 90 minutes. No cost. No commitment.
> VANTAGE identifies your audit risk before the auditor does.
> Contact: [WhatsApp / email]

### 2.3 BLA 2026 Quick Checklist

| Field | Value |
|-------|-------|
| Purpose | Free lead magnet sent via WhatsApp broadcast; shows expertise and creates urgency |
| Format | 2-page PDF |
| Language | Bangla primary; English reference column |
| Version | v1.0 |
| Status | **Needs creation — not yet drafted** |

Content:
- 20 most commonly failed BLA 2006 checklist items
- Three columns: Requirement | Evidence Needed | Audit Risk Level (Critical/High/Medium)
- Footer: "Full gap scan — free. Contact VANTAGE: [WhatsApp]"

---

## 3. Delivery Documents (Client-Facing Outputs)

Produced during and after the Sprint. Each is client-specific; templates live in the repo, completed versions in Google Drive.

### 3.1 Gap Report

| Field | Value |
|-------|-------|
| Purpose | Documents every BLA compliance gap found during the gap scan |
| Format | 8–15 pages PDF |
| Language | English (primary) + Bangla summary |
| Generated by | Bangla-RAG-Pipeline + AI Document Factory Agent + Munim review |
| Status | **Template needs creation** |

Sections:
- Factory profile (name, workers, audit history, upcoming audit date)
- Executive summary (Critical / High / Medium / Low gap count)
- Section-by-section BLA 2006 analysis
- Evidence status (Present / Missing / Incomplete)
- Audit risk rating per gap
- Appendix: evidence checklist

### 3.2 Corrective Action Plan (CAP)

| Field | Value |
|-------|-------|
| Purpose | Prioritized action list to close all gaps identified in the Gap Report |
| Format | 5–8 pages PDF |
| Language | English (primary) + Bangla action steps |
| Generated by | AI Document Factory Agent + Munim review |
| Status | **Template needs creation** |

Sections:
- Priority matrix (Critical gaps — fix within 7 days; High — 14 days; Medium — 30 days; Low — 90 days)
- Per-gap: action required | responsible person | evidence to produce | deadline
- 30-day implementation roadmap (Gantt-style table)

### 3.3 Policy Documents (Sprint deliverable — up to 5)

Standard BLA-compliant policy templates that VANTAGE customizes per factory:

| Document | BLA Section | Status |
|----------|-------------|--------|
| Appointment Letter template | BLA 2006 §5 | Needs creation |
| Service Register format | BLA 2006 §9 | Needs creation |
| Leave Register format | BLA 2006 §115 | Needs creation |
| Wage Register format | BLA 2006 §138 | Needs creation |
| Grievance Procedure policy | BLA 2006 §33 | Needs creation |
| Fire Safety and Evacuation policy | BNBC + BSCI | Needs creation |
| Maternity Benefit policy | BLA 2006 §46 | Needs creation |
| Child Labour Prevention policy | BLA 2006 §34 | Needs creation |
| Working Hours and Overtime policy | BLA 2006 §102 | Needs creation |
| Disciplinary Procedure | BLA 2006 §33 | Needs creation |

### 3.4 Intelligence Brief

| Field | Value |
|-------|-------|
| Purpose | Monthly regulatory intelligence report for subscribers |
| Format | 5–6 pages PDF |
| Language | English (full) + Bangla executive summary (1 page) |
| Cadence | 1st of each month |
| Generated by | AI Intelligence Agent + Munim review |
| Status | **Template needs creation** |

---

## 4. Operational Documents (Internal)

Used by Munim to run VANTAGE. Not sent to clients.

### 4.1 Client Onboarding Checklist
Steps from first contact → NDA → gap scan → MSA → Sprint start → delivery → review call → upsell.

### 4.2 Sprint Delivery Runbook
Step-by-step process for completing a Sprint in ≤ 20 hours of work.

### 4.3 WhatsApp Broadcast Templates (Bangla)
Pre-approved broadcast messages for initial outreach, follow-up, and checklist delivery.

### 4.4 LinkedIn Post Templates (English)
Weekly content calendar with 12 pre-drafted posts covering BLA 2026, audit tips, case notes.

### 4.5 Referral Agreement (1-page)
Simple agreement for audit firm and factory referral partners.

---

## 5. Document Status Summary

| Document | Template exists | Lawyer-reviewed | In repo | Needs creation |
|----------|----------------|----------------|---------|---------------|
| NDA | Yes (DOCX) | Yes | No | Commit to repo |
| MSA | Yes (DOCX) | Yes | No | Commit to repo |
| Sprint SoW | Yes (DOCX) | No (v1 ready) | No | Commit to repo |
| Worker Voice Agreement | Yes (DOCX) | No (v1 ready) | No | Commit to repo |
| Service Proposal | Yes (DOCX) | No (v1 ready) | No | Commit to repo |
| Free Gap Scan Card | Yes (DOCX) | No (v1 ready) | No | Commit to repo |
| BLA 2026 Quick Checklist | No | No | No | Create |
| Gap Report template | No | No | No | Create |
| CAP template | No | No | No | Create |
| 10 Policy templates | No | No | No | Create |
| Intelligence Brief template | No | No | No | Create |
| Client Onboarding Checklist | No | No | No | Create |
| Sprint Delivery Runbook | No | No | No | Create |
| WhatsApp Broadcast Templates | No | No | No | Create |
| LinkedIn Post Templates | No | No | No | Create |
| Referral Agreement | No | No | No | Create |
