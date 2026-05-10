"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { getSearchPath, type Locale } from "@/lib/i18n";

type Props = {
  suggestions: string[];
  lang: Locale;
  placeholder: string;
  ariaLabel: string;
};

export function SearchBar({ suggestions, lang, placeholder, ariaLabel }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const matches = query.trim().length > 0
    ? suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase().trim())).slice(0, 8)
    : [];

  function navigate(q: string) {
    setOpen(false);
    setQuery("");
    router.push(`${getSearchPath(lang)}?q=${encodeURIComponent(q)}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) navigate(query.trim());
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-wrap" ref={containerRef}>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        <button className="search-submit" type="submit" aria-label={ariaLabel}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </form>

      {open && matches.length > 0 && (
        <ul className="search-suggestions">
          {matches.map(s => (
            <li key={s}>
              <button type="button" onClick={() => navigate(s)}>{s}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
