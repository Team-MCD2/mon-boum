/**
 * Single source of truth for Mon Boum public business data.
 * UI strings are French; this file holds structured facts only.
 */

export const siteConfig = {
  siteName: "Mon Boum",
  /** Official marketing domain (content reference) */
  officialUrl: "https://monboum.fr",

  legal: {
    companyName: "Boum Burger SARL",
    street: "220 Route de Saint-Simon",
    postalCode: "31100",
    city: "Toulouse",
    country: "France",
    phoneDisplay: "05 61 40 77 73",
    phoneTel: "tel:0561407773",
    rcs: "RCS Toulouse B 500 373 311",
    siren: "500 373 311",
  },

  contact: {
    franchiseEmail: "franchise@monboum.fr",
    generalEmail: "franchise@monboum.fr",
  },

  social: {
    /** Compte groupe officiel */
    tiktok: "https://www.tiktok.com/@monboum",
    /** Compte où sont publiées les vidéos hero (clips Toulouse / enseignes) */
    tiktokBoumChickenToulouse: "https://www.tiktok.com/@boumchickentoulouse",
    instagram: "https://www.instagram.com/monboum__/",
    instagramFallback: "https://www.instagram.com/monboum/",
    facebook: "https://www.facebook.com/monboum31/",
    /** Chaîne officielle Mon Boum — source pubs, courts-métrages, validations célébrités */
    youtube: "https://www.youtube.com/channel/UCMiKD1ONqABjqlwr4HKC0Xw",
    youtubeChannelId: "UCMiKD1ONqABjqlwr4HKC0Xw",
  },

  /**
   * Vidéos TikTok utilisées en hero (embed / réseaux).
   * URLs vérifiées — même IDs que sur @boumchickentoulouse.
   */
  tiktokVideos: {
    /** Accueil groupe — clip flagship (Boum Burger) */
    homeHero: "https://www.tiktok.com/@boumchickentoulouse/video/7491717468226915607",
    boumBurger: "https://www.tiktok.com/@boumchickentoulouse/video/7491717468226915607",
    boumChicken: "https://www.tiktok.com/@boumchickentoulouse/video/7505442204966538518",
    boumPizzs: "https://www.tiktok.com/@boumchickentoulouse/video/7493925705890270486",
    boumSaveurs: "https://www.tiktok.com/@boumchickentoulouse/video/7498011452289092886",
  },

  ordering: {
    /** Storefront whitelabel Deliveroo officiel (CTA principal) */
    deliverooGroup: "https://monboum.commande.deliveroo.fr/fr/",
    /** Exemple de deep-link par restaurant — slug + geohash spécifiques */
    deliverooExampleGironis:
      "https://monboum.commande.deliveroo.fr/fr/restaurants/toulouse/le-parc-de-gironis?fulfillment_method=DELIVERY&geohash=sp8zzdpyjb38",
    /** Legacy (catalogue CGV) — conservé seulement pour références légales */
    restOBuro: "https://www.rest-o-buro.fr/",
    /** Alias legacy — à retirer progressivement */
    deliverooToulouse: "https://monboum.commande.deliveroo.fr/fr/",
  },

  claims: {
    halalShort: "Viande halal — sans électronarcose.",
    pioneer: "Pionniers du street-food halal depuis 2004 — Toulouse & métropole.",
  },

  credit: {
    line: "Fait par Microdidact",
  },

  /** SEO — French keywords for local / halal discovery */
  seo: {
    defaultKeywords:
      "Mon Boum, Toulouse, halal, street-food, burger, pizza, tacos, Boum Burger, Boum Chicken, Boum Pizz's, Boum Saveurs, Deliveroo, métropole toulousaine",
    /** ID seul — même vidéo que hero accueil (embed bloc « Réseaux ») */
    tiktokFeaturedVideoId: "7491717468226915607",
  },
} as const;

export function getJsonLdSiteUrl() {
  if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
  return siteConfig.officialUrl;
}
