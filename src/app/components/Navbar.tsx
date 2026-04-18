import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, MapPin, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Menu" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[4000]"
        style={{
          padding: scrolled ? "12px 0" : "20px 0",
          backgroundColor: scrolled ? "rgba(6,6,6,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid var(--b-border)" : "none",
          boxShadow: scrolled ? "0 12px 40px rgba(0,0,0,0.35)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" aria-label="Mon Boum — Accueil" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.04, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative h-10 w-[140px] shrink-0 flex items-center"
            >
              <img
                src="/branding/logo-boum.png"
                alt=""
                width={140}
                height={40}
                className="h-10 w-auto object-contain object-left"
                decoding="async"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none" style={{ backgroundColor: "var(--b-red)" }} />
            </motion.div>
            <div className="hidden sm:block min-w-0">
              <div className="font-franchise text-white leading-none" style={{ fontSize: "0.7rem", letterSpacing: "0.12em" }}>
                Le meilleur du street-food
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Navigation principale">
            {links.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="relative group"
                  aria-current={active ? "page" : undefined}
                >
                  <span
                    className="text-xs uppercase tracking-[0.2em] transition-colors duration-200"
                    style={{ color: active ? "var(--b-white)" : "rgba(240,237,232,0.5)", fontWeight: 700 }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: active ? "var(--b-red)" : "var(--b-white)" }}
                  />
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 h-px"
                      style={{ backgroundColor: "var(--b-red)", width: "100%" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "var(--b-card)", color: "var(--b-white)", border: "1px solid var(--b-border)" }}
              aria-label={`Panier — ${count} articles`}
            >
              <ShoppingBag size={16} />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs font-bold text-white flex items-center justify-center"
                  style={{ backgroundColor: "var(--b-red)" }}
                >
                  {count}
                </motion.span>
              )}
              <span className="hidden sm:inline text-xs uppercase tracking-wider" style={{ fontWeight: 700 }}>Panier</span>
            </button>

            {/* CTA */}
            <Link
              to="/menu"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 btn-shine"
              style={{ backgroundColor: "var(--b-red)", color: "white", fontWeight: 700 }}
              aria-label="Commander maintenant"
            >
              Commander
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                className="block h-px w-6 bg-white"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                className="block h-px w-6 bg-white"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                className="block h-px w-6 bg-white"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[3900] flex flex-col"
            style={{ backgroundColor: "var(--b-dark)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation mobile"
          >
            <div className="flex-1 flex flex-col justify-center px-8">
              <div className="mb-2 text-xs uppercase tracking-[0.25em]" style={{ color: "var(--b-muted)" }}>
                Navigation
              </div>
              <nav className="space-y-0" aria-label="Navigation mobile">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 + 0.2, duration: 0.5 }}
                  >
                    <Link
                      to={link.href}
                      className="block py-3 border-b transition-colors group relative overflow-hidden"
                      style={{ borderColor: "var(--b-border)" }}
                    >
                      <span
                        className="font-display block"
                        style={{
                          fontSize: "clamp(3.5rem, 10vw, 5rem)",
                          lineHeight: 1.05,
                          color: location.pathname === link.href ? "var(--b-red)" : "var(--b-white)",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {link.label}
                      </span>
                      <span
                        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                        style={{ backgroundColor: "var(--b-red)" }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mt-10 flex items-center gap-3"
              >
                <Link
                  to="/menu"
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full text-sm uppercase tracking-widest btn-shine"
                  style={{ backgroundColor: "var(--b-red)", color: "white", fontWeight: 700 }}
                >
                  <ShoppingBag size={16} />
                  Commander
                </Link>
                <Link
                  to="/restaurants"
                  className="flex items-center justify-center gap-2 py-4 px-5 rounded-full text-sm border"
                  style={{ borderColor: "var(--b-border)", color: "var(--b-white)", fontWeight: 600 }}
                  aria-label="Nos restaurants"
                >
                  <MapPin size={16} style={{ color: "var(--b-yellow)" }} />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="mt-8 flex gap-6"
              >
                {["Instagram", "TikTok", "Facebook"].map((s) => (
                  <a
                    key={s}
                    href={`https://${s.toLowerCase()}.com/monboum`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.2em] transition-colors hover:text-white"
                    style={{ color: "var(--b-muted)", fontWeight: 600 }}
                    aria-label={`Mon Boum sur ${s}`}
                  >
                    {s}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
