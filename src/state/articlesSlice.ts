import { GroupedArticles, IArticle } from "../types/types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcLatestNewsKey } from "../utils/latest-news-key.ts";
import articles from "../pages/Home/Articles.tsx";

interface InitialState {
  articles: GroupedArticles;
}

const initialState: InitialState = {
  articles: {},
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    articlesFetched(state: InitialState, action: PayloadAction<GroupedArticles>) {
      state.articles = {
        ...state.articles,
        ...action.payload,
      };
    },
    articlesPrepended(
      state: InitialState, action: PayloadAction<{ key: string, latestArticles: IArticle[] }>) {
      const { key, latestArticles } = action.payload;
      state.articles[key] = latestArticles;
    },
  },
  selectors: {
    selectArticles: state => state.articles,
  },
});

export const { articlesFetched, articlesPrepended } = articlesSlice.actions;

export const { selectArticles } = articlesSlice.selectors;