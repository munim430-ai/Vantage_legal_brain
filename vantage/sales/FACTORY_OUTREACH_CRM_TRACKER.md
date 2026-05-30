# VANTAGE — Factory Outreach CRM Tracker

**Status:** Active — v1.0  
**Owner:** Keystone Consultancy trading as VANTAGE  
**For:** Munim — solo field use  
**Purpose:** Manual Google Sheets CRM system for contacting the first 500 Bangladesh RMG factories, tracking the Free Gap Scan pipeline, and converting results into BLA 2026 Compliance Sprint revenue.

**Workbook name:** `VANTAGE_Factory_Outreach_CRM`

---

## Legal Positioning (Applies to All CRM Activity)

- The Free Gap Scan is a compliance guidance and audit-preparation review. It is not an audit.
- VANTAGE does not provide legal advice. Never record "audit guarantee" or "pass/fail" in any cell.
- Use only approved terms in all CRM notes: **gap scan, compliance guidance, audit-preparation support, corrective action plan**.
- Forbidden terms: audit pass guarantee, certified compliant, legal advice, official audit, government approved.
- Internal columns (`internal_notes`, `trigger_flags`, `total_risk_points`) must never be shared with factory contacts.

---

## Section 1 — Workbook Setup

### Location

Store in Munim's Google Drive:

```
VANTAGE / Operations / Factory Outreach CRM / VANTAGE_Factory_Outreach_CRM
```

Do not share publicly. Do not move into a shared folder. Share only with Munim and any future VANTAGE team member with named editor access.

### Required Tabs

| Tab | Purpose |
|---|---|
| `factories` | Master list of all 500 factories — one row per factory |
| `contacts` | All contacts per factory — one row per person |
| `outreach_log` | Every outreach action sent — one row per touch |
| `gap_scan_pipeline` | Every factory that has started or completed a gap scan |
| `sprint_sales_pipeline` | Every factory in the Sprint commercial process |
| `follow_up_tasks` | Munim's daily task list — one row per pending action |

### Relationship Between Tabs

```
factories ──< contacts
factories ──< outreach_log
factories ──< gap_scan_pipeline ──< sprint_sales_pipeline
factories ──< follow_up_tasks
```

Each tab uses `factory_id` as the link key. All tabs that reference a factory must carry the `factory_id` column so Munim can filter across tabs without a formula join.

---

## Section 2 — Tab: `factories`

**Purpose:** Master record for every factory Munim has identified as a prospect, regardless of whether outreach has started.

### Column Headers

| Col | Field | Type | Required | Notes |
|---|---|---|---|---|
| A | `factory_id` | Text | Yes | Format: `FAC-YYYYMMDD-NNN` (e.g. `FAC-20260601-001`) |
| B | `factory_name` | Text | Yes | Exact registered name or trade name |
| C | `factory_address` | Text | Yes | Full address including district |
| D | `district_zone` | Text | Yes | Dhaka / Gazipur / Ashulia / Narayanganj / Chittagong / Other |
| E | `worker_count_range` | Text | Yes | Less than 100 / 100–500 / 501–2,000 / 2,001–5,000 / More than 5,000 |
| F | `main_products` | Text | No | Woven / Knitwear / Denim / Accessories / Mixed |
| G | `main_buyers` | Text | No | Comma-separated buyer names |
| H | `audit_frameworks` | Text | No | BSCI / WRAP / SA8000 / Sedex / Other — comma-separated |
| I | `tier` | Text | Yes | Tier 1 / Tier 2 / Tier 3 (see Section 8 batching plan) |
| J | `batch` | Text | Yes | Batch 1 / Batch 2 / Batch 3 / Batch 4 |
| K | `source` | Text | Yes | How discovered: BGMEA directory / Referral — audit firm / Referral — peer / BGMEA workshop / LinkedIn / Facebook / Inbound — website / Cold |
| L | `upcoming_audit_known` | Text | No | Yes / No / Unknown |
| M | `upcoming_audit_date` | Date | No | Approximate date if known |
| N | `audit_standard_known` | Text | No | BSCI / WRAP / SA8000 / Sedex / Unknown |
| O | `recent_cap_known` | Text | No | Yes / No / Unknown |
| P | `stage` | Text | Yes | New / Contacted / Replied / Gap Scan Sent / Gap Scan Done / Quoted / MSA Sent / Sprint Active / Delivered / Retainer / Closed Won / Closed Lost / 30-day Re-contact |
| Q | `stop_condition` | Text | No | None / Active investigation / Legal rep requested / Guarantee demanded / Cert requested / Other |
| R | `added_date` | Date | Yes | Date this factory was added to the list |
| S | `last_updated` | Date | Yes | Munim updates manually when stage changes |
| T | `internal_notes` | Text | No | Internal notes — never share |

### Status Values for `stage`

| Stage | Meaning |
|---|---|
| `New` | Added to list; no outreach sent yet |
| `Contacted` | First outreach sent (WhatsApp, phone, LinkedIn, Facebook) |
| `Replied` | Factory responded — any response |
| `Gap Scan Sent` | Factory sent link to `govantage.vercel.app/gap-scan` or form booked |
| `Gap Scan Done` | Gap scan completed; result received |
| `Quoted` | Quotation sent |
| `MSA Sent` | MSA and Sprint Work Order sent |
| `Sprint Active` | 50% payment received; Sprint in progress |
| `Delivered` | Sprint deliverables sent; awaiting balance payment |
| `Retainer` | Factory converted to Monthly Compliance Retainer |
| `Closed Won` | Sprint delivered and fully paid |
| `Closed Lost` | Factory declined; no further active pursuit |
| `30-day Re-contact` | Unresponsive; move to 30-day re-contact queue |

---

## Section 3 — Tab: `contacts`

**Purpose:** One row per contact person. A factory may have multiple contacts (MD, HR Manager, Compliance Manager). Link every contact to a `factory_id`.

### Column Headers

| Col | Field | Type | Required | Notes |
|---|---|---|---|---|
| A | `contact_id` | Text | Yes | Format: `CON-YYYYMMDD-NNN` |
| B | `factory_id` | Text | Yes | Links to `factories.factory_id` |
| C | `factory_name` | Text | Yes | Denormalised for quick reference |
| D | `contact_name` | Text | Yes | Full name |
| E | `contact_role` | Text | Yes | Managing Director / Director / Compliance Manager / HR Manager / Other |
| F | `whatsapp_number` | Text | Yes | Bangladesh format: `01XXXXXXXXX` |
| G | `email` | Text | No | For formal document delivery |
| H | `linkedin_url` | Text | No | Profile URL for LinkedIn outreach |
| I | `facebook_url` | Text | No | Profile or page URL |
| J | `decision_maker` | Text | Yes | Yes / No / Unknown |
| K | `language_preference` | Text | No | Bangla / English / Both |
| L | `whatsapp_link` | Formula | No | `=HYPERLINK("https://wa.me/"&SUBSTITUTE(F2,"+",""),"Open WhatsApp")` |
| M | `primary_contact` | Text | Yes | Yes / No — mark one contact per factory as primary |
| N | `added_date` | Date | Yes | |
| O | `notes` | Text | No | Relationship notes; never share |

---

## Section 4 — Tab: `outreach_log`

**Purpose:** Every outreach action Munim sends — one row per touch. This is the audit trail for the entire 500-factory campaign.

### Column Headers

| Col | Field | Type | Required | Notes |
|---|---|---|---|---|
| A | `outreach_id` | Text | Yes | Format: `OUT-YYYYMMDD-NNN` |
| B | `factory_id` | Text | Yes | Links to `factories` |
| C | `factory_name` | Text | Yes | Denormalised |
| D | `contact_id` | Text | Yes | Links to `contacts` |
| E | `contact_name` | Text | Yes | Denormalised |
| F | `outreach_date` | Date | Yes | Date the message/call was sent |
| G | `channel` | Text | Yes | WhatsApp / Phone / LinkedIn / Facebook / In-person / Email |
| H | `direction` | Text | Yes | Outbound / Inbound |
| I | `message_type` | Text | Yes | Cold opener / Follow-up (no reply) / Follow-up (interest) / Gap scan push / Post-scan acknowledgement / Quotation / MSA / Invoice / Payment follow-up / Other |
| J | `template_used` | Text | No | 3A / 3B / 3C / 7A / 7B / 8A / 8B / Template A / Template B / Template C / Template D / Template E / Custom |
| K | `message_summary` | Text | Yes | 1-sentence summary of what was sent or said |
| L | `reply_received` | Text | Yes | Yes / No / Call not answered |
| M | `reply_date` | Date | No | Date reply received |
| N | `reply_summary` | Text | No | 1-sentence summary of reply |
| O | `outcome` | Text | Yes | No reply / Interested / Not interested / Booked gap scan / Objection raised / Quotation requested / Declined / Stop condition triggered |
| P | `next_action` | Text | No | What Munim will do next |
| Q | `next_action_date` | Date | No | Target date for next action |
| R | `batch` | Text | Yes | Batch 1 / 2 / 3 / 4 |
| S | `notes` | Text | No | Internal — never share |

### Follow-Up Rules (Applied in `outreach_log`)

| Scenario | Rule |
|---|---|
| Cold message sent, no reply | Follow up after 48 hours — max 2 follow-ups before 30-day re-contact |
| Replied with interest | Follow up within 24 hours with gap scan push |
| Booked gap scan but not completed | Follow up the day before and day of the scan |
| Gap scan completed — High/Critical | Acknowledge within 2 hours; Sprint pitch same day |
| Gap scan completed — Medium | Acknowledge within 24 hours; quotation within 24 hours |
| Gap scan completed — Low | Acknowledge within 3 days; soft offer |
| Quotation sent, no response — 24h | Follow-up message same template as after interest |
| Quotation sent, no response — 72h | Second follow-up; introduce slot urgency |
| Quotation sent, no response — 7 days | Final follow-up; move to 30-day re-contact if no reply |
| Stop condition triggered | Record in `stop_condition`; do not pursue commercially |

---

## Section 5 — Tab: `gap_scan_pipeline`

**Purpose:** One row per factory that has started or completed a gap scan. Tracks score, risk band, and transition to the Sprint pipeline.

### Column Headers

| Col | Field | Type | Required | Notes |
|---|---|---|---|---|
| A | `pipeline_id` | Text | Yes | Format: `GSP-YYYYMMDD-NNN` |
| B | `factory_id` | Text | Yes | Links to `factories` |
| C | `factory_name` | Text | Yes | Denormalised |
| D | `contact_id` | Text | Yes | Primary contact for this scan |
| E | `contact_name` | Text | Yes | Denormalised |
| F | `scan_method` | Text | Yes | Online form / Munim-run virtual / Munim-run on-site |
| G | `scan_link_sent_date` | Date | No | Date `govantage.vercel.app/gap-scan` link was sent |
| H | `scan_started` | Text | Yes | Yes / No |
| I | `scan_completed` | Text | Yes | Yes / No |
| J | `scan_date` | Date | No | Date scan was completed |
| K | `compliance_score` | Number | No | 0–100 — client-facing score |
| L | `risk_band` | Text | No | Low Risk / Medium Risk / High Risk / Critical Risk |
| M | `critical_count` | Number | No | Count of Critical-risk "No" answers |
| N | `high_count` | Number | No | Count of High-risk "No" answers |
| O | `medium_count` | Number | No | Count of Medium-risk "No" answers |
| P | `sprint_triggered` | Text | No | Yes / No |
| Q | `top_gap_1` | Text | No | Theme of highest-risk gap |
| R | `top_gap_2` | Text | No | |
| S | `top_gap_3` | Text | No | |
| T | `q25_doc_1` | Text | No | First document factory cannot produce on demand |
| U | `q25_doc_2` | Text | No | |
| V | `q25_doc_3` | Text | No | |
| W | `total_risk_points` | Number | No | **Internal only — never share** |
| X | `trigger_flags` | Text | No | **Internal only — comma-separated trigger names** |
| Y | `recommended_offer` | Text | No | Document health check / BLA 2026 Compliance Sprint / Retainer |
| Z | `acknowledgement_sent` | Text | Yes | Yes / No |
| AA | `acknowledgement_date` | Date | No | |
| AB | `moved_to_sprint_pipeline` | Text | Yes | Yes / No |
| AC | `moved_date` | Date | No | Date record was moved to `sprint_sales_pipeline` |
| AD | `gap_scan_session_id` | Text | No | Links to `VANTAGE_GapScan_Leads` workbook if Sheets intake is live |
| AE | `notes` | Text | No | Internal — never share |

### Priority Rules for `gap_scan_pipeline`

| Risk Band + Condition | Follow-Up Priority | Recommended Action |
|---|---|---|
| Critical Risk — any condition | Same day | Call + WhatsApp Sprint pitch |
| High Risk — any condition | Same day | WhatsApp Template A + call |
| Medium Risk + recent failed audit | Same day | WhatsApp Template A |
| Medium Risk + upcoming audit | Within 24 hours | WhatsApp Template B + quotation |
| Medium Risk + Q25 missing docs | Within 24 hours | WhatsApp Template B |
| Medium Risk — no urgency signals | Within 5 days | WhatsApp Template B |
| Low Risk — audit within 8 weeks | Within 5 days | Soft offer |
| Low Risk — no urgency | 30-day re-contact | WhatsApp Template C |

---

## Section 6 — Tab: `sprint_sales_pipeline`

**Purpose:** Every factory in the BLA 2026 Compliance Sprint commercial process — from quotation to closed. One row per Sprint engagement.

### Column Headers

| Col | Field | Type | Required | Notes |
|---|---|---|---|---|
| A | `sprint_id` | Text | Yes | Format: `SPR-YYYYMMDD-NNN` |
| B | `factory_id` | Text | Yes | Links to `factories` |
| C | `factory_name` | Text | Yes | Denormalised |
| D | `contact_name` | Text | Yes | Decision-maker name |
| E | `whatsapp_number` | Text | Yes | Decision-maker WhatsApp |
| F | `risk_band` | Text | Yes | From gap scan result |
| G | `compliance_score` | Number | Yes | From gap scan result |
| H | `sprint_triggered` | Text | Yes | Yes / No |
| I | `pitch_date` | Date | Yes | Date Sprint was pitched verbally |
| J | `pitch_channel` | Text | Yes | Phone / WhatsApp / In-person |
| K | `quotation_sent` | Text | Yes | Yes / No |
| L | `quotation_date` | Date | No | |
| M | `quotation_amount` | Number | No | Always BDT 55,000 — confirm before entering |
| N | `msa_sent` | Text | Yes | Yes / No |
| O | `msa_sent_date` | Date | No | |
| P | `msa_signed` | Text | Yes | Yes / No |
| Q | `msa_signed_date` | Date | No | |
| R | `work_order_sent` | Text | Yes | Yes / No |
| S | `work_order_signed` | Text | Yes | Yes / No |
| T | `work_order_signed_date` | Date | No | |
| U | `payment_50pct_amount` | Number | No | BDT 27,500 |
| V | `payment_50pct_received` | Text | Yes | Yes / No |
| W | `payment_50pct_date` | Date | No | |
| X | `payment_50pct_method` | Text | No | bKash / Nagad / Bank transfer |
| Y | `sprint_start_date` | Date | No | Date Sprint work began |
| Z | `sprint_delivery_target` | Date | No | `sprint_start_date + 5 working days` |
| AA | `deliverables_sent` | Text | Yes | Yes / No |
| AB | `deliverables_sent_date` | Date | No | |
| AC | `payment_balance_amount` | Number | No | BDT 27,500 |
| AD | `payment_balance_received` | Text | Yes | Yes / No |
| AE | `payment_balance_date` | Date | No | |
| AF | `payment_balance_method` | Text | No | bKash / Nagad / Bank transfer |
| AG | `review_call_scheduled` | Text | No | Yes / No |
| AH | `review_call_date` | Date | No | |
| AI | `retainer_pitched` | Text | Yes | Yes / No |
| AJ | `retainer_outcome` | Text | No | Signed / Declined / Follow up later / No response |
| AK | `sprint_status` | Text | Yes | Pitched / Quotation Sent / MSA Signed / Deposit Paid / In Progress / Delivered / Closed Won / Closed Lost / Stalled |
| AL | `lost_reason` | Text | No | Price / Time / Existing consultant / Waiting for audit / No response / Other |
| AM | `total_revenue` | Formula | Yes | `=IF(AD2="Yes",AC2,0)+IF(V2="Yes",U2,0)` |
| AN | `notes` | Text | No | Internal — never share |

### Conversion Rules: Reply → Sprint Closed

```
New factory added
  ↓
[Outreach sent] → log in outreach_log
  ↓
Reply received
  ↓
Gap scan pushed → log scan_link_sent_date in gap_scan_pipeline
  ↓
Scan completed → score calculated → log result in gap_scan_pipeline
  ↓
[Medium/High/Critical] → acknowledge within window → move to sprint_sales_pipeline
  ↓
Sprint pitched (verbal) → log pitch_date
  ↓
Quotation sent → log quotation_date (target: same day High/Critical; 24h Medium)
  ↓
MSA + Work Order signed → log signed dates
  ↓
50% payment received → log payment_50pct_date → set sprint_start_date
  ↓
Deliverables sent (Gap Report + CAP + up to 5 documents) → log deliverables_sent_date
  ↓
Balance payment received → log payment_balance_date → sprint_status = Closed Won
  ↓
Retainer pitched at review call → log retainer_outcome
```

### Sprint Status Values

| Status | Meaning |
|---|---|
| `Pitched` | Sprint presented verbally; no quotation yet |
| `Quotation Sent` | Quotation sent; awaiting acceptance |
| `MSA Signed` | Both MSA and Work Order signed |
| `Deposit Paid` | 50% payment received; Sprint can start |
| `In Progress` | Sprint work underway |
| `Delivered` | All deliverables sent; awaiting balance |
| `Closed Won` | Balance paid; Sprint complete |
| `Closed Lost` | Factory declined |
| `Stalled` | No response after 3 follow-ups; review before archiving |

---

## Section 7 — Tab: `follow_up_tasks`

**Purpose:** Munim's prioritised daily action list. One row per pending task. Review and update every morning.

### Column Headers

| Col | Field | Type | Required | Notes |
|---|---|---|---|---|
| A | `task_id` | Text | Yes | Format: `TSK-YYYYMMDD-NNN` |
| B | `factory_id` | Text | Yes | Links to `factories` |
| C | `factory_name` | Text | Yes | Denormalised |
| D | `contact_name` | Text | Yes | |
| E | `whatsapp_number` | Text | Yes | |
| F | `whatsapp_link` | Formula | No | `=HYPERLINK("https://wa.me/"&SUBSTITUTE(E2,"+",""),"Open WhatsApp")` |
| G | `task_type` | Text | Yes | Cold follow-up / Gap scan push / Post-scan acknowledgement / Sprint pitch / Quotation follow-up / Payment follow-up / MSA follow-up / Review call / 30-day re-contact |
| H | `priority` | Text | Yes | Same day / Within 24 hours / Within 5 days / 30-day re-contact |
| I | `due_date` | Date | Yes | Date this task must be done |
| J | `stage` | Text | Yes | Pending / Done / Skipped — Stop condition |
| K | `risk_band` | Text | No | From gap scan (if applicable) |
| L | `compliance_score` | Number | No | From gap scan (if applicable) |
| M | `last_outreach_date` | Date | No | Date of last touchpoint |
| N | `last_outreach_outcome` | Text | No | Summary of last contact |
| O | `suggested_action` | Text | Yes | Specific action: "Send Template A WhatsApp", "Call MD", "Send quotation PDF", etc. |
| P | `outreach_count` | Number | Yes | Total touchpoints so far with this factory |
| Q | `created_date` | Date | Yes | When this task was created |
| R | `completed_date` | Date | No | When task was marked Done |
| S | `notes` | Text | No | Internal |

### Priority Values

| Priority | When to use |
|---|---|
| `Same day` | High/Critical scan result; open CAP deadline imminent; reply showing urgent need |
| `Within 24 hours` | Medium scan result with audit; first reply received to cold message |
| `Within 5 days` | Medium scan result with no urgency; follow-up after quotation sent |
| `30-day re-contact` | No reply after 2 follow-ups; Low Risk result; factory said not now |

---

## Section 8 — Dashboard Tab: `_metrics`

Add a `_metrics` tab (prefix underscore keeps it at the top of tab list). This is Munim's live campaign scoreboard.

### Required Formulas

All formulas reference the `factories`, `outreach_log`, `gap_scan_pipeline`, and `sprint_sales_pipeline` tabs. Replace column/sheet references with your actual sheet structure.

---

**Total factories in list:**
```
=COUNTA(factories!A2:A)
```

**Total contacted (outreach sent at least once):**
```
=COUNTIF(factories!P2:P,"<>New")
```

**Total replies received:**
```
=COUNTIF(factories!P2:P,"Replied")+COUNTIF(factories!P2:P,"Gap Scan Sent")+COUNTIF(factories!P2:P,"Gap Scan Done")+COUNTIF(factories!P2:P,"Quoted")+COUNTIF(factories!P2:P,"MSA Sent")+COUNTIF(factories!P2:P,"Sprint Active")+COUNTIF(factories!P2:P,"Delivered")+COUNTIF(factories!P2:P,"Closed Won")
```

**Reply rate (%):**
```
=IF(B4>0,B5/B4*100,0)
```
*(where B4 = Total contacted, B5 = Total replies — adjust cell references to your layout)*

**Gap scan form sent:**
```
=COUNTIF(gap_scan_pipeline!H2:H,"Yes")
```

**Gap scan completed:**
```
=COUNTIF(gap_scan_pipeline!I2:I,"Yes")
```

**Gap scan completion rate (% of sent):**
```
=IF(B7>0,B8/B7*100,0)
```

**Gap scans with High or Critical result:**
```
=COUNTIFS(gap_scan_pipeline!I2:I,"Yes",gap_scan_pipeline!L2:L,"High Risk")+COUNTIFS(gap_scan_pipeline!I2:I,"Yes",gap_scan_pipeline!L2:L,"Critical Risk")
```

**Sprint pitched:**
```
=COUNTA(sprint_sales_pipeline!I2:I)
```

**Sprint pitch rate (% of completed gap scans):**
```
=IF(B8>0,B10/B8*100,0)
```

**Quotations sent:**
```
=COUNTIF(sprint_sales_pipeline!K2:K,"Yes")
```

**Sprints signed (deposit paid):**
```
=COUNTIF(sprint_sales_pipeline!V2:V,"Yes")
```

**Close rate (% of pitches):**
```
=IF(B10>0,B12/B10*100,0)
```

**Revenue collected (BDT):**
```
=SUMIF(sprint_sales_pipeline!V2:V,"Yes",sprint_sales_pipeline!U2:U)+SUMIF(sprint_sales_pipeline!AD2:AD,"Yes",sprint_sales_pipeline!AC2:AC)
```

**Expected pipeline value (BDT — all quoted but not yet signed):**
```
=COUNTIFS(sprint_sales_pipeline!K2:K,"Yes",sprint_sales_pipeline!AK2:AK,"Quotation Sent")*55000
```

**Average compliance score (all completed scans):**
```
=AVERAGEIF(gap_scan_pipeline!I2:I,"Yes",gap_scan_pipeline!K2:K)
```

**Retainer conversion rate (% of Sprint Won):**
```
=IF(B12>0,COUNTIF(sprint_sales_pipeline!AJ2:AJ,"Signed")/B12*100,0)
```

---

### Scoreboard Layout (paste into `_metrics` tab, starting at A1)

| Row | Label | Formula cell |
|---|---|---|
| 1 | **VANTAGE Outreach Scoreboard** | — |
| 2 | — | — |
| 3 | Total factories in list | `=COUNTA(factories!A2:A)` |
| 4 | Total contacted | formula above |
| 5 | Total replies | formula above |
| 6 | Reply rate (%) | formula above |
| 7 | Gap scan form sent | formula above |
| 8 | Gap scan completed | formula above |
| 9 | Gap scan completion rate (%) | formula above |
| 10 | High/Critical results | formula above |
| 11 | Sprint pitched | formula above |
| 12 | Sprint pitch rate (%) | formula above |
| 13 | Quotations sent | formula above |
| 14 | Sprints signed | formula above |
| 15 | Close rate (%) | formula above |
| 16 | Revenue collected (BDT) | formula above |
| 17 | Pipeline value — quoted (BDT) | formula above |
| 18 | Avg compliance score | formula above |
| 19 | Retainer conversion rate (%) | formula above |

---

## Section 9 — 500-Factory Batching Plan

Run in four batches. Do not add Batch 2 until Batch 1 kill criteria are checked.

### Batch 1 — 50 Factories

**Purpose:** Test the opener, verify reply rate, validate the gap scan push script.

| Parameter | Value |
|---|---|
| Size | 50 factories |
| Tier mix | 30 Tier 1 + 20 Tier 2 |
| Timeline | Week 1–2 |
| Target reply rate | 20% (10 replies) |
| Target gap scan completions | 4–6 |
| Target Sprint proposals | 1–2 |

**After Batch 1 — Kill Criteria Check:**

> **If fewer than 5 factories from Batch 1 complete the gap scan → stop. Rewrite the WhatsApp opener and gap scan push script before starting Batch 2. Do not proceed to Batch 2 with the current scripts.**

Review:
- Was the reply rate below 15%? → Rewrite cold opener (Section 3 of outreach script)
- Did replies not convert to gap scan submissions? → Rewrite gap scan push message (Section 8)
- Did gap scans not convert to Sprint pitches? → Review acknowledgement scripts (Section 9)

---

### Batch 2 — 100 Factories

**Purpose:** Scale what worked in Batch 1. Introduce LinkedIn and Facebook channels.

| Parameter | Value |
|---|---|
| Size | 100 factories |
| Tier mix | 50 Tier 1 + 40 Tier 2 + 10 Tier 3 |
| Timeline | Week 3–5 |
| Target reply rate | 20–25% (20–25 replies) |
| Target gap scan completions | 12–18 |
| Target Sprint proposals | 4–6 |
| Target Sprint signed | 2–3 |

**After Batch 2 — Kill Criteria Check:**

> **If 20 completed gap scans produce zero Sprint closes → stop. Rewrite the Sprint close script before starting Batch 3. Do not continue pitching with the current conversion message.**

Review:
- Was objection "too expensive" common? → Add Document Factory intermediate offer
- Was objection "need to think" common? → Add specific deadline urgency to pitch
- Was risk band consistently Low? → Review factory tier selection; target higher-urgency factories

---

### Batch 3 — 150 Factories

**Purpose:** Full scale. Referral channel activated (audit firms, workshop attendees).

| Parameter | Value |
|---|---|
| Size | 150 factories |
| Tier mix | 70 Tier 1 + 60 Tier 2 + 20 Tier 3 |
| Timeline | Week 6–9 |
| Target reply rate | 25% |
| Target gap scan completions | 25–35 |
| Target Sprint proposals | 8–12 |
| Target Sprint signed | 3–5 |

**Note:** By this point Munim should have 2–5 active Sprint clients. Review workload capacity before committing to full Batch 3 — solo operator limit is approximately 3 active Sprints simultaneously.

---

### Batch 4 — 200 Factories

**Purpose:** Sustaining pipeline. Focus on referral and inbound leads. Convert to retainer from Batch 1–3 Sprint clients.

| Parameter | Value |
|---|---|
| Size | 200 factories |
| Tier mix | 80 Tier 1 + 80 Tier 2 + 40 Tier 3 |
| Timeline | Week 10–16 |
| Target reply rate | 25–30% |
| Target gap scan completions | 40–55 |
| Target Sprint signed | 5–8 |
| Target retainer conversions | 4–6 |

---

### Cumulative Targets (All 500 Factories)

| Metric | Target |
|---|---|
| Total contacted | 500 |
| Total replies | 100–125 (20–25%) |
| Gap scan completions | 80–110 |
| Sprint pitches | 30–45 |
| Sprint signed | 10–16 |
| Revenue from Sprints | BDT 5,50,000 – 8,80,000 |
| Retainer conversions | 6–10 |
| Monthly Retainer MRR | BDT 1,80,000 – 3,00,000 |

---

## Section 10 — Kill Criteria

### Kill Criteria 1 — Rewrite Opener

> **Trigger:** Batch 1 (first 100 factories contacted) produces fewer than 5 gap scan form completions.

**Action:**
1. Pause all outreach.
2. Review `outreach_log` — count factories at each stage: Contacted / Replied / Gap Scan Sent / Gap Scan Done.
3. Identify where the drop-off is:
   - Low reply rate (<15%)? → Rewrite cold opener (WhatsApp Template 3A/3B).
   - Replied but did not go to gap scan (<30% of replies)? → Rewrite gap scan push (Template 8A/8B).
   - Gap scan link sent but not completed (<40% completion)? → Simplify the form push message; offer to run the scan over phone.
4. Test new script on next 20 contacts before resuming at scale.

---

### Kill Criteria 2 — Rewrite Close Script

> **Trigger:** Any 20 completed gap scans produce zero Sprint closes.

**Action:**
1. Pause Sprint pitching.
2. Review all `sprint_sales_pipeline` rows with `sprint_status = Closed Lost` or `Stalled`.
3. Check `lost_reason` distribution:
   - Mostly "Price"? → Introduce phased Document Factory entry offer.
   - Mostly "Time / not now"? → Sharpen urgency framing with specific audit deadline dates.
   - Mostly "Existing consultant"? → Develop the "second opinion" positioning.
   - Mostly "Waiting for audit"? → Use consequence language from Playbook Part 9.
4. Update close script in `FIRST_500_FACTORY_OUTREACH_SCRIPT.md` before resuming.

---

## Section 11 — Daily Workflow for Munim

Run this sequence every working day. Estimated time: 2.5–3 hours total.

### Step 1 — Morning Review (20 minutes)

1. Open `_metrics` tab — note today's reply rate, gap scan completion rate, close rate.
2. Open `follow_up_tasks` — filter by `stage = Pending` and `due_date <= today`.
3. Sort by `priority`: Same day → Within 24 hours → Within 5 days.
4. Identify today's must-do tasks (Same day and overdue Within 24 hours).

---

### Step 2 — Respond to Overnight Messages (30 minutes)

5. Check WhatsApp — respond to all factory replies within 30 minutes of starting.
6. For each reply, update `outreach_log` with reply summary and outcome.
7. If reply shows interest → create a task in `follow_up_tasks`: push gap scan within 24 hours.
8. If reply is negative or unsubscribed → update `factories.stage` to `Closed Lost` or `30-day Re-contact`.

---

### Step 3 — Check Gap Scan Submissions (20 minutes)

9. Open `VANTAGE_GapScan_Leads` Google Sheet (the intake workbook from `GOOGLE_SHEETS_INTAKE_IMPLEMENTATION.md`).
10. Identify any new `gap_scan_sessions` rows since yesterday.
11. For each new session: add a row to `gap_scan_pipeline`; fill in score, risk band, top gaps.
12. If risk band is High or Critical → create a Same-day task in `follow_up_tasks`.
13. If risk band is Medium → create a Within-24-hours task.

---

### Step 4 — Active Outreach Block (90 minutes minimum)

14. Send 10 cold WhatsApp openers to new Batch factories.
    - Use Template 3A (Bangla) for most contacts.
    - Use Template 3B (English) for Compliance Manager or buyer-facing roles.
    - Log each in `outreach_log`.
15. Make 3–5 follow-up calls to factories that have not replied after 48 hours.
    - Log each call in `outreach_log` with outcome.
16. Push 3 warm leads to complete the gap scan online.
    - Use Template 8A or 8B.
    - Log in `outreach_log`.
17. Send any pending quotations, MSAs, or invoices.
    - Log document type and date in `sprint_sales_pipeline`.

---

### Step 5 — End-of-Day Update (20 minutes)

18. Update `factories.stage` for every factory touched today.
19. Update `factories.last_updated` date.
20. Mark completed tasks in `follow_up_tasks` as `Done` with `completed_date`.
21. Create new tasks for any factory requiring follow-up tomorrow or within 5 days.
22. Check `_metrics` — compare today's numbers to batch targets.
23. Note any stop conditions encountered. Resolve before the next working day.

---

### Weekly Targets per Batch

| Metric | Batch 1 | Batch 2 | Batch 3 | Batch 4 |
|---|---|---|---|---|
| Cold contacts sent/week | 25 | 50 | 75 | 100 |
| Replies expected/week | 5 | 10 | 15–20 | 20–30 |
| Gap scan completions/week | 2–3 | 4–6 | 6–9 | 8–12 |
| Sprint pitches/week | 1 | 2–3 | 3–4 | 4–6 |
| Sprint closes/month | 1 | 2–3 | 3–5 | 4–6 |

---

## Section 12 — Legal-Safe Wording Rules

Apply these rules to every cell, note, and message template in the CRM.

| Instead of this | Use this |
|---|---|
| "audit" (for gap scan) | "gap scan" or "compliance review" |
| "pass the audit" | "reduce visible compliance gaps before audit" |
| "fail the audit" | "receive a CAP or nonconformity finding" |
| "certified" / "certification" | "gap report delivered" / "corrective action plan completed" |
| "legal advice" | "compliance guidance" |
| "guarantee" | "structured preparation" |
| "100% compliant" | "compliance posture improved" |
| "audit-ready" | "audit-preparation ready" |
| "verified compliant" | "gap review completed" |
| "government approved" | — (never use) |
| "affiliated with BGMEA / BSCI / Sedex" | "independent compliance advisory service" |

**Required disclaimer for all written proposals and quotation notes:**

> This Free Gap Scan is a preliminary compliance guidance and audit-preparation review. It is not a legal opinion, certification, official audit, or verification. Keystone Consultancy trading as VANTAGE provides remediation support and documentation readiness guidance only. Third-party audit outcomes are determined solely by the relevant audit body.

---

## Section 13 — What Must Remain Manual

The following steps must be done by Munim personally. Do not automate these.

| Step | Why it must stay manual |
|---|---|
| Sending the gap scan quotation | Legal document — Munim must review before sending |
| Signing the MSA | Requires Munim's physical or digital signature |
| Sending the Sprint Work Order | Contractual — requires matching to specific scope |
| Delivering gap report and CAP | Factual accuracy check required before every send |
| Updating `internal_sales_note` | Confidential commercial intelligence — no automation |
| Confirming payment received | Financial — must be verified against actual transfer |
| Marking `sprint_status = Closed Won` | Revenue recognition — manual sign-off required |
| Triggering retainer pitch | Relationship-critical moment — do not automate |
| Handling any stop condition | Legal risk — requires immediate human judgement |
| Reviewing AI-generated policy drafts before sending | `LEGAL_POSITIONING_RULES.md §10` — AI output must be reviewed before client delivery |

---

## Section 14 — What Can Be Automated Later

The following can be automated after the manual workflow is running and stable.

| Step | Automation approach | When |
|---|---|---|
| Logging gap scan form submission into `gap_scan_pipeline` | Google Sheets API already writes to `VANTAGE_GapScan_Leads` — add a trigger to copy rows | After 10 manual submissions confirm the schema |
| Creating `follow_up_tasks` rows from new `gap_scan_pipeline` entries | Google Apps Script trigger on new row in `gap_scan_pipeline` | Month 2 |
| WhatsApp notification to Munim when a factory submits the online form | `POST /api/notify/munim` endpoint via WhatsApp Business API | Month 2 |
| Sending WhatsApp acknowledgement after gap scan completion | WhatsApp Business API with band-matched template | Month 3 — after templates are lawyer-approved |
| Generating `follow_up_tasks` from `outreach_log` reply outcomes | Google Apps Script on `outreach_log` update | Month 3 |
| Dashboard metrics refresh | Already auto-calculating via Google Sheets formulas — no build needed | Live at setup |
| 30-day re-contact reminders | Google Sheets conditional formatting + Apps Script | Month 2 |

---

## Section 15 — Data Safety Rules

| Rule | Detail |
|---|---|
| Do not share the workbook publicly | No public URL; no "anyone with link" access |
| Do not commit factory data to the repo | Names, addresses, scores, WhatsApp numbers — all stay in Google Sheets |
| Internal columns stay internal | `internal_notes`, `trigger_flags`, `total_risk_points`, `internal_sales_note` — never paste into a client message |
| Payment records stay in Sheets | Invoice amounts, payment dates, bKash references — never in the repo |
| Score data is for Munim only | Compliance score is client-facing; raw risk points are internal |
| No factory names in Intelligence Brief without consent | Aggregate trends only — see `LEGAL_POSITIONING_RULES.md §7` |

---

*Source files: `FREE_GAP_SCAN_TO_SPRINT_PLAYBOOK.md`, `GOOGLE_SHEETS_INTAKE_IMPLEMENTATION.md`, `GAP_SCAN_DATA_STORAGE_PLAN.md`, `REVENUE_STREAMS.md`, `LEGAL_POSITIONING_RULES.md`*
