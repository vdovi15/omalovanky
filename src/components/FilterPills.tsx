"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getCategories } from "@/lib/content";
import { getSearchPath, type Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";

type Props = {
  lang: Locale;
  dictAgeLabels: Dict["ageLabels"];
  dictCategories: Dict["categories"];
};

const categories = getCategories();

export function FilterPills({ lang, dictAgeLabels, dictCategories }: Props) {
  const params = useSearchParams();
  const router = useRouter();

  const ages = (params.get("age") ?? "").split(",").filter(Boolean);
  const cats = (params.get("cat") ?? "").split(",").filter(Boolean);

  if (!ages.length && !cats.length) return null;

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
    <>
      {ages.map(age => (
        <span key={age} className="filter-pill">
          {(dictAgeLabels as Record<string, string>)[age] ?? age}
          <button type="button" className="filter-pill-remove" onClick={() => removeAge(age)} aria-label="Odebrat filtr">×</button>
        </span>
      ))}
      {cats.map(cat => {
        const key = cat as keyof typeof dictCategories;
        const title = dictCategories[key]?.title ?? categories.find(c => c.slug === cat)?.title ?? cat;
        return (
          <span key={cat} className="filter-pill">
            {title}
            <button type="button" className="filter-pill-remove" onClick={() => removeCat(cat)} aria-label="Odebrat filtr">×</button>
          </span>
        );
      })}
    </>
  );
}
