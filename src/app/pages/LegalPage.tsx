import { motion } from "motion/react";
import { Link } from "react-router";
import { ExternalLink } from "lucide-react";
import { easeOutExpo } from "../lib/motionPresets";

/** Identité légale alignée sur les CGV publiées sur monboum.fr (extrait article 1) */
const company = {
  name: "Boum Burger SARL",
  tradeNames: "Boum Burger · Boum Chicken · Boum Pizz's · New York Story · Boum Tacos",
  capital: "10 000,00 €",
  rcs: "B 500 373 311",
  rcsCity: "Toulouse",
  /** SIREN = 9 premiers chiffres du SIRET (identifiant entreprise) — aligné sur l’immatriculation RCS */
  siren: "500 373 311",
  address: "220 Route de Saint-Simon",
  postal: "31100",
  city: "Toulouse",
  country: "France",
  phone: "05 61 40 77 73",
  email: "franchise@monboum.fr",
  director: "La personne physique ou morale sous la responsabilité de la publication est celle du représentant légal de la société Boum Burger SARL.",
  host: {
    name: "OVHcloud",
    address: "2 rue Kellermann, 59100 Roubaix — France",
    site: "https://www.ovhcloud.com",
  },
};

export function LegalPage() {
  return (
    <>
      <title>Mentions légales — Mon Boum</title>

      <section
        className="pt-safe pb-16 sm:pb-24 min-h-[70vh]"
        style={{ backgroundColor: "var(--b-black)" }}
        aria-label="Mentions légales"
      >
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
          >
            <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "var(--b-red)", fontWeight: 700 }}>
              Informations réglementaires
            </p>
            <h1 className="font-display mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "var(--b-white)", lineHeight: 0.95 }}>
              Mentions légales
            </h1>

            <div className="space-y-10 text-sm leading-relaxed" style={{ color: "rgba(240,237,232,0.75)" }}>
              <section>
                <h2 className="font-display text-xl mb-4" style={{ color: "var(--b-white)" }}>Éditeur du site</h2>
                <p className="mb-2"><strong style={{ color: "var(--b-white)" }}>{company.name}</strong></p>
                <p className="mb-2 text-xs uppercase tracking-wider" style={{ color: "var(--b-muted)" }}>{company.tradeNames}</p>
                <ul className="space-y-1 list-none pl-0">
                  <li>Capital social : {company.capital}</li>
                  <li>RCS {company.rcsCity} : {company.rcs}</li>
                  <li>SIREN : {company.siren}</li>
                  <li>
                    Siège : {company.address}, {company.postal} {company.city}, {company.country}
                  </li>
                  <li>
                    Tél. :{" "}
                    <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="underline decoration-[var(--b-red)]/50 hover:text-white">
                      {company.phone}
                    </a>
                  </li>
                  <li>
                    E-mail :{" "}
                    <a href={`mailto:${company.email}`} className="underline decoration-[var(--b-red)]/50 hover:text-white">
                      {company.email}
                    </a>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl mb-4" style={{ color: "var(--b-white)" }}>Directeur de la publication</h2>
                <p>{company.director}</p>
              </section>

              <section>
                <h2 className="font-display text-xl mb-4" style={{ color: "var(--b-white)" }}>Hébergement</h2>
                <p>
                  {company.host.name} — {company.host.address}
                </p>
                <a
                  href={company.host.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs uppercase tracking-wider"
                  style={{ color: "var(--b-yellow)" }}
                >
                  Site de l&apos;hébergeur <ExternalLink size={12} />
                </a>
              </section>

              <section>
                <h2 className="font-display text-xl mb-4" style={{ color: "var(--b-white)" }}>Propriété intellectuelle</h2>
                <p>
                  L&apos;ensemble des contenus de ce site (textes, images, graphismes, logo, icônes, sons, logiciels, etc.) est protégé par le droit de la propriété intellectuelle. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable, est interdite.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl mb-4" style={{ color: "var(--b-white)" }}>Données personnelles</h2>
                <p className="mb-4">
                  Pour la politique de confidentialité et vos droits (RGPD), vous pouvez consulter la page dédiée sur le site officiel Mon Boum.
                </p>
                <a
                  href="https://monboum.fr/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: "var(--b-yellow)" }}
                >
                  Politique de confidentialité (monboum.fr) <ExternalLink size={14} />
                </a>
              </section>

              <section>
                <h2 className="font-display text-xl mb-4" style={{ color: "var(--b-white)" }}>Conditions de vente</h2>
                <p className="mb-4">
                  Les conditions générales de vente applicables aux commandes en ligne sont disponibles sur le site officiel.
                </p>
                <a
                  href="https://monboum.fr/cgv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: "var(--b-yellow)" }}
                >
                  CGV (monboum.fr) <ExternalLink size={14} />
                </a>
              </section>

              <p className="text-xs pt-4 border-t" style={{ borderColor: "var(--b-border)", color: "var(--b-muted)" }}>
                Les mentions ci-dessus reprennent les éléments d&apos;identification légale figurant notamment à l&apos;article 1 des CGV publiées sur{" "}
                <a href="https://monboum.fr/cgv/" target="_blank" rel="noopener noreferrer" className="underline">
                  monboum.fr
                </a>
                . Le numéro SIRET (14 chiffres) complète le SIREN par un NIC à 5 chiffres : le cas échéant, le retrouver sur l&apos;extrait Kbis ou en interrogeant l&apos;INSEE.
              </p>

              <Link
                to="/"
                className="inline-block mt-6 text-xs uppercase tracking-widest"
                style={{ color: "var(--b-red)", fontWeight: 700 }}
              >
                ← Retour à l&apos;accueil
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
