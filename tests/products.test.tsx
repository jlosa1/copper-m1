import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import { formatUsd, getProducts } from "@/lib/copper/catalog";

describe("Products section", () => {
  it("has one card per product with cutout, name, price and three features", () => {
    render(<Home />);
    const section = screen.getByTestId("products");
    expect(section.id).toBe("products");
    const cards = within(section).getAllByTestId("product-card");
    const products = getProducts();
    expect(cards).toHaveLength(products.length);
    products.forEach((product, i) => {
      const card = cards[i];
      expect(card.getAttribute("data-product")).toBe(product.id);
      expect(within(card).getByRole("img").getAttribute("alt")).toContain(
        product.name,
      );
      expect(card).toHaveTextContent(product.name);
      expect(card).toHaveTextContent(formatUsd(product.priceUsd));
      for (const feature of product.features.slice(0, 3)) {
        expect(card).toHaveTextContent(feature.name);
      }
    });
  });

  it("follows the catalog when prices change", async () => {
    vi.resetModules();
    vi.doMock("@/lib/copper/catalog", async (importOriginal) => {
      const actual =
        await importOriginal<typeof import("@/lib/copper/catalog")>();
      return {
        ...actual,
        getProducts: () =>
          actual.getProducts().map((p) => ({ ...p, priceUsd: 321 })),
      };
    });
    const { default: Changed } = await import("@/app/page");
    render(<Changed />);
    for (const card of within(screen.getByTestId("products")).getAllByTestId(
      "product-card",
    )) {
      expect(card).toHaveTextContent("$321");
    }
    vi.doUnmock("@/lib/copper/catalog");
  });
});
