import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  isLocale,
  intlLocales,
  localeBase,
  buildAlternates,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { posts } from "@/lib/magazine";
import { SITE_URL } from "@/lib/clinic";

const BCP47: Record<string, string> = {
  en: "en-GB",
  zh: "zh-CN",
  ko: "ko-KR",
  ja: "ja-JP",
  ms: "ms-MY",
};

type PostKey = keyof Awaited<ReturnType<typeof getDictionary>>["magazine"]["posts"];

export function generateStaticParams() {
  return intlLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: `${dict.magazine.title} | ${dict.brand.nameFull}`,
    description: dict.magazine.lead,
    alternates: buildAlternates(locale, "magazine"),
  };
}

export default async function MagazineIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const base = localeBase(locale);
  const home = base || "/";
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(BCP47[locale], {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="bg-ivory">
      <header className="relative overflow-hidden bg-ink pt-36 pb-20 text-ivory lg:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_80%_10%,#5a4a3a_0%,#3a2f27_45%,#241d18_100%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-[11px] tracking-[0.14em] uppercase text-ivory/55">
            <ol className="flex items-center gap-2">
              <li><Link href={home} className="hover:text-gold">{dict.procedureUi.home}</Link></li>
              <li aria-hidden>/</li>
              <li className="text-gold">{dict.magazine.title}</li>
            </ol>
          </nav>
          <h1 className="mt-8 font-display text-5xl leading-tight text-ivory lg:text-6xl">
            {dict.magazine.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/75">{dict.magazine.lead}</p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        {dict.magazine.intro && (
          <div className="mx-auto mb-14 max-w-3xl space-y-5 text-[1.05rem] leading-[1.85] text-ink-soft">
            {dict.magazine.intro.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        <div className="grid gap-10 md:grid-cols-3">
          {[...posts]
            .sort((a, b) =>
              dict.magazine.posts[b.key as PostKey].date.localeCompare(
                dict.magazine.posts[a.key as PostKey].date,
              ),
            )
            .map((post) => {
            const p = dict.magazine.posts[post.key as PostKey];
            return (
              <Link key={post.slug} href={`${base}/magazine/${post.slug}`} className="group flex flex-col">
                <div className="overflow-hidden rounded-sm border border-sand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.cover}
                    alt={p.title}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-5 text-[11px] tracking-[0.14em] uppercase text-taupe">
                  {fmt(p.date)} · {p.readMinutes} {dict.magazine.readTime}
                </p>
                <h2 className="mt-2 font-display text-2xl leading-snug text-ink transition-colors group-hover:text-gold-deep">
                  {p.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.excerpt}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
