import { forwardRef, useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const fn = () => setReduce(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduce;
}

export type VideoHeroProps = {
  posterSrc: string;
  /** URL TikTok (fallback si `localVideoBase` absent) */
  videoSrc: string | null;
  /**
   * Chemin sans extension vers les fichiers locaux (ex. "/videos/boum-burger").
   * Si fourni, on rend un `<video>` natif : `.webm` en priorité, `.mp4` en fallback
   * ET `.jpg` en poster. Strictement meilleure UX que l'embed TikTok (autoplay, silencieux, loop).
   */
  localVideoBase?: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
};

/** TikTok video IDs can include query strings: …/video/123?q=… */
function parseTikTokVideoId(url: string): string | null {
  const m = url.match(/video\/(\d+)/);
  return m ? m[1] : null;
}

/**
 * Hero plein écran Mon Boum.
 * Priorité des sources :
 *   1. `localVideoBase` → <video> natif autoplay muted loop (meilleure UX + perf)
 *   2. `videoSrc` TikTok → iframe embed (fallback cross-origin, pas toujours fiable)
 *   3. poster seul (prefers-reduced-motion OU aucune source)
 */
export const VideoHero = forwardRef<HTMLElement, VideoHeroProps>(function VideoHero(
  { posterSrc, videoSrc, localVideoBase, alt, children, className = "", minHeight = "min-h-[68vh] sm:min-h-[78vh] lg:min-h-[86vh]" },
  ref
) {
  const reduceMotion = usePrefersReducedMotion();

  const hasLocal = Boolean(localVideoBase) && !reduceMotion;
  const hasTikTok = Boolean(videoSrc?.includes("tiktok.com")) && !reduceMotion;
  const tiktokId = hasTikTok && videoSrc ? parseTikTokVideoId(videoSrc) : null;
  const embedSrc =
    tiktokId != null
      ? `https://www.tiktok.com/embed/v2/${tiktokId}?description=0&autoplay=1&mute=1`
      : null;

  const localPoster = localVideoBase ? `${localVideoBase}.jpg` : posterSrc;

  return (
    <section ref={ref} className={`relative overflow-hidden ${minHeight} ${className}`} aria-label={alt}>
      {/* Pillarbox backdrop : poster scaled + blurred so portrait 9:16 videos don't leave ugly black bars on wide screens. */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <img
          src={localPoster}
          alt=""
          aria-hidden
          className="h-full w-full object-cover scale-110"
          style={{ filter: "blur(32px) saturate(140%) brightness(0.55)" }}
          decoding="async"
          loading="eager"
        />
      </div>

      {hasLocal && localVideoBase ? (
        // Native video: `contain` keeps the full TikTok 9:16 frame visible on every viewport,
        // the blurred poster fills any horizontal letterbox on desktop.
        <video
          className="absolute inset-0 z-[1] h-full w-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={localPoster}
          aria-hidden
        >
          <source src={`${localVideoBase}.webm`} type="video/webm" />
          <source src={`${localVideoBase}.mp4`} type="video/mp4" />
        </video>
      ) : hasTikTok && tiktokId && embedSrc ? (
        <div className="absolute inset-0 z-[1] flex items-center justify-center overflow-hidden pointer-events-none">
          {/* Constrain to 9:16 column centered — same idea as `object-contain` for an iframe. */}
          <div className="relative h-full" style={{ aspectRatio: "9 / 16" }}>
            <iframe
              src={embedSrc}
              className="absolute inset-0 h-full w-full"
              style={{ border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Vidéo TikTok — arrière-plan"
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              aria-hidden
            />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 z-[1] flex items-center justify-center">
          <ImageWithFallback src={posterSrc} alt="" className="h-full max-h-full w-auto object-contain" />
        </div>
      )}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          // Tokens pour rester cohérent avec le light theme (Phase 1).
          background:
            "linear-gradient(to top, var(--hero-overlay-bottom, rgba(6,6,6,0.88)) 0%, var(--hero-overlay-mid, rgba(6,6,6,0.45)) 50%, var(--hero-overlay-top, rgba(6,6,6,0.1)) 100%)",
        }}
        aria-hidden
      />
      <div className="relative z-[3] flex h-full min-h-[inherit] flex-col justify-end px-5 pb-12 pt-28 sm:px-8 lg:px-10">
        {children}
      </div>
    </section>
  );
});
