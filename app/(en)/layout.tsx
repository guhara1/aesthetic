import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n/config";
import { SiteShell, buildRootMetadata } from "@/components/SiteShell";

// Root layout for the default locale (English), served prefix-free at "/".
// This is a separate root layout from the prefixed `[locale]` tree; navigating
// between the two triggers a full page load (expected for multiple root
// layouts).
export function generateMetadata(): Promise<Metadata> {
  return buildRootMetadata(defaultLocale);
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale={defaultLocale}>{children}</SiteShell>;
}
