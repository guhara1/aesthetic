// Generate sitemap1.xml (Naver duplicate) and rss.xml into public/ so they
// ship as static files via next build → out/ — no dependence on a
// post-build hook running on the host.

import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://thevalley-beauty.com";
const DEFAULT_LOCALE = "en";
const LOCALES = ["en", "zh", "ko", "ja"];
const LOCALE_HTML_LANG = { en: "en-GB", zh: "zh-Hans", ko: "ko", ja: "ja" };

// Read registries from lib/*.ts via regex (avoids running TS from Node).
function readSlugs(filePath, re) {
  const src = fs.readFileSync(filePath, "utf8");
  const out = [];
  let m;
  while ((m = re.exec(src)) !== null) out.push(m[1]);
  return out;
}

const treatmentSlugs = readSlugs("lib/treatments.ts", /slug:\s*"([^"]+)"/g);
const postSlugs = readSlugs("lib/magazine.ts", /slug:\s*"([^"]+)"/g);
const areaSlugs = readSlugs("lib/localAreas.ts", /slug:\s*"([^"]+)"/g);

const contentPaths = [
  "",
  "about",
  "contact",
  "treatments",
  ...treatmentSlugs.map((s) => `treatments/${s}`),
  "magazine",
  ...postSlugs.map((s) => `magazine/${s}`),
  ...areaSlugs,
];

function urlFor(locale, p) {
  return p ? `${SITE_URL}/${locale}/${p}/` : `${SITE_URL}/${locale}/`;
}

function xmlEscape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// ───────────────── sitemap1.xml ─────────────────
const lastmod = new Date().toISOString();
const urlSet = [];
for (const p of contentPaths) {
  const langLinks = [
    `<xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(DEFAULT_LOCALE, p)}"/>`,
    ...LOCALES.map(
      (l) =>
        `<xhtml:link rel="alternate" hreflang="${LOCALE_HTML_LANG[l]}" href="${urlFor(l, p)}"/>`,
    ),
  ].join("\n      ");
  for (const locale of LOCALES) {
    const priority = p === "" ? "1.0" : p.includes("/") ? "0.7" : "0.8";
    const freq = p === "" ? "weekly" : "monthly";
    urlSet.push(`  <url>
    <loc>${urlFor(locale, p)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
      ${langLinks}
  </url>`);
  }
}

const sitemap1 = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlSet.join("\n")}
</urlset>
`;

fs.writeFileSync("public/sitemap1.xml", sitemap1);
console.log(
  `wrote public/sitemap1.xml (${urlSet.length} urls, ${sitemap1.length} bytes)`,
);

// ───────────────── rss.xml ─────────────────
const dict = JSON.parse(
  fs.readFileSync("dictionaries/" + DEFAULT_LOCALE + ".json", "utf8"),
);

// Reread magazine.ts with capturing groups so we can pair slug/key/cover.
const magazineTs = fs.readFileSync("lib/magazine.ts", "utf8");
const posts = [];
const postRe = /\{\s*slug:\s*"([^"]+)",\s*key:\s*"([^"]+)",\s*cover:\s*"([^"]+)"/g;
let m;
while ((m = postRe.exec(magazineTs)) !== null) {
  posts.push({ slug: m[1], key: m[2], cover: m[3] });
}

const items = posts
  .map((p) => {
    const post = dict.magazine.posts[p.key];
    if (!post) return null;
    const link = `${SITE_URL}/${DEFAULT_LOCALE}/magazine/${p.slug}/`;
    return {
      title: post.title,
      link,
      cover: SITE_URL + p.cover,
      excerpt: post.excerpt,
      pubDate: new Date(post.date + "T00:00:00Z").toUTCString(),
    };
  })
  .filter(Boolean)
  .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

const channelTitle = `${dict.brand.nameFull} — ${dict.magazine.title}`;
const channelLink = `${SITE_URL}/${DEFAULT_LOCALE}/magazine/`;
const buildDate = new Date().toUTCString();

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${xmlEscape(channelTitle)}</title>
    <link>${channelLink}</link>
    <description>${xmlEscape(dict.magazine.lead)}</description>
    <language>en-GB</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items
  .map(
    (it) => `    <item>
      <title>${xmlEscape(it.title)}</title>
      <link>${it.link}</link>
      <guid isPermaLink="true">${it.link}</guid>
      <pubDate>${it.pubDate}</pubDate>
      <description>${xmlEscape(it.excerpt)}</description>
      <enclosure url="${it.cover}" type="image/webp" />
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>
`;

fs.writeFileSync("public/rss.xml", rss);
// rss1.xml — same content but with self-link pointing at rss1.xml so feed
// readers don't redirect to rss.xml.
const rss1 = rss.replace(
  `href="${SITE_URL}/rss.xml"`,
  `href="${SITE_URL}/rss1.xml"`,
);
fs.writeFileSync("public/rss1.xml", rss1);
console.log(`wrote public/rss.xml and public/rss1.xml (${items.length} items)`);
