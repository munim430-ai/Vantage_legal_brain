/*
 * LEGAL-SAFE WHATSAPP EXTRACTION
 *
 * We only extract WhatsApp contact details when they are:
 *   1. Publicly visible on a factory's own website or official contact page, OR
 *   2. Present in a recognized public business directory, OR
 *   3. In the form of a wa.me or api.whatsapp.com/send link on a public page, OR
 *   4. Plain text explicitly labeled "WhatsApp: +8801..." on a public page.
 *
 * We do NOT:
 *   - Send any messages via WhatsApp.
 *   - Probe or verify WhatsApp numbers by attempting to contact them.
 *   - Scrape behind login or any authenticated session.
 *   - Use Baileys or any WhatsApp automation library for contact probing.
 *   - Collect personal WhatsApp numbers not shared for business purposes.
 */

import { WHATSAPP_URL_PATTERNS } from '../config.js';
import { normalizeBangladeshPhone } from '../utils/normalizeBangladeshPhone.js';
import { buildEvidence } from '../utils/sourceEvidence.js';
import type { ContactEvidence } from '../types.js';

const WHATSAPP_TEXT_PATTERN = /whatsapp[:\s]*\+?88?0?1[3-9]\d{8}/gi;

function extractPhoneFromWaUrl(url: string): string | null {
  const waMe = url.match(/wa\.me\/(\+?[\d]+)/i);
  if (waMe?.[1]) return waMe[1]!;
  const apiSend = url.match(/phone=([\d]+)/i);
  if (apiSend?.[1]) return `+${apiSend[1]}`;
  return null;
}

export function extractWhatsAppFromText(
  text: string,
  source_url: string,
  source_title: string,
): ContactEvidence[] {
  const results: ContactEvidence[] = [];
  const seen = new Set<string>();

  // Extract from wa.me / api.whatsapp.com links
  for (const pattern of WHATSAPP_URL_PATTERNS) {
    const matches = text.matchAll(new RegExp(pattern.source, 'gi'));
    for (const match of matches) {
      const raw = match[0]!;
      const phone = extractPhoneFromWaUrl(raw);
      if (!phone) continue;
      const normalized = normalizeBangladeshPhone(phone) ?? phone;
      if (seen.has(normalized)) continue;
      seen.add(normalized);
      results.push(
        buildEvidence(raw, 'whatsapp', source_url, source_title, 'whatsapp_link', 85),
      );
    }
  }

  // Extract from plain-text "WhatsApp: +880..." labels
  const textMatches = text.matchAll(new RegExp(WHATSAPP_TEXT_PATTERN.source, 'gi'));
  for (const match of textMatches) {
    const rawPhone = match[0]!.replace(/^whatsapp[:\s]*/i, '');
    const normalized = normalizeBangladeshPhone(rawPhone);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    results.push(
      buildEvidence(normalized, 'whatsapp', source_url, source_title, 'html_regex', 75),
    );
  }

  return results;
}

export function normalizeWhatsAppCandidates(evidence: ContactEvidence[]): string[] {
  const waItems = evidence.filter(e => e.type === 'whatsapp');
  const phones = waItems.map(e => {
    const phone = extractPhoneFromWaUrl(e.value) ?? e.value;
    return normalizeBangladeshPhone(phone);
  });
  return [...new Set(phones.filter((p): p is string => p !== null))];
}
