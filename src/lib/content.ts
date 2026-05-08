import categoriesData from "../../data/categories.json";
import coloringPagesData from "../../data/coloring-pages.json";
import type { Category, CategorySlug, ColoringPage } from "@/types/coloring";

const categories = categoriesData as Category[];
const coloringPages = coloringPagesData as ColoringPage[];

export function getCategories() {
  return categories;
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getColoringPages() {
  return [...coloringPages].sort((left, right) => left.title.localeCompare(right.title));
}

export function getFeaturedColoringPages() {
  return getColoringPages().filter((page) => page.featured);
}

export function getColoringPagesByCategory(category: CategorySlug) {
  return getColoringPages().filter((page) => page.category === category);
}

export function getColoringPageBySlug(slug: string) {
  return coloringPages.find((page) => page.slug === slug);
}
