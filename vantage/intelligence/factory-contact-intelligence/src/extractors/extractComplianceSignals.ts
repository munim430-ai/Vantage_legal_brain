import type { ContactEvidence } from '../types.js';
import { buildEvidence } from '../utils/sourceEvidence.js';

const COMPLIANCE_KEYWORDS: Record<string, RegExp> = {
  'WRAP certified': /\bWRAP\b.*certif/i,
  'BSCI audit': /\bBSCI\b/i,
  'SMETA audit': /\bSMETA\b/i,
  'SA8000 certified': /\bSA8000\b/i,
  'Sedex member': /\bSedex\b/i,
  'Better Work member': /Better\s+Work/i,
  'RSC member': /\bRSC\b|\bAlliance\b|\bAccord\b/i,
  'ISO 9001': /\bISO\s*9001\b/i,
  'ISO 14001': /\bISO\s*14001\b/i,
  'OEKO-TEX': /\bOEKO[\s-]?TEX\b/i,
  'GRS certified': /\bGRS\b|Global\s+Recycled\s+Standard/i,
  'BGMEA member': /\bBGMEA\b/i,
  'BKMEA member': /\bBKMEA\b/i,
  'Higg FEM': /\bHigg\b|\bFEM\b/i,
  'LEED certified': /\bLEED\b/i,
  'buyer_signal_hm': /\bH&M\b|H and M/i,
  'buyer_signal_primark': /\bPrimark\b/i,
  'buyer_signal_inditex': /\bInditex\b|\bZara\b/i,
  'buyer_signal_ms': /M&S|Marks\s+&\s+Spencer/i,
  'buyer_signal_pvh': /\bPVH\b|Tommy\s+Hilfiger|Calvin\s+Klein/i,
  'buyer_signal_target': /\bTarget\b/i,
  'buyer_signal_walmart': /\bWalmart\b|Wal-Mart/i,
  'buyer_signal_gap': /\bGAP\b/i,
};

export function extractComplianceSignals(
  text: string,
  source_url: string,
  source_title: string,
): ContactEvidence[] {
  const results: ContactEvidence[] = [];
  for (const [label, pattern] of Object.entries(COMPLIANCE_KEYWORDS)) {
    if (pattern.test(text)) {
      const type = label.startsWith('buyer_signal') ? 'buyer_signal' : 'compliance_signal';
      results.push(buildEvidence(label, type, source_url, source_title, 'html_regex', 70));
    }
  }
  return results;
}
