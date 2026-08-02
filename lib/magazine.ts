// Language-neutral magazine post registry. Display text comes per-locale from
// dict.magazine.posts[key].

export type Post = { slug: string; key: string; cover: string };

export const posts: Post[] = [
  {
    slug: "choosing-a-cosmetic-clinic-in-kuala-lumpur",
    key: "choosing",
    cover: "/images/magazine/choosing.webp",
  },
  {
    slug: "surgical-or-non-surgical-treatments",
    key: "surgicalVsNonsurgical",
    cover: "/images/magazine/surgical-vs-nonsurgical.webp",
  },
  {
    slug: "recovery-after-cosmetic-surgery",
    key: "recovery",
    cover: "/images/magazine/recovery.webp",
  },
  {
    slug: "bridal-skincare-pre-wedding-guide",
    key: "bridalSkincare",
    cover: "/images/magazine/bridal-skincare.webp",
  },
  {
    slug: "best-mont-kiara-facelift-clinics-near-1mk",
    key: "montKiaraFacelift",
    cover: "/images/magazine/mont-kiara-facelift.webp",
  },
  {
    slug: "cosmetic-consultation-checklist-kuala-lumpur",
    key: "consultationChecklist",
    cover: "/images/magazine/consultation-checklist.webp",
  },
  {
    slug: "cosmetic-surgery-downtime-recovery-planning-kl",
    key: "downtimePlanning",
    cover: "/images/magazine/downtime-planning.webp",
  },
  {
    slug: "cosmetic-surgery-cost-factors-kuala-lumpur",
    key: "costFactors",
    cover: "/images/magazine/cost-factors.webp",
  },
  {
    slug: "how-to-read-before-and-after-photos-cosmetic-clinic",
    key: "beforeAfterPhotos",
    cover: "/images/magazine/before-after-photos.webp",
  },
  {
    slug: "how-to-verify-cosmetic-surgeon-credentials-malaysia",
    key: "verifyCredentials",
    cover: "/images/magazine/verify-credentials.webp",
  },
  {
    slug: "how-to-prepare-your-body-before-cosmetic-surgery",
    key: "prepareBody",
    cover: "/images/magazine/prepare-body.webp",
  },
  {
    slug: "flying-home-after-cosmetic-surgery-kuala-lumpur",
    key: "flyingHome",
    cover: "/images/magazine/flying-home.webp",
  },
  {
    slug: "cosmetic-surgery-recovery-tropical-climate-kuala-lumpur",
    key: "tropicalRecovery",
    cover: "/images/magazine/tropical-recovery.webp",
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
