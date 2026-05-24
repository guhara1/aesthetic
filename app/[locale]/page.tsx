import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { notFound } from "next/navigation";
import { Results } from "@/components/Results";
import { Testimonials } from "@/components/Testimonials";

const TREATMENT_KEYS = [
  "liposuction",
  "rhinoplasty",
  "eye",
  "facelift",
  "breast",
  "chin",
  "skincare",
  "aesthetic",
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const base = `/${locale}`;

  return (
    <>
      {/* ───────────────── Hero ───────────────── */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-[radial-gradient(120%_120%_at_75%_15%,#5a4a3a_0%,#3a2f27_45%,#241d18_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_30%,rgba(176,141,87,0.32),transparent_60%)]" />
          <div className="absolute -right-24 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full border border-ivory/10" />
          <div className="absolute -right-10 top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full border border-gold/20" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:px-10">
          <div className="max-w-2xl animate-fade-up">
            <p className="flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-gold">
              <span className="h-px w-10 bg-gold/70" />
              {dict.hero.eyebrow}
            </p>
            <h1 className="mt-7 font-display text-5xl font-medium leading-[1.05] text-ivory text-balance sm:text-6xl lg:text-[4.6rem]">
              {dict.hero.title.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ivory/75 sm:text-lg">
              {dict.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href={`${base}#contact`}
                className="rounded-full bg-gold px-8 py-4 text-center text-xs tracking-[0.14em] uppercase text-white transition-all duration-300 hover:bg-gold-deep"
              >
                {dict.hero.ctaPrimary}
              </Link>
              <Link
                href={`${base}#treatments`}
                className="group flex items-center justify-center gap-2 text-xs tracking-[0.14em] uppercase text-ivory/85 transition-colors hover:text-gold sm:justify-start"
              >
                {dict.hero.ctaSecondary}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Trust strip ───────────────── */}
      <section className="border-b border-sand bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 py-14 lg:grid-cols-4 lg:px-10">
          {dict.trust.items.map((item, i) => (
            <div
              key={i}
              className={`px-4 text-center lg:px-8 ${
                i !== 0 ? "lg:border-l lg:border-sand" : ""
              }`}
            >
              <p className="font-display text-4xl font-semibold text-gold lg:text-5xl">
                {item.value}
              </p>
              <p className="mt-2 text-xs tracking-[0.12em] uppercase text-taupe">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────── Treatments ───────────────── */}
      <section id="treatments" className="scroll-mt-24 bg-ivory py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold">
              {dict.treatmentsSection.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-ink text-balance lg:text-5xl">
              {dict.treatmentsSection.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              {dict.treatmentsSection.subtitle}
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-4">
            {TREATMENT_KEYS.map((key, i) => {
              const item = dict.treatmentsMenu.items[key];
              return (
                <Link
                  key={key}
                  href={`${base}#contact`}
                  className="group relative flex flex-col bg-ivory p-8 transition-colors duration-300 hover:bg-cream"
                >
                  <span className="font-display text-sm text-gold/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-2xl leading-tight text-ink transition-colors group-hover:text-gold-deep">
                    {item.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-taupe">
                    {item.desc}
                  </p>
                  <span className="mt-6 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href={`${base}#contact`}
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
          {/* Image placeholder panel */}
          <div className="relative">
            <div className="aspect-[4/5] w-full rounded-sm bg-[linear-gradient(150deg,#e8ddcc,#cdbba1)]" />
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
            <Link
              href={`${base}#contact`}
              className="mt-10 inline-flex items-center gap-2 border-b border-gold pb-1 text-xs tracking-[0.14em] uppercase text-gold-deep transition-colors hover:text-gold"
            >
              {dict.about.cta} →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── Doctors teaser ───────────────── */}
      <section id="doctors" className="scroll-mt-24 bg-ivory py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold">
              {dict.doctors.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-ink text-balance lg:text-5xl">
              {dict.doctors.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              {dict.doctors.subtitle}
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="group">
                <div className="aspect-[3/4] w-full rounded-sm bg-[linear-gradient(160deg,#efe6d8,#d8c6ac)] transition-transform duration-500 group-hover:-translate-y-1" />
                <div className="mt-5 text-center">
                  <div className="mx-auto h-px w-10 bg-gold/50" />
                  <p className="mt-4 font-display text-xl text-ink">Dr. ——</p>
                  <p className="mt-1 text-xs tracking-[0.14em] uppercase text-taupe">
                    {dict.brand.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href={`${base}#contact`}
              className="inline-flex items-center gap-2 border-b border-gold pb-1 text-xs tracking-[0.14em] uppercase text-gold-deep transition-colors hover:text-gold"
            >
              {dict.doctors.cta} →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── Before & After results ───────────────── */}
      <Results dict={dict} />

      {/* ───────────────── WhatsApp testimonials ───────────────── */}
      <Testimonials dict={dict} />

      {/* ───────────────── CTA banner ───────────────── */}
      <section className="bg-ink py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p className="text-[11px] tracking-[0.28em] uppercase text-gold">
            {dict.cta.eyebrow}
          </p>
          <h2 className="mt-5 font-display text-4xl leading-tight text-ivory text-balance lg:text-[3.4rem]">
            {dict.cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory/70">
            {dict.cta.subtitle}
          </p>
          <Link
            href={`${base}#contact`}
            className="mt-10 inline-block rounded-full bg-gold px-10 py-4 text-xs tracking-[0.14em] uppercase text-white transition-all duration-300 hover:bg-gold-deep"
          >
            {dict.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
