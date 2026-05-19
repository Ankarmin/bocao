"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";

import { PLANS } from "@/data/plans";

import { SiteHeader } from "@/components/layout/site-header";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const fallbackPlan = PLANS[1] ?? PLANS[0];

  if (!fallbackPlan) {
    return null;
  }

  const plan = PLANS.find((item) => item.id === searchParams.get("plan")) ?? fallbackPlan;
  const total = plan.price * 1.05;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container max-w-5xl py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-primary">Paso 3 de 3</p>
          <h1 className="mt-1 font-display text-3xl font-extrabold md:text-4xl">Finaliza tu pago</h1>
          <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-accent" /> Pago seguro procesado por Culqi
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_360px]">
          <Card className="p-6 shadow-soft">
            <div className="mb-5 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-bold">Datos de tarjeta</h3>
            </div>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre en la tarjeta</label>
                <Input placeholder="Como aparece en la tarjeta" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Numero de tarjeta</label>
                <Input placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vencimiento</label>
                  <Input placeholder="MM / AA" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">CVV</label>
                  <Input placeholder="123" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Direccion de entrega</label>
                <Input placeholder="Av. Ejemplo 123, Lima" />
              </div>
            </div>
          </Card>

          <Card className="h-fit p-6 shadow-elegant">
            <h3 className="mb-4 font-display text-lg font-bold">Tu pedido</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Plan {plan.name}</span>
                <span>
                  {plan.currency} {plan.price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>
                  {plan.currency} {(plan.price * 0.05).toFixed(2)}
                </span>
              </div>
              <div className="my-3 h-px bg-border" />
              <div className="flex items-baseline justify-between">
                <span className="font-bold">Total</span>
                <span className="font-display text-2xl font-extrabold text-primary">
                  {plan.currency} {total.toFixed(2)}
                </span>
              </div>
            </div>
            <Link
              href={`/confirmacion?plan=${plan.id}`}
              className={cn(buttonVariants({ variant: "hero", size: "lg" }), "mt-5 w-full")}
            >
              <Lock className="h-4 w-4" /> Pagar ahora
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">Al continuar aceptas los terminos de BOCAO.</p>
          </Card>
        </div>
      </section>
    </div>
  );
}
