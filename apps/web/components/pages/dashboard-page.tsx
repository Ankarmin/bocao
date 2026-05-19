import { Calendar, Flame, Pause, RefreshCw, Truck, Utensils } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

const menu = [
  { meal: "Bowl de quinua y pollo grillado", kcal: 540 },
  { meal: "Salmon al horno con vegetales", kcal: 610 },
  { meal: "Wrap mediterraneo de pavo", kcal: 480 },
  { meal: "Curry tailandes vegetariano", kcal: 520 },
  { meal: "Tacos saludables de res", kcal: 580 },
  { meal: "Poke bowl de atun", kcal: 560 },
  { meal: "Pasta integral con pesto", kcal: 590 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Hola de nuevo</p>
            <h1 className="font-display text-3xl font-extrabold md:text-4xl">Tu plan de la semana</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Pause /> Pausar
            </Button>
            <Button variant="hero">
              <RefreshCw /> Cambiar plan
            </Button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" /> Dias restantes
            </div>
            <div className="mt-2 font-display text-4xl font-extrabold">5</div>
            <Progress value={70} className="mt-3" />
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" /> Proxima entrega
            </div>
            <div className="mt-2 font-display text-4xl font-extrabold">Lun</div>
            <p className="mt-1 text-sm text-muted-foreground">9:00 - 12:00 AM</p>
          </Card>
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Flame className="h-4 w-4" /> Calorias diarias
            </div>
            <div className="mt-2 font-display text-4xl font-extrabold">2 100</div>
            <p className="mt-1 text-sm text-muted-foreground">Objetivo: bajar grasa</p>
          </Card>
        </div>

        <Card className="mt-6 p-6 shadow-soft">
          <div className="mb-4 flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            <h2 className="font-display text-xl font-bold">Menu semanal</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-7">
            {days.map((day, index) => {
              const menuItem = menu[index];

              if (!menuItem) {
                return null;
              }

              return (
                <div key={day} className="rounded-xl border border-border bg-secondary/50 p-4">
                  <div className="text-xs font-semibold uppercase text-muted-foreground">{day}</div>
                  <div className="mt-2 text-sm font-medium leading-snug">{menuItem.meal}</div>
                  <div className="mt-3 inline-flex rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent">
                    {menuItem.kcal} kcal
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>
    </div>
  );
}
