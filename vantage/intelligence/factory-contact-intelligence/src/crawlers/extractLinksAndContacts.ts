import { extractEmailsFromText } from '../extractors/extractEmails.js';
import { extractPhonesFromText } from '../extractors/extractPhones.js';
import { extractWhatsAppFromText } from '../extractors/extractWhatsAppLinks.js';
import { extractSocialLinks } from '../extractors/extractSocialLinks.js';
import { extractComplianceSignals } from '../extractors/extractComplianceSignals.js';
import { deduplicateEvidence } from '../utils/sourceEvidence.js';
import type { ContactEvidence } from '../types.js';

export interface PageExtractionResult {
  source_url: string;
  evidence: ContactEvidence[];
}

export function extractAllContactsFromPage(
  text: string,
  html: string,
  source_url: string,
  source_title: string,
): PageExtractionResult {
  const evidence: ContactEvidence[] = [
    ...extractEmailsFromText(text, source_url, source_title),
    ...extractPhonesFromText(text, source_url, source_title),
    ...extractWhatsAppFromText(text, source_url, source_title),
    ...extractSocialLinks(html, source_url, source_title),
    ...extractComplianceSignals(text, source_url, source_title),
  ];

  return {
    source_url,
    evidence: deduplicateEvidence(evidence),
  };
}

export function extractContactPageUrls(html: string, baseUrl: string): string[] {
  const contactPatterns = [
    /href=["']([^"']*\bcontact\b[^"']*)/gi,
    /href=["']([^"']*\babout\b[^"']*)/gi,
    /href=["']([^"']*\bteam\b[^"']*)/gi,
    /href=["']([^"']*\bmanagement\b[^"']*)/gi,
    /href=["']([^"']*\bstaff\b[^"']*)/gi,
  ];
  const urls = new Set<string>();

  for (const pattern of contactPatterns) {
    const matches = html.matchAll(new RegExp(pattern.source, 'gi'));
    for (const match of matches) {
      const href = match[1];
      if (!href) continue;
      try {
        const resolved = new URL(href, baseUrl).href;
        if (resolved.startsWith('http')) urls.add(resolved);
      } catch {
        // skip malformed URLs
      }
    }
  }

  // Limit to avoid runaway crawls
  return [...urls].slice(0, 5);
}
