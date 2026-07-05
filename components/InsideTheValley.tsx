"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localeBase, type Locale } from "@/lib/i18n/config";

// Inside The Valley — 9:16 portrait video shown in a phone-style frame.
// Initial paint loads only the poster image (≈40 KB). The MP4 (≈11 MB) is
// only fetched after the user taps the play overlay, so this section adds
// nothing to Core Web Vitals on first load.
export function InsideTheValley({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [playing, setPlaying] = useState(false);
  const content = dict.inside;
  const base = localeBase(locale);

  return (
    <section className="relative overflow-hidden bg-ivory py-24 lg:py-32">
      {/* Soft brand glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_30%,rgba(176,141,87,0.10),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_85%_70%,rgba(176,141,87,0.08),transparent_70%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <p className="text-[11px] tracking-[0.28em] uppercase text-gold">
            {content.eyebrow}
          </p>
          <h2 className="mt-5 font-display text-4xl leading-tight text-ink text-balance lg:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            {content.body}
          </p>
          <Link
            href={`${base}/contact`}
            className="mt-8 inline-block rounded-full bg-gold px-8 py-3.5 text-xs tracking-[0.14em] uppercase text-white transition-all duration-300 hover:bg-gold-deep hover:shadow-[0_18px_40px_-16px_rgba(176,141,87,0.8)]"
          >
            {content.cta}
          </Link>
        </div>

        {/* Phone-frame video */}
        <div className="order-1 flex justify-center lg:order-2">
          <div className="relative">
            {/* Phone bezel */}
            <div className="relative rounded-[2.5rem] border-[10px] border-ink bg-ink p-0 shadow-[0_40px_80px_-30px_rgba(42,36,32,0.55)]">
              {/* Speaker / notch */}
              <div className="absolute left-1/2 top-2 z-10 h-1.5 w-20 -translate-x-1/2 rounded-full bg-ink/90 ring-1 ring-ivory/10" />
              {/* Screen — 9:16, width capped */}
              <div className="relative aspect-[9/16] w-[260px] overflow-hidden rounded-[1.7rem] bg-ink sm:w-[300px]">
                {!playing ? (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label={content.playLabel}
                    className="group relative block h-full w-full cursor-pointer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/videos/clinic-intro-poster.webp"
                      alt={content.title}
                      width={540}
                      height={960}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 bg-ink/15 transition-colors duration-300 group-hover:bg-ink/25" />
                    <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/95 text-ink shadow-[0_18px_40px_-10px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </button>
                ) : (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video
                    src="/videos/clinic-intro.mp4"
                    poster="/videos/clinic-intro-poster.jpg"
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
            {/* Floating badge — patient-friendly hint */}
            <div className="absolute -left-3 -top-3 hidden h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-ivory text-gold sm:flex">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
