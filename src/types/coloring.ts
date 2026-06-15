export type CategorySlug = "cars" | "animals" | "princesses" | "flowers" | "space" | "dinosaurs" | "ocean" | "fairytales" | "food" | "sports" | "buildings" | "clothes" | "jobs" | "mythical" | "holidays" | "insects";

export type Category = {
  slug: CategorySlug;
  title: string;
  description: string;
  coverImage: string;
};

export type ColoringPage = {
  slug: string;
  title: string;
  description: string;
  category: CategorySlug;
  image: string;
  prompt: string;
  featured: boolean;
  ageGroup: string;
  tags: string[];
};
