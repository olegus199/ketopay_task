import styles from "../components/Navbar/Navbar.module.scss";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../utils/test-utils.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
import { sitemap } from "../data.ts";

describe("Navbar", () => {
  beforeEach(() => {
    renderWithProviders(<Navbar />);
    global.scrollTo = vi.fn();
  });

  it("Renders links and site name", () => {
    sitemap.forEach((link) => {
      expect(screen.getByText(new RegExp(link, "i"))).toBeInTheDocument();
    });
    expect(screen.getByText(/besider/i)).toBeInTheDocument();
  });

  it("Changes routes correctly", async () => {
    for (let link of sitemap) {
      const linkEl = screen.getByRole("link", { name: new RegExp(link, "i") });
      await userEvent.click(linkEl);
      expect(location.pathname).toBe(link === "home" ? "/" : "/" + link);
    }
  });

  it("Handles toggle menu button click correctly", async () => {
    const menuButtonEl = screen.getByRole("button", { name: "open menu" });
    const closeButtonEl = screen.getByRole("button", { name: "close menu" });

    expect(menuButtonEl).not.toHaveClass(styles.button_hidden);
    expect(closeButtonEl).toHaveClass(styles.button_hidden);

    await userEvent.click(menuButtonEl);
    expect(menuButtonEl).toHaveClass(styles.button_hidden);
    expect(closeButtonEl).not.toHaveClass(styles.button_hidden);

    await userEvent.click(closeButtonEl);

    expect(menuButtonEl).not.toHaveClass(styles.button_hidden);
    expect(closeButtonEl).toHaveClass(styles.button_hidden);
  });
});