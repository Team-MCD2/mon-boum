import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const quickFaq = [
  {
    q: "Proposez-vous la livraison ?",
    a: "Oui. Livraison et click & collect sont disponibles selon la zone et le restaurant.",
  },
  {
    q: "Les viandes sont-elles halal ?",
    a: "Les cartes Mon Boum mettent en avant des options halal. Les détails restent à confirmer au restaurant lors de la commande.",
  },
  {
    q: "Comment rejoindre la franchise ?",
    a: "Passez par la page Contact (sujet Franchise) pour recevoir le process complet.",
  },
];

export function GlobalFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="py-14 border-t"
      style={{ backgroundColor: "var(--b-black)", borderColor: "var(--b-border)" }}
      aria-label="FAQ rapide Mon Boum"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="mb-8 text-center">
          <div className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--b-red)", fontWeight: 700 }}>
            FAQ rapide
          </div>
          <h2 className="font-display text-white mt-3" style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)", letterSpacing: "0.03em" }}>
            VOUS AVEZ DES QUESTIONS ?
          </h2>
        </div>

        <div className="space-y-3">
          {quickFaq.map((item, i) => (
            <article key={item.q} className="rounded-2xl border" style={{ borderColor: "var(--b-border)", backgroundColor: "var(--b-card)" }}>
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between text-left"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-semibold text-white">{item.q}</span>
                <ChevronDown
                  size={18}
                  style={{ color: "var(--b-red)", transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-4 text-sm"
                    style={{ color: "var(--b-muted)" }}
                  >
                    {item.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
