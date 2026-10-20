import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { getProducts } from "@/lib/copper/catalog";

describe("Showcase section", () => {
  it("shows every lifestyle photo with alt text and a caption", () => {
    render(<Home />);
    const section = screen.getByTestId("showcase");
    expect(section.id).toBe("showcase");
    const images = within(section).getAllByRole("img");
    const expected = getProducts().flatMap((p) => p.lifestyle);
    expect(images).toHaveLength(expected.length);
    for (const src of expected) {
      const img = images.find((i) =>
        decodeURIComponent(i.getAttribute("src") ?? "").includes(src),
      );
      expect(img, `photo ${src}`).toBeDefined();
      expect(img!.getAttribute("alt")!.length).toBeGreaterThan(15);
    }
    expect(section.querySelectorAll("figcaption")).toHaveLength(
      expected.length,
    );
  });
});
