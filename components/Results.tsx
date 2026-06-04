"use client";

import { useState } from "react";
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
  const [lightbox, setLightbox] = useState<string | null>(null);

  const items = tab === "surgical" ? surgicalGallery : nonSurgicalGallery;
  const folder = tab === "surgical" ? "surgical" : "non-surgical";

  function infoFor(item: GalleryItem): { name: string; desc: string } {
    const entry = dict.treatmentsMenu.items[item.labelKey as TreatmentKey];
    return entry ?? { name: item.labelKey, desc: "" };
  }

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
                onClick={() => setTab(t)}
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

        {/* Gallery grid — 2-column layout where side-by-side before/after
            composites span both columns (full width) and tall single shots
            pair up two per row. `grid-flow-dense` lets the browser pack
            small items into any gaps without changing DOM order. */}
        <div className="mt-12 grid grid-cols-1 grid-flow-row-dense gap-5 sm:grid-cols-2">
          {items.map((item) => {
            const src = `/images/${folder}/${item.file}`;
            const info = infoFor(item);
            const alt = `${info.name} before & after — ${dict.brand.name}, aesthetic clinic in Mont Kiara · Sri Hartamas, Kuala Lumpur`;
            return (
              <figure
                key={item.file}
                className={`group block self-start overflow-hidden rounded-sm border border-sand bg-ivory shadow-[0_18px_40px_-28px_rgba(42,36,32,0.45)] ${
                  item.wide ? "sm:col-span-2" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(src)}
                  className="relative block w-full cursor-zoom-in"
                  aria-label={alt}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
                </button>
                <figcaption className="px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg leading-tight text-ink">
                      {info.name}
                    </h3>
                    <span className="shrink-0 text-[9px] tracking-[0.18em] uppercase text-gold">
                      Before / After
                    </span>
                  </div>
                  {info.desc && (
                    <p className="mt-1.5 text-xs leading-snug text-taupe">
                      {info.desc}
                    </p>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-taupe">{dict.results.note}</p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-5 top-5 text-3xl font-light text-ivory/80 transition-colors hover:text-ivory"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt=""
            className="max-h-[88vh] max-w-full rounded-sm object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
