"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {
  Apple,
  ArrowRight,
  ChefHat,
  ChevronRight,
  ClipboardList,
  Flame,
  HeartPulse,
  Leaf,
  PackageCheck,
  Quote,
  Salad,
  Sparkles,
  Truck,
} from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PlansGrid } from "@/components/plans/plan-card";
import { useAuth } from "@/components/providers/auth-provider";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteAssets } from "@/lib/assets";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: HeartPulse,
    title: "Disenado por nutricionistas",
    text: "Cada plan se adapta a tus objetivos: bajar grasa, ganar musculo o vivir mejor.",
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
    icon: Sparkles,
    title: "100% personalizable",
    text: "Cambia preferencias, alergias y porciones cuando lo necesites.",
  },
];

const steps = [
  { icon: ClipboardList, title: "Cuentanos sobre ti", text: "Datos biometricos, objetivo y restricciones." },
  { icon: ChefHat, title: "Cocinamos tu plan", text: "Nuestras dark kitchens preparan tus comidas frescas." },
  { icon: PackageCheck, title: "Entregamos en tu puerta", text: "Recibe tus comidas listas para disfrutar." },
];

const menuHighlights = [
  {
    icon: Salad,
    day: "Lunes",
    title: "Bowl verde con pollo citrico",
    text: "Proteina limpia, quinua y vegetales frescos para arrancar la semana con energia.",
  },
  {
    icon: Flame,
    day: "Miercoles",
    title: "Curry thai de garbanzos",
    text: "Una opcion reconfortante, alta en fibra y con especias suaves balanceadas.",
  },
  {
    icon: Apple,
    day: "Viernes",
    title: "Wrap de pavo y hummus",
    text: "Perfecto para cerrar la semana con sabor, saciedad y una entrega facil de recalentar.",
  },
];

const differentiators = [
  {
    icon: Leaf,
    title: "Macros claros por comida",
    text: "Cada entrega llega con porciones, calorias y notas clave para que comas con criterio y sin improvisar.",
  },
  {
    icon: Truck,
    title: "Operacion puntual",
    text: "Despachamos por rutas y ventanas programadas para que tu semana no dependa del azar.",
  },
  {
    icon: ChefHat,
    title: "Cocina pensada para escalar",
    text: "El menu se diseña para mantener calidad, consistencia y seguridad alimentaria en cada lote.",
  },
];

const testimonials = [
  {
    name: "Mariana S.",
    role: "Consultora de estrategia",
    quote: "Deje de pedir delivery al azar. Ahora como mejor, gasto menos tiempo y mantengo una rutina estable.",
  },
  {
    name: "Diego R.",
    role: "Entrenador personal",
    quote: "Lo que mas valoro es la consistencia: porciones claras, proteina suficiente y entregas que realmente llegan cuando dicen.",
  },
  {
    name: "Lucia M.",
    role: "Product manager",
    quote: "BOCAO me resolvio la semana. Ya no pienso que cocinar ni termino comiendo cualquier cosa entre reuniones.",
  },
];

const faqs = [
  {
    question: "Que pasa si cambio mis objetivos?",
    answer: "Puedes ajustar tu perfil nutricional y tu plan se recalibra para las siguientes entregas sin rehacer todo el proceso.",
  },
  {
    question: "Puedo pausar o cancelar?",
    answer: "Si. Puedes pausar, reprogramar o cambiar de plan desde tu cuenta sin contratos de permanencia.",
  },
  {
    question: "Manejan alergias y restricciones?",
    answer: "Si. Registramos alergias, preferencias y observaciones de cocina para que cada lote llegue con instrucciones claras.",
  },
];

export default function HomePage() {
  const { isHydrated, session, signOut } = useAuth();

  useEffect(() => {
    if (!isHydrated || !session) {
      return;
    }

    if (session.role === "admin" || session.role === "kitchen") {
      signOut();
    }
  }, [isHydrated, session, signOut]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-soft" />
        <div className="absolute -right-32 top-10 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

        <div className="container grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-fade-in-up space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3 w-3" /> Suscripcion de comida saludable
            </span>
            <h1 className="font-display text-5xl font-extrabold leading-[1.12] tracking-tight md:text-6xl lg:text-7xl">
              Come bien.
              <span className="mt-1 block pb-1 text-primary">Vive mejor.</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              BOCAO planifica, cocina y entrega tu alimentacion semanal segun tus objetivos. Sin pensar en que cocinar. Sin compras.
              Sin estres.
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
                <div className="font-display text-2xl font-bold text-foreground">4.9*</div>
                valoracion promedio
              </div>
            </div>
          </div>

          <div className="relative">
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

      <section id="beneficios" className="container scroll-mt-28 py-20">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Nutricion real, sin complicaciones</h2>
          <p className="mt-3 text-muted-foreground">
            Olvidate de planificar, comprar y cocinar. Nosotros lo hacemos por ti.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <Card
                key={benefit.title}
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
      </section>

      <section id="como-funciona" className="scroll-mt-28 bg-secondary/40 py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Como funciona</h2>
            <p className="mt-3 text-muted-foreground">En 3 pasos tendras tu primera entrega semanal de BOCAO.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Card key={step.title} className="relative overflow-hidden p-7 shadow-soft">
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
        </div>
      </section>

      <section id="menu-semanal" className="container scroll-mt-28 py-20">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Asi se ve una semana con BOCAO</h2>
            <p className="mt-3 text-muted-foreground">
              Un menu rotativo, pensado para sostener adherencia, variedad y objetivos reales sin complicarte la agenda.
            </p>
          </div>
          <Link href="/planes" className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}>Ver menu de planes <ArrowRight /></Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {menuHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.day} className="overflow-hidden border-border/70 p-0 shadow-soft">
                <div className="bg-gradient-hero p-6 text-primary-foreground">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">{item.day}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold">{item.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Disenado para personas ocupadas, no para dietas perfectas</h2>
            <p className="mt-3 text-muted-foreground">
              BOCAO no solo entrega comida: ordena tu semana, reduce friccion y te da una estructura alimentaria sostenible.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {differentiators.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title} className="p-6 shadow-soft">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="planes" className="container scroll-mt-28 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Elige el plan ideal para ti</h2>
          <p className="mt-3 text-muted-foreground">Cambia o cancela tu plan cuando quieras. Sin contratos.</p>
        </div>
        <PlansGrid />
      </section>

      <section id="testimonios" className="container scroll-mt-28 py-20">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Lo que cambia cuando ya no tienes que resolver cada comida</h2>
          <p className="mt-3 text-muted-foreground">
            Historias de personas que usan BOCAO para recuperar tiempo, constancia y tranquilidad durante la semana.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name} className="p-7 shadow-soft">
              <Quote className="h-8 w-8 text-primary/30" />
              <p className="mt-4 text-base leading-7 text-foreground/85">{item.quote}</p>
              <div className="mt-6 border-t border-border pt-4">
                <div className="font-display text-lg font-bold">{item.name}</div>
                <div className="text-sm text-muted-foreground">{item.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="faq" className="container scroll-mt-28 pb-20">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Preguntas frecuentes</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Lo esencial para entender como funciona el servicio antes de empezar tu primera semana.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((item) => (
              <Card key={item.question} className="p-6 shadow-soft">
                <h3 className="font-display text-xl font-bold">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-hero p-10 text-primary-foreground shadow-elegant md:p-16">
          <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-3xl font-extrabold md:text-4xl">Tu proxima comida saludable empieza hoy</h2>
              <p className="mt-3 max-w-xl text-primary-foreground/85">
                Unete a la comunidad BOCAO y recibe tu primer plan personalizado esta semana.
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

      <SiteFooter />
    </div>
  );
}
