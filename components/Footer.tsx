import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { clinic } from "@/lib/clinic";
import { treatments } from "@/lib/treatments";

const footerTreatments = treatments.filter((t) => t.category === "surgical");

const mapQuery = encodeURIComponent(
  `${clinic.legalName}, ${clinic.address.street}, ${clinic.address.postalCode} ${clinic.address.locality}`,
);
const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&z=16&output=embed`;

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const base = `/${locale}`;
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-ink text-ivory/80">
      {/* Location map — full-width band above the footer */}
      <div className="relative border-b border-ivory/12">
        <iframe
          title={`${clinic.legalName} — ${clinic.address.locality}`}
          src={mapEmbedSrc}
          width="100%"
          height="420"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block w-full grayscale-[0.2] [color-scheme:light]"
          style={{ border: 0 }}
        />
        <div className="pointer-events-none absolute left-1/2 top-6 z-10 flex w-full max-w-7xl -translate-x-1/2 items-start justify-between px-6 lg:px-10">
          <div className="pointer-events-auto rounded-sm bg-ink/85 px-5 py-4 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm">
            <h4 className="text-[10px] tracking-[0.22em] uppercase text-gold">
              {dict.footer.findUsTitle}
            </h4>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ivory/80">
              {dict.topbar.location}
            </p>
            <a
              href={clinic.googleProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-gold transition-colors hover:text-ivory"
            >
              {dict.footer.directions}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <img
              src="/images/brand/logo-light.png"
              alt={dict.brand.nameFull}
              width={1043}
              height={700}
              loading="lazy"
              className="h-20 w-auto"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/65">
              {dict.footer.tagline}
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                href={clinic.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-[0_8px_20px_-8px_rgba(24,119,242,0.8)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <FacebookIcon />
              </a>
              <a
                href={clinic.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] text-white shadow-[0_8px_20px_-8px_rgba(214,36,159,0.8)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] tracking-[0.22em] uppercase text-gold">
              {dict.footer.exploreTitle}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { href: base, label: dict.nav.home },
                { href: `${base}/about`, label: dict.nav.about },
                { href: `${base}#gallery`, label: dict.nav.gallery },
                { href: `${base}#reviews`, label: dict.nav.reviews },
                { href: `${base}/magazine`, label: dict.nav.magazine },
                { href: `${base}#faq`, label: dict.faq.title },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ivory/70 transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] tracking-[0.22em] uppercase text-gold">
              {dict.footer.treatmentsTitle}
            </h4>
            <ul className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              {footerTreatments.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`${base}/treatments/${t.slug}`}
                    className="text-ivory/70 transition-colors hover:text-gold"
                  >
                    {dict.treatmentsMenu.items[t.key as keyof typeof dict.treatmentsMenu.items].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + hours */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] tracking-[0.22em] uppercase text-gold">
              {dict.footer.contactTitle}
            </h4>
            <p className="mt-5 text-sm leading-relaxed text-ivory/70">
              {dict.topbar.location}
            </p>
            {[dict.topbar.phone, clinic.telephone2].map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="mt-2 block text-sm text-ivory/70 transition-colors hover:text-gold"
              >
                {phone}
              </a>
            ))}
            <h4 className="mt-6 text-[10px] tracking-[0.22em] uppercase text-gold">
              {dict.footer.hoursTitle}
            </h4>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ivory/70">
              {dict.footer.hours}
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-ivory/12 pt-8">
          <p className="text-xs leading-relaxed text-ivory/45">
            {dict.footer.disclaimer}
          </p>
          <p className="mt-3 text-xs text-ivory/45">
            © {year} {dict.brand.nameFull}. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}
