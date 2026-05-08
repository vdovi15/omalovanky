import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtworkActions } from "@/components/ArtworkActions";
import { categoryThemes } from "@/lib/categories";
import { getColoringPageBySlug, getColoringPages, getCategoryBySlug } from "@/lib/content";
import { SITE_URL } from "@/lib/config";

type ColoringDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getColoringPages().map((page) => ({
    slug: page.slug
  }));
}

export async function generateMetadata({
  params
}: ColoringDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getColoringPageBySlug(slug);

  if (!page) {
    return {
      title: "Coloring Page Not Found"
    };
  }

  const category = getCategoryBySlug(page.category);
  return {
    title: `Omalovánka ${page.title} zdarma k tisku`,
    description: `${page.description} Zdarma tisknutelná omalovánka pro děti ve věku ${page.ageGroup} let. Stáhni a tiskni bez registrace.`,
    keywords: [`omalovánka ${page.title.toLowerCase()}`, "omalovánky zdarma", "omalovánky k tisku", ...(page.tags)],
    openGraph: {
      title: `Omalovánka ${page.title} — zdarma k tisku`,
      description: page.description,
      url: `${SITE_URL}/coloring/${page.slug}`,
      images: [{ url: page.image, width: 1024, height: 1536, alt: page.title }],
    },
    alternates: { canonical: `${SITE_URL}/coloring/${page.slug}` },
  };
}

export default async function ColoringDetailPage({
  params
}: ColoringDetailPageProps) {
  const { slug } = await params;
  const page = getColoringPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const theme = categoryThemes[page.category];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: `Omalovánka ${page.title}`,
    description: page.description,
    contentUrl: `${SITE_URL}${page.image}`,
    thumbnailUrl: `${SITE_URL}${page.image}`,
    keywords: page.tags.join(", "),
    educationalUse: "Coloring activity",
    typicalAgeRange: page.ageGroup,
    inLanguage: "cs",
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
            alt={`Omalovánka ${page.title} zdarma k tisku`}
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
          <div className="tag-list" aria-label="Štítky omalovánky">
            {page.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
          <div className="detail-actions">
            <Link className="icon-button" href={`/category/${page.category}`} title="Zpět na kategorii">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
            </Link>
            <ArtworkActions imageUrl={page.image} title={page.title} />
          </div>
        </div>
      </section>
    </div>
  );
}
