import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localeBase, localeRoot, type Locale } from "@/lib/i18n/config";
import { SITE_URL, clinic } from "@/lib/clinic";
import type { LocalArea } from "@/lib/localAreas";
import { posts } from "@/lib/magazine";

// Blog posts surfaced as "related reading" on the local landing pages. Their
// localized titles double as long-tail internal-link anchors into the magazine.
const RELATED_POST_KEYS = ["consultationChecklist", "downtimePlanning", "costFactors"];

// Reused by both /mont-kiara-aesthetic-clinic and /sri-hartamas-cosmetic-surgery.
export function LocalLandingPage({
  area,
  dict,
  locale,
}: {
  area: LocalArea;
  dict: Dictionary;
  locale: Locale;
}) {
  const base = localeBase(locale);
  const home = base || "/";
  const content = dict.localAreas[area.key];
  const pageUrl = `${SITE_URL}${base}/${area.slug}/`;
  const ui = dict.procedureUi;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": `${pageUrl}#clinic`,
        name: `${clinic.legalName} — ${content.areaName}`,
        url: pageUrl,
        image: `${SITE_URL}/images/og-cover.png`,
        telephone: clinic.telephone,
        priceRange: clinic.priceRange,
        address: {
          "@type": "PostalAddress",
          streetAddress: clinic.address.street,
          addressLocality: clinic.address.locality,
          addressRegion: clinic.address.region,
          postalCode: clinic.address.postalCode,
          addressCountry: clinic.address.country,
        },
        geo: { "@type": "GeoCoordinates", latitude: area.geo.lat, longitude: area.geo.lng },
        areaServed: { "@type": "Place", name: content.areaName },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: clinic.rating.value,
          reviewCount: clinic.rating.count,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.home, item: `${SITE_URL}${localeRoot(locale)}` },
          { "@type": "ListItem", position: 2, name: content.areaName, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <article className="bg-ivory">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />

      {/* ── Hero ── */}
      <header className="relative overflow-hidden bg-ink pt-32 pb-20 text-ivory lg:pt-44 lg:pb-28">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-[radial-gradient(120%_120%_at_80%_10%,#5a4a3a_0%,#3a2f27_45%,#241d18_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_0%,rgba(176,141,87,0.22),transparent_70%)]" />
        </div>
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-[11px] tracking-[0.16em] uppercase text-ivory/55">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={home} className="hover:text-gold">
                  {ui.home}
                </Link>
              </li>
              <li aria-hidden>·</li>
              <li className="text-gold">{content.areaName}</li>
            </ol>
          </nav>
          <p className="mt-8 text-[11px] tracking-[0.28em] uppercase text-gold">{content.eyebrow}</p>
          <h1 className="mt-5 font-display text-[2.4rem] leading-[1.12] text-ivory text-balance lg:text-[3.6rem] lg:leading-[1.08]">
            {content.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/80">{content.lead}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs tracking-[0.14em] uppercase text-white transition-all duration-300 hover:bg-gold-deep"
            >
              {dict.nav.book}
            </Link>
            <Link
              href={`${base}/treatments`}
              className="inline-flex items-center gap-2 border-b border-ivory/40 pb-1 text-xs tracking-[0.14em] uppercase text-ivory/85 transition-colors hover:text-gold"
            >
              {ui.treatments} →
            </Link>
          </div>
        </div>
      </header>

      {/* ── Body sections ── */}
      <div className="mx-auto max-w-[44rem] px-6 py-16 lg:px-8 lg:py-24">
        {content.sections.map((s, i) => (
          <section key={i} className="mt-12 first:mt-0">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-lg text-gold/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-[1.7rem] leading-snug text-ink lg:text-[2rem]">
                {s.heading}
              </h2>
            </div>
            <p className="mt-5 text-[1.075rem] leading-[1.9] text-ink-soft">
              {renderWithLinks(s.body, base)}
            </p>
          </section>
        ))}

        {/* FAQ */}
        <section className="mt-16 border-t border-sand pt-12">
          <h2 className="font-display text-[1.7rem] leading-snug text-ink lg:text-[2rem]">
            FAQ — {content.areaName}
          </h2>
          <dl className="mt-7 space-y-7">
            {content.faq.map((f, i) => (
              <div key={i}>
                <dt className="font-display text-lg text-ink">{f.q}</dt>
                <dd className="mt-2 text-[1.02rem] leading-[1.85] text-ink-soft">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Related reading — internal links into the magazine (localized titles
            act as long-tail anchors, strengthening the topical cluster). */}
        <section className="mt-16 border-t border-sand pt-10">
          <h2 className="text-[11px] tracking-[0.28em] uppercase text-gold">
            {dict.nav.magazine}
          </h2>
          <ul className="mt-6 space-y-3">
            {posts
              .filter((p) => RELATED_POST_KEYS.includes(p.key))
              .map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`${base}/magazine/${p.slug}`}
                    className="group inline-flex items-start gap-2 text-[1.02rem] leading-snug text-ink-soft transition-colors hover:text-gold-deep"
                  >
                    <span className="mt-1 text-gold transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                    {dict.magazine.posts[p.key as keyof typeof dict.magazine.posts].title}
                  </Link>
                </li>
              ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-sand pt-10">
          <Link
            href={`${base}/contact`}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs tracking-[0.14em] uppercase text-white transition-all duration-300 hover:bg-gold-deep"
          >
            {dict.nav.book}
          </Link>
          <Link
            href={`${base}/treatments`}
            className="inline-flex items-center gap-2 border-b border-gold pb-1 text-xs tracking-[0.14em] uppercase text-gold-deep transition-colors hover:text-gold"
          >
            {ui.treatments} →
          </Link>
        </div>
      </div>
    </article>
  );
}

function renderWithLinks(text: string, base: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const path = m[2];
    if (path.startsWith("#")) {
      parts.push(
        <a
          key={`l-${key++}`}
          href={path}
          className="text-gold-deep underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
        >
          {m[1]}
        </a>,
      );
    } else {
      parts.push(
        <Link
          key={`l-${key++}`}
          href={`${base}/${path.replace(/^\/+/, "")}`}
          className="text-gold-deep underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
        >
          {m[1]}
        </Link>,
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
