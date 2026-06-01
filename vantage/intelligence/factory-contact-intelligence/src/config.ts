import { z } from 'zod';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const EnvSchema = z.object({
  CRAWL_REQUEST_DELAY_MS: z.coerce.number().default(2000),
  CRAWL_MAX_CONCURRENCY: z.coerce.number().default(3),
  CRAWL_MAX_RETRIES: z.coerce.number().default(2),
  CRAWL_USER_AGENT: z.string().optional(),
  SEARXNG_BASE_URL: z.string().default('http://localhost:8080'),
  SEARXNG_API_KEY: z.string().optional(),
  THEHARVESTER_PYTHON: z.string().default('python3'),
  THEHARVESTER_PATH: z.string().default('/vendor/intelligence/theHarvester/theHarvester.py'),
  THEHARVESTER_HUNTER_KEY: z.string().optional(),
  THEHARVESTER_SECURITYTRAILS_KEY: z.string().optional(),
  SPIDERFOOT_URL: z.string().default('http://localhost:5001'),
  SPIDERFOOT_API_KEY: z.string().optional(),
  REACHER_BASE_URL: z.string().default('http://localhost:8080'),
  REACHER_API_KEY: z.string().optional(),
  OUTPUT_DIR: z.string().default('./data/output'),
  EVIDENCE_DIR: z.string().default('./data/evidence'),
  PROXY_URL: z.string().optional(),
});

function loadEnv() {
  const raw = {
    CRAWL_REQUEST_DELAY_MS: process.env['CRAWL_REQUEST_DELAY_MS'],
    CRAWL_MAX_CONCURRENCY: process.env['CRAWL_MAX_CONCURRENCY'],
    CRAWL_MAX_RETRIES: process.env['CRAWL_MAX_RETRIES'],
    CRAWL_USER_AGENT: process.env['CRAWL_USER_AGENT'],
    SEARXNG_BASE_URL: process.env['SEARXNG_BASE_URL'],
    SEARXNG_API_KEY: process.env['SEARXNG_API_KEY'],
    THEHARVESTER_PYTHON: process.env['THEHARVESTER_PYTHON'],
    THEHARVESTER_PATH: process.env['THEHARVESTER_PATH'],
    THEHARVESTER_HUNTER_KEY: process.env['THEHARVESTER_HUNTER_KEY'],
    THEHARVESTER_SECURITYTRAILS_KEY: process.env['THEHARVESTER_SECURITYTRAILS_KEY'],
    SPIDERFOOT_URL: process.env['SPIDERFOOT_URL'],
    SPIDERFOOT_API_KEY: process.env['SPIDERFOOT_API_KEY'],
    REACHER_BASE_URL: process.env['REACHER_BASE_URL'],
    REACHER_API_KEY: process.env['REACHER_API_KEY'],
    OUTPUT_DIR: process.env['OUTPUT_DIR'],
    EVIDENCE_DIR: process.env['EVIDENCE_DIR'],
    PROXY_URL: process.env['PROXY_URL'],
  };
  return EnvSchema.parse(raw);
}

export const env = loadEnv();

export const paths = {
  root: ROOT,
  dataInput: path.join(ROOT, 'data', 'input'),
  dataOutput: path.join(ROOT, 'data', 'output'),
  dataEvidence: path.join(ROOT, 'data', 'evidence'),
  seedFile: path.join(ROOT, 'data', 'input', 'seed_factories.csv'),
};

export const SCORING = {
  OFFICIAL_WEBSITE: 35,
  RECOGNIZED_DIRECTORY: 25,
  MULTI_SOURCE: 20,
  DOMAIN_EMAIL_MATCH: 15,
  WHATSAPP_LABELED: 10,
  FREEMAIL_PENALTY: -25,
  SPAM_SOURCE_PENALTY: -40,
  MAX_SCORE: 100,
  REJECT_BELOW: 35,
  LOW_MAX: 59,
  MEDIUM_MAX: 79,
} as const;

export const BANGLADESH_PHONE_REGEX = /(?:\+?880|0)1[3-9]\d{8}/g;

export const EMAIL_REGEX = /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g;

export const WHATSAPP_URL_PATTERNS = [
  /https?:\/\/wa\.me\/\+?[\d]+/gi,
  /https?:\/\/api\.whatsapp\.com\/send\?phone=[\d]+/gi,
];

export const FREEMAIL_DOMAINS = new Set([
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
  'live.com', 'icloud.com', 'protonmail.com', 'ymail.com',
]);

export const KNOWN_DIRECTORIES = new Set([
  'opensupplyhub.org',
  'rsc-bd.org',
  'bgmea.com.bd',
  'bkmea.com',
  'bepza.gov.bd',
  'made-in-bangladesh.com',
  'apparelresource.com',
  'fibre2fashion.com',
  'textilesinteligence.com',
  'kompass.com',
  'dnb.com',
  'europages.com',
]);
