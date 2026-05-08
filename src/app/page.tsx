import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { ColoringGrid } from "@/components/ColoringGrid";
import { Hero } from "@/components/Hero";
import {
  getCategories,
  getColoringPages,
  getColoringPagesByCategory,
  getFeaturedColoringPages
} from "@/lib/content";

export default function HomePage() {
  const categories = getCategories();
  const featuredPages = getFeaturedColoringPages();
  const totalCount = getColoringPages().length;

  return (
    <div className="page-stack">
      <Hero />

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Kategorie</p>
          <h2>Co chceš dnes vybarvovat?</h2>
        </div>
        <div className="category-grid">
          {categories.map((category, i) => (
            <CategoryCard
              key={category.slug}
              category={category}
              count={getColoringPagesByCategory(category.slug).length}
              priority={i < 5}
            />
          ))}
          <Link className="browse-all-card" href="/vse">
            <span className="browse-all-icon">→</span>
            <span className="browse-all-title">Procházet vše</span>
            <span className="browse-all-count">{totalCount} omalovánek</span>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Doporučené</p>
          <h2>Oblíbené omalovánky k tisku</h2>
        </div>
        <ColoringGrid pages={featuredPages} />
      </section>
    </div>
  );
}
