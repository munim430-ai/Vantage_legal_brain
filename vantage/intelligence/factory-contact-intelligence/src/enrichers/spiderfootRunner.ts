import { env } from '../config.js';
import { RateLimiter } from '../utils/rateLimit.js';
import type { ContactEvidence } from '../types.js';
import { buildEvidence } from '../utils/sourceEvidence.js';

const limiter = new RateLimiter(3000);

/**
 * SpiderFoot self-hosted API integration.
 * Performs public OSINT enrichment for a domain or company name.
 * See vendor/intelligence/spiderfoot for setup.
 * Only modules that access public data are used here.
 */
export async function runSpiderfootScan(
  target: string,
  target_type: 'domain' | 'company',
  factory_name: string,
): Promise<ContactEvidence[]> {
  if (!env.SPIDERFOOT_API_KEY) {
    console.warn('[SpiderFoot] No API key configured — skipping');
    return [];
  }

  await limiter.wait();

  const sfBase = env.SPIDERFOOT_URL;

  // Start a new scan
  const scanRes = await fetch(`${sfBase}/startscan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${env.SPIDERFOOT_API_KEY}`,
    },
    body: new URLSearchParams({
      scanname: `VANTAGE-${factory_name.replace(/\s/g, '-')}`,
      scantarget: target,
      targettype: target_type === 'domain' ? 'DOMAIN_NAME' : 'HUMAN_NAME',
      modulelist: 'sfp_email,sfp_phone,sfp_whois,sfp_googlesearch',
      typelist: '',
    }),
  });

  if (!scanRes.ok) {
    console.warn(`[SpiderFoot] Failed to start scan: ${scanRes.status}`);
    return [];
  }

  const scanData = (await scanRes.json()) as { id?: string };
  const scanId = scanData.id;
  if (!scanId) return [];

  // Poll for completion (max 2 min)
  let completed = false;
  for (let i = 0; i < 24; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const statusRes = await fetch(`${sfBase}/scanstatus?id=${scanId}`, {
      headers: { 'Authorization': `Bearer ${env.SPIDERFOOT_API_KEY}` },
    });
    const status = (await statusRes.json()) as { status?: string };
    if (status.status === 'FINISHED' || status.status === 'ERROR-FAILED') {
      completed = true;
      break;
    }
  }

  if (!completed) {
    console.warn(`[SpiderFoot] Scan timed out for ${target}`);
    return [];
  }

  // Fetch results
  const resultsRes = await fetch(`${sfBase}/scaneventresultstyped?id=${scanId}&eventType=EMAILADDR`, {
    headers: { 'Authorization': `Bearer ${env.SPIDERFOOT_API_KEY}` },
  });
  const results = (await resultsRes.json()) as Array<[string, string]>;

  return results.map(([_type, value]) =>
    buildEvidence(
      value,
      'email',
      `spiderfoot://scan/${scanId}`,
      `SpiderFoot — ${factory_name}`,
      'spiderfoot',
      55,
    ),
  );
}
