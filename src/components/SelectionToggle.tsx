"use client";

import { useSelection } from "@/components/SelectionContext";

type Props = { slug: string; imageUrl: string; title: string };

export function SelectionToggle({ slug, imageUrl, title }: Props) {
  const { toggle, isSelected, atLimit } = useSelection();
  const selected = isSelected(slug);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle({ slug, imageUrl, title });
  }

  return (
    <button
      className={`selection-toggle${selected ? " selection-toggle-active" : ""}`}
      onClick={handleClick}
      title={selected ? "Odebrat z výběru" : atLimit ? "Maximálně 10 stránek" : "Přidat do výběru"}
      aria-pressed={selected}
      type="button"
    >
      {selected ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      )}
    </button>
  );
}
