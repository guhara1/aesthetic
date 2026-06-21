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
import { treatments } from "@/lib/treatments";
import { SITE_URL } from "@/lib/clinic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);

  const languages: Record<string, string> = {
    "x-default": `/${defaultLocale}/treatments/`,
  };
  for (const l of locales) languages[localeHtmlLang[l]] = `/${l}/treatments/`;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${dict.procedureUi.treatments} | ${dict.brand.nameFull}`,
    description: dict.treatmentsSection.subtitle,
    alternates: { canonical: `/${locale}/treatments/`, languages },
  };
}

export default async function TreatmentsIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const ui = dict.procedureUi;
  const base = `/${locale}`;

  const groups = [
    { label: ui.surgical, items: treatments.filter((t) => t.category === "surgical") },
    { label: ui.nonSurgical, items: treatments.filter((t) => t.category === "non-surgical") },
  ];

  return (
    <div className="bg-ivory">
      <header className="relative overflow-hidden bg-ink pt-36 pb-20 text-ivory lg:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_80%_10%,#5a4a3a_0%,#3a2f27_45%,#241d18_100%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-[11px] tracking-[0.14em] uppercase text-ivory/55">
            <ol className="flex items-center gap-2">
              <li><Link href={base} className="hover:text-gold">{ui.home}</Link></li>
              <li aria-hidden>/</li>
              <li className="text-gold">{ui.treatments}</li>
            </ol>
          </nav>
          <p className="mt-8 text-[11px] tracking-[0.28em] uppercase text-gold">
            {dict.treatmentsHubPage?.eyebrow ?? dict.treatmentsSection.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-ivory lg:text-6xl">
            {dict.treatmentsHubPage?.title ?? dict.treatmentsSection.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/75">
            {dict.treatmentsHubPage?.lead ?? dict.treatmentsSection.subtitle}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        {groups.map((group) => (
          <section key={group.label} className="mb-16 last:mb-0">
            <h2 className="text-[11px] tracking-[0.28em] uppercase text-gold">{group.label}</h2>
            <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((t) => {
                const item = dict.treatmentsMenu.items[t.key as keyof typeof dict.treatmentsMenu.items];
                return (
                  <Link
                    key={t.slug}
                    href={`${base}/treatments/${t.slug}`}
                    className="group flex flex-col bg-ivory p-8 transition-colors hover:bg-cream"
                  >
                    <h3 className="font-display text-2xl leading-tight text-ink group-hover:text-gold-deep">
                      {item.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-taupe">{item.desc}</p>
                    <p className="mt-3 flex items-center gap-1.5 text-[11px] tracking-[0.06em] text-gold-deep/80">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M6 11s4-3.5 4-6.5A4 4 0 0 0 2 4.5C2 7.5 6 11 6 11Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
                        <circle cx="6" cy="4.5" r="1.3" stroke="currentColor" strokeWidth="1.1" />
                      </svg>
                      {dict.treatmentsMenu.areaTag}
                    </p>
                    <span className="mt-6 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {dict.treatmentsHubPage?.sections && (
        <section className="border-t border-sand bg-cream py-20 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            {dict.treatmentsHubPage.sections.map((s, i) => (
              <div key={i} className="mt-12 first:mt-0">
                <h2 className="font-display text-[1.7rem] leading-snug text-ink lg:text-[2rem]">
                  {s.heading}
                </h2>
                <p className="mt-5 text-[1.05rem] leading-[1.9] text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
