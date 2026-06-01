import fs from 'fs';
import Papa from 'papaparse';
import type { SeedFactory } from '../types.js';

export function parseSeedCsv(filePath: string): SeedFactory[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const result = Papa.parse<SeedFactory>(content, {
    header: true,
    skipEmptyLines: true,
    transformHeader: h => h.trim(),
    transform: v => v.trim(),
  });

  if (result.errors.length > 0) {
    console.warn('[parseSeedCsv] Parse warnings:', result.errors.slice(0, 5));
  }

  return result.data.filter(row => row.factory_id && row.factory_name);
}
