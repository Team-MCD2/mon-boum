import { motion } from "motion/react";
import { ShieldCheck, Leaf, HeartHandshake } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import { easeOutExpo } from "../lib/motionPresets";

const pillars = [
  {
    icon: ShieldCheck,
    title: "100 % halal",
    text: "Une exigence centrale sur les cartes du groupe — traçabilité et respect des critères affichés en restaurant.",
  },
  {
    icon: Leaf,
    title: "Sans électronarcose",
    text: "Mise en avant sur les supports Mon Boum — le détail des filières reste consultable sur place.",
  },
  {
    icon: HeartHandshake,
    title: "Toulouse & fierté locale",
    text: "Né à Toulouse en 2004 : une équipe ancrée dans la métropole, du quartier à la livraison.",
  },
];

export function HalalTrustSection() {
  return (
    <section className="py-20 sm:py-28 border-y" style={{ backgroundColor: "var(--b-dark)", borderColor: "var(--b-border)" }} aria-label="Engagement halal et qualité">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
        >
          <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "var(--b-red)", fontWeight: 700 }}>
            Notre engagement
          </p>
          <h2 className="font-display mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, color: "var(--b-white)" }}>
            Halal · qualité · transparence
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--b-muted)" }}>
            {siteConfig.claims.pioneer} {siteConfig.claims.halalShort}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: easeOutExpo }}
                className="rounded-2xl border p-6 card-lift"
                style={{ backgroundColor: "var(--b-card)", borderColor: "var(--b-border)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(229,37,10,0.15)", color: "var(--b-yellow)" }}
                >
                  <Icon size={22} aria-hidden />
                </div>
                <h3 className="font-display text-lg mb-2" style={{ color: "var(--b-white)" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--b-muted)" }}>
                  {p.text}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
