import fs from 'fs';
import path from 'path';
import { paths } from '../config.js';
import type { FactoryLead, ContactEvidence } from '../types.js';

export function exportLeadsToJson(leads: FactoryLead[], filename = 'factory_leads.json'): void {
  fs.mkdirSync(paths.dataOutput, { recursive: true });
  fs.writeFileSync(
    path.join(paths.dataOutput, filename),
    JSON.stringify(leads, null, 2),
    'utf-8',
  );
  console.log(`[export] Written: ${filename} (${leads.length} leads)`);
}

export function exportSourceEvidenceJson(
  evidenceMap: Record<string, ContactEvidence[]>,
): void {
  fs.mkdirSync(paths.dataOutput, { recursive: true });
  fs.writeFileSync(
    path.join(paths.dataOutput, 'source_evidence.json'),
    JSON.stringify(evidenceMap, null, 2),
    'utf-8',
  );
  console.log(`[export] Written: source_evidence.json`);
}
