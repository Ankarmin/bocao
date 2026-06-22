"use client";

import type { ComponentType } from "react";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle,
  ChevronRight,
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
  X,
} from "lucide-react";

import { RoleWorkspace } from "@/components/layout/role-workspace";
import type { SidebarLink } from "@/components/layout/role-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RouteMap, type MapPoint } from "@/components/ui/route-map";
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

const logisticsRouteCoords: Record<string, { center: [number, number]; truck: [number, number]; points: MapPoint[] }> = {
  "RUTA-001": {
    center: [-12.1150, -77.0347],
    truck: [-12.1110, -77.0333],
    points: [
      { lat: -12.1080, lng: -77.0365, label: "San Isidro #1", delivered: true },
      { lat: -12.1060, lng: -77.0365, label: "San Isidro #2", delivered: true },
      { lat: -12.1040, lng: -77.0365, label: "San Isidro #3", delivered: true },
      { lat: -12.1105, lng: -77.0358, label: "San Isidro #4", delivered: true },
      { lat: -12.1095, lng: -77.0350, label: "San Isidro #5", delivered: true },
      { lat: -12.1120, lng: -77.0355, label: "San Isidro #6", delivered: true },
      { lat: -12.1115, lng: -77.0345, label: "Miraflores #1", delivered: true },
      { lat: -12.1130, lng: -77.0340, label: "Miraflores #2", delivered: true },
      { lat: -12.1145, lng: -77.0335, label: "Miraflores #3", delivered: true },
      { lat: -12.1160, lng: -77.0330, label: "Miraflores #4", delivered: true },
      { lat: -12.1175, lng: -77.0325, label: "Miraflores #5", delivered: true },
      { lat: -12.1190, lng: -77.0320, label: "Miraflores #6", delivered: true },
      { lat: -12.1205, lng: -77.0315, label: "Miraflores #7", delivered: true },
      { lat: -12.1220, lng: -77.0310, label: "Miraflores #8", delivered: true },
      { lat: -12.1230, lng: -77.0300, label: "Miraflores #9", delivered: true },
      { lat: -12.1240, lng: -77.0290, label: "Miraflores #10", delivered: true },
      { lat: -12.1225, lng: -77.0280, label: "Miraflores #11", delivered: true },
      { lat: -12.1210, lng: -77.0275, label: "Miraflores #12", delivered: true },
      { lat: -12.1195, lng: -77.0270, label: "Miraflores #13", delivered: false },
      { lat: -12.1180, lng: -77.0265, label: "Miraflores #14", delivered: false },
      { lat: -12.1165, lng: -77.0260, label: "Miraflores #15", delivered: false },
      { lat: -12.1150, lng: -77.0255, label: "Miraflores #16", delivered: false },
      { lat: -12.1135, lng: -77.0250, label: "Miraflores #17", delivered: false },
      { lat: -12.1120, lng: -77.0245, label: "Miraflores #18", delivered: false },
    ],
  },
  "RUTA-002": {
    center: [-12.1280, -76.9900],
    truck: [-12.1280, -76.9900],
    points: [
      { lat: -12.1220, lng: -77.0250, label: "Surco #1", delivered: true },
      { lat: -12.1230, lng: -77.0200, label: "Surco #2", delivered: true },
      { lat: -12.1235, lng: -77.0130, label: "Surco #3", delivered: true },
      { lat: -12.1245, lng: -77.0060, label: "Surco #4", delivered: true },
      { lat: -12.1250, lng: -77.0010, label: "Surco #5", delivered: true },
      { lat: -12.1260, lng: -76.9970, label: "Surco #6", delivered: true },
      { lat: -12.1270, lng: -76.9945, label: "Surco #7", delivered: true },
      { lat: -12.1280, lng: -76.9915, label: "Surco #8", delivered: true },
      { lat: -12.1290, lng: -76.9870, label: "Surco #9", delivered: true },
      { lat: -12.1300, lng: -76.9820, label: "Surco #10", delivered: true },
      { lat: -12.1310, lng: -76.9760, label: "Surco #11", delivered: true },
      { lat: -12.1315, lng: -76.9700, label: "Surco #12", delivered: true },
      { lat: -12.1290, lng: -76.9580, label: "La Molina #1", delivered: true },
      { lat: -12.1250, lng: -76.9520, label: "La Molina #2", delivered: true },
      { lat: -12.1210, lng: -76.9460, label: "La Molina #3", delivered: true },
      { lat: -12.1170, lng: -76.9400, label: "La Molina #4", delivered: true },
      { lat: -12.1130, lng: -76.9350, label: "La Molina #5", delivered: true },
      { lat: -12.1090, lng: -76.9300, label: "La Molina #6", delivered: true },
      { lat: -12.1050, lng: -76.9250, label: "La Molina #7", delivered: true },
      { lat: -12.1010, lng: -76.9200, label: "La Molina #8", delivered: true },
      { lat: -12.0980, lng: -76.9170, label: "La Molina #9", delivered: true },
      { lat: -12.0950, lng: -76.9140, label: "La Molina #10", delivered: true },
      { lat: -12.0920, lng: -76.9110, label: "La Molina #11", delivered: true },
      { lat: -12.0890, lng: -76.9080, label: "La Molina #12", delivered: true },
      { lat: -12.0860, lng: -76.9050, label: "La Molina #13", delivered: true },
      { lat: -12.0960, lng: -76.9160, label: "La Molina #14", delivered: true },
      { lat: -12.1000, lng: -76.9190, label: "La Molina #15", delivered: true },
      { lat: -12.1040, lng: -76.9230, label: "La Molina #16", delivered: true },
    ],
  },
  "RUTA-003": {
    center: [-12.1550, -77.0240],
    truck: [-12.1500, -77.0230],
    points: [
      { lat: -12.1250, lng: -77.0290, label: "Barranco #1", delivered: true },
      { lat: -12.1300, lng: -77.0285, label: "Barranco #2", delivered: true },
      { lat: -12.1350, lng: -77.0270, label: "Barranco #3", delivered: true },
      { lat: -12.1400, lng: -77.0255, label: "Barranco #4", delivered: true },
      { lat: -12.1450, lng: -77.0240, label: "Barranco #5", delivered: true },
      { lat: -12.1480, lng: -77.0235, label: "Barranco #6", delivered: true },
      { lat: -12.1500, lng: -77.0225, label: "Barranco #7", delivered: true },
      { lat: -12.1520, lng: -77.0220, label: "Barranco #8", delivered: true },
      { lat: -12.1550, lng: -77.0230, label: "Chorrillos #1", delivered: true },
      { lat: -12.1580, lng: -77.0240, label: "Chorrillos #2", delivered: true },
      { lat: -12.1610, lng: -77.0245, label: "Chorrillos #3", delivered: true },
      { lat: -12.1640, lng: -77.0250, label: "Chorrillos #4", delivered: true },
      { lat: -12.1670, lng: -77.0260, label: "Chorrillos #5", delivered: false },
      { lat: -12.1700, lng: -77.0270, label: "Chorrillos #6", delivered: false },
      { lat: -12.1720, lng: -77.0280, label: "Chorrillos #7", delivered: false },
      { lat: -12.1740, lng: -77.0290, label: "Chorrillos #8", delivered: false },
      { lat: -12.1760, lng: -77.0300, label: "Chorrillos #9", delivered: false },
      { lat: -12.1780, lng: -77.0310, label: "Chorrillos #10", delivered: false },
      { lat: -12.1800, lng: -77.0320, label: "Chorrillos #11", delivered: false },
    ],
  },
  "RUTA-004": {
    center: [-12.0760, -77.0490],
    truck: [-12.0760, -77.0490],
    points: [
      { lat: -12.0750, lng: -77.0480, label: "Jesús María #1", delivered: false },
      { lat: -12.0740, lng: -77.0475, label: "Jesús María #2", delivered: false },
      { lat: -12.0730, lng: -77.0470, label: "Jesús María #3", delivered: false },
      { lat: -12.0720, lng: -77.0465, label: "Jesús María #4", delivered: false },
      { lat: -12.0710, lng: -77.0460, label: "Jesús María #5", delivered: false },
      { lat: -12.0700, lng: -77.0490, label: "Jesús María #6", delivered: false },
      { lat: -12.0715, lng: -77.0500, label: "Jesús María #7", delivered: false },
      { lat: -12.0730, lng: -77.0510, label: "Jesús María #8", delivered: false },
      { lat: -12.0745, lng: -77.0520, label: "Jesús María #9", delivered: false },
      { lat: -12.0760, lng: -77.0530, label: "Jesús María #10", delivered: false },
      { lat: -12.0775, lng: -77.0510, label: "Lince #1", delivered: false },
      { lat: -12.0790, lng: -77.0490, label: "Lince #2", delivered: false },
      { lat: -12.0805, lng: -77.0470, label: "Lince #3", delivered: false },
      { lat: -12.0820, lng: -77.0450, label: "Lince #4", delivered: false },
      { lat: -12.0835, lng: -77.0430, label: "Lince #5", delivered: false },
      { lat: -12.0850, lng: -77.0410, label: "Lince #6", delivered: false },
      { lat: -12.0865, lng: -77.0390, label: "Lince #7", delivered: false },
      { lat: -12.0840, lng: -77.0400, label: "Lince #8", delivered: false },
      { lat: -12.0810, lng: -77.0460, label: "Lince #9", delivered: false },
      { lat: -12.0780, lng: -77.0500, label: "Jesús María #11", delivered: false },
      { lat: -12.0755, lng: -77.0505, label: "Jesús María #12", delivered: false },
      { lat: -12.0830, lng: -77.0440, label: "Lince #10", delivered: false },
    ],
  },
};

type Incident = {
  id: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  affectedOrders: number;
  createdAt: string;
  assignedTo: string;
  kitchen?: string;
  solution?: string;
};

const incidents: Incident[] = [
  {
    id: "INC-2026-001",
    title: "Retraso en Dark Kitchen Norte",
    description: "Demora de 45 minutos en produccion del lote LOTE-001.",
    severity: "high",
    status: "en_proceso",
    affectedOrders: 24,
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
  { id: 1, name: "Juan Perez", email: "juan.perez@email.com", role: "customer", plan: "Estandar", status: "active", deliveries: 63, satisfaction: 98 },
  { id: 2, name: "Maria Gonzalez", email: "maria@bocao.pe", role: "kitchen", plan: "--", status: "active", deliveries: 289, satisfaction: 100 },
  { id: 3, name: "Carlos Garcia", email: "carlos@example.com", role: "customer", plan: "Basico", status: "paused", deliveries: 12, satisfaction: 85 },
  { id: 4, name: "Admin Sistema", email: "admin@bocao.pe", role: "admin", plan: "--", status: "active", deliveries: 0, satisfaction: 100 },
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
  const [feedback, setFeedback] = useState("");

  return (
    <RoleWorkspace
      roleTitle="Administrador"
      links={adminLinks}
      title="Monitor de consolidacion"
      subtitle="Extraccion, clasificacion de demanda y asignacion de insumos por dark kitchen."
      actions={
        <>
          <Button variant="outline" onClick={() => setFeedback("CSV exportado: consolidacion_2026-05-03.csv")}>
            <Download /> Exportar CSV
          </Button>
          <Button variant="hero" onClick={() => setFeedback("Datos actualizados: " + new Date().toLocaleTimeString())}>
            <RefreshCw /> Actualizar
          </Button>
        </>
      }
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
  const [feedback, setFeedback] = useState("");
  const [mapRoute, setMapRoute] = useState<(typeof logisticsRoutes)[number] | null>(null);
  const [detailRoute, setDetailRoute] = useState<(typeof logisticsRoutes)[number] | null>(null);

  return (
    <RoleWorkspace
      roleTitle="Administrador"
      links={adminLinks}
      title="Panel de control logistico"
      subtitle="Seguimiento en tiempo real de rutas, entregas y estado de conductores."
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
                  <Button variant="hero" onClick={() => setMapRoute(route)}>
                    <MapPin /> Ver en mapa
                  </Button>
                  <Button variant="outline" onClick={() => setDetailRoute(route)}>Ver detalles</Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="space-y-6">
          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Mapa de rutas</h3>
            <div className="mt-4 space-y-2">
              {logisticsRoutes.map((r) => (
                <button
                  key={r.id}
                  className="flex w-full items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3 text-left transition-smooth hover:border-primary/30 hover:bg-secondary"
                  onClick={() => setMapRoute(r)}
                  type="button"
                >
                  <div
                    className={
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white " +
                      (r.status === "en_ruta"
                        ? "bg-primary"
                        : r.status === "completado"
                          ? "bg-accent"
                          : "bg-muted-foreground")
                    }
                  >
                    {r.id.split("-")[1]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{r.zone}</div>
                    <div className="text-xs text-muted-foreground">
                      {r.completed}/{r.deliveries} entregas
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              ))}
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

      {mapRoute ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden shadow-elegant">
            <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h3 className="font-display text-xl font-bold">Mapa en tiempo real</h3>
                <p className="text-sm text-muted-foreground">
                  {mapRoute.id} · {mapRoute.driver} · {mapRoute.zone}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMapRoute(null)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1" style={{ minHeight: 420, height: 420 }}>
              {(() => {
                const coords = logisticsRouteCoords[mapRoute.id];
                return coords ? (
                  <RouteMap
                    center={coords.center}
                    points={coords.points}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-secondary/30 text-sm text-muted-foreground">
                    Cargando mapa...
                  </div>
                );
              })()}
            </div>

            <div className="shrink-0 border-t border-border px-6 py-4">
              <div className="grid gap-3 text-sm md:grid-cols-3">
                <div className="rounded-xl bg-secondary/40 p-3">
                  <div className="text-xs text-muted-foreground">Ubicación actual</div>
                  <div className="mt-1 font-medium">{mapRoute.currentLocation}</div>
                </div>
                <div className="rounded-xl bg-secondary/40 p-3">
                  <div className="text-xs text-muted-foreground">Progreso</div>
                  <div className="mt-1 font-medium">
                    {mapRoute.completed}/{mapRoute.deliveries} entregas
                  </div>
                  <Progress className="mt-2 h-2" value={(mapRoute.completed / mapRoute.deliveries) * 100} />
                </div>
                <div className="rounded-xl bg-secondary/40 p-3">
                  <div className="text-xs text-muted-foreground">Est. finalización</div>
                  <div className="mt-1 font-medium">{mapRoute.estimatedCompletion}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : null}

      {detailRoute ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden shadow-elegant">
            <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h3 className="font-display text-xl font-bold">{detailRoute.id}</h3>
                <p className="text-sm text-muted-foreground">{detailRoute.zone}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setDetailRoute(null)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="overflow-y-auto p-6">


            <div className="space-y-4">


              <div className="flex items-center gap-2">
                {routeStatusBadge(detailRoute.status)}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-secondary/40 p-4">
                  <div className="text-xs uppercase text-muted-foreground">Conductor</div>
                  <div className="mt-1 font-medium">{detailRoute.driver}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{detailRoute.phone}</div>
                </div>
                <div className="rounded-xl bg-secondary/40 p-4">
                  <div className="text-xs uppercase text-muted-foreground">Vehículo</div>
                  <div className="mt-1 font-medium">{detailRoute.vehicle}</div>
                </div>
                <div className="rounded-xl bg-secondary/40 p-4">
                  <div className="text-xs uppercase text-muted-foreground">Ubicación</div>
                  <div className="mt-1 font-medium">{detailRoute.currentLocation}</div>
                </div>
                <div className="rounded-xl bg-secondary/40 p-4">
                  <div className="text-xs uppercase text-muted-foreground">Zona</div>
                  <div className="mt-1 font-medium">{detailRoute.zone}</div>
                </div>
              </div>

              <div className="rounded-xl bg-secondary/40 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Progreso de entregas</span>
                  <span className="font-medium">
                    {detailRoute.completed}/{detailRoute.deliveries}
                  </span>
                </div>
                <Progress className="h-3" value={(detailRoute.completed / detailRoute.deliveries) * 100} />
              </div>

              <div className="grid gap-2">
                {Array.from({ length: detailRoute.deliveries }).map((_, i) => {
                  const delivered = i < detailRoute.completed;
                  return (
                    <div
                      key={i}
                      className={
                        "flex items-center gap-3 rounded-lg border p-3 text-sm " +
                        (delivered
                          ? "border-accent/30 bg-accent/5"
                          : "border-border bg-background")
                      }
                    >
                      <div
                        className={
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold " +
                          (delivered
                            ? "bg-accent/15 text-accent"
                            : "bg-secondary text-muted-foreground")
                        }
                      >
                        {delivered ? <CheckCircle className="h-3.5 w-3.5" /> : i + 1}
                      </div>
                      <span className="flex-1">Entrega #{i + 1}</span>
                      <span className="text-xs text-muted-foreground">
                        {delivered ? "Completado" : "Pendiente"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            </div>
          </Card>
        </div>
      ) : null}
    </RoleWorkspace>
  );
}

export function AdminIncidentsPage() {
  const [incidentList, setIncidentList] = useState(incidents);
  const active = incidentList.filter((i) => i.status === "en_proceso");
  const resolved = incidentList.filter((i) => i.status === "resuelto");

  const [modal, setModal] = useState<{ type: "new" | "resolve" | "comment" | "detail" | "notify" | "reprogramar" | "contactar" | null; incidentId?: string }>({ type: null });
  const [commentText, setCommentText] = useState("");
  const [solutionText, setSolutionText] = useState("");

  const [newForm, setNewForm] = useState({ title: "", description: "", severity: "medium" as string, kitchen: "", affectedOrders: 1 });

  function closeModal() {
    setModal({ type: null });
    setCommentText("");
    setSolutionText("");
    setNewForm({ title: "", description: "", severity: "medium", kitchen: "", affectedOrders: 1 });
  }

  function handleResolve(incidentId: string) {
    if (!solutionText.trim()) return;
    setIncidentList((prev) =>
      prev.map((inc) =>
        inc.id === incidentId
          ? { ...inc, status: "resuelto" as const, solution: solutionText }
          : inc,
      ),
    );
    closeModal();
  }

  function handleCreateIncident() {
    if (!newForm.title.trim() || !newForm.description.trim()) return;
    const newIncident = {
      id: "INC-2026-00" + (incidentList.length + 1),
      title: newForm.title,
      description: newForm.description,
      severity: newForm.severity,
      status: "en_proceso" as const,
      affectedOrders: newForm.affectedOrders,
      createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      assignedTo: "Maria Gonzalez",
      kitchen: newForm.kitchen || undefined,
    };
    setIncidentList((prev) => [newIncident, ...prev]);
    closeModal();
  }

  const modalIncident = modal.incidentId ? incidentList.find((i) => i.id === modal.incidentId) : undefined;

  return (
    <RoleWorkspace
      roleTitle="Administrador"
      links={adminLinks}
      title="Centro de resolucion de incidencias"
      subtitle="Gestiona retrasos, problemas logisticos e imprevistos operativos antes de impactar la entrega."
    >
      <div className="grid gap-5 md:grid-cols-4">
        {[
          { label: "Incidencias totales", value: incidentList.length.toString(), icon: AlertTriangle, tone: "text-primary" },
          { label: "En proceso", value: active.length.toString(), icon: Clock, tone: "text-warning" },
          { label: "Resueltas", value: resolved.length.toString(), icon: CheckCircle, tone: "text-accent" },
          { label: "Pedidos afectados", value: incidentList.reduce((s, i) => s + i.affectedOrders, 0).toString(), icon: Calendar, tone: "text-primary" },
        ].map((stat) => {
          const Icon = stat.icon;
          return <MetricCard key={stat.label} icon={Icon} label={stat.label} tone={stat.tone} value={stat.value} />;
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {incidentList.map((incident) => (
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
                    <Button variant="hero" onClick={() => { setSolutionText(""); setModal({ type: "resolve", incidentId: incident.id }); }}>Resolver incidencia</Button>
                    <Button variant="outline" onClick={() => { setCommentText(""); setModal({ type: "comment", incidentId: incident.id }); }}>
                      <MessageSquare /> Anadir comentario
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setModal({ type: "detail", incidentId: incident.id })}>Ver detalles</Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Acciones rapidas</h3>
            <div className="mt-4 space-y-2">
              <button
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-smooth hover:border-primary/30 hover:bg-secondary hover:text-foreground"
                onClick={() => setModal({ type: "new" })}
                type="button"
              >
                <AlertTriangle className="h-4 w-4" />Nueva incidencia
              </button>
              <button
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-smooth hover:border-primary/30 hover:bg-secondary hover:text-foreground"
                onClick={() => setModal({ type: "reprogramar" })}
                type="button"
              >
                <Clock className="h-4 w-4" />Reprogramar entregas
              </button>
              <button
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-smooth hover:border-primary/30 hover:bg-secondary hover:text-foreground"
                onClick={() => setModal({ type: "contactar" })}
                type="button"
              >
                <MessageSquare className="h-4 w-4" />Contactar cocina
              </button>
              <button
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-smooth hover:border-primary/30 hover:bg-secondary hover:text-foreground"
                onClick={() => setModal({ type: "notify" })}
                type="button"
              >
                <MessageSquare className="h-4 w-4" />Notificar clientes
              </button>
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

      {modal.type ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden shadow-elegant">

            {/* NUEVA INCIDENCIA */}
            {modal.type === "new" && (
              <>
                <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
                  <h3 className="font-display text-xl font-bold">Nueva incidencia</h3>
                  <Button variant="ghost" size="icon" onClick={closeModal}><X className="h-5 w-5" /></Button>
                </div>
                <div className="overflow-y-auto p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Titulo</label>
                      <Input className="mt-1" value={newForm.title} onChange={(e) => setNewForm((f) => ({ ...f, title: e.target.value }))} placeholder="Describe el problema" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Descripcion</label>
                      <Input className="mt-1" value={newForm.description} onChange={(e) => setNewForm((f) => ({ ...f, description: e.target.value }))} placeholder="Detalles de la incidencia" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Severidad</label>
                        <select className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={newForm.severity} onChange={(e) => setNewForm((f) => ({ ...f, severity: e.target.value }))}>
                          <option value="low">Bajo</option>
                          <option value="medium">Medio</option>
                          <option value="high">Alto</option>
                          <option value="critical">Critico</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Pedidos afectados</label>
                        <Input className="mt-1" type="number" value={newForm.affectedOrders} onChange={(e) => setNewForm((f) => ({ ...f, affectedOrders: Number(e.target.value) }))} />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Cocina involucrada</label>
                      <select className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={newForm.kitchen} onChange={(e) => setNewForm((f) => ({ ...f, kitchen: e.target.value }))}>
                        <option value="">Ninguna</option>
                        <option value="Dark Kitchen Norte">Dark Kitchen Norte</option>
                        <option value="Dark Kitchen Centro">Dark Kitchen Centro</option>
                        <option value="Dark Kitchen Sur">Dark Kitchen Sur</option>
                      </select>
                    </div>
                    <Button variant="hero" className="w-full" onClick={handleCreateIncident}>Crear incidencia</Button>
                  </div>
                </div>
              </>
            )}

            {/* RESOLVER INCIDENCIA */}
            {modal.type === "resolve" && modalIncident && (
              <>
                <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
                  <div>
                    <h3 className="font-display text-xl font-bold">Resolver {modalIncident.id}</h3>
                    <p className="text-sm text-muted-foreground">{modalIncident.title}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={closeModal}><X className="h-5 w-5" /></Button>
                </div>
                <div className="overflow-y-auto p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Solucion aplicada</label>
                      <Input className="mt-1" value={solutionText} onChange={(e) => setSolutionText(e.target.value)} placeholder="Describe como se resolvio la incidencia" />
                    </div>
                    <Button variant="hero" className="w-full" onClick={() => handleResolve(modalIncident.id)} disabled={!solutionText.trim()}>Marcar como resuelta</Button>
                  </div>
                </div>
              </>
            )}

            {/* COMENTARIO */}
            {modal.type === "comment" && modalIncident && (
              <>
                <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
                  <div>
                    <h3 className="font-display text-xl font-bold">Anadir comentario</h3>
                    <p className="text-sm text-muted-foreground">{modalIncident.id} · {modalIncident.title}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={closeModal}><X className="h-5 w-5" /></Button>
                </div>
                <div className="overflow-y-auto p-6">
                  <div className="space-y-4">
                    <Input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Escribe tu comentario sobre esta incidencia..." />
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={closeModal}>Cancelar</Button>
                      <Button variant="hero" className="flex-1" onClick={() => { if (commentText.trim()) closeModal(); }} disabled={!commentText.trim()}>Guardar comentario</Button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* VER DETALLES */}
            {modal.type === "detail" && modalIncident && (
              <>
                <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
                  <div>
                    <h3 className="font-display text-xl font-bold">{modalIncident.id}</h3>
                    <p className="text-sm text-muted-foreground">{modalIncident.title}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={closeModal}><X className="h-5 w-5" /></Button>
                </div>
                <div className="overflow-y-auto p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">{severityBadge(modalIncident.severity)} {incidentStatus(modalIncident.status)}</div>
                    <p className="text-sm text-muted-foreground">{modalIncident.description}</p>
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="rounded-xl bg-secondary/40 p-3"><div className="text-xs text-muted-foreground">Afectados</div><div className="font-bold">{modalIncident.affectedOrders}</div></div>
                      <div className="rounded-xl bg-secondary/40 p-3"><div className="text-xs text-muted-foreground">Asignado</div><div className="font-medium text-sm">{modalIncident.assignedTo}</div></div>
                      <div className="rounded-xl bg-secondary/40 p-3"><div className="text-xs text-muted-foreground">Creado</div><div className="font-medium text-sm">{modalIncident.createdAt}</div></div>
                    </div>
                    {modalIncident.kitchen && <div className="rounded-xl border border-primary/15 bg-primary/5 p-4 text-sm text-primary">Cocina: {modalIncident.kitchen}</div>}
                    {modalIncident.solution && (
                      <div className="rounded-xl border border-accent/20 bg-accent-soft/70 p-4 text-sm">
                        <div className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-accent" /><div><div className="font-semibold">Solucion</div><div className="mt-1 text-muted-foreground">{modalIncident.solution}</div></div></div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* NOTIFICAR CLIENTES */}
            {modal.type === "notify" && (
              <>
                <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
                  <h3 className="font-display text-xl font-bold">Notificar clientes</h3>
                  <Button variant="ghost" size="icon" onClick={closeModal}><X className="h-5 w-5" /></Button>
                </div>
                <div className="overflow-y-auto p-6">
                  <div className="space-y-4">
                    <div className="rounded-xl bg-warning/10 border border-warning/20 p-4 text-sm">
                      <AlertTriangle className="mb-2 h-5 w-5 text-warning" />
                      <p className="font-medium text-warning">{active.length} incidencias activas</p>
                      <p className="mt-1 text-muted-foreground">Se notificara a {active.reduce((s, i) => s + i.affectedOrders, 0)} clientes sobre el estado actual de sus pedidos.</p>
                    </div>
                    <Input placeholder="Mensaje personalizado (opcional)" />
                    <Button variant="hero" className="w-full" onClick={closeModal}>Enviar notificaciones</Button>
                  </div>
                </div>
              </>
            )}

            {/* REPROGRAMAR ENTREGAS */}
            {modal.type === "reprogramar" && (
              <>
                <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
                  <h3 className="font-display text-xl font-bold">Reprogramar entregas</h3>
                  <Button variant="ghost" size="icon" onClick={closeModal}><X className="h-5 w-5" /></Button>
                </div>
                <div className="overflow-y-auto p-6">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Selecciona las rutas a reprogramar:</p>
                    {["RUTA-001", "RUTA-003"].map((r) => (
                      <label key={r} className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3 cursor-pointer">
                        <input type="checkbox" className="h-4 w-4" defaultChecked />
                        <div>
                          <div className="font-medium">{r}</div>
                          <div className="text-xs text-muted-foreground">{active.find((i) => i.id.includes("00" + r.split("-")[1]))?.title ?? "Sin incidencia"}</div>
                        </div>
                      </label>
                    ))}
                    <Input type="date" className="mt-2" />
                    <Button variant="hero" className="w-full" onClick={closeModal}>Reprogramar seleccionadas</Button>
                  </div>
                </div>
              </>
            )}

            {/* CONTACTAR COCINA */}
            {modal.type === "contactar" && (
              <>
                <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
                  <h3 className="font-display text-xl font-bold">Contactar cocina</h3>
                  <Button variant="ghost" size="icon" onClick={closeModal}><X className="h-5 w-5" /></Button>
                </div>
                <div className="overflow-y-auto p-6">
                  <div className="space-y-4">
                    <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" defaultValue="">
                      <option value="" disabled>Selecciona una cocina</option>
                      <option>Dark Kitchen Norte</option>
                      <option>Dark Kitchen Centro</option>
                      <option>Dark Kitchen Sur</option>
                    </select>
                    <Input placeholder="Asunto del mensaje" />
                    <Input placeholder="Mensaje para la cocina" />
                    <Button variant="hero" className="w-full" onClick={closeModal}>Enviar mensaje</Button>
                  </div>
                </div>
              </>
            )}

          </Card>
        </div>
      ) : null}
    </RoleWorkspace>
  );
}

export function AdminUsersPage() {
  const [userList, setUserList] = useState(managementUsers);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "customer", plan: "Estandar", status: "active" });

  function handleCreate() {
    if (!form.name.trim() || !form.email.trim()) return;
    const newUser = {
      id: userList.length + 1,
      name: form.name,
      email: form.email,
      role: form.role,
      plan: form.role === "customer" ? form.plan : "--",
      status: form.status,
      deliveries: 0,
      satisfaction: 100,
    };
    setUserList((prev) => [newUser, ...prev]);
    setShowModal(false);
    setForm({ name: "", email: "", role: "customer", plan: "Estandar", status: "active" });
  }

  return (
    <RoleWorkspace
      roleTitle="Administrador"
      links={adminLinks}
      title="Gestion de usuarios y kitchens"
      subtitle="Administra cuentas, suscripciones y rendimiento de las dark kitchens desde un solo panel."
      actions={<Button variant="hero" onClick={() => setShowModal(true)}>Nuevo usuario</Button>}
    >
      <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Usuarios totales", value: userList.length.toString(), icon: Users, tone: "text-primary" },
          { label: "Clientes", value: userList.filter((u) => u.role === "customer").length.toString(), icon: Users, tone: "text-accent" },
          { label: "Kitchen", value: userList.filter((u) => u.role === "kitchen").length.toString(), icon: Building2, tone: "text-warning" },
          { label: "Suscripciones", value: userList.filter((u) => u.status === "active").length.toString(), icon: TrendingUp, tone: "text-accent" },
          { label: "Ingresos mes", value: "S/ 104k", icon: DollarSign, tone: "text-primary" },
          { label: "Pedidos totales", value: "1,470", icon: Package, tone: "text-primary" },
        ].map((stat) => {
          const Icon = stat.icon;
          return <MetricCard key={stat.label} icon={Icon} label={stat.label} tone={stat.tone} value={stat.value} />;
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden shadow-soft">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h3 className="font-display text-lg font-bold">Usuarios activos</h3>
            <Badge variant="secondary">{userList.length} usuarios</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Usuario</th>
                  <th className="px-5 py-3">Rol</th>
                  <th className="px-5 py-3">Plan</th>
                  <th className="px-5 py-3">Entregas</th>
                  <th className="px-5 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user.id} className="border-t border-border">
                    <td className="px-5 py-4">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </td>
                    <td className="px-5 py-4">
                      {user.role === "admin" ? (
                        <Badge className="bg-primary text-primary-foreground hover:bg-primary">Admin</Badge>
                      ) : user.role === "kitchen" ? (
                        <Badge className="bg-warning/15 text-warning hover:bg-warning/15">Kitchen</Badge>
                      ) : (
                        <Badge className="bg-accent-soft text-accent hover:bg-accent-soft">Cliente</Badge>
                      )}
                    </td>
                    <td className="px-5 py-4"><span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">{user.plan}</span></td>
                    <td className="px-5 py-4 text-muted-foreground">{user.deliveries}</td>
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

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="relative w-full max-w-md overflow-hidden shadow-elegant">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h3 className="font-display text-xl font-bold">Nuevo usuario</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}><X className="h-5 w-5" /></Button>
            </div>
            <div className="space-y-4 p-6">
              <div>
                <label className="text-sm font-medium">Nombre</label>
                <Input className="mt-1" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Nombre completo" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input className="mt-1" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="correo@ejemplo.com" />
              </div>
              <div>
                <label className="text-sm font-medium">Rol</label>
                <select className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
                  <option value="customer">Cliente</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              {form.role === "customer" && (
                <div>
                  <label className="text-sm font-medium">Plan</label>
                  <select className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.plan} onChange={(e) => setForm((f) => ({ ...f, plan: e.target.value }))}>
                    <option>Basico</option>
                    <option>Estandar</option>
                    <option>Premium</option>
                  </select>
                </div>
              )}
              <div>
                <label className="text-sm font-medium">Estado</label>
                <select className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
                  <option value="active">Activo</option>
                  <option value="paused">Pausado</option>
                </select>
              </div>
              <Button variant="hero" className="w-full" onClick={handleCreate} disabled={!form.name.trim() || !form.email.trim()}>Crear usuario</Button>
            </div>
          </Card>
        </div>
      ) : null}
    </RoleWorkspace>
  );
}
