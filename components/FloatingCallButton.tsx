"use client";

// Mobile-only floating WhatsApp button. Pulses to draw attention and opens a
// WhatsApp chat with the clinic on tap. Hidden on desktop (lg) where the
// header already exposes "Book a Consultation".
const WHATSAPP_URL = "https://wasap.my/60109118518";

export function FloatingCallButton({ ariaLabel }: { ariaLabel: string }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="float-call-btn fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_12px_28px_-8px_rgba(37,211,102,0.75)] transition-transform active:scale-95 lg:hidden"
    >
      <span className="float-call-pulse" aria-hidden />
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2a9.94 9.94 0 00-8.51 15.15L2 22l4.99-1.44A9.99 9.99 0 1012 2zm0 18.2a8.2 8.2 0 01-4.18-1.15l-.3-.18-2.96.86.87-2.88-.2-.31A8.2 8.2 0 1112 20.2zm4.52-6.13c-.25-.12-1.47-.72-1.69-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06a6.7 6.7 0 01-1.97-1.21 7.4 7.4 0 01-1.36-1.7c-.14-.24-.02-.37.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z" />
      </svg>
    </a>
  );
}
