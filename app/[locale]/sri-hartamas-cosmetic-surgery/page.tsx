import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  isLocale,
  intlLocales,
  buildAlternates,
  contentUrlPath,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/clinic";
import { getAreaBySlug } from "@/lib/localAreas";
import { LocalLandingPage } from "@/components/LocalLandingPage";

const SLUG = "sri-hartamas-cosmetic-surgery";

export function generateStaticParams() {
  return intlLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const c = dict.localAreas.sriHartamas;

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: buildAlternates(locale, SLUG),
    openGraph: {
      type: "website",
      title: c.metaTitle,
      description: c.metaDescription,
      url: contentUrlPath(locale, SLUG),
      images: [{ url: `${SITE_URL}/images/og-cover.png`, width: 1200, height: 630 }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function SriHartamasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const area = getAreaBySlug(SLUG);
  if (!area) notFound();
  return <LocalLandingPage area={area} dict={dict} locale={locale as Locale} />;
}
