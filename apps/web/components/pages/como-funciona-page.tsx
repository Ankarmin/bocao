"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChefHat,
  ClipboardList,
  PackageCheck,
  Settings,
  Truck,
  UserCheck,
  Utensils,
  Zap,
} from "lucide-react";

import { PublicPageShell } from "@/components/layout/public-page-shell";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const mainSteps = [
  {
    icon: ClipboardList,
    step: 1,
    title: "Cuéntanos sobre ti",
    text: "Completa tu perfil nutricional: datos biométricos, objetivo (bajar grasa, ganar músculo, mantener) y restricciones alimentarias.",
    details: [
      "Quiz nutricional de 2 minutos",
      "Alergias y preferencias personalizadas",
      "Objetivos claros y medibles",
    ],
  },
  {
    icon: Utensils,
    step: 2,
    title: "Elige tu plan",
    text: "Selecciona entre Básico, Estándar o Premium según la cantidad de comidas y el nivel de personalización que necesitas.",
    details: [
      "3 planes flexibles",
      "Cambia o cancela cuando quieras",
      "Sin contratos de permanencia",
    ],
  },
  {
    icon: ChefHat,
    step: 3,
    title: "Cocinamos tu plan",
    text: "Nuestro equipo de chefs y nutricionistas prepara tus comidas frescas en dark kitchens certificadas con control de calidad.",
    details: [
      "Ingredientes frescos de temporada",
      "Protocolos de seguridad alimentaria",
      "Macros calculados por comida",
    ],
  },
  {
    icon: PackageCheck,
    step: 4,
    title: "Entregamos en tu puerta",
    text: "Recibe tus comidas listas para disfrutar, en empaques sostenibles y con instrucciones claras de almacenamiento y calentado.",
    details: [
      "Ventanas de entrega programadas",
      "Empaques eco-friendly",
      "Instrucciones de recalentado incluidas",
    ],
  },
];

const features = [
  {
    icon: Settings,
    title: "Personalización continua",
    text: "Tu plan evoluciona contigo. Puedes ajustar preferencias, porciones y objetivos desde tu cuenta en cualquier momento.",
  },
  {
    icon: Zap,
    title: "Operación puntual",
    text: "Despachamos por rutas y ventanas optimizadas. Tu comida llega cuando la necesitas, sin depender del azar.",
  },
  {
    icon: UserCheck,
    title: "Soporte nutricional",
    text: "Los planes Estándar y Premium incluyen acompañamiento con nutricionistas certificados para ajustar tu alimentación.",
  },
  {
    icon: Truck,
    title: "Logística inteligente",
    text: "Cada entrega se planifica con rutas optimizadas, control de temperatura y seguimiento en tiempo real.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <PublicPageShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-soft" />
        <div className="absolute -right-32 top-10 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="container py-20 md:py-28">
          <div data-scroll-reveal="hero" className="mx-auto max-w-3xl text-center">
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              De tu perfil a tu mesa,
              <span className="block text-primary">en 4 pasos.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Diseñamos un proceso sin fricción para que recibas comida saludable cada semana. Sin cocinar, sin compras, sin estrés.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="container py-20">
        <div data-scroll-reveal-stagger className="space-y-8">
          {mainSteps.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.step}
                data-scroll-reveal="soft"
                className={cn(
                  "grid items-center gap-8 md:grid-cols-2",
                  !isEven && "md:[direction:rtl]",
                )}
              >
                <Card className="relative overflow-hidden p-8 shadow-soft md:[direction:ltr]">
                  <div className="absolute right-5 top-4 font-display text-8xl font-extrabold text-primary/8">
                    {item.step}
                  </div>
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-hero text-primary-foreground">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-muted-foreground">{item.text}</p>
                </Card>

                <div className="space-y-4 md:[direction:ltr]">
                  {item.details.map((detail) => (
                    <div
                      key={detail}
                      className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <span className="text-sm font-medium text-foreground/85">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Extra features */}
      <section className="bg-secondary/40 py-20">
        <div className="container">
          <div data-scroll-reveal="soft" className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Más que un servicio de comida
            </h2>
            <p className="mt-3 text-muted-foreground">
              Cada detalle está pensado para que tu experiencia sea fluida de principio a fin.
            </p>
          </div>
          <div data-scroll-reveal-stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  data-scroll-reveal="soft"
                  className="group border-border/70 p-6 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-smooth group-hover:bg-gradient-hero group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.text}</p>
                </Card>
              );
            })}
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
                ¿Listo para empezar?
              </h2>
              <p className="mt-3 max-w-xl text-primary-foreground/85">
                Completa tu quiz nutricional en 2 minutos y recibe tu primer plan personalizado esta semana.
              </p>
            </div>
            <Link
              href="/configurar"
              className={cn(
                buttonVariants({ size: "xl" }),
                "bg-background text-primary hover:bg-background/90",
              )}
            >
              Empezar quiz nutricional
            </Link>
          </div>
        </div>
      </section>

    </PublicPageShell>
  );
}
