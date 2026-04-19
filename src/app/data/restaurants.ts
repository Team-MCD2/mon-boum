/**
 * Source unique de vérité — 8 restaurants Mon Boum (monboum.fr vérifié).
 * Téléphones, adresses et enseignes extraits des pages officielles :
 *   - /boum-burger-2/   → 4 PV
 *   - /boum-pizzs/      → 3 PV
 *   - /boum-chicken/    → 1 PV
 *
 * `brandId` est aligné sur les slugs des routes v1 (`/boum-burger`, etc.).
 * Les coordonnées lat/lng sont approximatives — à raffiner depuis Google Maps.
 *
 * `deliverooUrl` — deep-links par PV confirmés par le client (avril 2026).
 * Slugs Deliveroo → enseigne :
 *   - boum-pizz-bellefont           → bp-bellefontaine
 *   - boum-burger    (Mirail)       → bb-pradettes
 *   - boum-fried-chicken            → bc-vauquelin
 *   - new-york-story (La Cépière)   → bb-mermoz   (rebranding Deliveroo)
 *   - boum-burger-colomiers         → bb-colomiers
 *   - boum-burger-aucamville        → bb-aucamville
 *   - boum-pizzs-aucamville         → bp-aucamville
 * Le PV bp-pradettes est co-localisé avec bb-pradettes — pas de deep-link
 * dédié fourni, on retombe sur le listing storefront du quartier.
 */

export type EnseigneTag = "Boum Burger" | "Boum Chicken" | "Boum Pizz's" | "Boum Saveurs" | "Groupe";

export type BrandSlug = "boum-burger" | "boum-chicken" | "boum-pizzs" | "boum-saveurs";

export interface RestaurantLocation {
  id: string;
  /** Nom court utilisé dans les cards (ex. « Pradettes », « Aucamville ») */
  shortName: string;
  /** Nom complet (ex. « Boum Burger — Pradettes ») */
  name: string;
  enseigne: EnseigneTag;
  brandId: BrandSlug | "groupe";
  address: string;
  city: string;
  postalCode: string;
  /** Téléphone affiché (monboum.fr) — format libre */
  phoneDisplay: string;
  /** Téléphone normalisé pour `tel:` — digits only, sans espaces */
  phoneTel: string;
  lat: number;
  lng: number;
  hours?: string;
  googleMapsQuery: string;
  /** Deep-link Deliveroo whitelabel (fallback = storefront groupe) */
  deliverooUrl: string;
  /** Photo card (branding/unsplash temporaire) */
  photo?: string;
}

/** Listing Deliveroo dans le quartier Vieux-Toulouse — fallback pour bp-pradettes */
const DELIVEROO_VIEUX_TOULOUSE =
  "https://monboum.commande.deliveroo.fr/fr/restaurants/toulouse/le-vieux-toulouse?fulfillment_method=DELIVERY&geohash=spc00f48su3r";

export const toulouseLocations: RestaurantLocation[] = [
  // ── BOUM BURGER (4 PV) ────────────────────────────────────────
  {
    id: "bb-pradettes",
    shortName: "Pradettes",
    name: "Boum Burger — Pradettes",
    enseigne: "Boum Burger",
    brandId: "boum-burger",
    address: "220 route de Saint-Simon",
    city: "Toulouse",
    postalCode: "31100",
    phoneDisplay: "05 61 40 77 73",
    phoneTel: "0561407773",
    lat: 43.5752,
    lng: 1.4035,
    hours: "Midi & soir — horaires confirmés sur Google",
    googleMapsQuery: "Boum Burger 220 route de Saint-Simon 31100 Toulouse",
    deliverooUrl:
      "https://monboum.commande.deliveroo.fr/menu/Toulouse/le-mirail-universite/boum-burger?day=today&geohash=spc00f48sv4y&time=ASAP",
  },
  {
    id: "bb-aucamville",
    shortName: "Aucamville",
    name: "Boum Burger — Aucamville",
    enseigne: "Boum Burger",
    brandId: "boum-burger",
    address: "327 Avenue des États-Unis",
    city: "Toulouse",
    postalCode: "31200",
    phoneDisplay: "05 61 41 74 17",
    phoneTel: "0561417417",
    lat: 43.6421,
    lng: 1.4312,
    hours: "Midi & soir — horaires confirmés sur Google",
    googleMapsQuery: "Boum Burger 327 Avenue des États-Unis 31200 Toulouse",
    deliverooUrl:
      "https://monboum.commande.deliveroo.fr/menu/Toulouse/falguerolles/boum-burger-aucamville?day=today&geohash=spc00f48sv4y&time=ASAP",
  },
  {
    id: "bb-colomiers",
    shortName: "Colomiers",
    name: "Boum Burger — Colomiers",
    enseigne: "Boum Burger",
    brandId: "boum-burger",
    address: "4 Avenue Édouard Serres",
    city: "Colomiers",
    postalCode: "31770",
    phoneDisplay: "05 34 64 04 04",
    phoneTel: "0534640404",
    lat: 43.6114,
    lng: 1.3368,
    hours: "Midi & soir — horaires confirmés sur Google",
    googleMapsQuery: "Boum Burger 4 Avenue Édouard Serres 31770 Colomiers",
    deliverooUrl:
      "https://monboum.commande.deliveroo.fr/menu/Toulouse/en-raudel/boum-burger-colomiers?day=today&geohash=spc00f48sv4y&time=ASAP",
  },
  {
    id: "bb-mermoz",
    shortName: "Mermoz",
    name: "Boum Burger — Mermoz",
    enseigne: "Boum Burger",
    brandId: "boum-burger",
    address: "168 rue Henri Desbals",
    city: "Toulouse",
    postalCode: "31100",
    phoneDisplay: "05 61 51 25 12",
    phoneTel: "0561512512",
    lat: 43.5781,
    lng: 1.4116,
    hours: "Midi & soir — horaires confirmés sur Google",
    googleMapsQuery: "Boum Burger 168 rue Henri Desbals 31100 Toulouse",
    // Slug Deliveroo: "new-york-story" (la-cepiere-croix-de-pierre)
    deliverooUrl:
      "https://monboum.commande.deliveroo.fr/menu/Toulouse/la-cepiere-croix-de-pierre/new-york-story?day=today&geohash=spc00f48sv4y&time=ASAP",
  },

  // ── BOUM PIZZ'S (3 PV) ────────────────────────────────────────
  {
    id: "bp-pradettes",
    shortName: "Pradettes",
    name: "Boum Pizz's — Pradettes",
    enseigne: "Boum Pizz's",
    brandId: "boum-pizzs",
    address: "220 route de Saint-Simon",
    city: "Toulouse",
    postalCode: "31100",
    phoneDisplay: "05 61 41 84 18",
    phoneTel: "0561418418",
    lat: 43.5752,
    lng: 1.4035,
    hours: "Midi & soir — horaires confirmés sur Google",
    googleMapsQuery: "Boum Pizz's 220 route de Saint-Simon 31100 Toulouse",
    // Pas de deep-link dédié fourni — on renvoie vers le listing quartier.
    deliverooUrl: DELIVEROO_VIEUX_TOULOUSE,
  },
  {
    id: "bp-bellefontaine",
    shortName: "Bellefontaine",
    name: "Boum Pizz's — Bellefontaine",
    enseigne: "Boum Pizz's",
    brandId: "boum-pizzs",
    address: "69 allée de Bellefontaine",
    city: "Toulouse",
    postalCode: "31100",
    phoneDisplay: "05 61 41 64 16",
    phoneTel: "0561416416",
    lat: 43.5701,
    lng: 1.3995,
    hours: "Midi & soir — horaires confirmés sur Google",
    googleMapsQuery: "Boum Pizz's 69 allée de Bellefontaine 31100 Toulouse",
    // Deep-link confirmé (storefront whitelabel Deliveroo)
    deliverooUrl:
      "https://monboum.commande.deliveroo.fr/fr/menu/Toulouse/le-mirail-universite/boum-pizz-bellefont?day=today&geohash=spc00f48sv4y&time=ASAP",
  },
  {
    id: "bp-aucamville",
    shortName: "Aucamville",
    name: "Boum Pizz's — Aucamville",
    enseigne: "Boum Pizz's",
    brandId: "boum-pizzs",
    address: "327 Avenue des États-Unis",
    city: "Toulouse",
    postalCode: "31200",
    phoneDisplay: "05 61 41 74 17",
    phoneTel: "0561417417",
    lat: 43.6421,
    lng: 1.4312,
    hours: "Midi & soir — horaires confirmés sur Google",
    googleMapsQuery: "Boum Pizz's 327 Avenue des États-Unis 31200 Toulouse",
    deliverooUrl:
      "https://monboum.commande.deliveroo.fr/menu/Toulouse/falguerolles/boum-pizzs-aucamville?day=today&geohash=spc00f48sv4y&time=ASAP",
  },

  // ── BOUM CHICKEN (1 PV) ───────────────────────────────────────
  {
    id: "bc-vauquelin",
    shortName: "Vauquelin",
    name: "Boum Chicken — Vauquelin",
    enseigne: "Boum Chicken",
    brandId: "boum-chicken",
    address: "152 rue Nicolas Louis Vauquelin",
    city: "Toulouse",
    postalCode: "31100",
    phoneDisplay: "05 34 46 18 38",
    phoneTel: "0534461838",
    lat: 43.5721,
    lng: 1.4011,
    hours: "Midi & soir — horaires confirmés sur Google",
    googleMapsQuery: "Boum Chicken 152 rue Nicolas Louis Vauquelin 31100 Toulouse",
    deliverooUrl:
      "https://monboum.commande.deliveroo.fr/menu/Toulouse/le-mirail-universite/boum-fried-chicken?day=today&geohash=spc00f48sv4y&time=ASAP",
  },
];

/**
 * Search URL — ouvre Google Maps sur le résultat correspondant à `query`.
 * Utilisé en fallback sémantique pour les pages / liens "voir sur la carte".
 */
export function mapsHref(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * Directions URL — ouvre l'itinéraire depuis la position actuelle de
 * l'utilisateur vers la coordonnée fournie. `place_query` est ajoutée comme
 * `destination_place_query` pour que Maps affiche le nom complet du resto
 * dans la fiche de destination plutôt qu'une simple paire lat/lng.
 */
export function mapsDirectionsHref(lat: number, lng: number, placeQuery?: string) {
  const base = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  return placeQuery
    ? `${base}&destination_place_id=&destination_query=${encodeURIComponent(placeQuery)}`
    : base;
}

export function locationsByBrand(brandId: BrandSlug): RestaurantLocation[] {
  return toulouseLocations.filter((l) => l.brandId === brandId);
}
