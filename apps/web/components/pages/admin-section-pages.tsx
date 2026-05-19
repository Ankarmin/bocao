import type { ComponentType } from "react";

import {
  Activity,
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Database,
  DollarSign,
  Download,
  MapPin,
  MessageSquare,
  Navigation,
  Package,
  RefreshCw,
  Star,
  TrendingUp,
  Truck,
  User,
  Users,
} from "lucide-react";

import { RoleWorkspace } from "@/components/layout/role-workspace";
import type { SidebarLink } from "@/components/layout/role-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  tone: string;
  description?: string;
};

const adminLinks: SidebarLink[] = [
  { href: "/admin", label: "Consolidacion", icon: "boxes" },
  { href: "/admin/logistica", label: "Logistica", icon: "truck" },
  { href: "/admin/incidencias", label: "Incidencias", icon: "alert-triangle" },
  { href: "/admin/usuarios", label: "Usuarios y Kitchens", icon: "users" },
];

const consolidationIngredients = [
  { name: "Pollo organico", quantity: "35 kg", orders: 89, suppliers: ["SupraFresh", "OrganicPeru"], priority: "high" },
  { name: "Quinua blanca", quantity: "18 kg", orders: 124, suppliers: ["AndesFoods"], priority: "high" },
  { name: "Brocoli fresco", quantity: "28 kg", orders: 156, suppliers: ["VerdeFresh"], priority: "medium" },
  { name: "Salmon atlantico", quantity: "22 kg", orders: 67, suppliers: ["FreshSea"], priority: "high" },
  { name: "Arroz integral", quantity: "32 kg", orders: 178, suppliers: ["Molinos del Sur"], priority: "low" },
  { name: "Almendras", quantity: "8 kg", orders: 95, suppliers: ["NutriNuts"], priority: "medium" },
  { name: "Espinaca fresca", quantity: "15 kg", orders: 112, suppliers: ["VerdeFresh", "BioHuerta"], priority: "medium" },
  { name: "Aguacate hass", quantity: "45 unidades", orders: 89, suppliers: ["TropicalPeru"], priority: "high" },
];

const consolidationKitchens = [
  { name: "Dark Kitchen Norte", assigned: 78, capacity: 100 },
  { name: "Dark Kitchen Centro", assigned: 92, capacity: 100 },
  { name: "Dark Kitchen Sur", assigned: 75, capacity: 100 },
];

const logisticsRoutes = [
  {
    id: "RUTA-001",
    driver: "Carlos Mendoza",
    phone: "+51 999 888 777",
    vehicle: "Toyota Hiace - ABC-123",
    zone: "San Isidro / Miraflores",
    deliveries: 24,
    completed: 18,
    status: "en_ruta",
    estimatedCompletion: "11:30 AM",
    currentLocation: "Av. Pardo 456, Miraflores",
  },
  {
    id: "RUTA-002",
    driver: "Maria Gonzalez",
    phone: "+51 999 777 666",
    vehicle: "Hyundai H1 - XYZ-456",
    zone: "Surco / La Molina",
    deliveries: 28,
    completed: 28,
    status: "completado",
    estimatedCompletion: "Completado",
    currentLocation: "Base BOCAO Norte",
  },
  {
    id: "RUTA-003",
    driver: "Jorge Ramirez",
    phone: "+51 999 666 555",
    vehicle: "Nissan Urvan - DEF-789",
    zone: "Barranco / Chorrillos",
    deliveries: 19,
    completed: 12,
    status: "en_ruta",
    estimatedCompletion: "12:00 PM",
    currentLocation: "Av. Grau 789, Barranco",
  },
  {
    id: "RUTA-004",
    driver: "Ana Torres",
    phone: "+51 999 555 444",
    vehicle: "Toyota Hiace - GHI-012",
    zone: "Jesus Maria / Lince",
    deliveries: 22,
    completed: 0,
    status: "preparando",
    estimatedCompletion: "10:00 AM",
    currentLocation: "Base BOCAO Centro",
  },
];

const incidents = [
  {
    id: "INC-2026-001",
    title: "Retraso en Dark Kitchen Norte",
    description: "Demora de 45 minutos en produccion del lote LOTE-001.",
    severity: "high",
    status: "en_proceso",
    affectedOrders: 28,
    createdAt: "2026-05-03 08:15",
    assignedTo: "Maria Gonzalez",
    kitchen: "Dark Kitchen Norte",
  },
  {
    id: "INC-2026-002",
    title: "Vehiculo con falla mecanica",
    description: "El vehiculo ABC-123 presento una falla en motor durante la ruta RUTA-001.",
    severity: "critical",
    status: "resuelto",
    affectedOrders: 24,
    createdAt: "2026-05-03 06:30",
    assignedTo: "Carlos Mendoza",
    solution: "Se asigno una unidad de respaldo y las entregas fueron reprogramadas.",
  },
  {
    id: "INC-2026-003",
    title: "Faltante de salmon fresco",
    description: "Proveedor FreshSea no entrego 8 kg del volumen confirmado para hoy.",
    severity: "medium",
    status: "en_proceso",
    affectedOrders: 12,
    createdAt: "2026-05-03 09:00",
    assignedTo: "Ana Torres",
    kitchen: "Dark Kitchen Sur",
  },
  {
    id: "INC-2026-004",
    title: "Cliente reporta entrega incorrecta",
    description: "Pedido #BOCAO-2026-156 entregado con menu equivocado.",
    severity: "low",
    status: "resuelto",
    affectedOrders: 1,
    createdAt: "2026-05-03 10:30",
    assignedTo: "Jorge Ramirez",
    solution: "Se envio el pedido correcto y se aplico un descuento al cliente.",
  },
];

const managementUsers = [
  { id: 1, name: "Juan Perez", email: "juan@example.com", plan: "Estandar", status: "active", deliveries: 18, satisfaction: 98 },
  { id: 2, name: "Maria Lopez", email: "maria@example.com", plan: "Premium", status: "active", deliveries: 24, satisfaction: 100 },
  { id: 3, name: "Carlos Garcia", email: "carlos@example.com", plan: "Basico", status: "paused", deliveries: 12, satisfaction: 85 },
  { id: 4, name: "Ana Rodriguez", email: "ana@example.com", plan: "Estandar", status: "active", deliveries: 15, satisfaction: 95 },
];

const managementKitchens = [
  { name: "Dark Kitchen Norte", capacity: 100, utilized: 78, orders: 245, efficiency: 94, rating: 4.8 },
  { name: "Dark Kitchen Centro", capacity: 100, utilized: 92, orders: 289, efficiency: 91, rating: 4.6 },
  { name: "Dark Kitchen Sur", capacity: 100, utilized: 75, orders: 198, efficiency: 96, rating: 4.9 },
];

function priorityBadge(priority: string) {
  if (priority === "high") {
    return <Badge className="bg-primary text-primary-foreground hover:bg-primary">Alta</Badge>;
  }

  if (priority === "medium") {
    return <Badge className="bg-warning/15 text-warning hover:bg-warning/15">Media</Badge>;
  }

  return <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">Baja</Badge>;
}

function routeStatusBadge(status: string) {
  if (status === "completado") {
    return <Badge className="bg-accent-soft text-accent hover:bg-accent-soft">Completado</Badge>;
  }

  if (status === "en_ruta") {
    return <Badge className="bg-primary text-primary-foreground hover:bg-primary">En ruta</Badge>;
  }

  return <Badge className="bg-warning/15 text-warning hover:bg-warning/15">Preparando</Badge>;
}

function severityBadge(severity: string) {
  if (severity === "critical") {
    return <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive">Critico</Badge>;
  }

  if (severity === "high") {
    return <Badge className="bg-primary text-primary-foreground hover:bg-primary">Alto</Badge>;
  }

  if (severity === "medium") {
    return <Badge className="bg-warning/15 text-warning hover:bg-warning/15">Medio</Badge>;
  }

  return <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">Bajo</Badge>;
}

function incidentStatus(status: string) {
  if (status === "resuelto") {
    return (
      <span className="flex items-center gap-2 text-sm text-accent">
        <CheckCircle className="h-4 w-4" /> Resuelto
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2 text-sm text-warning">
      <Clock className="h-4 w-4" /> En proceso
    </span>
  );
}

function MetricCard({ label, value, icon: Icon, tone, description }: MetricCardProps) {
  return (
    <Card className="p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className="mt-3 font-display text-4xl font-extrabold text-primary">{value}</div>
          {description ? <p className="mt-3 text-sm text-muted-foreground">{description}</p> : null}
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary/70">
          <Icon className={cn("h-5 w-5", tone)} />
        </div>
      </div>
    </Card>
  );
}

export function AdminConsolidationPage() {
  return (
    <RoleWorkspace
      roleTitle="Administrador"
      links={adminLinks}
      title="Monitor de consolidacion"
      subtitle="Extraccion, clasificacion de demanda y asignacion de insumos por dark kitchen."
      actions={
        <>
          <Button variant="outline">
            <Download /> Exportar CSV
          </Button>
          <Button variant="hero">
            <RefreshCw /> Actualizar
          </Button>
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-4">
        <div className="space-y-3">
          <MetricCard icon={Database} label="Pedidos procesados" tone="text-primary" value="245" />
          <Badge className="bg-accent-soft text-accent hover:bg-accent-soft">Completado</Badge>
        </div>
        <MetricCard
          description="Lista lista para compras y abastecimiento."
          icon={Package}
          label="Insumos consolidados"
          tone="text-accent"
          value="87"
        />
        <Card className="p-6 shadow-soft md:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Ultima actualizacion</p>
              <div className="mt-2 font-display text-2xl font-bold">2026-05-03 14:30</div>
              <p className="mt-2 text-sm text-muted-foreground">245 pedidos, 1,470 entregas y 5,880 comidas procesadas.</p>
            </div>
            <div className="rounded-2xl bg-gradient-hero p-4 text-primary-foreground shadow-elegant">
              <Activity className="h-8 w-8" />
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="overflow-hidden shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border p-5 gap-4">
            <div>
              <h3 className="font-display text-lg font-bold">Lista consolidada de insumos</h3>
              <p className="mt-1 text-sm text-muted-foreground">Prioriza compras segun volumen, pedidos afectados y proveedores activos.</p>
            </div>
            <Badge variant="secondary">87 items</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Insumo</th>
                  <th className="px-5 py-3">Cantidad</th>
                  <th className="px-5 py-3">Pedidos</th>
                  <th className="px-5 py-3">Proveedores</th>
                  <th className="px-5 py-3">Prioridad</th>
                </tr>
              </thead>
              <tbody>
                {consolidationIngredients.map((item) => (
                  <tr key={item.name} className="border-t border-border align-top">
                    <td className="px-5 py-4 font-medium">{item.name}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">{item.quantity}</span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{item.orders}</td>
                    <td className="px-5 py-4 text-muted-foreground">{item.suppliers.join(", ")}</td>
                    <td className="px-5 py-4">{priorityBadge(item.priority)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Asignacion por cocina</h3>
            <div className="mt-5 space-y-4">
              {consolidationKitchens.map((kitchen) => {
                const usage = (kitchen.assigned / kitchen.capacity) * 100;

                return (
                  <div key={kitchen.name} className="rounded-2xl border border-border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-medium">{kitchen.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {kitchen.assigned}/{kitchen.capacity} pedidos asignados
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-accent" />
                    </div>
                    <Progress className="mt-4 h-3" value={usage} />
                    <p className="mt-2 text-xs text-muted-foreground">{usage.toFixed(0)}% de capacidad utilizada.</p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="bg-gradient-hero p-6 text-primary-foreground shadow-elegant">
            <h3 className="font-display text-lg font-bold">Resumen de extraccion</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-primary-foreground/80">Suscripciones activas</span>
                <span>245</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-foreground/80">Entregas programadas</span>
                <span>1,470</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-foreground/80">Comidas totales</span>
                <span>5,880</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </RoleWorkspace>
  );
}

export function AdminLogisticsPage() {
  return (
    <RoleWorkspace
      roleTitle="Administrador"
      links={adminLinks}
      title="Panel de control logistico"
      subtitle="Seguimiento en tiempo real de rutas, entregas y estado de conductores."
    >
      <div className="grid gap-5 md:grid-cols-4">
        {[
          { label: "Rutas activas", value: "4", icon: Truck, tone: "text-primary" },
          { label: "Entregas completadas", value: "58/93", icon: MapPin, tone: "text-accent" },
          { label: "Entregas pendientes", value: "35", icon: Clock, tone: "text-warning" },
          { label: "En ruta ahora", value: "2", icon: Navigation, tone: "text-primary" },
        ].map((stat) => {
          const Icon = stat.icon;
          return <MetricCard key={stat.label} icon={Icon} label={stat.label} tone={stat.tone} value={stat.value} />;
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {logisticsRoutes.map((route) => {
            const progress = (route.completed / route.deliveries) * 100;

            return (
              <Card key={route.id} className="p-6 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                      <Truck className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-xl font-bold">{route.id}</h3>
                        {routeStatusBadge(route.status)}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{route.zone}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>Entrega estimada</div>
                    <div className="font-medium text-foreground">{route.estimatedCompletion}</div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>
                        <span className="font-medium text-foreground">{route.driver}</span> · {route.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Truck className="h-4 w-4" />
                      <span>{route.vehicle}</span>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-secondary/50 p-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      Ultima ubicacion
                    </div>
                    <p className="mt-2 font-medium text-foreground">{route.currentLocation}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progreso de entregas</span>
                    <span className="font-medium text-foreground">
                      {route.completed}/{route.deliveries}
                    </span>
                  </div>
                  <Progress className="h-3" value={progress} />
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="hero">
                    <MapPin /> Ver en mapa
                  </Button>
                  <Button variant="outline">Ver detalles</Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="space-y-6">
          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Mapa de rutas</h3>
            <div className="mt-5 flex aspect-square items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/40 text-center text-muted-foreground">
              <div>
                <MapPin className="mx-auto h-10 w-10 text-primary/40" />
                <p className="mt-3 text-sm">Vista de mapa en tiempo real</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Estadisticas de hoy</h3>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Tiempo promedio</span><span>8.5 min</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Eficiencia de ruta</span><span className="text-accent">94%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Incidencias</span><span className="text-warning">2</span></div>
            </div>
          </Card>

          <Card className="bg-gradient-hero p-6 text-primary-foreground shadow-elegant">
            <h3 className="font-display text-lg font-bold">Resumen operativo</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-primary-foreground/80">Rutas programadas</span><span>4</span></div>
              <div className="flex justify-between"><span className="text-primary-foreground/80">Kilometros recorridos</span><span>127 km</span></div>
              <div className="flex justify-between"><span className="text-primary-foreground/80">Satisfaccion cliente</span><span>98%</span></div>
            </div>
          </Card>
        </div>
      </div>
    </RoleWorkspace>
  );
}

export function AdminIncidentsPage() {
  const activeIncidents = incidents.filter((item) => item.status === "en_proceso");
  const resolvedIncidents = incidents.filter((item) => item.status === "resuelto");

  return (
    <RoleWorkspace
      roleTitle="Administrador"
      links={adminLinks}
      title="Centro de resolucion de incidencias"
      subtitle="Gestiona retrasos, problemas logisticos e imprevistos operativos antes de impactar la entrega."
      actions={
        <>
          <Button variant="hero">Nueva incidencia</Button>
          <Button variant="outline">Notificar clientes</Button>
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-4">
        {[
          { label: "Incidencias totales", value: incidents.length.toString(), icon: AlertTriangle, tone: "text-primary" },
          { label: "En proceso", value: activeIncidents.length.toString(), icon: Clock, tone: "text-warning" },
          { label: "Resueltas", value: resolvedIncidents.length.toString(), icon: CheckCircle, tone: "text-accent" },
          { label: "Pedidos afectados", value: "65", icon: Calendar, tone: "text-primary" },
        ].map((stat) => {
          const Icon = stat.icon;
          return <MetricCard key={stat.label} icon={Icon} label={stat.label} tone={stat.tone} value={stat.value} />;
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {incidents.map((incident) => (
            <Card key={incident.id} className="p-6 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl font-bold">{incident.id}</h3>
                      {severityBadge(incident.severity)}
                    </div>
                    <h4 className="mt-2 font-medium text-foreground">{incident.title}</h4>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{incident.description}</p>
                  </div>
                </div>
                {incidentStatus(incident.status)}
              </div>

              <div className="mt-5 grid gap-4 rounded-2xl bg-secondary/40 p-4 text-sm md:grid-cols-3">
                <div>
                  <div className="text-muted-foreground">Pedidos afectados</div>
                  <div className="mt-1 font-display text-2xl font-bold text-primary">{incident.affectedOrders}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Asignado a</div>
                  <div className="mt-1 font-medium">{incident.assignedTo}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Creado</div>
                  <div className="mt-1 font-medium">{incident.createdAt}</div>
                </div>
              </div>

              {incident.kitchen ? (
                <div className="mt-4 rounded-2xl border border-primary/15 bg-primary/5 p-4 text-sm text-primary">
                  Cocina involucrada: <span className="font-semibold">{incident.kitchen}</span>
                </div>
              ) : null}

              {incident.solution ? (
                <div className="mt-4 rounded-2xl border border-accent/20 bg-accent-soft/70 p-4 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-accent" />
                    <div>
                      <div className="font-semibold text-foreground">Solucion aplicada</div>
                      <div className="mt-1 text-muted-foreground">{incident.solution}</div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                {incident.status === "en_proceso" ? (
                  <>
                    <Button variant="hero">Resolver incidencia</Button>
                    <Button variant="outline">
                      <MessageSquare /> Anadir comentario
                    </Button>
                  </>
                ) : (
                  <Button variant="outline">Ver detalles</Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Acciones rapidas</h3>
            <div className="mt-4 space-y-3">
              <Button className="w-full justify-start" variant="hero">+ Nueva incidencia</Button>
              <Button className="w-full justify-start" variant="outline">Reprogramar entregas</Button>
              <Button className="w-full justify-start" variant="outline">Contactar cocina</Button>
              <Button className="w-full justify-start" variant="outline">Notificar clientes</Button>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Incidencias por tipo</h3>
            <div className="mt-4 space-y-3 text-sm">
              {[
                { type: "Retraso cocina", count: 1, tone: "bg-primary" },
                { type: "Logistica", count: 1, tone: "bg-accent" },
                { type: "Ingredientes", count: 1, tone: "bg-warning" },
                { type: "Cliente", count: 1, tone: "bg-secondary-foreground" },
              ].map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-3 w-3 rounded-full", item.tone)} />
                    <span className="text-muted-foreground">{item.type}</span>
                  </div>
                  <span>{item.count}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-hero p-6 text-primary-foreground shadow-elegant">
            <h3 className="font-display text-lg font-bold">Tiempo de resolucion</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-primary-foreground/80">Promedio</span><span>45 min</span></div>
              <div className="flex justify-between"><span className="text-primary-foreground/80">Mas rapido</span><span>15 min</span></div>
              <div className="flex justify-between"><span className="text-primary-foreground/80">Tasa de resolucion</span><span>50%</span></div>
            </div>
          </Card>
        </div>
      </div>
    </RoleWorkspace>
  );
}

export function AdminUsersPage() {
  return (
    <RoleWorkspace
      roleTitle="Administrador"
      links={adminLinks}
      title="Gestion de usuarios y kitchens"
      subtitle="Administra cuentas, suscripciones y rendimiento de las dark kitchens desde un solo panel."
      actions={<Button variant="hero">+ Nuevo usuario</Button>}
    >
      <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Usuarios totales", value: "245", icon: Users, tone: "text-primary" },
          { label: "Suscripciones", value: "232", icon: TrendingUp, tone: "text-accent" },
          { label: "Ingresos mes", value: "S/ 104k", icon: DollarSign, tone: "text-primary" },
          { label: "Pedidos totales", value: "1,470", icon: Package, tone: "text-primary" },
          { label: "Satisfaccion", value: "96%", icon: Star, tone: "text-warning" },
          { label: "Dark Kitchens", value: "3", icon: Building2, tone: "text-accent" },
        ].map((stat) => {
          const Icon = stat.icon;
          return <MetricCard key={stat.label} icon={Icon} label={stat.label} tone={stat.tone} value={stat.value} />;
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden shadow-soft">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h3 className="font-display text-lg font-bold">Usuarios activos</h3>
            <Badge variant="secondary">{managementUsers.length} usuarios</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Usuario</th>
                  <th className="px-5 py-3">Plan</th>
                  <th className="px-5 py-3">Entregas</th>
                  <th className="px-5 py-3">Satisfaccion</th>
                  <th className="px-5 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {managementUsers.map((user) => (
                  <tr key={user.id} className="border-t border-border">
                    <td className="px-5 py-4">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </td>
                    <td className="px-5 py-4"><span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">{user.plan}</span></td>
                    <td className="px-5 py-4 text-muted-foreground">{user.deliveries}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-warning text-warning" />{user.satisfaction}%</div>
                    </td>
                    <td className="px-5 py-4">
                      {user.status === "active" ? (
                        <Badge className="bg-accent-soft text-accent hover:bg-accent-soft">Activo</Badge>
                      ) : (
                        <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">Pausado</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold">Rendimiento de dark kitchens</h3>
          <div className="mt-5 space-y-4">
            {managementKitchens.map((kitchen) => {
              const utilization = (kitchen.utilized / kitchen.capacity) * 100;

              return (
                <div key={kitchen.name} className="rounded-2xl border border-border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-display text-lg font-bold">{kitchen.name}</div>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-warning text-warning" /> {kitchen.rating}/5.0
                      </div>
                    </div>
                    <div className="rounded-xl bg-secondary px-3 py-2 text-right text-sm">
                      <div className="text-muted-foreground">Pedidos</div>
                      <div className="font-display text-xl font-bold text-primary">{kitchen.orders}</div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Capacidad</div>
                      <div className="font-medium">{kitchen.utilized}/{kitchen.capacity}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Eficiencia</div>
                      <div className="font-medium text-accent">{kitchen.efficiency}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Utilizacion</div>
                      <div className="font-medium">{utilization.toFixed(0)}%</div>
                    </div>
                  </div>
                  <Progress className="mt-4 h-3" value={utilization} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold">Distribucion de planes</h3>
          <div className="mt-5 space-y-4">
            {[
              { plan: "Basico", count: 68, percentage: 28, color: "bg-accent" },
              { plan: "Estandar", count: 142, percentage: 58, color: "bg-primary" },
              { plan: "Premium", count: 35, percentage: 14, color: "bg-warning" },
            ].map((item) => (
              <div key={item.plan}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.plan}</span>
                  <span>
                    <span className="font-medium text-foreground">{item.count}</span>
                    <span className="text-muted-foreground"> ({item.percentage}%)</span>
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-secondary">
                  <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-gradient-hero p-6 text-primary-foreground shadow-elegant">
          <h3 className="font-display text-lg font-bold">Resumen financiero</h3>
          <div className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between border-b border-white/20 pb-3"><span className="text-primary-foreground/80">Ingresos mensuales</span><span className="text-lg">S/ 104.1k</span></div>
            <div className="flex justify-between border-b border-white/20 pb-3"><span className="text-primary-foreground/80">Ticket promedio</span><span className="text-lg">S/ 449</span></div>
            <div className="flex justify-between border-b border-white/20 pb-3"><span className="text-primary-foreground/80">Retencion</span><span className="text-lg">94.7%</span></div>
            <div className="flex justify-between"><span className="text-primary-foreground/80">Crecimiento mensual</span><span className="text-lg text-primary-foreground">+12.5%</span></div>
          </div>
        </Card>
      </div>
    </RoleWorkspace>
  );
}
