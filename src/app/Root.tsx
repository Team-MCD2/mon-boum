import { Outlet, useLocation } from "react-router";
import { useEffect, useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { useCustomCursorEnabled } from "./hooks/useCustomCursorEnabled";
import { PageTransition } from "./components/PageTransition";
import { ThemeProvider } from "./context/ThemeContext";
import { IntroPreface } from "./components/IntroPreface";
import { siteConfig, getJsonLdSiteUrl } from "./config/siteConfig";

export function Root() {
  const { pathname } = useLocation();
  const customCursorOn = useCustomCursorEnabled();

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: siteConfig.siteName,
      description:
        "Mon Boum — street-food halal depuis 2004. Pizzas, burgers, tacos — Toulouse & métropole.",
      url: getJsonLdSiteUrl(),
      foundingDate: "2004",
      servesCuisine: ["Pizza", "Burger", "Tacos", "Street Food"],
      priceRange: "€€",
      telephone: siteConfig.legal.phoneTel.replace("tel:", ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.legal.street,
        addressLocality: siteConfig.legal.city,
        postalCode: siteConfig.legal.postalCode,
        addressCountry: "FR",
      },
      sameAs: [siteConfig.social.instagram, siteConfig.social.tiktok, siteConfig.social.facebook, siteConfig.social.youtube],
    }),
    []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ThemeProvider>
      <IntroPreface />

      <div className="grain" aria-hidden="true" />

      {customCursorOn && <CustomCursor />}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--b-black)" }}>
        <Navbar />
        <main className="flex-1">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
