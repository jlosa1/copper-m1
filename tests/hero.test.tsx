import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { getProducts } from "@/lib/copper/catalog";

describe("Hero section", () => {
  it("has one short h1 and the exact tagline", () => {
    render(<Home />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent!.trim().split(/\s+/).length).toBeLessThanOrEqual(
      10,
    );
    expect(screen.getByText("From raw ideas to refined answers.")).toBeTruthy();
  });

  it("links See products to #products", () => {
    render(<Home />);
    const hero = screen.getByTestId("hero");
    const link = within(hero).getByRole("link", { name: "See products" });
    expect(link.getAttribute("href")).toBe("#products");
  });

  it("shows both product cutouts with descriptive alt text", () => {
    render(<Home />);
    const hero = screen.getByTestId("hero");
    const images = within(hero).getAllByRole("img");
    expect(images).toHaveLength(2);
    for (const product of getProducts()) {
      const img = within(hero).getByAltText(new RegExp(product.name));
      expect(decodeURIComponent(img.getAttribute("src") ?? "")).toContain(
        product.cutout,
      );
    }
  });
});
