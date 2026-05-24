"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { reviewImages } from "@/lib/galleryData";
import { SectionHeading } from "./SectionHeading";

const INITIAL_COUNT = 8;

export function Testimonials({ dict }: { dict: Dictionary }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? reviewImages : reviewImages.slice(0, INITIAL_COUNT);
  const hasMore = reviewImages.length > INITIAL_COUNT;

  return (
    <section id="reviews" className="scroll-mt-24 bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={dict.testimonials.eyebrow}
          title={dict.testimonials.title}
          subtitle={dict.testimonials.subtitle}
        />

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-5">
          {visible.map((file) => {
            const src = `/images/reviews/${file}`;
            return (
              <button
                key={file}
                type="button"
                onClick={() => setLightbox(src)}
                className="group block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-md border border-sand bg-white p-2 shadow-[0_18px_40px_-28px_rgba(42,36,32,0.5)] transition-transform duration-500 hover:-translate-y-1"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="Customer WhatsApp review"
                  loading="lazy"
                  className="w-full rounded-sm"
                />
              </button>
            );
          })}
        </div>

        {hasMore && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-gold px-8 py-3 text-xs tracking-[0.14em] uppercase text-gold-deep transition-all duration-300 hover:bg-gold hover:text-white"
            >
              {expanded ? dict.testimonials.showLess : dict.testimonials.showMore}
              <span className={expanded ? "rotate-180 transition-transform" : "transition-transform"}>
                ↓
              </span>
            </button>
          </div>
        )}
      </div>

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

function WhatsAppMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 01-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.6.6-.8 1.4-.8 2.3.1 1.4 1 2.6 1.2 2.8 1.6 2.4 3.4 3.1 4.6 3.5 1.1.3 1.6.2 2 .1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.2z" />
    </svg>
  );
}
