import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { CartDrawer } from "./components/CartDrawer";
import { PageTransition } from "./components/PageTransition";
import { CartProvider } from "./context/CartContext";
import { GlobalFaq } from "./components/GlobalFaq";

export function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <CartProvider>
      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Custom cursor — desktop only */}
      <div className="hidden lg:block">
        <CustomCursor />
      </div>

      {/* Cart drawer */}
      <CartDrawer />

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            name: "Mon Boum",
            description: "Mon Boum — Le meilleur du street-food depuis 2004. Pizzas, burgers, tacos artisanaux.",
            url: "https://monboum.fr",
            foundingDate: "2004",
            servesCuisine: ["Pizza", "Burger", "Tacos", "Street Food"],
            priceRange: "€€",
            telephone: "+33 1 23 45 67 89",
            address: { "@type": "PostalAddress", streetAddress: "12 Rue de la Paix", addressLocality: "Paris", postalCode: "75001", addressCountry: "FR" },
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "2147" },
            sameAs: ["https://www.instagram.com/monboum", "https://www.facebook.com/monboum", "https://www.tiktok.com/@monboum"],
          }),
        }}
      />

      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--b-black)" }}>
        <Navbar />
        <main className="flex-1">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        {pathname !== "/contact" && <GlobalFaq />}
        <Footer />
      </div>
    </CartProvider>
  );
}
