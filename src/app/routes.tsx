import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { BrandPage } from "./pages/BrandPage";
import { RestaurantsPage } from "./pages/RestaurantsPage";
import { ContactPage } from "./pages/ContactPage";
import { LegalPage } from "./pages/LegalPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { FranchisePage } from "./pages/FranchisePage";
import { GalleryPage } from "./pages/GalleryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "boum-burger", element: <BrandPage /> },
      { path: "boum-chicken", element: <BrandPage /> },
      { path: "boum-pizzs", element: <BrandPage /> },
      { path: "boum-saveurs", element: <BrandPage /> },
      { path: "nos-restaurants", Component: RestaurantsPage },
      { path: "franchise", Component: FranchisePage },
      { path: "videos", Component: GalleryPage },
      { path: "contact", Component: ContactPage },
      { path: "mentions-legales", Component: LegalPage },
      // Legacy redirects
      { path: "menu", element: <Navigate to="/nos-restaurants" replace /> },
      { path: "restaurants", element: <Navigate to="/nos-restaurants" replace /> },
      { path: "gallery", element: <Navigate to="/videos" replace /> },
      { path: "formulaire-de-candidature", element: <Navigate to="/franchise" replace /> },
      { path: "mon-boum-cest-quoi", element: <Navigate to="/franchise" replace /> },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
