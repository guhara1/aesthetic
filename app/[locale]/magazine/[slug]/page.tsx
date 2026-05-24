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

  const more = posts.filter((x) => x.slug !== post.slug).slice(0, 2);

  return (
    <article className="bg-ivory">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />

      <header className="relative overflow-hidden bg-ink pt-36 pb-16 text-ivory lg:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_80%_10%,#5a4a3a_0%,#3a2f27_45%,#241d18_100%)]" />
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-[11px] tracking-[0.14em] uppercase text-ivory/55">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href={base} className="hover:text-gold">{dict.procedureUi.home}</Link></li>
              <li aria-hidden>/</li>
              <li><Link href={`${base}/magazine`} className="hover:text-gold">{dict.magazine.title}</Link></li>
            </ol>
          </nav>
          <h1 className="mt-7 font-display text-4xl leading-[1.12] text-ivory text-balance lg:text-5xl">
            {p.title}
          </h1>
          <p className="mt-5 text-[11px] tracking-[0.14em] uppercase text-ivory/55">
            {fmt(p.date)} · {p.readMinutes} {dict.magazine.readTime}
          </p>
        </div>
      </header>

      {/* Cover */}
      <div className="mx-auto -mt-8 max-w-3xl px-6 lg:px-10">
        <div className="overflow-hidden rounded-sm border border-sand shadow-[0_30px_70px_-40px_rgba(42,36,32,0.5)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover} alt={p.title} className="aspect-[16/9] w-full object-cover" />
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-20">
        <p className="border-l-2 border-gold pl-5 font-display text-xl leading-relaxed text-ink lg:text-2xl">
          {p.excerpt}
        </p>

        {p.sections.map((s, i) => (
          <section key={i} className="mt-12">
            <h2 className="font-display text-2xl leading-snug text-ink lg:text-3xl">{s.heading}</h2>
            {s.body.map((para, k) => (
              <p key={k} className="mt-4 text-base leading-[1.8] text-ink-soft">{para}</p>
            ))}
          </section>
        ))}

        {/* Byline — E-E-A-T authorship */}
        <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-sand pt-6 text-xs text-taupe">
          <span className="tracking-[0.1em] uppercase text-gold-deep">{dict.magazine.byLabel}</span>
          <span className="font-medium text-ink-soft">{medicalReviewer.name}</span>
          <span>· {medicalReviewer.credentials}</span>
          <span className="w-full text-[11px] text-taupe/80">
            {dict.reviewer.updatedLabel}: {fmt(contentLastReviewed)}
          </span>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href={`${base}/contact`}
            className="rounded-full bg-gold px-8 py-3.5 text-xs tracking-[0.14em] uppercase text-white transition-colors hover:bg-gold-deep"
          >
            {dict.nav.book}
          </Link>
          <Link
            href={`${base}/magazine`}
            className="text-xs tracking-[0.14em] uppercase text-gold-deep hover:text-gold"
          >
            ← {dict.magazine.backToList}
          </Link>
        </div>
      </div>

      {/* More articles */}
      {more.length > 0 && (
        <div className="border-t border-sand bg-cream py-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <h2 className="text-[11px] tracking-[0.28em] uppercase text-gold">{dict.magazine.title}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {more.map((m) => {
                const mp = dict.magazine.posts[m.key as PostKey];
                return (
                  <Link key={m.slug} href={`${base}/magazine/${m.slug}`} className="group">
                    <h3 className="font-display text-xl leading-snug text-ink group-hover:text-gold-deep">
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
