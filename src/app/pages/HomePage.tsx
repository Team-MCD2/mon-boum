import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, useInView, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowRight, Star, Award, MapPin, ArrowUpRight, Quote, Instagram, Store, Pizza, Sandwich, Drumstick, HandPlatter, Truck, Smartphone, ShieldCheck, ThumbsUp } from "lucide-react";
import { SplitText } from "../components/SplitText";
import { MagneticButton } from "../components/MagneticButton";
import { CountUp } from "../components/CountUp";
import { Marquee } from "../components/Marquee";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../context/CartContext";

/* ─── Image URLs ─────────────────────────────────────────── */
const IMG = {
  hero:     "https://images.unsplash.com/photo-1775198640184-14f4e7820c37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwc3RyZWV0JTIwZm9vZCUyMGtpdGNoZW4lMjB1cmJhbiUyMGdyaXR0eXxlbnwxfHx8fDE3NzY0MjY5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  burger:   "https://images.unsplash.com/photo-1678110707493-8d05425137ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFzaCUyMGJ1cmdlciUyMGJlZWYlMjBwYXR0eSUyMGNoZWVzZSUyMG1lbHRlZHxlbnwxfHx8fDE3NzY0MTk5MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  pizza:    "https://images.unsplash.com/photo-1563245738-9169ff58eccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHN0b25lJTIwb3ZlbiUyMGZpcmUlMjBhcnRpc2FuJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzY0MjY5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  tacos:    "https://images.unsplash.com/photo-1762765684587-14f711d01957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjB0YWNvcyUyMG1leGljYW4lMjBmb29kJTIwdmlicmFudHxlbnwxfHx8fDE3NzY0MjY5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  fries:    "https://images.unsplash.com/photo-1774074645537-f72f70d40d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllcyUyMGNyaXNweSUyMGdvbGRlbiUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzc2NDE5OTAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  chicken:  "https://images.unsplash.com/photo-1760533536738-f0965fd52354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwc2FuZHdpY2glMjBjcmlzcHklMjBmcmllZCUyMGZvb2R8ZW58MXx8fHwxNzc2NDE5OTAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  shake:    "https://images.unsplash.com/photo-1641848605852-9b4a3a41361e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrc2hha2UlMjB0aGljayUyMGNyZWFteSUyMGRlc3NlcnR8ZW58MXx8fHwxNzc2NDE5OTA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  interior: "https://images.unsplash.com/photo-1765087909999-754261788116?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjByZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBuZW9uJTIwbGlnaHRzJTIwZGFya3xlbnwxfHx8fDE3NzY0MTk5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  neon:     "https://images.unsplash.com/photo-1731142997627-f240391a1b7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwZmFzdCUyMGZvb2QlMjB1cmJhbiUyMG5pZ2h0JTIwY2l0eXxlbnwxfHx8fDE3NzY0MjY5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  double:   "https://images.unsplash.com/photo-1630852026727-cedb31e3f956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBkb3VibGUlMjBwYXR0eSUyMG92ZXJoZWFkJTIwZmxhdCUyMGxheSUyMGZvb2R8ZW53MXx8fHwxNzc2NDE5OTA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  flame:    "https://images.unsplash.com/photo-1723744910738-325d27fde885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBwYXR0eSUyMHNtYXNoJTIwc2VhcmluZyUyMGhvdCUyMHBhbiUyMGZsYW1lfGVufDF8fHx8MTc3NjQyNjkyNnww&ixlib=rb-4.1.0&q=80&w=1080",
  food:     "https://images.unsplash.com/photo-1740102965347-47e55ef1f16b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9vZHklMjBmb29kJTIwcGhvdG9ncmFwaHklMjByZXN0YXVyYW50JTIwdGV4dHVyZXxlbnwxfHx8fDE3NzY0MjY5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
};

/* ─── Featured items data ────────────────────────────────── */
const featured = [
  { id: "b1", name: "Le BOUM Classic", cat: "Burger", price: 12.90, img: IMG.burger, tag: "Best-seller", desc: "Double smash beef · cheddar · sauce secrète" },
  { id: "p1", name: "La BOUM Pizza", cat: "Pizza", price: 13.90, img: IMG.pizza, tag: "Signature", desc: "Mozzarella · tomates · basilic · four à bois" },
  { id: "t1", name: "BOUM Tacos", cat: "Tacos", price: 9.90, img: IMG.tacos, tag: "Nouveau", desc: "Viande halal · fromage fondu · sauce algérienne" },
  { id: "f1", name: "BOUM Frites", cat: "Sides", price: 3.90, img: IMG.fries, tag: "Must-have", desc: "Coupées à la main · sel de Guérande" },
];

const testimonials = [
  { id: 1, text: "Mon Boum c'est une institution. Je viens depuis 2008 et la qualité ne change jamais — toujours aussi incroyable.", author: "Karim B.", location: "Paris", stars: 5 },
  { id: 2, text: "La sauce secrète des burgers… je rêve d'en connaître la recette. Le meilleur street-food de Lyon, c'est dit.", author: "Sarah M.", location: "Lyon", stars: 5 },
  { id: 3, text: "Ambiance unique, nourriture au top. La pizza feu de bois est à tomber. Bref, Mon Boum c'est la life.", author: "Thomas R.", location: "Bordeaux", stars: 5 },
];

const brandFamily = [
  { name: "Boum Burger", since: "Depuis 2008", desc: "Smash burgers, tacos & assiettes", icon: Sandwich, href: "/menu#burgers" },
  { name: "Boum Pizz's", since: "Depuis 2015", desc: "Pizzas feu de bois signatures", icon: Pizza, href: "/menu#pizza" },
  { name: "Boum Chicken", since: "Depuis 2019", desc: "Fried chicken et tenders maison", icon: Drumstick, href: "/menu#chicken" },
  { name: "Boum Tacos", since: "Halal", desc: "Tacos généreux & sauces maison", icon: HandPlatter, href: "/menu#tacos" },
];

const deliverySteps = [
  { title: "Choisis ton spot", desc: "Sélectionne ton restaurant Mon Boum le plus proche.", icon: Store },
  { title: "Commande en 2 clics", desc: "Menu, extras, boisson. C'est validé en moins d'une minute.", icon: Smartphone },
  { title: "Livré chaud et vite", desc: "Tes produits arrivent prêts à boumer, partout en ville.", icon: Truck },
];

const qualityPillars = [
  { label: "Ingrédients tracés", icon: ShieldCheck },
  { label: "Recettes certifiées halal", icon: ThumbsUp },
  { label: "Préparation à la minute", icon: Star },
];

/* ─── Sub-components ─────────────────────────────────────── */
function CategoryCard({ cat, index }: { cat: { label: string; sub: string; img: string; href: string }; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <Link
      to={cat.href}
      ref={ref}
      className="relative group overflow-hidden flex items-end"
      style={{ minHeight: "50vh" }}
      aria-label={`${cat.label} — Mon Boum`}
    >
      <div className="absolute inset-0 img-zoom">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={cat.img}
            alt={cat.label}
            className="w-full h-full object-cover img-inner"
          />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,6,6,1) 0%, rgba(6,6,6,0.4) 50%, rgba(6,6,6,0.1) 100%)" }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "rgba(229,37,10,0.15)" }} />
      </div>
      <div className="relative z-10 p-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.12 + 0.3, duration: 0.7 }}
        >
          <div className="text-xs uppercase tracking-[0.25em] mb-2" style={{ color: "var(--b-muted)" }}>{cat.sub}</div>
          <div className="font-display" style={{ fontSize: "clamp(3rem, 7vw, 5rem)", lineHeight: 0.9, color: "var(--b-white)", letterSpacing: "0.02em" }}>
            {cat.label}
          </div>
          <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="text-xs uppercase tracking-wider" style={{ color: "var(--b-red)", fontWeight: 700 }}>Découvrir</span>
            <ArrowUpRight size={14} style={{ color: "var(--b-red)" }} />
          </div>
        </motion.div>
      </div>
      {index < 2 && <div className="absolute right-0 top-0 bottom-0 w-px hidden md:block" style={{ backgroundColor: "var(--b-border)" }} />}
    </Link>
  );
}

function FeaturedCard({ item, index }: { item: typeof featured[0]; index: number }) {
  const { add } = useCart();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="card-lift rounded-2xl overflow-hidden flex flex-col"
      style={{ backgroundColor: "var(--b-card)" }}
      itemScope
      itemType="https://schema.org/MenuItem"
    >
      {/* Image */}
      <div className="relative img-zoom" style={{ aspectRatio: "4/3" }}>
        <ImageWithFallback
          src={item.img}
          alt={`${item.name} — Mon Boum street-food`}
          className="w-full h-full object-cover img-inner"
          itemProp="image"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,6,6,0.9) 0%, transparent 55%)" }} />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-widest"
            style={{ backgroundColor: "rgba(6,6,6,0.7)", color: "var(--b-muted)", fontWeight: 700, backdropFilter: "blur(8px)", border: "1px solid var(--b-border)" }}
          >
            {item.cat}
          </span>
        </div>

        {/* Tag */}
        <div className="absolute top-4 right-4">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-widest"
            style={{
              backgroundColor: item.tag === "Nouveau" ? "var(--b-yellow)" : "var(--b-red)",
              color: item.tag === "Nouveau" ? "var(--b-black)" : "white",
              fontWeight: 700,
            }}
          >
            {item.tag}
          </span>
        </div>

        {/* Price */}
        <div className="absolute bottom-4 left-4">
          <span className="font-display text-white" style={{ fontSize: "2rem" }}>{item.price.toFixed(2).replace(".", ",")}€</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display mb-1" style={{ fontSize: "1.5rem", color: "var(--b-white)", letterSpacing: "0.03em" }} itemProp="name">
          {item.name}
        </h3>
        <p className="text-xs flex-1 mb-4" style={{ color: "var(--b-muted)" }} itemProp="description">{item.desc}</p>
        <button
          onClick={() => add({ id: item.id, name: item.name, price: item.price, img: item.img, tag: item.tag })}
          className="w-full py-3 rounded-full text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 btn-shine"
          style={{ backgroundColor: "var(--b-red)", color: "white", fontWeight: 700 }}
          aria-label={`Ajouter ${item.name} au panier`}
        >
          + Ajouter au panier
        </button>
      </div>
    </motion.article>
  );
}

function TestimonialItem({ t, active }: { t: typeof testimonials[0]; active: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 ${active ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <Quote size={36} className="mb-6 opacity-20" style={{ color: "var(--b-red)" }} />
      <div className="flex gap-1 mb-6">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} size={16} fill="var(--b-yellow)" style={{ color: "var(--b-yellow)" }} />
        ))}
      </div>
      <p
        className="mb-8 leading-relaxed max-w-2xl"
        style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)", color: "rgba(240,237,232,0.85)", fontStyle: "italic" }}
        itemProp="reviewBody"
      >
        "{t.text}"
      </p>
      <div>
        <div className="font-display text-white" style={{ fontSize: "1.2rem", letterSpacing: "0.1em" }}>{t.author}</div>
        <div className="text-xs flex items-center justify-center gap-1 mt-1" style={{ color: "var(--b-muted)" }}>
          <MapPin size={11} />{t.location}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Parallax image ─────────────────────────────────────── */
function ParallaxImage({ src, alt, speed = 0.15 }: { src: string; alt: string; speed?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);
  const smoothY = useSpring(y, { stiffness: 60, damping: 20 });

  return (
    <div ref={ref} className="parallax-wrap w-full h-full absolute inset-0">
      <motion.div style={{ y: smoothY }} className="w-full h-full">
        <ImageWithFallback
          src={src}
          alt={alt}
          className="w-full h-full object-cover parallax-img"
          style={{ transform: "scale(1.2)" }}
        />
      </motion.div>
    </div>
  );
}

/* ─── HomePage ───────────────────────────────────────────── */
export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Testimonial auto-rotate
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Hero parallax
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  return (
    <>
      <title>Mon Boum — Le Meilleur du Street-Food depuis 2004 | Pizza · Burger · Tacos</title>

      {/* ══════════════════════════════════════════════════
          HERO — Full-screen cinematic
      ══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex flex-col justify-end overflow-hidden top-safe"
        style={{ height: "100svh", minHeight: "600px", backgroundColor: "var(--b-black)" }}
        aria-label="Héros — Mon Boum street-food"
      >
        {/* BG image parallax */}
        <div className="absolute inset-0">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <ImageWithFallback
              src={IMG.hero}
              alt="Cuisine urbaine Mon Boum — street food"
              className="w-full h-full object-cover"
              style={{ transform: "scale(1.1)" }}
            />
          </motion.div>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(6,6,6,1) 10%, rgba(6,6,6,0.6) 50%, rgba(6,6,6,0.2) 100%)" }}
          />
        </div>

        {/* Ambient glow */}
        <div
          className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: "rgba(229,37,10,0.18)" }}
        />

        {/* Main content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-16 w-full"
        >
          {/* Tag line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px" style={{ backgroundColor: "var(--b-red)" }} />
            <span className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--b-red)", fontWeight: 700 }}>
              Depuis 2004
            </span>
          </motion.div>

          {/* Main headline — split text */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-display"
              style={{ fontSize: "clamp(4.5rem, 16vw, 14rem)", lineHeight: 0.88, letterSpacing: "0.02em", color: "var(--b-white)" }}
            >
              {["LE", "MEILLEUR"].map((word, wi) => (
                <span key={wi} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4 + wi * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    {wi === 1 ? (
                      <>DU <span style={{ color: "var(--b-red)", textShadow: "0 0 80px rgba(229,37,10,0.4)" }}>STREET</span>-FOOD</>
                    ) : word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
          </div>

          {/* Row: desc + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-6"
          >
            <p className="max-w-sm text-sm leading-relaxed" style={{ color: "rgba(240,237,232,0.55)" }}>
              Pizzas au feu de bois · Smash burgers · Tacos halal.<br />
              L'explosion de saveurs dans chaque bouchée.
            </p>
            <div className="flex gap-3">
              <MagneticButton>
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-sm uppercase tracking-widest btn-shine transition-all"
                  style={{ backgroundColor: "var(--b-red)", color: "white", fontWeight: 700 }}
                  aria-label="Voir le menu Mon Boum"
                >
                  Commander
                  <ArrowRight size={15} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  to="/restaurants"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm uppercase tracking-widest border transition-all"
                  style={{ borderColor: "rgba(240,237,232,0.2)", color: "var(--b-white)", fontWeight: 600 }}
                  aria-label="Trouver un restaurant"
                >
                  <MapPin size={15} style={{ color: "var(--b-yellow)" }} />
                  Nous trouver
                </Link>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute right-10 bottom-0 flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--b-muted)", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                Scroll
              </span>
              <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, var(--b-red), transparent)" }} />
            </motion.div>
          </motion.div>

          {/* Bottom stats strip */}
          <div
            className="hidden lg:flex items-center gap-8 mt-10 pt-6 border-t"
            style={{ borderColor: "var(--b-border)" }}
          >
            {[
              { value: 20, suffix: "+", label: "Ans d'expérience" },
              { value: 5, suffix: "", label: "Restaurants" },
              { value: 4.8, suffix: "★", label: "Note Google", decimals: 1 },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="font-display text-white" style={{ fontSize: "2.2rem" }}>
                  <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                </div>
                <span className="text-xs uppercase tracking-widest" style={{ color: "var(--b-muted)", fontWeight: 600 }}>{s.label}</span>
              </div>
            ))}
            <div className="ml-auto">
              <div className="flex gap-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={14} fill="var(--b-yellow)" style={{ color: "var(--b-yellow)" }} />
                ))}
              </div>
              <span className="text-xs" style={{ color: "var(--b-muted)" }}>+2000 avis</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          MARQUEE TICKER
      ══════════════════════════════════════════════════ */}
      <div className="overflow-hidden border-y py-4" style={{ borderColor: "var(--b-border)", backgroundColor: "var(--b-dark)" }}>
        <Marquee
          items={["Pizza feu de bois", "Smash Burger", "Tacos halal", "Sauce secrète", "Livraison express", "Ouvert 7j/7", "Depuis 2004"]}
          size="sm"
          accentColor="var(--b-red)"
        />
      </div>

      {/* ══════════════════════════════════════════════════
          BOUM TEAM — Brand family grid
      ══════════════════════════════════════════════════ */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--b-black)" }}
        aria-label="La Boum Team — Nos enseignes"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-12">
            <p className="font-script mb-2" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--b-red)" }}>
              Faites votre choix
            </p>
            <SplitText
              text="LA BOUM TEAM"
              as="h2"
              className="font-display"
              style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)", lineHeight: 0.9, color: "var(--b-white)", justifyContent: "center" }}
              mode="words"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {brandFamily.map((brand, index) => {
              const Icon = brand.icon;
              return (
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.08, duration: 0.55 }}
                >
                  <Link
                    to={brand.href}
                    className="group h-full rounded-2xl p-6 border flex flex-col transition-all duration-300 hover:-translate-y-1"
                    style={{ backgroundColor: "var(--b-card)", borderColor: "var(--b-border)" }}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: "rgba(229,37,10,0.16)", color: "var(--b-red)" }}>
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display mb-1" style={{ color: "var(--b-white)", fontSize: "1.7rem", letterSpacing: "0.03em" }}>
                      {brand.name}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "var(--b-yellow)", fontWeight: 700 }}>
                      {brand.since}
                    </p>
                    <p className="text-sm" style={{ color: "var(--b-muted)" }}>{brand.desc}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          DELIVERY FLOW — How it works
      ══════════════════════════════════════════════════ */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--b-dark)" }}
        aria-label="Comment ça boum — Livraison et commande"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-12">
            <p className="font-script mb-2" style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", color: "var(--b-red)" }}>
              Qualité, saveur et traçabilité
            </p>
            <SplitText
              text="COMMENT ÇA BOUM"
              as="h2"
              className="font-display"
              style={{ fontSize: "clamp(2.4rem, 7vw, 5rem)", color: "var(--b-white)", justifyContent: "center" }}
              mode="words"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {deliverySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: index * 0.08, duration: 0.55 }}
                  className="rounded-2xl p-6 border"
                  style={{ backgroundColor: "var(--b-card)", borderColor: "var(--b-border)" }}
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(245,197,24,0.15)", color: "var(--b-yellow)" }}>
                    <Icon size={20} />
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "var(--b-red)", fontWeight: 700 }}>
                    Étape {index + 1}
                  </div>
                  <h3 className="font-display mb-2" style={{ fontSize: "1.8rem", color: "var(--b-white)", lineHeight: 0.95 }}>{step.title}</h3>
                  <p className="text-sm" style={{ color: "var(--b-muted)" }}>{step.desc}</p>
                </motion.article>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {qualityPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.label}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs uppercase tracking-[0.15em]"
                  style={{ backgroundColor: "var(--b-card2)", color: "var(--b-white)", border: "1px solid var(--b-border)", fontWeight: 700 }}
                >
                  <Icon size={13} style={{ color: "var(--b-yellow)" }} />
                  {pillar.label}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CATEGORIES — Full screen split
      ══════════════════════════════════════════════════ */}
      <section
        className="py-0"
        style={{ backgroundColor: "var(--b-black)" }}
        aria-label="Nos catégories street-food"
      >
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ minHeight: "60vh" }}>
          {[
            { label: "PIZZA", sub: "Four à bois", img: IMG.pizza, href: "/menu#pizza" },
            { label: "BURGER", sub: "Smash beef", img: IMG.burger, href: "/menu#burgers" },
            { label: "TACOS", sub: "Halal", img: IMG.tacos, href: "/menu#tacos" },
          ].map((cat, i) => (
            <CategoryCard key={cat.label} cat={cat} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FEATURED MENU — 4 cards
      ══════════════════════════════════════════════════ */}
      <section
        className="py-24"
        style={{ backgroundColor: "var(--b-dark)" }}
        aria-label="Nos incontournables — Mon Boum"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <div className="hr-label mb-4 max-w-xs">Notre sélection</div>
              <SplitText
                text="LES INCONTOURNABLES"
                as="h2"
                className="font-display"
                style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 0.92, color: "var(--b-white)", letterSpacing: "0.02em" }}
                mode="words"
              />
            </div>
            <MagneticButton>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-widest group"
                style={{ color: "var(--b-yellow)", fontWeight: 700 }}
                aria-label="Voir tout le menu Mon Boum"
              >
                Tout le menu
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((item, i) => (
              <FeaturedCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FULL-WIDTH CINEMATIC BANNER
      ══════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ height: "70vh", minHeight: "500px" }}
        aria-label="Ambiance Mon Boum"
      >
        <ParallaxImage src={IMG.flame} alt="Smash burger en train d'être préparé à feu vif" />
        <div
          className="absolute inset-0 flex items-center justify-center text-center px-4"
          style={{ background: "rgba(6,6,6,0.6)" }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hr-label justify-center mb-6 text-white/40">L'art du street-food</div>
              <h2
                className="font-display text-white mb-8"
                style={{ fontSize: "clamp(4rem, 13vw, 11rem)", lineHeight: 0.85, letterSpacing: "0.02em" }}
              >
                SMASHÉ<br />
                <span className="text-stroke" style={{ WebkitTextStroke: "2px rgba(240,237,232,0.5)" }}>À LA</span><br />
                <span style={{ color: "var(--b-red)" }}>PERFECTION</span>
              </h2>
              <MagneticButton>
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-3 px-8 py-5 rounded-full uppercase tracking-widest text-sm btn-shine"
                  style={{ backgroundColor: "white", color: "var(--b-black)", fontWeight: 700 }}
                  aria-label="Voir le menu complet"
                >
                  Voir le menu complet
                  <ArrowRight size={16} />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ABOUT �� Editorial split layout
      ══════════════════════════════════════════════════ */}
      <section
        className="py-24"
        id="about"
        style={{ backgroundColor: "var(--b-black)" }}
        aria-label="L'histoire de Mon Boum"
        itemScope
        itemType="https://schema.org/AboutPage"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left — images */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-12 grid-rows-2 gap-4" style={{ height: "580px" }}>
                {/* Large top-left */}
                <div className="col-span-8 row-span-2 rounded-2xl overflow-hidden img-zoom relative">
                  <ImageWithFallback src={IMG.interior} alt="Restaurant Mon Boum ambiance" className="w-full h-full object-cover img-inner" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,6,6,0.5), transparent 60%)" }} />
                </div>
                {/* Top right */}
                <div className="col-span-4 rounded-2xl overflow-hidden img-zoom">
                  <ImageWithFallback src={IMG.pizza} alt="Pizza four à bois Mon Boum" className="w-full h-full object-cover img-inner" />
                </div>
                {/* Bottom right */}
                <div
                  className="col-span-4 rounded-2xl flex flex-col items-center justify-center text-center p-4"
                  style={{ backgroundColor: "var(--b-red)" }}
                >
                  <div className="font-display text-white leading-none" style={{ fontSize: "3.5rem" }}>20</div>
                  <div className="text-white/80 text-xs uppercase tracking-wider mt-1">ans de passion</div>
                </div>
              </div>

              {/* Floating award */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                className="absolute -bottom-6 -right-4 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl"
                style={{ backgroundColor: "var(--b-yellow)" }}
              >
                <Award size={22} style={{ color: "var(--b-black)" }} />
                <div>
                  <div className="font-display" style={{ color: "var(--b-black)", fontSize: "0.9rem", letterSpacing: "0.05em" }}>MEILLEUR</div>
                  <div className="font-display" style={{ color: "var(--b-black)", fontSize: "0.9rem", letterSpacing: "0.05em" }}>STREET-FOOD</div>
                  <div style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.65rem" }}>Paris · Lyon · 2024</div>
                </div>
              </motion.div>
            </div>

            {/* Right — text */}
            <div className="lg:col-span-6 lg:pl-8">
              <div className="hr-label mb-5">Notre histoire</div>
              <SplitText
                text="NÉS DE LA RUE, FAITS POUR VOUS"
                as="h2"
                className="font-display mb-6"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 0.92, color: "var(--b-white)", letterSpacing: "0.02em" }}
                mode="words"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="mb-4 leading-relaxed"
                style={{ color: "rgba(240,237,232,0.55)", fontSize: "0.95rem" }}
                itemProp="description"
              >
                En 2004, Mon Boum ouvre ses portes à Paris avec une conviction simple : le street-food peut être extraordinaire. Pas de compromis, pas de congélateur. Des ingrédients frais, des recettes authentiques, et une passion qui ne faiblit jamais.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="mb-10 leading-relaxed"
                style={{ color: "rgba(240,237,232,0.55)", fontSize: "0.95rem" }}
              >
                Aujourd'hui, 5 restaurants à travers la France continuent de défendre ce manifeste : pizza cuite au feu de bois, burgers smashés à la commande, tacos montés avec générosité.
              </motion.p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-10 pt-8 border-t" style={{ borderColor: "var(--b-border)" }}>
                {[
                  { end: 5, suffix: "", label: "Restaurants" },
                  { end: 2, suffix: "M+", label: "Clients servis" },
                  { end: 98, suffix: "%", label: "Satisfaits" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-display mb-1" style={{ fontSize: "2.5rem", color: "var(--b-white)", lineHeight: 1 }}>
                      <CountUp end={s.end} suffix={s.suffix} />
                    </div>
                    <div className="text-xs uppercase tracking-widest" style={{ color: "var(--b-muted)", fontWeight: 600 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <MagneticButton>
                <Link
                  to="/restaurants"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-widest group"
                  style={{ color: "var(--b-yellow)", fontWeight: 700 }}
                  aria-label="Nos restaurants Mon Boum"
                >
                  Nos restaurants
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MARQUEE 2 — Red band
      ══════════════════════════════════════════════════ */}
      <div className="overflow-hidden py-4" style={{ backgroundColor: "var(--b-red)" }}>
        <Marquee
          items={["Fait maison", "Ingrédients frais", "Livraison 30 min", "Click & Collect", "Ouvert 7j/7", "Depuis 2004"]}
          size="sm"
          accentColor="rgba(255,255,255,0.4)"
        />
      </div>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS — Rotative cinematic
      ══════════════════════════════════════════════════ */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor: "var(--b-dark)", minHeight: "500px" }}
        aria-label="Avis clients Mon Boum"
        itemScope
        itemType="https://schema.org/ReviewAction"
      >
        {/* BG number */}
        <div
          className="absolute inset-0 flex items-center justify-center font-display pointer-events-none select-none"
          style={{ fontSize: "30vw", color: "rgba(255,255,255,0.02)", letterSpacing: "-0.05em" }}
          aria-hidden="true"
        >
          {String(activeTestimonial + 1).padStart(2, "0")}
        </div>

        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Section label */}
          <div className="hr-label mb-10">Ce qu'ils disent</div>

          {/* Testimonial rotator */}
          <div className="relative" style={{ minHeight: "280px" }}>
            {testimonials.map((t, i) => (
              <TestimonialItem key={t.id} t={t} active={i === activeTestimonial} />
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === activeTestimonial ? "2rem" : "0.5rem",
                  height: "0.5rem",
                  backgroundColor: i === activeTestimonial ? "var(--b-red)" : "var(--b-border)",
                }}
                aria-label={`Avis ${i + 1}`}
                aria-pressed={i === activeTestimonial}
              />
            ))}
          </div>

          {/* Google link */}
          <div className="text-center mt-8">
            <a
              href="https://g.co/kgs/monboum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest group"
              style={{ color: "var(--b-muted)", fontWeight: 600 }}
              aria-label="Voir tous les avis Google Mon Boum"
            >
              Tous les avis sur Google
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          INSTAGRAM GRID
      ══════════════════════════════════════════════════ */}
      <section
        className="py-16"
        style={{ backgroundColor: "var(--b-black)" }}
        aria-label="Mon Boum sur Instagram @monboum"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-end justify-between mb-8">
            <SplitText
              text="@MONBOUM"
              as="h2"
              className="font-display"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--b-white)", letterSpacing: "0.02em" }}
              mode="chars"
            />
            <a
              href="https://instagram.com/monboum"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest group"
              style={{ color: "var(--b-muted)", fontWeight: 600 }}
              aria-label="Suivre Mon Boum sur Instagram"
            >
              <Instagram size={16} />
              Suivre
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-1 px-1">
          {[IMG.burger, IMG.pizza, IMG.tacos, IMG.fries, IMG.chicken, IMG.shake, IMG.interior, IMG.double, IMG.neon, IMG.food].map((img, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/monboum"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className={`relative img-zoom overflow-hidden group ${i === 0 || i === 6 ? "md:row-span-2" : ""}`}
              style={{ aspectRatio: i === 0 || i === 6 ? "1/2" : "1/1" }}
              aria-label={`Photo Instagram Mon Boum ${i + 1}`}
            >
              <ImageWithFallback src={img} alt={`Mon Boum Instagram photo ${i + 1}`} className="w-full h-full object-cover img-inner" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ background: "rgba(229,37,10,0.5)" }}>
                <Instagram size={24} color="white" />
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          NEWSLETTER CTA — Full-width red
      ══════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-24"
        style={{ backgroundColor: "var(--b-red)" }}
        aria-label="S'inscrire à la newsletter Mon Boum"
      >
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "repeating-linear-gradient(60deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "60px 104px" }}
        />
        <div className="relative max-w-3xl mx-auto text-center px-5">
          <SplitText
            text="REJOINS LA FAMILLE"
            as="h2"
            className="font-display text-white"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 0.9, letterSpacing: "0.02em", justifyContent: "center" }}
            mode="words"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/70 my-6 text-sm"
          >
            Offres exclusives, nouveautés, events — sois le premier à savoir.
          </motion.p>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            aria-label="Newsletter Mon Boum"
          >
            <input
              type="email"
              placeholder="ton@email.fr"
              required
              aria-label="Adresse e-mail"
              className="flex-1 px-5 py-4 rounded-full text-sm outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
            />
            <MagneticButton>
              <button
                type="submit"
                className="px-7 py-4 rounded-full text-sm uppercase tracking-wider transition-all btn-shine"
                style={{ backgroundColor: "var(--b-black)", color: "white", fontWeight: 700 }}
                aria-label="S'inscrire"
              >
                S'inscrire
              </button>
            </MagneticButton>
          </motion.form>
          <p className="mt-4 text-xs text-white/40">Pas de spam. Désinscription en 1 clic.</p>
        </div>
      </section>
    </>
  );
}