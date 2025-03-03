import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { sidemenuSlice } from "./sidemenuSlice.ts";
import { articlesSlice } from "./articlesSlice.ts";

const RootReducer = combineSlices(sidemenuSlice, articlesSlice);

export type RootState = ReturnType<typeof RootReducer>;

export const store = configureStore({
  reducer: RootReducer,
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"]
export default store;