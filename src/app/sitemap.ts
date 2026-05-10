import type { MetadataRoute } from "next";
import { getCategories, getColoringPages } from "@/lib/content";
import { LOCALE_DOMAINS } from "@/lib/config";
import { locales, localePaths, type Locale } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = getCategories();
  const pages = getColoringPages();
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    const base = LOCALE_DOMAINS[lang as Locale];
    entries.push({ url: `${base}/${lang}`, lastModified: now, changeFrequency: "weekly", priority: 1 });
    entries.push({ url: `${base}/${lang}/${localePaths.browseAll[lang as Locale]}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 });
    for (const cat of categories) {
      entries.push({ url: `${base}/${lang}/category/${cat.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.9 });
    }
    for (const page of pages) {
      entries.push({ url: `${base}/${lang}/coloring/${page.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
    }
  }

  return entries;
}
