import { motion } from "motion/react";
import { ExternalLink, Play, Youtube } from "lucide-react";
import { SeoHead } from "../components/SeoHead";
import { SplitText } from "../components/SplitText";
import { MagneticButton } from "../components/MagneticButton";
import { siteConfig } from "../config/siteConfig";
import { easeOutExpo } from "../lib/motionPresets";
import { videoSections, uploadsPlaylistId, type VideoItem } from "../data/videos";

function ytThumbnail(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function VideoCard({ item }: { item: VideoItem }) {
  const hasId = Boolean(item.youtubeId);
  const watchUrl = hasId
    ? `https://www.youtube.com/watch?v=${item.youtubeId}`
    : siteConfig.social.youtube;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: easeOutExpo }}
      className="group rounded-2xl overflow-hidden border card-lift flex flex-col"
      style={{ backgroundColor: "var(--b-card)", borderColor: "var(--b-border)" }}
    >
      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-video overflow-hidden"
        aria-label={`${item.title} — ouvrir sur YouTube`}
      >
        {hasId ? (
          <img
            src={ytThumbnail(item.youtubeId!)}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        ) : (
          <div
            className="h-full w-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(229,37,10,0.18) 0%, rgba(6,6,6,0.9) 60%)",
            }}
          >
            <Youtube size={44} style={{ color: "var(--b-red)" }} />
          </div>
        )}

        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: "rgba(229,37,10,0.92)" }}
          >
            <Play size={22} className="text-white translate-x-0.5" />
          </div>
        </div>
      </a>
      <div className="p-4 flex items-start justify-between gap-3 flex-1">
        <h3 className="font-display text-lg leading-tight" style={{ color: "var(--b-white)" }}>{item.title}</h3>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ouvrir sur YouTube"
          className="shrink-0 mt-0.5"
          style={{ color: "var(--b-muted)" }}
        >
          <ExternalLink size={14} />
        </a>
      </div>
    </motion.article>
  );
}

export function GalleryPage() {
  const { youtube, youtubeChannelId } = siteConfig.social;
  const uploadsId = uploadsPlaylistId(youtubeChannelId);

  return (
    <>
      <SeoHead
        title="Vidéos — Mon Boum | Chaîne YouTube, pubs & célébrités"
        description="La chaîne Mon Boum : pubs, courts-métrages, célébrités qui valident. Ninho, Dadju, Vegedream, Marwa Loud, Landy, Bramsito…"
        keywords={`vidéos, YouTube, Mon Boum, Ninho, Dadju, ${siteConfig.seo.defaultKeywords}`}
      />

      <main className="top-safe pb-20" style={{ backgroundColor: "var(--b-black)" }}>
        {/* Hero intro */}
        <section className="relative overflow-hidden pt-10 pb-16">
          <div
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 20% 40%, var(--b-red), transparent 55%), radial-gradient(circle at 80% 60%, var(--b-yellow), transparent 55%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-10 h-px" style={{ backgroundColor: "var(--b-red)" }} />
              <span className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--b-red)", fontWeight: 700 }}>
                Chaîne officielle
              </span>
            </motion.div>

            <SplitText
              text="VIDÉOS MON BOUM"
              as="h1"
              className="font-display mb-5"
              style={{ fontSize: "clamp(3rem, 10vw, 7rem)", lineHeight: 0.9, color: "var(--b-white)", letterSpacing: "0.02em" }}
              mode="words"
            />

            <p className="max-w-2xl text-sm sm:text-base leading-relaxed mb-8" style={{ color: "var(--text-soft-75)" }}>
              Pubs officielles, courts-métrages, invités de marque — toute l'énergie street-food halal dans le même flux.
              Plus de contenu frais sur TikTok et Instagram.
            </p>

            <div className="flex flex-wrap gap-3">
              <MagneticButton>
                <a
                  href={youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs uppercase tracking-widest font-bold btn-shine"
                  style={{ backgroundColor: "var(--b-red)", color: "white" }}
                >
                  <Youtube size={16} />
                  S'abonner sur YouTube
                </a>
              </MagneticButton>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs uppercase tracking-widest font-semibold border"
                style={{ borderColor: "var(--b-border)", color: "var(--b-white)" }}
              >
                Voir TikTok @monboum
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* Uploads playlist embed — lecture directe de la chaîne */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
            className="rounded-3xl overflow-hidden border"
            style={{ borderColor: "var(--b-border)", backgroundColor: "var(--b-card)" }}
          >
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/videoseries?list=${uploadsId}&modestbranding=1&rel=0`}
                title="Chaîne YouTube Mon Boum"
                className="absolute inset-0 h-full w-full"
                style={{ border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                loading="lazy"
              />
            </div>
          </motion.div>
        </section>

        {/* Sections catégorisées (célébrités + pubs) */}
        {videoSections.map((section, sIdx) => (
          <section
            key={section.id}
            className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-16"
            aria-label={section.title}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="mb-8"
            >
              <p className="text-xs uppercase tracking-[0.25em] mb-2" style={{ color: sIdx % 2 === 0 ? "var(--b-red)" : "var(--b-yellow)", fontWeight: 700 }}>
                Section {sIdx + 1}
              </p>
              <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--b-white)" }}>
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="mt-2 text-sm max-w-xl" style={{ color: "var(--b-muted)" }}>
                  {section.subtitle}
                </p>
              )}
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item) => (
                <VideoCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}

        {/* Note technique — données à enrichir */}
        <section className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <div
            className="rounded-2xl p-6 sm:p-8 border text-sm"
            style={{
              backgroundColor: "var(--b-card)",
              borderColor: "var(--b-border)",
              color: "var(--b-muted)",
            }}
          >
            <p className="mb-2" style={{ color: "var(--b-white)", fontWeight: 700 }}>
              Plus de vidéos ?
            </p>
            <p>
              Toutes les vidéos Mon Boum sont regroupées sur la{" "}
              <a
                href={youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="link-inline"
              >
                chaîne YouTube officielle
              </a>
              , avec TikTok{" "}
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="link-inline"
              >
                @monboum
              </a>{" "}
              et Instagram{" "}
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-inline"
              >
                @monboum__
              </a>{" "}
              pour l'actu fraîche.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
