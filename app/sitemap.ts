import type { MetadataRoute } from "next";
import { locales, defaultLocale, localeHtmlLang } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/clinic";
import { contentPaths, localePath } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of contentPaths) {
    const languages: Record<string, string> = {
      "x-default": localePath(SITE_URL, defaultLocale, path),
    };
    for (const l of locales) {
      languages[localeHtmlLang[l]] = localePath(SITE_URL, l, path);
    }

    for (const locale of locales) {
      entries.push({
        url: localePath(SITE_URL, locale, path),
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path.includes("/") ? 0.7 : 0.8,
        alternates: { languages },
      });
    }
  }

  return entries;
}
