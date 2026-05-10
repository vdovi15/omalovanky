"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(name: string, params?: EventParams) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

// Coloring page events
export const track = {
  print: (slug: string, title: string) =>
    trackEvent("coloring_print", { slug, title }),
  download: (slug: string, title: string) =>
    trackEvent("coloring_download", { slug, title }),
  view: (slug: string, title: string) =>
    trackEvent("coloring_view", { slug, title }),
  search: (query: string) =>
    trackEvent("search", { search_term: query }),
  multiPrint: (count: number) =>
    trackEvent("coloring_multi_print", { count }),
  multiDownload: (count: number) =>
    trackEvent("coloring_multi_download", { count }),
};
