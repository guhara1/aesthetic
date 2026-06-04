import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  isLocale,
  locales,
  localeHtmlLang,
  defaultLocale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { posts, getPostBySlug } from "@/lib/magazine";
import { SITE_URL, clinic, medicalReviewer, contentLastReviewed } from "@/lib/clinic";

const BCP47: Record<string, string> = {
  en: "en-GB",
  zh: "zh-CN",
  ko: "ko-KR",
  ja: "ja-JP",
};

type PostKey = keyof Awaited<ReturnType<typeof getDictionary>>["magazine"]["posts"];

export function generateStaticParams() {
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!isLocale(locale) || !post) return {};
  const dict = await getDictionary(locale);
  const p = dict.magazine.posts[post.key as PostKey];

  const languages: Record<string, string> = {
    "x-default": `/${defaultLocale}/magazine/${slug}/`,
  };
  for (const l of locales) languages[localeHtmlLang[l]] = `/${l}/magazine/${slug}/`;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${p.title} | ${dict.brand.nameFull}`,
    description: p.excerpt,
    alternates: { canonical: `/${locale}/magazine/${slug}/`, languages },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      url: `/${locale}/magazine/${slug}/`,
      publishedTime: p.date,
      images: [{ url: post.cover }],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!isLocale(locale) || !post) notFound();
  const dict = await getDictionary(locale);
  const p = dict.magazine.posts[post.key as PostKey];
  const base = `/${locale}`;
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(BCP47[locale], {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const pageUrl = `${SITE_URL}/${locale}/magazine/${slug}/`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        headline: p.title,
        description: p.excerpt,
        image: `${SITE_URL}${post.cover}`,
        datePublished: p.date,
        dateModified: contentLastReviewed,
        inLanguage: locale,
        author: { "@type": "Person", name: medicalReviewer.name, jobTitle: medicalReviewer.role },
        publisher: { "@type": "MedicalClinic", name: clinic.legalName, "@id": `${SITE_URL}/#clinic` },
        mainEntityOfPage: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: dict.procedureUi.home, item: `${SITE_URL}/${locale}/` },
          { "@type": "ListItem", position: 2, name: dict.magazine.title, item: `${SITE_URL}/${locale}/magazine/` },
          { "@type": "ListItem", position: 3, name: p.title, item: pageUrl },
        ],
      },
    ],
  };

  const more = posts
    .filter((x) => x.slug !== post.slug)
    .sort((a, b) =>
      dict.magazine.posts[b.key as PostKey].date.localeCompare(
        dict.magazine.posts[a.key as PostKey].date,
      ),
    )
    .slice(0, 2);

  return (
    <article className="bg-ivory">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />

      {/* ── Hero ── */}
      <header className="relative overflow-hidden bg-ink pt-32 pb-16 text-ivory lg:pt-40 lg:pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-[radial-gradient(120%_120%_at_80%_0%,#5a4a3a_0%,#3a2f27_45%,#211b16_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_0%,rgba(176,141,87,0.22),transparent_70%)]" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <nav aria-label="Breadcrumb" className="text-[11px] tracking-[0.16em] uppercase text-ivory/45">
            <ol className="flex flex-wrap items-center justify-center gap-2">
              <li><Link href={base} className="transition-colors hover:text-gold">{dict.procedureUi.home}</Link></li>
              <li aria-hidden>·</li>
              <li><Link href={`${base}/magazine`} className="transition-colors hover:text-gold">{dict.magazine.title}</Link></li>
            </ol>
          </nav>

          <p className="mt-8 text-[11px] tracking-[0.32em] uppercase text-gold">
            {dict.magazine.title}
          </p>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-[2.35rem] font-medium leading-[1.12] text-ivory text-balance break-keep lg:text-[3.4rem] lg:leading-[1.08]">
            {p.title}
          </h1>
          <div className="mt-7 flex items-center justify-center gap-3 text-[11px] tracking-[0.16em] uppercase text-ivory/55">
            <span>{fmt(p.date)}</span>
            <span className="h-3 w-px bg-ivory/30" />
            <span>{p.readMinutes} {dict.magazine.readTime}</span>
          </div>
        </div>
      </header>

      {/* ── Cover ── */}
      <div className="mx-auto mt-10 max-w-3xl px-6 lg:mt-14 lg:px-10">
        <div className="overflow-hidden rounded-sm border border-sand/80 shadow-[0_40px_90px_-50px_rgba(42,36,32,0.65)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover} alt={p.title} className="block h-auto w-full" />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-[44rem] px-6 py-14 lg:px-8 lg:py-20">
        {/* Lead */}
        <p className="font-display text-2xl leading-[1.5] text-ink text-balance lg:text-[1.7rem]">
          {p.excerpt}
        </p>
        <div className="mt-10 hairline" />

        {p.sections.map((s, i) => (
          <section key={i} className="mt-12 first:mt-10">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-lg text-gold/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-[1.7rem] leading-snug text-ink lg:text-[2rem]">
                {s.heading}
              </h2>
            </div>
            {s.body.map((para, k) => (
              <p
                key={k}
                className={`mt-5 text-[1.075rem] leading-[1.9] text-ink-soft ${
                  i === 0 && k === 0
                    ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-gold-deep"
                    : ""
                }`}
              >
                {para}
              </p>
            ))}
          </section>
        ))}

        {/* ── CTA ── */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link
            href={`${base}/contact`}
            className="rounded-full bg-gold px-8 py-4 text-xs tracking-[0.14em] uppercase text-white transition-colors hover:bg-gold-deep"
          >
            {dict.nav.book}
          </Link>
          <Link
            href={`${base}/magazine`}
            className="text-xs tracking-[0.14em] uppercase text-gold-deep transition-colors hover:text-gold"
          >
            ← {dict.magazine.backToList}
          </Link>
        </div>
      </div>

      {/* ── More articles ── */}
      {more.length > 0 && (
        <div className="border-t border-sand bg-cream py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <h2 className="text-center text-[11px] tracking-[0.28em] uppercase text-gold">
              {dict.magazine.title}
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {more.map((m) => {
                const mp = dict.magazine.posts[m.key as PostKey];
                return (
                  <Link key={m.slug} href={`${base}/magazine/${m.slug}`} className="group flex flex-col">
                    <div className="overflow-hidden rounded-sm border border-sand">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.cover}
                        alt={mp.title}
                        loading="lazy"
                        className="aspect-[3/2] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="mt-4 text-[11px] tracking-[0.14em] uppercase text-taupe">
                      {fmt(mp.date)} · {mp.readMinutes} {dict.magazine.readTime}
                    </p>
                    <h3 className="mt-2 font-display text-2xl leading-snug text-ink transition-colors group-hover:text-gold-deep">
                      {mp.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-taupe">{mp.excerpt}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
