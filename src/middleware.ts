import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

// ---------------------------------------------------------------------------
// Domain → locale mapping
// Replace placeholder values once domains are purchased and added to Vercel.
// CZ domain also serves SK via the /sk/ path prefix.
// ---------------------------------------------------------------------------
const DOMAIN_LOCALE: Record<string, Locale> = {
  // Czech + Slovak (Slovak accessible at /sk/ path)
  "moje-omalovanky.cz":     "cs",
  "www.moje-omalovanky.cz": "cs",

  // English — replace with the purchased domain
  "ENGLISH_DOMAIN_PLACEHOLDER":     "en",
  "www.ENGLISH_DOMAIN_PLACEHOLDER": "en",

  // German — replace with the purchased domain
  "GERMAN_DOMAIN_PLACEHOLDER":     "de",
  "www.GERMAN_DOMAIN_PLACEHOLDER": "de",

  // Polish — replace with the purchased domain
  "POLISH_DOMAIN_PLACEHOLDER":     "pl",
  "www.POLISH_DOMAIN_PLACEHOLDER": "pl",

  // Local development — Czech by default
  "localhost": "cs",
};

const LOCALE_RE = new RegExp(`^/(${locales.join("|")})(\/|$)`);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.(.+)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // If the path already has a valid locale prefix, let it through
  if (LOCALE_RE.test(pathname)) {
    return NextResponse.next();
  }

  // Determine locale from hostname (fall back to default)
  const host = (request.headers.get("host") ?? "").split(":")[0];
  const locale: Locale = DOMAIN_LOCALE[host] ?? defaultLocale;

  // Redirect / and all non-prefixed paths to the locale-prefixed version
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, { status: 308 }); // 308 = permanent redirect
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon\\.svg|robots\\.txt|sitemap\\.xml).*)"],
};
