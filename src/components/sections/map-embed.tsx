import { ExternalLink, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * Google Maps Embed when NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY is configured;
 * otherwise a plain address panel with a directions link. No placeholder map.
 */
export function MapEmbed() {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY;

  if (key) {
    const src = `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(
      key,
    )}&q=${encodeURIComponent(site.address.full)}&zoom=15`;
    return (
      <iframe
        title={`Map of ${site.legalName}, ${site.address.line}`}
        src={src}
        height={440}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[440px] w-full border-0"
      />
    );
  }

  return (
    <div className="grid gap-8 bg-white p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
      <div className="flex items-start gap-4">
        <MapPin className="mt-1 h-6 w-6 shrink-0 text-accent-600" aria-hidden="true" />
        <address className="text-lg not-italic leading-relaxed text-ink-800">
          <span className="font-semibold text-navy-900">{site.legalName}</span>
          <br />
          {site.address.street}
          <br />
          {site.address.city}, {site.address.region} {site.address.postalCode}
        </address>
      </div>
      <div className="flex flex-wrap gap-3 lg:justify-end">
        <ButtonLink
          href={site.maps.directions}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
        >
          Get directions
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </ButtonLink>
        <ButtonLink
          href={site.maps.place}
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
        >
          Open in Google Maps
          <span className="sr-only">(opens in a new tab)</span>
        </ButtonLink>
      </div>
    </div>
  );
}
