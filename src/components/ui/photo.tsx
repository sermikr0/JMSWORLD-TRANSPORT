"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { cdnLoader, isRemoteCdn, type SitePhoto } from "@/lib/images";

/**
 * Full-bleed photograph. Always `fill`, so the parent must be positioned
 * and sized. Uses the Unsplash CDN for remote photos and the built-in
 * optimizer for local files under /public.
 *
 * Client Component because next/image's `loader` prop must be a function
 * defined on the client side of the boundary.
 */
export function Photo({
  photo,
  sizes = "100vw",
  priority = false,
  quality = 75,
  className,
}: {
  photo: SitePhoto;
  sizes?: string;
  priority?: boolean;
  quality?: 60 | 75 | 85;
  className?: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      loader={isRemoteCdn(photo.src) ? cdnLoader : undefined}
      className={cn("object-cover", className)}
    />
  );
}
