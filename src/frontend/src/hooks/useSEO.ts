import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
}

const DEFAULT_TITLE =
  "INOVICS - AI Digital Transformation Studio for Indian SMEs";
const DEFAULT_DESCRIPTION =
  "INOVICS helps ₹5\u201350 Cr legacy family businesses build AI-powered operating systems that eliminate chaos and scale with control.";
const DEFAULT_IMAGE =
  "https://weareinovics-2uo.caffeine.xyz/assets/generated/inovics-data-grid-bg.dim_1920x1080.png";
const SITE_NAME = "INOVICS";
const BASE_URL = "https://weareinovics-2uo.caffeine.xyz";

function setMeta(name: string, content: string, attr = "name") {
  let el = document.querySelector(
    `meta[${attr}="${name}"]`,
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(
    `link[rel="${rel}"]`,
  ) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  return el;
}

export function useSEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  url,
  image = DEFAULT_IMAGE,
  type = "website",
}: SEOProps = {}) {
  useEffect(() => {
    const prevTitle = document.title;
    const canonicalUrl = url
      ? `${BASE_URL}${url}`
      : `${BASE_URL}${window.location.pathname}`;

    // Title
    document.title = title;

    // Standard meta
    setMeta("description", description);

    // Open Graph
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:type", type, "property");
    setMeta("og:site_name", SITE_NAME, "property");
    setMeta("og:image", image, "property");

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);

    // Canonical
    setLink("canonical", canonicalUrl);

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, url, image, type]);
}
