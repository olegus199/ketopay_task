import { setupServer } from "msw/node";
import { http, HttpResponse, RequestHandler } from "msw";
import { API_KEY, API_URL } from "../config.ts";
import { initializeFromDate, initializeToDate } from "../utils/init-dates.ts";
import { IArticle, IArticleResponse } from "../types/types.ts";

const fromDate = initializeFromDate();
const toDate = initializeToDate();

export const fakeArticles: IArticle[] = [
  {
    "author": "John Doe",
    "content": "This is the main content of the article. It discusses recent events and their impact.",
    "description": "A summary of the article's key points and findings.",
    "publishedAt": "2023-10-27T10:00:00Z",
    "source": {
      "id": "abc-news",
      "name": "ABC News",
    },
    "title": "Breaking News: Major Developments",
    "url": "https://www.abcnews.com/article/123",
    "urlToImage": "https://www.abcnews.com/images/article123.jpg",
  },
  {
    "author": null,
    "content": "Detailed analysis of the latest technological advancements and their potential applications.",
    "description": "Exploring the future of technology and its implications.",
    "publishedAt": "2023-10-26T15:30:00Z",
    "source": {
      "id": "tech-radar",
      "name": "TechRadar",
    },
    "title": "Future Tech: Innovations on the Horizon",
    "url": "https://www.techradar.com/article/456",
    "urlToImage": "https://www.techradar.com/images/article456.png",
  },
  {
    "author": "Jane Smith",
    "content": "An in-depth look at the current economic trends and their effects on global markets.",
    "description": "Understanding the complexities of the modern economy.",
    "publishedAt": "2023-10-25T08:45:00Z",
    "source": {
      "id": "financial-times",
      "name": "Financial Times",
    },
    "title": "Economic Trends: A Global Perspective",
    "url": "https://www.ft.com/article/789",
    "urlToImage": "https://www.ft.com/images/article789.jpeg",
  },
];

const handlers: RequestHandler[] = [
  http.get(
    `${API_URL}?domains=cnn.com&from=${fromDate}&to=${toDate}&pageSize=40&apiKey=${API_KEY}`,
    () => {
      return HttpResponse.json<IArticleResponse>({
        status: "ok",
        articles: fakeArticles,
        totalResults: 100,
      });
    },
  ),
];

export const server = setupServer(...handlers);