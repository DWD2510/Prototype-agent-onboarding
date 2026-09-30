/**
 * Normalizes Vietnamese text by removing diacritics and converting to lowercase.
 */
export function normalizeVietnamese(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .trim();
}

/**
 * Checks if target string includes any of the given keywords (accent-insensitive)
 */
export function matchesKeywords(text: string, keywords: string[]): boolean {
  const normalizedText = normalizeVietnamese(text);
  return keywords.some(kw => normalizedText.includes(normalizeVietnamese(kw)));
}
