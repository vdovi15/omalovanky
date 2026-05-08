import { ColoringCard } from "@/components/ColoringCard";
import type { ColoringPage } from "@/types/coloring";

type ColoringGridProps = {
  pages: ColoringPage[];
};

export function ColoringGrid({ pages }: ColoringGridProps) {
  return (
    <div className="coloring-grid">
      {pages.map((page) => (
        <ColoringCard key={page.slug} page={page} />
      ))}
    </div>
  );
}
