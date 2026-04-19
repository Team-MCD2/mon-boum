import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { MapPin, ExternalLink, Clock } from "lucide-react";
import { Link } from "react-router";
import { toulouseLocations, mapsHref, type EnseigneTag } from "../data/restaurants";
import { siteConfig, getJsonLdSiteUrl } from "../config/siteConfig";
import { easeOutExpo } from "../lib/motionPresets";
import { MagneticButton } from "../components/MagneticButton";
import { SeoHead } from "../components/SeoHead";

const ToulouseMap = lazy(() => import("../components/ToulouseMap").then((m) => ({ default: m.ToulouseMap })));

const FILTER_LABELS: { id: "all" | EnseigneTag; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "Boum Burger", label: "Boum Burger" },
  { id: "Boum Chicken", label: "Boum Chicken" },
  { id: "Boum Pizz's", label: "Boum Pizz's" },
  { id: "Boum Saveurs", label: "Boum Saveurs" },
  { id: "Groupe", label: "Groupe" },
];

export function NosRestaurantsPage() {
  const enseignesPresent = useMemo(() => new Set(toulouseLocations.map((l) => l.enseigne)), []);
  const filterOptions = useMemo(
    () => FILTER_LABELS.filter((f) => f.id === "all" || enseignesPresent.has(f.id)),
    [enseignesPresent]
  );

  const [filter, setFilter] = useState<(typeof FILTER_LABELS)[number]["id"]>("all");

  useEffect(() => {
    if (filter !== "all" && !enseignesPresent.has(filter)) setFilter("all");
  }, [filter, enseignesPresent]);

  const filtered = useMemo(() => {
    if (filter === "all") return toulouseLocations;
    return toulouseLocations.filter((l) => l.enseigne === filter);
  }, [filter]);

  const itemListJsonLd = useMemo(() => {
    const base = getJsonLdSiteUrl().replace(/\/$/, "");
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Restaurants Mon Boum — Toulouse & métropole",
      numberOfItems: filtered.length,
      itemListElement: filtered.map((loc, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": ["Restaurant", "LocalBusiness"],
          "@id": `${base}/nos-restaurants#${loc.id}`,
          name: loc.name,
          telephone: loc.phoneDisplay,
          address: {
            "@type": "PostalAddress",
            streetAddress: loc.address,
            addressLocality: loc.city,
            postalCode: loc.postalCode,
            addressCountry: "FR",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: loc.lat,
            longitude: loc.lng,
          },
          servesCuisine: "Street food halal",
          areaServed: { "@type": "City", name: "Toulouse" },
        },
      })),
    };
  }, [filtered]);

  return (
    <>
      <SeoHead
        title="Nos restaurants — Mon Boum | Toulouse & métropole"
        description="Carte interactive : tous les restaurants Mon Boum en région toulousaine. Horaires indicatifs — confirmez sur Google. Livraison Deliveroo."
        keywords={`${siteConfig.seo.defaultKeywords}, carte restaurants, Colomiers, Aucamville`}
        ogImagePath="/favicon.png"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <section className="relative top-safe pb-12 overflow-hidden" style={{ backgroundColor: "var(--b-black)" }} aria-label="Nos restaurants">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, var(--b-red), transparent 50%)" }} />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: "var(--b-red)" }} />
            <span className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--b-red)", fontWeight: 700 }}>
              Toulouse &amp; métropole
            </span>
          </motion.div>
          <h1 className="font-display mb-4" style={{ fontSize: "clamp(3rem, 10vw, 7rem)", lineHeight: 0.9, color: "var(--b-white)" }}>
            NOS RESTAURANTS
          </h1>
          <p className="max-w-2xl text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-soft-75)" }}>
            Tous nos points de vente sont en région toulousaine. Filtrez par enseigne, cliquez sur un marqueur pour ouvrir Google Maps ou Deliveroo.
          </p>

          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filtrer par enseigne">
            {filterOptions.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className="rounded-full px-4 py-2 text-xs uppercase tracking-wider font-bold transition-colors"
                  style={{
                    backgroundColor: active ? "var(--b-red)" : "var(--b-card)",
                    color: active ? "white" : "var(--b-muted)",
                    border: `1px solid ${active ? "var(--b-red)" : "var(--b-border)"}`,
                  }}
                  aria-pressed={active}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20" style={{ backgroundColor: "var(--b-black)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <Suspense
            fallback={
              <div
                className="flex h-[420px] items-center justify-center rounded-2xl border text-sm"
                style={{ borderColor: "var(--b-border)", color: "var(--b-muted)" }}
              >
                Chargement de la carte…
              </div>
            }
          >
            <ToulouseMap locations={filtered} />
          </Suspense>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((loc, index) => (
              <motion.article
                key={loc.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.05, duration: 0.5, ease: easeOutExpo }}
                className="rounded-2xl border p-6"
                style={{ backgroundColor: "var(--b-card)", borderColor: "var(--b-border)" }}
              >
                <div className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "var(--b-yellow)", fontWeight: 700 }}>
                  {loc.enseigne}
                </div>
                <h2 className="font-display text-xl mb-2" style={{ color: "var(--b-white)" }}>{loc.name}</h2>
                <div className="flex items-start gap-2 text-sm mb-2" style={{ color: "var(--b-muted)" }}>
                  <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: "var(--b-yellow)" }} />
                  <span>
                    {loc.address}, {loc.postalCode} {loc.city}
                  </span>
                </div>
                {loc.phoneDisplay && (
                  <a href={`tel:${loc.phoneDisplay.replace(/\s/g, "")}`} className="text-sm block mb-2" style={{ color: "var(--b-muted)" }}>
                    {loc.phoneDisplay}
                  </a>
                )}
                {loc.hours && (
                  <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "var(--b-muted)" }}>
                    <Clock size={12} /> {loc.hours}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  <a
                    href={mapsHref(loc.googleMapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs uppercase tracking-wider font-bold btn-shine"
                    style={{ backgroundColor: "var(--b-red)", color: "white" }}
                  >
                    Itinéraire <ExternalLink size={12} />
                  </a>
                  <a
                    href={siteConfig.ordering.deliverooToulouse}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs uppercase tracking-wider font-semibold"
                    style={{ borderColor: "var(--b-border)", color: "var(--b-white)" }}
                  >
                    Deliveroo
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <MagneticButton>
              <Link
                to="/franchise"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs uppercase tracking-widest border"
                style={{ borderColor: "var(--b-border)", color: "var(--b-white)", fontWeight: 700 }}
              >
                Devenir franchisé
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs uppercase tracking-widest"
                style={{ backgroundColor: "var(--b-red)", color: "white", fontWeight: 700 }}
              >
                Contact
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
