import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtworkActions } from "@/components/ArtworkActions";
import { categoryThemes } from "@/lib/categories";
import { getColoringPageBySlug, getColoringPages } from "@/lib/content";
import { isValidLocale, type Locale, getCategoryPath } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { localizeCategories } from "@/lib/localize";
import { getCategories } from "@/lib/content";
import { SITE_URL, getLocaleOrigin } from "@/lib/config";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  const pages = getColoringPages();
  const params: { lang: string; slug: string }[] = [];
  for (const lang of ['cs', 'en', 'sk', 'de']) {
    for (const page of pages) {
      params.push({ lang, slug: page.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) return {};
  const locale = lang as Locale;
  const dict = await getDict(locale);
  const rawPage = getColoringPageBySlug(slug);
  if (!rawPage) return {};
  const titles = dict.pages as Record<string, { title: string }>;
  const title = titles[slug]?.title ?? rawPage.title;
  return {
    title,
    description: rawPage.description,
    openGraph: {
      images: [{ url: rawPage.image, width: 1024, height: 1536, alt: title }],
    },
    alternates: { canonical: `${getLocaleOrigin(locale)}/${lang}/coloring/${slug}` },
  };
}

export default async function ColoringDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDict(locale);

  const rawPage = getColoringPageBySlug(slug);
  if (!rawPage) notFound();

  const titles = dict.pages as Record<string, { title: string }>;
  const localizedTitle = titles[slug]?.title ?? rawPage.title;
  const page = { ...rawPage, title: localizedTitle };

  const cats = localizeCategories(getCategories(), dict);
  const category = cats.find(c => c.slug === page.category);
  const theme = categoryThemes[page.category];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: page.title,
    description: page.description,
    contentUrl: `${SITE_URL}${page.image}`,
    thumbnailUrl: `${SITE_URL}${page.image}`,
    keywords: page.tags.join(", "),
    educationalUse: "Coloring activity",
    typicalAgeRange: page.ageGroup,
    inLanguage: lang,
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
  };

  return (
    <div className="page-stack">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="detail-layout">
        <div className="detail-art">
          <Image
            src={page.image}
            alt={page.title}
            width={1024}
            height={1536}
            sizes="(max-width: 960px) 100vw, 60vw"
            priority
          />
        </div>
        <div className={`detail-copy ${theme.cardClassName}`}>
          <span className={`badge ${theme.accentClassName}`}>{page.ageGroup}</span>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <div className="tag-list" aria-label={dict.coloring.tagsAriaLabel}>
            {page.tags.map(tag => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
          <div className="detail-actions">
            <Link
              className="icon-button"
              href={getCategoryPath(locale, page.category)}
              title={dict.coloring.backTitle}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
            </Link>
            <ArtworkActions
              imageUrl={page.image}
              title={page.title}
              dict={dict.artwork}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
