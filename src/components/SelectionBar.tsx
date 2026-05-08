"use client";

import { useSelection } from "@/components/SelectionContext";

export function SelectionBar() {
  const { items, clear, downloadAll, printAll, atLimit } = useSelection();

  if (items.length === 0) return null;

  return (
    <div className="selection-bar">
      <span className="selection-bar-count">
        {items.length} {items.length === 1 ? "omalovánka" : items.length < 5 ? "omalovánky" : "omalovánek"} vybrány
        {atLimit && <span className="selection-bar-limit"> · maximum dosaženo</span>}
      </span>
      <div className="selection-bar-actions">
        <button className="button button-secondary" type="button" onClick={clear}>
          Zrušit výběr
        </button>
        <button className="button button-secondary" type="button" onClick={printAll}>
          Tisknout ({items.length})
        </button>
        <button className="button button-primary" type="button" onClick={downloadAll}>
          Stáhnout ({items.length})
        </button>
      </div>
    </div>
  );
}
