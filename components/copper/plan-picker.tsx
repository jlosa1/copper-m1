"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type PlanOption = {
  id: string;
  name: string;
  rows: [label: string, value: string][];
};

// The server page formats every value from the catalog; this component only
// handles which plan is selected, so the border follows the click.
export function PlanPicker({
  plans,
  defaultPlanId,
}: {
  plans: PlanOption[];
  defaultPlanId: string;
}) {
  const [selected, setSelected] = useState(defaultPlanId);

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const step =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (step === 0) return;
    event.preventDefault();
    const next = plans[(index + step + plans.length) % plans.length];
    setSelected(next.id);
    document.getElementById(`plan-${next.id}`)?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label="Choose a plan"
      className="grid gap-6 md:grid-cols-2"
    >
      {plans.map((plan, index) => {
        const isSelected = plan.id === selected;
        const isPlus = plan.id === "copper-plus";
        return (
          <Card
            key={plan.id}
            id={`plan-${plan.id}`}
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            data-testid="plan-card"
            data-plan={plan.id}
            data-selected={isSelected}
            onClick={() => setSelected(plan.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`cursor-pointer pt-0 transition-shadow outline-none focus-visible:ring-primary ${
              isSelected ? "ring-primary ring-2" : "hover:ring-primary/50"
            }`}
          >
            <CardHeader
              className={
                isPlus ? "bg-primary text-primary-foreground py-4" : "py-4"
              }
            >
              <CardTitle className="text-xl">{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="flex flex-col gap-4">
                {plan.rows.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0"
                  >
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="text-right font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
