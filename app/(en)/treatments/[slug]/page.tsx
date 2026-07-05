import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n/config";
import { treatments } from "@/lib/treatments";
import Page, {
  generateMetadata as intlMeta,
} from "@/app/[locale]/treatments/[slug]/page";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
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
