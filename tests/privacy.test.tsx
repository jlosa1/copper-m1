import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { getPrivacySummary } from "@/lib/copper/catalog";

describe("Privacy section", () => {
  it("explains the 2026 policy from the catalog", () => {
    render(<Home />);
    const section = screen.getByTestId("privacy-summary");
    expect(section.id).toBe("privacy");
    const privacy = getPrivacySummary();
    expect(within(section).getAllByRole("listitem")).toHaveLength(
      privacy.points.length,
    );
    expect(section).toHaveTextContent(privacy.policy);
    expect(section).toHaveTextContent("Hey Copper");
    expect(section).toHaveTextContent(/cloud/i);
    expect(section).toHaveTextContent("30 days");
    expect(section).toHaveTextContent("12 months");
    expect(section).toHaveTextContent(/delete/i);
    expect(section).toHaveTextContent("Copper app");
  });

  it("never claims Copper never records", () => {
    const { container } = render(<Home />);
    expect(container.textContent).not.toMatch(/never\s+record/i);
  });
});
