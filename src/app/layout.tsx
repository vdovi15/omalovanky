import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SelectionProvider } from "@/components/SelectionContext";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        <SelectionProvider>
          {children}
        </SelectionProvider>
        <Analytics />
      </body>
    </html>
  );
}
