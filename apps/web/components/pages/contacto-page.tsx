"use client";

import { useState } from "react";
import {
  ChevronDown,
  Clock,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

import { PublicPageShell } from "@/components/layout/public-page-shell";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    detail: "hola@bocao.pe",
    description: "Respondemos en menos de 24 horas.",
  },
  {
    icon: Phone,
    title: "WhatsApp",
    detail: "+51 999 123 456",
    description: "Lun–Vie, 9:00 am – 6:00 pm.",
  },
  {
    icon: MapPin,
    title: "Oficina",
    detail: "Lima, Perú",
    description: "Miraflores, Av. Pardo 620.",
  },
  {
    icon: Clock,
    title: "Horario",
    detail: "Lun–Vie",
    description: "9:00 am – 6:00 pm (GMT-5).",
  },
];

const faqs = [
  {
    question: "¿Qué pasa si cambio mis objetivos?",
    answer: "Puedes ajustar tu perfil nutricional y tu plan se recalibra para las siguientes entregas sin rehacer todo el proceso.",
  },
  {
    question: "¿Puedo pausar o cancelar?",
    answer: "Sí. Puedes pausar, reprogramar o cambiar de plan desde tu cuenta sin contratos de permanencia.",
  },
  {
    question: "¿Manejan alergias y restricciones?",
    answer: "Sí. Registramos alergias, preferencias y observaciones de cocina para que cada lote llegue con instrucciones claras.",
  },
  {
    question: "¿En qué zonas entregan?",
    answer: "Actualmente cubrimos Lima Metropolitana con entregas programadas. Estamos expandiéndonos a nuevas ciudades pronto.",
  },
  {
    question: "¿Los empaques son reciclables?",
    answer: "Sí. Todos nuestros empaques son reciclables o compostables. Estamos comprometidos con la sostenibilidad.",
  },
  {
    question: "¿Puedo elegir platos específicos?",
    answer: "Los planes incluyen un menú curado por nutricionistas, pero puedes indicar preferencias y exclusiones para personalizar tu experiencia.",
  },
];

export default function ContactoPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setFormState({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <PublicPageShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-soft" />
        <div className="absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />

        <div className="container py-20 md:py-28">
          <div data-scroll-reveal="hero" className="mx-auto max-w-3xl text-center">
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              ¿Tienes preguntas?
              <span className="block text-primary">Estamos para ayudarte.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Escríbenos por el canal que prefieras. Nuestro equipo te responderá lo antes posible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact methods */}
      <section className="border-y border-border/60 bg-secondary/30">
        <div data-scroll-reveal-stagger className="container grid grid-cols-2 gap-4 py-10 md:grid-cols-4">
          {contactMethods.map((method) => {
            const Icon = method.icon;

            return (
              <div key={method.title} data-scroll-reveal="soft" className="text-center">
                <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-sm font-bold">{method.title}</h3>
                <p className="text-sm font-semibold text-foreground">{method.detail}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{method.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Form + FAQ */}
      <section className="container py-20">
        <div data-scroll-reveal-stagger className="grid gap-12 lg:grid-cols-2">
          {/* Contact form */}
          <div data-scroll-reveal="soft">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Envíanos un mensaje</h2>
            <p className="mt-3 text-muted-foreground">
              Completa el formulario y te responderemos en menos de 24 horas.
            </p>

            {submitted ? (
              <Card className="mt-8 p-8 text-center shadow-soft">
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Send className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold">¡Mensaje enviado!</h3>
                <p className="mt-2 text-muted-foreground">
                  Gracias por escribirnos. Nuestro equipo se pondrá en contacto contigo pronto.
                </p>
                <button
                  className={cn(buttonVariants({ variant: "outline" }), "mt-6")}
                  onClick={() => setSubmitted(false)}
                  type="button"
                >
                  Enviar otro mensaje
                </button>
              </Card>
            ) : (
              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-sm font-medium">
                      Nombre
                    </label>
                    <Input
                      id="contact-name"
                      placeholder="Tu nombre"
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-sm font-medium">
                      Correo
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="tu@correo.com"
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="text-sm font-medium">
                    Asunto
                  </label>
                  <Input
                    id="contact-subject"
                    placeholder="¿En qué podemos ayudarte?"
                    value={formState.subject}
                    onChange={(e) => setFormState((s) => ({ ...s, subject: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-sm font-medium">
                    Mensaje
                  </label>
                  <Textarea
                    id="contact-message"
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    required
                  />
                </div>
                <button className={cn(buttonVariants({ variant: "hero", size: "lg" }), "w-full")} type="submit">
                  <Send className="mr-2 h-4 w-4" /> Enviar mensaje
                </button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div data-scroll-reveal="soft">
            <div className="mb-8 flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Preguntas frecuentes</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <Card
                  key={faq.question}
                  className="cursor-pointer overflow-hidden shadow-sm transition-smooth hover:shadow-soft"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between p-5">
                    <h3 className="pr-4 font-display text-base font-bold">{faq.question}</h3>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                        openFaq === index && "rotate-180",
                      )}
                    />
                  </div>
                  <div
                    className={cn(
                      "grid transition-all duration-300",
                      openFaq === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-border/60 px-5 pb-5 pt-4 text-sm leading-7 text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map-like banner */}
      <section className="bg-secondary/40 py-16">
        <div className="container">
          <div
            data-scroll-reveal="hero"
            className="relative overflow-hidden rounded-[2rem] bg-gradient-hero p-10 text-primary-foreground shadow-elegant md:p-16"
          >
            <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-white/5 blur-xl" />
            <div className="relative text-center">
              <Sparkles className="mx-auto mb-4 h-8 w-8" />
              <h2 className="font-display text-3xl font-extrabold md:text-4xl">
                Operamos en Lima Metropolitana
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">
                Entregas programadas en Miraflores, San Isidro, Surco, La Molina, Barranco, San Borja y más distritos. Pronto en nuevas ciudades.
              </p>
            </div>
          </div>
        </div>
      </section>

    </PublicPageShell>
  );
}
