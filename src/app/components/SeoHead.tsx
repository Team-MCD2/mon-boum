import { useEffect } from "react";
import { getJsonLdSiteUrl } from "../config/siteConfig";

type SeoHeadProps = {
  title: string;
  description: string;
  /** Path under public/ e.g. /favicon.png */
  ogImagePath?: string;
  /** Comma-separated keywords for Toulouse / halal local SEO */
  keywords?: string;
  noIndex?: boolean;
};

/**
 * SPA meta + Open Graph (French titles/descriptions from callers).
 */
export function SeoHead({ title, description, ogImagePath = "/favicon.png", keywords, noIndex }: SeoHeadProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, key: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(`${selector}[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    const origin = getJsonLdSiteUrl();
    const ogImage = ogImagePath.startsWith("http") ? ogImagePath : `${origin.replace(/\/$/, "")}${ogImagePath}`;

    setMeta("meta", "name", "description", description);
    if (keywords) setMeta("meta", "name", "keywords", keywords);
    setMeta("meta", "name", "robots", noIndex ? "noindex, nofollow" : "index, follow");

    setMeta("meta", "property", "og:title", title);
    setMeta("meta", "property", "og:description", description);
    setMeta("meta", "property", "og:type", "website");
    setMeta("meta", "property", "og:image", ogImage);
    setMeta("meta", "property", "og:locale", "fr_FR");

    setMeta("meta", "name", "twitter:card", "summary_large_image");
    setMeta("meta", "name", "twitter:title", title);
    setMeta("meta", "name", "twitter:description", description);
    setMeta("meta", "name", "twitter:image", ogImage);
  }, [title, description, ogImagePath, keywords, noIndex]);

  return null;
}
