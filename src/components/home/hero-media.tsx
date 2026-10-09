"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Photo } from "@/components/ui/photo";
import { cn } from "@/lib/cn";
import type { SitePhoto } from "@/lib/images";

export type HeroVideoSource = { src: string; type?: string };

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const noSubscription = () => () => {};
function useSaveData() {
  return useSyncExternalStore(
    noSubscription,
    () =>
      Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData,
      ),
    () => false,
  );
}

/** Seconds before the loop point at which the video dissolves into the poster. */
const LOOP_DISSOLVE_S = 0.6;
/** Fraction of the scroll distance the media layer follows (subtle parallax). */
const PARALLAX_FACTOR = 0.08;

type Phase = "hidden" | "visible" | "dissolve";

/**
 * Hero background: a still poster (the LCP image, always present) with a muted,
 * looping video that fades in over it once it is actually playing.
 *
 * - Video only on screens >= 768px, without `prefers-reduced-motion`, and
 *   without the browser's data-saver on; everyone else keeps the still photo.
 * - Pauses while the hero is scrolled out of view.
 * - Dissolves back to the poster right before each loop point so the restart
 *   reads as a soft cut instead of a jump (the poster is the clip's first frame).
 * - Slow "drift" zoom (CSS) and a light scroll parallax keep the still version
 *   alive as well.
 */
export function HeroMedia({
  poster,
  video,
}: {
  poster: SitePhoto;
  video: HeroVideoSource;
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("hidden");

  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const wideScreen = useMediaQuery("(min-width: 768px)");
  const saveData = useSaveData();
  const showVideo = wideScreen && !reducedMotion && !saveData;

  useEffect(() => {
    if (reducedMotion) return;
    const layer = layerRef.current;
    if (!layer) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.min(window.scrollY, window.innerHeight);
      layer.style.transform = `translate3d(0, ${(y * PARALLAX_FACTOR).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      layer.style.transform = "";
    };
  }, [reducedMotion]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !showVideo) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [showVideo]);

  const onTimeUpdate = () => {
    const el = videoRef.current;
    if (!el || !Number.isFinite(el.duration)) return;
    const remaining = el.duration - el.currentTime;
    if (remaining < LOOP_DISSOLVE_S) {
      setPhase((p) => (p === "visible" ? "dissolve" : p));
    } else if (el.currentTime < LOOP_DISSOLVE_S) {
      setPhase((p) => (p === "dissolve" ? "visible" : p));
    }
  };

  return (
    <div
      ref={layerRef}
      className="absolute inset-x-0 -top-[8%] -bottom-[8%] will-change-transform"
    >
      <div className="absolute inset-0 animate-drift">
        <Photo
          photo={poster}
          priority
          sizes="100vw"
          className="object-[62%_center]"
        />
        {showVideo && (
          <video
            ref={videoRef}
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-[62%_center] transition-opacity ease-out",
              phase === "visible"
                ? "opacity-100 duration-1000"
                : "opacity-0 duration-500",
            )}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setPhase((p) => (p === "hidden" ? "visible" : p))}
            onTimeUpdate={onTimeUpdate}
            onError={() => setPhase("hidden")}
          >
            <source src={video.src} type={video.type ?? "video/mp4"} />
          </video>
        )}
      </div>
    </div>
  );
}
