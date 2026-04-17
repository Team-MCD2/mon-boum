import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, Clock, Phone, ChevronRight, Star, Utensils, Wifi, ParkingCircle, CreditCard } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { SplitText } from "../components/SplitText";
import { MagneticButton } from "../components/MagneticButton";

const INTERIOR = "https://images.unsplash.com/photo-1765087909999-754261788116?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjByZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBuZW9uJTIwbGlnaHRzJTIwZGFya3xlbnwxfHx8fDE3NzY0MTk5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const SMASH = "https://images.unsplash.com/photo-1678110707493-8d05425137ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFzaCUyMGJ1cmdlciUyMGJlZWYlMjBwYXR0eSUyMGNoZWVzZSUyMG1lbHRlZHxlbnwxfHx8fDE3NzY0MTk5MDF8MA&ixlib=rb-4.1.0&q=80&w=1080";

const restaurants = [
  { id: 1, name: "Mon Boum Burger — Pradettes", address: "220 Route de Saint-Simon, 31100 Toulouse", city: "Toulouse", phone: "+33 5 61 40 77 73", hours: { weekdays: "11h30 – 23h00" }, rating: 4.7, reviews: 432, img: INTERIOR, amenities: ["wifi", "parking", "card", "delivery"], isOpen: true, badge: "Restaurant pilote", googleMaps: "https://www.google.com/maps/search/?api=1&query=220+Route+de+Saint-Simon+31100+Toulouse" },
  { id: 2, name: "Mon Boum Burger — Aucamville", address: "327 Avenue des États-Unis, 31200 Toulouse", city: "Toulouse", phone: "+33 5 61 41 74 17", hours: { weekdays: "11h30 – 23h00" }, rating: 4.6, reviews: 298, img: INTERIOR, amenities: ["wifi", "card", "delivery"], isOpen: true, badge: null, googleMaps: "https://www.google.com/maps/search/?api=1&query=327+Avenue+des+Etats-Unis+31200+Toulouse" },
  { id: 3, name: "Mon Boum Burger — Colomiers", address: "4 Avenue Édouard Serres, 31770 Colomiers", city: "Colomiers", phone: "+33 5 34 64 04 04", hours: { weekdays: "11h30 – 22h30" }, rating: 4.5, reviews: 201, img: SMASH, amenities: ["wifi", "card"], isOpen: false, badge: "Nouveau", googleMaps: "https://www.google.com/maps/search/?api=1&query=4+Avenue+Edouard+Serres+31770+Colomiers" },
  { id: 4, name: "Mon Boum Pizz's — Bellefontaine", address: "69 Allée de Bellefontaine, 31100 Toulouse", city: "Toulouse", phone: "+33 5 61 41 64 16", hours: { weekdays: "11h30 – 23h00" }, rating: 4.6, reviews: 351, img: INTERIOR, amenities: ["wifi", "parking", "card", "delivery"], isOpen: true, badge: null, googleMaps: "https://www.google.com/maps/search/?api=1&query=69+Allee+de+Bellefontaine+31100+Toulouse" },
  { id: 5, name: "Mon Boum Chicken — Vauquelin", address: "152 Rue Nicolas Louis Vauquelin, 31100 Toulouse", city: "Toulouse", phone: "+33 5 34 46 18 38", hours: { weekdays: "11h30 – 23h00" }, rating: 4.8, reviews: 267, img: SMASH, amenities: ["wifi", "card", "delivery"], isOpen: true, badge: "Coup de cœur", googleMaps: "https://www.google.com/maps/search/?api=1&query=152+Rue+Nicolas+Louis+Vauquelin+31100+Toulouse" },
];

const amenityIcons: Record<string, { icon: any; label: string }> = {
  wifi: { icon: Wifi, label: "Wi-Fi" },
  parking: { icon: ParkingCircle, label: "Parking" },
  card: { icon: CreditCard, label: "CB" },
  delivery: { icon: Utensils, label: "Livraison" },
};

function RestaurantCard({ restaurant, index }: { restaurant: any; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.09, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="card-lift rounded-2xl overflow-hidden"
      style={{ backgroundColor: "var(--b-card)" }}
      itemScope
      itemType="https://schema.org/Restaurant"
      itemProp="itemListElement"
    >
      {/* Image */}
      <div className="relative img-zoom" style={{ aspectRatio: "16/9" }}>
        <ImageWithFallback src={restaurant.img} alt={`Restaurant ${restaurant.name}`} className="w-full h-full object-cover img-inner" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,6,6,0.95) 0%, transparent 55%)" }} />

        {/* Open/Closed */}
        <div
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
          style={{
            backgroundColor: restaurant.isOpen ? "rgba(34,197,94,0.15)" : "rgba(229,37,10,0.15)",
            border: `1px solid ${restaurant.isOpen ? "rgba(34,197,94,0.4)" : "rgba(229,37,10,0.4)"}`,
            color: restaurant.isOpen ? "#4ade80" : "var(--b-red)",
            fontWeight: 700,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: restaurant.isOpen ? "#4ade80" : "var(--b-red)" }} />
          {restaurant.isOpen ? "Ouvert" : "Fermé"}
        </div>

        {restaurant.badge && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs uppercase tracking-wider" style={{ backgroundColor: "var(--b-yellow)", color: "var(--b-black)", fontWeight: 700 }}>
            {restaurant.badge}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
          <span className="font-display text-white" style={{ fontSize: "1.8rem", letterSpacing: "0.03em" }} itemProp="name">{restaurant.city}</span>
          <div className="flex items-center gap-1.5">
            <Star size={13} fill="var(--b-yellow)" style={{ color: "var(--b-yellow)" }} />
            <span className="text-sm text-white font-semibold">{restaurant.rating}</span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>({restaurant.reviews})</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-6">
        <h2 className="text-sm font-semibold mb-1" style={{ color: "var(--b-white)" }} itemProp="name">{restaurant.name}</h2>
        <div className="flex items-start gap-2 mb-2">
          <MapPin size={12} style={{ color: "var(--b-yellow)", marginTop: 2, flexShrink: 0 }} />
          <span className="text-xs" style={{ color: "var(--b-muted)" }} itemProp="address">{restaurant.address}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Clock size={12} style={{ color: "var(--b-yellow)" }} />
          <span className="text-xs" style={{ color: "var(--b-muted)" }}>Lun–Ven : {restaurant.hours.weekdays}</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {restaurant.amenities.map((a: string) => {
            const am = amenityIcons[a];
            if (!am) return null;
            const Icon = am.icon;
            return (
              <span key={a} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs" style={{ backgroundColor: "var(--b-card2)", color: "var(--b-muted)" }} title={am.label}>
                <Icon size={10} />{am.label}
              </span>
            );
          })}
        </div>

        <div className="flex gap-2">
          <a
            href={restaurant.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-xs btn-shine transition-all hover:scale-105"
            style={{ backgroundColor: "var(--b-red)", color: "white", fontWeight: 600 }}
            aria-label={`Itinéraire vers ${restaurant.name}`}
          >
            <MapPin size={12} />Itinéraire
          </a>
          <a
            href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-xs border transition-all hover:scale-105"
            style={{ borderColor: "var(--b-border)", color: "var(--b-white)", fontWeight: 600 }}
            aria-label={`Appeler ${restaurant.name}`}
            itemProp="telephone"
          >
            <Phone size={12} />Appeler
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function RestaurantsPage() {
  const [selectedCity, setSelectedCity] = useState("Toutes");
  const cities = ["Toutes", ...Array.from(new Set(restaurants.map((r) => r.city)))];
  const filtered = selectedCity === "Toutes" ? restaurants : restaurants.filter((r) => r.city === selectedCity);

  useEffect(() => {
    document.title = "Nos Restaurants Mon Boum — Paris, Lyon, Bordeaux, Marseille, Toulouse";
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16" style={{ backgroundColor: "var(--b-black)" }} aria-label="Nos restaurants Mon Boum">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, var(--b-red), transparent 50%)" }} />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: "var(--b-red)" }} />
            <span className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--b-red)", fontWeight: 700 }}>5 adresses en France</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display"
              style={{ fontSize: "clamp(4rem, 15vw, 12rem)", lineHeight: 0.85, color: "var(--b-white)", letterSpacing: "0.02em" }}
            >
              NOS<br /><span style={{ color: "var(--b-red)" }}>RESTAURANTS</span>
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 max-w-lg text-sm" style={{ color: "rgba(240,237,232,0.45)" }}>
            Retrouvez-nous dans 5 villes françaises. Chaque restaurant est un espace unique, pensé pour une expérience BOUM mémorable.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="flex flex-wrap gap-3 mt-10" role="group" aria-label="Filtrer par ville">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all duration-200"
                style={{
                  backgroundColor: selectedCity === city ? "var(--b-red)" : "var(--b-card)",
                  color: selectedCity === city ? "white" : "var(--b-muted)",
                  fontWeight: 700,
                  border: selectedCity === city ? "none" : "1px solid var(--b-border)",
                }}
                aria-pressed={selectedCity === city}
              >
                {city}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured flagship */}
      {selectedCity === "Toutes" && (
        <section className="py-12" style={{ backgroundColor: "var(--b-dark)" }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2" style={{ backgroundColor: "var(--b-card)" }}>
              <div className="relative img-zoom" style={{ minHeight: "400px" }}>
                <ImageWithFallback src={INTERIOR} alt="Restaurant Mon Boum Paris Marais — flagship" className="absolute inset-0 w-full h-full object-cover img-inner" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(6,6,6,0.3), transparent)" }} />
                <div className="absolute top-6 left-6 px-4 py-2 rounded-full text-xs uppercase tracking-wider" style={{ backgroundColor: "var(--b-yellow)", color: "var(--b-black)", fontWeight: 700 }}>Restaurant pilote</div>
              </div>
              <div className="p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-px" style={{ backgroundColor: "var(--b-red)" }} />
                  <span className="text-xs uppercase tracking-widest" style={{ color: "var(--b-red)", fontWeight: 700 }}>Notre flagship</span>
                </div>
                <h2 className="font-display mb-4" style={{ fontSize: "3rem", color: "var(--b-white)", letterSpacing: "0.03em" }}>Paris Marais</h2>
                <p className="mb-6 text-sm leading-relaxed" style={{ color: "var(--b-muted)" }}>Notre restaurant historique, là où tout a commencé. 60 couverts, terrasse animée, la meilleure version de nos burgers, pizzas et tacos.</p>
                <div className="flex items-center gap-2 mb-3">
                  {[1,2,3,4,5].map((s) => <Star key={s} size={14} fill="var(--b-yellow)" style={{ color: "var(--b-yellow)" }} />)}
                  <span className="text-sm" style={{ color: "var(--b-muted)" }}>4.9 · 547 avis</span>
                </div>
                <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: "var(--b-muted)" }}>
                  <MapPin size={14} style={{ color: "var(--b-yellow)" }} />12 Rue de la Paix, 75003 Paris
                </div>
                <div className="flex gap-3">
                  <MagneticButton>
                    <a href="https://www.google.com/maps/search/?api=1&query=220+Route+de+Saint-Simon+31100+Toulouse" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-full text-sm btn-shine" style={{ backgroundColor: "var(--b-red)", color: "white", fontWeight: 600 }} aria-label="Itinéraire Google Maps">
                      <MapPin size={14} />Itinéraire
                    </a>
                  </MagneticButton>
                  <a href="tel:+33123456789" className="flex items-center gap-2 px-5 py-3 rounded-full text-sm border" style={{ borderColor: "var(--b-border)", color: "var(--b-white)", fontWeight: 600 }} aria-label="Appeler">
                    <Phone size={14} />Appeler
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All cards */}
      <section className="py-16" style={{ backgroundColor: "var(--b-black)" }} aria-label="Liste des restaurants Mon Boum" itemScope itemType="https://schema.org/ItemList">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((restaurant, i) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Franchise CTA */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: "var(--b-dark)" }} aria-label="Franchise Mon Boum">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, var(--b-yellow), transparent 60%)" }} />
        <div className="relative max-w-2xl mx-auto text-center px-5">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: "var(--b-yellow)" }} />
              <span className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--b-yellow)", fontWeight: 700 }}>Rejoindre l'aventure</span>
              <div className="w-8 h-px" style={{ backgroundColor: "var(--b-yellow)" }} />
            </div>
            <SplitText
              text="OUVRIR UN MON BOUM"
              as="h2"
              className="font-display text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 0.9, letterSpacing: "0.02em", justifyContent: "center" }}
              mode="words"
            />
            <p className="mb-8 text-sm" style={{ color: "rgba(240,237,232,0.45)" }}>Vous souhaitez rejoindre la famille Mon Boum ? Découvrez nos opportunités de franchise dans toute la France.</p>
            <MagneticButton>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm uppercase tracking-widest btn-shine" style={{ backgroundColor: "var(--b-yellow)", color: "var(--b-black)", fontWeight: 700 }} aria-label="Contacter Mon Boum pour la franchise">
                Nous contacter <ChevronRight size={15} />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
