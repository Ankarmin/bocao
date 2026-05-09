"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronRight,
  Quote,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Mariana S.",
    role: "Consultora de estrategia",
    quote: "Dejé de pedir delivery al azar. Ahora como mejor, gasto menos tiempo y mantengo una rutina estable.",
    plan: "Plan Estándar",
    rating: 5,
    highlight: "Recuperó 5 horas semanales",
  },
  {
    name: "Diego R.",
    role: "Entrenador personal",
    quote: "Lo que más valoro es la consistencia: porciones claras, proteína suficiente y entregas que realmente llegan cuando dicen.",
    plan: "Plan Premium",
    rating: 5,
    highlight: "Ganó 3 kg de masa muscular en 2 meses",
  },
  {
    name: "Lucía M.",
    role: "Product manager",
    quote: "BOCAO me resolvió la semana. Ya no pienso qué cocinar ni termino comiendo cualquier cosa entre reuniones.",
    plan: "Plan Estándar",
    rating: 5,
    highlight: "Mejoró su alimentación en reuniones",
  },
  {
    name: "Carlos P.",
    role: "Arquitecto",
    quote: "Probé otros servicios de meal prep y ninguno se compara. La calidad de los ingredientes y el sabor son de otro nivel.",
    plan: "Plan Premium",
    rating: 5,
    highlight: "Bajó 4 kg en 6 semanas",
  },
  {
    name: "Ana V.",
    role: "Abogada corporativa",
    quote: "Mis almuerzos pasaron de snacks del kiosko a comidas reales. La diferencia en energía durante la tarde es brutal.",
    plan: "Plan Básico",
    rating: 5,
    highlight: "Más energía por las tardes",
  },
  {
    name: "Rodrigo K.",
    role: "Freelance de diseño",
    quote: "Como freelancer, mi horario es caótico. BOCAO me da estructura sin esfuerzo. Solo abro, caliento y listo.",
    plan: "Plan Estándar",
    rating: 4,
    highlight: "Estructura sin esfuerzo",
  },
  {
    name: "Valentina T.",
    role: "Médica residente",
    quote: "En mis guardias, la comida es lo último en lo que pienso. Tener BOCAO es tener una comida buena esperándome siempre.",
    plan: "Plan Premium",
    rating: 5,
    highlight: "Comida lista después de guardias",
  },
  {
    name: "Felipe A.",
    role: "CEO startup",
    quote: "Implementamos BOCAO para todo el equipo. Aumentó la satisfacción en almuerzos y redujimos los tiempos muertos al mediodía.",
    plan: "Plan corporativo",
    rating: 5,
    highlight: "Equipo más productivo",
  },
  {
    name: "Camila R.",
    role: "Nutricionista",
    quote: "Como profesional de la nutrición, apruebo la formulación de los platos. Buen balance de macros, sabor auténtico y sin ultraprocesados.",
    plan: "Plan Estándar",
    rating: 5,
    highlight: "Aprobado por profesionales",
  },
];

const impactStats = [
  { icon: Users, value: "+500", label: "Suscriptores activos" },
  { icon: Star, value: "4.9★", label: "Valoración promedio" },
  { icon: TrendingUp, value: "98%", label: "Tasa de repetición" },
];

export default function TestimoniosPage() {
  const [showAll, setShowAll] = useState(false);
  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-soft" />
        <div className="absolute -right-40 top-20 -z-10 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl" />

        <div className="container py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3 w-3" /> Historias reales
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Lo que cambia cuando
              <span className="block text-primary">dejas de improvisar.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Personas reales que usan BOCAO para recuperar tiempo, constancia y tranquilidad durante la semana.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/60 bg-secondary/30">
        <div className="container grid grid-cols-3 gap-6 py-12">
          {impactStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.label} className="text-center">
                <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-display text-2xl font-extrabold text-foreground md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="container py-20">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Voces de la comunidad BOCAO
          </h2>
          <p className="mt-3 text-muted-foreground">
            Cada testimonio representa una persona que decidió dejar de improvisar su alimentación.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleTestimonials.map((item) => (
            <Card
              key={item.name}
              className="group flex flex-col p-7 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant"
            >
              <Quote className="h-8 w-8 text-primary/30" />
              <p className="mt-4 flex-1 text-base leading-7 text-foreground/85">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Highlight badge */}
              <div className="mt-4 inline-flex self-start rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                {item.highlight}
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg font-bold">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-0.5">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />
                      ))}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{item.plan}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {!showAll && testimonials.length > 6 && (
          <div className="mt-10 text-center">
            <button
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}
              onClick={() => setShowAll(true)}
              type="button"
            >
              Ver más testimonios
            </button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-hero p-10 text-primary-foreground shadow-elegant md:p-16">
          <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-3xl font-extrabold md:text-4xl">
                Únete a la comunidad
              </h2>
              <p className="mt-3 max-w-xl text-primary-foreground/85">
                Empieza tu experiencia BOCAO hoy y sé parte de las historias que inspiran.
              </p>
            </div>
            <Link
              href="/planes"
              className={cn(
                buttonVariants({ size: "xl" }),
                "bg-background text-primary hover:bg-background/90",
              )}
            >
              Elegir mi plan <ChevronRight />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
