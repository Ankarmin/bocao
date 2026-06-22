"use client";

import Link from "next/link";
import {
  Award,
  ChevronRight,
  Globe,
  Heart,
  Leaf,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Target,
  Users,
  Utensils,
} from "lucide-react";

import { PublicPageShell } from "@/components/layout/public-page-shell";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Heart,
    title: "Bienestar real",
    text: "Creemos que comer bien no debería ser un lujo ni un sacrificio. Diseñamos cada plan para que sea sostenible, rico y accesible.",
  },
  {
    icon: Leaf,
    title: "Ingredientes honestos",
    text: "Trabajamos con productores locales, priorizamos ingredientes frescos de temporada y eliminamos ultraprocesados de nuestras recetas.",
  },
  {
    icon: ShieldCheck,
    title: "Transparencia total",
    text: "Cada comida incluye información nutricional clara: calorías, macros y alérgenos. Sin letra pequeña, sin sorpresas.",
  },
  {
    icon: Globe,
    title: "Impacto responsable",
    text: "Empaques sostenibles, rutas de entrega optimizadas y una operación diseñada para minimizar el desperdicio alimentario.",
  },
];

const milestones = [
  {
    icon: Lightbulb,
    year: "2023",
    title: "La idea nace",
    text: "Un grupo de nutricionistas y emprendedores se unen con la misión de resolver la alimentación semanal de personas ocupadas.",
  },
  {
    icon: Utensils,
    year: "2024",
    title: "Primera dark kitchen",
    text: "Abrimos nuestra primera cocina certificada y comenzamos las entregas piloto a 50 clientes en Lima.",
  },
  {
    icon: Rocket,
    year: "2025",
    title: "Crecimiento acelerado",
    text: "Más de 12,000 comidas entregadas, 3 dark kitchens operativas y una comunidad activa de suscriptores fieles.",
  },
  {
    icon: Target,
    year: "2026",
    title: "Expansión nacional",
    text: "Nuevos planes, más ciudades y tecnología propia para personalizar cada menú al detalle.",
  },
];

const teamStats = [
  { value: "+12k", label: "Comidas entregadas" },
  { value: "3", label: "Dark kitchens" },
  { value: "4.9★", label: "Valoración promedio" },
  { value: "98%", label: "Tasa de retención" },
];

export default function SobreNosotrosPage() {
  return (
    <PublicPageShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-soft" />
        <div className="absolute -right-40 top-20 -z-10 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -left-40 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />

        <div className="container py-20 md:py-28">
          <div data-scroll-reveal="hero" className="mx-auto max-w-3xl text-center">
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Comida que cuida,
              <span className="block text-primary">operación que escala.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              BOCAO nació de una convicción simple: nadie debería tener que elegir entre comer bien y vivir con prisa. Diseñamos una plataforma que planifica, cocina y entrega tu alimentación semanal con criterio nutricional y puntualidad operativa.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/60 bg-secondary/30">
        <div data-scroll-reveal-stagger className="container grid grid-cols-2 gap-6 py-12 md:grid-cols-4">
          {teamStats.map((stat) => (
            <div key={stat.label} data-scroll-reveal="soft" className="text-center">
              <div className="font-display text-3xl font-extrabold text-primary md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container py-20">
        <div data-scroll-reveal="soft" className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Lo que nos mueve</h2>
          <p className="mt-3 text-muted-foreground">
            Cada decisión en BOCAO parte de estos principios. Son nuestra brújula para diseñar menús, operar cocinas y entregar comidas.
          </p>
        </div>
        <div data-scroll-reveal-stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <Card
                key={value.title}
                data-scroll-reveal="soft"
                className="group border-border/70 p-6 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-smooth group-hover:bg-gradient-fresh group-hover:text-accent-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.text}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-secondary/40 py-20">
        <div className="container">
          <div data-scroll-reveal="soft" className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Nuestro camino</h2>
            <p className="mt-3 text-muted-foreground">
              Desde la primera receta hasta una operación de escala. Así hemos construido BOCAO.
            </p>
          </div>
          <div className="relative mx-auto max-w-3xl">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />

            <div data-scroll-reveal-stagger className="space-y-10">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={milestone.year}
                    data-scroll-reveal="soft"
                    className={cn(
                      "relative grid items-center gap-6 md:grid-cols-2",
                      isEven ? "md:text-right" : "md:direction-ltr",
                    )}
                  >
                    {/* Dot on the line */}
                    <div className="absolute left-6 top-1 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-primary md:left-1/2">
                      <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                    </div>

                    <Card
                      className={cn(
                        "ml-12 p-6 shadow-soft md:ml-0",
                        isEven ? "md:mr-8" : "md:col-start-2 md:ml-8",
                      )}
                    >
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
                        {milestone.year}
                      </div>
                      <h3 className="font-display text-xl font-bold">{milestone.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{milestone.text}</p>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container py-20">
        <div
          data-scroll-reveal="hero"
          className="relative overflow-hidden rounded-[2rem] bg-gradient-hero p-10 text-primary-foreground shadow-elegant md:p-16"
        >
          <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-white/5 blur-xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                <Users className="h-3 w-3" /> Equipo BOCAO
              </div>
              <h2 className="font-display text-3xl font-extrabold md:text-4xl">
                Nutricionistas, chefs y tecnología trabajando juntos
              </h2>
              <p className="mt-4 max-w-xl text-primary-foreground/85">
                Nuestro equipo combina expertise en nutrición clínica, cocina profesional y logística de última milla para entregar una experiencia sin fricción.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[Award, Heart, Utensils, Rocket].map((TeamIcon, i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-white/15"
                    >
                      <TeamIcon className="h-4 w-4" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-primary-foreground/80">+20 profesionales</span>
              </div>
            </div>
            <Link
              href="/planes"
              className={cn(
                buttonVariants({ size: "xl" }),
                "bg-background text-primary hover:bg-background/90",
              )}
            >
              Únete a BOCAO <ChevronRight />
            </Link>
          </div>
        </div>
      </section>

    </PublicPageShell>
  );
}
