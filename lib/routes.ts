import { treatments } from "./treatments";

// All content paths, relative to the locale segment (no leading/trailing slash).
export const contentPaths: string[] = [
  "",
  "about",
  "treatments",
  ...treatments.map((t) => `treatments/${t.slug}`),
];

// Absolute URL for a locale + relative path, with trailing slash (matches
// trailingSlash: true and the canonical tags).
export function localePath(siteUrl: string, locale: string, path: string): string {
  return path ? `${siteUrl}/${locale}/${path}/` : `${siteUrl}/${locale}/`;
}
