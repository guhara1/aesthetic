// Single source of truth for the clinic's NAP (Name / Address / Phone) and
// other factual signals used across metadata and JSON-LD structured data.
//
// NAP, phone and rating below are from the live Google Business Profile.
// ⚠️ YMYL NOTE: the medical reviewer (name / credentials) is still a
// placeholder and must be replaced with the real licensed practitioner before
// publishing — accurate authorship is required for medical (YMYL) E-E-A-T.

export const SITE_URL = "https://aesthetic-9ot.pages.dev";

// E.164 digits used for WhatsApp / tel links (no spaces or symbols).
export const WHATSAPP_NUMBER = "60109118518";

export const clinic = {
  legalName: "The Valley Beauty Medical Spa",
  shortName: "The Valley",
  address: {
    street: "Lot 22-1, Wisma Rapid, Jalan 30/70A, Desa Sri Hartamas",
    locality: "Kuala Lumpur",
    region: "Wilayah Persekutuan Kuala Lumpur",
    postalCode: "50480",
    country: "MY",
  },
  // Desa Sri Hartamas, Kuala Lumpur (approximate — refine if needed).
  geo: { lat: 3.1623, lng: 101.6497 },
  telephone: "+60 10-911 8518",
  priceRange: "$$$",
  googleProfile: "https://share.google/EeVrX3evtp85hVgeZ",
  sameAs: ["https://share.google/EeVrX3evtp85hVgeZ"],
  rating: { value: 4.7, count: 45 },
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
