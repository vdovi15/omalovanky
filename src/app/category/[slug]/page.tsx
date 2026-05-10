import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ColoringGrid } from "@/components/ColoringGrid";
import { categoryThemes } from "@/lib/categories";
import {
  getCategories,
  getCategoryBySlug,
  getColoringPagesByCategory
} from "@/lib/content";
import { SITE_URL } from "@/lib/config";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getCategories().map((category) => ({
    slug: category.slug
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found"
    };
  }

  const pages = getColoringPagesByCategory(category.slug as any);
  return {
    robots: { index: false },
    title: `Omalovánky ${category.title} zdarma k tisku`,
    description: `${category.description} ${pages.length} omalovánek zdarma ke stažení a tisku. Bez registrace.`,
    keywords: [`omalovánky ${category.title.toLowerCase()}`, "omalovánky zdarma", "omalovánky k tisku", "tisknutelné omalovánky"],
    openGraph: {
      title: `Omalovánky ${category.title} zdarma`,
      description: category.description,
      url: `${SITE_URL}/category/${category.slug}`,
      images: [{ url: category.coverImage, width: 520, height: 780, alt: category.title }],
    },
    alternates: { canonical: `${SITE_URL}/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const pages = getColoringPagesByCategory(category.slug);
  const theme = categoryThemes[category.slug];

  return (
    <div className="page-stack">
      <section className={`category-hero ${theme.cardClassName}`}>
        <p className="eyebrow">Kategorie</p>
        <h1>{category.title}</h1>
        <p>{category.description}</p>
        <span className={`badge ${theme.accentClassName}`}>{pages.length} {pages.length === 1 ? "omalovánka" : pages.length < 5 ? "omalovánky" : "omalovánek"}</span>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Všechny stránky</p>
          <h2>Klikni na omalovánku pro tisk nebo stažení</h2>
        </div>
        <ColoringGrid pages={pages} lang="cs" />
      </section>
    </div>
  );
}
