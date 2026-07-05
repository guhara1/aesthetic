"use client";

import { usePathname } from "next/navigation";
import { locales, localeNames, localeBase, type Locale } from "@/lib/i18n/config";

// Built as a native <details> + <a> links so it works even if client-side JS
// fails to hydrate on the static export. Hrefs are resolved from the current
// path (path-preserving), so changing language keeps your page. The default
// locale (English) is served prefix-free at the root, so switching to/from it
// adds or drops the locale prefix accordingly.
export function LanguageSwitcher({
  locale,
  variant = "light",
}: {
  locale: Locale;
  variant?: "light" | "dark";
}) {
  const pathname = usePathname() || localeBase(locale) || "/";

  // Strip the current locale's prefix to recover the locale-neutral path
  // (e.g. "/about/"). English has no prefix, so the path is used as-is.
  const currentBase = localeBase(locale);
  let rest = pathname;
  if (currentBase && (rest === currentBase || rest.startsWith(`${currentBase}/`))) {
    rest = rest.slice(currentBase.length);
  }

  function hrefFor(next: Locale) {
    let target = `${localeBase(next)}${rest}`;
    if (!target.startsWith("/")) target = `/${target}`;
    if (!target.endsWith("/")) target += "/";
    return target;
  }

  const tone =
    variant === "dark"
      ? "text-ivory/80 hover:text-ivory"
      : "text-ink-soft hover:text-gold";

  return (
    <details className="group relative">
      <summary
        className={`flex cursor-pointer list-none select-none items-center gap-1.5 text-xs uppercase tracking-[0.12em] transition-colors [&::-webkit-details-marker]:hidden ${tone}`}
      >
        <GlobeIcon />
        <span>{localeNames[locale]}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className="transition-transform group-open:rotate-180"
        >
          <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </summary>

      <ul
        role="listbox"
        className="absolute right-0 z-50 mt-3 min-w-[9rem] overflow-hidden rounded-sm border border-sand bg-ivory shadow-[0_18px_50px_-20px_rgba(42,36,32,0.4)]"
      >
        {locales.map((l) => (
          <li key={l}>
            <a
              href={hrefFor(l)}
              onClick={() => {
                document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`;
              }}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-cream ${
                l === locale ? "text-gold" : "text-ink-soft"
              }`}
            >
              {localeNames[l]}
              {l === locale && <Check />}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
      <path d="M2 6.5l2.5 2.5L10 3" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
