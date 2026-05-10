import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SelectionBar } from "@/components/SelectionBar";
import { HtmlLangPatcher } from "@/components/HtmlLangPatcher";
import { locales, isValidLocale, type Locale } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { SITE_URL, LOCALE_DOMAINS, getLocaleOrigin } from "@/lib/config";

type LangLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const dict = await getDict(lang);
  const ogLocale = lang === 'de' ? 'de_DE' : lang === 'sk' ? 'sk_SK' : lang === 'en' ? 'en_US' : 'cs_CZ';
  const canonical = `${getLocaleOrigin(lang)}/${lang}`;
  return {
    metadataBase: new URL(getLocaleOrigin(lang)),
    title: { default: dict.site.name, template: `%s | ${dict.site.name}` },
    description: dict.site.description,
    openGraph: { type: "website", locale: ogLocale, url: canonical, siteName: dict.site.name },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical,
      languages: {
        "cs":        `${LOCALE_DOMAINS.cs}/cs`,
        "sk":        `${LOCALE_DOMAINS.sk}/sk`,
        "en":        `${LOCALE_DOMAINS.en}/en`,
        "de":        `${LOCALE_DOMAINS.de}/de`,
        "x-default": `${LOCALE_DOMAINS.cs}/cs`,
      },
    },
  };
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const dict = await getDict(lang as Locale);

  return (
    <>
      <HtmlLangPatcher lang={lang} />
      <div className="page-shell">
        <SiteHeader lang={lang as Locale} dict={dict.header} />
        <main>{children}</main>
      </div>
      <SelectionBar dict={dict.selection} lang={lang as Locale} />
    </>
  );
}
