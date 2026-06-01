import type { ContactEvidence, ContactType, ExtractionMethod } from '../types.js';

export function buildEvidence(
  value: string,
  type: ContactType,
  source_url: string,
  source_title: string,
  method: ExtractionMethod,
  confidence: number,
): ContactEvidence {
  return {
    value,
    type,
    source_url,
    source_title,
    extraction_method: method,
    first_seen_at: new Date().toISOString(),
    confidence,
  };
}

export function deduplicateEvidence(items: ContactEvidence[]): ContactEvidence[] {
  const seen = new Map<string, ContactEvidence>();
  for (const ev of items) {
    const key = `${ev.type}::${ev.value}::${ev.source_url}`;
    if (!seen.has(key) || ev.confidence > (seen.get(key)!.confidence)) {
      seen.set(key, ev);
    }
  }
  return [...seen.values()];
}

export function groupEvidenceByValue(items: ContactEvidence[]): Map<string, ContactEvidence[]> {
  const map = new Map<string, ContactEvidence[]>();
  for (const ev of items) {
    const existing = map.get(ev.value) ?? [];
    map.set(ev.value, [...existing, ev]);
  }
  return map;
}
