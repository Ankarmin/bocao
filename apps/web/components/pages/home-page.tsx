"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChefHat,
  ChevronRight,
  ClipboardList,
  HeartPulse,
  PackageCheck,
  Quote,
  Salad,
  Star,
  Truck,
} from "lucide-react";

import { PublicPageShell } from "@/components/layout/public-page-shell";
import { PlansGrid } from "@/components/plans/plan-card";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteAssets } from "@/lib/assets";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: HeartPulse,
    title: "Diseñado por nutricionistas",
    text: "Cada plan se adapta a tus objetivos: bajar grasa, ganar músculo o vivir mejor.",
  },
  {
    icon: Salad,
    title: "Ingredientes frescos",
    text: "Trabajamos con productores locales y dark kitchens certificadas.",
  },
  {
    icon: Truck,
    title: "Entrega programada",
    text: "Tus comidas llegan listas, frescas y en empaques sostenibles.",
  },
  {
    icon: Salad,
    title: "100% personalizable",
    text: "Cambia preferencias, alergias y porciones cuando lo necesites.",
  },
];

const steps = [
  { icon: ClipboardList, title: "Cuéntanos sobre ti", text: "Datos biométricos, objetivo y restricciones." },
  { icon: ChefHat, title: "Cocinamos tu plan", text: "Nuestras dark kitchens preparan tus comidas frescas." },
  { icon: PackageCheck, title: "Entregamos en tu puerta", text: "Recibe tus comidas listas para disfrutar." },
];

const testimonials = [
  {
    name: "Mariana S.",
    role: "Consultora de estrategia",
    quote: "Dejé de pedir delivery al azar. Ahora como mejor, gasto menos tiempo y mantengo una rutina estable.",
  },
  {
    name: "Diego R.",
    role: "Entrenador personal",
    quote: "Lo que más valoro es la consistencia: porciones claras, proteína suficiente y entregas puntuales.",
  },
  {
    name: "Lucía M.",
    role: "Product manager",
    quote: "BOCAO me resolvió la semana. Ya no pienso qué cocinar ni termino comiendo cualquier cosa entre reuniones.",
  },
];

export default function HomePage() {
  return (
    <PublicPageShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-soft" />
        <div className="absolute -right-32 top-10 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

        <div data-scroll-reveal-stagger className="container grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div data-scroll-reveal="hero" className="space-y-6">
            <h1 className="font-display text-5xl font-extrabold leading-[1.12] tracking-tight md:text-6xl lg:text-7xl">
              Come bien.
              <span className="mt-1 block pb-1 text-primary">Vive mejor.</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              BOCAO planifica, cocina y entrega tu alimentación semanal según tus objetivos. Sin pensar en qué cocinar. Sin compras.
              Sin estrés.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/planes" className={buttonVariants({ variant: "hero", size: "xl" })}>
                Ver planes <ChevronRight />
              </Link>
              <Link href="/configurar" className={buttonVariants({ variant: "outline", size: "xl" })}>
                Probar el quiz nutricional
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div>
                <div className="font-display text-2xl font-bold text-foreground">+12k</div>
                comidas entregadas
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <div className="font-display text-2xl font-bold text-foreground">4.9★</div>
                valoración promedio
              </div>
            </div>
          </div>

          <div data-scroll-reveal="hero" className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-hero opacity-20 blur-2xl" />
            <Image
              src={siteAssets.heroMeals}
              alt="Bowls saludables BOCAO con pollo, quinua, palta y kale"
              className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-elegant"
              height={siteAssets.heroMealsHeight}
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              width={siteAssets.heroMealsWidth}
            />
          </div>
        </div>
      </section>

      {/* Benefits (condensed) */}
      <section className="container py-20">
        <div data-scroll-reveal="soft" className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Nutrición real, sin complicaciones</h2>
          <p className="mt-3 text-muted-foreground">
            Olvídate de planificar, comprar y cocinar. Nosotros lo hacemos por ti.
          </p>
        </div>
        <div data-scroll-reveal-stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <Card
                key={benefit.title}
                data-scroll-reveal="soft"
                className="group border-border/70 p-6 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-smooth group-hover:bg-gradient-fresh group-hover:text-accent-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{benefit.text}</p>
              </Card>
            );
          })}
        </div>
        <div data-scroll-reveal="soft" className="mt-8 text-center">
          <Link href="/sobre-nosotros" className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}>
            Conoce más sobre BOCAO <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* How it works (condensed) */}
      <section className="bg-secondary/40 py-20">
        <div className="container">
          <div data-scroll-reveal="soft" className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Cómo funciona</h2>
            <p className="mt-3 text-muted-foreground">En 3 pasos tendrás tu primera entrega semanal de BOCAO.</p>
          </div>
          <div data-scroll-reveal-stagger className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Card key={step.title} data-scroll-reveal="soft" className="relative overflow-hidden p-7 shadow-soft">
                  <div className="absolute right-5 top-4 font-display text-7xl font-extrabold text-primary/10">{index + 1}</div>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-hero text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
                </Card>
              );
            })}
          </div>
          <div data-scroll-reveal="soft" className="mt-8 text-center">
            <Link href="/como-funciona" className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}>
              Ver proceso completo <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Plans preview */}
      <section className="container py-20">
        <div data-scroll-reveal="soft" className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Elige el plan ideal para ti</h2>
          <p className="mt-3 text-muted-foreground">Cambia o cancela tu plan cuando quieras. Sin contratos.</p>
        </div>
        <PlansGrid />
      </section>

      {/* Testimonials preview */}
      <section className="bg-secondary/40 py-20">
        <div className="container">
          <div data-scroll-reveal="soft" className="mb-12 max-w-2xl">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Lo que dicen nuestros suscriptores</h2>
            <p className="mt-3 text-muted-foreground">
              Historias de personas que usan BOCAO para recuperar tiempo y constancia.
            </p>
          </div>
          <div data-scroll-reveal-stagger className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item.name} data-scroll-reveal="soft" className="p-7 shadow-soft">
                <Quote className="h-8 w-8 text-primary/30" />
                <p className="mt-4 text-base leading-7 text-foreground/85">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display text-lg font-bold">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.role}</div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
              ))}
          </div>
          <div data-scroll-reveal="soft" className="mt-8 text-center">
            <Link href="/testimonios" className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}>
              Ver más testimonios <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container py-20">
        <div
          data-scroll-reveal="hero"
          className="relative overflow-hidden rounded-[2rem] bg-gradient-hero p-10 text-primary-foreground shadow-elegant md:p-16"
        >
          <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-3xl font-extrabold md:text-4xl">Tu próxima comida saludable empieza hoy</h2>
              <p className="mt-3 max-w-xl text-primary-foreground/85">
                Únete a la comunidad BOCAO y recibe tu primer plan personalizado esta semana.
              </p>
            </div>
            <Link
              href="/planes"
              className={cn(buttonVariants({ size: "xl" }), "bg-background text-primary hover:bg-background/90")}
            >
              Empezar ahora
            </Link>
          </div>
        </div>
      </section>

    </PublicPageShell>
  );
}
