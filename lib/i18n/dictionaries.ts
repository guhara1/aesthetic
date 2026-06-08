import "server-only";
import type { Locale } from "./config";

export type Dictionary = typeof import("../../dictionaries/en.json");

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("../../dictionaries/en.json").then((m) => m.default),
  zh: () => import("../../dictionaries/zh.json").then((m) => m.default),
  ko: () => import("../../dictionaries/ko.json").then((m) => m.default),
  ja: () => import("../../dictionaries/ja.json").then((m) => m.default),
  ms: () => import("../../dictionaries/ms.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
