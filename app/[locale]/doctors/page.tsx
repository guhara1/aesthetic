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
import { SITE_URL, medicalReviewer } from "@/lib/clinic";

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
  const languages: Record<string, string> = { "x-default": `/${defaultLocale}/doctors/` };
  for (const l of locales) languages[localeHtmlLang[l]] = `/${l}/doctors/`;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${dict.doctorsPage.title} | ${dict.brand.nameFull}`,
    description: dict.doctorsPage.lead,
    alternates: { canonical: `/${locale}/doctors/`, languages },
  };
}

export default async function DoctorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const d = dict.doctorsPage;
  const ui = dict.procedureUi;
  const base = `/${locale}`;

  return (
    <div className="bg-ivory">
      <header className="relative overflow-hidden bg-ink pt-36 pb-20 text-ivory lg:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_80%_10%,#5a4a3a_0%,#3a2f27_45%,#241d18_100%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-[11px] tracking-[0.14em] uppercase text-ivory/55">
            <ol className="flex items-center gap-2">
              <li><Link href={base} className="hover:text-gold">{ui.home}</Link></li>
              <li aria-hidden>/</li>
              <li className="text-gold">{d.title}</li>
            </ol>
          </nav>
          <h1 className="mt-8 font-display text-5xl leading-tight text-ivory lg:text-6xl">{d.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/75">{d.lead}</p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {d.roles.map((role, i) => (
            <div key={i} className="group">
              <div className="aspect-[3/4] w-full rounded-sm bg-[linear-gradient(160deg,#efe6d8,#d8c6ac)] transition-transform duration-500 group-hover:-translate-y-1" />
              <div className="mt-5 text-center">
                <div className="mx-auto h-px w-10 bg-gold/50" />
                <p className="mt-4 font-display text-2xl text-ink">Dr. ——</p>
                <p className="mt-1 text-xs tracking-[0.14em] uppercase text-taupe">{role}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-14 max-w-2xl text-center text-sm leading-relaxed text-taupe">
          {d.note}
        </p>

        {/* Medical reviewer */}
        <div className="mx-auto mt-12 max-w-xl rounded-sm border border-sand bg-cream p-7 text-center">
          <p className="text-[10px] tracking-[0.22em] uppercase text-gold">{d.reviewerTitle}</p>
          <p className="mt-3 font-display text-2xl text-ink">{medicalReviewer.name}</p>
          <p className="mt-1 text-sm text-ink-soft">{medicalReviewer.credentials}</p>
          <p className="mt-1 text-xs tracking-[0.14em] uppercase text-taupe">{medicalReviewer.role}</p>
        </div>

        <div className="mt-14 text-center">
          <Link
            href={`${base}/contact`}
            className="inline-block rounded-full bg-gold px-10 py-4 text-xs tracking-[0.14em] uppercase text-white transition-colors hover:bg-gold-deep"
          >
            {ui.book}
          </Link>
        </div>
      </div>
    </div>
  );
}
