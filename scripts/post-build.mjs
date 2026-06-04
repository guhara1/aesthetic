// Post-build: emit sitemap1.xml (Naver duplicate, same standard) and
// rss.xml (magazine feed) into out/ alongside Next.js's built-in
// sitemap.xml and robots.txt. Run after `next build`.

import fs from "node:fs";
import path from "node:path";

const OUT = "out";
const SITE_URL = "https://thevalley-beauty.com";
const DEFAULT_LOCALE = "en";

const dict = JSON.parse(
  fs.readFileSync("dictionaries/" + DEFAULT_LOCALE + ".json", "utf8"),
);

// Extract magazine post slugs from lib/magazine.ts (simple regex on the
// language-neutral registry — avoids importing TS from a Node script).
const magazineTs = fs.readFileSync("lib/magazine.ts", "utf8");
const posts = [];
const postRe = /\{\s*slug:\s*"([^"]+)",\s*key:\s*"([^"]+)",\s*cover:\s*"([^"]+)"/g;
let m;
while ((m = postRe.exec(magazineTs)) !== null) {
  posts.push({ slug: m[1], key: m[2], cover: m[3] });
}

// 1) sitemap1.xml — copy of Google sitemap, named for Naver Search Advisor.
//    Both engines accept the same sitemap protocol, but giving them a
//    distinct filename means each console can track its own copy clearly.
const sitemapXml = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
fs.writeFileSync(path.join(OUT, "sitemap1.xml"), sitemapXml);
console.log("wrote out/sitemap1.xml (" + sitemapXml.length + " bytes)");

// 2) rss.xml — RSS 2.0 feed of magazine posts, newest first.
function xmlEscape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const items = posts
  .map((p) => {
    const post = dict.magazine.posts[p.key];
    if (!post) return null;
    const link = SITE_URL + "/" + DEFAULT_LOCALE + "/magazine/" + p.slug + "/";
    const cover = SITE_URL + p.cover;
    const pubDate = new Date(post.date + "T00:00:00Z").toUTCString();
    return {
      title: post.title,
      link,
      cover,
      excerpt: post.excerpt,
      pubDate,
      slug: p.slug,
    };
  })
  .filter(Boolean)
  .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

const channelTitle = dict.brand.nameFull + " — " + dict.magazine.title;
const channelDesc = dict.magazine.lead;
const channelLink = SITE_URL + "/" + DEFAULT_LOCALE + "/magazine/";
const buildDate = new Date().toUTCString();

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${xmlEscape(channelTitle)}</title>
    <link>${channelLink}</link>
    <description>${xmlEscape(channelDesc)}</description>
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

fs.writeFileSync(path.join(OUT, "rss.xml"), rss);
console.log(
  "wrote out/rss.xml (" + items.length + " items, " + rss.length + " bytes)",
);
