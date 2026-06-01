export function normalizeFactoryName(raw: string): string {
  return raw
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\bltd\.?\b/gi, 'Ltd')
    .replace(/\bpvt\.?\b/gi, 'Pvt')
    .replace(/\binc\.?\b/gi, 'Inc')
    .replace(/\bco\.?\b/gi, 'Co')
    .replace(/\(bangladesh\)/gi, '(Bangladesh)');
}

export function factoryNameMatchScore(a: string, b: string): number {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const na = normalize(a);
  const nb = normalize(b);
  if (na === nb) return 1.0;
  if (na.includes(nb) || nb.includes(na)) return 0.85;
  // Simple bigram overlap
  const bigrams = (s: string) => {
    const bg = new Set<string>();
    for (let i = 0; i < s.length - 1; i++) bg.add(s.slice(i, i + 2));
    return bg;
  };
  const ba = bigrams(na);
  const bb = bigrams(nb);
  let overlap = 0;
  for (const g of ba) if (bb.has(g)) overlap++;
  return (2 * overlap) / (ba.size + bb.size);
}
