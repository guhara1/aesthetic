// Single source of truth for the clinic's NAP (Name / Address / Phone) and
// other factual signals used across metadata and JSON-LD structured data.
//
// ⚠️ YMYL NOTE: items marked TODO must be replaced with real, verifiable
// information before publishing. Accurate authorship, licensing and contact
// details are required for medical (YMYL) E-E-A-T and Google News eligibility.

export const SITE_URL = "https://aesthetic-9ot.pages.dev";

export const clinic = {
  legalName: "The Valley Beauty Medical Spa",
  shortName: "The Valley",
  // TODO: replace with the registered clinic address in Kuala Lumpur.
  address: {
    street: "[Street address]",
    locality: "Kuala Lumpur",
    region: "Wilayah Persekutuan",
    postalCode: "[Postcode]",
    country: "MY",
  },
  // Approximate KL city centre — TODO: set exact clinic coordinates.
  geo: { lat: 3.139, lng: 101.6869 },
  telephone: "+60 3-0000 0000",
  email: "hello@thevalley.example",
  priceRange: "$$$",
  // TODO: add real profile URLs (Instagram, Facebook, Google Business, etc.).
  sameAs: [] as string[],
  // Days the clinic is open (Mon–Sat, 10:00–19:00).
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "19:00",
  },
} as const;

// Editorial / authorship signals (E-E-A-T). TODO: replace with the real
// licensed practitioner who reviews the clinical content.
export const medicalReviewer = {
  name: "Dr. [Full Name]",
  credentials: "[Qualifications, e.g. MBBS, MMC Reg. No.]",
  role: "Aesthetic & Cosmetic Surgeon",
} as const;

// ISO date the homepage content was last reviewed.
export const contentLastReviewed = "2026-05-24";
