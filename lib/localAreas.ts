// Language-neutral local landing areas. Display text (title, lead, sections,
// faq, etc.) is resolved per-locale from dict.localAreas[key].

export type LocalArea = {
  slug: string;
  key: "montKiara" | "sriHartamas";
  geo: { lat: number; lng: number };
};

export const localAreas: LocalArea[] = [
  {
    slug: "mont-kiara-aesthetic-clinic",
    key: "montKiara",
    geo: { lat: 3.1718, lng: 101.6527 },
  },
  {
    slug: "sri-hartamas-cosmetic-surgery",
    key: "sriHartamas",
    geo: { lat: 3.164, lng: 101.6498 },
  },
];

export function getAreaBySlug(slug: string): LocalArea | undefined {
  return localAreas.find((a) => a.slug === slug);
}
