"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ColoringGrid } from "@/components/ColoringGrid";
import { getColoringPages, getCategories } from "@/lib/content";
import type { ColoringPage } from "@/types/coloring";

const AGE_LABELS: Record<string, string> = {
  "4-7": "věk 4–7",
  "5-7": "věk 5–7",
  "5-8": "věk 5–8",
  "6-8": "věk 6–8",
};

const pages = getColoringPages();
const categories = getCategories();

function filter(query: string, ages: string[], cats: string[]): ColoringPage[] {
  return pages.filter(page => {
    // OR within age group
    const matchesAge = ages.length === 0 || ages.includes(page.ageGroup);
    // OR within categories
    const matchesCat = cats.length === 0 || cats.includes(page.category);
    // AND across groups
    if (!matchesAge || !matchesCat) return false;
    // text query
    if (!query) return true;
    const q = query.toLowerCase();
    const categoryTitle = categories.find(c => c.slug === page.category)?.title ?? "";
    return (
      page.tags.some(tag => tag.toLowerCase().includes(q)) ||
      page.category.toLowerCase().includes(q) ||
      categoryTitle.toLowerCase().includes(q) ||
      page.ageGroup.includes(q)
    );
  });
}

function buildLabel(query: string, ages: string[], cats: string[]): string {
  const parts: string[] = [];
  if (query) parts.push(`„${query}"`);
  if (ages.length) parts.push(ages.map(a => `věk ${a}`).join(" nebo "));
  if (cats.length) parts.push(cats.map(s => categories.find(c => c.slug === s)?.title ?? s).join(" nebo "));
  return parts.join(" · ") || "Všechny omalovánky";
}

export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("q") ?? "";
  const ages  = (params.get("age") ?? "").split(",").filter(Boolean);
  const cats  = (params.get("cat") ?? "").split(",").filter(Boolean);

  const results = filter(query, ages, cats);
  const label = buildLabel(query, ages, cats);

  function removeAge(val: string) {
    const next = new URLSearchParams(params.toString());
    const remaining = ages.filter(a => a !== val);
    if (remaining.length) next.set("age", remaining.join(","));
    else next.delete("age");
    router.push(`/hledat?${next.toString()}`);
  }

  function removeCat(val: string) {
    const next = new URLSearchParams(params.toString());
    const remaining = cats.filter(c => c !== val);
    if (remaining.length) next.set("cat", remaining.join(","));
    else next.delete("cat");
    router.push(`/hledat?${next.toString()}`);
  }

  return (
    <div className="page-stack">
      <section className="category-hero">
        <p className="eyebrow">Výsledky filtrování</p>
        <h1>{label}</h1>
        <p>
          {results.length === 0
            ? "Nic nenalezeno."
            : `${results.length} ${results.length === 1 ? "omalovánka" : results.length < 5 ? "omalovánky" : "omalovánek"}`}
        </p>
        {(ages.length > 0 || cats.length > 0) && (
          <div className="filter-pills-row">
            {ages.map(age => (
              <span key={age} className="filter-pill">
                {AGE_LABELS[age] ?? age}
                <button type="button" className="filter-pill-remove" onClick={() => removeAge(age)}>×</button>
              </span>
            ))}
            {cats.map(cat => (
              <span key={cat} className="filter-pill">
                {categories.find(c => c.slug === cat)?.title ?? cat}
                <button type="button" className="filter-pill-remove" onClick={() => removeCat(cat)}>×</button>
              </span>
            ))}
          </div>
        )}
      </section>
      {results.length > 0 && (
        <section className="section">
          <ColoringGrid pages={results} />
        </section>
      )}
    </div>
  );
}
