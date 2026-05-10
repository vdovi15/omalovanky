"use client";

import { useSelection } from "@/components/SelectionContext";
import { pluralizeColoring, type Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";

type Props = {
  dict: Dict["selection"];
  lang?: Locale;
};

export function SelectionBar({ dict, lang = "cs" }: Props) {
  const { items, clear, downloadAll, printAll, atLimit } = useSelection();

  if (items.length === 0) return null;

  return (
    <div className="selection-bar">
      <span className="selection-bar-count">
        {items.length} {pluralizeColoring(items.length, lang)} {dict.selectedSuffix}
        {atLimit && <span className="selection-bar-limit"> · {dict.limitReached}</span>}
      </span>
      <div className="selection-bar-actions">
        <button className="button button-secondary" type="button" onClick={clear}>
          {dict.cancel}
        </button>
        <button className="button button-secondary" type="button" onClick={printAll}>
          {dict.print} ({items.length})
        </button>
        <button className="button button-primary" type="button" onClick={downloadAll}>
          {dict.download} ({items.length})
        </button>
      </div>
    </div>
  );
}
