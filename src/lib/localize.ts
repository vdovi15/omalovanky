import type { Dict } from "@/lib/dict";
import type { ColoringPage, Category } from "@/types/coloring";
import type { Locale } from "@/lib/i18n";

export function localizePages(pages: ColoringPage[], dict: Dict, lang: Locale): ColoringPage[] {
  const titles = dict.pages as Record<string, { title: string }>;
  return pages
    .map(page => ({ ...page, title: titles[page.slug]?.title ?? page.title }))
    .sort((a, b) => a.title.localeCompare(b.title, lang));
}

export function localizeCategories(categories: Category[], dict: Dict): Category[] {
  const cats = dict.categories as Record<string, { title: string; description: string }>;
  return categories.map(cat => ({ ...cat, ...(cats[cat.slug] ?? {}) }));
}
