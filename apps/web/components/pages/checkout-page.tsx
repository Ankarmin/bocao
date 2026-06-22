"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";

import { PLANS } from "@/data/plans";

import { SiteHeader } from "@/components/layout/site-header";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const fallbackPlan = PLANS[1] ?? PLANS[0];

  if (!fallbackPlan) {
    return null;
  }

  const plan = PLANS.find((item) => item.id === searchParams.get("plan")) ?? fallbackPlan;
  const total = plan.price * 1.05;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!cardName.trim() || !cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim() || !address.trim()) {
      setError("Completa todos los campos para continuar.");
      return;
    }

    setError("");
    router.push(`/confirmacion?plan=${plan.id}`);
  }

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

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-[1fr_360px]">
            <Card className="p-6 shadow-soft">
              <div className="mb-5 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-bold">Datos de tarjeta</h3>
              </div>

              {error ? <p className="mb-4 text-sm font-medium text-destructive">{error}</p> : null}

              <div className="grid gap-4">
                <div className="space-y-2">
                  <label htmlFor="card-name" className="text-sm font-medium">Nombre en la tarjeta</label>
                  <Input id="card-name" placeholder="Como aparece en la tarjeta" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="card-number" className="text-sm font-medium">Número de tarjeta</label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="card-expiry" className="text-sm font-medium">Vencimiento</label>
                    <Input id="card-expiry" placeholder="MM / AA" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="card-cvv" className="text-sm font-medium">CVV</label>
                    <Input id="card-cvv" placeholder="123" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">Dirección de entrega</label>
                  <Input id="address" placeholder="Av. Ejemplo 123, Lima" value={address} onChange={(e) => setAddress(e.target.value)} />
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
              <button
                type="submit"
                className={cn(buttonVariants({ variant: "hero", size: "lg" }), "mt-5 w-full")}
              >
                <Lock className="h-4 w-4" /> Pagar ahora
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">Al continuar aceptas los términos de BOCAO.</p>
            </Card>
          </div>
        </form>
      </section>
    </div>
  );
}
