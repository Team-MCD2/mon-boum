import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import { Flame, Star, Info, ShoppingBag, ArrowRight, Plus } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Marquee } from "../components/Marquee";
import { SplitText } from "../components/SplitText";
import { MagneticButton } from "../components/MagneticButton";
import { useCart } from "../context/CartContext";
import { siteConfig } from "../config/siteConfig";
import { SeoHead } from "../components/SeoHead";

const IMG = {
  burger: "https://images.unsplash.com/photo-1678110707493-8d05425137ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFzaCUyMGJ1cmdlciUyMGJlZWYlMjBwYXR0eSUyMGNoZWVzZSUyMG1lbHRlZHxlbnwxfHx8fDE3NzY0MTk5MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  double: "https://images.unsplash.com/photo-1630852026727-cedb31e3f956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBkb3VibGUlMjBwYXR0eSUyMG92ZXJoZWFkJTIwZmxhdCUyMGxheSUyMGZvb2R8ZW53MXx8fHwxNzc2NDE5OTA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  pizza: "https://images.unsplash.com/photo-1563245738-9169ff58eccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHN0b25lJTIwb3ZlbiUyMGZpcmUlMjBhcnRpc2FuJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzY0MjY5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  tacos: "https://images.unsplash.com/photo-1762765684587-14f711d01957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjB0YWNvcyUyMG1leGljYW4lMjBmb29kJTIwdmlicmFudHxlbnwxfHx8fDE3NzY0MjY5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  fries: "https://images.unsplash.com/photo-1774074645537-f72f70d40d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllcyUyMGNyaXNweSUyMGdvbGRlbiUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzc2NDE5OTAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  chicken: "https://images.unsplash.com/photo-1760533536738-f0965fd52354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwc2FuZHdpY2glMjBjcmlzcHklMjBmcmllZCUyMGZvb2R8ZW58MXx8fHwxNzc2NDE5OTAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  shake: "https://images.unsplash.com/photo-1641848605852-9b4a3a41361e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrc2hha2UlMjB0aGljayUyMGNyZWFteSUyMGRlc3NlcnR8ZW58MXx8fHwxNzc2NDE5OTA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  flame: "https://images.unsplash.com/photo-1723744910738-325d27fde885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBwYXR0eSUyMHNtYXNoJTIwc2VhcmluZyUyMGhvdCUyMHBhbiUyMGZsYW1lfGVufDF8fHx8MTc3NjQyNjkyNnww&ixlib=rb-4.1.0&q=80&w=1080",
};

const categories = [
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "burgers", label: "Burger", emoji: "🍔" },
  { id: "tacos", label: "Tacos", emoji: "🌮" },
  { id: "chicken", label: "Chicken", emoji: "🍗" },
  { id: "sides", label: "Sides", emoji: "🍟" },
  { id: "milkshakes", label: "Shakes", emoji: "🥤" },
  { id: "menus", label: "Menus", emoji: "🎯" },
];

const menuData: Record<string, any[]> = {
  pizza: [
    { id: "pz1", name: "BOUM Margherita", price: 11.90, cal: 680, spicy: 0, isNew: false, isBest: false, img: IMG.pizza, desc: "Tomates San Marzano, mozzarella di bufala, basilic frais, huile d'olive extra-vierge", tags: ["Végétarien"], allergens: "Gluten, Lait" },
    { id: "pz2", name: "BOUM Pepperoni", price: 13.90, cal: 820, spicy: 1, isNew: false, isBest: true, img: IMG.pizza, desc: "Pepperoni américain, mozzarella, tomates, origan, piment d'Espelette", tags: ["Best-seller"], allergens: "Gluten, Lait" },
    { id: "pz3", name: "BOUM 4 Fromages", price: 14.90, cal: 890, spicy: 0, isNew: false, isBest: false, img: IMG.pizza, desc: "Mozzarella, gorgonzola, chèvre, comté 18 mois, miel de truffe", tags: ["Premium"], allergens: "Gluten, Lait" },
    { id: "pz4", name: "BOUM Truffe Blanche", price: 16.90, cal: 750, spicy: 0, isNew: true, isBest: false, img: IMG.pizza, desc: "Crème de truffe blanche, champignons, mozzarella, roquette, copeaux de parmesan", tags: ["Nouveau", "Premium"], allergens: "Gluten, Lait, Œuf" },
  ],
  burgers: [
    { id: "b1", name: "Le BOUM Classic", price: 12.90, cal: 780, spicy: 0, isNew: false, isBest: true, img: IMG.burger, desc: "Double smash beef 160g, cheddar affiné, sauce secrète BOUM, oignons caramélisés, cornichons maison", tags: ["Best-seller"], allergens: "Gluten, Lait, Œuf" },
    { id: "b2", name: "Le BOUM Double", price: 15.90, cal: 1040, spicy: 0, isNew: false, isBest: false, img: IMG.double, desc: "Triple smash beef 240g, double cheddar, bacon fumé, sauce BOUM x2, pickles maison", tags: ["XXL"], allergens: "Gluten, Lait, Œuf" },
    { id: "b3", name: "BOUM Truffe", price: 16.90, cal: 850, spicy: 0, isNew: true, isBest: false, img: IMG.burger, desc: "Double smash beef, comté 18 mois, mayo truffe noire, roquette, tomate confite", tags: ["Premium", "Nouveau"], allergens: "Gluten, Lait, Œuf, Céleri" },
    { id: "b4", name: "BOUM BBQ Bacon", price: 13.90, cal: 910, spicy: 1, isNew: false, isBest: false, img: IMG.double, desc: "Double smash beef, cheddar, double bacon croustillant, sauce BBQ fumée maison", tags: ["Fumé"], allergens: "Gluten, Lait, Œuf" },
    { id: "b5", name: "BOUM Veggie", price: 11.90, cal: 640, spicy: 0, isNew: true, isBest: false, img: IMG.burger, desc: "Galette végétale (champignon, quinoa, pois chiches), vegan cheese, avocat, sauce green", tags: ["Végétarien"], allergens: "Gluten, Soja" },
    { id: "b6", name: "BOUM Spicy", price: 13.90, cal: 820, spicy: 3, isNew: false, isBest: false, img: IMG.burger, desc: "Double smash beef, cheddar jalapeño, sauce sriracha-habanero, pickles piment", tags: ["🔥 Très épicé"], allergens: "Gluten, Lait, Œuf" },
  ],
  tacos: [
    { id: "t1", name: "BOUM Tacos Classic", price: 9.90, cal: 620, spicy: 0, isNew: false, isBest: true, img: IMG.tacos, desc: "Viande halal, fromage fondu, frites, sauce algérienne, oignons — le classique", tags: ["Best-seller", "Halal"], allergens: "Gluten, Lait" },
    { id: "t2", name: "BOUM Tacos Poulet", price: 9.90, cal: 580, spicy: 0, isNew: false, isBest: false, img: IMG.tacos, desc: "Poulet mariné grillé, mozzarella fondue, frites, sauce blanche", tags: ["Halal"], allergens: "Gluten, Lait" },
    { id: "t3", name: "BOUM Tacos XL", price: 12.90, cal: 880, spicy: 1, isNew: false, isBest: false, img: IMG.tacos, desc: "Double viande halal, double fromage, frites, sauce au choix — le généreux", tags: ["XXL", "Halal"], allergens: "Gluten, Lait" },
    { id: "t4", name: "BOUM Tacos Végé", price: 8.90, cal: 510, spicy: 0, isNew: true, isBest: false, img: IMG.tacos, desc: "Galette de légumes, fromage fondant, frites, sauce yogourt-menthe", tags: ["Végétarien", "Nouveau"], allergens: "Gluten, Lait" },
  ],
  chicken: [
    { id: "c1", name: "Crispy Chicken BOUM", price: 11.90, cal: 690, spicy: 0, isNew: true, isBest: true, img: IMG.chicken, desc: "Filet de poulet fermier croustillant, coleslaw maison, sauce sriracha-miel, brioche", tags: ["Best-seller", "Nouveau"], allergens: "Gluten, Lait, Œuf" },
    { id: "c2", name: "Chicken Classic", price: 10.90, cal: 610, spicy: 0, isNew: false, isBest: false, img: IMG.chicken, desc: "Filet de poulet croustillant, cheddar, laitue, tomate, mayo maison", tags: [], allergens: "Gluten, Lait, Œuf" },
    { id: "c3", name: "BOUM Tenders x5", price: 8.90, cal: 540, spicy: 1, isNew: false, isBest: false, img: IMG.chicken, desc: "Tenders de poulet croustillants, sauce BOUM au choix (BBQ, Ranch, Sriracha)", tags: ["À partager"], allergens: "Gluten, Lait, Œuf" },
  ],
  sides: [
    { id: "s1", name: "Frites BOUM", price: 3.90, cal: 380, spicy: 0, isNew: false, isBest: true, img: IMG.fries, desc: "Pommes de terre fraîches coupées à la main, huile de tournesol, sel fleur de Guérande", tags: ["Must-have"], allergens: "—" },
    { id: "s2", name: "Frites Truffées", price: 5.50, cal: 420, spicy: 0, isNew: false, isBest: false, img: IMG.fries, desc: "Nos frites maison, huile de truffe noire, parmesan 24 mois, fleur de sel", tags: ["Premium"], allergens: "Lait" },
    { id: "s3", name: "Onion Rings BOUM", price: 4.50, cal: 460, spicy: 0, isNew: true, isBest: false, img: IMG.fries, desc: "Oignons doux en rondelles, panure croustillante, sauce ranch maison", tags: ["Nouveau"], allergens: "Gluten, Lait, Œuf" },
  ],
  milkshakes: [
    { id: "m1", name: "BOUM Shake Vanille", price: 6.00, cal: 420, spicy: 0, isNew: false, isBest: false, img: IMG.shake, desc: "Glace vanille de Madagascar, lait entier, chantilly maison, meringue", tags: [], allergens: "Lait, Œuf" },
    { id: "m2", name: "BOUM Shake Caramel", price: 6.50, cal: 450, spicy: 0, isNew: false, isBest: true, img: IMG.shake, desc: "Glace caramel beurre salé, coulis de caramel, chantilly, praliné croustillant", tags: ["Best-seller"], allergens: "Lait, Œuf, Arachides" },
    { id: "m3", name: "BOUM Shake Oreo", price: 6.50, cal: 490, spicy: 0, isNew: true, isBest: false, img: IMG.shake, desc: "Glace vanille, biscuits Oreo mixés, chantilly, décoration Oreo entier", tags: ["Nouveau"], allergens: "Lait, Œuf, Gluten, Soja" },
  ],
  menus: [
    { id: "mn1", name: "Menu BOUM Classic", price: 17.90, cal: 0, spicy: 0, isNew: false, isBest: true, img: IMG.burger, desc: "Le BOUM Classic + Frites BOUM + Boisson (33cl)", tags: ["Meilleur rapport Q/P"], allergens: "Voir produits" },
    { id: "mn2", name: "Menu BOUM Double", price: 20.90, cal: 0, spicy: 0, isNew: false, isBest: false, img: IMG.double, desc: "Le BOUM Double + Frites BOUM + Milkshake au choix", tags: ["Généreux"], allergens: "Voir produits" },
    { id: "mn3", name: "Menu Pizza + Boisson", price: 16.90, cal: 0, spicy: 0, isNew: true, isBest: false, img: IMG.pizza, desc: "Pizza BOUM au choix + Boisson (33cl)", tags: ["Nouveau"], allergens: "Voir produits" },
    { id: "mn4", name: "Menu Chicken", price: 16.90, cal: 0, spicy: 0, isNew: false, isBest: false, img: IMG.chicken, desc: "Crispy Chicken + Frites BOUM + Boisson (33cl)", tags: [], allergens: "Voir produits" },
  ],
};

function MenuItem({ item, index }: { item: any; index: number }) {
  const { add } = useCart();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add({ id: item.id, name: item.name, price: item.price, img: item.img, tag: item.tags[0] });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="card-lift rounded-2xl overflow-hidden group"
      style={{ backgroundColor: "var(--b-card)" }}
      itemScope
      itemType="https://schema.org/MenuItem"
    >
      {/* Image */}
      <div className="relative img-zoom" style={{ aspectRatio: "16/10" }}>
        <ImageWithFallback src={item.img} alt={`${item.name} — Mon Boum`} className="w-full h-full object-cover img-inner" itemProp="image" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,6,6,0.85) 0%, transparent 55%)" }} />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {item.isBest && (
            <span className="px-2.5 py-1 rounded-full text-xs uppercase tracking-wider" style={{ backgroundColor: "var(--b-red)", color: "white", fontWeight: 700 }}>
              ⭐ Best-seller
            </span>
          )}
          {item.isNew && (
            <span className="px-2.5 py-1 rounded-full text-xs uppercase tracking-wider" style={{ backgroundColor: "var(--b-yellow)", color: "var(--b-black)", fontWeight: 700 }}>
              Nouveau
            </span>
          )}
        </div>

        {/* Spicy */}
        {item.spicy > 0 && (
          <div className="absolute top-3 right-3 flex gap-0.5">
            {Array.from({ length: item.spicy }).map((_, s) => (
              <Flame key={s} size={14} fill="var(--b-yellow)" style={{ color: "var(--b-yellow)" }} />
            ))}
          </div>
        )}

        {/* Price on image */}
        <div className="absolute bottom-3 left-4">
          <span className="font-display text-white" style={{ fontSize: "1.6rem" }} itemProp="offers">
            {item.price.toFixed(2).replace(".", ",")}€
          </span>
        </div>
        {item.cal > 0 && (
          <span className="absolute bottom-3 right-3 text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(6,6,6,0.7)", color: "rgba(255,255,255,0.5)" }}>
            {item.cal} kcal
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h2
          className="font-display mb-1.5 group-hover:text-red-500 transition-colors duration-300"
          style={{ fontSize: "1.35rem", color: "var(--b-white)", letterSpacing: "0.04em" }}
          itemProp="name"
        >
          {item.name}
        </h2>
        <p className="text-xs mb-3 leading-relaxed" style={{ color: "var(--b-muted)" }} itemProp="description">{item.desc}</p>

        {item.allergens && item.allergens !== "—" && (
          <div className="flex items-start gap-1.5 mb-4">
            <Info size={11} style={{ color: "var(--b-muted)", marginTop: 2, flexShrink: 0 }} />
            <p className="text-xs" style={{ color: "rgba(107,107,107,0.7)" }}>Allergènes : {item.allergens}</p>
          </div>
        )}

        <button
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 btn-shine"
          style={{
            backgroundColor: added ? "rgba(34,197,94,0.8)" : "var(--b-red)",
            color: "white",
            fontWeight: 700,
          }}
          aria-label={`Ajouter ${item.name} au panier`}
        >
          {added ? "✓ Ajouté !" : <><Plus size={14} /> Ajouter au panier</>}
        </button>
      </div>
    </motion.article>
  );
}

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("burgers");
  const items = menuData[activeCategory] || [];

  // Handle hash navigation
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && menuData[hash]) setActiveCategory(hash);
  }, []);

  return (
    <>
      <SeoHead
        title="Menu — Mon Boum | Pizza, burger, tacos, halal Toulouse"
        description="Menu illustratif Mon Boum — pizzas, burgers smash, tacos halal. Tarifs indicatifs ; carte officielle sur rest-o-buro.fr (CGV monboum.fr)."
        keywords={`menu, carte, Mon Boum, Toulouse, halal, ${siteConfig.seo.defaultKeywords}`}
        ogImagePath="/favicon.png"
      />

      {/* Hero */}
      <section className="relative top-safe pb-16 overflow-hidden" style={{ backgroundColor: "var(--b-black)" }} aria-label="Menu Mon Boum">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, var(--b-red), transparent 60%), radial-gradient(circle at 70% 50%, var(--b-yellow), transparent 60%)" }} />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: "var(--b-red)" }} />
            <span className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--b-red)", fontWeight: 700 }}>Ce qu'on fait</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display"
              style={{ fontSize: "clamp(5rem, 18vw, 14rem)", lineHeight: 0.85, color: "var(--b-white)", letterSpacing: "0.02em" }}
            >
              NOTRE<br /><span style={{ color: "var(--b-red)" }}>MENU</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm max-w-lg"
            style={{ color: "rgba(240,237,232,0.45)" }}
          >
            Des ingrédients sélectionnés, des recettes pensées avec passion. Chaque plat est préparé à la minute dans nos cuisines ouvertes.
          </motion.p>
        </div>
      </section>

      {/* Sticky tabs */}
      <div
        className="sticky top-14 z-30 border-b"
        style={{ backgroundColor: "rgba(6,6,6,0.95)", borderColor: "var(--b-border)", backdropFilter: "blur(24px)" }}
        role="tablist"
        aria-label="Catégories du menu"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-2 px-5 py-5 whitespace-nowrap text-xs uppercase tracking-widest transition-all duration-200 border-b-2 flex-shrink-0 relative"
                style={{
                  borderBottomColor: activeCategory === cat.id ? "var(--b-red)" : "transparent",
                  color: activeCategory === cat.id ? "var(--b-white)" : "var(--b-muted)",
                  fontWeight: 700,
                }}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items grid */}
      <section
        className="py-16"
        style={{ backgroundColor: "var(--b-black)", minHeight: "60vh" }}
        id={`tabpanel-${activeCategory}`}
        role="tabpanel"
        aria-label={`Menu ${categories.find((c) => c.id === activeCategory)?.label}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {items.map((item, i) => (
              <MenuItem key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Allergens */}
      <div className="py-8 border-t" style={{ backgroundColor: "var(--b-dark)", borderColor: "var(--b-border)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <p className="text-xs" style={{ color: "var(--b-muted)" }}>
            <Info size={12} className="inline mr-1" />
            Nos produits peuvent contenir des traces d'allergènes. Les calories sont indicatives (référence 2000 kcal/jour adulte).{" "}
            <Link to="/contact" style={{ color: "var(--b-yellow)", textDecoration: "underline" }} aria-label="Infos allergènes">En savoir plus</Link>
          </p>
        </div>
      </div>

      {/* CTA strip */}
      <section className="py-16 overflow-hidden" style={{ backgroundColor: "var(--b-dark)" }}>
        <Marquee items={["Commander en ligne", "Livraison express", "Click & Collect", "Ouvert 7j/7", "À emporter", "Halal certifié"]} size="md" accentColor="var(--b-yellow)" />
        <div className="max-w-lg mx-auto text-center mt-10 px-5">
          <p className="mb-6 text-sm" style={{ color: "var(--b-muted)" }}>
            Commandez directement en ligne ou retrouvez le restaurant le plus proche.
          </p>
          <MagneticButton>
            <Link
              to="/nos-restaurants"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full uppercase tracking-widest text-sm btn-shine"
              style={{ backgroundColor: "var(--b-red)", color: "white", fontWeight: 700 }}
              aria-label="Trouver un restaurant Mon Boum"
            >
              Trouver un restaurant
              <ArrowRight size={15} />
            </Link>
          </MagneticButton>
        </div>
      </section>
    </>
  );
}
