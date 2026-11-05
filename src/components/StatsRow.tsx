"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { IconDownload, IconEye, IconPrint } from "@/components/ArtworkActions";
import { recordStat, useStats } from "@/lib/stats";
import type { Locale } from "@/lib/i18n";
import type { StatKind } from "@/types/stats";

const LABELS: Record<Locale, Record<StatKind, string>> = {
  cs: { views: "Počet zobrazení", prints: "Počet tisků", downloads: "Počet stažení" },
  sk: { views: "Počet zobrazení", prints: "Počet tlačí", downloads: "Počet stiahnutí" },
  en: { views: "Number of views", prints: "Number of prints", downloads: "Number of downloads" },
  de: { views: "Anzahl der Aufrufe", prints: "Anzahl der Ausdrucke", downloads: "Anzahl der Downloads" },
  pl: { views: "Liczba wyświetleń", prints: "Liczba wydruków", downloads: "Liczba pobrań" },
};

const ICONS: Record<StatKind, (size: number) => ReactNode> = {
  views: size => <IconEye size={size} />,
  prints: size => <IconPrint size={size} />,
  downloads: size => <IconDownload size={size} />,
};

type Props = {
  slug: string;
  lang: Locale;
  trackView?: boolean;
  large?: boolean;
};

export function StatsRow({ slug, lang, trackView = false, large = false }: Props) {
  const { status, data } = useStats();
  const tracked = useRef(false);

  useEffect(() => {
    if (!trackView || tracked.current) return;
    tracked.current = true;
    recordStat("views", [slug]);
  }, [trackView, slug]);

  if (status === "error") return null;

  const format = new Intl.NumberFormat(lang, { notation: "compact", maximumFractionDigits: 1 });
  const labels = LABELS[lang];

  return (
    <div className={`stats-row${large ? " stats-row-large" : ""}`}>
      {(["views", "prints", "downloads"] as const).map(kind => {
        const count = data ? format.format(data[kind][slug] ?? 0) : "–";
        return (
          <span key={kind} className="stats-item" title={labels[kind]} aria-label={`${labels[kind]}: ${count}`}>
            {ICONS[kind](large ? 15 : 12)}
            <span aria-hidden="true">{count}</span>
          </span>
        );
      })}
    </div>
  );
}
