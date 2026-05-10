import { ColoringCard } from "@/components/ColoringCard";
import type { ColoringPage } from "@/types/coloring";
import type { Locale } from "@/lib/i18n";

type ColoringGridProps = {
  pages: ColoringPage[];
  lang: Locale;
};

export function ColoringGrid({ pages, lang }: ColoringGridProps) {
  return (
    <div className="coloring-grid">
      {pages.map(page => (
        <ColoringCard key={page.slug} page={page} lang={lang} />
      ))}
    </div>
  );
}
