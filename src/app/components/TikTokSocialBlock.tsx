import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import { easeOutExpo } from "../lib/motionPresets";

type TikTokSocialBlockProps = {
  /** Optional TikTok video ID for embed (digits only). If omitted, shows CTA card only. */
  videoId?: string | null;
  title?: string;
};

/**
 * TikTok block: loads embed.js once for optional video; always links to @monboum profile.
 */
export function TikTokSocialBlock({ videoId = null, title = "Sur TikTok @monboum" }: TikTokSocialBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!videoId || !containerRef.current) return;
    if (document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      setScriptLoaded(true);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://www.tiktok.com/embed.js";
    s.async = true;
    s.onload = () => setScriptLoaded(true);
    document.body.appendChild(s);
  }, [videoId]);

  return (
    <section className="py-16 sm:py-20 border-t" style={{ backgroundColor: "var(--b-black)", borderColor: "var(--b-border)" }} aria-label="TikTok Mon Boum">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-8"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] mb-2" style={{ color: "var(--b-red)", fontWeight: 700 }}>
              Réseaux
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--b-white)" }}>
              {title}
            </h2>
            <p className="mt-2 text-sm max-w-xl" style={{ color: "var(--b-muted)" }}>
              Best-of cuisine, coulisses, ambiance Toulouse — contenu mis à jour très régulièrement.
            </p>
          </div>
          <a
            href={siteConfig.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm uppercase tracking-widest font-bold btn-shine shrink-0"
            style={{ backgroundColor: "var(--b-red)", color: "white" }}
          >
            Ouvrir TikTok
            <ExternalLink size={16} />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {videoId && (
            <div ref={containerRef} className="min-h-[480px] rounded-2xl overflow-hidden border flex items-center justify-center" style={{ borderColor: "var(--b-border)", backgroundColor: "var(--b-card)" }}>
              {scriptLoaded ? (
                <blockquote
                  className="tiktok-embed"
                  /**
                   * Les vidéos hero proviennent de @boumchickentoulouse — il est impératif
                   * d'utiliser le bon username dans le `cite` sinon l'embed 404.
                   */
                  cite={`https://www.tiktok.com/@boumchickentoulouse/video/${videoId}`}
                  data-video-id={videoId}
                  style={{ maxWidth: "100%", minWidth: "325px" }}
                >
                  <section>
                    <a target="_blank" rel="noopener noreferrer" href={`https://www.tiktok.com/@boumchickentoulouse/video/${videoId}`}>
                      Mon Boum sur TikTok
                    </a>
                  </section>
                </blockquote>
              ) : (
                <p className="text-sm px-4 text-center" style={{ color: "var(--b-muted)" }}>
                  Chargement de la vidéo…
                </p>
              )}
            </div>
          )}
          <div className={`space-y-4 ${!videoId ? "lg:col-span-2" : ""}`}>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-soft-75)" }}>
              Les clips mettent en avant les produits, les restaurants et l’énergie du groupe — même mood que nos enseignes : street, néon, halal, fierté locale.
            </p>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold link-inline"
              style={{ color: "var(--b-yellow)" }}
            >
              Instagram @monboum__
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
