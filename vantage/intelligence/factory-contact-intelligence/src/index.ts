/*
 * VANTAGE Factory Contact Intelligence
 * Entry point — orchestrates the full pipeline for one or many factories.
 *
 * Usage:
 *   npm run crawl:seed       — run all seed factories
 *   npm run crawl:factory    — run a single factory (set FACTORY_ID env var)
 *   npm run cross-check      — cross-check collected contacts via SearXNG
 *   npm run export           — export all output files
 */

import fs from 'fs';
import { paths } from './config.js';
import { parseSeedCsv } from './utils/parseSeedCsv.js';
import { rateLimitedCrawlFactory } from './crawlers/crawlFactoryWebsite.js';
import { crawlAllDirectoriesForFactory } from './crawlers/crawlDirectorySource.js';
import { discoverySearchViaSearxng } from './enrichers/searxngQueries.js';
import { runHarvesterForDomain, extractDomainFromWebsite } from './enrichers/harvesterRunner.js';
import { deduplicateEvidence } from './utils/sourceEvidence.js';
import { scoreAllContactsForFactory } from './scoring/contactConfidenceScore.js';
import { computePriorityScore, recommendSalesAngle, generateLegalSafeNote } from './scoring/factoryPriorityScore.js';
import { normalizeWhatsAppCandidates } from './extractors/extractWhatsAppLinks.js';
import { groupSocialLinks } from './extractors/extractSocialLinks.js';
import { exportLeadsToCsv, exportRejectedContactsCsv, exportGoogleSheetsFormat } from './exporters/exportCsv.js';
import { exportLeadsToJson, exportSourceEvidenceJson } from './exporters/exportJson.js';
import type { FactoryLead, ContactEvidence, SeedFactory } from './types.js';

export async function processSingleFactory(seed: SeedFactory): Promise<FactoryLead | null> {
  console.log(`\n[pipeline] Processing: ${seed.factory_name} (${seed.factory_id})`);

  let allEvidence: ContactEvidence[] = [];

  // 1. Crawl official website
  if (seed.website) {
    const webResult = await rateLimitedCrawlFactory(seed.factory_id, seed.factory_name, seed.website);
    allEvidence.push(...webResult.evidence);
  }

  // 2. Crawl public directories
  const dirResults = await crawlAllDirectoriesForFactory(seed.factory_name);
  for (const dr of dirResults) allEvidence.push(...dr.evidence);

  // 3. SearXNG discovery
  const domain = seed.website ? extractDomainFromWebsite(seed.website) : undefined;
  const searxEvidence = await discoverySearchViaSearxng(seed.factory_name, domain ?? undefined);
  allEvidence.push(...searxEvidence);

  // 4. theHarvester (domain only, if available)
  if (domain) {
    const harvesterEvidence = await runHarvesterForDomain(domain, seed.factory_name);
    allEvidence.push(...harvesterEvidence);
  }

  // Deduplicate all evidence
  allEvidence = deduplicateEvidence(allEvidence);

  // Extract typed contacts
  const emails = [...new Set(allEvidence.filter(e => e.type === 'email').map(e => e.value))];
  const phones = [...new Set(allEvidence.filter(e => e.type === 'phone').map(e => e.value))];
  const waLinks = [...new Set(allEvidence.filter(e => e.type === 'whatsapp').map(e => e.value))];

  // Score contacts
  const scored = scoreAllContactsForFactory(emails, phones, waLinks, allEvidence, seed.website);
  if (scored.length === 0) {
    console.log(`[pipeline] No scoreable contacts for ${seed.factory_name} — skipping`);
    return null;
  }

  const bestScore = Math.max(...scored.map(s => s.score));
  const bestTier = scored.find(s => s.score === bestScore)?.tier ?? 'Low';

  const buyerSignals = allEvidence
    .filter(e => e.type === 'buyer_signal')
    .map(e => e.value);
  const complianceSignals = allEvidence
    .filter(e => e.type === 'compliance_signal')
    .map(e => e.value);

  const lead: FactoryLead = {
    factory_id: seed.factory_id,
    factory_name: seed.factory_name,
    group_name: seed.group_name,
    website: seed.website,
    address: seed.address,
    district: seed.district,
    industrial_zone: seed.industrial_zone,
    source_seed: seed.source_seed,
    source_urls: [...new Set(allEvidence.map(e => e.source_url))],
    public_emails: emails,
    public_phones: phones,
    public_whatsapp_links: waLinks,
    normalized_whatsapp_candidates: normalizeWhatsAppCandidates(allEvidence.filter(e => e.type === 'whatsapp')),
    social_links: groupSocialLinks(allEvidence.filter(e => e.type === 'social')),
    buyer_signals: [...new Set(buyerSignals)],
    compliance_signals: [...new Set(complianceSignals)],
    rsc_signal: complianceSignals.some(s => /RSC/i.test(s)),
    bgmea_signal: Boolean(seed.bgmea_id) || complianceSignals.some(s => /BGMEA/i.test(s)),
    bkmea_signal: Boolean(seed.bkmea_id) || complianceSignals.some(s => /BKMEA/i.test(s)),
    source_count: new Set(allEvidence.map(e => {
      try { return new URL(e.source_url).hostname; } catch { return e.source_url; }
    })).size,
    confidence_score: bestScore,
    confidence_tier: bestTier,
    priority_score: 0,
    recommended_sales_angle: 'free_gap_scan',
    legal_safe_note: '',
    evidence: allEvidence,
    last_checked_at: new Date().toISOString(),
  };

  lead.priority_score = computePriorityScore(lead);
  lead.recommended_sales_angle = recommendSalesAngle(lead);
  lead.legal_safe_note = generateLegalSafeNote(lead);

  return lead;
}

export async function runSeedPipeline(): Promise<void> {
  const seedPath = paths.seedFile;
  if (!fs.existsSync(seedPath)) {
    console.error(`[pipeline] Seed file not found: ${seedPath}`);
    console.error('Copy data/input/seed_factories.example.csv to seed_factories.csv and fill it in.');
    process.exit(1);
  }

  const seeds = await parseSeedCsv(seedPath);
  console.log(`[pipeline] Loaded ${seeds.length} seed factories`);

  const leads: FactoryLead[] = [];
  const rejected: Array<{ value: string; type: string; reason: string; factory_id: string }> = [];
  const evidenceMap: Record<string, ContactEvidence[]> = {};

  for (const seed of seeds) {
    const lead = await processSingleFactory(seed);
    if (lead) {
      leads.push(lead);
      evidenceMap[lead.factory_id] = lead.evidence;
    }
  }

  // Export all outputs
  exportLeadsToCsv(leads);
  exportLeadsToJson(leads);
  exportGoogleSheetsFormat(leads);
  exportRejectedContactsCsv(rejected);
  exportSourceEvidenceJson(evidenceMap);

  console.log(`\n[pipeline] Complete. ${leads.length} leads exported.`);
}
