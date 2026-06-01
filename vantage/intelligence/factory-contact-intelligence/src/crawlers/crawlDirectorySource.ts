import { CheerioCrawler, RequestQueue, CheerioCrawlingContext } from 'crawlee';
import { extractAllContactsFromPage } from './extractLinksAndContacts.js';
import { env } from '../config.js';
import type { ContactEvidence } from '../types.js';

export interface DirectoryCrawlResult {
  source: string;
  factory_name: string;
  pages_crawled: number;
  evidence: ContactEvidence[];
}

/**
 * PUBLIC DIRECTORY SOURCES (read-only, no login required):
 *   - Open Supply Hub: opensupplyhub.org
 *   - BGMEA directory: bgmea.com.bd
 *   - BKMEA directory: bkmea.com
 *   - RSC Bangladesh: rsc-bd.org
 *   - Made in Bangladesh: made-in-bangladesh.com
 *
 * Pass the pre-constructed search/profile URL for a specific factory.
 * This does NOT perform automated login or bypass access controls.
 */
export async function crawlDirectorySource(
  factory_name: string,
  directory_url: string,
  source_label: string,
): Promise<DirectoryCrawlResult> {
  const allEvidence: ContactEvidence[] = [];
  let pagesCrawled = 0;

  const queue = await RequestQueue.open(`dir-${factory_name.replace(/\W/g, '-')}-${Date.now()}`);
  await queue.addRequest({ url: directory_url });

  const crawler = new CheerioCrawler({
    requestQueue: queue,
    maxRequestsPerCrawl: 3,
    maxConcurrency: 1,
    requestHandlerTimeoutSecs: 30,
    navigationTimeoutSecs: 20,

    async requestHandler({ request, $, body }: CheerioCrawlingContext) {
      const title = $('title').text() || source_label;
      const text = $('body').text();
      const html = typeof body === 'string' ? body : body.toString();
      pagesCrawled++;

      const { evidence } = extractAllContactsFromPage(text, html, request.url, title);
      allEvidence.push(...evidence);
    },

    failedRequestHandler({ request }) {
      console.warn(`[crawlDirectorySource] Failed: ${request.url}`);
    },
  });

  await crawler.run();
  await queue.drop();

  return {
    source: source_label,
    factory_name,
    pages_crawled: pagesCrawled,
    evidence: allEvidence,
  };
}

export const PUBLIC_DIRECTORIES = {
  BGMEA: (query: string) =>
    `https://www.bgmea.com.bd/member/search?q=${encodeURIComponent(query)}`,
  OPEN_SUPPLY_HUB: (query: string) =>
    `https://opensupplyhub.org/facilities?q=${encodeURIComponent(query)}&countries=BD`,
  RSC: (query: string) =>
    `https://rsc-bd.org/factory-search?q=${encodeURIComponent(query)}`,
  MADE_IN_BANGLADESH: (query: string) =>
    `https://made-in-bangladesh.com/search/?q=${encodeURIComponent(query)}`,
} as const;

export async function crawlAllDirectoriesForFactory(
  factory_name: string,
): Promise<DirectoryCrawlResult[]> {
  const results: DirectoryCrawlResult[] = [];
  for (const [label, urlFn] of Object.entries(PUBLIC_DIRECTORIES)) {
    await new Promise(r => setTimeout(r, env.CRAWL_REQUEST_DELAY_MS));
    const result = await crawlDirectorySource(factory_name, urlFn(factory_name), label);
    results.push(result);
  }
  return results;
}
