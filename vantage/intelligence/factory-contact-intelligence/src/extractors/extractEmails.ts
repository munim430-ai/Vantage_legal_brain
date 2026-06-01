import { EMAIL_REGEX, FREEMAIL_DOMAINS } from '../config.js';
import type { ContactEvidence } from '../types.js';
import { buildEvidence } from '../utils/sourceEvidence.js';

const IMAGE_PLACEHOLDER_PATTERNS = [
  /\.(png|jpg|gif|webp|svg)$/i,
  /^noreply@/i,
  /^no-reply@/i,
  /^example\.com$/i,
  /^test@/i,
  /^info@example/i,
];

function isImagePlaceholder(email: string): boolean {
  return IMAGE_PLACEHOLDER_PATTERNS.some(p => p.test(email));
}

export function extractEmailsFromText(
  text: string,
  source_url: string,
  source_title: string,
): ContactEvidence[] {
  const matches = text.matchAll(new RegExp(EMAIL_REGEX.source, 'gi'));
  const results: ContactEvidence[] = [];
  const seen = new Set<string>();

  for (const match of matches) {
    const email = match[0]!.toLowerCase();
    if (seen.has(email) || isImagePlaceholder(email)) continue;
    seen.add(email);

    const domain = email.split('@')[1] ?? '';
    const isFreemail = FREEMAIL_DOMAINS.has(domain);
    const confidence = isFreemail ? 35 : 70;

    results.push(
      buildEvidence(email, 'email', source_url, source_title, 'html_regex', confidence),
    );
  }
  return results;
}

export function isFreemailOnly(emails: string[]): boolean {
  if (emails.length === 0) return false;
  return emails.every(e => {
    const domain = e.split('@')[1] ?? '';
    return FREEMAIL_DOMAINS.has(domain);
  });
}

export function emailDomainMatchesWebsite(email: string, websiteUrl: string): boolean {
  if (!websiteUrl) return false;
  try {
    const domain = email.split('@')[1]?.toLowerCase() ?? '';
    const host = new URL(websiteUrl).hostname.replace(/^www\./, '').toLowerCase();
    return domain === host || host.endsWith(`.${domain}`) || domain.endsWith(`.${host}`);
  } catch {
    return false;
  }
}
