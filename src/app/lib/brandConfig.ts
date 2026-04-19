export interface BrandConfig {
  id: string;
  name: string;
  tagline: string;
  colors: {
    primary: string;
    secondary: string;
    neon: string;
  };
  deliverooUrl: string;
  instagram: string;
  /** Profil TikTok à mettre en avant (groupe ou compte clips) */
  tiktok: string;
  /** URL complète de la vidéo hero (embed TikTok dans VideoHero) */
  heroVideoSrc: string;
  /** Poster si pas de vidéo / reduced-motion — image fiable (HTTPS) */
  heroPosterSrc: string;
}

export const brands: Record<string, BrandConfig> = {
  "boum-burger": {
    id: "boum-burger",
    name: "Boum Burger",
    tagline: "Le banger urbain. Viande fraîche, cheddar fondant.",
    colors: {
      primary: "var(--color-primary, #FF3366)", // Placeholder urban red / neon
      secondary: "#000000",
      neon: "#ff003c",
    },
    deliverooUrl: "https://monboum.commande.deliveroo.fr/fr/",
    instagram: "https://www.instagram.com/monboum__/",
    tiktok: "https://www.tiktok.com/@boumchickentoulouse",
    heroVideoSrc: "https://www.tiktok.com/@boumchickentoulouse/video/7491717468226915607",
    heroPosterSrc:
      "https://images.unsplash.com/photo-1678110707493-8d05425137ac?auto=format&fit=max&w=1920&q=80",
  },
  "boum-chicken": {
    id: "boum-chicken",
    name: "Boum Chicken",
    tagline: "Crispy authentique. Panure maison, 100% filet.",
    colors: {
      primary: "#FFB800", // Yellow fry/chicken vibe
      secondary: "#000000",
      neon: "#ffcc00",
    },
    deliverooUrl: "https://monboum.commande.deliveroo.fr/fr/",
    instagram: "https://www.instagram.com/monboum__/",
    tiktok: "https://www.tiktok.com/@boumchickentoulouse",
    heroVideoSrc: "https://www.tiktok.com/@boumchickentoulouse/video/7505442204966538518",
    heroPosterSrc:
      "https://images.unsplash.com/photo-1760533536738-f0965fd52354?auto=format&fit=max&w=1920&q=80",
  },
  "boum-pizzs": {
    id: "boum-pizzs",
    name: "Boum Pizz's",
    tagline: "Street pizza. Pâte fraîche, maxi garniture.",
    colors: {
      primary: "#FF4500", // Orange/red
      secondary: "#000000",
      neon: "#ff5e00",
    },
    deliverooUrl: "https://monboum.commande.deliveroo.fr/fr/",
    instagram: "https://www.instagram.com/monboum__/",
    tiktok: "https://www.tiktok.com/@boumchickentoulouse",
    heroVideoSrc: "https://www.tiktok.com/@boumchickentoulouse/video/7493925705890270486",
    heroPosterSrc:
      "https://images.unsplash.com/photo-1563245738-9169ff58eccf?auto=format&fit=max&w=1920&q=80",
  },
  "boum-saveurs": {
    id: "boum-saveurs",
    name: "Boum Saveurs",
    tagline: "L'artisanat du Tacos français.",
    colors: {
      primary: "#8A2BE2", // Urban purple ? Just a placeholder
      secondary: "#000000",
      neon: "#b026ff",
    },
    deliverooUrl: "https://monboum.commande.deliveroo.fr/fr/",
    instagram: "https://www.instagram.com/monboum__/",
    tiktok: "https://www.tiktok.com/@boumchickentoulouse",
    heroVideoSrc: "https://www.tiktok.com/@boumchickentoulouse/video/7498011452289092886",
    heroPosterSrc:
      "https://images.unsplash.com/photo-1740102965347-47e55ef1f16b?auto=format&fit=max&w=1920&q=80",
  },
};
