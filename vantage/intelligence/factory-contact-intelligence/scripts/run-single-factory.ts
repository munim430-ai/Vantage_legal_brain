#!/usr/bin/env tsx
/*
 * Run intelligence pipeline for a single factory.
 * Usage:
 *   FACTORY_ID=FAC-20260101-001 npm run crawl:factory
 *   — OR —
 *   tsx scripts/run-single-factory.ts FAC-20260101-001
 *
 * The factory must exist in data/input/seed_factories.csv.
 */
import fs from 'fs';
import { paths } from '../src/config.js';
import { parseSeedCsv } from '../src/utils/parseSeedCsv.js';
import { processSingleFactory } from '../src/index.js';
import { exportLeadsToCsv, exportGoogleSheetsFormat } from '../src/exporters/exportCsv.js';
import { exportLeadsToJson, exportSourceEvidenceJson } from '../src/exporters/exportJson.js';
import type { FactoryLead } from '../src/types.js';

const factoryId = process.argv[2] ?? process.env['FACTORY_ID'];

if (!factoryId) {
  console.error('Usage: tsx scripts/run-single-factory.ts FAC-YYYYMMDD-NNN');
  process.exit(1);
}

const seedPath = paths.seedFile;
if (!fs.existsSync(seedPath)) {
  console.error(`Seed file not found: ${seedPath}`);
  console.error('Copy data/input/seed_factories.example.csv → seed_factories.csv');
  process.exit(1);
}

const seeds = parseSeedCsv(seedPath);
const seed = seeds.find(s => s.factory_id === factoryId);

if (!seed) {
  console.error(`Factory not found in seed file: ${factoryId}`);
  console.error(`Available IDs: ${seeds.map(s => s.factory_id).join(', ')}`);
  process.exit(1);
}

console.log(`\n=== VANTAGE Factory Contact Intelligence — Single Factory Run ===`);
console.log(`Factory: ${seed.factory_name} (${seed.factory_id})\n`);

processSingleFactory(seed)
  .then((lead: FactoryLead | null) => {
    if (!lead) {
      console.log('No scoreable contacts found. Check the factory website and seed data.');
      process.exit(0);
    }
    const leads = [lead];
    exportLeadsToCsv(leads, `single_${factoryId}.csv`);
    exportLeadsToJson(leads, `single_${factoryId}.json`);
    exportGoogleSheetsFormat(leads);
    exportSourceEvidenceJson({ [lead.factory_id]: lead.evidence });
    console.log('\n=== Single factory run complete ===');
    console.log(`Confidence: ${lead.confidence_tier} (${lead.confidence_score})`);
    console.log(`Sales angle: ${lead.recommended_sales_angle}`);
    console.log(`Emails: ${lead.public_emails.join(', ') || 'none found'}`);
    console.log(`WhatsApp: ${lead.normalized_whatsapp_candidates.join(', ') || 'none found'}`);
    process.exit(0);
  })
  .catch((err: unknown) => {
    console.error('Error:', err);
    process.exit(1);
  });
