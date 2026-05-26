import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { notFound } from "next/navigation";
import { Results } from "@/components/Results";
import { Testimonials } from "@/components/Testimonials";
import { Approach } from "@/components/Approach";
import { Safety } from "@/components/Safety";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { SITE_URL, clinic, medicalReviewer, contentLastReviewed } from "@/lib/clinic";
import { treatments } from "@/lib/treatments";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const base = `/${locale}`;

  const pageUrl = `${SITE_URL}/${locale}/`;
  const homeGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: dict.brand.nameFull,
        inLanguage: locale,
        isPartOf: { "@id": `${SITE_URL}/#clinic` },
        primaryImageOfPage: `${SITE_URL}/images/og-cover.png`,
        lastReviewed: contentLastReviewed,
        reviewedBy: { "@type": "Person", name: medicalReviewer.name },
        about: { "@id": `${SITE_URL}/#clinic` },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: dict.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeGraph) }}
      />

      {/* ───────────────── Hero ───────────────── */}
      <Hero dict={dict} locale={locale as Locale} />

      {/* ───────────────── Trust strip ───────────────── */}
      <section className="border-b border-sand bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          {/* Google rating */}
          <a
            href={clinic.googleProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mb-12 flex w-fit items-center gap-3 rounded-full border border-sand bg-ivory px-6 py-2.5 transition-colors hover:border-gold"
          >
            <span className="font-display text-xl text-ink">{clinic.rating.value}</span>
            <span className="text-sm tracking-wide text-gold">★★★★★</span>
            <span className="text-xs tracking-[0.1em] uppercase text-taupe">
              {clinic.rating.count} Google reviews
            </span>
          </a>

          <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {dict.trust.items.map((item, i) => (
              <div
                key={i}
                className={`px-4 text-center lg:px-8 ${
                  i !== 0 ? "lg:border-l lg:border-sand/70" : ""
                }`}
              >
                <p className="font-display text-5xl font-medium text-gold lg:text-6xl">
                  {item.value}
                </p>
                <div className="mx-auto mt-3 h-px w-6 bg-gold/40" />
                <p className="mt-3 text-xs tracking-[0.16em] uppercase text-taupe">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Treatments ───────────────── */}
      <section id="treatments" className="scroll-mt-24 bg-ivory py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow={dict.treatmentsSection.eyebrow}
            title={dict.treatmentsSection.title}
            subtitle={dict.treatmentsSection.subtitle}
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {treatments.map((t, i) => {
              const item = dict.treatmentsMenu.items[t.key as keyof typeof dict.treatmentsMenu.items];
              return (
                <Link
                  key={t.slug}
                  href={`${base}/treatments/${t.slug}`}
                  className="group relative flex flex-col rounded-sm border border-sand bg-ivory p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_24px_50px_-30px_rgba(42,36,32,0.5)]"
                >
                  <span className="font-display text-base text-gold/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-2xl leading-tight text-ink transition-colors group-hover:text-gold-deep">
                    {item.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-taupe">
                    {item.desc}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                    {dict.procedureUi.overview}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href={`${base}/treatments`}
              className="inline-flex items-center gap-2 border-b border-gold pb-1 text-xs tracking-[0.14em] uppercase text-gold-deep transition-colors hover:text-gold"
            >
              {dict.treatmentsSection.cta} →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── About ───────────────── */}
      <section id="about" className="scroll-mt-24 bg-cream py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
          {/* Clinic interior */}
          <div className="relative">
            <img
              src="/images/clinic/about.webp"
              alt={dict.about.title}
              width={1200}
              height={1500}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-sm object-cover shadow-[0_30px_70px_-40px_rgba(42,36,32,0.6)]"
            />
            <div className="absolute -bottom-6 -right-6 hidden h-40 w-40 items-center justify-center rounded-sm border border-gold/40 bg-ink text-center sm:flex">
              <div>
                <p className="font-display text-4xl font-semibold text-gold">10+</p>
                <p className="mt-1 px-4 text-[10px] tracking-[0.18em] uppercase text-ivory/70">
                  {dict.trust.items[0].label}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold">
              {dict.about.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-ink text-balance lg:text-5xl">
              {dict.about.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              {dict.about.body}
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {dict.about.points.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-ink-soft">
                  <span className="mt-1 text-gold">✦</span>
                  {p}
                </li>
              ))}
            </ul>

            {/* Medical reviewer byline — E-E-A-T authorship signal */}
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-sand pt-5 text-xs text-taupe">
              <span className="tracking-[0.1em] uppercase text-gold-deep">
                {dict.reviewer.label}
              </span>
              <span className="font-medium text-ink-soft">{medicalReviewer.name}</span>
              <span>· {medicalReviewer.credentials}</span>
              <span className="w-full text-[11px] text-taupe/80">
                {dict.reviewer.updatedLabel}: {dict.reviewer.updatedDate}
              </span>
            </div>

            <Link
              href={`${base}/about`}
              className="mt-8 inline-flex items-center gap-2 border-b border-gold pb-1 text-xs tracking-[0.14em] uppercase text-gold-deep transition-colors hover:text-gold"
            >
              {dict.about.cta} →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── How we work ───────────────── */}
      <Approach dict={dict} />

      {/* ───────────────── Before & After results ───────────────── */}
      <Results dict={dict} />

      {/* ───────────────── Safety & standards ───────────────── */}
      <Safety dict={dict} />

      {/* ───────────────── WhatsApp testimonials ───────────────── */}
      <Testimonials dict={dict} />

      {/* ───────────────── FAQ ───────────────── */}
      <Faq dict={dict} />

      {/* ───────────────── CTA banner ───────────────── */}
      <section className="relative overflow-hidden bg-ink py-28 lg:py-36">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(176,141,87,0.20),transparent_70%)]" />
          <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ivory/10" />
          <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <span className="inline-flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase text-gold">
            <span className="h-px w-8 bg-gold/40" />
            {dict.cta.eyebrow}
            <span className="h-px w-8 bg-gold/40" />
          </span>
          <h2 className="mt-6 font-display text-[2.3rem] leading-[1.1] text-ivory text-balance break-keep lg:text-[3.4rem]">
            {dict.cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory/70">
            {dict.cta.subtitle}
          </p>
          <Link
            href={`${base}/contact`}
            className="mt-10 inline-block rounded-full bg-gold px-10 py-4 text-xs tracking-[0.14em] uppercase text-white transition-all duration-300 hover:bg-gold-deep hover:shadow-[0_18px_40px_-16px_rgba(176,141,87,0.8)]"
          >
            {dict.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
