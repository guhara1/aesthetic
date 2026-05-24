import localFont from "next/font/local";

// Self-hosted variable fonts (no build-time network fetch, unlike
// next/font/google) so the static build never fails on a font download.
export const cormorant = localFont({
  src: [{ path: "./fonts/cormorant.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Times New Roman", "serif"],
});

export const jost = localFont({
  src: [{ path: "./fonts/jost.woff2", weight: "300 600", style: "normal" }],
  variable: "--font-jost",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
