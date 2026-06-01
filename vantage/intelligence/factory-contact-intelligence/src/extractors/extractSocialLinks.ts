import type { ContactEvidence } from '../types.js';
import { buildEvidence } from '../utils/sourceEvidence.js';

const SOCIAL_PATTERNS: Record<string, RegExp> = {
  linkedin: /https?:\/\/(www\.)?linkedin\.com\/(company|in)\/[^\s"'<>]+/gi,
  facebook: /https?:\/\/(www\.)?facebook\.com\/[^\s"'<>]+/gi,
  twitter: /https?:\/\/(www\.)?(twitter|x)\.com\/[^\s"'<>]+/gi,
  youtube: /https?:\/\/(www\.)?youtube\.com\/(c|channel|user)\/[^\s"'<>]+/gi,
  instagram: /https?:\/\/(www\.)?instagram\.com\/[^\s"'<>]+/gi,
};

export function extractSocialLinks(
  html: string,
  source_url: string,
  source_title: string,
): ContactEvidence[] {
  const results: ContactEvidence[] = [];
  const seen = new Set<string>();

  for (const [_platform, pattern] of Object.entries(SOCIAL_PATTERNS)) {
    const matches = html.matchAll(new RegExp(pattern.source, 'gi'));
    for (const match of matches) {
      const url = match[0]!.replace(/["'>]$/, '');
      if (seen.has(url)) continue;
      seen.add(url);
      results.push(buildEvidence(url, 'social', source_url, source_title, 'structured_dom', 80));
    }
  }
  return results;
}

export function groupSocialLinks(evidence: ContactEvidence[]): Record<string, string> {
  const social: Record<string, string> = {};
  const socials = evidence.filter(e => e.type === 'social');
  for (const ev of socials) {
    if (/linkedin/i.test(ev.value)) social['linkedin'] = ev.value;
    else if (/facebook/i.test(ev.value)) social['facebook'] = ev.value;
    else if (/twitter|\.x\.com/i.test(ev.value)) social['twitter'] = ev.value;
    else if (/youtube/i.test(ev.value)) social['youtube'] = ev.value;
    else if (/instagram/i.test(ev.value)) social['instagram'] = ev.value;
  }
  return social;
}
