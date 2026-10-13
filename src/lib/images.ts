import type { ImageLoaderProps } from "next/image";

/**
 * Site photography.
 *
 * Images are currently served from Unsplash (Unsplash License: free for
 * commercial use, attribution appreciated but not required). To replace them
 * with the company's own photography, drop files into /public/images and
 * change `src` below to a local path such as "/images/hero.jpg". The <Photo>
 * component switches to the built-in Next.js optimizer automatically.
 */
export type SitePhoto = {
  src: string;
  alt: string;
  credit?: { name: string; url: string };
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export const photos = {
  hero: {
    src: unsplash("photo-1766785368863-f2188a8c8b32"),
    alt: "Semi-truck pulling a dry van trailer along a divided highway at dusk",
    credit: { name: "Unsplash", url: "https://unsplash.com/photos/P0bVatS8Jdw" },
  },
  highway: {
    src: unsplash("photo-1786081061738-ed1e6abd3ac5"),
    alt: "White semi-truck travelling on an interstate beside a concrete retaining wall",
    credit: { name: "Unsplash", url: "https://unsplash.com/photos/9rgdubqB9vY" },
  },
  night: {
    src: unsplash("photo-1786081061992-640cfd629fdc"),
    alt: "Orange semi-truck on a highway at night with its running lights on",
    credit: { name: "Unsplash", url: "https://unsplash.com/photos/RxVtDbR00cg" },
  },
  yard: {
    src: unsplash("photo-1700891271072-03bef644f435"),
    alt: "Blue conventional semi-truck parked at an industrial facility",
    credit: { name: "Unsplash", url: "https://unsplash.com/photos/hS-AxFBgnV4" },
  },
  dock: {
    src: unsplash("photo-1571989928541-674d0cf46c4a"),
    alt: "Red trailer backed up to a warehouse loading door",
    credit: { name: "Unsplash", url: "https://unsplash.com/photos/20qcctvyR1Q" },
  },
} satisfies Record<string, SitePhoto>;

/**
 * Homepage hero video (muted, looping) and its poster — the poster is the clip's
 * first frame so the loop dissolve is seamless. Self-hosted from /public: a Pexels
 * clip (free license) edited to remove the truck's licence plate, door lettering,
 * unit and trailer numbers, hazmat placard numbers and the trailer's company name,
 * plus the plates of parked vehicles. Replace both files with the company's own
 * footage when available.
 */
export const heroVideo = {
  src: "/videos/hero-loop.mp4",
  type: "video/mp4",
  poster: {
    src: "/images/hero-poster.jpg",
    alt: "Red conventional semi-truck pulling a white trailer out onto the road at golden hour",
    credit: { name: "Pexels", url: "https://www.pexels.com/video/17899033/" },
  } satisfies SitePhoto,
};

export function isRemoteCdn(src: string) {
  return src.startsWith("https://images.unsplash.com/");
}

/** Lets the stock-photo CDN resize and encode instead of proxying through this server. */
export function cdnLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  return url.toString();
}
