import type { ComponentType } from "react";

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
} from "lucide-react";

import { RoleWorkspace } from "@/components/layout/role-workspace";
import type { SidebarLink } from "@/components/layout/role-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

const kitchenBatches = [
  {
    id: "LOTE-001",
    route: "RUTA-001",
    zone: "San Isidro / Miraflores",
    orders: 24,
    deadline: "08:00 AM",
    priority: "high",
    status: "assigned",
    profiles: ["Vegetariano", "Sin gluten", "Alto en proteina"],
  },
  {
    id: "LOTE-002",
    route: "RUTA-002",
    zone: "Surco / La Molina",
    orders: 28,
    deadline: "08:30 AM",
    priority: "high",
    status: "assigned",
    profiles: ["Bajo en carbohidratos", "Vegano", "Sin lactosa"],
  },
  {
    id: "LOTE-003",
    route: "RUTA-003",
    zone: "Barranco / Chorrillos",
    orders: 19,
    deadline: "09:00 AM",
    priority: "medium",
    status: "assigned",
    profiles: ["Estandar", "Alto en fibra"],
  },
  {
    id: "LOTE-004",
    route: "RUTA-004",
    zone: "Jesus Maria / Lince",
    orders: 22,
    deadline: "09:30 AM",
    priority: "medium",
    status: "pending",
    profiles: ["Vegetariano", "Bajo en sodio"],
  },
];

const productionOrders = [
  {
    id: "#BOCAO-001",
    customer: "Juan Perez",
    address: "Av. Pardo 456, Miraflores",
    profile: { calories: 1800, protein: 90, carbs: 225, fats: 60, restrictions: ["Vegetariano", "Sin lactosa"], allergies: "Nueces" },
    meals: [
      {
        name: "Desayuno",
        recipe: "Avena con frutos rojos",
        ingredients: [
          { item: "Avena integral", quantity: "80g" },
          { item: "Leche de almendras", quantity: "200ml" },
          { item: "Arandanos", quantity: "50g" },
          { item: "Fresas", quantity: "50g" },
        ],
        calories: 350,
        notes: "Sin nueces por alergia.",
      },
      {
        name: "Almuerzo",
        recipe: "Bowl de quinua con verduras",
        ingredients: [
          { item: "Quinua cocida", quantity: "150g" },
          { item: "Brocoli al vapor", quantity: "100g" },
          { item: "Garbanzos", quantity: "80g" },
          { item: "Aderezo de limon", quantity: "20ml" },
        ],
        calories: 520,
        notes: "Vegetariano y sin lacteos.",
      },
    ],
  },
  {
    id: "#BOCAO-002",
    customer: "Maria Gonzalez",
    address: "Calle Los Pinos 789, San Isidro",
    profile: { calories: 2000, protein: 110, carbs: 200, fats: 70, restrictions: ["Alto en proteina"], allergies: "Ninguna" },
    meals: [
      {
        name: "Desayuno",
        recipe: "Huevos revueltos con palta",
        ingredients: [
          { item: "Huevos organicos", quantity: "3 unidades" },
          { item: "Palta hass", quantity: "1/2 unidad" },
          { item: "Pan integral", quantity: "2 rebanadas" },
          { item: "Tomate", quantity: "50g" },
        ],
        calories: 420,
        notes: "Priorizar coccion completa.",
      },
      {
        name: "Almuerzo",
        recipe: "Pollo grillado con ensalada",
        ingredients: [
          { item: "Pechuga de pollo", quantity: "180g" },
          { item: "Lechuga romana", quantity: "100g" },
          { item: "Pepino", quantity: "50g" },
          { item: "Tomate cherry", quantity: "60g" },
        ],
        calories: 480,
        notes: "Mantener sello de alto contenido proteico.",
      },
    ],
  },
];

const labelingRoutes = [
  { id: "RUTA-001", zone: "San Isidro / Miraflores", orders: 24, batch: "LOTE-001", status: "ready" },
  { id: "RUTA-002", zone: "Surco / La Molina", orders: 28, batch: "LOTE-002", status: "printing" },
  { id: "RUTA-003", zone: "Barranco / Chorrillos", orders: 19, batch: "LOTE-003", status: "pending" },
];

const sampleLabels = [
  {
    orderId: "#BOCAO-001",
    customer: "Juan Perez",
    address: "Av. Pardo 456, Dpto 301, Miraflores",
    phone: "+51 999 888 777",
    route: "RUTA-001",
    sequence: "001/024",
    deliveryTime: "6:00 - 8:00 AM",
    meals: ["Desayuno", "Almuerzo", "Merienda", "Cena"],
    restrictions: ["Vegetariano", "Sin lactosa"],
    allergies: "Nueces",
  },
  {
    orderId: "#BOCAO-002",
    customer: "Maria Gonzalez",
    address: "Calle Los Pinos 789, San Isidro",
    phone: "+51 999 777 666",
    route: "RUTA-001",
    sequence: "002/024",
    deliveryTime: "6:00 - 8:00 AM",
    meals: ["Desayuno", "Almuerzo", "Merienda", "Cena"],
    restrictions: ["Alto en proteina"],
    allergies: "Ninguna",
  },
];

const lotes = [
  { id: "LOTE-001", route: "RUTA-001", zone: "San Isidro / Miraflores", orders: 24, completed: 0, inProgress: 0, pending: 24, status: "pending", estimatedCompletion: "08:00 AM", deadline: "08:00 AM" },
  { id: "LOTE-002", route: "RUTA-002", zone: "Surco / La Molina", orders: 28, completed: 0, inProgress: 0, pending: 28, status: "pending", estimatedCompletion: "08:30 AM", deadline: "08:30 AM" },
  { id: "LOTE-003", route: "RUTA-003", zone: "Barranco / Chorrillos", orders: 19, completed: 0, inProgress: 0, pending: 19, status: "pending", estimatedCompletion: "09:00 AM", deadline: "09:00 AM" },
  { id: "LOTE-004", route: "RUTA-004", zone: "Jesus Maria / Lince", orders: 22, completed: 0, inProgress: 0, pending: 22, status: "pending", estimatedCompletion: "09:30 AM", deadline: "09:30 AM" },
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
          <div className="mt-3 font-display text-4xl font-extrabold text-primary">{value}</div>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary/70">
          <Icon className={cn("h-5 w-5", tone)} />
        </div>
      </div>
    </Card>
  );
}

export function KitchenOrdersPage() {
  return (
    <RoleWorkspace
      roleTitle="Dark Kitchen"
      links={kitchenLinks}
      title="Bandeja de ordenes"
      subtitle="Lotes de produccion asignados para hoy, con prioridad, zona y perfiles nutricionales."
    >
      <div className="grid gap-5 md:grid-cols-4">
        {[
          { label: "Pedidos totales", value: "93", icon: Package, tone: "text-primary" },
          { label: "En progreso", value: "73", icon: Clock, tone: "text-warning" },
          { label: "Pendientes", value: "20", icon: Users, tone: "text-primary" },
          { label: "Completados hoy", value: "0", icon: CheckCircle, tone: "text-accent" },
        ].map((stat) => {
          const Icon = stat.icon;
          return <MetricCard key={stat.label} icon={Icon} label={stat.label} tone={stat.tone} value={stat.value} />;
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {kitchenBatches.map((batch) => (
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
                <Badge className={batch.status === "assigned" ? "bg-primary text-primary-foreground hover:bg-primary" : "bg-secondary text-secondary-foreground hover:bg-secondary"}>
                  {batch.status === "assigned" ? "Asignado" : "Pendiente"}
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
                <Button variant="outline">
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
              <div className="flex justify-between"><span className="text-muted-foreground">Lotes asignados</span><span>4</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Rutas asociadas</span><span>4</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Perfiles diferentes</span><span>8</span></div>
            </div>
          </Card>

          <Card className="bg-gradient-hero p-6 text-primary-foreground shadow-elegant">
            <h3 className="font-display text-lg font-bold">Estado de cocina</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-primary-foreground/80">Capacidad utilizada</span><span>78%</span></div>
              <div className="flex justify-between"><span className="text-primary-foreground/80">Tiempo promedio por lote</span><span>85 min</span></div>
              <div className="flex justify-between"><span className="text-primary-foreground/80">Eficiencia</span><span>94%</span></div>
            </div>
          </Card>
        </div>
      </div>
    </RoleWorkspace>
  );
}

export function KitchenProductionPage() {
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
            <div className="font-display text-3xl font-extrabold text-primary">24</div>
            <div className="mt-1 text-sm text-muted-foreground">Pedidos</div>
          </div>
          <div className="rounded-2xl bg-secondary/40 p-4 text-center">
            <div className="font-display text-3xl font-extrabold text-primary">RUTA-001</div>
            <div className="mt-1 text-sm text-muted-foreground">Ruta</div>
          </div>
          <div className="rounded-2xl bg-secondary/40 p-4 text-center">
            <div className="font-display text-xl font-extrabold text-primary">San Isidro / Miraflores</div>
            <div className="mt-1 text-sm text-muted-foreground">Zona</div>
          </div>
          <div className="rounded-2xl bg-primary p-4 text-center text-primary-foreground">
            <div className="font-display text-3xl font-extrabold">08:00 AM</div>
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
  return (
    <RoleWorkspace
      roleTitle="Dark Kitchen"
      links={kitchenLinks}
      title="Etiquetado"
      subtitle="Genera, imprime y valida etiquetas termicas por ruta antes de despacho."
    >
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
                        <div className="font-display text-2xl font-bold text-primary">{route.orders * 4}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button variant="hero">
                      <Printer /> Imprimir etiquetas
                    </Button>
                    <Button variant="outline">
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
              <div className="flex justify-between"><span className="text-muted-foreground">Etiquetas impresas</span><span>0</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Etiquetas pendientes</span><span>284</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Rutas procesadas</span><span>0/3</span></div>
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
  return (
    <RoleWorkspace
      roleTitle="Dark Kitchen"
      links={kitchenLinks}
      title="Estado de lotes"
      subtitle="Supervisa avance, tiempos estimados y confirma produccion lista para despacho."
      actions={
        <>
          <Button variant="fresh">
            <CheckCircle /> Marcar todos listos
          </Button>
          <Button variant="outline">
            <AlertTriangle /> Reportar incidencia
          </Button>
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-4">
        {[
          { label: "Pedidos totales", value: "93", icon: Package, tone: "text-primary" },
          { label: "Completados", value: "0", icon: CheckCircle, tone: "text-accent" },
          { label: "Lotes pendientes", value: "4", icon: Clock, tone: "text-warning" },
          { label: "Progreso general", value: "0%", icon: TrendingUp, tone: "text-primary" },
        ].map((stat) => {
          const Icon = stat.icon;
          return <MetricCard key={stat.label} icon={Icon} label={stat.label} tone={stat.tone} value={stat.value} />;
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {lotes.map((batch) => (
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
                <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">Pendiente</Badge>
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
                  <span className="font-medium">0%</span>
                </div>
                <Progress className="h-3" value={0} />
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl border border-primary/15 bg-primary/5 p-4 text-sm">
                <div className="flex items-center gap-2 text-primary">
                  <Clock className="h-4 w-4" /> Hora limite: {batch.deadline}
                </div>
                <span className="text-muted-foreground">Est. finalizacion: {batch.estimatedCompletion}</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="fresh">
                  <CheckCircle /> Marcar como listo
                </Button>
                <Button variant="outline">
                  <AlertTriangle /> Reportar retraso
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Acciones rapidas</h3>
            <div className="mt-4 space-y-3">
              <Button className="w-full justify-start" variant="fresh">
                <CheckCircle /> Marcar todos listos
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Clock /> Ver cronograma
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AlertTriangle /> Reportar incidencia
              </Button>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Tiempo estimado restante</h3>
            <div className="mt-4 space-y-4">
              {lotes.map((batch) => (
                <div key={batch.id}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{batch.id}</span>
                    <span className="font-medium text-primary">~85 min</span>
                  </div>
                  <Progress className="h-2" value={0} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-hero p-6 text-primary-foreground shadow-elegant">
            <h3 className="font-display text-lg font-bold">Rendimiento de hoy</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-primary-foreground/80">Lotes completados</span><span>0/4</span></div>
              <div className="flex justify-between"><span className="text-primary-foreground/80">Eficiencia</span><span>--</span></div>
              <div className="flex justify-between"><span className="text-primary-foreground/80">Retrasos</span><span>0</span></div>
              <div className="flex justify-between"><span className="text-primary-foreground/80">Calidad</span><span>100%</span></div>
            </div>
          </Card>
        </div>
      </div>
    </RoleWorkspace>
  );
}
