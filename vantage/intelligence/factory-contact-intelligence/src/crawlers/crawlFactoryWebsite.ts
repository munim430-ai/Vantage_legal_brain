import { CheerioCrawler, RequestQueue, CheerioCrawlingContext } from 'crawlee';
import { env } from '../config.js';
import { extractAllContactsFromPage, extractContactPageUrls } from './extractLinksAndContacts.js';
import type { ContactEvidence } from '../types.js';

export interface FactoryWebsiteCrawlResult {
  factory_id: string;
  factory_name: string;
  website: string;
  pages_crawled: number;
  evidence: ContactEvidence[];
}

export async function crawlFactoryWebsite(
  factory_id: string,
  factory_name: string,
  website: string,
): Promise<FactoryWebsiteCrawlResult> {
  if (!website) {
    return { factory_id, factory_name, website, pages_crawled: 0, evidence: [] };
  }

  const allEvidence: ContactEvidence[] = [];
  const pagesCrawled: string[] = [];

  const queue = await RequestQueue.open(`factory-${factory_id}`);
  await queue.addRequest({ url: website });

  const crawler = new CheerioCrawler({
    requestQueue: queue,
    maxRequestsPerCrawl: 8,
    maxConcurrency: 1,
    requestHandlerTimeoutSecs: 30,
    navigationTimeoutSecs: 20,
    minConcurrency: 1,

    async requestHandler({ request, $, body }: CheerioCrawlingContext) {
      const url = request.url;
      const title = $('title').text() || factory_name;
      const text = $('body').text();
      const html = typeof body === 'string' ? body : body.toString();

      pagesCrawled.push(url);

      const { evidence } = extractAllContactsFromPage(text, html, url, title);
      allEvidence.push(...evidence);

      // On the first page, discover and enqueue contact sub-pages
      if (pagesCrawled.length === 1) {
        const contactUrls = extractContactPageUrls(html, url);
        for (const cu of contactUrls) {
          await queue.addRequest({ url: cu }, { forefront: true });
        }
      }
    },

    failedRequestHandler({ request }) {
      console.warn(`[crawlFactoryWebsite] Failed: ${request.url}`);
    },
  });

  await crawler.run();
  await queue.drop();

  return {
    factory_id,
    factory_name,
    website,
    pages_crawled: pagesCrawled.length,
    evidence: allEvidence,
  };
}

// Honour rate limit between factory crawls
export async function rateLimitedCrawlFactory(
  factory_id: string,
  factory_name: string,
  website: string,
): Promise<FactoryWebsiteCrawlResult> {
  await new Promise(r => setTimeout(r, env.CRAWL_REQUEST_DELAY_MS));
  return crawlFactoryWebsite(factory_id, factory_name, website);
}
