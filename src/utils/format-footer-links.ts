import { FooterLinks } from "../types/types.ts";

export function formatFooterLinks(link: FooterLinks): string {
  switch (link) {
    case "login":
      return "Log In";
    case "about":
      return "About Us";
    case "publishers":
    case "sitemap":
      return link.charAt(0).toUpperCase() + link.slice(1);
  }
}