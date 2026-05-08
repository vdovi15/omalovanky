import type { MetadataRoute } from "next";
import { getCategories, getColoringPages } from "@/lib/content";
import { SITE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = getCategories();
  const pages = getColoringPages();
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/vse`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...categories.map(cat => ({
      url: `${SITE_URL}/category/${cat.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...pages.map(page => ({
      url: `${SITE_URL}/coloring/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
