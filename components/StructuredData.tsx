import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localeRoot, type Locale } from "@/lib/i18n/config";
import { SITE_URL, clinic, medicalReviewer } from "@/lib/clinic";

const TREATMENT_KEYS = [
  "liposuction",
  "rhinoplasty",
  "eye",
  "facelift",
  "breast",
  "chin",
  "bodySculpt",
  "hifu",
  "picoLaser",
  "hairRemoval",
  "cellLight",
  "whiteningDrip",
  "onda",
] as const;

export function StructuredData({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const pageUrl = `${SITE_URL}${localeRoot(locale)}`;
  const ogImage = `${SITE_URL}/images/og-cover.png`;
  const clinicId = `${SITE_URL}/#clinic`;

  // Preferred image — Google's March 2026 guidance asks publishers to mark a
  // single primary image explicitly via ImageObject so it doesn't have to
  // guess. Keep this in sync with the og:image used in the page metadata.
  const primaryImage = {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#primary-image`,
    url: ogImage,
    contentUrl: ogImage,
    width: 1200,
    height: 630,
    caption: `${clinic.legalName} — aesthetic & cosmetic surgery clinic in Mont Kiara · Sri Hartamas, Kuala Lumpur`,
  };

  const clinicNode = {
    "@type": ["MedicalBusiness", "MedicalClinic", "HealthAndBeautyBusiness"],
    "@id": clinicId,
    name: clinic.legalName,
    url: pageUrl,
    image: primaryImage,
    primaryImageOfPage: { "@id": `${SITE_URL}/#primary-image` },
    logo: { "@type": "ImageObject", url: `${SITE_URL}/images/brand/logo.png`, caption: clinic.legalName },
    telephone: clinic.telephone,
    priceRange: clinic.priceRange,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clinic.rating.value,
      reviewCount: clinic.rating.count,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.locality,
      addressRegion: clinic.address.region,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.geo.lat,
      longitude: clinic.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: clinic.openingHours.days,
        opens: clinic.openingHours.opens,
        closes: clinic.openingHours.closes,
      },
    ],
    medicalSpecialty: ["PlasticSurgery", "Dermatology"],
    availableService: TREATMENT_KEYS.map((key) => ({
      "@type": "MedicalProcedure",
      name: dict.treatmentsMenu.items[key].name,
      description: dict.treatmentsMenu.items[key].desc,
    })),
    review: dict.testimonials.quotes.map((q) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
      author: { "@type": "Person", name: q.author },
      reviewBody: q.text,
      itemReviewed: { "@id": clinicId },
    })),
    areaServed: [
      { "@type": "City", name: "Kuala Lumpur" },
      {
        "@type": "Place",
        name: "Mont Kiara",
        geo: {
          "@type": "GeoCircle",
          geoMidpoint: { "@type": "GeoCoordinates", latitude: 3.1718, longitude: 101.6527 },
          geoRadius: "1500",
        },
      },
      {
        "@type": "Place",
        name: "Sri Hartamas",
        geo: {
          "@type": "GeoCircle",
          geoMidpoint: { "@type": "GeoCoordinates", latitude: 3.1640, longitude: 101.6498 },
          geoRadius: "1500",
        },
      },
      { "@type": "Place", name: "Desa Sri Hartamas" },
      { "@type": "Place", name: "Solaris Mont Kiara" },
      { "@type": "Place", name: "Plaza Damas" },
    ],
    ...(clinic.sameAs.length ? { sameAs: clinic.sameAs } : {}),
  };

  const physicianNode = {
    "@type": "Physician",
    name: medicalReviewer.name,
    jobTitle: medicalReviewer.role,
    description: medicalReviewer.credentials,
    worksFor: { "@id": clinicId },
    medicalSpecialty: "PlasticSurgery",
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [clinicNode, physicianNode, primaryImage],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
