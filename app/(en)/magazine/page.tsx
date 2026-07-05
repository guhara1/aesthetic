import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n/config";
import Page, { generateMetadata as intlMeta } from "@/app/[locale]/magazine/page";

export function generateMetadata(): Promise<Metadata> {
  return intlMeta({ params: Promise.resolve({ locale: defaultLocale }) });
}

export default function EnPage() {
  return Page({ params: Promise.resolve({ locale: defaultLocale }) });
}
