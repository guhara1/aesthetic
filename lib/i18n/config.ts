export const locales = ["en", "zh", "ko", "ja", "ms"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Locales that carry a URL prefix. The default locale (English) is served at
// the site root with no prefix, so it is excluded here. Used by
// generateStaticParams so the `[locale]` route tree never emits `/en/...`.
export const intlLocales = locales.filter((l) => l !== defaultLocale);

// URL base for a locale's pages. The default locale lives at the root (""),
// every other locale under its own prefix ("/zh", "/ko", ...). Use this to
// build every in-app link and canonical/alternate URL so English stays
// prefix-free while the others keep their sub-path.
export function localeBase(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

// Absolute-path form (always leading slash, always trailing slash) for a
// locale's home — "/" for English, "/zh/" for others. Handy for canonical and
// hreflang values.
export function localeRoot(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}/`;
}

// Absolute path (leading + trailing slash) for a locale + locale-neutral
// content path ("about", "treatments/liposuction", "" for home). English is
// prefix-free ("/about/"), others prefixed ("/zh/about/").
export function contentUrlPath(locale: Locale, path: string): string {
  const base = localeBase(locale);
  return path ? `${base}/${path}/` : `${base}/`;
}

// canonical + hreflang alternates for a page, with the default locale served
// prefix-free. `path` is the locale-neutral content path ("" for home).
export function buildAlternates(locale: Locale, path: string) {
  const languages: Record<string, string> = {
    "x-default": contentUrlPath(defaultLocale, path),
  };
  for (const l of locales) languages[localeHtmlLang[l]] = contentUrlPath(l, path);
  return { canonical: contentUrlPath(locale, path), languages };
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ko: "한국어",
  ja: "日本語",
  ms: "Bahasa Malaysia",
};

export const localeHtmlLang: Record<Locale, string> = {
  en: "en-GB",
  zh: "zh-Hans",
  ko: "ko",
  ja: "ja",
  ms: "ms-MY",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
