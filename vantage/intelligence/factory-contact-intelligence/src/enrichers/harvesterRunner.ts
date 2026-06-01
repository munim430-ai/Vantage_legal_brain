import { exec } from 'child_process';
import { promisify } from 'util';
import { env } from '../config.js';
import { extractEmailsFromText } from '../extractors/extractEmails.js';
import type { ContactEvidence } from '../types.js';

const execAsync = promisify(exec);

/**
 * Runs theHarvester against a domain to discover public emails and subdomains.
 * theHarvester must be installed separately — see vendor/intelligence/theHarvester.
 * Only use with domains you have legitimate research interest in (public OSINT).
 */
export async function runHarvesterForDomain(
  domain: string,
  factory_name: string,
): Promise<ContactEvidence[]> {
  const pythonBin = env.THEHARVESTER_PYTHON;
  const harvesterPath = env.THEHARVESTER_PATH;

  const sources = ['bing', 'duckduckgo', 'dnsdumpster', 'rapiddns'].join(',');
  const cmd = `${pythonBin} "${harvesterPath}" -d "${domain}" -b ${sources} -l 100 -f /tmp/harvester_${domain}.json`;

  console.log(`[theHarvester] Running for domain: ${domain}`);

  try {
    const { stdout, stderr } = await execAsync(cmd, { timeout: 60_000 });
    const output = `${stdout}\n${stderr}`;
    return extractEmailsFromText(output, `theharvester://${domain}`, `theHarvester — ${factory_name}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[theHarvester] Failed for ${domain}: ${msg}`);
    return [];
  }
}

export function extractDomainFromWebsite(website: string): string | null {
  try {
    return new URL(website).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}
