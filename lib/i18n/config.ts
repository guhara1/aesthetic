export const locales = ["en", "zh", "ko", "ja", "ms"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

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
