# VANTAGE — Legal Positioning Rules

**Status:** Authoritative source of truth. These rules govern every document, agent output, website page, and verbal representation VANTAGE makes.

**Do not edit without legal review.**

---

## 1. What VANTAGE Is (and Is Not)

### VANTAGE IS:
- A compliance technology and advisory service
- A specialist in Bangladesh Labour Act (BLA 2006) and its amendments
- A provider of compliance guidance based on published regulations
- A service that helps factories prepare documentation for international labour audits
- A trading name of Keystone Consultancy

### VANTAGE IS NOT:
- A law firm
- A legal services provider under the Bangladesh Bar Council Act
- A government-approved body
- A certification authority
- A regulatory agency
- An audit body (BSCI, WRAP, SA8000, Sedex — these are third-party audit bodies; VANTAGE is not affiliated)

---

## 2. Scope of Services — Hard Boundaries

### VANTAGE CAN:
- Review factory policies and procedures against BLA 2006 and amendments
- Identify gaps between current factory practice and legal/audit requirements
- Produce a Gap Report and Corrective Action Plan (CAP)
- Draft or redraft factory HR policies, registers, notice templates, and employment contracts to be BLA-compliant
- Translate and explain regulatory requirements in Bangla and English
- Advise on audit checklist alignment (BSCI, WRAP, SA8000, Sedex/SMETA)
- Operate a Worker Voice grievance intake system
- Produce an Intelligence Brief summarizing regulatory changes
- Train factory HR staff on BLA requirements (informational, not legal training)

### VANTAGE CANNOT:
- Give legal advice or legal opinions
- Represent a factory in any legal proceeding, labour court, or government inspection
- Guarantee that a factory will pass any third-party audit
- Certify a factory as compliant
- File regulatory submissions on behalf of a factory
- Take on matters that require a licensed lawyer under Bangladesh law

---

## 3. Contractual Protections (required in all agreements)

All MSA and Sprint Scope of Work agreements must include:

### 3.1 Services Disclaimer (exact wording — do not alter)
> "Keystone Consultancy trading as VANTAGE provides compliance guidance and advisory services. VANTAGE is not a law firm and does not provide legal advice. Nothing in this agreement or any deliverable constitutes legal advice. Factories requiring legal advice should consult a licensed advocate."

### 3.2 Audit Outcome Disclaimer (exact wording — do not alter)
> "VANTAGE makes no representation, warranty, or guarantee regarding the outcome of any third-party audit. Audit results are determined solely by the relevant audit body and their assessors. VANTAGE's deliverables are intended to help factories improve their compliance posture; they do not guarantee a passing audit result."

### 3.3 Limitation of Liability (exact wording — do not alter)
> "In no event shall Keystone Consultancy's liability to the Client exceed the total fees paid by the Client for the specific service giving rise to the claim in the three (3) months immediately preceding the claim."

### 3.4 Data Handling
> "Keystone Consultancy will hold all factory documents, worker data, and audit records in strict confidence and will not share them with any third party without the Client's written consent, except as required by law."

---

## 4. Document Authority Hierarchy

When there is any conflict between documents, this hierarchy applies:

1. **MSA (Master Services Agreement)** — governs all terms between VANTAGE and the client
2. **Sprint Scope of Work** — defines deliverables, timeline, and price for a specific Sprint
3. **NDA** — governs confidentiality (signed before any gap scan begins)
4. **Service Proposal** — marketing document only; not binding unless incorporated into an MSA
5. **Gap Scan Report** — factual deliverable; subject to disclaimer in §3.1 and §3.2
6. **Intelligence Brief** — informational only; not legal advice; not binding

---

## 5. Required Documents Before Starting Any Paid Engagement

The following must be signed **before** any factory data is shared with VANTAGE and before any billable work begins:

| Document | Who signs | When |
|----------|-----------|------|
| NDA | Factory Director + Munim | Before gap scan visit or document review |
| MSA | Factory Director + Munim | Before Sprint begins |
| Sprint Scope of Work | Factory HR Manager + Munim | Before Sprint begins (attached to MSA) |
| Worker Voice Agreement | Factory Director + Munim | Before Worker Voice bot is deployed |

Payment terms: 50% upfront before Sprint start, 50% on delivery of final CAP.

---

## 6. Regulatory References — Approved Citation Format

All documents citing Bangladesh law must use this exact format:

| Regulation | Approved citation |
|------------|------------------|
| Core labour act | Bangladesh Labour Act 2006 (BLA 2006) |
| First amendment | Bangladesh Labour (Amendment) Act 2013 |
| Second amendment | Bangladesh Labour (Amendment) Act 2018 |
| EPZ workers | Bangladesh Export Processing Zones Authority Act 1980; BEPZA Workers Welfare Association and Industrial Relations Act 2004 |
| Building safety | Bangladesh National Building Code (BNBC) 2020 |
| BSCI standard | Business Social Compliance Initiative (BSCI) Audit Standard |
| WRAP standard | Worldwide Responsible Accredited Production (WRAP) Certification Program |
| SA8000 | SA8000:2014 Social Accountability Standard |
| Sedex/SMETA | Sedex Members Ethical Trade Audit (SMETA) — 4-Pillar |
| Higg FEM | Higg Facility Environment Module (FEM) |

Never abbreviate on first use in a document. After first full citation, abbreviation is permitted.

---

## 7. Data and Privacy Rules

- Worker grievance data (from Worker Voice bot) must never be shared with management without the worker's informed consent
- Worker data must be stored with access controls (Supabase row-level security or equivalent)
- Factory audit documents are client confidential — stored in a dedicated Google Drive folder per client, not in the shared repo
- No client factory names, audit scores, or gap reports to be published publicly without written consent
- Intelligence Brief may reference general trends (e.g., "40% of factories we scanned had incomplete fire drill records") without naming any factory

---

## 8. Intellectual Property

- All VANTAGE deliverables (Gap Reports, CAPs, policy templates, Intelligence Briefs) are produced by Keystone Consultancy
- Upon full payment, the factory receives a licence to use the deliverables for their own compliance purposes
- Keystone Consultancy retains ownership of all templates, tools, and methodologies
- Factories may not resell or redistribute VANTAGE deliverables
- The Bangla-RAG corpus, AI agent definitions, and VANTAGE Control Tower code are proprietary to Keystone Consultancy

---

## 9. Insurance and Professional Indemnity

- Before signing the first MSA, obtain Professional Indemnity (PI) insurance appropriate for compliance advisory services in Bangladesh
- Certificate of PI insurance to be kept on file and renewed annually
- PI policy minimum: BDT 50,00,000 (50 lakh) coverage per claim
- Status: **PENDING — obtain before first paid Sprint**

---

## 10. What AI Can and Cannot Generate Without Human Review

### AI-generated output that requires Munim's review before delivery to client:
- Gap Reports (factual accuracy check)
- Corrective Action Plans (completeness check)
- Policy drafts (legal accuracy check against BLA 2006)
- MSA or SoW customizations (legal accuracy)
- Any output that will be signed by the client

### AI-generated output that may be sent without individual review (with standard disclaimer):
- Intelligence Brief (informational, includes disclaimer)
- BLA 2026 Checklist (informational tool, not advice)
- WhatsApp broadcast messages (pre-approved templates only)
- Auto-reply messages in Worker Voice grievance intake

All AI-generated client-facing outputs must include the footer:
> *"Generated by VANTAGE AI-assisted tools and reviewed by a compliance specialist. This document is compliance guidance, not legal advice."*
