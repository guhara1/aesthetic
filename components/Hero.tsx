"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

// Language-neutral slide metadata; copy comes from dict.heroSlides per locale.
const SLIDE_META = [
  {
    img: "/images/hero/hero-1.webp",
    imgMobile: "/images/hero/hero-1-mobile.webp",
    align: "left" as const,
  },
  {
    img: "/images/hero/hero-2.webp",
    imgMobile: "/images/hero/hero-2-mobile.webp",
    align: "left" as const,
  },
  {
    img: "/images/hero/hero-3.webp",
    imgMobile: "/images/hero/hero-3-mobile.webp",
    align: "right" as const,
  },
];

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [index, setIndex] = useState(0);
  const base = `/${locale}`;
  const count = SLIDE_META.length;

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -45) go(1);
    else if (dx > 45) go(-1);
    touchX.current = null;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={dict.brand.nameFull}
      className="relative w-full overflow-hidden bg-cream"
    >
      <div
        className="relative h-[78vh] min-h-[500px] w-full sm:h-[88vh] sm:min-h-[560px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {SLIDE_META.map((meta, i) => {
          const slide = { ...meta, ...dict.heroSlides[i] };
          const active = i === index;
          return (
            <div
              key={slide.img}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {/* Art-directed: portrait image on phones, 16:9 on larger screens */}
              <picture>
                <source media="(max-width: 639px)" srcSet={slide.imgMobile} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.img}
                  alt={`${slide.eyebrow} — ${dict.brand.nameFull}, Kuala Lumpur`}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                  className={`absolute inset-0 h-full w-full object-cover object-top ${
                    slide.align === "left" ? "sm:object-right" : "sm:object-left"
                  }`}
                />
              </picture>
              {/* Legibility scrim on the text side */}
              <div
                className={`absolute inset-0 ${
                  slide.align === "left"
                    ? "bg-gradient-to-r from-white/90 via-white/45 to-transparent"
                    : "bg-gradient-to-l from-white/90 via-white/45 to-transparent"
                }`}
              />

              {/* Text */}
              <div className="absolute inset-0">
                <div className="mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10">
                  <div
                    className={`max-w-[88%] sm:max-w-xl ${
                      slide.align === "right" ? "ml-auto text-right" : ""
                    } ${active ? "animate-fade-up" : ""}`}
                  >
                    <p
                      className={`flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-gold-deep ${
                        slide.align === "right" ? "justify-end" : ""
                      }`}
                    >
                      {slide.align === "left" && <span className="h-px w-10 bg-gold/70" />}
                      {slide.eyebrow}
                      {slide.align === "right" && <span className="h-px w-10 bg-gold/70" />}
                    </p>
                    <h1 className="mt-5 font-display text-[1.9rem] font-medium leading-[1.12] text-ink text-balance break-keep sm:mt-6 sm:text-5xl sm:leading-[1.04] lg:text-[4.4rem]">
                      {slide.title.map((line, k) => (
                        <span key={k} className="block">
                          {line}
                        </span>
                      ))}
                    </h1>
                    <p
                      className={`mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg ${
                        slide.align === "right" ? "ml-auto" : ""
                      }`}
                    >
                      {slide.subtitle}
                    </p>
                    <div
                      className={`mt-9 flex flex-col gap-4 sm:flex-row sm:items-center ${
                        slide.align === "right" ? "sm:justify-end" : ""
                      }`}
                    >
                      <Link
                        href={`${base}/contact`}
                        className="rounded-full bg-gold px-8 py-4 text-center text-xs tracking-[0.14em] uppercase text-white transition-colors duration-300 hover:bg-gold-deep"
                      >
                        {dict.hero.ctaPrimary}
                      </Link>
                      <Link
                        href={`${base}/treatments`}
                        className="group flex items-center justify-center gap-2 text-xs tracking-[0.14em] uppercase text-ink-soft transition-colors hover:text-gold sm:justify-start"
                      >
                        {dict.hero.ctaSecondary}
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Controls */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink backdrop-blur transition-colors hover:bg-white sm:flex lg:left-6"
        >
          <span className="text-lg leading-none">‹</span>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink backdrop-blur transition-colors hover:bg-white sm:flex lg:right-6"
        >
          <span className="text-lg leading-none">›</span>
        </button>

        {/* Bottom controls — dots, flanked by prev/next arrows on mobile */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 bg-white/70 text-ink backdrop-blur transition-colors hover:bg-white sm:hidden"
          >
            <span className="text-base leading-none">‹</span>
          </button>

          <div className="flex items-center gap-3">
            {SLIDE_META.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-gold" : "w-2.5 bg-ink/25 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 bg-white/70 text-ink backdrop-blur transition-colors hover:bg-white sm:hidden"
          >
            <span className="text-base leading-none">›</span>
          </button>
        </div>
      </div>
    </section>
  );
}
