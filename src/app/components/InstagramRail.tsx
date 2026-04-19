import { motion } from "motion/react";
import { ExternalLink, Instagram } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

const PLACEHOLDER_IMAGES = [
  "/branding/hero-dark.jpg",
  "/branding/Dadju.jpg",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
  "/branding/Ninho.jpg",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
  "/branding/hero-bg.jpg"
];

export function InstagramRail() {
  return (
    <section className="py-12 overflow-hidden border-t" style={{ backgroundColor: "var(--b-black)", borderColor: "var(--b-border)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Instagram style={{ color: "var(--b-red)" }} />
          <h2 className="font-display text-white text-2xl tracking-widest uppercase">@monboum__</h2>
        </div>
        <a 
          href={siteConfig.social.instagram} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"
          style={{ color: "var(--b-muted)" }}
        >
          Voir le profil <ExternalLink size={14} />
        </a>
      </div>

      <div className="flex gap-4 px-5 sm:px-8 lg:px-10 overflow-x-auto hide-scrollbar snap-x pb-4">
        {PLACEHOLDER_IMAGES.map((src, i) => (
          <motion.a
            key={i}
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex-shrink-0 w-[240px] h-[300px] sm:w-[280px] sm:h-[350px] rounded-xl overflow-hidden relative group snap-start"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
            <img 
              src={src} 
              alt="Mon Boum Instagram" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <Instagram size={14} /> View on IG
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
