import type { Locale } from "@/lib/i18n";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://moje-omalovanky.cz";
export const SITE_NAME = "Omalovánky";
export const SITE_DESCRIPTION =
  "Zdarma tisknutelné omalovánky pro děti. Zvířata, auta, dinosauři, vesmír, povolání, budovy a 13 dalších kategorií. Přes 100 omalovánek ke stažení a tisku, bez registrace.";

// Domain for each locale — update placeholders once domains are purchased.
// CS and SK share the same domain; SK is served at /sk/ path.
export const LOCALE_DOMAINS: Record<Locale, string> = {
  cs: "https://moje-omalovanky.cz",
  sk: "https://moje-omalovanky.cz",
  en: "https://ENGLISH_DOMAIN_PLACEHOLDER",  // e.g. https://tiny-palette.com
  de: "https://GERMAN_DOMAIN_PLACEHOLDER",   // e.g. https://malvorlagen-kids.de
  pl: "https://POLISH_DOMAIN_PLACEHOLDER",   // e.g. https://kolorowanki-dzieci.pl
};

export function getLocaleOrigin(lang: Locale): string {
  return LOCALE_DOMAINS[lang];
}
