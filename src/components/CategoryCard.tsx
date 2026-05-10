import Image from "next/image";
import Link from "next/link";
import { categoryThemes } from "@/lib/categories";
import { getCategoryPath, pluralizeColoring, type Locale } from "@/lib/i18n";
import type { Category } from "@/types/coloring";

type CategoryCardProps = {
  category: Category;
  count: number;
  priority?: boolean;
  lang: Locale;
};

export function CategoryCard({ category, count, priority = false, lang }: CategoryCardProps) {
  const theme = categoryThemes[category.slug];

  return (
    <Link className={`category-card ${theme.cardClassName}`} href={getCategoryPath(lang, category.slug)}>
      <div className="category-card-image">
        <Image
          src={category.coverImage}
          alt={category.title}
          width={520}
          height={780}
          sizes="(max-width: 720px) 100vw, (max-width: 960px) 33vw, 20vw"
          priority={priority}
        />
      </div>
      <div className="category-card-body">
        <h2>{category.title}</h2>
        <p>{category.description}</p>
        <span className="category-meta">{count} {pluralizeColoring(count, lang)}</span>
      </div>
    </Link>
  );
}
