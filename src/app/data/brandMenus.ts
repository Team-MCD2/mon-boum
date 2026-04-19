/**
 * Brand menus — real categories scraped/inferred from monboum.fr + the Deliveroo
 * whitelabel storefront (https://monboum.commande.deliveroo.fr/fr/). We only
 * expose a *selection* of signature items on each brand page; the exhaustive
 * carte stays on Deliveroo so we never fall behind on price or product changes.
 *
 * Prices are indicative (Deliveroo displays live pricing). Images use the same
 * Unsplash pool as HomePage until we get branded shoots.
 */
import type { BrandSlug } from "./restaurants";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  /** Formatted e.g. "12,90 €". Leave undefined if the product is a Deliveroo combo. */
  price?: string;
  img: string;
  tag?: "Best-seller" | "Signature" | "Nouveau" | "Promo";
};

export type MenuCategory = {
  id: string;
  label: string;
  description?: string;
};

export type PromoBanner = {
  title: string;
  subtitle: string;
  cta: string;
  /** CSS color (token or hex). Defaults to --b-red. */
  accentColor?: string;
};

export type BrandMenu = {
  categories: MenuCategory[];
  signatureItems: MenuItem[];
  promoBanner?: PromoBanner;
};

// ─── Shared image URLs (reused across brands) ────────────────────────────────
const IMG = {
  burger:   "https://images.unsplash.com/photo-1678110707493-8d05425137ac?auto=format&fit=max&w=1600&q=80",
  burger2:  "https://images.unsplash.com/photo-1630852026727-cedb31e3f956?auto=format&fit=max&w=1600&q=80",
  chicken:  "https://images.unsplash.com/photo-1760533536738-f0965fd52354?auto=format&fit=max&w=1600&q=80",
  chickenBucket: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=max&w=1600&q=80",
  tenders:  "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=max&w=1600&q=80",
  tacos:    "https://images.unsplash.com/photo-1762765684587-14f711d01957?auto=format&fit=max&w=1600&q=80",
  pizza:    "https://images.unsplash.com/photo-1563245738-9169ff58eccf?auto=format&fit=max&w=1600&q=80",
  pizza2:   "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=max&w=1600&q=80",
  pizza3:   "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=max&w=1600&q=80",
  mix:      "https://images.unsplash.com/photo-1740102965347-47e55ef1f16b?auto=format&fit=max&w=1600&q=80",
  fries:    "https://images.unsplash.com/photo-1774074645537-f72f70d40d12?auto=format&fit=max&w=1600&q=80",
};

export const brandMenus: Record<BrandSlug, BrandMenu> = {
  // ══════════════════════════════════════════════════════════════════════════
  // BOUM BURGER — l'enseigne historique (Toulouse, depuis 2008)
  // ══════════════════════════════════════════════════════════════════════════
  "boum-burger": {
    categories: [
      { id: "smash", label: "Smash Burgers", description: "Steaks hachés smashés à la plancha, buns brioche, cheddar fondant." },
      { id: "chicken", label: "Chicken Burgers", description: "Filets de poulet halal, panure maison." },
      { id: "tacos", label: "Tacos & Wraps", description: "Formats XL, viandes au choix, sauces signature." },
      { id: "menus", label: "Menus & Combos" },
      { id: "sides", label: "Sides & Sauces", description: "Frites maison, potatoes, nuggets, sauces Boum." },
      { id: "desserts", label: "Desserts & Boissons" },
    ],
    signatureItems: [
      {
        id: "classic",
        name: "Le Boum Classic",
        description: "Double smash beef halal · cheddar double · oignons caramélisés · cornichons · sauce Boum.",
        price: "12,90 €",
        img: IMG.burger,
        tag: "Best-seller",
      },
      {
        id: "chicken-crispy",
        name: "Crispy Chicken Boum",
        description: "Filet de poulet croustillant · coleslaw maison · tomate · brioche beurrée.",
        price: "11,90 €",
        img: IMG.chicken,
        tag: "Signature",
      },
      {
        id: "tacos-xl",
        name: "Tacos XL Boum",
        description: "3 viandes halal au choix · fromage fondu · frites à l'intérieur · sauce algérienne.",
        price: "11,90 €",
        img: IMG.tacos,
        tag: "Nouveau",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // BOUM CHICKEN — fried chicken & buckets (Toulouse centre)
  // ══════════════════════════════════════════════════════════════════════════
  "boum-chicken": {
    categories: [
      { id: "buckets", label: "Buckets à partager", description: "Formats 6 / 10 / 16 morceaux." },
      { id: "tenders", label: "Tenders & Wings", description: "Panure maison, sauces au choix." },
      { id: "burgers", label: "Chicken Burgers" },
      { id: "bowls", label: "Bowls & Salades" },
      { id: "sides", label: "Accompagnements", description: "Coleslaw, frites, potatoes, corn." },
    ],
    signatureItems: [
      {
        id: "crispy",
        name: "Crispy Chicken Boum",
        description: "Filet croustillant panure maison · coleslaw · pickles · brioche beurrée.",
        price: "11,90 €",
        img: IMG.chicken,
        tag: "Best-seller",
      },
      {
        id: "bucket-family",
        name: "Bucket Famille",
        description: "10 morceaux croustillants · frites XL · 3 sauces — à partager.",
        price: "24,90 €",
        img: IMG.chickenBucket,
        tag: "Signature",
      },
      {
        id: "tenders-5",
        name: "Tenders x5",
        description: "Panure home-made · sauce au choix (BBQ, Boum, miel-moutarde, algérienne).",
        price: "8,90 €",
        img: IMG.tenders,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // BOUM PIZZ'S — pizzas & promo « 1 achetée = 1 offerte »
  // ══════════════════════════════════════════════════════════════════════════
  "boum-pizzs": {
    categories: [
      { id: "signature", label: "Pizzas Signature", description: "Les recettes maison Boum — généreuses, halal." },
      { id: "classiques", label: "Pizzas Classiques" },
      { id: "calzone", label: "Calzone & Demi-Lune" },
      { id: "sides", label: "Entrées & Desserts" },
    ],
    signatureItems: [
      {
        id: "margherita",
        name: "Boum Margherita",
        description: "Tomates San Marzano · mozzarella fior di latte · basilic frais · huile d'olive vierge.",
        price: "11,90 €",
        img: IMG.pizza,
        tag: "Signature",
      },
      {
        id: "4-fromages",
        name: "Boum 4 Fromages",
        description: "Mozzarella · chèvre · bleu · parmesan — gratinée généreusement au four.",
        price: "14,90 €",
        img: IMG.pizza2,
      },
      {
        id: "big-boum",
        name: "La Big Boum",
        description: "Viande hachée halal · merguez · oignons · mozzarella · sauce algérienne.",
        price: "15,90 €",
        img: IMG.pizza3,
        tag: "Nouveau",
      },
    ],
    promoBanner: {
      title: "1 pizza achetée = 1 pizza offerte",
      subtitle: "L'offre signature Boum Pizz's — tous les jours, à emporter ou en livraison Deliveroo.",
      cta: "Profiter de l'offre",
      accentColor: "var(--b-red)",
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // BOUM SAVEURS — le carrefour du groupe (multi-spécialités)
  // ══════════════════════════════════════════════════════════════════════════
  "boum-saveurs": {
    categories: [
      { id: "burgers", label: "Burgers", description: "Les classiques Boum Burger." },
      { id: "tacos", label: "Tacos & Wraps" },
      { id: "pizzas", label: "Pizzas", description: "La sélection Boum Pizz's." },
      { id: "chicken", label: "Chicken", description: "Les best de Boum Chicken." },
      { id: "bowls", label: "Bowls & Accompagnements" },
    ],
    signatureItems: [
      {
        id: "menu-decouverte",
        name: "Menu Découverte",
        description: "Un classique de chaque enseigne — burger, tacos, pizza — à partager.",
        price: "18,90 €",
        img: IMG.mix,
        tag: "Signature",
      },
      {
        id: "boum-classic",
        name: "Le Boum Classic",
        description: "Le smash iconique du groupe, disponible partout.",
        price: "12,90 €",
        img: IMG.burger,
        tag: "Best-seller",
      },
      {
        id: "pizza-marg",
        name: "Boum Margherita",
        description: "La signature pizzaiolo du groupe.",
        price: "11,90 €",
        img: IMG.pizza,
      },
    ],
  },
};
