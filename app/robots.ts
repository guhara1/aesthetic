import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/clinic";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Explicit allows for the major search engines.
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Googlebot-News", allow: "/" },
      { userAgent: "Bingbot", allow: "/" }, // Bing (also serves Yahoo)
      { userAgent: "Slurp", allow: "/" }, // Yahoo
      { userAgent: "Yeti", allow: "/" }, // Naver
      { userAgent: "Naverbot", allow: "/" }, // Naver (legacy)
      { userAgent: "Daumoa", allow: "/" }, // Daum (Korea)
      { userAgent: "Baiduspider", allow: "/" }, // Baidu
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap1.xml`,
      `${SITE_URL}/rss.xml`,
      `${SITE_URL}/rss1.xml`,
    ],
    host: SITE_URL,
  };
}
