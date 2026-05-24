import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
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
] as const;

export function StructuredData({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const pageUrl = `${SITE_URL}/${locale}/`;
  const ogImage = `${SITE_URL}/images/og-cover.png`;
  const clinicId = `${SITE_URL}/#clinic`;

  const clinicNode = {
    "@type": ["MedicalBusiness", "MedicalClinic", "HealthAndBeautyBusiness"],
    "@id": clinicId,
    name: clinic.legalName,
    url: pageUrl,
    image: ogImage,
    logo: `${SITE_URL}/images/og-cover.png`,
    telephone: clinic.telephone,
    email: clinic.email,
    priceRange: clinic.priceRange,
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
    areaServed: { "@type": "City", name: "Kuala Lumpur" },
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
    "@graph": [clinicNode, physicianNode],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
