import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isOpen: boolean;
}

const initialState: InitialState = {
  isOpen: false,
};

export const sidemenuSlice = createSlice({
  name: "sidemenu",
  initialState,
  reducers: {
    sidemenuOpened(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
  selectors: {
    selectSidemenuOpenStatus: state => state.isOpen,
  },
});

export const { sidemenuOpened } = sidemenuSlice.actions;

export const { selectSidemenuOpenStatus } = sidemenuSlice.selectors;