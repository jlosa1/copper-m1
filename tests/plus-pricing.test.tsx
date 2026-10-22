import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "@/app/page";

describe("Copper Plus pricing section", () => {
  it("compares Free and Copper Plus from the catalog", () => {
    render(<Home />);
    const section = screen.getByTestId("plus-pricing");
    expect(section.id).toBe("plus");
    const free = within(section)
      .getAllByTestId("plan-card")
      .find((c) => c.getAttribute("data-plan") === "free")!;
    const plus = within(section)
      .getAllByTestId("plan-card")
      .find((c) => c.getAttribute("data-plan") === "copper-plus")!;
    expect(free).toHaveTextContent("30 days");
    expect(free).toHaveTextContent("10 hours/month");
    expect(free).toHaveTextContent("Not included");
    expect(plus).toHaveTextContent("$7.99");
    expect(plus).toHaveTextContent("$79");
    expect(plus).toHaveTextContent("12 months");
    expect(plus).toHaveTextContent("Unlimited");
    expect(plus).toHaveTextContent("Included");
  });

  it("moves the border to the plan you select", () => {
    render(<Home />);
    const [free, plus] = screen.getAllByTestId("plan-card");
    expect(plus.getAttribute("data-selected")).toBe("true");
    expect(plus.className).toContain("ring-2");
    expect(free.className).not.toContain("ring-2");

    fireEvent.click(free);
    expect(free.getAttribute("data-selected")).toBe("true");
    expect(free.className).toContain("ring-2");
    expect(plus.getAttribute("data-selected")).toBe("false");
    expect(plus.className).not.toContain("ring-2");

    fireEvent.click(plus);
    expect(plus.className).toContain("ring-2");
    expect(free.className).not.toContain("ring-2");
  });

  it("lets the arrow keys change the selected plan", () => {
    render(<Home />);
    const [free, plus] = screen.getAllByTestId("plan-card");
    fireEvent.keyDown(plus, { key: "ArrowLeft" });
    expect(free.getAttribute("aria-checked")).toBe("true");
    expect(plus.getAttribute("aria-checked")).toBe("false");
  });

  it("follows the catalog when plan prices change", async () => {
    vi.resetModules();
    vi.doMock("@/lib/copper/catalog", async (importOriginal) => {
      const actual =
        await importOriginal<typeof import("@/lib/copper/catalog")>();
      return {
        ...actual,
        getPlans: () =>
          actual
            .getPlans()
            .map((p) =>
              p.id === "copper-plus"
                ? { ...p, monthlyUsd: 9.49, annualUsd: 95 }
                : p,
            ),
      };
    });
    const { default: Changed } = await import("@/app/page");
    render(<Changed />);
    const text = screen.getByTestId("plus-pricing").textContent ?? "";
    expect(text).toContain("$9.49");
    expect(text).toContain("$95");
    expect(text).not.toContain("$7.99");
    vi.doUnmock("@/lib/copper/catalog");
  });
});
