import type { Metadata } from "next";
import "../app/globals.css";
import { cormorant, jost } from "../app/fonts";
import {
  locales,
  localeHtmlLang,
  localeRoot,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/clinic";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { RevealObserver } from "@/components/RevealObserver";
import { FloatingCallButton } from "@/components/FloatingCallButton";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_GB",
  zh: "zh_CN",
  ko: "ko_KR",
  ja: "ja_JP",
  ms: "ms_MY",
};

// Shared metadata for the root layout of every locale. The default locale
// (English) resolves to prefix-free URLs ("/"), the others keep their prefix
// ("/zh/", ...) via localeRoot().
export async function buildRootMetadata(locale: Locale): Promise<Metadata> {
  const dict = await getDictionary(locale);

  const languages: Record<string, string> = { "x-default": localeRoot("en") };
  for (const l of locales) languages[localeHtmlLang[l]] = localeRoot(l);

  const ogImage = "/images/og-cover.png";

  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: dict.brand.nameFull,
    alternates: {
      canonical: localeRoot(locale),
      languages,
    },
    openGraph: {
      type: "website",
      siteName: dict.brand.nameFull,
      title: dict.meta.title,
      description: dict.meta.description,
      url: localeRoot(locale),
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
    verification: {
      google: "FWsfdxNNp6xUb614U72QNLkCbRgUXIVwno7hPXvhHAQ",
      other: {
        "naver-site-verification": "8b7f20c7eddc4e6611d701c359033c6ac7c68ba4",
      },
    },
  };
}

// The <html>/<body> shell shared by both root layouts (English at the root and
// the prefixed `[locale]` tree). Rendered as a Server Component so the
// dictionary load stays on the server.
export async function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
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
        <FloatingCallButton ariaLabel={dict.nav.book} />
      </body>
    </html>
  );
}
