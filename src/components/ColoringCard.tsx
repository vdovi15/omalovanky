import Image from "next/image";
import Link from "next/link";
import { ArtworkActions } from "@/components/ArtworkActions";
import { SelectionToggle } from "@/components/SelectionToggle";
import { categoryThemes } from "@/lib/categories";
import { getCategoryBySlug } from "@/lib/content";
import type { ColoringPage } from "@/types/coloring";

type ColoringCardProps = {
  page: ColoringPage;
};

const ageClass: Record<string, string> = {
  "4-7": "badge-age-4-7",
  "5-8": "badge-age-5-8",
  "6-8": "badge-age-6-8",
};

export function ColoringCard({ page }: ColoringCardProps) {
  const theme = categoryThemes[page.category];
  const category = getCategoryBySlug(page.category);

  return (
    <article className={`coloring-card ${theme.cardClassName}`}>
      <Link className="coloring-card-link" href={`/coloring/${page.slug}`}>
        <div className="coloring-image-wrap">
          <SelectionToggle slug={page.slug} imageUrl={page.image} title={page.title} />
          <Image
            className="coloring-image"
            src={page.image}
            alt={`Omalovánka ${page.title} zdarma k tisku`}
            width={1024}
            height={1536}
            sizes="(max-width: 720px) 100vw, (max-width: 960px) 33vw, 20vw"
          />
        </div>
        <div className="coloring-card-body">
          <div className="card-badges">
            <span className={`badge ${ageClass[page.ageGroup] ?? "badge-age-4-7"}`}>{page.ageGroup}</span>
            <span className={`badge ${theme.accentClassName}`}>{category?.title}</span>
          </div>
          <h3>{page.title}</h3>
          <p>{page.description}</p>
        </div>
      </Link>
      <div className="coloring-card-actions">
        <ArtworkActions
          compact
          detailHref={`/coloring/${page.slug}`}
          imageUrl={page.image}
          title={page.title}
        />
      </div>
    </article>
  );
}
