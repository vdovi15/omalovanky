"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const AGE_GROUPS = [
  { label: "4–7 let", value: "4-7" },
  { label: "5–7 let", value: "5-7" },
  { label: "5–8 let", value: "5-8" },
  { label: "6–8 let", value: "6-8" },
];

export function AgeDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useSearchParams();

  const active = (params.get("age") ?? "").split(",").filter(Boolean);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function handleSelect(value: string) {
    const next = new URLSearchParams(params.toString());
    const updated = active.includes(value)
      ? active.filter(v => v !== value)
      : [...active, value];
    if (updated.length) next.set("age", updated.join(","));
    else next.delete("age");
    next.delete("q");
    router.push(`/hledat?${next.toString()}`);
  }

  const label = active.length === 0 ? "Věk"
    : active.length === 1 ? (AGE_GROUPS.find(a => a.value === active[0])?.label ?? active[0])
    : `Věk (${active.length})`;

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
        <div className="cat-dropdown-menu age-dropdown-menu">
          {AGE_GROUPS.map(ag => (
            <button
              key={ag.value}
              type="button"
              className={`cat-dropdown-item${active.includes(ag.value) ? " cat-dropdown-item-active" : ""}`}
              onClick={() => handleSelect(ag.value)}
            >
              {active.includes(ag.value) && <span className="dropdown-check">✓</span>}
              {ag.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
