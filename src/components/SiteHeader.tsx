import { Suspense } from "react";
import Link from "next/link";
import { getCategories, getColoringPages } from "@/lib/content";
import { SearchBar } from "@/components/SearchBar";
import { CategoryDropdown } from "@/components/CategoryDropdown";
import { AgeDropdown } from "@/components/AgeDropdown";

function getSuggestions(): string[] {
  const pages = getColoringPages();
  const cats = getCategories();
  const tags = [...new Set(pages.flatMap(p => p.tags))];
  return [...new Set([...cats.map(c => c.title), ...tags])];
}

export function SiteHeader() {
  const categories = getCategories();
  const suggestions = getSuggestions();

  return (
    <header className="site-header">
      <Link className="brand" href="/">Omalovánky</Link>
      <SearchBar suggestions={suggestions} />
      <div className="header-dropdowns">
        <Suspense fallback={<button className="cat-dropdown-trigger">Věk</button>}>
          <AgeDropdown />
        </Suspense>
        <Suspense fallback={<button className="cat-dropdown-trigger">Kategorie</button>}>
          <CategoryDropdown categories={categories} />
        </Suspense>
      </div>
    </header>
  );
}
