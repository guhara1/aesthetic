// Real patient before/after photos and WhatsApp review screenshots.
// `labelKey` for surgical items maps to dict.treatmentsMenu.items[key].name;
// non-surgical keys map to dict.results.labels[key].
// Items with `beforeFile`/`afterFile` render as a drag-to-reveal slider in
// the Results gallery. Items with `file` render as a single static photo.

export type GalleryItem =
  | { file: string; labelKey: string; wide?: boolean; beforeFile?: never; afterFile?: never; overlay?: never }
  | {
      beforeFile: string;
      afterFile: string;
      labelKey: string;
      wide?: boolean;
      file?: never;
      // Optional decorative overlay image (e.g. the Chinese 即刻 VS band)
      // shown floating between the before and after panels.
      overlay?: string;
    };

export const surgicalGallery: GalleryItem[] = [
  { beforeFile: "liposuction-before.png", afterFile: "liposuction-after.png", labelKey: "liposuction", wide: true },
  { file: "rhinoplasty.jpg", labelKey: "rhinoplasty" },
  { beforeFile: "eye-treatment-before.png", afterFile: "eye-treatment-after.png", labelKey: "eye", wide: true },
  { file: "facelift.jpg", labelKey: "facelift" },
  {
    beforeFile: "chin-implant-before.jpg",
    afterFile: "chin-implant-after.jpg",
    labelKey: "chin",
    wide: true,
    overlay: "chin-implant-label.png",
  },
  { beforeFile: "breast-implant-before.png", afterFile: "breast-implant-after.png", labelKey: "breast", wide: true },
];

export const nonSurgicalGallery: GalleryItem[] = [
  { file: "body-sculpt.jpg", labelKey: "bodySculpt" },
  { file: "hifu.jpg", labelKey: "hifu" },
  { beforeFile: "pico-laser-before.png", afterFile: "pico-laser-after.png", labelKey: "picoLaser", wide: true },
  { file: "hair-removal.jpg", labelKey: "hairRemoval" },
  { beforeFile: "cell-light-before.jpg", afterFile: "cell-light-after.jpg", labelKey: "cellLight", wide: true },
  { file: "whitening-drip.webp", labelKey: "whiteningDrip" },
  { file: "onda-pro.webp", labelKey: "onda" },
  { file: "onda-coolwaves.webp", labelKey: "onda" },
  { file: "titanium-ultrasound-1.webp", labelKey: "titanium" },
  { file: "titanium-ultrasound-2.webp", labelKey: "titanium" },
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
