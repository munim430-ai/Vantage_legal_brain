// ── Core VANTAGE Factory Contact Intelligence Types ──────────────────────────

export type ContactType =
  | 'email'
  | 'phone'
  | 'whatsapp'
  | 'website'
  | 'social'
  | 'compliance_signal'
  | 'buyer_signal';

export type ConfidenceTier = 'High' | 'Medium' | 'Low' | 'Rejected';

export type ExtractionMethod =
  | 'html_regex'
  | 'structured_dom'
  | 'pdf_text'
  | 'whatsapp_link'
  | 'searxng_query'
  | 'theharvester'
  | 'spiderfoot'
  | 'manual';

export type SalesAngle =
  | 'buyer_readiness'
  | 'documentation_visibility'
  | 'certification_consistency'
  | 'rsc_safety_documentation'
  | 'free_gap_scan'
  | 'md_owner_direct'
  | 'compliance_manager';

export interface ContactEvidence {
  value: string;
  type: ContactType;
  source_url: string;
  source_title: string;
  extraction_method: ExtractionMethod;
  first_seen_at: string; // ISO 8601
  confidence: number; // 0–100
}

export interface FactoryLead {
  // Identity
  factory_id: string;
  factory_name: string;
  group_name: string;
  website: string;
  address: string;
  district: string;
  industrial_zone: string;

  // Seed origin
  source_seed: string; // e.g. 'bgmea_directory' | 'open_supply_hub' | 'bkmea_directory' | 'manual'
  source_urls: string[];

  // Contacts (all publicly sourced)
  public_emails: string[];
  public_phones: string[];
  public_whatsapp_links: string[];
  normalized_whatsapp_candidates: string[]; // "+8801XXXXXXXXX" format
  social_links: Record<string, string>; // { linkedin, facebook, twitter, ... }

  // Signals
  buyer_signals: string[]; // e.g. "H&M supplier list 2023", "Primark public disclosure"
  compliance_signals: string[]; // e.g. "WRAP certified", "Sedex member"
  rsc_signal: boolean;
  bgmea_signal: boolean;
  bkmea_signal: boolean;

  // Scoring
  source_count: number;
  confidence_score: number; // 0–100 after scoring rules
  confidence_tier: ConfidenceTier;
  priority_score: number; // composite sales priority

  // Sales ops
  recommended_sales_angle: SalesAngle;
  legal_safe_note: string; // auto-generated caution note for outreach

  // Evidence trail
  evidence: ContactEvidence[];

  // Meta
  last_checked_at: string; // ISO 8601
}

export interface SeedFactory {
  factory_id: string;
  factory_name: string;
  group_name: string;
  website: string;
  address: string;
  district: string;
  industrial_zone: string;
  bgmea_id: string;
  bkmea_id: string;
  source_seed: string;
  notes: string;
}

export interface CrawlJob {
  factory_id: string;
  factory_name: string;
  website: string;
  seed_source: string;
}

export interface ScoringInput {
  appears_on_official_website: boolean;
  appears_on_recognized_directory: boolean;
  cross_source_count: number;
  domain_email_match: boolean;
  whatsapp_labeled_publicly: boolean;
  is_freemail_only: boolean;
  source_looks_spammy: boolean;
}
