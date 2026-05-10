"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Dict } from "@/lib/dict";
import { track } from "@/lib/analytics";

const MAX = 10;

type Item = { slug: string; imageUrl: string; title: string };

type SelectionCtx = {
  items: Item[];
  toggle: (item: Item) => void;
  isSelected: (slug: string) => boolean;
  clear: () => void;
  downloadAll: () => Promise<void>;
  printAll: () => void;
  atLimit: boolean;
};

const Ctx = createContext<SelectionCtx | null>(null);

type ProviderProps = {
  children: ReactNode;
  dict?: { printTitle: string };
};

const DEFAULT_DICT = { printTitle: "Omalovánky" };

export function SelectionProvider({ children, dict = DEFAULT_DICT }: ProviderProps) {
  const [items, setItems] = useState<Item[]>([]);

  function toggle(item: Item) {
    setItems(prev => {
      if (prev.some(i => i.slug === item.slug)) return prev.filter(i => i.slug !== item.slug);
      if (prev.length >= MAX) return prev;
      return [...prev, item];
    });
  }

  function isSelected(slug: string) {
    return items.some(i => i.slug === slug);
  }

  function clear() { setItems([]); }

  async function downloadAll() {
    track.multiDownload(items.length);
    for (let i = 0; i < items.length; i++) {
      const a = document.createElement("a");
      a.href = items[i].imageUrl;
      a.download = `${items[i].slug}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (i < items.length - 1) await new Promise(r => setTimeout(r, 400));
    }
  }

  function printAll() {
    track.multiPrint(items.length);
    const origin = window.location.origin;
    const images = items.map(i => {
      const url = i.imageUrl.startsWith("http") ? i.imageUrl : `${origin}${i.imageUrl}`;
      return `<div class="page"><img src="${url}" alt="${i.title}" /></div>`;
    }).join("");

    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<!doctype html>
<html>
  <head>
    <title>${dict.printTitle}</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      @page { margin: 10mm; }
      .page {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
        page-break-after: always;
      }
      .page:last-child { page-break-after: auto; }
      img { max-width: 100%; max-height: 100%; object-fit: contain; }
    </style>
  </head>
  <body>${images}</body>
</html>`);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 500);
  }

  return (
    <Ctx.Provider value={{ items, toggle, isSelected, clear, downloadAll, printAll, atLimit: items.length >= MAX }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSelection() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSelection must be used within SelectionProvider");
  return ctx;
}
