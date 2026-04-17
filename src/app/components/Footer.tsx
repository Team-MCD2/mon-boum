import { Link } from "react-router";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";
import logoMark from "../../imports/Screenshot_2026-04-17_124658.png";

const cols = [
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
      { label: "Mentions légales", href: "/contact" },
      { label: "CGU", href: "/contact" },
      { label: "Confidentialité", href: "/contact" },
      { label: "Cookies", href: "/contact" },
      { label: "Accessibilité", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="relative pt-20 pb-8 border-t"
      style={{ backgroundColor: "var(--b-dark)", borderColor: "var(--b-border)" }}
      itemScope
      itemType="https://schema.org/Restaurant"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--b-red) 30%, var(--b-yellow) 70%, transparent)" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-3">
            <Link to="/" aria-label="Mon Boum — Accueil" className="inline-block mb-6">
              <div
                className="inline-flex items-center justify-center rounded-2xl border p-3"
                style={{ borderColor: "var(--b-border)", backgroundColor: "rgba(255,255,255,0.97)" }}
              >
                <img
                  src={logoMark}
                  alt="Logo Mon Boum"
                  className="h-14 w-auto object-contain sm:h-16"
                  loading="lazy"
                  itemProp="name"
                />
              </div>
              <div className="text-xs uppercase tracking-[0.25em] mt-3" style={{ color: "var(--b-muted)" }}>
                Le meilleur du street-food · Depuis 2004
              </div>
            </Link>

            <p className="mb-6 max-w-xs text-sm leading-relaxed" style={{ color: "var(--b-muted)" }} itemProp="description">
              Pizzas au feu de bois, smash burgers, tacos halal. Fait avec passion depuis 2004, dans 5 villes françaises.
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
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--b-border)" }}>
          <p className="text-xs" style={{ color: "var(--b-muted)" }}>
            © {new Date().getFullYear()} Mon Boum. Tous droits réservés. Fait avec ❤️ en France.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--b-red)" }} />
            <span className="text-xs" style={{ color: "var(--b-muted)" }}>Commandes en ligne disponibles 7j/7</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
