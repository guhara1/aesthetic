"use client";

import { useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  surgicalGallery,
  nonSurgicalGallery,
  type GalleryItem,
} from "@/lib/galleryData";
import { SectionHeading } from "./SectionHeading";

type Tab = "surgical" | "nonSurgical";

type TreatmentKey = keyof Dictionary["treatmentsMenu"]["items"];

export function Results({ dict }: { dict: Dictionary }) {
  const [tab, setTab] = useState<Tab>("surgical");
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  const items = tab === "surgical" ? surgicalGallery : nonSurgicalGallery;
  const folder = tab === "surgical" ? "surgical" : "non-surgical";
  const count = items.length;
  const safeIndex = ((index % count) + count) % count;
  const current = items[safeIndex];

  function infoFor(item: GalleryItem): { name: string; desc: string } {
    const entry = dict.treatmentsMenu.items[item.labelKey as TreatmentKey];
    return entry ?? { name: item.labelKey, desc: "" };
  }

  function go(dir: number) {
    setIndex((i) => (i + dir + count) % count);
  }

  function switchTab(t: Tab) {
    setTab(t);
    setIndex(0);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -45) go(1);
    else if (dx > 45) go(-1);
    touchX.current = null;
  }

  const info = infoFor(current);
  const alt = `${info.name} before & after — ${dict.brand.name}, aesthetic clinic in Mont Kiara · Sri Hartamas, Kuala Lumpur`;
  const isPair = "beforeFile" in current && current.beforeFile;

  return (
    <section id="gallery" className="scroll-mt-24 bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={dict.results.eyebrow}
          title={dict.results.title}
          subtitle={dict.results.subtitle}
        />

        {/* Tabs */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-sand bg-ivory p-1">
            {(["surgical", "nonSurgical"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => switchTab(t)}
                className={`rounded-full px-6 py-2.5 text-xs tracking-[0.12em] uppercase transition-all duration-300 ${
                  tab === t
                    ? "bg-gold text-white shadow-[0_8px_20px_-10px_rgba(176,141,87,0.8)]"
                    : "text-ink-soft hover:text-gold"
                }`}
              >
                {dict.results.tabs[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="mt-12">
          <div
            className="relative mx-auto max-w-5xl overflow-hidden rounded-sm border border-sand bg-ivory shadow-[0_24px_60px_-30px_rgba(42,36,32,0.5)]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Frame — 2:1 ratio fits side-by-side pairs nicely on desktop;
                stacks gracefully on mobile via inner grid responsiveness. */}
            <div className="relative aspect-[16/10] w-full bg-ink sm:aspect-[2/1]">
              {isPair ? (
                <div className="grid h-full grid-cols-2">
                  {/* Before */}
                  <div className="relative h-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={`b-${current.beforeFile}`}
                      src={`/images/${folder}/${current.beforeFile}`}
                      alt={`${info.name} before`}
                      width={900}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                    <span className="absolute left-3 top-3 rounded-sm bg-ink/65 px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase text-ivory backdrop-blur-sm">
                      {dict.results.beforeLabel ?? "Before"}
                    </span>
                  </div>
                  {/* After */}
                  <div className="relative h-full overflow-hidden border-l border-ivory/80">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={`a-${current.afterFile}`}
                      src={`/images/${folder}/${current.afterFile}`}
                      alt={`${info.name} after`}
                      width={900}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                    <span className="absolute right-3 top-3 rounded-sm bg-ink/65 px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase text-ivory backdrop-blur-sm">
                      {dict.results.afterLabel ?? "After"}
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={`s-${(current as { file: string }).file}`}
                    src={`/images/${folder}/${(current as { file: string }).file}`}
                    alt={alt}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </>
              )}
            </div>

            {/* Caption bar */}
            <div className="flex items-center justify-between gap-4 border-t border-sand bg-ivory px-6 py-4">
              <div>
                <h3 className="font-display text-xl leading-tight text-ink">{info.name}</h3>
                {info.desc && (
                  <p className="mt-0.5 text-xs leading-snug text-taupe">{info.desc}</p>
                )}
              </div>
              <span className="shrink-0 font-display text-sm text-gold">
                {safeIndex + 1} / {count}
              </span>
            </div>
          </div>

          {/* Control bar — prev / dots / next, all under the image so nothing
              covers the photo itself. */}
          <div className="mx-auto mt-6 flex max-w-5xl items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={dict.results.prevLabel ?? "Previous"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-ivory text-ink shadow-[0_6px_16px_-8px_rgba(42,36,32,0.4)] transition hover:bg-white hover:border-gold/40 hover:text-gold-deep"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex items-center gap-2 px-1">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === safeIndex}
                  className="group flex h-9 items-center justify-center px-1"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === safeIndex ? "w-8 bg-gold" : "w-2.5 bg-ink/25 group-hover:bg-ink/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label={dict.results.nextLabel ?? "Next"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-ivory text-ink shadow-[0_6px_16px_-8px_rgba(42,36,32,0.4)] transition hover:bg-white hover:border-gold/40 hover:text-gold-deep"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-taupe">{dict.results.note}</p>
      </div>
    </section>
  );
}
