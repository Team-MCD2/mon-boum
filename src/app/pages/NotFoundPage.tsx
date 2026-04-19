import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { MagneticButton } from "../components/MagneticButton";
import { SeoHead } from "../components/SeoHead";

export function NotFoundPage() {
  return (
    <>
      <SeoHead
        title="Page introuvable — Mon Boum"
        description="Cette page n'existe pas. Retournez à l'accueil Mon Boum — street-food halal à Toulouse."
        noIndex
        ogImagePath="/favicon.png"
      />
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ backgroundColor: "var(--b-black)" }}
      aria-label="Page non trouvée — 404"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="font-display mb-4 select-none"
          style={{ fontSize: "clamp(8rem, 28vw, 22rem)", lineHeight: 0.85, letterSpacing: "0.02em", color: "var(--b-white)" }}
          aria-label="Erreur 404"
        >
          4<span style={{ color: "var(--b-red)", textShadow: "0 0 100px rgba(229,37,10,0.5)" }}>0</span>4
        </div>
        <p className="mb-2 font-display" style={{ fontSize: "1.5rem", letterSpacing: "0.1em", color: "var(--b-white)" }}>PAGE INTROUVABLE</p>
        <p className="mb-10 text-sm max-w-xs mx-auto" style={{ color: "var(--b-muted)" }}>
          Aïe ! Cette page a disparu comme notre dernière frite. Elle n'existe pas (ou plus).
        </p>
        <MagneticButton>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm uppercase tracking-widest btn-shine"
            style={{ backgroundColor: "var(--b-red)", color: "white", fontWeight: 700 }}
            aria-label="Retour à l'accueil Mon Boum"
          >
            <ArrowLeft size={16} />
            Retour à l'accueil
          </Link>
        </MagneticButton>
      </motion.div>
    </section>
    </>
  );
}
