// Real patient before/after photos and WhatsApp review screenshots.
// `labelKey` for surgical items maps to dict.treatmentsMenu.items[key].name;
// non-surgical keys map to dict.results.labels[key].
// `wide: true` flags side-by-side before/after composites so the gallery
// grid gives them double width instead of squeezing them.

export type GalleryItem = { file: string; labelKey: string; wide?: boolean };

export const surgicalGallery: GalleryItem[] = [
  { file: "liposuction.png", labelKey: "liposuction", wide: true },
  { file: "rhinoplasty.jpg", labelKey: "rhinoplasty" },
  { file: "eye-treatment.png", labelKey: "eye", wide: true },
  { file: "facelift.jpg", labelKey: "facelift" },
  { file: "chin-implant.jpg", labelKey: "chin" },
  { file: "breast-implant.png", labelKey: "breast", wide: true },
];

export const nonSurgicalGallery: GalleryItem[] = [
  { file: "body-sculpt.jpg", labelKey: "bodySculpt" },
  { file: "hifu.jpg", labelKey: "hifu" },
  { file: "pico-laser.png", labelKey: "picoLaser", wide: true },
  { file: "hair-removal.jpg", labelKey: "hairRemoval" },
  { file: "cell-light.jpg", labelKey: "cellLight", wide: true },
  { file: "whitening-drip.webp", labelKey: "whiteningDrip" },
];

export const reviewImages: string[] = [
  "review-01.png",
  "review-02.jpg",
  "review-03.jpg",
  "review-04.jpg",
  "review-05.jpg",
  "review-06.jpg",
  "review-07.jpg",
  "review-08.jpg",
  "review-09.jpg",
  "review-10.jpg",
  "review-11.png",
  "review-12.jpg",
  "review-13.jpg",
  "review-14.jpg",
];
