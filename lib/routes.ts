import { treatments } from "./treatments";
import { posts } from "./magazine";
import { localAreas } from "./localAreas";
import { defaultLocale } from "./i18n/config";

// All content paths, relative to the locale segment (no leading/trailing slash).
export const contentPaths: string[] = [
  "",
  "about",
  "contact",
  "treatments",
  ...treatments.map((t) => `treatments/${t.slug}`),
  "magazine",
  ...posts.map((p) => `magazine/${p.slug}`),
  ...localAreas.map((a) => a.slug),
];

// Absolute URL for a locale + relative path, with trailing slash (matches
// trailingSlash: true and the canonical tags). The default locale (English) is
// served prefix-free at the site root.
export function localePath(siteUrl: string, locale: string, path: string): string {
  const base = locale === defaultLocale ? "" : `/${locale}`;
  return path ? `${siteUrl}${base}/${path}/` : `${siteUrl}${base}/`;
}
