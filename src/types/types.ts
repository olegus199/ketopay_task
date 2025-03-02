export type FooterLinks = "login" | "about" | "publishers" | "sitemap";

export interface FetchError {
  message: string;
  errStatus?: number;
  recursive?: boolean;
  aborted?: boolean;
}