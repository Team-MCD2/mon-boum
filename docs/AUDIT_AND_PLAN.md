# Mon Boum v1 — Audit complet + Plan d'exécution

> Dernière mise à jour : audit initial. À tenir à jour au fil des livraisons.
> Tous les chemins ci-dessous sont absolus sous `Monboumv1/Monboumv1`.

---

## 1. Diagnostic — ce que fait vraiment le site aujourd'hui

### 1.1 Stack & architecture (OK)
- Vite 6 + React 18 + React Router 7 + Tailwind 4 + Motion 12 + Leaflet.
- `src/app/routes.tsx` expose toutes les routes demandées par le brief :
  `/`, `/boum-burger`, `/boum-chicken`, `/boum-pizzs`, `/boum-saveurs`,
  `/nos-restaurants`, `/franchise`, `/contact`, `/mentions-legales`,
  legacy redirects `/menu` → `/nos-restaurants`, `/restaurants` → `/nos-restaurants`.
- `src/app/Root.tsx` injecte JSON-LD, `ThemeProvider`, `Navbar`, `Footer`, `PageTransition`, `IntroPreface`, `CustomCursor` conditionnel.
- Pages : `HomePage` (1256 lignes), `BrandPage` (template unique + config par marque), `RestaurantsPage` (carte Leaflet), `FranchisePage`, `ContactPage`, `LegalPage`, `NotFoundPage`, `MenuPage`, `NosRestaurantsPage`.

### 1.2 Bugs structurels (à corriger AVANT design)

| # | Fichier / zone | Problème | Gravité |
|---|---|---|---|
| B1 | `src/app/routes.tsx:11` | La route `/franchise` utilise un stub inline `function FranchisePage()` (3 lignes) au lieu d'importer `./pages/FranchisePage`. Le vrai composant (5.9 KB, design complet) n'est jamais rendu. | 🔴 bloquant |
| B2 | `src/app/pages/RestaurantsPage.tsx` vs `NosRestaurantsPage.tsx` | Deux pages « restaurants » co-existent. `routes.tsx` route `/nos-restaurants` vers `RestaurantsPage` (carte Leaflet basique) ; `NosRestaurantsPage` (filtre par enseigne + JSON-LD `ItemList`) est orphelin. | 🔴 |
| B3 | `src/app/lib/restaurants.json` **et** `src/app/data/restaurants.ts` | Deux sources de données distinctes, désynchronisées (téléphones, adresses, enseignes, IDs). `BrandPage` lit le JSON ; `NosRestaurantsPage` lit le TS. | 🔴 |
| B4 | `src/app/lib/restaurants.json` | Tous les téléphones = `+33 5 61 00 00 00` (placeholder). Les vrais numéros existent déjà dans `data/restaurants.ts` (`05 61 40 77 73`, `05 61 41 74 17`, `05 61 51 25 12`, `05 34 64 04 04`). | 🟠 |
| B5 | `src/app/components/Footer.tsx:22-30` | Colonne *Menu* pointe vers `/menu#pizza`, `/menu#burgers`, etc. — or `/menu` redirige vers `/nos-restaurants` (perte du hash). 6 liens morts. | 🟠 |
| B6 | `src/app/pages/MenuPage.tsx` (20 KB) | Page écrite mais non routée (`/menu` est un redirect). Code mort + `CartContext` / `CartDrawer` deviennent inutiles puisqu'il n'existe plus d'écran pour ajouter au panier. | 🟠 |
| B7 | `src/app/context/ThemeContext.tsx:15` | Thème par défaut = `"light"`. Or la palette claire est cassée (cf. §1.3) et la DA Mon Boum est **urban noir/rouge/jaune**. Les nouveaux visiteurs tombent sur une version visuellement incorrecte. | 🔴 |
| B8 | `src/app/components/TikTokSocialBlock.tsx:72,77` | `cite="https://www.tiktok.com/@monboum/video/<id>"` alors que les 4 vidéos live sur `@boumchickentoulouse`. TikTok `embed.js` peut résoudre par ID seul, mais certains ID/username mismatches 404. | 🟡 |
| B9 | `src/app/pages/ContactPage.tsx:52` | Le « form » fait `window.location.href = mailto:…` — acceptable comme fallback, mais sans service (Formspree / EmailJS / Resend) c'est fragile sur mobile et peut surprendre. | 🟡 |

### 1.3 Light theme — pourquoi il « n'est pas très juste »

**Cause racine :** presque tous les composants hard-codent des couleurs **rgba(6,6,6,…)** et **rgba(240,237,232,…)** au lieu de passer par `var(--b-black)` / `var(--b-white)` / `var(--b-muted)`. Les tokens CSS flippent correctement (`src/styles/index.css:24-41`), mais les composants les court-circuitent.

Scan rapide (occurrences hardcodées palette sombre) :
- `src/app/pages/HomePage.tsx` — 13 occurrences (gradients hero, cards, testimonials…).
- `src/app/components/Navbar.tsx` — 4 (liens à 50% d'opacité sur blanc deviennent invisibles).
- `src/app/pages/MenuPage.tsx` — 4.
- `src/app/pages/FranchisePage.tsx` — 2.
- `src/app/components/VideoHero.tsx:94-95` — gradient `rgba(6,6,6,0.95)` fixe quel que soit le thème.
- `src/app/components/Footer.tsx`, `TikTokSocialBlock.tsx`, `IntroPreface.tsx`, `LegalPage.tsx`, `NosRestaurantsPage.tsx` — 1 chacun.

**Autres effets visibles en light :**
- `Navbar` : `backgroundColor: "rgba(6,6,6,0.92)"` + `boxShadow: "0 12px 40px rgba(0,0,0,0.35)"` + texte `color: "rgba(240,237,232,0.5)"` ⇒ barre noire sur fond blanc avec texte quasi invisible au scroll.
- `VideoHero` : gradient fond foncé en permanence ⇒ incohérent avec light.
- `RestaurantsPage.tsx:98` — tile layer Carto `dark_all` forcé ; en light mode il faut basculer sur `light_all` ou `voyager`.
- `CustomCursor` : fond noir (`var(--b-black)`) OK, mais flipped en light = cercle blanc + halo rouge → peut être voulu mais à valider.

**Recommandation :**
1. Repasser le site en **thème sombre par défaut** (DA Mon Boum = street/neon).
2. Garder la toggle, mais durcir le light en vraie *second citizen* : audit + refactor ciblé pour éliminer les rgba en dur (remplacer par tokens) + gradients conditionnés via CSS vars (`--hero-gradient` par thème).

### 1.4 Vidéos hero — pourquoi « il n'y a toujours pas de vidéo »

Le code branche bien une vidéo hero :
- `src/app/components/VideoHero.tsx` sait gérer URLs TikTok (via `embed/v2/<id>`) **et** `<video>` natif.
- `src/app/pages/HomePage.tsx:326-329` passe `siteConfig.tiktokVideos.homeHero`.
- `src/app/pages/BrandPage.tsx:35-39` passe `brand.heroVideoSrc` (URL TikTok).
- Les 4 URLs TikTok sont correctement configurées dans `src/app/config/siteConfig.ts:43-50` et `src/app/lib/brandConfig.ts`.

**Pourquoi l'utilisateur ne les voit pas :**
1. `embed/v2/<videoId>?autoplay=1&mute=1` : l'embed TikTok est un **widget** (logo, caption, share). Même scalé à 1.15, il affiche souvent un *tap-to-play* overlay et n'autoplay pas de façon fiable en cross-origin, surtout sans gesture utilisateur. iOS/Safari/Chrome mobile le bloquent.
2. Les browsers modernes bloquent les iframes tierces sans `allow="autoplay"` explicite + interaction préalable.
3. Le gradient `linear-gradient(to top, rgba(6,6,6,0.95) 0% … )` couvre 95% du bas et 25% du haut → même quand l'embed charge, l'utilisateur voit surtout du noir.
4. `referrerPolicy="strict-origin-when-cross-origin"` + `pointer-events: none` : si TikTok attend un click pour démarrer, il ne peut pas le recevoir.

**Bottom-line :** une **iframe TikTok ne peut pas servir de video-background premium**. Les sites de référence (`the-911.vercel.app`, `botna-six.vercel.app`) utilisent des **MP4 locaux** avec `<video autoplay muted loop playsInline>`.

**Solution recommandée :**
- Télécharger les 4 TikToks + 1 flagship (homeHero), ré-encoder en MP4 H.264 + WebM VP9, 720p, ~3-6 s boucle, muet, poids cible < 2 Mo chacun.
- Placer dans `public/videos/<brand>.mp4` et `.webm`.
- Étendre `brandConfig` / `siteConfig.tiktokVideos` : `heroVideoSrc` accepte `{ mp4, webm, tiktokUrl, poster }` ; `VideoHero` sert le MP4 en priorité ; conserve l'URL TikTok pour le lien « Voir sur TikTok » et pour le **bloc réseaux** (où l'embed widget est approprié).
- Poster = frame extraite du MP4 (ou photo brand Instagram), servie avec `loading="eager"` et `fetchpriority="high"`.
- `prefers-reduced-motion` : poster seul.
- Performance : `preload="metadata"`, lazy en dessous du fold, `IntersectionObserver` pour play/pause.

### 1.5 Fonctionnalités manquantes vs monboum.fr

| monboum.fr | Monboumv1 | Action |
|---|---|---|
| 4 pages enseigne avec menu visible + galerie | Template unique + 3 cards placeholder (`Classique #1/2/3` génériques) | ➕ Remplir `brandConfig.menu[]` avec vrais signatures (nom, visuel, prix, desc) par marque |
| Section « Ils ont validé » avec citations célébrités | Présent dans HomePage (`celebrityQuotes` 12 entrées) ✅ | OK — améliorer les photos (certaines sont Unsplash de repli) |
| Ouverture nouveaux points de vente / actualités | Absent | ➕ Bloc « Nouvelles ouvertures » + `/actualites` optionnel |
| Page franchise détaillée (investissement, process, FAQ) | FranchisePage complète existe mais **pas routée** (B1) | 🔴 Fix B1 |
| Lien direct Deliveroo par point de vente | Deliveroo en header + bouton brand, mais **pas par restaurant** (seulement itinéraire Google) | ➕ Ajouter `deliverooUrl` par ligne dans restaurants data + CTA double |
| Appli mobile / click & collect | Absent | Hors scope V1 — mentionner discrètement ou omettre |
| Formulaire franchise avec champs (investissement, localisation) | Mailto seul (B9) | ➕ Upgrade Formspree/Resend ou champs mailto enrichis |
| SEO local par quartier (schema.org Restaurant par PV) | Partiel — `NosRestaurantsPage` a JSON-LD `ItemList` mais page non routée (B2) | 🔴 Routage + enrichir |
| OpenGraph par page enseigne | Partiel (`SeoHead` existe, mais `ogImagePath` = poster Unsplash) | ➕ Générer OG images par brand (1200×630, logo + food) |
| Horaires réels par restaurant | Placeholder « Souvent midi & soir — confirmer sur Google » | ➕ Extraire depuis Google Business (à faire à la main pour 4-6 PV) |

### 1.6 Autres petits défauts

- `src/app/pages/HomePage.tsx:22-33` — tout le bloc `IMG` pointe Unsplash. À remplacer progressivement par photos brand (`public/branding/food-*.jpg`).
- `Navbar` : pas de mobile-friendly pour desktop `md` (breakpoint `lg:hidden` sur burger → entre 768 et 1024 ça casse).
- `IntroPreface` : loader 1.6 s à chaque load — OK avec `sessionStorage`, à vérifier qu'il ne redémarre pas à chaque navigation.
- `public/branding/` : `Franck Ribéry` utilise `IMG.double` (photo de burger) comme portrait (`HomePage.tsx:93`). Bug visuel.
- `package.json` : dépendances énormes (MUI + Radix + tout shadcn + Recharts + react-dnd + react-slick). Beaucoup sans usage. Audit treeshake possible.

---

## 2. Plan d'exécution — ordre recommandé

> Objectif stratégique : **livrer de la confiance d'abord** (cohérence data, routes propres, thème correct), **puis la wow-zone** (vidéos, pages enseigne enrichies), **puis le polish** (SEO, perf, assets).

### Phase 0 — Quick wins bloquants (1 session)
- [ ] **B1** : `routes.tsx` importe et route `./pages/FranchisePage` au lieu du stub.
- [ ] **B2** : décider — **consolider** en gardant `NosRestaurantsPage` (plus riche) + carte Leaflet intégrée dedans, retirer `RestaurantsPage.tsx`.
- [ ] **B3** : une seule source de vérité : `src/app/data/restaurants.ts` (typé). Supprimer `restaurants.json`. `BrandPage` et la nouvelle map page lisent le TS.
- [ ] **B4** : remplir les téléphones réels + ajouter `deliverooUrl` optionnel par PV + `hours` réels (4-6 entrées seulement → faisable à la main).
- [ ] **B5** : refondre la colonne *Menu* du Footer → liens vers les 4 pages enseigne (pas d'ancres `/menu#…`).
- [ ] **B6** : soit supprimer `MenuPage.tsx` + `CartContext` + `CartDrawer`, soit garder `MenuPage` comme hub inspiration/menus (sans panier). Recommandation : **supprimer** pour alléger.
- [ ] **B7** : `ThemeContext` défaut = `"dark"`. Light reste toggleable.

### Phase 1 — Light theme propre (1 session)
- [ ] Créer tokens manquants dans `src/styles/index.css` :
  - `--hero-overlay` (dégradé bas) : `rgba(6,6,6,0.95) → rgba(6,6,6,0.25)` en dark, `rgba(255,255,255,0.95) → rgba(255,255,255,0.25)` en light.
  - `--text-muted-strong`, `--card-shadow`, `--glass-bg` (navbar scrolled).
- [ ] Scan automatisé : remplacer chaque `rgba(6,6,6,…)` et `rgba(240,237,232,…)` par token équivalent.
- [ ] `Navbar` : fond + texte + shadow → tokens.
- [ ] `VideoHero` : gradient via `--hero-overlay`.
- [ ] `RestaurantsPage` / futur map : tile URL conditionnel sur `data-theme`.
- [ ] QA visuelle : naviguer toutes les routes en light + dark.

### Phase 2 — Vidéos hero réelles (1 session, bloquée sur assets)
- [ ] **Décision asset** (cf. §3 Questions) : soit je télécharge les TikToks via `yt-dlp`, soit tu fournis les MP4.
- [ ] Convertir : `ffmpeg -i <in.mp4> -an -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 24 -movflags +faststart public/videos/<brand>.mp4` + version WebM.
- [ ] Générer posters : `ffmpeg -i <in.mp4> -ss 00:00:01 -frames:v 1 public/videos/<brand>.jpg`.
- [ ] Étendre types `BrandConfig.heroVideo: { mp4: string; webm?: string; poster: string; tiktokUrl: string }`.
- [ ] Refactor `VideoHero` : `<video>` natif en priorité, fallback poster, `prefers-reduced-motion` respecté, `IntersectionObserver` pour pause hors-vue.
- [ ] Conserver embed TikTok **uniquement** dans `TikTokSocialBlock` (c'est son job).

### Phase 3 — Pages enseigne enrichies (2 sessions)
- [ ] `brandConfig` gagne :
  - `menu: { name, price, img, tag?, desc }[]` (3-6 items par marque, prix réels monboum.fr).
  - `gallery: string[]` (4-8 visuels).
  - `story: string` (2-3 paragraphes).
  - `deliverooUrl` ciblé (quand dispo) vs fallback générique.
- [ ] `BrandPage` :
  - Section menu signature — remplace les `Classique #1/2/3`.
  - Galerie scroll horizontal (`h-scroll-track`).
  - Story block (typographie éditoriale).
  - Bloc réseaux — injecte le TikTok de la marque + lien Instagram.
  - JSON-LD `Restaurant` par enseigne (pas juste groupe).
- [ ] Ajuster couleurs brand (actuellement `#FF3366`, `#8A2BE2`… = placeholders). Extraire vrais HEX depuis logos `public/branding/Boum-*.png` (outil color picker).

### Phase 4 — `/nos-restaurants` unifié (1 session)
- [ ] Page unique qui combine : header + filtres `NosRestaurantsPage` + Leaflet de `RestaurantsPage` + cards détaillées + JSON-LD `ItemList`.
- [ ] Tile layer Carto `voyager_labels_under` (neutre sombre/clair) ou conditionnel thème.
- [ ] Marker custom SVG par marque (couleur brand).
- [ ] Popup : nom + adresse + CTA *Google Maps* + *Deliveroo* (si dispo).
- [ ] Liste synchro scroll ↔ map (optionnel, nice-to-have).

### Phase 5 — Contenu & contact (1 session)
- [ ] `FranchisePage` : ajouter bloc « Investissement type », « 6 étapes », FAQ franchise, témoignage franchisé (si dispo).
- [ ] `ContactPage` : intégrer un service réel (**Formspree** gratuit ou **Resend** API) + garder mailto en fallback.
- [ ] Retirer les célébrités qui n'ont pas de vraie photo brand, ou fixer `Ribéry` (bug `IMG.double`).

### Phase 6 — SEO + perf + polish (1 session)
- [ ] OG image par page (1200×630) — `public/og/<route>.jpg`.
- [ ] `SeoHead` gère `ogImage`, `canonical`, `alternate` FR.
- [ ] Sitemap.xml + robots.txt.
- [ ] Audit Lighthouse sur Vercel : cible > 90 perf, > 95 SEO/a11y.
- [ ] Tree-shake deps : retirer MUI, react-dnd, react-slick, recharts si non utilisés. Gain potentiel ~500 KB gzip.
- [ ] Remplacer Unsplash par photos brand au fur et à mesure.

### Phase 7 — Revue finale
- [ ] Comparer à monboum.fr en split-screen : chaque section produit ≥ équivalent.
- [ ] Comparer aux 3 SPA de référence (`the-911`, `botna-six`, `fifteen-eosin`) : motion/hero parité.
- [ ] Crédit *Fait par Microdidact* présent dans `Footer.tsx:247` ✅.

---

## 3. Questions bloquantes à trancher

1. **Asset vidéo** : je télécharge les 4 TikToks via `yt-dlp` (public, pas d'auth) puis re-encode localement, ou tu fournis des MP4 plus propres captés directement à la source ?
2. **MenuPage + Cart** : je supprime (propre), ou je transforme en hub menus inspirationnels sans checkout ?
3. **Light theme** : je le durcis sérieusement ou je l'enlève et reste 100 % dark (plus fidèle DA) ?
4. **Formulaires contact/franchise** : Formspree (zéro backend, 50 msg/mois gratuit) ou on reste mailto ?
5. **Horaires/téléphones** : je collecte moi-même depuis Google Maps pour les 5-6 vrais PV, ou tu me passes un tableau ?

---

## 4. État actuel du repo — raccourcis fichiers

- Routes : `src/app/routes.tsx`
- Theme tokens : `src/styles/index.css:6-41`, `src/styles/theme.css`
- Config unique : `src/app/config/siteConfig.ts`
- Brand config : `src/app/lib/brandConfig.ts`
- Restaurants data (à garder) : `src/app/data/restaurants.ts`
- Restaurants data (à supprimer) : `src/app/lib/restaurants.json`
- Pages à router proprement : `src/app/pages/FranchisePage.tsx`, `src/app/pages/NosRestaurantsPage.tsx`
- Page à supprimer : `src/app/pages/RestaurantsPage.tsx` (ou à fusionner), `src/app/pages/MenuPage.tsx` (optionnel)
- Hero video : `src/app/components/VideoHero.tsx` (à refactor pour MP4 natif)
- Social embed : `src/app/components/TikTokSocialBlock.tsx` (OK, juste corriger le `cite` username)

---

---

## 5. Crawl monboum.fr — features officielles à répliquer

### 5.1 Structure réelle du site

| Route monboum.fr | Correspondance v1 | Status v1 |
|---|---|---|
| `/` | `/` | ✅ existe |
| `/boum-burger-2/` | `/boum-burger` | ⚠️ slug diff OK côté v1 |
| `/boum-pizzs/` | `/boum-pizzs` | ✅ |
| `/boum-chicken/` | `/boum-chicken` | ✅ |
| `/boum-saveurs/` | `/boum-saveurs` | ⚠️ page 404 sur monboum.fr aujourd'hui (maintenu en nav) |
| `/mon-boum-cest-quoi/` | `/franchise` | ⚠️ à remplir avec les chiffres officiels |
| `/formulaire-de-candidature/` | sous-section `/franchise` | ❌ à créer |
| `/gallery/` | ❌ absent v1 | 🔴 à créer (`/videos`) |
| `/nos-restaurants/` | `/nos-restaurants` | ✅ |
| `/contact/` | `/contact` | ✅ |
| `/cgv/` (externe WP) | lien externe | ✅ |
| `/politique-de-confidentialite/` | lien externe | ✅ |

### 5.2 Commandes Deliveroo — whitelabel officiel

- **Groupe (home, CTA principal, fallback) :** `https://monboum.commande.deliveroo.fr/fr/`
- **Par restaurant (exemple Gironis) :** `https://monboum.commande.deliveroo.fr/fr/restaurants/toulouse/le-parc-de-gironis?fulfillment_method=DELIVERY&geohash=sp8zzdpyjb38`
- **À remplacer partout :** actuellement v1 utilise `https://deliveroo.fr/fr/restaurants/toulouse?searchTerm=Boum%20Burger` (recherche générique). **C'est incorrect** — passer à l'URL whitelabel.
- **Par PV :** les slugs Deliveroo ne sont pas listés sur monboum.fr. À collecter manuellement (ouvrir le storefront whitelabel, noter chaque slug). Pour l'instant, fallback sur le groupe pour chaque PV jusqu'à ce qu'on ait les deep-links.

### 5.3 Restaurants officiels & numéros (source : pages enseigne monboum.fr)

| Enseigne | Nom PV | Téléphone | Adresse |
|---|---|---|---|
| Boum Burger | Pradettes | **05 61 407 773** | 220 route de Saint-Simon, 31100 Toulouse |
| Boum Burger | Aucamville | **05 61 417 417** | 327 Avenue des États-Unis, 31200 Toulouse |
| Boum Burger | Colomiers | **05 34 640 404** | 4 Avenue Édouard Serres, 31770 Colomiers |
| Boum Burger | Mermoz | **05 61 512 512** | 168 rue Henri Desbals, 31100 Toulouse |
| Boum Pizz's | Pradettes | **05 61 418 418** | 220 route de Saint-Simon, 31100 Toulouse |
| Boum Pizz's | Bellefontaine | **05 61 416 416** | 69 allée de Bellefontaine, 31100 Toulouse |
| Boum Pizz's | Aucamville | **05 61 417 417** | 327 Avenue des États-Unis, 31200 Toulouse |
| Boum Chicken | Vauquelin | **05 34 461 838** | 152 rue Nicolas Louis Vauquelin, 31100 Toulouse |

**Total = 8 restaurants** (aligné avec le discours franchise « 8 restaurants actuellement »).

NB : certains téléphones sont partagés entre enseignes (Pradettes, Aucamville). Logique : c'est le même bâtiment avec plusieurs enseignes.

### 5.4 Page `/gallery/` — à recréer en v1 comme `/videos`

Contenu listé sur monboum.fr :
- **Lien YouTube principal** : https://www.youtube.com/channel/UCMiKD1ONqABjqlwr4HKC0Xw
- **Les stars nous valident (avec vidéos)** : Ninho, Vegedream, Dadju, Landy, Bramsito, Marwa Loud
- **Autres vidéos** : « Mon Boum version court métrage », « Skrrrrttttt Tacos Pub », « Chèvre Miel & Mon Boum », « Remi Vegas & Mon Boum », « LE Five by Yanis »
- **Pubs** : Présentation Boum Burger, Pub Boum Burger, Boum Burger x Uber-Eats, New York Story by Boum Burger

**Implémentation v1 :**
- Nouvelle route `/videos` (ou `/gallery`) avec SeoHead dédié.
- Section « Chaîne YouTube » avec CTA abonnement + embed d'un hero video.
- Grille de `<iframe>` YouTube lite (via `lite-youtube-embed` pattern ou simple thumbnail → iframe on-click pour perf).
- Sections : « Ils nous ont validé 🏆 » (clips) · « Pubs & films » · « Court-métrages ».
- Footer Nav + Navbar : ajouter lien « Vidéos ».

### 5.5 Données franchise (`/mon-boum-cest-quoi/`)

Chiffres clés à intégrer dans `FranchisePage.tsx` :
- **Depuis 2004** · 1er drive fast-food halal de France (Boum Burger).
- **8 restaurants** actuellement sur la région toulousaine.
- **CA** : 500 000 € – 1 500 000 € (résultat N+2).
- **Droit d'entrée** : 25 000 € HT (hors pas de porte).
- **Formation** : 15 000 € HT.
- **Redevance franchise** : 5 %.
- **Redevance communication** : 2 %.
- **Durée contrat** : 5 ans.
- **Process 3 étapes** : candidature → validation / rencontre → lancement projet.

### 5.6 Autres features du site officiel à répliquer

- **Marquee catégories** (TACOS / BURGERS / PIZZAS) — ✅ déjà présent v1.
- **Promo marketing actives** : *« 1 pizza achetée = 1 pizza offerte sur la gamme SENIOR »* (Boum Pizz's) — afficher comme bandeau promo sur la page enseigne.
- **Concept 100 % Halal sans électronarcose** — ✅ déjà présent (HalalTrustSection).
- **Menu par catégories métier** — varie par enseigne :
  - Boum Burger : Burgers · Tacos & Bucket · Assiettes & Boissons · Desserts
  - Boum Pizz's : Pizzas (avec flag *non dispo Pradettes* sur certaines)
  - Boum Chicken : Burgers · Buckets · Bowls · Menu Enfant · Desserts
- **Widget « Votre panier est vide »** (header monboum.fr) — c'est WooCommerce legacy. Pas besoin de cloner (supprimer dans v1 si présent).

---

## 6. Plan d'exécution — mis à jour (v2)

### Phase 0 — Bloquants (en cours)
- [ ] **B1** Fix route `/franchise`
- [ ] **B7** Default theme → `dark`
- [ ] **B3 + B2** Consolidation données restaurants vers `data/restaurants.ts` (single source) + mise à jour avec les 8 PV réels + vrais téléphones
- [ ] Remplacer tous les `deliverooUrl` par la racine whitelabel `https://monboum.commande.deliveroo.fr/fr/` (groupe) + slots par PV quand connus
- [ ] **B5** Footer : remplacer colonne *Menu* par colonne *Découvrir* (pages enseigne + gallery)
- [ ] Ajouter lien *Vidéos* dans Navbar + Footer
- [ ] **B8** TikTok social block : cite URL correcte (`@boumchickentoulouse`)

### Phase 0.5 — Nouveau : page `/videos`
- [ ] Créer `src/app/pages/GalleryPage.tsx` : hero + grille d'embeds YouTube (lite-load)
- [ ] Route `/videos` dans `routes.tsx`
- [ ] Données : `src/app/data/videos.ts` (catégories, YouTube IDs, titres)

### Phase 1 — Light theme hardening (inchangé)

### Phase 2 — Vidéos hero MP4 (inchangé)

### Phase 3 — Pages enseigne enrichies
- [ ] Ajouter catégories menu réelles par marque (Burgers/Buckets/Bowls pour Chicken, etc.)
- [ ] Bandeau promo « 1 pizza achetée = 1 offerte » sur Boum Pizz's
- [ ] CTA Deliveroo sur whitelabel par PV

### Phase 4 — `/nos-restaurants` unifié (inchangé)

### Phase 5 — Contenu franchise + contact
- [ ] Intégrer chiffres officiels franchise (§5.5) dans `FranchisePage.tsx`
- [ ] Formspree endpoint sur Contact + Franchise
- [ ] Sous-page `/franchise/candidature` (ou modal) avec formulaire complet

### Phase 6+ — SEO, perf, polish (inchangé)

---

*Fait par Microdidact — plan tenu à jour au fil des phases.*
