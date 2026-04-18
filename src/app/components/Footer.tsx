import { Link } from "react-router";
import { motion } from "motion/react";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";
import { easeOutExpo } from "../lib/motionPresets";

type FooterLink =
  | { label: string; href: string }
  | { label: string; href: string; external: true };

const cols: { title: string; links: FooterLink[] }[] = [
  {
    title: "Menu",
    links: [
      { label: "Pizzas", href: "/menu#pizza" },
      { label: "Smash Burgers", href: "/menu#burgers" },
      { label: "Tacos", href: "/menu#tacos" },
      { label: "Sides & Frites", href: "/menu#sides" },
      { label: "Milkshakes", href: "/menu#milkshakes" },
      { label: "Menus", href: "/menu#menus" },
    ],
  },
  {
    title: "La Marque",
    links: [
      { label: "Notre histoire", href: "/#about" },
      { label: "Nos restaurants", href: "/restaurants" },
      { label: "Franchise", href: "/contact" },
      { label: "Recrutement", href: "/contact" },
      { label: "Presse", href: "/contact" },
      { label: "Blog", href: "/contact" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "CGV (site officiel)", href: "https://monboum.fr/cgv/", external: true },
      { label: "Confidentialité", href: "https://monboum.fr/privacy-policy/", external: true },
      { label: "Contact franchise", href: "mailto:franchise@monboum.fr", external: true },
    ],
  },
];

export function Footer() {
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
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--b-red) 30%, var(--b-yellow) 70%, transparent)" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">

          {/* Brand */}
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
              <span className="sr-only" itemProp="name">Mon Boum</span>
              <div className="font-franchise mt-3" style={{ color: "var(--b-muted)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>
                Le meilleur du street-food · Depuis 2004
              </div>
            </Link>

            <p className="mb-6 max-w-xs text-sm leading-relaxed" style={{ color: "var(--b-muted)" }} itemProp="description">
              Pizzas au feu de bois, smash burgers, tacos halal. Fait avec passion depuis 2004, en région toulousaine.
            </p>

            {/* Social */}
            <div className="flex gap-3 mb-8">
              {[
                { icon: Instagram, href: "https://instagram.com/monboum", label: "Instagram Mon Boum" },
                { icon: Facebook, href: "https://facebook.com/monboum", label: "Facebook Mon Boum" },
                { icon: Youtube, href: "https://youtube.com/monboum", label: "YouTube Mon Boum" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ border: "1px solid var(--b-border)", color: "var(--b-muted)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--b-red)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--b-red)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--b-border)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--b-muted)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Contact info */}
            <div className="space-y-2.5">
              <a href="tel:+33123456789" className="flex items-center gap-3 text-sm transition-colors hover:text-white group" style={{ color: "var(--b-muted)" }} itemProp="telephone" aria-label="Téléphone">
                <Phone size={13} style={{ color: "var(--b-yellow)" }} />+33 1 23 45 67 89
              </a>
              <a href="mailto:contact@monboum.fr" className="flex items-center gap-3 text-sm transition-colors hover:text-white" style={{ color: "var(--b-muted)" }} itemProp="email" aria-label="Email">
                <Mail size={13} style={{ color: "var(--b-yellow)" }} />contact@monboum.fr
              </a>
              <div className="flex items-center gap-3 text-sm" style={{ color: "var(--b-muted)" }}>
                <Clock size={13} style={{ color: "var(--b-yellow)" }} />
                <span itemProp="openingHours" content="Mo-Fr 11:30-23:00">Lun–Ven : 11h30–23h00</span>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: "var(--b-muted)" }}>
                <MapPin size={13} style={{ color: "var(--b-yellow)" }} />
                <span itemProp="address">Paris · Lyon · Bordeaux · Marseille · Toulouse</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs uppercase tracking-[0.2em] mb-6 font-display" style={{ color: "var(--b-yellow)", letterSpacing: "0.15em", fontSize: "0.75rem" }}>
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
                        className="text-sm transition-all duration-200 hover:pl-2 flex items-center gap-1 group"
                        style={{ color: "var(--b-muted)" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--b-white)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--b-muted)")}
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs" style={{ color: "var(--b-red)" }}>→</span>
                        {link.label}
                      </a>
                    ) : (
                    <Link
                      to={link.href}
                      className="text-sm transition-all duration-200 hover:pl-2 flex items-center gap-1 group"
                      style={{ color: "var(--b-muted)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--b-white)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--b-muted)")}
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs" style={{ color: "var(--b-red)" }}>→</span>
                      {link.label}
                    </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mentions légales — résumé (détail sur /mentions-legales) */}
        <div
          className="pt-10 pb-6 border-t text-[0.65rem] sm:text-xs leading-relaxed max-w-4xl"
          style={{ borderColor: "var(--b-border)", color: "var(--b-muted)" }}
        >
          <p className="mb-2">
            <strong style={{ color: "rgba(240,237,232,0.85)" }}>Boum Burger SARL</strong>
            {" — "}Capital 10 000,00 € — RCS Toulouse B 500 373 311 — SIREN 500 373 311
            {" — "}220 Route de Saint-Simon, 31100 Toulouse
            {" — "}Tél.{" "}
            <a href="tel:0561407773" className="underline decoration-white/20 hover:text-white">05 61 40 77 73</a>
            {" — "}
            <a href="mailto:franchise@monboum.fr" className="underline decoration-white/20 hover:text-white">franchise@monboum.fr</a>
          </p>
          <p>
            Hébergement : OVHcloud — 2 rue Kellermann, 59100 Roubaix, France.{" "}
            <Link to="/mentions-legales" className="underline decoration-[var(--b-red)]/40 hover:text-white">
              Mentions légales complètes
            </Link>
            {" · "}
            <a href="https://monboum.fr/cgv/" target="_blank" rel="noopener noreferrer" className="underline decoration-[var(--b-red)]/40 hover:text-white">
              CGV
            </a>
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--b-border)" }}>
          <p className="text-xs" style={{ color: "var(--b-muted)" }}>
            © {new Date().getFullYear()} Mon Boum. Tous droits réservés. Fait avec ❤️ en France.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--b-red)" }} />
            <span className="text-xs" style={{ color: "var(--b-muted)" }}>Commandes en ligne disponibles 7j/7</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
