import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils.tsx";
import Home from "../pages/Home/Home.tsx";
import { server } from "./handlers.ts";

describe("Home", () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    renderWithProviders(<Home />);
    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  afterEach(() => {
    server.resetHandlers();
  });

  it("Should render loader", async () => {
    await waitFor(() => {
      expect(screen.getByLabelText("loader")).toBeInTheDocument();
    });
  });
});