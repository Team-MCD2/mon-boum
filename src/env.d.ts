/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
  readonly VITE_GOOGLE_PLACE_ID?: string;
  /** Formspree endpoint pour ContactPage — https://formspree.io/f/xxxxxxxx */
  readonly VITE_FORMSPREE_CONTACT?: string;
  /** Formspree endpoint pour FranchisePage — https://formspree.io/f/xxxxxxxx */
  readonly VITE_FORMSPREE_FRANCHISE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
