/**
 * Vidéos Mon Boum — réplication enrichie de la page /gallery/ de monboum.fr.
 *
 * Structure :
 *   - `celebrityValidations` : clips « Les stars nous valident »
 *   - `pubsCourtMetrage`     : pubs officielles, courts-métrages, collabs
 *   - `tiktokFeatured`       : IDs TikTok déjà en hero (fiabilisés en hero + réutilisés ici)
 *
 * Les `youtubeId` laissés à `null` sont des TODO : ajouter l'ID à 11 chars quand
 * on a trouvé le clip sur la chaîne officielle
 * https://www.youtube.com/channel/UCMiKD1ONqABjqlwr4HKC0Xw
 *
 * L'affichage tolère un ID nul : fallback → CTA « Voir sur YouTube » pointant la chaîne.
 */

export type VideoSection = {
  id: string;
  title: string;
  subtitle?: string;
  items: VideoItem[];
};

export type VideoItem = {
  id: string;
  title: string;
  /** 11-char YouTube ID (ex. "dQw4w9WgXcQ") — null = lien chaîne en fallback */
  youtubeId: string | null;
  /** Thumbnail override (sinon img.youtube.com auto) */
  thumbnail?: string;
  /** Optionnel — lien TikTok direct */
  tiktokUrl?: string;
};

export const celebrityValidations: VideoSection = {
  id: "celebrities",
  title: "Ils nous ont validé",
  subtitle: "Les stars toulousaines et nationales célèbrent Mon Boum.",
  items: [
    { id: "ninho", title: "Ninho nous valide", youtubeId: null },
    { id: "vegedream", title: "Vegedream nous valide", youtubeId: null },
    { id: "dadju", title: "Dadju nous valide", youtubeId: null },
    { id: "landy", title: "Landy nous valide", youtubeId: null },
    { id: "bramsito", title: "Bramsito nous valide", youtubeId: null },
    { id: "marwa", title: "Marwa Loud nous valide", youtubeId: null },
  ],
};

export const pubsCourtMetrage: VideoSection = {
  id: "pubs",
  title: "Pubs & courts-métrages",
  subtitle: "L'univers Mon Boum en film : Toulouse, food, énergie.",
  items: [
    { id: "court-metrage", title: "Mon Boum — court-métrage", youtubeId: null },
    { id: "tacos-pub", title: "Skrrrrttttt — Tacos Pub", youtubeId: null },
    { id: "chevre-miel", title: "Chèvre Miel × Mon Boum", youtubeId: null },
    { id: "remi-vegas", title: "Remi Vegas × Mon Boum", youtubeId: null },
    { id: "le-five-yanis", title: "LE Five by Yanis", youtubeId: null },
    { id: "presentation-bb", title: "Présentation Boum Burger", youtubeId: null },
    { id: "pub-bb", title: "Pub Boum Burger", youtubeId: null },
    { id: "bb-ubereats", title: "Boum Burger × Uber-Eats", youtubeId: null },
    { id: "new-york-story", title: "New York Story by Boum Burger", youtubeId: null },
  ],
};

export const videoSections: VideoSection[] = [celebrityValidations, pubsCourtMetrage];

/** Channel ID → playlist « uploads » embeddable (préfixe UU au lieu de UC) */
export function uploadsPlaylistId(channelId: string): string {
  return channelId.startsWith("UC") ? "UU" + channelId.slice(2) : channelId;
}
