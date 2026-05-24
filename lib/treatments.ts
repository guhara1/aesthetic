import { surgicalGallery, nonSurgicalGallery } from "./galleryData";

// Language-neutral treatment registry. Display text (name, desc, overview,
// benefits, recovery, faq) is resolved per-locale from the dictionaries:
//   - name/desc  -> dict.treatmentsMenu.items[key]
//   - rich copy  -> dict.procedures[key]

export type TreatmentCategory = "surgical" | "non-surgical";

export type Treatment = {
  slug: string;
  key: string; // matches dict.treatmentsMenu.items / dict.procedures
  category: TreatmentCategory;
};

export const treatments: Treatment[] = [
  { slug: "liposuction", key: "liposuction", category: "surgical" },
  { slug: "rhinoplasty", key: "rhinoplasty", category: "surgical" },
  { slug: "eye-treatment", key: "eye", category: "surgical" },
  { slug: "facelift", key: "facelift", category: "surgical" },
  { slug: "breast-implant", key: "breast", category: "surgical" },
  { slug: "chin-implant", key: "chin", category: "surgical" },
  { slug: "body-sculpting", key: "bodySculpt", category: "non-surgical" },
  { slug: "hifu-lifting", key: "hifu", category: "non-surgical" },
  { slug: "pico-laser", key: "picoLaser", category: "non-surgical" },
  { slug: "hair-removal", key: "hairRemoval", category: "non-surgical" },
  { slug: "cell-light-therapy", key: "cellLight", category: "non-surgical" },
  { slug: "whitening-drip", key: "whiteningDrip", category: "non-surgical" },
];

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug);
}

// Before/after image file paths for a given treatment, reusing gallery data.
export function imagesForTreatment(t: Treatment): string[] {
  const source = t.category === "surgical" ? surgicalGallery : nonSurgicalGallery;
  const folder = t.category;
  return source
    .filter((item) => item.labelKey === t.key)
    .map((item) => `/images/${folder}/${item.file}`);
}
