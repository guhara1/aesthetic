import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { cormorant, jost } from "../fonts";
import {
  isLocale,
  locales,
  localeHtmlLang,
  defaultLocale,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/clinic";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { RevealObserver } from "@/components/RevealObserver";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_GB",
  zh: "zh_CN",
  ko: "ko_KR",
  ja: "ja_JP",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);

  const languages: Record<string, string> = { "x-default": `/${defaultLocale}/` };
  for (const l of locales) languages[localeHtmlLang[l]] = `/${l}/`;

  const ogImage = "/images/og-cover.png";

  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: dict.brand.nameFull,
    alternates: {
      canonical: `/${locale}/`,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: dict.brand.nameFull,
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}/`,
      locale: OG_LOCALE[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [{ url: ogImage, width: 1200, height: 630, alt: dict.brand.nameFull }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <html lang={localeHtmlLang[locale]} className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('reveal-on')",
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <StructuredData dict={dict} locale={locale} />
        <RevealObserver />
        <Header dict={dict} locale={locale} />
        <main>{children}</main>
        <Footer dict={dict} locale={locale} />
      </body>
    </html>
  );
}
