import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, MapPin, ChevronDown, Moon, Sun } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import { useTheme } from "../context/ThemeContext";

const mainLinks = [
  { href: "/", label: "Accueil" },
  { href: "/nos-restaurants", label: "Restaurants" },
  { href: "/franchise", label: "Franchise" },
  { href: "/videos", label: "Vidéos" },
  { href: "/contact", label: "Contact" },
] as const;

const brandLinks = [
  { href: "/boum-burger", label: "Boum Burger" },
  { href: "/boum-chicken", label: "Boum Chicken" },
  { href: "/boum-pizzs", label: "Boum Pizz's" },
  { href: "/boum-saveurs", label: "Boum Saveurs" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const brandsRef = useRef<HTMLDivElement>(null);
  const brandsHoverTimeout = useRef<number | null>(null);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Hover behaviour for the Enseignes dropdown (with a small close delay so users
  // can traverse the 12px gap between the trigger and the panel without flicker).
  const openBrandsOnHover = () => {
    if (brandsHoverTimeout.current) {
      window.clearTimeout(brandsHoverTimeout.current);
      brandsHoverTimeout.current = null;
    }
    setBrandsOpen(true);
  };
  const closeBrandsOnLeave = () => {
    if (brandsHoverTimeout.current) window.clearTimeout(brandsHoverTimeout.current);
    brandsHoverTimeout.current = window.setTimeout(() => setBrandsOpen(false), 140);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setBrandsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!brandsRef.current?.contains(e.target as Node)) setBrandsOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const isBrandActive = brandLinks.some((b) => location.pathname === b.href);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[4000]"
        style={{
          padding: scrolled ? "12px 0" : "20px 0",
          backgroundColor: scrolled ? "var(--nav-bg-scrolled)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid var(--b-border)" : "none",
          boxShadow: scrolled ? "0 12px 40px rgba(0,0,0,0.35)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">
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

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Navigation principale">
            {mainLinks.slice(0, 1).map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link key={link.href} to={link.href} className="relative group" aria-current={active ? "page" : undefined}>
                  <span
                    className="text-xs uppercase tracking-[0.2em] transition-colors duration-200"
                    style={{ color: active ? "var(--b-white)" : "var(--text-soft-50)", fontWeight: 700 }}
                  >
                    {link.label}
                  </span>
                  {active && (
                    <motion.span layoutId="nav-active-main" className="absolute -bottom-1 left-0 h-px w-full" style={{ backgroundColor: "var(--b-red)" }} />
                  )}
                </Link>
              );
            })}

            <div
              className="relative"
              ref={brandsRef}
              onMouseEnter={openBrandsOnHover}
              onMouseLeave={closeBrandsOnLeave}
              onFocus={openBrandsOnHover}
              onBlur={closeBrandsOnLeave}
            >
              <button
                type="button"
                onClick={() => setBrandsOpen((o) => !o)}
                className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] transition-colors"
                style={{ color: isBrandActive || brandsOpen ? "var(--b-white)" : "var(--text-soft-50)", fontWeight: 700 }}
                aria-expanded={brandsOpen}
                aria-haspopup="true"
              >
                Enseignes
                <ChevronDown size={14} className={brandsOpen ? "rotate-180 transition-transform" : "transition-transform"} />
              </button>
              <AnimatePresence>
                {brandsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full pt-3 min-w-[220px] z-[4100]"
                    role="menu"
                  >
                    {/* Inner card — `pt-3` on the wrapper provides the hover-safe gap */}
                    <div
                      className="rounded-xl border py-2 overflow-hidden"
                      style={{ backgroundColor: "var(--b-card)", borderColor: "var(--b-border)", boxShadow: "0 20px 50px rgba(0,0,0,0.45)" }}
                    >
                      {brandLinks.map((b) => (
                        <Link
                          key={b.href}
                          to={b.href}
                          role="menuitem"
                          className="block px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                          style={{ color: location.pathname === b.href ? "var(--b-red)" : "var(--b-white)" }}
                        >
                          {b.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {mainLinks.slice(1).map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link key={link.href} to={link.href} className="relative group" aria-current={active ? "page" : undefined}>
                  <span
                    className="text-xs uppercase tracking-[0.2em] transition-colors duration-200"
                    style={{ color: active ? "var(--b-white)" : "var(--text-soft-50)", fontWeight: 700 }}
                  >
                    {link.label}
                  </span>
                  {active && (
                    <motion.span layoutId="nav-active-main" className="absolute -bottom-1 left-0 h-px w-full" style={{ backgroundColor: "var(--b-red)" }} />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border transition-colors hover:bg-white/5"
              style={{ borderColor: "var(--b-border)", color: "var(--b-white)" }}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <a
              href={siteConfig.ordering.deliverooToulouse}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 btn-shine"
              style={{ backgroundColor: "var(--b-red)", color: "white", fontWeight: 700 }}
              aria-label="Commander sur Deliveroo"
            >
              Commander
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
            >
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className="block h-px w-6 bg-white" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} className="block h-px w-6 bg-white" />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="block h-px w-6 bg-white" />
            </button>
          </div>
        </div>
      </motion.header>

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
            <div className="flex-1 flex flex-col justify-center px-8 overflow-y-auto py-24">
              <div className="mb-2 text-xs uppercase tracking-[0.25em]" style={{ color: "var(--b-muted)" }}>
                Navigation
              </div>
              <nav className="space-y-0" aria-label="Navigation mobile">
                {mainLinks.map((link, i) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 + 0.2, duration: 0.5 }}>
                    <Link
                      to={link.href}
                      className="block py-3 border-b transition-colors group relative overflow-hidden"
                      style={{ borderColor: "var(--b-border)" }}
                    >
                      <span
                        className="font-display block"
                        style={{
                          fontSize: "clamp(2.2rem, 8vw, 4rem)",
                          lineHeight: 1.05,
                          color: location.pathname === link.href ? "var(--b-red)" : "var(--b-white)",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-6 pb-2 text-xs uppercase tracking-[0.25em]" style={{ color: "var(--b-muted)" }}>
                  Enseignes
                </div>
                {brandLinks.map((b, i) => (
                  <motion.div key={b.href} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.05, duration: 0.45 }}>
                    <Link to={b.href} className="block py-2 border-b" style={{ borderColor: "var(--b-border)" }}>
                      <span className="font-display text-2xl" style={{ color: location.pathname === b.href ? "var(--b-red)" : "var(--b-white)" }}>
                        {b.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="mt-10 flex items-center gap-3">
                <a
                  href={siteConfig.ordering.deliverooToulouse}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full text-sm uppercase tracking-widest btn-shine"
                  style={{ backgroundColor: "var(--b-red)", color: "white", fontWeight: 700 }}
                >
                  <ShoppingBag size={16} />
                  Deliveroo
                </a>
                <Link
                  to="/nos-restaurants"
                  className="flex items-center justify-center gap-2 py-4 px-5 rounded-full text-sm border"
                  style={{ borderColor: "var(--b-border)", color: "var(--b-white)", fontWeight: 600 }}
                  aria-label="Nos restaurants"
                >
                  <MapPin size={16} style={{ color: "var(--b-yellow)" }} />
                </Link>
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 py-4 px-5 rounded-full text-sm border"
                  style={{ borderColor: "var(--b-border)", color: "var(--b-white)", fontWeight: 600 }}
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                </button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="mt-8 flex flex-wrap gap-4">
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--b-muted)", fontWeight: 600 }}>
                  Instagram
                </a>
                <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--b-muted)", fontWeight: 600 }}>
                  TikTok
                </a>
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--b-muted)", fontWeight: 600 }}>
                  Facebook
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
