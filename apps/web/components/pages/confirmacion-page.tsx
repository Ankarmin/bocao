import Link from "next/link";
import { Calendar, CheckCircle2, Utensils } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ConfirmacionPage() {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <SiteHeader />
      <section className="container max-w-2xl py-16 text-center">
        <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-fresh text-accent-foreground shadow-fresh">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="font-display text-4xl font-extrabold md:text-5xl">Suscripcion activada</h1>
        <p className="mt-3 text-muted-foreground">Bienvenido a BOCAO. Tu primer pedido ya esta en cocina.</p>

        <Card className="mt-10 p-6 text-left shadow-elegant">
          <h3 className="font-display text-lg font-bold">Resumen del plan</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-secondary p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Utensils className="h-4 w-4" /> Comidas semanales
              </div>
              <div className="font-display text-2xl font-bold">14</div>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" /> Proxima entrega
              </div>
              <div className="font-display text-2xl font-bold">Lun, 9:00 AM</div>
            </div>
          </div>
        </Card>

        <div className="mt-8 flex justify-center gap-3">
          <Link href="/dashboard" className={buttonVariants({ variant: "hero", size: "lg" })}>
            Ir a mi dashboard
          </Link>
          <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  );
}
