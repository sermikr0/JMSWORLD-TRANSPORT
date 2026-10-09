import { site } from "@/lib/site";

/**
 * Structured data limited to facts we can verify: legal name, address, phone,
 * and the USDOT/MC identifiers. No ratings, reviews, hours or service claims.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.legalName,
    url: site.url,
    telephone: site.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    identifier: [
      { "@type": "PropertyValue", propertyID: "USDOT", value: site.usdot },
      { "@type": "PropertyValue", propertyID: "MC", value: site.mc },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
