import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ColoringGrid } from "@/components/ColoringGrid";
import { categoryThemes } from "@/lib/categories";
import { getCategories, getCategoryBySlug, getColoringPagesByCategory } from "@/lib/content";
import { isValidLocale, type Locale, pluralizeColoring } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { localizePages, localizeCategories } from "@/lib/localize";
import { getLocaleOrigin } from "@/lib/config";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  const categories = getCategories();
  const params: { lang: string; slug: string }[] = [];
  for (const lang of ['cs', 'en', 'sk', 'de']) {
    for (const cat of categories) {
      params.push({ lang, slug: cat.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) return {};
  const locale = lang as Locale;
  const dict = await getDict(locale);
  const cats = localizeCategories(getCategories(), dict);
  const category = cats.find(c => c.slug === slug);
  if (!category) return {};
  const pages = getColoringPagesByCategory(category.slug);
  const canonical = `${getLocaleOrigin(locale)}/${lang}/category/${slug}`;
  return {
    title: `${category.title} — ${dict.browseAll.metaTitle}`,
    description: `${category.description} ${pages.length} ${pluralizeColoring(pages.length, locale)} ${dict.browseAll.countSuffix}`,
    openGraph: {
      images: [{ url: category.coverImage, width: 520, height: 780, alt: category.title }],
    },
    alternates: { canonical },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDict(locale);

  const rawCategory = getCategoryBySlug(slug);
  if (!rawCategory) notFound();

  const cats = localizeCategories(getCategories(), dict);
  const category = cats.find(c => c.slug === slug)!;
  const rawPages = getColoringPagesByCategory(category.slug);
  const pages = localizePages(rawPages, dict, locale);
  const theme = categoryThemes[category.slug];
  const count = pages.length;

  return (
    <div className="page-stack">
      <section className={`category-hero ${theme.cardClassName}`}>
        <p className="eyebrow">{dict.category.eyebrow}</p>
        <h1>{category.title}</h1>
        <p>{category.description}</p>
        <span className={`badge ${theme.accentClassName}`}>
          {count} {pluralizeColoring(count, locale)}
        </span>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">{dict.category.pagesEyebrow}</p>
          <h2>{dict.category.pagesHeading}</h2>
        </div>
        <ColoringGrid pages={pages} lang={locale} />
      </section>
    </div>
  );
}
