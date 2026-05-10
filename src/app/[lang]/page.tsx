import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryCard } from "@/components/CategoryCard";
import { ColoringGrid } from "@/components/ColoringGrid";
import { Hero } from "@/components/Hero";
import { getCategories, getColoringPagesByCategory, getFeaturedColoringPages, getColoringPages } from "@/lib/content";
import { isValidLocale, type Locale, getBrowseAllPath, pluralizeColoring } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { localizePages, localizeCategories } from "@/lib/localize";
import { getLocaleOrigin } from "@/lib/config";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const dict = await getDict(lang);
  const locale = lang as Locale;
  return {
    title: dict.site.name,
    description: dict.site.description,
    alternates: { canonical: `${getLocaleOrigin(locale)}/${lang}` },
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDict(locale);

  const categories = localizeCategories(getCategories(), dict);
  const allPages = localizePages(getColoringPages(), dict, locale);
  const featuredPages = allPages.filter(p => p.featured);

  return (
    <div className="page-stack">
      <Hero dict={dict.hero} />

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">{dict.home.categoriesEyebrow}</p>
          <h2>{dict.home.categoriesHeading}</h2>
        </div>
        <div className="category-grid">
          {categories.map((category, i) => (
            <CategoryCard
              key={category.slug}
              category={category}
              count={getColoringPagesByCategory(category.slug).length}
              priority={i < 5}
              lang={locale}
            />
          ))}
          <Link className="browse-all-card" href={getBrowseAllPath(locale)}>
            <span className="browse-all-icon">→</span>
            <span className="browse-all-title">{dict.home.browseAllTitle}</span>
            <span className="browse-all-count">{allPages.length} {pluralizeColoring(allPages.length, locale)}</span>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">{dict.home.featuredEyebrow}</p>
          <h2>{dict.home.featuredHeading}</h2>
        </div>
        <ColoringGrid pages={featuredPages} lang={locale} />
      </section>
    </div>
  );
}
