import type { FactoryLead, SalesAngle } from '../types.js';

interface PriorityFactors {
  has_high_confidence_contact: boolean;
  is_bgmea_member: boolean;
  is_bkmea_member: boolean;
  rsc_member: boolean;
  has_buyer_signals: boolean;
  compliance_signal_count: number;
  district_priority: boolean; // Dhaka / Gazipur / Ashulia / Narayanganj
  has_website: boolean;
  contact_count: number;
}

const PRIORITY_WEIGHTS = {
  high_confidence_contact: 30,
  bgmea_member: 15,
  bkmea_member: 15,
  rsc_member: 20,
  buyer_signals: 20,
  compliance_signals: 10,
  district_priority: 15,
  has_website: 10,
  contact_count_bonus: 5,
} as const;

const PRIORITY_DISTRICTS = new Set([
  'dhaka', 'gazipur', 'ashulia', 'narsingdi', 'narayanganj', 'savar',
]);

export function computePriorityScore(lead: Partial<FactoryLead>): number {
  const factors: PriorityFactors = {
    has_high_confidence_contact: (lead.confidence_tier === 'High'),
    is_bgmea_member: lead.bgmea_signal ?? false,
    is_bkmea_member: lead.bkmea_signal ?? false,
    rsc_member: lead.rsc_signal ?? false,
    has_buyer_signals: (lead.buyer_signals?.length ?? 0) > 0,
    compliance_signal_count: lead.compliance_signals?.length ?? 0,
    district_priority: PRIORITY_DISTRICTS.has((lead.district ?? '').toLowerCase()),
    has_website: Boolean(lead.website),
    contact_count:
      (lead.public_emails?.length ?? 0) +
      (lead.public_phones?.length ?? 0) +
      (lead.public_whatsapp_links?.length ?? 0),
  };

  let score = 0;
  if (factors.has_high_confidence_contact) score += PRIORITY_WEIGHTS.high_confidence_contact;
  if (factors.is_bgmea_member) score += PRIORITY_WEIGHTS.bgmea_member;
  if (factors.is_bkmea_member) score += PRIORITY_WEIGHTS.bkmea_member;
  if (factors.rsc_member) score += PRIORITY_WEIGHTS.rsc_member;
  if (factors.has_buyer_signals) score += PRIORITY_WEIGHTS.buyer_signals;
  if (factors.compliance_signal_count > 0) score += PRIORITY_WEIGHTS.compliance_signals;
  if (factors.district_priority) score += PRIORITY_WEIGHTS.district_priority;
  if (factors.has_website) score += PRIORITY_WEIGHTS.has_website;
  if (factors.contact_count >= 2) score += PRIORITY_WEIGHTS.contact_count_bonus;

  return Math.min(100, score);
}

export function recommendSalesAngle(lead: Partial<FactoryLead>): SalesAngle {
  // RSC member → safety documentation angle
  if (lead.rsc_signal) return 'rsc_safety_documentation';

  // Buyer-facing with signals → buyer readiness
  if ((lead.buyer_signals?.length ?? 0) > 0) return 'buyer_readiness';

  // Compliance signals but no website → documentation visibility
  if ((lead.compliance_signals?.length ?? 0) > 0 && !lead.website) {
    return 'documentation_visibility';
  }

  // High confidence WhatsApp → MD/Owner direct
  if ((lead.public_whatsapp_links?.length ?? 0) > 0 && lead.confidence_tier === 'High') {
    return 'md_owner_direct';
  }

  // Has email contact → compliance manager angle
  if ((lead.public_emails?.length ?? 0) > 0) return 'compliance_manager';

  // Default: free gap scan outreach
  return 'free_gap_scan';
}

export function generateLegalSafeNote(lead: Partial<FactoryLead>): string {
  const angle = lead.recommended_sales_angle;
  const notes: string[] = [
    'All contacts sourced from public pages only.',
    'Do not state or imply audit findings.',
    'Use only approved VANTAGE terms: gap scan, compliance guidance, audit-preparation support.',
  ];
  if (angle === 'rsc_safety_documentation') {
    notes.push('RSC membership noted from public source — do not reference private RSC audit data.');
  }
  if (angle === 'buyer_readiness') {
    notes.push('Buyer signal from public supplier list — do not reference private buyer audit status.');
  }
  if ((lead.public_whatsapp_links?.length ?? 0) > 0) {
    notes.push('WhatsApp contact extracted from public page only — do not send unsolicited bulk messages.');
  }
  return notes.join(' ');
}
