import { Link } from "react-router";
import { motion } from "motion/react";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, Clock, ShoppingBag, ArrowRight } from "lucide-react";
import { easeOutExpo } from "../lib/motionPresets";
import { siteConfig } from "../config/siteConfig";

type FooterLink = { label: string; href: string; external?: true };

const cols: { title: string; links: FooterLink[] }[] = [
  {
    title: "Enseignes",
    links: [
      { label: "Boum Burger", href: "/boum-burger" },
      { label: "Boum Chicken", href: "/boum-chicken" },
      { label: "Boum Pizz's", href: "/boum-pizzs" },
      { label: "Boum Saveurs", href: "/boum-saveurs" },
    ],
  },
  {
    title: "Découvrir",
    links: [
      { label: "Nos restaurants", href: "/nos-restaurants" },
      { label: "Vidéos", href: "/videos" },
      {
        label: "Commander (Deliveroo)",
        href: "https://monboum.commande.deliveroo.fr/fr/",
        external: true,
      },
      { label: "Boum Team — célébrités", href: "/#validated" },
      { label: "Halal sans électronarcose", href: "/#halal" },
    ],
  },
  {
    title: "La Marque",
    links: [
      { label: "Notre histoire", href: "/#about" },
      { label: "Nos restaurants", href: "/nos-restaurants" },
      { label: "Franchise", href: "/franchise" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "CGV (site officiel)", href: "https://monboum.fr/cgv/", external: true },
      { label: "Confidentialité", href: "https://monboum.fr/privacy-policy/", external: true },
      { label: "Contact franchise", href: `mailto:${siteConfig.contact.franchiseEmail}`, external: true },
    ],
  },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function Footer() {
  const { legal, social, contact, credit } = siteConfig;

  return (
    <motion.footer
      className="relative pt-20 pb-8 border-t"
      style={{ backgroundColor: "var(--b-dark)", borderColor: "var(--b-border)" }}
      itemScope
      itemType="https://schema.org/Restaurant"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--b-red) 30%, var(--b-yellow) 70%, transparent)" }} />

      {/* ══════════════════════════════════════════════════
          FAST CTA BAND — visible juste avant les colonnes
          Objectif : offrir un raccourci de commande à l'utilisateur
          qui a scrollé jusqu'au footer sans encore cliquer.
      ══════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div
          className="mb-14 rounded-3xl border overflow-hidden relative"
          style={{
            borderColor: "var(--b-border)",
            backgroundImage:
              "linear-gradient(135deg, var(--b-card) 0%, var(--b-card2) 100%)",
          }}
        >
          {/* Diagonal pattern accent */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--b-red) 0 12px, transparent 12px 28px)",
            }}
            aria-hidden
          />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8">
            <div className="flex items-start gap-4 max-w-xl">
              <span
                className="inline-flex items-center justify-center w-12 h-12 shrink-0 rounded-full"
                style={{ backgroundColor: "var(--b-red)" }}
              >
                <ShoppingBag size={20} color="white" />
              </span>
              <div>
                <p
                  className="font-display leading-tight mb-1"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "var(--b-white)", letterSpacing: "0.02em" }}
                >
                  L'envie de boumer ?
                </p>
                <p className="text-sm" style={{ color: "var(--b-muted)" }}>
                  Commande sur Deliveroo, ou choisis ton resto le plus proche — 8 adresses à Toulouse.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={siteConfig.ordering.deliverooToulouse}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-[0.18em] btn-shine transition-all hover:scale-[1.02]"
                style={{ backgroundColor: "var(--b-red)", color: "white", fontWeight: 700 }}
              >
                Commander
                <ArrowRight size={14} />
              </a>
              <Link
                to="/nos-restaurants"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-[0.18em] border transition-all hover:border-[var(--b-yellow)]"
                style={{
                  borderColor: "var(--b-border)",
                  color: "var(--b-white)",
                  fontWeight: 600,
                }}
              >
                <MapPin size={14} style={{ color: "var(--b-yellow)" }} />
                Trouver un resto
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-12 mb-16">
          <div className="lg:col-span-3">
            <Link to="/" aria-label="Mon Boum — Accueil" className="inline-block mb-6">
              <img
                src="/branding/footer-logo-boum.png"
                alt="Mon Boum"
                width={220}
                height={80}
                className="h-16 sm:h-20 w-auto max-w-full object-contain object-left"
                itemProp="logo"
                decoding="async"
              />
              <span className="sr-only" itemProp="name">
                Mon Boum
              </span>
              <div className="font-franchise mt-3" style={{ color: "var(--b-muted)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>
                Le meilleur du street-food · Depuis 2004 · Toulouse
              </div>
            </Link>

            <p className="mb-4 max-w-xs text-sm leading-relaxed" style={{ color: "var(--b-muted)" }} itemProp="description">
              Pizzas au feu de bois, smash burgers, tacos halal — {siteConfig.claims.halalShort}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {(
                [
                  ["ig", social.instagram, "Instagram Mon Boum", Instagram] as const,
                  ["tt", social.tiktok, "TikTok Mon Boum", null] as const,
                  ["fb", social.facebook, "Facebook Mon Boum", Facebook] as const,
                  ["yt", social.youtube, "YouTube Mon Boum", Youtube] as const,
                ] as const
              ).map(([key, href, label, LucideIcon]) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-icon-link w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  {LucideIcon ? <LucideIcon size={16} /> : <TikTokIcon />}
                </a>
              ))}
            </div>

            <div className="space-y-2.5">
              <a
                href={legal.phoneTel}
                className="flex items-center gap-3 text-sm transition-colors hover:text-white group"
                style={{ color: "var(--b-muted)" }}
                itemProp="telephone"
                aria-label="Téléphone"
              >
                <Phone size={13} style={{ color: "var(--b-yellow)" }} />
                {legal.phoneDisplay}
              </a>
              <a
                href={`mailto:${contact.generalEmail}`}
                className="flex items-center gap-3 text-sm transition-colors hover:text-white"
                style={{ color: "var(--b-muted)" }}
                itemProp="email"
                aria-label="Email"
              >
                <Mail size={13} style={{ color: "var(--b-yellow)" }} />
                {contact.generalEmail}
              </a>
              <div className="flex items-center gap-3 text-sm" style={{ color: "var(--b-muted)" }}>
                <Clock size={13} style={{ color: "var(--b-yellow)" }} />
                <span itemProp="openingHours">Horaires variables par restaurant — voir Google</span>
              </div>
              <div className="flex items-start gap-3 text-sm" style={{ color: "var(--b-muted)" }}>
                <MapPin size={13} style={{ color: "var(--b-yellow)" }} className="shrink-0 mt-0.5" />
                <span itemProp="address">
                  {legal.street}, {legal.postalCode} {legal.city} — métropole toulousaine
                </span>
              </div>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title} className="lg:col-span-1">
              <h3
                className="text-xs uppercase tracking-[0.2em] mb-6 font-display"
                style={{ color: "var(--b-yellow)", letterSpacing: "0.15em", fontSize: "0.75rem" }}
              >
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external === true ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className="footer-col-link text-sm flex items-center gap-1 group"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs" style={{ color: "var(--b-red)" }}>
                          →
                        </span>
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="footer-col-link text-sm flex items-center gap-1 group"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs" style={{ color: "var(--b-red)" }}>
                          →
                        </span>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="pt-10 pb-6 border-t text-[0.65rem] sm:text-xs leading-relaxed max-w-4xl"
          style={{ borderColor: "var(--b-border)", color: "var(--b-muted)" }}
        >
          <p className="mb-2">
            <strong style={{ color: "var(--text-soft-85)" }}>{siteConfig.legal.companyName}</strong>
            {" — "}Capital 10 000,00 € — {siteConfig.legal.rcs} — SIREN {siteConfig.legal.siren}
            {" — "}
            {siteConfig.legal.street}, {siteConfig.legal.postalCode} {siteConfig.legal.city}
            {" — "}Tél.{" "}
            <a href={legal.phoneTel} className="link-inline-muted">
              {legal.phoneDisplay}
            </a>
            {" — "}
            <a href={`mailto:${contact.franchiseEmail}`} className="link-inline-muted">
              {contact.franchiseEmail}
            </a>
          </p>
          <p>
            Hébergement : OVHcloud — 2 rue Kellermann, 59100 Roubaix, France.{" "}
            <Link to="/mentions-legales" className="link-inline">
              Mentions légales complètes
            </Link>
            {" · "}
            <a href="https://monboum.fr/cgv/" target="_blank" rel="noopener noreferrer" className="link-inline">
              CGV
            </a>
          </p>
        </div>

        <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--b-border)" }}>
          <p className="text-xs text-center sm:text-left" style={{ color: "var(--b-muted)" }}>
            © {new Date().getFullYear()} Mon Boum. Tous droits réservés. · {credit.line}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--b-red)" }} />
            <span className="text-xs" style={{ color: "var(--b-muted)" }}>
              Commandes : Deliveroo · rest-o-buro.fr
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
