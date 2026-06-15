import type { CategorySlug } from "@/types/coloring";

type CategoryTheme = {
  badge: string;
  cardClassName: string;
  accentClassName: string;
};

export const categoryThemes: Record<CategorySlug, CategoryTheme> = {
  cars: {
    badge: "Vrrrr",
    cardClassName: "theme-cars",
    accentClassName: "accent-cars"
  },
  animals: {
    badge: "Divoká",
    cardClassName: "theme-animals",
    accentClassName: "accent-animals"
  },
  princesses: {
    badge: "Kouzelné",
    cardClassName: "theme-princesses",
    accentClassName: "accent-princesses"
  },
  flowers: {
    badge: "Kvetoucí",
    cardClassName: "theme-flowers",
    accentClassName: "accent-flowers"
  },
  space: {
    badge: "Vesmír",
    cardClassName: "theme-space",
    accentClassName: "accent-space"
  },
  dinosaurs: {
    badge: "Rawr",
    cardClassName: "theme-dinosaurs",
    accentClassName: "accent-dinosaurs"
  },
  ocean: {
    badge: "Moře",
    cardClassName: "theme-ocean",
    accentClassName: "accent-ocean"
  },
  fairytales: {
    badge: "Pohádka",
    cardClassName: "theme-fairytales",
    accentClassName: "accent-fairytales"
  },
  food: {
    badge: "Mňam",
    cardClassName: "theme-food",
    accentClassName: "accent-food"
  },
  sports: {
    badge: "Hýbej se",
    cardClassName: "theme-sports",
    accentClassName: "accent-sports"
  },
  buildings: {
    badge: "Stavby",
    cardClassName: "theme-buildings",
    accentClassName: "accent-buildings"
  },
  clothes: {
    badge: "Móda",
    cardClassName: "theme-clothes",
    accentClassName: "accent-clothes"
  },
  jobs: {
    badge: "Povolání",
    cardClassName: "theme-jobs",
    accentClassName: "accent-jobs"
  },
  mythical: {
    badge: "Kouzlo",
    cardClassName: "theme-mythical",
    accentClassName: "accent-mythical"
  },
  holidays: {
    badge: "Oslava",
    cardClassName: "theme-holidays",
    accentClassName: "accent-holidays"
  },
  insects: {
    badge: "Bzzz",
    cardClassName: "theme-insects",
    accentClassName: "accent-insects"
  }
};
