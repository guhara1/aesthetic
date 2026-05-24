import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales, localeHtmlLang, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "The Valley Beauty Medical Spa — Aesthetic & Cosmetic Surgery, Kuala Lumpur",
  description:
    "A premium aesthetic and cosmetic surgery clinic in Kuala Lumpur. Liposuction, rhinoplasty, facelift, eye treatment, breast & chin implants, skin care — led by experienced, board-certified specialists.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={localeHtmlLang[locale]} className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-screen antialiased">
        <Header dict={dict} locale={locale as Locale} />
        <main>{children}</main>
        <Footer dict={dict} locale={locale as Locale} />
      </body>
    </html>
  );
}
