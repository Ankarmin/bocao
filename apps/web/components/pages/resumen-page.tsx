"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Calendar, Receipt, Salad, Truck } from "lucide-react";

import { PLANS } from "@/data/plans";

import { SiteHeader } from "@/components/layout/site-header";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ResumenPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") ?? "estandar";
  const fallbackPlan = PLANS[1] ?? PLANS[0];

  if (!fallbackPlan) {
    return null;
  }

  const plan = PLANS.find((item) => item.id === planId) ?? fallbackPlan;
  const delivery = plan.price * 0.05;
  const total = plan.price + delivery;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container max-w-5xl py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-primary">Paso 2 de 3</p>
          <h1 className="mt-1 font-display text-3xl font-extrabold md:text-4xl">Resumen de tu suscripcion</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <Card className="p-6 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold">Plan {plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.tagline}</p>
                </div>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                  {plan.mealsPerWeek} comidas / sem
                </span>
              </div>
              <ul className="mt-4 grid gap-2 text-sm md:grid-cols-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-foreground/85">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 shadow-soft">
              <h3 className="mb-4 font-display text-lg font-bold">Tu perfil nutricional</h3>
              <div className="grid gap-3 text-sm md:grid-cols-3">
                <div className="rounded-lg bg-secondary p-3">
                  <div className="text-muted-foreground">Calorias diarias</div>
                  <div className="font-display text-xl font-bold">2 100 kcal</div>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <div className="text-muted-foreground">Macros (P/G/C)</div>
                  <div className="font-display text-xl font-bold">35/25/40%</div>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <div className="text-muted-foreground">Objetivo</div>
                  <div className="font-display text-xl font-bold">Bajar grasa</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-soft">
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold">
                <Calendar className="h-5 w-5 text-primary" /> Cronograma de entregas
              </h3>
              <ul className="space-y-3 text-sm">
                {[1, 2, 3].map((week) => (
                  <li key={week} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <Truck className="h-4 w-4 text-accent" />
                      <span>Semana {week} - Lunes y Jueves</span>
                    </div>
                    <span className="text-muted-foreground">9:00 - 12:00</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="h-fit p-6 shadow-elegant">
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold">
              <Receipt className="h-5 w-5 text-primary" /> Resumen del costo
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Plan {plan.name}</span>
                <span>
                  {plan.currency} {plan.price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>
                  {plan.currency} {delivery.toFixed(2)}
                </span>
              </div>
              <div className="my-3 h-px bg-border" />
              <div className="flex items-baseline justify-between">
                <span className="font-display text-base font-bold">Total semanal</span>
                <span className="font-display text-2xl font-extrabold text-primary">
                  {plan.currency} {total.toFixed(2)}
                </span>
              </div>
            </div>
            <Link
              href={`/checkout?plan=${plan.id}`}
              className={cn(buttonVariants({ variant: "hero", size: "lg" }), "mt-5 w-full")}
            >
              Ir al pago
            </Link>
            <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Salad className="h-3 w-3 text-accent" /> Cancela o pausa cuando quieras.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
