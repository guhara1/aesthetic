import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

const TREATMENT_KEYS = [
  "liposuction",
  "rhinoplasty",
  "eye",
  "facelift",
  "breast",
  "chin",
] as const;

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const base = `/${locale}`;
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-ink text-ivory/80">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <p className="font-display text-3xl font-semibold tracking-wide text-ivory">
              {dict.brand.name}
            </p>
            <p className="mt-1 text-[10px] tracking-[0.32em] uppercase text-gold">
              {dict.brand.tagline}
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/65">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] tracking-[0.22em] uppercase text-gold">
              {dict.footer.exploreTitle}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { href: base, label: dict.nav.home },
                { href: `${base}#about`, label: dict.nav.about },
                { href: `${base}#doctors`, label: dict.nav.doctors },
                { href: `${base}#gallery`, label: dict.nav.gallery },
                { href: `${base}#reviews`, label: dict.nav.reviews },
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
              {TREATMENT_KEYS.map((key) => (
                <li key={key}>
                  <Link
                    href={`${base}#treatments`}
                    className="text-ivory/70 transition-colors hover:text-gold"
                  >
                    {dict.treatmentsMenu.items[key].name}
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
            <a
              href={`tel:${dict.topbar.phone.replace(/\s/g, "")}`}
              className="mt-2 block text-sm text-ivory/70 transition-colors hover:text-gold"
            >
              {dict.topbar.phone}
            </a>
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
