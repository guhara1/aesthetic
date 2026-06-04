// Language-neutral magazine post registry. Display text comes per-locale from
// dict.magazine.posts[key].

export type Post = { slug: string; key: string; cover: string };

export const posts: Post[] = [
  {
    slug: "choosing-a-cosmetic-clinic-in-kuala-lumpur",
    key: "choosing",
    cover: "/images/hero/hero-1.webp",
  },
  {
    slug: "surgical-or-non-surgical-treatments",
    key: "surgicalVsNonsurgical",
    cover: "/images/hero/hero-2.webp",
  },
  {
    slug: "recovery-after-cosmetic-surgery",
    key: "recovery",
    cover: "/images/hero/hero-3.webp",
  },
  {
    slug: "bridal-skincare-pre-wedding-guide",
    key: "bridalSkincare",
    cover: "/images/magazine/bridal-skincare.webp",
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
