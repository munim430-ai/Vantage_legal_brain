import { env } from '../config.js';
import { RateLimiter } from '../utils/rateLimit.js';
import { extractEmailsFromText } from '../extractors/extractEmails.js';
import { extractPhonesFromText } from '../extractors/extractPhones.js';
import { extractWhatsAppFromText } from '../extractors/extractWhatsAppLinks.js';
import type { ContactEvidence } from '../types.js';

const limiter = new RateLimiter(2000);

interface SearxResult {
  url: string;
  title: string;
  content: string;
}

async function searxQuery(q: string): Promise<SearxResult[]> {
  await limiter.wait();
  const url = `${env.SEARXNG_BASE_URL}/search?q=${encodeURIComponent(q)}&format=json&categories=general`;
  const headers: HeadersInit = { Accept: 'application/json' };
  if (env.SEARXNG_API_KEY) headers['Authorization'] = `Bearer ${env.SEARXNG_API_KEY}`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.warn(`[searxng] Query failed (${res.status}): ${q}`);
    return [];
  }
  const data = (await res.json()) as { results?: SearxResult[] };
  return data.results ?? [];
}

export async function crossCheckContactViaSearxng(
  factory_name: string,
  contact_value: string,
): Promise<ContactEvidence[]> {
  const query = `"${factory_name}" "${contact_value}"`;
  const results = await searxQuery(query);
  const evidence: ContactEvidence[] = [];

  for (const r of results.slice(0, 5)) {
    const text = `${r.title} ${r.content}`;
    evidence.push(
      ...extractEmailsFromText(text, r.url, r.title),
      ...extractPhonesFromText(text, r.url, r.title),
      ...extractWhatsAppFromText(text, r.url, r.title),
    );
  }
  return evidence;
}

export async function discoverySearchViaSearxng(
  factory_name: string,
  domain?: string,
): Promise<ContactEvidence[]> {
  const queries = [
    `"${factory_name}" Bangladesh email contact`,
    `"${factory_name}" site:bgmea.com.bd OR site:opensupplyhub.org`,
    `"${factory_name}" WhatsApp phone`,
    domain ? `site:${domain} contact email` : '',
  ].filter(Boolean);

  const evidence: ContactEvidence[] = [];
  for (const q of queries) {
    const results = await searxQuery(q);
    for (const r of results.slice(0, 3)) {
      const text = `${r.title} ${r.content}`;
      evidence.push(
        ...extractEmailsFromText(text, r.url, r.title),
        ...extractPhonesFromText(text, r.url, r.title),
        ...extractWhatsAppFromText(text, r.url, r.title),
      );
    }
  }
  return evidence;
}
