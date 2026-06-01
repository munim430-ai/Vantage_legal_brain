import { SCORING, KNOWN_DIRECTORIES } from '../config.js';
import { groupEvidenceByValue } from '../utils/sourceEvidence.js';
import { emailDomainMatchesWebsite, isFreemailOnly } from '../extractors/extractEmails.js';
import type { ContactEvidence, ConfidenceTier, ScoringInput } from '../types.js';

export function buildScoringInput(
  contact_value: string,
  contact_type: 'email' | 'phone' | 'whatsapp',
  evidence: ContactEvidence[],
  factory_website: string,
): ScoringInput {
  const relevant = evidence.filter(e => e.value === contact_value);
  const sourceUrls = relevant.map(e => e.source_url);

  const appears_on_official_website = sourceUrls.some(url => {
    try {
      const host = new URL(url).hostname;
      const siteHost = factory_website ? new URL(factory_website).hostname : '';
      return siteHost && host.includes(siteHost.replace(/^www\./, ''));
    } catch {
      return false;
    }
  });

  const appears_on_recognized_directory = sourceUrls.some(url => {
    try {
      const host = new URL(url).hostname.replace(/^www\./, '');
      return [...KNOWN_DIRECTORIES].some(d => host.includes(d));
    } catch {
      return false;
    }
  });

  const uniqueSources = new Set(sourceUrls.map(url => {
    try { return new URL(url).hostname; } catch { return url; }
  }));
  const cross_source_count = uniqueSources.size;

  const domain_email_match = contact_type === 'email'
    ? emailDomainMatchesWebsite(contact_value, factory_website)
    : false;

  const whatsapp_labeled_publicly = contact_type === 'whatsapp'
    ? relevant.some(e => e.extraction_method === 'whatsapp_link' || e.confidence >= 85)
    : false;

  const is_freemail_only = contact_type === 'email'
    ? isFreemailOnly([contact_value])
    : false;

  const source_looks_spammy = relevant.every(e => {
    try {
      const host = new URL(e.source_url).hostname;
      return !appears_on_official_website && !appears_on_recognized_directory &&
        !host.includes('.bd') && !host.includes('linkedin') && !host.includes('facebook');
    } catch {
      return true;
    }
  });

  return {
    appears_on_official_website,
    appears_on_recognized_directory,
    cross_source_count,
    domain_email_match,
    whatsapp_labeled_publicly,
    is_freemail_only,
    source_looks_spammy,
  };
}

export function computeContactScore(input: ScoringInput): number {
  let score = 0;

  if (input.appears_on_official_website) score += SCORING.OFFICIAL_WEBSITE;
  if (input.appears_on_recognized_directory) score += SCORING.RECOGNIZED_DIRECTORY;
  if (input.cross_source_count >= 2) score += SCORING.MULTI_SOURCE;
  if (input.domain_email_match) score += SCORING.DOMAIN_EMAIL_MATCH;
  if (input.whatsapp_labeled_publicly) score += SCORING.WHATSAPP_LABELED;
  if (input.is_freemail_only) score += SCORING.FREEMAIL_PENALTY;
  if (input.source_looks_spammy) score += SCORING.SPAM_SOURCE_PENALTY;

  return Math.max(0, Math.min(SCORING.MAX_SCORE, score));
}

export function classifyConfidence(score: number): ConfidenceTier {
  if (score < SCORING.REJECT_BELOW) return 'Rejected';
  if (score <= SCORING.LOW_MAX) return 'Low';
  if (score <= SCORING.MEDIUM_MAX) return 'Medium';
  return 'High';
}

export function scoreAllContactsForFactory(
  emails: string[],
  phones: string[],
  whatsapp_links: string[],
  evidence: ContactEvidence[],
  factory_website: string,
): { value: string; type: 'email' | 'phone' | 'whatsapp'; score: number; tier: ConfidenceTier }[] {
  const grouped = groupEvidenceByValue(evidence);
  const results: ReturnType<typeof scoreAllContactsForFactory> = [];

  const score = (value: string, type: 'email' | 'phone' | 'whatsapp') => {
    const ev = grouped.get(value) ?? [];
    const input = buildScoringInput(value, type, ev, factory_website);
    const s = computeContactScore(input);
    return { value, type, score: s, tier: classifyConfidence(s) };
  };

  results.push(...emails.map(e => score(e, 'email')));
  results.push(...phones.map(p => score(p, 'phone')));
  results.push(...whatsapp_links.map(w => score(w, 'whatsapp')));

  return results.filter(r => r.tier !== 'Rejected');
}
