import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { paths } from '../config.js';
import type { FactoryLead } from '../types.js';

function flattenLead(lead: FactoryLead): Record<string, string | number | boolean> {
  return {
    factory_id: lead.factory_id,
    factory_name: lead.factory_name,
    group_name: lead.group_name,
    website: lead.website,
    address: lead.address,
    district: lead.district,
    industrial_zone: lead.industrial_zone,
    source_seed: lead.source_seed,
    source_urls: lead.source_urls.join(' | '),
    public_emails: lead.public_emails.join(' | '),
    public_phones: lead.public_phones.join(' | '),
    public_whatsapp_links: lead.public_whatsapp_links.join(' | '),
    normalized_whatsapp_candidates: lead.normalized_whatsapp_candidates.join(' | '),
    social_linkedin: lead.social_links['linkedin'] ?? '',
    social_facebook: lead.social_links['facebook'] ?? '',
    buyer_signals: lead.buyer_signals.join(' | '),
    compliance_signals: lead.compliance_signals.join(' | '),
    rsc_signal: lead.rsc_signal,
    bgmea_signal: lead.bgmea_signal,
    bkmea_signal: lead.bkmea_signal,
    source_count: lead.source_count,
    confidence_score: lead.confidence_score,
    confidence_tier: lead.confidence_tier,
    priority_score: lead.priority_score,
    recommended_sales_angle: lead.recommended_sales_angle,
    legal_safe_note: lead.legal_safe_note,
    last_checked_at: lead.last_checked_at,
  };
}

export function exportLeadsToCsv(leads: FactoryLead[], filename = 'factory_leads.csv'): void {
  fs.mkdirSync(paths.dataOutput, { recursive: true });
  const rows = leads.map(flattenLead);
  const csv = Papa.unparse(rows);
  fs.writeFileSync(path.join(paths.dataOutput, filename), csv, 'utf-8');
  console.log(`[export] Written: ${filename} (${leads.length} rows)`);
}

export function exportRejectedContactsCsv(
  rejected: Array<{ value: string; type: string; reason: string; factory_id: string }>,
): void {
  fs.mkdirSync(paths.dataOutput, { recursive: true });
  const csv = Papa.unparse(rejected);
  fs.writeFileSync(path.join(paths.dataOutput, 'rejected_contacts.csv'), csv, 'utf-8');
  console.log(`[export] Written: rejected_contacts.csv (${rejected.length} rows)`);
}

export function exportGoogleSheetsFormat(leads: FactoryLead[]): void {
  // Google Sheets import: simplified columns, flat format, BOM for UTF-8 encoding
  const rows = leads.map(lead => ({
    'Factory ID': lead.factory_id,
    'Factory Name': lead.factory_name,
    'Group': lead.group_name,
    'District': lead.district,
    'Zone': lead.industrial_zone,
    'Website': lead.website,
    'Primary Email': lead.public_emails[0] ?? '',
    'Primary Phone': lead.public_phones[0] ?? '',
    'WhatsApp': lead.normalized_whatsapp_candidates[0] ?? '',
    'LinkedIn': lead.social_links['linkedin'] ?? '',
    'Facebook': lead.social_links['facebook'] ?? '',
    'Confidence': lead.confidence_tier,
    'Confidence Score': lead.confidence_score,
    'Priority Score': lead.priority_score,
    'Sales Angle': lead.recommended_sales_angle,
    'BGMEA': lead.bgmea_signal ? 'Yes' : '',
    'BKMEA': lead.bkmea_signal ? 'Yes' : '',
    'RSC': lead.rsc_signal ? 'Yes' : '',
    'Buyer Signals': lead.buyer_signals.join(', '),
    'Compliance Signals': lead.compliance_signals.slice(0, 3).join(', '),
    'Source': lead.source_seed,
    'Last Checked': lead.last_checked_at.split('T')[0] ?? '',
    'Legal Note': lead.legal_safe_note,
  }));
  const bom = '﻿';
  const csv = bom + Papa.unparse(rows);
  fs.mkdirSync(paths.dataOutput, { recursive: true });
  fs.writeFileSync(path.join(paths.dataOutput, 'google_sheets_import.csv'), csv, 'utf-8');
  console.log(`[export] Written: google_sheets_import.csv (${leads.length} rows)`);
}

export function exportAll(leads: FactoryLead[]): void {
  exportLeadsToCsv(leads);
  exportGoogleSheetsFormat(leads);
}
