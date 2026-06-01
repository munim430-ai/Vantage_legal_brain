import { BANGLADESH_PHONE_REGEX } from '../config.js';
import type { ContactEvidence } from '../types.js';
import { normalizeBangladeshPhone, isBangladeshMobile } from '../utils/normalizeBangladeshPhone.js';
import { buildEvidence } from '../utils/sourceEvidence.js';

export function extractPhonesFromText(
  text: string,
  source_url: string,
  source_title: string,
): ContactEvidence[] {
  const matches = text.matchAll(new RegExp(BANGLADESH_PHONE_REGEX.source, 'g'));
  const results: ContactEvidence[] = [];
  const seen = new Set<string>();

  for (const match of matches) {
    const normalized = normalizeBangladeshPhone(match[0]!);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);

    const confidence = isBangladeshMobile(normalized) ? 70 : 55;
    results.push(
      buildEvidence(normalized, 'phone', source_url, source_title, 'html_regex', confidence),
    );
  }
  return results;
}
