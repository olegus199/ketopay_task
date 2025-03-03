import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { sidemenuSlice } from "./sidemenuSlice.ts";
import { articlesSlice } from "./articlesSlice.ts";
import { scrollToTopSlice } from "./scrollToTopSlice.ts";

const RootReducer = combineSlices(sidemenuSlice, articlesSlice, scrollToTopSlice);

export type RootState = ReturnType<typeof RootReducer>;

export function makeStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: RootReducer,
    preloadedState,
  });
  return store;
}

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"]
export default store;