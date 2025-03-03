export type Sitemap =
  "home"
  | "science"
  | "entertainment"
  | "technology"
  | "business"
  | "health"
  | "sports"

export type FooterLinks = "login" | "about" | "publishers" | "sitemap";

export interface FetchError {
  message: string;
  errStatus?: number;
  aborted?: boolean;
}

export interface IArticle {
  author: string | null;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

export interface IArticleResponse {
  articles: IArticle[];
  status: string;
  totalResults: number;
}

export interface GroupedArticles {
  [key: string]: IArticle[];
}