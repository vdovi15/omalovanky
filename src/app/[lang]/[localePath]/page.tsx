import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ColoringGrid } from "@/components/ColoringGrid";
import { SearchResults } from "@/components/SearchResults";
import { getColoringPages } from "@/lib/content";
import { isValidLocale, localePaths, type Locale, pluralizeColoring } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { localizePages } from "@/lib/localize";

type Props = { params: Promise<{ lang: string; localePath: string }> };

export async function generateStaticParams() {
  const params: { lang: string; localePath: string }[] = [];
  for (const lang of ['cs', 'en', 'sk', 'de'] as const) {
    params.push({ lang, localePath: localePaths.browseAll[lang] });
    params.push({ lang, localePath: localePaths.search[lang] });
  }
  return params;
}

function getPageType(lang: Locale, localePath: string): 'browseAll' | 'search' | null {
  if (localePath === localePaths.browseAll[lang]) return 'browseAll';
  if (localePath === localePaths.search[lang]) return 'search';
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, localePath } = await params;
  if (!isValidLocale(lang)) return {};
  const locale = lang as Locale;
  const pageType = getPageType(locale, localePath);
  if (!pageType) return {};
  const dict = await getDict(locale);
  if (pageType === 'browseAll') {
    return { title: dict.browseAll.metaTitle, description: dict.browseAll.metaDescription };
  }
  return { title: dict.search.metaTitle };
}

export default async function LocalePathPage({ params }: Props) {
  const { lang, localePath } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const pageType = getPageType(locale, localePath);
  if (!pageType) notFound();

  const dict = await getDict(locale);

  if (pageType === 'browseAll') {
    const pages = localizePages(getColoringPages(), dict, locale);
    return (
      <div className="page-stack">
        <section className="category-hero">
          <p className="eyebrow">{dict.browseAll.eyebrow}</p>
          <h1>{dict.browseAll.heading}</h1>
          <p>{pages.length} {pluralizeColoring(pages.length, locale)} {dict.browseAll.countSuffix}</p>
        </section>
        <section className="section">
          <ColoringGrid pages={pages} lang={locale} />
        </section>
      </div>
    );
  }

  return (
    <Suspense fallback={<p style={{ padding: "40px" }}>{dict.search.loading}</p>}>
      <SearchResults
        lang={locale}
        dict={dict.search}
        dictCategories={dict.categories}
        dictAgeLabels={dict.ageLabels}
        dictAgeGroups={dict.ageGroups}
      />
    </Suspense>
  );
}
