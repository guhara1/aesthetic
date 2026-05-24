"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Faq({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="text-center">
          <p className="text-[11px] tracking-[0.28em] uppercase text-gold">
            {dict.faq.eyebrow}
          </p>
          <h2 className="mt-5 font-display text-4xl leading-tight text-ink text-balance lg:text-5xl">
            {dict.faq.title}
          </h2>
        </div>

        <dl className="mt-14 divide-y divide-sand border-y border-sand">
          {dict.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-xl leading-snug text-ink">
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 text-2xl font-light text-gold transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                </dt>
                <dd
                  className={`grid overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                  }`}
                >
                  <p className="min-h-0 max-w-2xl text-base leading-relaxed text-ink-soft">
                    {item.a}
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
