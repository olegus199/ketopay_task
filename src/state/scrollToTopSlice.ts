import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isVisible: boolean;
}

const initialState: InitialState = {
  isVisible: false,
};

export const scrollToTopSlice = createSlice({
  name: "scrollToTop",
  initialState,
  reducers: {
    scrollToTopVisibilityChanged(state, action: PayloadAction<boolean>) {
      state.isVisible = action.payload;
    },
  },
  selectors: {
    selectScrollToTopVisibility: state => state.isVisible,
  },
});

export const { scrollToTopVisibilityChanged } = scrollToTopSlice.actions;

export const { selectScrollToTopVisibility } = scrollToTopSlice.selectors;