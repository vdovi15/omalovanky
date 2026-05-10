"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ColoringGrid } from "@/components/ColoringGrid";
import { getColoringPages, getCategories } from "@/lib/content";
import { getSearchPath, pluralizeColoring, type Locale } from "@/lib/i18n";
import type { ColoringPage } from "@/types/coloring";
import type { Dict } from "@/lib/dict";

type Props = {
  lang: Locale;
  dict: Dict["search"];
  dictCategories: Dict["categories"];
  dictAgeLabels: Dict["ageLabels"];
  dictAgeGroups?: Dict["ageGroups"];
};

const allPages = getColoringPages();
const allCategories = getCategories();

function filter(query: string, ages: string[], cats: string[]): ColoringPage[] {
  return allPages.filter(page => {
    const matchesAge = ages.length === 0 || ages.includes(page.ageGroup);
    const matchesCat = cats.length === 0 || cats.includes(page.category);
    if (!matchesAge || !matchesCat) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    const categoryTitle = allCategories.find(c => c.slug === page.category)?.title ?? "";
    return (
      page.tags.some(tag => tag.toLowerCase().includes(q)) ||
      page.category.toLowerCase().includes(q) ||
      categoryTitle.toLowerCase().includes(q) ||
      page.ageGroup.includes(q)
    );
  });
}

export function SearchResults({ lang, dict, dictCategories, dictAgeLabels }: Props) {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("q") ?? "";
  const ages  = (params.get("age") ?? "").split(",").filter(Boolean);
  const cats  = (params.get("cat") ?? "").split(",").filter(Boolean);

  const results = filter(query, ages, cats);

  const parts: string[] = [];
  if (query) parts.push(`„${query}"`);
  if (ages.length) parts.push(ages.map(a => `${dict.agePrefix} ${a}`).join(" / "));
  if (cats.length) {
    parts.push(cats.map(s => {
      const key = s as keyof typeof dictCategories;
      return dictCategories[key]?.title ?? allCategories.find(c => c.slug === s)?.title ?? s;
    }).join(" / "));
  }
  const label = parts.join(" · ") || dict.allLabel;

  function removeAge(val: string) {
    const next = new URLSearchParams(params.toString());
    const remaining = ages.filter(a => a !== val);
    if (remaining.length) next.set("age", remaining.join(","));
    else next.delete("age");
    router.push(`${getSearchPath(lang)}?${next.toString()}`);
  }

  function removeCat(val: string) {
    const next = new URLSearchParams(params.toString());
    const remaining = cats.filter(c => c !== val);
    if (remaining.length) next.set("cat", remaining.join(","));
    else next.delete("cat");
    router.push(`${getSearchPath(lang)}?${next.toString()}`);
  }

  return (
    <div className="page-stack">
      <section className="category-hero">
        <p className="eyebrow">{dict.eyebrow}</p>
        <h1>{label}</h1>
        <p>
          {results.length === 0
            ? dict.empty
            : `${results.length} ${pluralizeColoring(results.length, lang)}`}
        </p>
        {(ages.length > 0 || cats.length > 0) && (
          <div className="filter-pills-row">
            {ages.map(age => (
              <span key={age} className="filter-pill">
                {(dictAgeLabels as Record<string, string>)[age] ?? age}
                <button type="button" className="filter-pill-remove" onClick={() => removeAge(age)}>×</button>
              </span>
            ))}
            {cats.map(cat => {
              const key = cat as keyof typeof dictCategories;
              const title = dictCategories[key]?.title ?? allCategories.find(c => c.slug === cat)?.title ?? cat;
              return (
                <span key={cat} className="filter-pill">
                  {title}
                  <button type="button" className="filter-pill-remove" onClick={() => removeCat(cat)}>×</button>
                </span>
              );
            })}
          </div>
        )}
      </section>
      {results.length > 0 && (
        <section className="section">
          <ColoringGrid pages={results} lang={lang} />
        </section>
      )}
    </div>
  );
}
