import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

import { PLANS, type Plan } from "@/data/plans";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PlanCard({ plan }: { plan: Plan }) {
  const highlight = plan.highlight;

  return (
    <Card
      data-scroll-reveal="soft"
      className={cn(
        "relative flex flex-col gap-6 overflow-hidden p-7 transition-smooth hover:-translate-y-1",
        highlight ? "border-primary/40 shadow-elegant ring-1 ring-primary/20" : "border-border shadow-soft",
      )}
    >
      {highlight ? (
        <div className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-gradient-hero px-3 py-1 text-xs font-semibold text-primary-foreground">
          <Sparkles className="h-3 w-3" /> Mas popular
        </div>
      ) : null}
      <div>
        <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
      </div>
      <div className="flex items-end gap-1">
        <span className="font-display text-5xl font-extrabold text-foreground">
          {plan.currency} {plan.price}
        </span>
        <span className="mb-2 text-sm text-muted-foreground">/ {plan.period}</span>
      </div>
      <ul className="space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                plan.accent === "primary" ? "bg-primary/10 text-primary" : "bg-accent-soft text-accent",
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="text-foreground/85">{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/configurar?plan=${plan.id}`}
        className={cn(
          buttonVariants({ variant: highlight ? "hero" : plan.accent === "fresh" ? "fresh" : "outline", size: "lg" }),
          "mt-auto w-full",
        )}
      >
        Elegir {plan.name}
      </Link>
    </Card>
  );
}

export function PlansGrid() {
  return (
    <div data-scroll-reveal-stagger className="grid gap-6 md:grid-cols-3">
      {PLANS.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
