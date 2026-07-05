import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, intlLocales } from "@/lib/i18n/config";
import { SiteShell, buildRootMetadata } from "@/components/SiteShell";

// English is served prefix-free at the site root (see app/(en)/), so the
// prefixed tree only emits the non-default locales.
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
  return buildRootMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <SiteShell locale={locale}>{children}</SiteShell>;
}
