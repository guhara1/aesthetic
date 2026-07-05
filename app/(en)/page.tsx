import { defaultLocale } from "@/lib/i18n/config";
import HomePage from "@/app/[locale]/page";

// English home, served at "/". Reuses the localized page component with the
// default locale fixed.
export default function Page() {
  return HomePage({ params: Promise.resolve({ locale: defaultLocale }) });
}
