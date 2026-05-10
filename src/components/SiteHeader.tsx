import { Suspense } from "react";
import Link from "next/link";
import { getCategories, getColoringPages } from "@/lib/content";
import { SearchBar } from "@/components/SearchBar";
import { CategoryDropdown } from "@/components/CategoryDropdown";
import { AgeDropdown } from "@/components/AgeDropdown";
import { getHomePath, type Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";

type SiteHeaderProps = {
  lang: Locale;
  dict: Dict["header"];
};

function getSuggestions(): string[] {
  const pages = getColoringPages();
  const cats = getCategories();
  const tags = [...new Set(pages.flatMap(p => p.tags))];
  return [...new Set([...cats.map(c => c.title), ...tags])];
}

export function SiteHeader({ lang, dict }: SiteHeaderProps) {
  const categories = getCategories();
  const suggestions = getSuggestions();

  return (
    <header className="site-header">
      <Link className="brand" href={getHomePath(lang)}>{dict.brand}</Link>
      <SearchBar suggestions={suggestions} lang={lang} placeholder={dict.searchPlaceholder} ariaLabel={dict.searchAriaLabel} />
      <div className="header-dropdowns">
        <Suspense fallback={<button className="cat-dropdown-trigger">{dict.age}</button>}>
          <AgeDropdown lang={lang} ageLabel={dict.age} />
        </Suspense>
        <Suspense fallback={<button className="cat-dropdown-trigger">{dict.category}</button>}>
          <CategoryDropdown categories={categories} lang={lang} categoryLabel={dict.category} />
        </Suspense>
      </div>
    </header>
  );
}
