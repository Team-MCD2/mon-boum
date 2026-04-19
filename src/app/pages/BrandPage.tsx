import { useLocation, Navigate } from "react-router";
import { motion } from "motion/react";
import { brands } from "../lib/brandConfig";
import { VideoHero } from "../components/VideoHero";
import { MagneticButton } from "../components/MagneticButton";
import { ArrowRight, MapPin, Clock, Navigation, Phone, ShoppingBag, Sparkles } from "lucide-react";
import { easeOutExpo } from "../lib/motionPresets";
import { SeoHead } from "../components/SeoHead";
import { TikTokSocialBlock } from "../components/TikTokSocialBlock";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { locationsByBrand, mapsDirectionsHref, type BrandSlug } from "../data/restaurants";
import { brandMenus } from "../data/brandMenus";
import { siteConfig } from "../config/siteConfig";

export function BrandPage() {
  const { pathname } = useLocation();
  const brandId = pathname.slice(1); // removes leading '/'

  const brand = brands[brandId];

  if (!brand) {
    return <Navigate to="/" replace />;
  }

  const brandHeroTikTokId = brand.heroVideoSrc.match(/video\/(\d+)/)?.[1] ?? null;
  const brandLocations = locationsByBrand(brandId as BrandSlug);
  const brandMenu = brandMenus[brandId as BrandSlug];

  return (
    <>
      <SeoHead
        title={`${brand.name} — Mon Boum | Toulouse`}
        description={`${brand.tagline} Street-food halal, livraison Deliveroo — Toulouse & métropole.`}
        keywords={`${brand.name}, Mon Boum, Toulouse, halal, ${siteConfig.seo.defaultKeywords}`}
        ogImagePath={brand.heroPosterSrc}
      />
      
      <main className="min-h-screen" style={{ backgroundColor: "var(--b-black)" }}>
        <VideoHero 
          posterSrc={brand.heroPosterSrc}
          videoSrc={brand.heroVideoSrc}
          localVideoBase={`/videos/${brandId}`}
          alt={`Hero video for ${brand.name}`}
          minHeight="min-h-[85vh] sm:min-h-[90vh]"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px" style={{ backgroundColor: brand.colors.primary }} />
              <span className="text-xs uppercase tracking-widest font-bold" style={{ color: brand.colors.primary }}>
                La spécialité
              </span>
              <div className="w-12 h-px" style={{ backgroundColor: brand.colors.primary }} />
            </div>

            <h1 className="font-display leading-none text-white mb-6 drop-shadow-2xl" style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", letterSpacing: "0.02em" }}>
              {brand.name.toUpperCase()}
            </h1>

            <p className="font-script mx-auto mb-10 max-w-2xl drop-shadow-lg" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "rgba(255,255,255,0.92)" }}>
              {brand.tagline}
            </p>

            <MagneticButton>
              <a
                href={brand.deliverooUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm uppercase tracking-widest btn-shine transition-all shadow-[0_0_40px_rgba(229,37,10,0.4)] hover:shadow-[0_0_60px_rgba(229,37,10,0.6)]"
                style={{ backgroundColor: brand.colors.primary, color: "white", fontWeight: 700 }}
              >
                Commander sur Deliveroo
                <ArrowRight size={16} />
              </a>
            </MagneticButton>
          </motion.div>
        </VideoHero>

        {/* ══════════════════════════════════════════════════
            PROMO BANNER (Boum Pizz's : « 1 achetée = 1 offerte »)
        ══════════════════════════════════════════════════ */}
        {brandMenu?.promoBanner && (
          <section
            className="relative overflow-hidden py-10 sm:py-14 border-b"
            style={{
              backgroundColor: brandMenu.promoBanner.accentColor ?? brand.colors.primary,
              borderColor: "var(--b-border)",
            }}
            aria-label="Offre promotionnelle"
          >
            {/* Diagonal pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, white 0 14px, transparent 14px 32px)",
              }}
              aria-hidden
            />
            <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Sparkles className="shrink-0" size={40} style={{ color: "var(--b-yellow)" }} />
                <div>
                  <p
                    className="font-display leading-none"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "white", letterSpacing: "0.02em" }}
                  >
                    {brandMenu.promoBanner.title.toUpperCase()}
                  </p>
                  <p className="mt-2 text-sm sm:text-base max-w-xl" style={{ color: "rgba(255,255,255,0.88)" }}>
                    {brandMenu.promoBanner.subtitle}
                  </p>
                </div>
              </div>
              <a
                href={brand.deliverooUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] btn-shine whitespace-nowrap"
                style={{ backgroundColor: "var(--b-yellow)", color: "#1c1713", fontWeight: 800 }}
              >
                {brandMenu.promoBanner.cta}
                <ArrowRight size={14} />
              </a>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════
            NOTRE CARTE — catégories réelles + signature items
        ══════════════════════════════════════════════════ */}
        {brandMenu && (
          <section className="py-24" style={{ backgroundColor: "var(--b-black)" }}>
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                <div>
                  <div className="text-xs uppercase tracking-widest mb-3" style={{ color: brand.colors.primary, fontWeight: 700 }}>
                    Notre Carte
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl" style={{ color: "var(--b-white)" }}>
                    MENU {brand.name.toUpperCase()}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm" style={{ color: "var(--b-muted)" }}>
                    Prix et disponibilités en temps réel sur Deliveroo.
                  </p>
                </div>
                <a
                  href={brand.deliverooUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-widest group"
                  style={{ color: brand.colors.primary, fontWeight: 700 }}
                >
                  Voir la carte complète sur Deliveroo
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Catégories disponibles — ancres qualitatives (pas cliquables : la carte vraie vit sur Deliveroo) */}
              <div className="mb-14 flex flex-wrap gap-2" role="list" aria-label="Catégories de la carte">
                {brandMenu.categories.map((cat) => (
                  <span
                    key={cat.id}
                    role="listitem"
                    className="inline-flex items-center px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] border"
                    style={{
                      borderColor: "var(--b-border)",
                      color: "var(--b-white)",
                      backgroundColor: "var(--b-card)",
                      fontWeight: 600,
                    }}
                    title={cat.description}
                  >
                    {cat.label}
                  </span>
                ))}
              </div>

              {/* Signature items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {brandMenu.signatureItems.map((item, idx) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: idx * 0.1, duration: 0.55, ease: easeOutExpo }}
                    className="rounded-2xl border overflow-hidden flex flex-col card-lift"
                    style={{ backgroundColor: "var(--b-card)", borderColor: "var(--b-border)" }}
                    itemScope
                    itemType="https://schema.org/MenuItem"
                  >
                    <div className="relative img-zoom" style={{ aspectRatio: "4/3" }}>
                      <ImageWithFallback
                        src={item.img}
                        alt={`${item.name} — ${brand.name}`}
                        className="h-full w-full object-cover img-inner"
                        itemProp="image"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, var(--hero-overlay-bottom) 0%, transparent 55%)",
                        }}
                      />
                      {item.tag && (
                        <span
                          className="absolute top-3 right-3 px-3 py-1 rounded-full text-[0.65rem] uppercase tracking-widest"
                          style={{
                            backgroundColor:
                              item.tag === "Nouveau" || item.tag === "Promo"
                                ? "var(--b-yellow)"
                                : brand.colors.primary,
                            color:
                              item.tag === "Nouveau" || item.tag === "Promo"
                                ? "#1c1713"
                                : "white",
                            fontWeight: 800,
                          }}
                        >
                          {item.tag}
                        </span>
                      )}
                      {item.price && (
                        <span
                          className="absolute bottom-3 left-3 font-display drop-shadow-lg"
                          style={{ fontSize: "1.6rem", color: "white", letterSpacing: "0.02em" }}
                        >
                          {item.price}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-xl mb-2" style={{ color: "var(--b-white)" }} itemProp="name">
                        {item.name}
                      </h3>
                      <p className="text-sm mb-5 flex-1" style={{ color: "var(--b-muted)" }} itemProp="description">
                        {item.description}
                      </p>
                      <a
                        href={brand.deliverooUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs uppercase tracking-[0.18em] btn-shine"
                        style={{ backgroundColor: brand.colors.primary, color: "white", fontWeight: 700 }}
                        aria-label={`Commander ${item.name} sur Deliveroo`}
                      >
                        <ShoppingBag size={14} />
                        Commander
                      </a>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Mobile CTA — always visible on phones where the top-right link is hidden */}
              <div className="mt-10 flex justify-center md:hidden">
                <a
                  href={brand.deliverooUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-widest"
                  style={{ color: brand.colors.primary, fontWeight: 700 }}
                >
                  Voir toute la carte <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════
            NOS ADRESSES (Google Business Maps Data)
        ══════════════════════════════════════════════════ */}
        <section className="py-24 border-y" style={{ backgroundColor: "var(--b-dark)", borderColor: "var(--b-border)" }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="text-center mb-14">
              <h2 className="font-display text-4xl sm:text-5xl mb-4" style={{ color: "var(--b-white)" }}>NOS RESTAURANTS</h2>
              <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--b-muted)" }}>
                Retrouvez l'énergie {brand.name} dans la métropole toulousaine. Sur place ou à emporter.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandLocations.map((loc, i) => (
                <motion.div
                  key={loc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl p-6 border flex flex-col h-full card-lift"
                  style={{ backgroundColor: "var(--b-card)", borderColor: "var(--b-border)" }}
                >
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <h3 className="font-display text-xl" style={{ color: "var(--b-white)" }}>{loc.shortName}</h3>
                    <div
                      className="px-2 py-1 rounded text-[0.6rem] uppercase tracking-widest font-bold shrink-0"
                      style={{ backgroundColor: brand.colors.primary, color: "white" }}
                    >
                      {loc.postalCode}
                    </div>
                  </div>
                  <div className="space-y-3 flex-1 mb-6">
                    <div className="flex items-start gap-3 text-sm" style={{ color: "var(--b-muted)" }}>
                      <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: brand.colors.primary }} />
                      <span>
                        {loc.address}
                        <br />
                        {loc.postalCode} {loc.city}
                      </span>
                    </div>
                    <a
                      href={`tel:${loc.phoneTel}`}
                      className="flex items-center gap-3 text-sm transition-colors hover:text-white"
                      style={{ color: "var(--b-muted)" }}
                    >
                      <Phone size={16} className="shrink-0" style={{ color: brand.colors.primary }} />
                      <span>{loc.phoneDisplay}</span>
                    </a>
                    {loc.hours && (
                      <div className="flex items-start gap-3 text-sm" style={{ color: "var(--b-muted)" }}>
                        <Clock size={16} className="shrink-0 mt-0.5" style={{ color: brand.colors.primary }} />
                        <span>{loc.hours}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <a
                      href={loc.deliverooUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs uppercase tracking-widest font-bold btn-shine transition-colors"
                      style={{ backgroundColor: brand.colors.primary, color: "white" }}
                    >
                      <ShoppingBag size={14} />
                      Commander (Deliveroo)
                    </a>
                    <a
                      href={mapsDirectionsHref(loc.lat, loc.lng, loc.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors border"
                      style={{ backgroundColor: "var(--b-card2)", color: "var(--b-white)", borderColor: "var(--b-border)" }}
                      aria-label={`Itinéraire vers ${loc.name}`}
                    >
                      <Navigation size={14} />
                      Itinéraire
                    </a>
                  </div>
                </motion.div>
              ))}
              {brandLocations.length === 0 && (
                <div className="col-span-full text-center text-sm py-10" style={{ color: "var(--text-soft-50)" }}>
                  Aucun restaurant pour cette enseigne — ouverture prochaine.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            TIKTOK EMBED
        ══════════════════════════════════════════════════ */}
        <TikTokSocialBlock videoId={brandHeroTikTokId} title={`${brand.name} sur TikTok`} />
      </main>
    </>
  );
}
