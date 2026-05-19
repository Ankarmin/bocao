"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Activity, Target, UtensilsCrossed } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function FieldSelect({ placeholder, options }: { placeholder: string; options: Array<{ value: string; label: string }> }) {
  return (
    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" defaultValue="">
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default function ConfigurarPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") ?? "estandar";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container max-w-3xl py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-primary">Paso 1 de 3</p>
          <h1 className="mt-1 font-display text-3xl font-extrabold md:text-4xl">Tu perfil nutricional</h1>
          <p className="mt-2 text-muted-foreground">
            Cuentanos sobre ti para personalizar tu plan <strong className="capitalize">{planId}</strong>.
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6 shadow-soft">
            <div className="mb-5 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-bold">Datos biometricos</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Peso (kg)</label>
                <Input type="number" placeholder="70" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Talla (cm)</label>
                <Input type="number" placeholder="170" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Edad</label>
                <Input type="number" placeholder="28" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sexo</label>
                <FieldSelect
                  placeholder="Selecciona"
                  options={[
                    { value: "f", label: "Femenino" },
                    { value: "m", label: "Masculino" },
                    { value: "o", label: "Otro" },
                  ]}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <div className="mb-5 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-bold">Objetivos y actividad</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Objetivo nutricional</label>
                <FieldSelect
                  placeholder="Elige tu meta"
                  options={[
                    { value: "perder", label: "Perder grasa" },
                    { value: "mantener", label: "Mantener peso" },
                    { value: "ganar", label: "Ganar musculo" },
                    { value: "salud", label: "Mejorar salud general" },
                  ]}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nivel de actividad</label>
                <FieldSelect
                  placeholder="Selecciona"
                  options={[
                    { value: "sed", label: "Sedentario" },
                    { value: "lig", label: "Ligero (1-3 dias/sem)" },
                    { value: "mod", label: "Moderado (3-5 dias/sem)" },
                    { value: "alto", label: "Alto (6-7 dias/sem)" },
                  ]}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <div className="mb-5 flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-bold">Preferencias y restricciones</h3>
            </div>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Preferencia alimentaria</label>
                <FieldSelect
                  placeholder="Selecciona"
                  options={[
                    { value: "omn", label: "Omnivoro" },
                    { value: "veg", label: "Vegetariano" },
                    { value: "vgn", label: "Vegano" },
                    { value: "pesc", label: "Pescetariano" },
                  ]}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Alergias e intolerancias</label>
                <Textarea placeholder="Ej. gluten, lactosa, frutos secos" rows={3} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notas adicionales</label>
                <Textarea placeholder="Cuentanos cualquier preferencia o detalle relevante" rows={3} />
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-3">
            <Link href="/planes" className={buttonVariants({ variant: "ghost" })}>
              Volver
            </Link>
            <Link href={`/resumen?plan=${planId}`} className={cn(buttonVariants({ variant: "hero", size: "lg" }))}>
              Continuar al resumen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
