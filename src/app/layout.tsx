import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SelectionProvider } from "@/components/SelectionContext";
import { SelectionBar } from "@/components/SelectionBar";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} pro děti zdarma | Tiskni a vybarvi`,
    template: `%s | ${SITE_NAME} zdarma`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "omalovánky zdarma",
    "omalovánky k tisku",
    "omalovánky pro děti",
    "tisknutelné omalovánky",
    "omalovánky online",
    "omalovánky zvířata",
    "omalovánky auta",
    "omalovánky princezny",
    "omalovánky dinosauři",
    "omalovánky vesmír",
    "omalovánky moře",
    "omalovánky pohádky",
    "omalovánky jídlo",
    "omalovánky sport",
    "omalovánky budovy",
    "omalovánky oblečení",
    "omalovánky povolání",
  ],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} pro děti zdarma | Tiskni a vybarvi`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} pro děti zdarma`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>
        <SelectionProvider>
          <div className="page-shell">
            <SiteHeader />
            <main>{children}</main>
          </div>
          <SelectionBar />
        </SelectionProvider>
      </body>
    </html>
  );
}
