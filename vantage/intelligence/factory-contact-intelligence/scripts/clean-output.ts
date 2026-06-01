#!/usr/bin/env tsx
/*
 * Clean output directory (preserves .gitkeep files).
 * Usage: npm run clean
 */
import fs from 'fs';
import path from 'path';
import { paths } from '../src/config.js';

const TARGET_EXTS = ['.csv', '.json'];

function cleanDir(dir: string): void {
  if (!fs.existsSync(dir)) return;
  for (const file of fs.readdirSync(dir)) {
    if (file === '.gitkeep') continue;
    const ext = path.extname(file);
    if (TARGET_EXTS.includes(ext)) {
      fs.rmSync(path.join(dir, file));
      console.log(`[clean] Removed: ${file}`);
    }
  }
}

console.log('=== VANTAGE — Clean output ===');
cleanDir(paths.dataOutput);
cleanDir(paths.dataEvidence);
console.log('Done.');
