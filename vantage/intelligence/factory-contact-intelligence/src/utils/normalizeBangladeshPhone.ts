import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

export function normalizeBangladeshPhone(raw: string): string | null {
  const cleaned = raw.replace(/\s+/g, '').replace(/[().\-]/g, '');

  // Prepend +880 if the number starts with 01
  const normalized = cleaned.startsWith('01') ? `+880${cleaned.slice(1)}` : cleaned;

  try {
    if (!isValidPhoneNumber(normalized, 'BD')) return null;
    const parsed = parsePhoneNumber(normalized, 'BD');
    return parsed.format('E.164'); // "+8801XXXXXXXXX"
  } catch {
    return null;
  }
}

export function isBangladeshMobile(e164: string): boolean {
  // BD mobile numbers: +8801[3-9]XXXXXXXX
  return /^\+8801[3-9]\d{8}$/.test(e164);
}

export function deduplicatePhones(phones: string[]): string[] {
  const seen = new Set<string>();
  return phones.filter(p => {
    if (seen.has(p)) return false;
    seen.add(p);
    return true;
  });
}
