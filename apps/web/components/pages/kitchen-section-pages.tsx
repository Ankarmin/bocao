"use client";

import type { ComponentType } from "react";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  MapPin,
  Package,
  Printer,
  QrCode,
  Scale,
  TrendingUp,
  User,
  Users,
  Utensils,
  X,
} from "lucide-react";

import { RoleWorkspace } from "@/components/layout/role-workspace";
import type { SidebarLink } from "@/components/layout/role-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  tone: string;
};

const kitchenLinks: SidebarLink[] = [
  { href: "/cocina", label: "Bandeja de ordenes", icon: "package" },
  { href: "/cocina/produccion", label: "Produccion", icon: "chef-hat" },
  { href: "/cocina/etiquetas", label: "Etiquetado", icon: "tag" },
  { href: "/cocina/lotes", label: "Estado de lotes", icon: "list-checks" },
];

function batchPriorityBadge(priority: string) {
  return priority === "high" ? (
    <Badge className="bg-primary text-primary-foreground hover:bg-primary">Alta prioridad</Badge>
  ) : (
    <Badge className="bg-warning/15 text-warning hover:bg-warning/15">Prioridad media</Badge>
  );
}

function routeLabelStatus(status: string) {
  if (status === "ready") {
    return <Badge className="bg-accent-soft text-accent hover:bg-accent-soft">Listo</Badge>;
  }
  if (status === "printing") {
    return <Badge className="bg-warning/15 text-warning hover:bg-warning/15">Imprimiendo</Badge>;
  }
  return <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">Pendiente</Badge>;
}

function MetricCard({ label, value, icon: Icon, tone }: MetricCardProps) {
  return (
    <Card className="p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className={cn("mt-3 font-display text-4xl font-extrabold", tone)}>{value}</div>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary/70">
          <Icon className={cn("h-5 w-5", tone)} />
        </div>
      </div>
    </Card>
  );
}

const kitchenBatches = [
  { id: "LOTE-001", route: "RUTA-001", zone: "San Isidro / Miraflores", orders: 18, deadline: "10:00 AM", priority: "high", status: "assigned", profiles: ["Estandar", "Premium", "Vegetariano"], completed: 12, inProgress: 4, pending: 2 },
  { id: "LOTE-002", route: "RUTA-002", zone: "Surco / La Molina", orders: 22, deadline: "09:30 AM", priority: "medium", status: "assigned", profiles: ["Estandar", "Basico"], completed: 8, inProgress: 6, pending: 8 },
  { id: "LOTE-003", route: "RUTA-003", zone: "Barranco / Chorrillos", orders: 16, deadline: "11:00 AM", priority: "high", status: "assigned", profiles: ["Estandar", "Premium"], completed: 5, inProgress: 5, pending: 6 },
  { id: "LOTE-004", route: "RUTA-004", zone: "Jesus Maria / Lince", orders: 20, deadline: "10:30 AM", priority: "medium", status: "pending", profiles: ["Estandar", "Basico", "Vegetariano"], completed: 0, inProgress: 0, pending: 20 },
];

const productionOrdersData = [
  {
    id: "PED-001",
    customer: "Juan Perez",
    address: "Av. Pardo 456, Dpto 301, Miraflores",
    profile: { calories: 2100, protein: 140, carbs: 210, fats: 70, restrictions: ["Sin lactosa", "Bajo en sodio"], allergies: "Lacteos" },
    meals: [
      { name: "Bowl verde con pollo cítrico", recipe: "Pollo grillado + quinua + palta + vegetales verdes", ingredients: [{ item: "Pechuga de pollo", quantity: "200g" }, { item: "Quinua cocida", quantity: "150g" }, { item: "Palta", quantity: "1/2 unidad" }, { item: "Mix verde", quantity: "100g" }, { item: "Aderezo cítrico", quantity: "30ml" }], calories: 520, notes: "Verificar ausencia de lacteos en aderezo. Usar leche de coco como sustituto si es necesario." },
      { name: "Crema de zapallo con tostadas", recipe: "Zapallo loche + cebolla + ajo + caldo de vegetales", ingredients: [{ item: "Zapallo loche", quantity: "300g" }, { item: "Cebolla", quantity: "50g" }, { item: "Ajo", quantity: "2 dientes" }, { item: "Caldo vegetal", quantity: "200ml" }, { item: "Pan integral", quantity: "2 rebanadas" }, { item: "Aceite de oliva", quantity: "10ml" }], calories: 380, notes: "Tostadas sin mantequilla." },
    ],
  },
  {
    id: "PED-002",
    customer: "Ana Lopez",
    address: "Jr. Salaverry 890, Jesus Maria",
    profile: { calories: 1800, protein: 120, carbs: 180, fats: 60, restrictions: ["Vegano", "Sin gluten"], allergies: "Gluten, Mariscos" },
    meals: [
      { name: "Curry thai de garbanzos", recipe: "Garbanzos + leche de coco + verduras + especias thai", ingredients: [{ item: "Garbanzos cocidos", quantity: "200g" }, { item: "Leche de coco", quantity: "150ml" }, { item: "Pimiento rojo", quantity: "80g" }, { item: "Curry thai", quantity: "15g" }, { item: "Arroz jazmin", quantity: "150g" }], calories: 480, notes: "Confirmar que el curry thai no contenga trazas de gluten ni productos animales." },
    ],
  },
];

const labelingRoutesData = [
  { id: "RUTA-001", zone: "San Isidro / Miraflores", orders: 18, batch: "LOTE-001", status: "ready" },
  { id: "RUTA-002", zone: "Surco / La Molina", orders: 22, batch: "LOTE-002", status: "printing" },
  { id: "RUTA-003", zone: "Barranco / Chorrillos", orders: 16, batch: "LOTE-003", status: "pending" },
  { id: "RUTA-004", zone: "Jesus Maria / Lince", orders: 20, batch: "LOTE-004", status: "pending" },
];

const sampleLabelsData = [
  { orderId: "PED-001", customer: "Juan Perez", address: "Av. Pardo 456, Dpto 301, Miraflores", phone: "+51 999 111 222", route: "RUTA-001", sequence: 14, deliveryTime: "9:00 - 12:00 AM", meals: ["Bowl verde con pollo", "Crema de zapallo"], restrictions: ["Sin lactosa", "Bajo en sodio"], allergies: "Lacteos" },
  { orderId: "PED-002", customer: "Ana Lopez", address: "Jr. Salaverry 890, Jesus Maria", phone: "+51 988 777 666", route: "RUTA-004", sequence: 4, deliveryTime: "9:00 - 12:00 AM", meals: ["Curry thai de garbanzos"], restrictions: ["Vegano", "Sin gluten"], allergies: "Gluten, Mariscos" },
];

const lotesData = [
  { id: "LOTE-001", route: "RUTA-001", zone: "San Isidro / Miraflores", orders: 18, completed: 12, inProgress: 4, pending: 2, status: "assigned", estimatedCompletion: "10:45 AM", deadline: "10:00 AM" },
  { id: "LOTE-002", route: "RUTA-002", zone: "Surco / La Molina", orders: 22, completed: 22, inProgress: 0, pending: 0, status: "completed", estimatedCompletion: "09:15 AM", deadline: "09:30 AM" },
  { id: "LOTE-003", route: "RUTA-003", zone: "Barranco / Chorrillos", orders: 16, completed: 5, inProgress: 5, pending: 6, status: "assigned", estimatedCompletion: "11:30 AM", deadline: "11:00 AM" },
  { id: "LOTE-004", route: "RUTA-004", zone: "Jesus Maria / Lince", orders: 20, completed: 0, inProgress: 0, pending: 20, status: "pending", estimatedCompletion: "12:00 PM", deadline: "10:30 AM" },
];
export function KitchenOrdersPage() {
  const [feedback, setFeedback] = useState("");

  const batches = kitchenBatches;

  const totalPedidos = batches.reduce((s, b) => s + b.orders, 0);
  const enProgreso = batches.reduce((s, b) => s + b.inProgress, 0);
  const pendientes = batches.reduce((s, b) => s + b.pending, 0);
  const completados = batches.reduce((s, b) => s + b.completed, 0);
  const uniqueRoutes = [...new Set(batches.map((b) => b.route))];
  const uniqueProfiles = [...new Set(batches.flatMap((b) => b.profiles))];

  return (
    <RoleWorkspace
      roleTitle="Dark Kitchen"
      links={kitchenLinks}
      title="Bandeja de ordenes"
      subtitle="Lotes de produccion asignados para hoy, con prioridad, zona y perfiles nutricionales."
    >
      {feedback ? (
        <div className="mb-6 rounded-xl border border-accent/30 bg-accent/5 p-4">
          <p className="text-sm font-medium text-accent">{feedback}</p>
          <button className="mt-1 text-xs text-muted-foreground hover:underline" onClick={() => setFeedback("")} type="button">
            Cerrar
          </button>
        </div>
      ) : null}
      <div className="grid gap-5 md:grid-cols-4">
        {[
          { label: "Pedidos totales", value: totalPedidos.toString(), icon: Package, tone: "text-primary" },
          { label: "En progreso", value: enProgreso.toString(), icon: Clock, tone: "text-warning" },
          { label: "Pendientes", value: pendientes.toString(), icon: Users, tone: "text-primary" },
          { label: "Completados hoy", value: completados.toString(), icon: CheckCircle, tone: "text-accent" },
        ].map((stat) => {
          const Icon = stat.icon;
          return <MetricCard key={stat.label} icon={Icon} label={stat.label} tone={stat.tone} value={stat.value} />;
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {batches.map((batch) => (
            <Card key={batch.id} className={cn("p-6 shadow-soft", batch.priority === "high" ? "ring-1 ring-primary/25" : undefined)}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl text-white", batch.priority === "high" ? "bg-primary" : "bg-accent")}>
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl font-bold">{batch.id}</h3>
                      {batchPriorityBadge(batch.priority)}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">Ruta {batch.route} · {batch.zone}</p>
                  </div>
                </div>
                <Badge className={batch.status === "assigned" ? "bg-primary text-primary-foreground hover:bg-primary" : batch.status === "completed" ? "bg-accent-soft text-accent hover:bg-accent-soft" : "bg-secondary text-secondary-foreground hover:bg-secondary"}>
                  {batch.status === "assigned" ? "Asignado" : batch.status === "completed" ? "Listo" : "Pendiente"}
                </Badge>
              </div>

              <div className="mt-5 grid gap-4 rounded-2xl bg-secondary/40 p-4 md:grid-cols-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-muted-foreground">Zona</div>
                    <div className="font-medium">{batch.zone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Package className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-muted-foreground">Pedidos</div>
                    <div className="font-display text-xl font-bold text-primary">{batch.orders}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-warning" />
                  <div>
                    <div className="text-muted-foreground">Hora limite</div>
                    <div className="font-display text-xl font-bold text-primary">{batch.deadline}</div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h4 className="text-sm font-semibold text-muted-foreground">Perfiles nutricionales incluidos</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {batch.profiles.map((profile) => (
                    <span key={profile} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">{profile}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/cocina/produccion" className={buttonVariants({ variant: "hero" })}>
                  Ver produccion <ChevronRight />
                </Link>
                <Button variant="outline" onClick={() => setFeedback("Lista descargada: produccion_" + batch.id + ".csv")}>
                  <Download /> Descargar lista
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Horario de produccion</h3>
            <div className="mt-4 space-y-3">
              {[
                { time: "06:00 - 08:00", status: "active", label: "Lotes prioritarios" },
                { time: "08:00 - 10:00", status: "upcoming", label: "Lotes estandar" },
                { time: "10:00 - 12:00", status: "upcoming", label: "Lotes adicionales" },
              ].map((slot) => (
                <div key={slot.time} className={cn("rounded-2xl border p-4", slot.status === "active" ? "border-accent bg-accent-soft/50" : "border-border")}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{slot.time}</span>
                    {slot.status === "active" ? <Badge className="bg-accent text-accent-foreground hover:bg-accent">Activo</Badge> : null}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">{slot.label}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Resumen del dia</h3>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Lotes asignados</span><span>{batches.length}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Rutas asociadas</span><span>{uniqueRoutes.length}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Perfiles diferentes</span><span>{uniqueProfiles.length}</span></div>
            </div>
          </Card>

          <Card className="bg-gradient-hero p-6 text-primary-foreground shadow-elegant">
            <h3 className="font-display text-lg font-bold">Estado de cocina</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-primary-foreground/80">Capacidad utilizada</span><span>{Math.round(totalPedidos > 0 ? (completados / totalPedidos) * 100 : 0)}%</span></div>
              <div className="flex justify-between"><span className="text-primary-foreground/80">Tiempo promedio por lote</span><span>85 min</span></div>
              <div className="flex justify-between"><span className="text-primary-foreground/80">Eficiencia</span><span>{totalPedidos > 0 ? Math.round((completados / totalPedidos) * 100) : 0}%</span></div>
            </div>
          </Card>
        </div>
      </div>
    </RoleWorkspace>
  );
}

export function KitchenProductionPage() {
  const activeLot = kitchenBatches[0]
    ? {
        id: kitchenBatches[0].id,
        route: kitchenBatches[0].route,
        zone: kitchenBatches[0].zone,
        deadline: kitchenBatches[0].deadline,
        orders: kitchenBatches[0].orders,
      }
    : null;

  const productionOrders = productionOrdersData;

  return (
    <RoleWorkspace
      roleTitle="Dark Kitchen"
      links={kitchenLinks}
      title="Produccion"
      subtitle="Requerimientos nutricionales, ingredientes y observaciones para cada pedido del lote activo."
      actions={<Link href="/cocina/etiquetas" className={buttonVariants({ variant: "hero" })}>Ir a etiquetado</Link>}
    >
      <Card className="p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-secondary/40 p-4 text-center">
            <div className="font-display text-3xl font-extrabold text-primary">{activeLot?.orders ?? '-'}</div>
            <div className="mt-1 text-sm text-muted-foreground">Pedidos</div>
          </div>
          <div className="rounded-2xl bg-secondary/40 p-4 text-center">
            <div className="font-display text-3xl font-extrabold text-primary">{activeLot?.route ?? '-'}</div>
            <div className="mt-1 text-sm text-muted-foreground">Ruta</div>
          </div>
          <div className="rounded-2xl bg-secondary/40 p-4 text-center">
            <div className="font-display text-xl font-extrabold text-primary">{activeLot?.zone ?? '-'}</div>
            <div className="mt-1 text-sm text-muted-foreground">Zona</div>
          </div>
          <div className="rounded-2xl bg-primary p-4 text-center text-primary-foreground">
            <div className="font-display text-3xl font-extrabold">{activeLot?.deadline ?? '-'}</div>
            <div className="mt-1 text-sm text-primary-foreground/80">Hora limite</div>
          </div>
        </div>
      </Card>

      <div className="mt-6 space-y-6">
        {productionOrders.map((order) => (
          <Card key={order.id} className="p-6 shadow-soft md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{order.id}</h3>
                  <p className="mt-1 font-medium text-foreground">{order.customer}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{order.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Card className="bg-gradient-hero p-6 text-primary-foreground shadow-elegant">
                <h4 className="font-display text-lg font-bold">Perfil nutricional</h4>
                <div className="mt-4 grid grid-cols-4 gap-4 text-center text-sm">
                  <div><div className="font-display text-2xl font-bold">{order.profile.calories}</div><div className="text-primary-foreground/80">Kcal</div></div>
                  <div><div className="font-display text-2xl font-bold">{order.profile.protein}g</div><div className="text-primary-foreground/80">Proteina</div></div>
                  <div><div className="font-display text-2xl font-bold">{order.profile.carbs}g</div><div className="text-primary-foreground/80">Carbs</div></div>
                  <div><div className="font-display text-2xl font-bold">{order.profile.fats}g</div><div className="text-primary-foreground/80">Grasas</div></div>
                </div>
              </Card>

              <div>
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-display text-lg font-bold">
                    <AlertTriangle className="h-5 w-5 text-primary" /> Restricciones
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {order.profile.restrictions.map((restriction) => (
                      <span key={restriction} className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{restriction}</span>
                    ))}
                  </div>
                </div>

                {order.profile.allergies !== "Ninguna" ? (
                  <div className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                    <div className="font-semibold">Alerta de alergia</div>
                    <div className="mt-1">{order.profile.allergies}</div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <h4 className="font-display text-lg font-bold">Comidas del pedido</h4>
              {order.meals.map((meal) => (
                <div key={`${order.id}-${meal.name}`} className="rounded-2xl border border-border p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Utensils className="mt-1 h-5 w-5 text-accent" />
                      <div>
                        <div className="font-display text-lg font-bold">{meal.name}</div>
                        <div className="text-sm text-muted-foreground">{meal.recipe}</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold">{meal.calories} kcal</span>
                  </div>

                  <div className="mt-4 rounded-2xl bg-secondary/40 p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <Scale className="h-4 w-4" /> Ingredientes y porciones
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {meal.ingredients.map((ingredient) => (
                        <div key={`${meal.name}-${ingredient.item}`} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{ingredient.item}</span>
                          <span className="font-medium">{ingredient.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-warning/20 bg-warning/10 p-4 text-sm">
                    <div className="font-semibold text-foreground">Observaciones especiales</div>
                    <div className="mt-1 text-muted-foreground">{meal.notes}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </RoleWorkspace>
  );
}

export function KitchenLabelingPage() {
  const [feedback, setFeedback] = useState("");

  const labelingRoutes = labelingRoutesData;

  const sampleLabels = sampleLabelsData;

  const printedCount = labelingRoutes.filter((l) => l.status === "ready").reduce((s, l) => s + l.orders, 0);
  const pendingCount = labelingRoutes.reduce((s, l) => s + l.orders, 0) - printedCount;
  const processedRoutes = labelingRoutes.filter((l) => l.status === "ready").length;

  return (
    <RoleWorkspace
      roleTitle="Dark Kitchen"
      links={kitchenLinks}
      title="Etiquetado"
      subtitle="Genera, imprime y valida etiquetas termicas por ruta antes de despacho."
    >
      {feedback ? (
        <div className="mb-6 rounded-xl border border-accent/30 bg-accent/5 p-4">
          <p className="text-sm font-medium text-accent">{feedback}</p>
          <button className="mt-1 text-xs text-muted-foreground hover:underline" onClick={() => setFeedback("")} type="button">
            Cerrar
          </button>
        </div>
      ) : null}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="shadow-soft">
            <div className="border-b border-border p-5">
              <h3 className="font-display text-lg font-bold">Rutas disponibles para etiquetado</h3>
            </div>
            <div className="space-y-4 p-6">
              {labelingRoutes.map((route) => (
                <div key={route.id} className="rounded-2xl border border-border p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-display text-xl font-bold">{route.id}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{route.zone}</p>
                        <p className="mt-1 text-xs text-muted-foreground">Lote: {route.batch}</p>
                      </div>
                    </div>
                    {routeLabelStatus(route.status)}
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-2xl bg-secondary/40 p-4 text-sm">
                      <QrCode className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-muted-foreground">Pedidos en ruta</div>
                        <div className="font-display text-2xl font-bold text-primary">{route.orders}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl bg-secondary/40 p-4 text-sm">
                      <Printer className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-muted-foreground">Etiquetas a imprimir</div>
                        <div className="font-display text-2xl font-bold text-primary">{route.orders * 2}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button variant="hero" onClick={() => setFeedback("Etiquetas impresas para " + labelingRoutes.map((rt) => rt.id).join(", ") + ". " + labelingRoutes.filter((rt) => rt.status === "ready").length + " rutas listas.")}>
                      <Printer /> Imprimir etiquetas
                    </Button>
                    <Button variant="outline" onClick={() => setFeedback("PDF de etiquetas generado para todas las rutas.")}>
                      <Download /> Descargar PDF
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 shadow-soft">
            <h3 className="font-display text-lg font-bold">Vista previa de etiquetas</h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {sampleLabels.map((label) => (
                <div key={label.orderId} className="relative rounded-2xl border border-border bg-white p-6">
                  <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-border text-[10px] text-muted-foreground">
                    QR
                  </div>
                  <div className="mb-4 pr-20">
                    <div className="font-display text-lg font-bold text-primary">BOCAO</div>
                    <div className="mt-1 text-base font-semibold">{label.orderId}</div>
                    <div className="text-xs text-muted-foreground">{label.route} · {label.sequence}</div>
                  </div>

                  <div className="border-y border-border py-4 text-sm">
                    <div className="flex items-start gap-2"><User className="mt-0.5 h-4 w-4 text-muted-foreground" /><div><div className="font-medium">{label.customer}</div><div className="text-muted-foreground">{label.phone}</div></div></div>
                    <div className="mt-3 flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" /><div className="text-muted-foreground">{label.address}</div></div>
                  </div>

                  <div className="mt-4 text-sm text-muted-foreground">Ventana de entrega: {label.deliveryTime}</div>
                  <div className="mt-2 text-sm text-muted-foreground">Comidas: {label.meals.join(", ")}</div>

                  <div className="mt-4 space-y-2">
                    {label.restrictions.length ? (
                      <div className="rounded-xl border border-warning/20 bg-warning/10 p-3 text-xs">
                        <div className="font-semibold text-foreground">Restricciones</div>
                        <div className="mt-1 text-muted-foreground">{label.restrictions.join(", ")}</div>
                      </div>
                    ) : null}
                    {label.allergies !== "Ninguna" ? (
                      <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
                        <div className="font-semibold">Alergia</div>
                        <div className="mt-1">{label.allergies}</div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Configuracion de impresion</h3>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <div className="mb-2 font-medium">Impresora termica</div>
                <div className="rounded-xl border border-border px-4 py-3 text-muted-foreground">Zebra ZD410 - Estacion 1</div>
              </div>
              <div>
                <div className="mb-2 font-medium">Tamano de etiqueta</div>
                <div className="rounded-xl border border-border px-4 py-3 text-muted-foreground">10 x 15 cm (estandar)</div>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <div>Incluye codigo QR</div>
                <div>Destaca alertas por alergias</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Estadisticas de hoy</h3>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Etiquetas impresas</span><span>{printedCount}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Etiquetas pendientes</span><span>{pendingCount}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Rutas procesadas</span><span>{processedRoutes}/{labelingRoutes.length}</span></div>
            </div>
          </Card>

          <Card className="bg-gradient-hero p-6 text-primary-foreground shadow-elegant">
            <h3 className="font-display text-lg font-bold">Tiempo estimado</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-primary-foreground/80">Por etiqueta</span><span>~2 seg</span></div>
              <div className="flex justify-between"><span className="text-primary-foreground/80">Total estimado</span><span>~9.5 min</span></div>
            </div>
          </Card>
        </div>
      </div>
    </RoleWorkspace>
  );
}

export function KitchenLotsPage() {
  const [batchList, setBatchList] = useState(lotesData);

  const [modal, setModal] = useState<{ type: "markAll" | "markOne" | "incident" | "delay" | "schedule" | null; batchId?: string }>({ type: null });
  const [incidentMsg, setIncidentMsg] = useState("");
  const [delayNote, setDelayNote] = useState("");

  const completedTotal = batchList.reduce((s, b) => s + b.completed, 0);
  const totalOrders = batchList.reduce((s, b) => s + b.orders, 0);
  const completedBatches = batchList.filter((b) => b.status === "completed").length;
  const progress = totalOrders > 0 ? Math.round((completedTotal / totalOrders) * 100) : 0;

  function closeModal() {
    setModal({ type: null });
    setIncidentMsg("");
    setDelayNote("");
  }

  function handleMarkOne(batchId: string) {
    setBatchList((prev) =>
      prev.map((b) => (b.id === batchId ? { ...b, status: "completed", completed: b.orders, inProgress: 0, pending: 0 } : b)),
    );
  }

  function handleMarkAllReady() {
    setBatchList((prev) =>
      prev.map((b) => ({ ...b, status: "completed", completed: b.orders, inProgress: 0, pending: 0 })),
    );
    closeModal();
  }

  function handleReportDelay(batchId: string) {
    if (!delayNote.trim()) return;
    setBatchList((prev) =>
      prev.map((b) => (b.id === batchId ? { ...b, status: "delayed" } : b)),
    );
    closeModal();
  }

  const modalBatch = modal.batchId ? batchList.find((b) => b.id === modal.batchId) : undefined;

  return (
    <RoleWorkspace
      roleTitle="Dark Kitchen"
      links={kitchenLinks}
      title="Estado de lotes"
      subtitle="Supervisa avance, tiempos estimados y confirma produccion lista para despacho."
      actions={
        <>
          <Button variant="fresh" onClick={() => setModal({ type: "markAll" })}>
            <CheckCircle /> Marcar todos listos
          </Button>
          <Button variant="outline" onClick={() => { setIncidentMsg(""); setModal({ type: "incident" }); }}>
            <AlertTriangle /> Reportar incidencia
          </Button>
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-4">
        {[
          { label: "Pedidos totales", value: totalOrders.toString(), icon: Package, tone: "text-primary" },
          { label: "Completados", value: completedTotal.toString(), icon: CheckCircle, tone: "text-accent" },
          { label: "Lotes pendientes", value: (batchList.length - completedBatches).toString(), icon: Clock, tone: "text-warning" },
          { label: "Progreso general", value: progress + "%", icon: TrendingUp, tone: "text-primary" },
        ].map((stat) => {
          const Icon = stat.icon;
          return <MetricCard key={stat.label} icon={Icon} label={stat.label} tone={stat.tone} value={stat.value} />;
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {batchList.map((batch) => {
            const batchProgress = batch.orders > 0 ? Math.round((batch.completed / batch.orders) * 100) : 0;
            return (
              <Card key={batch.id} className="p-6 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                      <Package className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold">{batch.id}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{batch.zone}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Ruta: {batch.route}</p>
                    </div>
                  </div>
                  {batch.status === "completed" ? (
                    <Badge className="bg-accent-soft text-accent hover:bg-accent-soft">Listo</Badge>
                  ) : batch.status === "delayed" ? (
                    <Badge className="bg-destructive/15 text-destructive hover:bg-destructive/15">Retrasado</Badge>
                  ) : batch.status === "assigned" ? (
                    <Badge className="bg-primary/15 text-primary hover:bg-primary/15">En progreso</Badge>
                  ) : (
                    <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">Pendiente</Badge>
                  )}
                </div>

                <div className="mt-5 grid gap-4 rounded-2xl bg-secondary/40 p-4 md:grid-cols-4">
                  <div className="text-center"><div className="font-display text-2xl font-extrabold text-primary">{batch.orders}</div><div className="text-xs text-muted-foreground">Total pedidos</div></div>
                  <div className="text-center"><div className="font-display text-2xl font-extrabold text-accent">{batch.completed}</div><div className="text-xs text-muted-foreground">Completados</div></div>
                  <div className="text-center"><div className="font-display text-2xl font-extrabold text-warning">{batch.inProgress}</div><div className="text-xs text-muted-foreground">En proceso</div></div>
                  <div className="text-center"><div className="font-display text-2xl font-extrabold text-foreground">{batch.pending}</div><div className="text-xs text-muted-foreground">Pendientes</div></div>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="font-medium">{batchProgress}%</span>
                  </div>
                  <Progress className="h-3" value={batchProgress} />
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl border border-primary/15 bg-primary/5 p-4 text-sm">
                  <div className="flex items-center gap-2 text-primary">
                    <Clock className="h-4 w-4" /> Hora limite: {batch.deadline}
                  </div>
                  <span className="text-muted-foreground">Est. finalizacion: {batch.estimatedCompletion}</span>
                </div>

                {batch.status !== "completed" && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button variant="fresh" onClick={() => handleMarkOne(batch.id)}>
                      <CheckCircle /> Marcar como listo
                    </Button>
                    <Button variant="outline" onClick={() => { setDelayNote(""); setModal({ type: "delay", batchId: batch.id }); }}>
                      <AlertTriangle /> Reportar retraso
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <div className="space-y-6">
          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Acciones rapidas</h3>
            <div className="mt-4 space-y-2">
              <button
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-smooth hover:border-primary/30 hover:bg-secondary hover:text-foreground"
                onClick={() => setModal({ type: "markAll" })}
                type="button"
              >
                <CheckCircle className="h-4 w-4" />Marcar todos listos
              </button>
              <button
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-smooth hover:border-primary/30 hover:bg-secondary hover:text-foreground"
                onClick={() => setModal({ type: "schedule" })}
                type="button"
              >
                <Clock className="h-4 w-4" />Ver cronograma
              </button>
              <button
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-smooth hover:border-primary/30 hover:bg-secondary hover:text-foreground"
                onClick={() => { setIncidentMsg(""); setModal({ type: "incident" }); }}
                type="button"
              >
                <AlertTriangle className="h-4 w-4" />Reportar incidencia
              </button>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Tiempo estimado restante</h3>
            <div className="mt-4 space-y-4">
              {batchList.map((batch) => (
                <div key={batch.id}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{batch.id}</span>
                    <span className="font-medium text-primary">{batch.status === "completed" ? "Listo" : "~85 min"}</span>
                  </div>
                  <Progress className="h-2" value={batch.status === "completed" ? 100 : batch.orders > 0 ? Math.round((batch.completed / batch.orders) * 100) : 0} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-hero p-6 text-primary-foreground shadow-elegant">
            <h3 className="font-display text-lg font-bold">Rendimiento de hoy</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-primary-foreground/80">Lotes completados</span><span>{completedBatches}/{batchList.length}</span></div>
              <div className="flex justify-between"><span className="text-primary-foreground/80">Eficiencia</span><span>{completedBatches > 0 ? Math.round((completedBatches / batchList.length) * 100) + "%" : "--"}</span></div>
              <div className="flex justify-between"><span className="text-primary-foreground/80">Retrasos</span><span>{batchList.filter((b) => b.status === "delayed").length}</span></div>
              <div className="flex justify-between"><span className="text-primary-foreground/80">Calidad</span><span>100%</span></div>
            </div>
          </Card>
        </div>
      </div>

      {modal.type ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="relative w-full max-w-md overflow-hidden shadow-elegant">

            {modal.type === "markAll" && (
              <>
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                  <h3 className="font-display text-xl font-bold">Marcar todos listos</h3>
                  <Button variant="ghost" size="icon" onClick={closeModal}><X className="h-5 w-5" /></Button>
                </div>
                <div className="space-y-4 p-6">
                  <p className="text-sm text-muted-foreground">Esto marcara los {batchList.length} lotes como completados. Todas las entregas pasaran a estado listo para despacho.</p>
                  <div className="space-y-2">
                    {batchList.map((b) => (
                      <div key={b.id} className="flex items-center justify-between rounded-xl bg-secondary/40 p-3 text-sm">
                        <span className="font-medium">{b.id}</span>
                        <span className="text-muted-foreground">{b.zone}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="fresh" className="w-full" onClick={handleMarkAllReady}>Confirmar todos listos</Button>
                </div>
              </>
            )}

            {modal.type === "incident" && (
              <>
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                  <h3 className="font-display text-xl font-bold">Reportar incidencia</h3>
                  <Button variant="ghost" size="icon" onClick={closeModal}><X className="h-5 w-5" /></Button>
                </div>
                <div className="space-y-4 p-6">
                  <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" defaultValue="">
                    <option value="" disabled>Selecciona un lote</option>
                    {batchList.map((b) => <option key={b.id}>{b.id} - {b.zone}</option>)}
                  </select>
                  <Input value={incidentMsg} onChange={(e) => setIncidentMsg(e.target.value)} placeholder="Describe la incidencia..." />
                  <Button variant="hero" className="w-full" onClick={() => { if (incidentMsg.trim()) closeModal(); }} disabled={!incidentMsg.trim()}>Enviar reporte</Button>
                </div>
              </>
            )}

            {modal.type === "delay" && modalBatch && (
              <>
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                  <div>
                    <h3 className="font-display text-xl font-bold">Reportar retraso</h3>
                    <p className="text-sm text-muted-foreground">{modalBatch.id} · {modalBatch.zone}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={closeModal}><X className="h-5 w-5" /></Button>
                </div>
                <div className="space-y-4 p-6">
                  <div className="rounded-xl bg-warning/10 border border-warning/20 p-4 text-sm">
                    <AlertTriangle className="mb-2 h-5 w-5 text-warning" />
                    <p className="text-muted-foreground">El administrador y el equipo de logistica seran notificados automaticamente.</p>
                  </div>
                  <Input value={delayNote} onChange={(e) => setDelayNote(e.target.value)} placeholder="Motivo del retraso..." />
                  <Button variant="hero" className="w-full" onClick={() => handleReportDelay(modalBatch.id)} disabled={!delayNote.trim()}>Reportar retraso</Button>
                </div>
              </>
            )}

            {modal.type === "schedule" && (
              <>
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                  <h3 className="font-display text-xl font-bold">Cronograma de produccion</h3>
                  <Button variant="ghost" size="icon" onClick={closeModal}><X className="h-5 w-5" /></Button>
                </div>
                <div className="space-y-3 p-6">
                  {batchList.map((b) => (
                    <div key={b.id} className="rounded-xl border border-border bg-secondary/40 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{b.id}</div>
                          <div className="text-xs text-muted-foreground">{b.zone} · Ruta {b.route}</div>
                        </div>
                        <Badge className={b.status === "completed" ? "bg-accent-soft text-accent" : "bg-secondary"}>
                          {b.status === "completed" ? "Listo" : b.deadline}
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{b.orders} pedidos</span>
                        <span>·</span>
                        <span>Est. finalizacion: {b.estimatedCompletion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </Card>
        </div>
      ) : null}
    </RoleWorkspace>
  );
}
