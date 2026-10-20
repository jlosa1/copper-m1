import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/copper/site-header";

describe("Site header", () => {
  it("links to the products, plus and privacy sections", () => {
    render(<SiteHeader />);
    const header = screen.getByTestId("site-header");
    const nav = within(header).getByRole("navigation");
    const hrefs = within(nav)
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["#products", "#plus", "#privacy"]);
  });
});
