"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getCategories } from "@/lib/content";

const AGE_LABELS: Record<string, string> = {
  "4-7": "věk 4–7",
  "5-8": "věk 5–8",
  "6-8": "věk 6–8",
};

const categories = getCategories();

export function FilterPills() {
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
    <>
      {ages.map(age => (
        <span key={age} className="filter-pill">
          {AGE_LABELS[age] ?? age}
          <button type="button" className="filter-pill-remove" onClick={() => removeAge(age)} aria-label="Odebrat filtr">×</button>
        </span>
      ))}
      {cats.map(cat => (
        <span key={cat} className="filter-pill">
          {categories.find(c => c.slug === cat)?.title ?? cat}
          <button type="button" className="filter-pill-remove" onClick={() => removeCat(cat)} aria-label="Odebrat filtr">×</button>
        </span>
      ))}
    </>
  );
}
