#!/usr/bin/env tsx
/*
 * Cross-check collected contacts against SearXNG for confidence verification.
 * Usage:
 *   npm run cross-check
 *
 * Reads data/output/factory_leads.json and re-scores contacts using
 * SearXNG cross-reference queries. Updates confidence scores in place.
 */
import fs from 'fs';
import path from 'path';
import { paths } from '../src/config.js';
import { crossCheckContactViaSearxng } from '../src/enrichers/searxngQueries.js';
import { deduplicateEvidence } from '../src/utils/sourceEvidence.js';
import { scoreAllContactsForFactory } from '../src/scoring/contactConfidenceScore.js';
import { computePriorityScore, recommendSalesAngle, generateLegalSafeNote } from '../src/scoring/factoryPriorityScore.js';
import { exportLeadsToJson } from '../src/exporters/exportJson.js';
import { exportLeadsToCsv, exportGoogleSheetsFormat } from '../src/exporters/exportCsv.js';
import type { FactoryLead } from '../src/types.js';

const leadsPath = path.join(paths.dataOutput, 'factory_leads.json');

if (!fs.existsSync(leadsPath)) {
  console.error(`No leads file found at: ${leadsPath}`);
  console.error('Run npm run crawl:seed first.');
  process.exit(1);
}

const leads: FactoryLead[] = JSON.parse(fs.readFileSync(leadsPath, 'utf-8')) as FactoryLead[];
console.log(`\n=== VANTAGE Cross-Check — ${leads.length} leads ===\n`);

async function crossCheckAll(): Promise<void> {
  for (const lead of leads) {
    console.log(`[cross-check] ${lead.factory_name}`);
    let newEvidence = [...lead.evidence];

    // Cross-check each email against SearXNG
    for (const email of lead.public_emails.slice(0, 3)) {
      const evidence = await crossCheckContactViaSearxng(lead.factory_name, email);
      newEvidence.push(...evidence);
    }

    // Cross-check each phone
    for (const phone of lead.public_phones.slice(0, 2)) {
      const evidence = await crossCheckContactViaSearxng(lead.factory_name, phone);
      newEvidence.push(...evidence);
    }

    newEvidence = deduplicateEvidence(newEvidence);
    lead.evidence = newEvidence;

    const scored = scoreAllContactsForFactory(
      lead.public_emails, lead.public_phones, lead.public_whatsapp_links,
      newEvidence, lead.website,
    );

    if (scored.length > 0) {
      const best = scored.reduce((a, b) => a.score > b.score ? a : b);
      lead.confidence_score = best.score;
      lead.confidence_tier = best.tier;
    }

    lead.source_count = new Set(newEvidence.map(e => {
      try { return new URL(e.source_url).hostname; } catch { return e.source_url; }
    })).size;
    lead.priority_score = computePriorityScore(lead);
    lead.recommended_sales_angle = recommendSalesAngle(lead);
    lead.legal_safe_note = generateLegalSafeNote(lead);
    lead.last_checked_at = new Date().toISOString();
  }

  exportLeadsToJson(leads);
  exportLeadsToCsv(leads);
  exportGoogleSheetsFormat(leads);
  console.log('\n=== Cross-check complete ===');
}

crossCheckAll()
  .then(() => process.exit(0))
  .catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  });
