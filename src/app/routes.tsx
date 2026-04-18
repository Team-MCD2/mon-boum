import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { RestaurantsPage } from "./pages/RestaurantsPage";
import { ContactPage } from "./pages/ContactPage";
import { LegalPage } from "./pages/LegalPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "menu", Component: MenuPage },
      { path: "restaurants", Component: RestaurantsPage },
      { path: "contact", Component: ContactPage },
      { path: "mentions-legales", Component: LegalPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
