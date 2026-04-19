import type { LucideIcon } from "lucide-react";
import { Flame, Pizza, Drumstick, Sparkles } from "lucide-react";

export type BrandId = "boum-burger" | "boum-chicken" | "boum-pizzs" | "boum-saveurs";

export interface BrandDefinition {
  id: BrandId;
  path: `/${BrandId}`;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  heroPoster: string;
  heroVideoSrc: string | null;
  logo: string;
  accent: string;
  Icon: LucideIcon;
  signatureItems: { name: string; price: string; desc: string }[];
  deliverooHint: string;
}

const IMG = {
  burger: "https://images.unsplash.com/photo-1678110707493-8d05425137ac?auto=format&fit=max&w=1600&q=80",
  chicken: "https://images.unsplash.com/photo-1760533536738-f0965fd52354?auto=format&fit=max&w=1600&q=80",
  pizza: "https://images.unsplash.com/photo-1563245738-9169ff58eccf?auto=format&fit=max&w=1600&q=80",
  street: "https://images.unsplash.com/photo-1740102965347-47e55ef1f16b?auto=format&fit=max&w=1600&q=80",
};

export const brands: BrandDefinition[] = [
  {
    id: "boum-burger",
    path: "/boum-burger",
    name: "Boum Burger",
    shortName: "Burger",
    tagline: "Smash, sauces maison, énergie urbaine.",
    description:
      "Burgers smash halal, tacos généreux et buckets — l’enseigne flagship du groupe, pensée pour le street-food à Toulouse.",
    heroPoster: IMG.burger,
    heroVideoSrc: null,
    logo: "/branding/Boum-Burgers.png",
    accent: "var(--b-red)",
    Icon: Flame,
    signatureItems: [
      { name: "Le BOUM Classic", price: "12,90 €", desc: "Double smash, cheddar, sauce secrète." },
      { name: "Menu Bi Boum", price: "16,50 €", desc: "Deux burgers, accompagnement, boisson — selon carte en ligne." },
      { name: "Tacos XL", price: "—", desc: "Montage généreux, viande halal au choix." },
    ],
    deliverooHint: "Recherche « Boum Burger » sur Deliveroo — Toulouse.",
  },
  {
    id: "boum-chicken",
    path: "/boum-chicken",
    name: "Boum Chicken",
    shortName: "Chicken",
    tagline: "Croustillant, marinades maison.",
    description:
      "Fried chicken, tenders et formats à partager — le coin poulet du groupe Mon Boum, 100 % halal.",
    heroPoster: IMG.chicken,
    heroVideoSrc: null,
    logo: "/branding/Boum-Chicken.png",
    accent: "var(--b-yellow)",
    Icon: Drumstick,
    signatureItems: [
      { name: "Crispy Chicken BOUM", price: "11,90 €", desc: "Filet croustillant, coleslaw, brioche." },
      { name: "Tenders x5", price: "8,90 €", desc: "Sauce au choix." },
      { name: "Bucket famille", price: "—", desc: "À partager — voir carte en ligne." },
    ],
    deliverooHint: "Recherche « Boum Chicken » ou « Mon Boum » sur Deliveroo.",
  },
  {
    id: "boum-pizzs",
    path: "/boum-pizzs",
    name: "Boum Pizz's",
    shortName: "Pizz's",
    tagline: "Pizza & four — généreux comme la rue.",
    description:
      "Pizzas et best-of italien façon street — halal, pâte travaillée, cuisson proche du four bois selon emplacement.",
    heroPoster: IMG.pizza,
    heroVideoSrc: null,
    logo: "/branding/BOUM-Pizzs.png",
    accent: "var(--b-red)",
    Icon: Pizza,
    signatureItems: [
      { name: "BOUM Margherita", price: "11,90 €", desc: "Tomates, mozzarella, basilic." },
      { name: "BOUM 4 Fromages", price: "14,90 €", desc: "Généreux, gratiné." },
      { name: "Demi-lune / Calzone", price: "—", desc: "Voir carte officielle." },
    ],
    deliverooHint: "Recherche « Boum Pizz » / « Mon Boum » sur Deliveroo — Toulouse.",
  },
  {
    id: "boum-saveurs",
    path: "/boum-saveurs",
    name: "Boum Saveurs",
    shortName: "Saveurs",
    tagline: "Le carrefour des saveurs du groupe.",
    description:
      "Concept multi-spécialités : burgers, tacos, pizzas et plus — pour rassembler toutes les envies sous une même enseigne.",
    heroPoster: IMG.street,
    heroVideoSrc: null,
    logo: "/branding/Boum-Saveurs.png",
    accent: "var(--b-yellow)",
    Icon: Sparkles,
    signatureItems: [
      { name: "Menu découverte", price: "—", desc: "Compose via la carte en ligne." },
      { name: "Tacos / Smash / Pizza", price: "—", desc: "Au choix selon restaurant." },
      { name: "Offres duo", price: "—", desc: "Promotions ponctuelles — site officiel." },
    ],
    deliverooHint: "Ex. « Boum Saveurs — Mermoz » sur Deliveroo (recherche Toulouse).",
  },
];

export const brandById = Object.fromEntries(brands.map((b) => [b.id, b])) as Record<BrandId, BrandDefinition>;

export const brandByPath = Object.fromEntries(brands.map((b) => [b.path, b])) as Record<BrandDefinition["path"], BrandDefinition>;
