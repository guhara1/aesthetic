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
import {
  SITE_URL,
  clinic,
  medicalReviewer,
  contentLastReviewed,
} from "@/lib/clinic";

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

  const languages: Record<string, string> = { "x-default": `/${defaultLocale}/about/` };
  for (const l of locales) languages[localeHtmlLang[l]] = `/${l}/about/`;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${dict.aboutPage.title} | ${dict.brand.nameFull}`,
    description: dict.aboutPage.lead,
    alternates: { canonical: `/${locale}/about/`, languages },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const a = dict.aboutPage;
  const ui = dict.procedureUi;
  const base = `/${locale}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${clinic.geo.lat},${clinic.geo.lng}`;

  return (
    <div className="bg-ivory">
      {/* Hero */}
      <header className="relative overflow-hidden bg-ink pt-36 pb-20 text-ivory lg:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_80%_10%,#5a4a3a_0%,#3a2f27_45%,#241d18_100%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-[11px] tracking-[0.14em] uppercase text-ivory/55">
            <ol className="flex items-center gap-2">
              <li><Link href={base} className="hover:text-gold">{ui.home}</Link></li>
              <li aria-hidden>/</li>
              <li className="text-gold">{a.title}</li>
            </ol>
          </nav>
          <h1 className="mt-8 font-display text-5xl leading-tight text-ivory lg:text-6xl">
            {a.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/75">{a.lead}</p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:grid lg:grid-cols-3 lg:gap-16 lg:px-10 lg:py-28">
        {/* Main */}
        <div className="lg:col-span-2 lg:pr-8">
          <div className="space-y-6">
            {a.story.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-ink-soft">{p}</p>
            ))}
          </div>

          <section className="mt-14 border-t border-sand pt-10">
            <h2 className="text-[11px] tracking-[0.28em] uppercase text-gold">{a.missionTitle}</h2>
            <p className="mt-5 font-display text-2xl leading-snug text-ink lg:text-3xl">
              {a.mission}
            </p>
          </section>

          {/* Editorial & medical policy — E-E-A-T / YMYL trust signal */}
          <section className="mt-14 border-t border-sand pt-10">
            <h2 className="text-[11px] tracking-[0.28em] uppercase text-gold">{a.policyTitle}</h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">{a.policy}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-sm border border-sand bg-cream px-5 py-4 text-xs text-taupe">
              <span className="tracking-[0.1em] uppercase text-gold-deep">{dict.reviewer.label}</span>
              <span className="font-medium text-ink-soft">{medicalReviewer.name}</span>
              <span>· {medicalReviewer.credentials}</span>
              <span className="w-full text-[11px] text-taupe/80">
                {dict.reviewer.updatedLabel}: {dict.reviewer.updatedDate} ({contentLastReviewed})
              </span>
            </div>
          </section>
        </div>

        {/* Contact sidebar */}
        <aside className="mt-14 lg:col-span-1 lg:mt-0">
          <div className="rounded-sm border border-sand bg-cream p-7">
            <h2 className="text-[11px] tracking-[0.28em] uppercase text-gold">{a.visitTitle}</h2>
            <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-ink-soft">
              <p>
                {clinic.address.street},<br />
                {clinic.address.postalCode} {clinic.address.locality},<br />
                {clinic.address.region}
              </p>
              <p>
                <a href={`tel:${clinic.telephone.replace(/\s/g, "")}`} className="hover:text-gold">
                  {clinic.telephone}
                </a>
              </p>
            </address>

            <h3 className="mt-7 text-[11px] tracking-[0.28em] uppercase text-gold">
              {dict.footer.hoursTitle}
            </h3>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-soft">
              {dict.footer.hours}
            </p>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-gold-deep hover:text-gold"
            >
              {a.directions} →
            </a>

            <Link
              href={`${base}/contact`}
              className="mt-7 block rounded-full bg-gold px-6 py-3.5 text-center text-xs tracking-[0.14em] uppercase text-white transition-colors hover:bg-gold-deep"
            >
              {ui.book}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
