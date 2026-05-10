"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { getSearchPath, type Locale } from "@/lib/i18n";
import type { Category } from "@/types/coloring";

type Props = {
  categories: Category[];
  lang: Locale;
  categoryLabel: string;
};

export function CategoryDropdown({ categories, lang, categoryLabel }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useSearchParams();

  const active = (params.get("cat") ?? "").split(",").filter(Boolean);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function handleSelect(slug: string) {
    const next = new URLSearchParams(params.toString());
    const updated = active.includes(slug)
      ? active.filter(v => v !== slug)
      : [...active, slug];
    if (updated.length) next.set("cat", updated.join(","));
    else next.delete("cat");
    next.delete("q");
    router.push(`${getSearchPath(lang)}?${next.toString()}`);
  }

  const label = active.length === 0 ? categoryLabel
    : active.length === 1 ? (categories.find(c => c.slug === active[0])?.title ?? active[0])
    : `${categoryLabel} (${active.length})`;

  return (
    <div className="cat-dropdown" ref={ref}>
      <button
        className={`cat-dropdown-trigger${active.length ? " cat-dropdown-trigger-active" : ""}`}
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points={open ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
        </svg>
      </button>

      {open && (
        <div className="cat-dropdown-menu">
          {categories.map(cat => (
            <button
              key={cat.slug}
              type="button"
              className={`cat-dropdown-item${active.includes(cat.slug) ? " cat-dropdown-item-active" : ""}`}
              onClick={() => handleSelect(cat.slug)}
            >
              {active.includes(cat.slug) && <span className="dropdown-check">✓</span>}
              {cat.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
