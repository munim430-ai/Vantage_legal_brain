#!/usr/bin/env tsx
/*
 * Run the full seed pipeline:
 *   npm run crawl:seed
 *
 * Reads data/input/seed_factories.csv and processes all factories.
 * Outputs to data/output/.
 */
import { runSeedPipeline } from '../src/index.js';

console.log('=== VANTAGE Factory Contact Intelligence — Seed Crawl ===\n');

runSeedPipeline()
  .then(() => {
    console.log('\n=== Seed crawl complete ===');
    process.exit(0);
  })
  .catch((err: unknown) => {
    console.error('Pipeline error:', err);
    process.exit(1);
  });
