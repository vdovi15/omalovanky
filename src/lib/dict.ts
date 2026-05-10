import type { Locale } from '@/lib/i18n';

export type Dict = typeof import('@/i18n/cs.json');

const dicts: Record<Locale, () => Promise<Dict>> = {
  cs: () => import('@/i18n/cs.json').then(m => m.default as unknown as Dict),
  en: () => import('@/i18n/en.json').then(m => m.default as unknown as Dict),
  sk: () => import('@/i18n/sk.json').then(m => m.default as unknown as Dict),
  de: () => import('@/i18n/de.json').then(m => m.default as unknown as Dict),
  pl: () => import('@/i18n/pl.json').then(m => m.default as unknown as Dict),
};

export async function getDict(lang: Locale): Promise<Dict> {
  return dicts[lang]();
}
