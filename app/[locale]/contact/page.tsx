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
import { SITE_URL, clinic, WHATSAPP_NUMBER } from "@/lib/clinic";
import { ConsultationForm } from "@/components/ConsultationForm";

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
  const languages: Record<string, string> = { "x-default": `/${defaultLocale}/contact/` };
  for (const l of locales) languages[localeHtmlLang[l]] = `/${l}/contact/`;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${dict.contactPage.title} | ${dict.brand.nameFull}`,
    description: dict.contactPage.lead,
    alternates: { canonical: `/${locale}/contact/`, languages },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const c = dict.contactPage;
  const ui = dict.procedureUi;
  const base = `/${locale}`;
  const tel = clinic.telephone.replace(/\s/g, "");
  const tel2 = clinic.telephone2.replace(/\s/g, "");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${clinic.geo.lat},${clinic.geo.lng}`;
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(c.waPrefill)}`;

  return (
    <div id="contact-page" className="bg-ivory">
      <header className="relative overflow-hidden bg-ink pt-36 pb-20 text-ivory lg:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_80%_10%,#5a4a3a_0%,#3a2f27_45%,#241d18_100%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-[11px] tracking-[0.14em] uppercase text-ivory/55">
            <ol className="flex items-center gap-2">
              <li><Link href={base} className="hover:text-gold">{ui.home}</Link></li>
              <li aria-hidden>/</li>
              <li className="text-gold">{c.title}</li>
            </ol>
          </nav>
          <h1 className="mt-8 font-display text-5xl leading-tight text-ivory lg:text-6xl">{c.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/75">{c.lead}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
        {/* Form */}
        <div className="rounded-sm border border-sand bg-cream p-7 lg:p-10">
          <ConsultationForm dict={dict} />
        </div>

        {/* Direct contact + visit */}
        <div>
          <h2 className="text-[11px] tracking-[0.28em] uppercase text-gold">{c.orTitle}</h2>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-xs tracking-[0.12em] uppercase text-white transition-opacity hover:opacity-90"
            >
              {c.whatsapp}
            </a>
            <a
              href={`tel:${tel2}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-xs tracking-[0.12em] uppercase text-ink transition-colors hover:border-gold hover:text-gold"
            >
              {c.call}
            </a>
          </div>

          {/* Google rating */}
          <a
            href={clinic.googleProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-sm border border-sand bg-white px-5 py-4 transition-colors hover:border-gold"
          >
            <span className="font-display text-3xl text-ink">{clinic.rating.value}</span>
            <span>
              <span className="flex text-gold" aria-hidden>★★★★★</span>
              <span className="mt-0.5 block text-xs text-taupe">
                {clinic.rating.count} {c.ratingLabel}
              </span>
            </span>
          </a>

          <div className="mt-10 border-t border-sand pt-8">
            <h3 className="text-[11px] tracking-[0.28em] uppercase text-gold">{c.visitTitle}</h3>
            <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed text-ink-soft">
              <p>
                {clinic.address.street},<br />
                {clinic.address.postalCode} {clinic.address.locality},<br />
                {clinic.address.region}, Malaysia
              </p>
              <p className="flex flex-col gap-1">
                <a href={`tel:${tel}`} className="hover:text-gold">{clinic.telephone}</a>
                <a href={`tel:${tel2}`} className="hover:text-gold">{clinic.telephone2}</a>
              </p>
            </address>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-gold-deep hover:text-gold"
            >
              {dict.aboutPage.directions} →
            </a>
          </div>

          <div className="mt-8 border-t border-sand pt-8">
            <h3 className="text-[11px] tracking-[0.28em] uppercase text-gold">{c.hoursTitle}</h3>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-soft">
              {dict.footer.hours}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
