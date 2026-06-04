"use client";

import { clinic } from "@/lib/clinic";

// Mobile-only floating call button. Pulses to draw attention and dials the
// clinic on tap. Hidden on desktop (lg) where the header already exposes
// "Book a Consultation".
export function FloatingCallButton({ ariaLabel }: { ariaLabel: string }) {
  const tel = clinic.telephone2.replace(/\s/g, "");
  return (
    <a
      href={`tel:${tel}`}
      aria-label={ariaLabel}
      className="float-call-btn fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff7a2d] text-white shadow-[0_12px_28px_-8px_rgba(255,122,45,0.75)] transition-transform active:scale-95 lg:hidden"
    >
      <span className="float-call-pulse" aria-hidden />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6.5 3h3l1.5 4.5L9 9a12 12 0 006 6l1.5-2 4.5 1.5v3a2 2 0 01-2 2A16 16 0 014.5 5a2 2 0 012-2z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}
