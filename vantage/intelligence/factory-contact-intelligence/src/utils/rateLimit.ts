import { env } from '../config.js';

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function rateLimitedFetch(url: string, opts?: RequestInit): Promise<Response> {
  await sleep(env.CRAWL_REQUEST_DELAY_MS);
  const res = await fetch(url, opts);
  return res;
}

export class RateLimiter {
  private lastCallAt = 0;

  constructor(private readonly delayMs: number = env.CRAWL_REQUEST_DELAY_MS) {}

  async wait(): Promise<void> {
    const elapsed = Date.now() - this.lastCallAt;
    if (elapsed < this.delayMs) {
      await sleep(this.delayMs - elapsed);
    }
    this.lastCallAt = Date.now();
  }
}
