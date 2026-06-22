"use client";

import Link from "next/link";
import {
  Apple,
  ChevronRight,
  Clock,
  Flame,
  Leaf,
  Salad,
  Sparkles,
  Sun,
  Sunset,
} from "lucide-react";

import { PublicPageShell } from "@/components/layout/public-page-shell";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const weekMenu = [
  {
    day: "Lunes",
    meals: [
      { type: "Almuerzo", icon: Sun, name: "Bowl verde con pollo cítrico", kcal: "520 kcal", tags: ["Alto en proteína", "Sin gluten"] },
      { type: "Cena", icon: Sunset, name: "Crema de zapallo con tostadas integrales", kcal: "380 kcal", tags: ["Vegetariano", "Fibra"] },
    ],
  },
  {
    day: "Martes",
    meals: [
      { type: "Almuerzo", icon: Sun, name: "Lomo saltado fit con arroz integral", kcal: "550 kcal", tags: ["Clásico peruano", "Proteína"] },
      { type: "Cena", icon: Sunset, name: "Ensalada mediterránea con hummus", kcal: "340 kcal", tags: ["Vegano", "Ligero"] },
    ],
  },
  {
    day: "Miércoles",
    meals: [
      { type: "Almuerzo", icon: Sun, name: "Curry thai de garbanzos", kcal: "480 kcal", tags: ["Vegano", "Especias suaves"] },
      { type: "Cena", icon: Sunset, name: "Tacos de pescado con slaw de repollo", kcal: "420 kcal", tags: ["Omega-3", "Fresco"] },
    ],
  },
  {
    day: "Jueves",
    meals: [
      { type: "Almuerzo", icon: Sun, name: "Pollo teriyaki con vegetales al wok", kcal: "510 kcal", tags: ["Asiático", "Balanceado"] },
      { type: "Cena", icon: Sunset, name: "Sopa minestrone con pan artesanal", kcal: "360 kcal", tags: ["Reconfortante", "Fibra"] },
    ],
  },
  {
    day: "Viernes",
    meals: [
      { type: "Almuerzo", icon: Sun, name: "Wrap de pavo y hummus", kcal: "470 kcal", tags: ["Rápido", "Proteína"] },
      { type: "Cena", icon: Sunset, name: "Pasta integral con pesto de albahaca", kcal: "450 kcal", tags: ["Vegetariano", "Saciante"] },
    ],
  },
];

const categories = [
  {
    icon: Salad,
    title: "Bowls & ensaladas",
    text: "Combinaciones frescas con proteína, granos y vegetales de temporada.",
    color: "bg-accent-soft text-accent",
  },
  {
    icon: Flame,
    title: "Platos calientes",
    text: "Recetas reconfortantes con control de macros y sabor auténtico.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Apple,
    title: "Snacks saludables",
    text: "Opciones entre comidas incluidas en planes Estándar y Premium.",
    color: "bg-accent-soft text-accent",
  },
  {
    icon: Leaf,
    title: "Opciones veganas",
    text: "Menú 100% plant-based disponible como opción en cualquier plan.",
    color: "bg-primary/10 text-primary",
  },
];

export default function MenuSemanalPage() {
  return (
    <PublicPageShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-soft" />
        <div className="absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="container py-20 md:py-28">
          <div data-scroll-reveal="hero" className="mx-auto max-w-3xl text-center">
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Así se ve una semana
              <span className="block text-primary">con BOCAO.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Un menú pensado por nutricionistas y preparado por chefs, que rota semanalmente para mantener variedad, adherencia y sabor.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-border/60 bg-secondary/30">
        <div data-scroll-reveal-stagger className="container grid grid-cols-2 gap-4 py-10 md:grid-cols-4">
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <div key={cat.title} data-scroll-reveal="soft" className="text-center">
                <div className={cn("mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl", cat.color)}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-sm font-bold">{cat.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{cat.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Weekly menu */}
      <section className="container py-20">
        <div data-scroll-reveal="soft" className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Menú de la semana</h2>
          <p className="mt-3 text-muted-foreground">
            Cada semana renovamos las opciones. Aquí tienes un ejemplo de lo que podrías recibir.
          </p>
        </div>

        <div data-scroll-reveal-stagger className="space-y-6">
          {weekMenu.map((dayMenu) => (
            <Card key={dayMenu.day} data-scroll-reveal="soft" className="overflow-hidden border-border/70 p-0 shadow-soft">
              <div className="bg-gradient-hero p-5 text-primary-foreground">
                <h3 className="font-display text-xl font-bold">{dayMenu.day}</h3>
              </div>
              <div className="grid gap-px bg-border/40 md:grid-cols-2">
                {dayMenu.meals.map((meal) => {
                  const MealIcon = meal.icon;

                  return (
                    <div key={meal.name} className="flex items-start gap-4 bg-card p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                        <MealIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          {meal.type}
                        </div>
                        <h4 className="font-display text-base font-bold">{meal.name}</h4>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" /> {meal.kcal}
                          </span>
                          {meal.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Info banner */}
      <section className="bg-secondary/40 py-16">
        <div className="container">
          <div data-scroll-reveal="soft" className="mx-auto max-w-2xl text-center">
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary" />
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              El menú rota cada semana
            </h2>
            <p className="mt-3 text-muted-foreground">
              Nuestro equipo de nutrición diseña nuevos platos semanalmente para mantener variedad, evitar la monotonía y asegurar un aporte nutricional completo y balanceado.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <div
          data-scroll-reveal="hero"
          className="relative overflow-hidden rounded-[2rem] bg-gradient-hero p-10 text-primary-foreground shadow-elegant md:p-16"
        >
          <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-3xl font-extrabold md:text-4xl">
                ¿Quieres probar este menú?
              </h2>
              <p className="mt-3 max-w-xl text-primary-foreground/85">
                Elige tu plan y empieza a recibir comidas como estas cada semana.
              </p>
            </div>
            <Link
              href="/planes"
              className={cn(
                buttonVariants({ size: "xl" }),
                "bg-background text-primary hover:bg-background/90",
              )}
            >
              Ver planes <ChevronRight />
            </Link>
          </div>
        </div>
      </section>

    </PublicPageShell>
  );
}
