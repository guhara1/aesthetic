"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { treatments } from "@/lib/treatments";
import { LanguageSwitcher } from "./LanguageSwitcher";

const slugByKey: Record<string, string> = Object.fromEntries(
  treatments.map((t) => [t.key, t.slug]),
);

const TREATMENT_KEYS = [
  "liposuction",
  "rhinoplasty",
  "eye",
  "facelift",
  "breast",
  "chin",
  "bodySculpt",
  "hifu",
  "picoLaser",
  "hairRemoval",
  "cellLight",
  "whiteningDrip",
] as const;

const SURGICAL = ["liposuction", "rhinoplasty", "eye", "facelift", "breast", "chin"] as const;
const NON_SURGICAL = ["bodySculpt", "hifu", "picoLaser", "hairRemoval", "cellLight", "whiteningDrip"] as const;

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [treatOpen, setTreatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const base = `/${locale}`;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/doctors`, label: dict.nav.doctors },
    { href: `${base}#gallery`, label: dict.nav.gallery },
    { href: `${base}#reviews`, label: dict.nav.reviews },
    { href: `${base}/magazine`, label: dict.nav.magazine },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  // Header stays solid (ivory bg, dark text) on every page so it remains legible
  // over both light and dark hero sections.
  const solid = true;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-ivory/95 shadow-[0_1px_0_rgba(176,141,87,0.18)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/* Utility bar */}
      <div
        className={`hidden overflow-hidden border-b transition-all duration-500 md:block ${
          solid
            ? "max-h-12 border-sand/60 text-ink-soft"
            : "max-h-12 border-white/15 text-ivory/85"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[11px] tracking-[0.14em] uppercase lg:px-10">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <PinIcon /> {dict.topbar.location}
            </span>
            <span className="hidden lg:inline opacity-70">·</span>
            <span className="hidden lg:inline">{dict.topbar.hours}</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${dict.topbar.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 transition-colors hover:text-gold"
            >
              <PhoneIcon /> {dict.topbar.phone}
            </a>
            <LanguageSwitcher locale={locale} variant={solid ? "light" : "dark"} />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href={base} className="group flex flex-col leading-none">
          <span
            className={`font-display text-2xl font-semibold tracking-wide transition-colors lg:text-[1.7rem] ${
              solid ? "text-ink" : "text-ivory"
            }`}
          >
            {dict.brand.name}
          </span>
          <span
            className={`mt-1 text-[9px] tracking-[0.34em] uppercase transition-colors ${
              solid ? "text-gold" : "text-ivory/70"
            }`}
          >
            {dict.brand.tagline}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className={`hidden items-center gap-8 text-[13px] tracking-[0.08em] lg:flex ${
            solid ? "text-ink-soft" : "text-ivory/90"
          }`}
        >
          <Link href={base} className="transition-colors hover:text-gold">
            {dict.nav.home}
          </Link>

          {/* Treatments dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setTreatOpen(true)}
            onMouseLeave={() => setTreatOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 transition-colors hover:text-gold"
              aria-expanded={treatOpen}
            >
              {dict.nav.treatments}
              <svg width="9" height="9" viewBox="0 0 10 10" className={treatOpen ? "rotate-180 transition-transform" : "transition-transform"}>
                <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>

            {treatOpen && (
              <div className="absolute left-1/2 top-full z-50 w-[660px] -translate-x-1/2 pt-5">
                <div className="rounded-sm border border-sand bg-ivory p-7 text-ink shadow-[0_30px_70px_-30px_rgba(42,36,32,0.45)]">
                  <div className="grid grid-cols-2 gap-x-8">
                    {[
                      { title: dict.treatmentsMenu.surgicalTitle, keys: SURGICAL },
                      { title: dict.treatmentsMenu.skinTitle, keys: NON_SURGICAL },
                    ].map((col) => (
                      <div key={col.title}>
                        <p className="mb-2 text-[10px] tracking-[0.22em] uppercase text-gold">
                          {col.title}
                        </p>
                        {col.keys.map((key) => {
                          const item = dict.treatmentsMenu.items[key];
                          return (
                            <Link
                              key={key}
                              href={`${base}/treatments/${slugByKey[key]}`}
                              className="group block rounded-sm px-3 py-2 transition-colors hover:bg-cream"
                            >
                              <span className="block font-display text-lg leading-tight text-ink group-hover:text-gold-deep">
                                {item.name}
                              </span>
                              <span className="mt-0.5 block text-xs leading-snug text-taupe">
                                {item.desc}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`${base}/treatments`}
                    className="mt-4 block border-t border-sand pt-4 text-xs tracking-[0.14em] uppercase text-gold transition-colors hover:text-gold-deep"
                  >
                    {dict.treatmentsMenu.viewAll} →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-gold">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={`${base}/contact`}
            className={`hidden rounded-full px-6 py-2.5 text-xs tracking-[0.12em] uppercase transition-all duration-300 sm:inline-block ${
              solid
                ? "bg-gold text-white hover:bg-gold-deep"
                : "border border-ivory/60 text-ivory hover:bg-ivory hover:text-ink"
            }`}
          >
            {dict.nav.book}
          </Link>

          {/* Language switcher — visible in the bar on mobile (utility bar handles md+) */}
          <div className="md:hidden">
            <LanguageSwitcher locale={locale} variant="light" />
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className={`lg:hidden ${solid ? "text-ink" : "text-ivory"}`}
          >
            <div className="flex h-5 w-6 flex-col justify-between">
              <span className={`h-px w-full bg-current transition-transform ${mobileOpen ? "translate-y-[9px] rotate-45" : ""}`} />
              <span className={`h-px w-full bg-current transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`h-px w-full bg-current transition-transform ${mobileOpen ? "-translate-y-[9px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 pb-8 pt-2">
            <MobileLink href={base} onClick={() => setMobileOpen(false)}>
              {dict.nav.home}
            </MobileLink>
            <p className="px-2 pb-1 pt-4 text-[10px] tracking-[0.22em] uppercase text-gold">
              {dict.nav.treatments}
            </p>
            {TREATMENT_KEYS.map((key) => (
              <MobileLink
                key={key}
                href={`${base}/treatments/${slugByKey[key]}`}
                onClick={() => setMobileOpen(false)}
                small
              >
                {dict.treatmentsMenu.items[key].name}
              </MobileLink>
            ))}
            <div className="mt-3" />
            {navLinks.map((l) => (
              <MobileLink key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
                {l.label}
              </MobileLink>
            ))}
            <Link
              href={`${base}/contact`}
              onClick={() => setMobileOpen(false)}
              className="mt-5 rounded-full bg-gold px-6 py-3 text-center text-xs tracking-[0.12em] uppercase text-white"
            >
              {dict.nav.book}
            </Link>
            <div className="mt-6 border-t border-sand pt-5">
              <LanguageSwitcher locale={locale} variant="light" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function MobileLink({
  href,
  children,
  onClick,
  small,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  small?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-sm px-2 py-2.5 transition-colors hover:bg-cream ${
        small ? "text-sm text-ink-soft" : "font-display text-xl text-ink"
      }`}
    >
      {children}
    </Link>
  );
}

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 3h3l1.5 4.5L9 9a12 12 0 006 6l1.5-2 4.5 1.5v3a2 2 0 01-2 2A16 16 0 014.5 5a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
