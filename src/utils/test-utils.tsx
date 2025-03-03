import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore, RootState } from "../state/store.ts";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) => {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = makeStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const queryClient = new QueryClient();

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};