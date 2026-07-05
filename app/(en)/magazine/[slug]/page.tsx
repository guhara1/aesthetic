import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n/config";
import { posts } from "@/lib/magazine";
import Page, {
  generateMetadata as intlMeta,
} from "@/app/[locale]/magazine/[slug]/page";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return intlMeta({ params: Promise.resolve({ locale: defaultLocale, slug }) });
}

export default async function EnPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return Page({ params: Promise.resolve({ locale: defaultLocale, slug }) });
}
