import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { MapPin, Phone, Navigation, ShoppingBag, Search } from "lucide-react";
import { SeoHead } from "../components/SeoHead";
import { toulouseLocations, mapsDirectionsHref, type RestaurantLocation, type EnseigneTag } from "../data/restaurants";

// ── Filter definition ─────────────────────────────────────────────────────
type FilterValue = "all" | EnseigneTag;
const FILTERS: { value: FilterValue; label: string; short: string }[] = [
  { value: "all",          label: "Toutes les enseignes", short: "Tout" },
  { value: "Boum Burger",  label: "Boum Burger",           short: "Burger" },
  { value: "Boum Pizz's",  label: "Boum Pizz's",           short: "Pizz's" },
  { value: "Boum Chicken", label: "Boum Chicken",          short: "Chicken" },
];

// Direct hex palette per enseigne — kept literal because Leaflet's DivIcon
// html is injected as raw innerHTML where CSS `var()` would not resolve when
// concatenated (e.g. `box-shadow: … ${color}cc`).
const BRAND_HEX: Record<EnseigneTag, string> = {
  "Boum Burger":  "#E5250A",
  "Boum Pizz's":  "#ff3d20",
  "Boum Chicken": "#F5C518",
  "Boum Saveurs": "#F5C518",
  "Groupe":       "#E5250A",
};
function brandColorFor(enseigne: EnseigneTag): string {
  return BRAND_HEX[enseigne];
}

// Cache DivIcons by color so React/Leaflet stop recreating them on every
// render — this was a major source of flicker when filter state changed.
const MARKER_ICON_CACHE = new Map<string, L.DivIcon>();
function makeMarkerIcon(color: string) {
  const cached = MARKER_ICON_CACHE.get(color);
  if (cached) return cached;
  const icon = new L.DivIcon({
    className: "custom-marker",
    html: `<div style="background-color:${color};width:22px;height:22px;border-radius:50%;border:3px solid #0a0a0a;box-shadow:0 0 10px ${color}cc;"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
  MARKER_ICON_CACHE.set(color, icon);
  return icon;
}

// Fix Leaflet default icon URLs (still needed for popups/fallback rendering).
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export function RestaurantsPage() {
  const [activeRes, setActiveRes] = useState<RestaurantLocation | null>(null);
  const [filter, setFilter] = useState<FilterValue>("all");
  const [query, setQuery] = useState("");

  const visibleLocations = useMemo(() => {
    const q = query.trim().toLowerCase();
    return toulouseLocations.filter((r) => {
      if (filter !== "all" && r.enseigne !== filter) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.shortName.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.postalCode.includes(q)
      );
    });
  }, [filter, query]);

  // Counts per filter (drives the badge on each chip).
  const counts = useMemo(() => {
    const base: Record<FilterValue, number> = {
      "all": toulouseLocations.length,
      "Boum Burger":  0,
      "Boum Pizz's":  0,
      "Boum Chicken": 0,
      "Boum Saveurs": 0,
      "Groupe":       0,
    };
    for (const r of toulouseLocations) base[r.enseigne]++;
    return base;
  }, []);

  return (
    <>
      <SeoHead
        title="Nos Restaurants à Toulouse — Mon Boum"
        description="Retrouvez toutes les adresses Mon Boum dans la métropole toulousaine: Boum Burger, Boum Pizz's, Boum Chicken, Boum Saveurs."
      />
      <main className="flex flex-col md:flex-row h-screen pt-[72px]" style={{ backgroundColor: "var(--b-black)" }}>

        {/* ══════════════════════════════════════════════════
            SIDEBAR — filters + list
        ══════════════════════════════════════════════════ */}
        <aside
          className="w-full md:w-[380px] lg:w-[420px] h-[50vh] md:h-full overflow-y-auto border-r border-b md:border-b-0 hide-scrollbar"
          style={{ borderColor: "var(--b-border)", backgroundColor: "var(--b-dark)" }}
          aria-label="Liste des restaurants"
        >
          <div className="p-6 pb-4 sticky top-0 z-10" style={{ backgroundColor: "var(--b-dark)", borderBottom: "1px solid var(--b-border)" }}>
            <h1 className="font-display mb-2" style={{ fontSize: "2.5rem", color: "var(--b-white)" }}>NOS ADRESSES</h1>
            <p className="text-sm mb-4" style={{ color: "var(--b-muted)" }}>
              <strong style={{ color: "var(--b-white)" }}>{visibleLocations.length}</strong>
              {visibleLocations.length > 1 ? " restaurants" : " restaurant"}
              {filter !== "all" && <> · <span style={{ color: "var(--b-yellow)" }}>{filter}</span></>}
              {query && <> · recherche « {query} »</>}
            </p>

            {/* Search */}
            <label className="relative block mb-4" aria-label="Rechercher un restaurant">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--b-muted)" }} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Quartier, ville, code postal…"
                className="w-full pl-9 pr-3 py-2.5 rounded-full text-sm outline-none"
                style={{
                  backgroundColor: "var(--b-card)",
                  color: "var(--b-white)",
                  border: "1px solid var(--b-border)",
                }}
              />
            </label>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par enseigne">
              {FILTERS.filter((f) => f.value === "all" || counts[f.value] > 0).map((f) => {
                const active = filter === f.value;
                const color = f.value === "all" ? "var(--b-red)" : brandColorFor(f.value as EnseigneTag);
                return (
                  <button
                    key={f.value}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(f.value)}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-[0.18em] transition-all"
                    style={{
                      backgroundColor: active ? color : "var(--b-card)",
                      color: active ? "white" : "var(--b-white)",
                      border: `1px solid ${active ? color : "var(--b-border)"}`,
                      fontWeight: 700,
                    }}
                  >
                    {f.short}
                    <span
                      className="inline-flex items-center justify-center rounded-full px-1.5 min-w-[1.3rem] text-[0.65rem]"
                      style={{
                        backgroundColor: active ? "rgba(255,255,255,0.22)" : "var(--b-card2)",
                        color: active ? "white" : "var(--b-muted)",
                      }}
                    >
                      {counts[f.value]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location list */}
          <div className="flex flex-col">
            {visibleLocations.length === 0 && (
              <p className="p-6 text-sm" style={{ color: "var(--b-muted)" }}>
                Aucun restaurant ne correspond aux filtres. <button onClick={() => { setFilter("all"); setQuery(""); }} className="underline" style={{ color: "var(--b-red)" }}>Réinitialiser</button>
              </p>
            )}
            {visibleLocations.map((res) => {
              const color = brandColorFor(res.enseigne);
              const isActive = activeRes?.id === res.id;
              return (
                <button
                  key={res.id}
                  onClick={() => setActiveRes(res)}
                  className="text-left p-5 border-b transition-colors"
                  style={{
                    borderColor: "var(--b-border)",
                    backgroundColor: isActive ? "var(--b-card)" : "transparent",
                    borderLeft: `4px solid ${isActive ? color : "transparent"}`,
                  }}
                >
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-display text-lg" style={{ color: "var(--b-white)" }}>{res.shortName}</h3>
                    <span
                      className="text-[0.6rem] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest shrink-0"
                      style={{ backgroundColor: color, color: "white" }}
                    >
                      {res.enseigne.replace("Boum ", "")}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 mb-1.5 text-sm" style={{ color: "var(--b-muted)" }}>
                    <MapPin size={13} className="mt-0.5 shrink-0" style={{ color }} />
                    <span>{res.address}, {res.postalCode} {res.city}</span>
                  </div>
                  <a
                    href={`tel:${res.phoneTel}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 mb-3 text-sm transition-colors"
                    style={{ color: "var(--b-muted)" }}
                  >
                    <Phone size={13} style={{ color }} />
                    {res.phoneDisplay}
                  </a>

                  <div className="flex gap-2">
                    <a
                      href={res.deliverooUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-bold transition-colors text-white"
                      style={{ backgroundColor: color }}
                    >
                      <ShoppingBag size={12} /> Commander
                    </a>
                    <a
                      href={mapsDirectionsHref(res.lat, res.lng, res.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-bold transition-colors"
                      style={{
                        backgroundColor: "var(--b-card2)",
                        color: "var(--b-white)",
                      }}
                      aria-label={`Itinéraire vers ${res.name}`}
                    >
                      <Navigation size={12} /> Itinéraire
                    </a>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ══════════════════════════════════════════════════
            MAP
        ══════════════════════════════════════════════════ */}
        <div className="w-full flex-1 h-[50vh] md:h-full relative filter-dark-map z-0">
          <MapContainer
            center={[43.6045, 1.444]}
            zoom={12}
            scrollWheelZoom={false}
            /* Use Canvas for smoother pan/zoom and fewer DOM repaints — especially
               noticeable when filter chips reshape the visible marker set. */
            preferCanvas
            zoomControl={false}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {visibleLocations.map((res) => {
              const color = brandColorFor(res.enseigne);
              return (
                <Marker
                  key={res.id}
                  position={[res.lat, res.lng]}
                  icon={makeMarkerIcon(color)}
                  eventHandlers={{ click: () => setActiveRes(res) }}
                >
                  <Popup className="custom-popup">
                    <div className="p-1 min-w-[190px]">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-display text-base" style={{ color: "#000" }}>{res.shortName}</h4>
                        <span className="text-[0.55rem] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-widest" style={{ backgroundColor: color, color: "white" }}>
                          {res.enseigne.replace("Boum ", "")}
                        </span>
                      </div>
                      <p className="text-xs mb-2" style={{ color: "#333" }}>{res.address}, {res.postalCode} {res.city}</p>
                      <div className="flex gap-1">
                        <a href={res.deliverooUrl} target="_blank" rel="noopener noreferrer" className="block text-center py-1.5 px-2 rounded text-xs font-bold text-white flex-1" style={{ backgroundColor: color }}>
                          Commander
                        </a>
                        <a href={mapsDirectionsHref(res.lat, res.lng, res.name)} target="_blank" rel="noopener noreferrer" className="block text-center py-1.5 px-2 rounded text-xs font-bold flex-1" style={{ backgroundColor: "#111", color: "#fff" }}>
                          Itinéraire
                        </a>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

      </main>
      
      {/* Add dark theme map fixes */}
      <style dangerouslySetInnerHTML={{ __html: `
        .leaflet-container {
          background-color: var(--b-black) !important;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          background-color: var(--b-white);
          color: var(--b-black);
          border-radius: 8px;
        }
        .custom-popup .leaflet-popup-tip {
          background-color: var(--b-white);
        }
      `}} />
    </>
  );
}
