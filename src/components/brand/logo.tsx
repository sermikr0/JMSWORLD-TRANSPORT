import Image from "next/image";
import logoOnDark from "@/assets/brand/logo-on-dark.png";
import logoOnLight from "@/assets/brand/logo.png";
import { site } from "@/lib/site";

/** `light` = placed on a light background, `dark` = placed on a dark background. */
export type LogoTone = "light" | "dark";

/**
 * Company logo: the JMS monogram over a North America globe, framed by red and
 * black orbit swooshes, above the JMSWORLD Transport LLC wordmark. The `dark`
 * tone uses reversed artwork (black parts drawn in white) so it reads on navy.
 */
export function Logo({
  tone = "light",
  height = 56,
  eager = false,
  className,
}: {
  tone?: LogoTone;
  /** Rendered height in CSS pixels; the width follows the artwork's aspect ratio. */
  height?: number;
  /** Load immediately, for a logo that is visible on first paint. */
  eager?: boolean;
  className?: string;
}) {
  const src = tone === "dark" ? logoOnDark : logoOnLight;

  return (
    <Image
      src={src}
      alt={site.legalName}
      height={height}
      width={Math.round((height * src.width) / src.height)}
      quality={85}
      loading={eager ? "eager" : undefined}
      className={className}
    />
  );
}
