import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

const quickFaq = [
  {
    q: "Livraison à Toulouse ?",
    a: () => (
      <>
        Oui — commandez via{" "}
        <a href={siteConfig.ordering.deliverooToulouse} target="_blank" rel="noopener noreferrer" className="link-inline">
          Deliveroo
        </a>{" "}
        (recherche « Mon Boum » / enseigne). La commande catalogue/paiement peut aussi passer par{" "}
        <a href={siteConfig.ordering.restOBuro} target="_blank" rel="noopener noreferrer" className="link-inline">
          rest-o-buro.fr
        </a>{" "}
        selon les CGV officielles.
      </>
    ),
  },
  {
    q: "C’est halal ?",
    a: "Le groupe met en avant une offre halal, viande sans électronarcose — le détail des certifications et cartes est affiché en restaurant et sur les plateformes de commande.",
  },
  {
    q: "Devenir franchisé ?",
    a: () => (
      <>
        Écrivez-nous depuis la page{" "}
        <Link to="/franchise" className="link-inline">
          Devenir franchisé
        </Link>{" "}
        ou par mail :{" "}
        <a href={`mailto:${siteConfig.contact.franchiseEmail}`} className="link-inline">
          {siteConfig.contact.franchiseEmail}
        </a>
        .
      </>
    ),
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
          <h2 className="font-display mt-3" style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)", letterSpacing: "0.03em", color: "var(--b-white)" }}>
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
                <span className="text-sm font-semibold" style={{ color: "var(--b-white)" }}>{item.q}</span>
                <ChevronDown
                  size={18}
                  style={{ color: "var(--b-red)", transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-4 text-sm"
                    style={{ color: "var(--b-muted)" }}
                  >
                    {typeof item.a === "function" ? item.a() : item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
