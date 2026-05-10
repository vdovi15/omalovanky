export const locales = ['cs', 'en', 'sk', 'de'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'cs';

export const localePaths = {
  browseAll: { cs: 'vse', en: 'all', sk: 'vsetky', de: 'alle' },
  search: { cs: 'hledat', en: 'search', sk: 'hladat', de: 'suchen' },
} satisfies Record<string, Record<Locale, string>>;

export function isValidLocale(lang: string): lang is Locale {
  return (locales as readonly string[]).includes(lang);
}

export function getHomePath(lang: Locale) { return `/${lang}`; }
export function getBrowseAllPath(lang: Locale) { return `/${lang}/${localePaths.browseAll[lang]}`; }
export function getSearchPath(lang: Locale) { return `/${lang}/${localePaths.search[lang]}`; }
export function getCategoryPath(lang: Locale, slug: string) { return `/${lang}/category/${slug}`; }
export function getColoringPath(lang: Locale, slug: string) { return `/${lang}/coloring/${slug}`; }

export function pluralizeColoring(count: number, lang: Locale): string {
  switch (lang) {
    case 'en': return count === 1 ? 'coloring page' : 'coloring pages';
    case 'sk': return count === 1 ? 'omaľovanka' : count < 5 ? 'omaľovanky' : 'omaľovaniek';
    case 'de': return count === 1 ? 'Malbild' : 'Malbilder';
    default:   return count === 1 ? 'omalovánka' : count < 5 ? 'omalovánky' : 'omalovánek';
  }
}

export function detectLocale(acceptLanguage: string): Locale {
  const lang = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase() ?? '';
  if (lang === 'sk') return 'sk';
  if (lang === 'de') return 'de';
  if (lang === 'en') return 'en';
  return 'cs';
}
