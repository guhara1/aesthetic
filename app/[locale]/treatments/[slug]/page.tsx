import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  isLocale,
  locales,
  localeHtmlLang,
  defaultLocale,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  treatments,
  getTreatmentBySlug,
  imagesForTreatment,
} from "@/lib/treatments";
import { SITE_URL, clinic } from "@/lib/clinic";

type ProcKey = keyof Awaited<ReturnType<typeof getDictionary>>["procedures"];

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    treatments.map((t) => ({ locale, slug: t.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!isLocale(locale) || !treatment) return {};
  const dict = await getDictionary(locale);
  const item = dict.treatmentsMenu.items[treatment.key as keyof typeof dict.treatmentsMenu.items];
  const proc = dict.procedures[treatment.key as ProcKey];

  const languages: Record<string, string> = {
    "x-default": `/${defaultLocale}/treatments/${slug}/`,
  };
  for (const l of locales) languages[localeHtmlLang[l]] = `/${l}/treatments/${slug}/`;

  const title = `${item.name} in Kuala Lumpur | ${dict.brand.nameFull}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: proc.overview,
    alternates: { canonical: `/${locale}/treatments/${slug}/`, languages },
    openGraph: {
      type: "article",
      title,
      description: proc.overview,
      url: `/${locale}/treatments/${slug}/`,
      images: [{ url: "/images/og-cover.png", width: 1200, height: 630 }],
    },
  };
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!isLocale(locale) || !treatment) notFound();

  const dict = await getDictionary(locale);
  const ui = dict.procedureUi;
  const item = dict.treatmentsMenu.items[treatment.key as keyof typeof dict.treatmentsMenu.items];
  const proc = dict.procedures[treatment.key as ProcKey];
  const images = imagesForTreatment(treatment);
  const base = `/${locale}`;
  const categoryLabel = treatment.category === "surgical" ? ui.surgical : ui.nonSurgical;

  const related = treatments
    .filter((t) => t.category === treatment.category && t.slug !== treatment.slug)
    .slice(0, 3);

  const pageUrl = `${SITE_URL}/${locale}/treatments/${slug}/`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalProcedure",
        "@id": `${pageUrl}#procedure`,
        name: item.name,
        description: proc.overview,
        url: pageUrl,
        procedureType:
          treatment.category === "surgical"
            ? "https://schema.org/SurgicalProcedure"
            : "https://schema.org/NoninvasiveProcedure",
        provider: { "@type": "MedicalClinic", name: clinic.legalName, "@id": `${SITE_URL}/#clinic` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.home, item: `${SITE_URL}/${locale}/` },
          { "@type": "ListItem", position: 2, name: ui.treatments, item: `${SITE_URL}/${locale}/treatments/` },
          { "@type": "ListItem", position: 3, name: item.name, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: proc.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      {/* Hero */}
      <header className="relative overflow-hidden bg-ink pt-36 pb-20 text-ivory lg:pt-44 lg:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-[radial-gradient(120%_120%_at_80%_10%,#5a4a3a_0%,#3a2f27_45%,#241d18_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_88%_30%,rgba(176,141,87,0.28),transparent_60%)]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-[11px] tracking-[0.14em] uppercase text-ivory/55">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href={base} className="hover:text-gold">{ui.home}</Link></li>
              <li aria-hidden>/</li>
              <li><Link href={`${base}/treatments`} className="hover:text-gold">{ui.treatments}</Link></li>
              <li aria-hidden>/</li>
              <li className="text-gold">{item.name}</li>
            </ol>
          </nav>

          <p className="mt-8 text-[11px] tracking-[0.28em] uppercase text-gold">{categoryLabel}</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-ivory text-balance lg:text-6xl">
            {item.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/75">{proc.overview}</p>
          <Link
            href={`${base}/contact`}
            className="mt-9 inline-block rounded-full bg-gold px-8 py-4 text-xs tracking-[0.14em] uppercase text-white transition-colors hover:bg-gold-deep"
          >
            {ui.book}
          </Link>
        </div>
      </header>

      {/* Body */}
      <div className="bg-ivory py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-3 lg:px-10">
          <div className="lg:col-span-2 lg:pr-10">
            {/* Benefits */}
            <section>
              <h2 className="text-[11px] tracking-[0.28em] uppercase text-gold">{ui.benefits}</h2>
              <ul className="mt-6 space-y-4">
                {proc.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg leading-relaxed text-ink-soft">
                    <span className="mt-1.5 text-gold">✦</span>
                    {b}
                  </li>
                ))}
              </ul>
            </section>

            {/* Recovery */}
            <section className="mt-14 border-t border-sand pt-10">
              <h2 className="text-[11px] tracking-[0.28em] uppercase text-gold">{ui.recovery}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{proc.recovery}</p>
            </section>

            {/* Before & After */}
            {images.length > 0 && (
              <section className="mt-14 border-t border-sand pt-10">
                <h2 className="font-display text-3xl text-ink">{ui.results}</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {images.map((src, i) => (
                    <figure
                      key={src}
                      className="overflow-hidden rounded-sm border border-sand bg-cream"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`${item.name} — ${dict.results.title} ${i + 1} · ${dict.brand.name}, Kuala Lumpur`}
                        loading="lazy"
                        className="w-full"
                      />
                    </figure>
                  ))}
                </div>
                <p className="mt-4 text-xs text-taupe">{dict.results.note}</p>
              </section>
            )}

            {/* FAQ */}
            <section className="mt-14 border-t border-sand pt-10">
              <h2 className="font-display text-3xl text-ink">{ui.faq}</h2>
              <dl className="mt-6 space-y-6">
                {proc.faq.map((f, i) => (
                  <div key={i}>
                    <dt className="font-display text-xl text-ink">{f.q}</dt>
                    <dd className="mt-2 text-base leading-relaxed text-ink-soft">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-sm border border-sand bg-cream p-7">
              <p className="font-display text-2xl text-ink">{dict.cta.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{ui.consultNote}</p>
              <Link
                href={`${base}/contact`}
                className="mt-6 block rounded-full bg-gold px-6 py-3.5 text-center text-xs tracking-[0.14em] uppercase text-white transition-colors hover:bg-gold-deep"
              >
                {ui.book}
              </Link>
              <Link
                href={`${base}/treatments`}
                className="mt-4 block text-center text-xs tracking-[0.14em] uppercase text-gold-deep hover:text-gold"
              >
                {ui.allTreatments} →
              </Link>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-10">
            <div className="border-t border-sand pt-12">
              <h2 className="text-[11px] tracking-[0.28em] uppercase text-gold">{ui.related}</h2>
              <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-sand bg-sand sm:grid-cols-3">
                {related.map((t) => {
                  const ri = dict.treatmentsMenu.items[t.key as keyof typeof dict.treatmentsMenu.items];
                  return (
                    <Link
                      key={t.slug}
                      href={`${base}/treatments/${t.slug}`}
                      className="group bg-ivory p-7 transition-colors hover:bg-cream"
                    >
                      <h3 className="font-display text-2xl text-ink group-hover:text-gold-deep">{ri.name}</h3>
                      <p className="mt-2 text-sm text-taupe">{ri.desc}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
