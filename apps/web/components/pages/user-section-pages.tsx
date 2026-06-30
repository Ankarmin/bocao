"use client";

import type { ComponentType } from "react";

import Link from "next/link";
import React, { useState } from "react";
import {
  Activity,
  Apple,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Dumbbell,
  Flame,
  Heart,
  MapPin,
  Package,
  Pause,
  Play,
  Pencil,
  Save,
  ShoppingBag,
  TrendingUp,
  Truck,
  User,
  Utensils,
  X,
} from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { RoleWorkspace } from "@/components/layout/role-workspace";
import type { SidebarLink } from "@/components/layout/role-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { PLANS } from "@/data/plans";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  tone: string;
  description?: string;
};

const userLinks: SidebarLink[] = [
  { href: "/dashboard", label: "Resumen", icon: "bar-chart" },
  { href: "/dashboard/pedidos", label: "Pedidos", icon: "clipboard-list" },
  { href: "/dashboard/perfil", label: "Perfil", icon: "user" },
  { href: "/dashboard/nutricion", label: "Nutrición", icon: "utensils" },
];

const weeklyMenu = [
  { day: "Lun", meal: "Bowl de quinua y pollo grillado", kcal: 540, protein: 42, carbs: 48, fats: 18 },
  { day: "Mar", meal: "Salmon al horno con vegetales", kcal: 610, protein: 48, carbs: 38, fats: 28 },
  { day: "Mie", meal: "Wrap mediterraneo de pavo", kcal: 480, protein: 38, carbs: 44, fats: 16 },
  { day: "Jue", meal: "Curry tailandes vegetariano", kcal: 520, protein: 22, carbs: 58, fats: 22 },
  { day: "Vie", meal: "Tacos saludables de res", kcal: 580, protein: 44, carbs: 46, fats: 20 },
  { day: "Sab", meal: "Poke bowl de atun", kcal: 560, protein: 40, carbs: 52, fats: 16 },
  { day: "Dom", meal: "Pasta integral con pesto", kcal: 590, protein: 28, carbs: 64, fats: 22 },
];

const defaultOrders = [
  {
    id: "#BOCAO-1042",
    date: "2026-05-03",
    status: "entregado",
    plan: "Estándar",
    meals: 14,
    total: "S/ 345.45",
    address: "Av. Pardo 456, Dpto 301, Miraflores",
    driver: "Carlos Mendoza",
    route: "RUTA-001",
    lote: "LOTE-001",
    deliveredAt: "8:45 AM",
    items: ["7 almuerzos", "7 cenas", "7 snacks"],
  },
  {
    id: "#BOCAO-0987",
    date: "2026-04-26",
    status: "entregado",
    plan: "Estándar",
    meals: 14,
    total: "S/ 345.45",
    address: "Av. Benavides 234, Surco",
    driver: "Pedro Sanchez",
    route: "RUTA-002",
    lote: "LOTE-002",
    deliveredAt: "9:10 AM",
    items: ["7 almuerzos", "7 cenas", "7 snacks"],
  },
  {
    id: "#BOCAO-0932",
    date: "2026-04-19",
    status: "entregado",
    plan: "Estándar",
    meals: 14,
    total: "S/ 345.45",
    address: "Av. Grau 567, Barranco",
    driver: "Jorge Ramirez",
    route: "RUTA-003",
    lote: "LOTE-003",
    deliveredAt: "8:30 AM",
    items: ["7 almuerzos", "7 cenas", "7 snacks"],
  },
  {
    id: "#BOCAO-0876",
    date: "2026-04-12",
    status: "entregado",
    plan: "Básico",
    meals: 7,
    total: "S/ 208.95",
    address: "Jr. Salaverry 890, Jesús María",
    driver: "Ana Torres",
    route: "RUTA-004",
    lote: "LOTE-004",
    deliveredAt: "9:00 AM",
    items: ["7 almuerzos"],
  },
  {
    id: "#BOCAO-0821",
    date: "2026-04-05",
    status: "entregado",
    plan: "Básico",
    meals: 7,
    total: "S/ 208.95",
    address: "Av. Pardo 456, Dpto 301, Miraflores",
    driver: "Carlos Mendoza",
    route: "RUTA-001",
    lote: "LOTE-001",
    deliveredAt: "10:15 AM",
    items: ["7 almuerzos"],
  },
];

const defaultNutritionLog = [
  { day: "Lun", kcal: 2080, protein: 138, carbs: 210, fats: 68, goal: 2100 },
  { day: "Mar", kcal: 2150, protein: 142, carbs: 218, fats: 72, goal: 2100 },
  { day: "Mie", kcal: 1950, protein: 128, carbs: 196, fats: 62, goal: 2100 },
  { day: "Jue", kcal: 2100, protein: 140, carbs: 212, fats: 70, goal: 2100 },
  { day: "Vie", kcal: 2220, protein: 145, carbs: 225, fats: 75, goal: 2100 },
  { day: "Sab", kcal: 1890, protein: 125, carbs: 190, fats: 60, goal: 2100 },
  { day: "Dom", kcal: 2050, protein: 135, carbs: 208, fats: 66, goal: 2100 },
];

const userPlan = PLANS.find((p) => p.id === "estandar")!;

function orderStatusBadge(status: string) {
  if (status === "entregado") {
    return <Badge className="bg-accent-soft text-accent hover:bg-accent-soft">Entregado</Badge>;
  }
  if (status === "en_ruta") {
    return <Badge className="bg-warning/15 text-warning hover:bg-warning/15">En ruta</Badge>;
  }
  return <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">Pendiente</Badge>;
}

function MetricCard({ label, value, icon: Icon, tone, description }: MetricCardProps) {
  return (
    <Card className="p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className={cn("mt-3 font-display text-4xl font-extrabold", tone)}>{value}</div>
          {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary/70">
          <Icon className={cn("h-5 w-5", tone)} />
        </div>
      </div>
    </Card>
  );
}

export function UserOverviewPage() {
  const [paused, setPaused] = useState(false);

  function handleTogglePause() {
    setPaused(!paused);
  }

  const daysRemaining = 5;

  const nextDeliveryDay = "Lun";
  const nextDeliveryDesc = "9:00 - 12:00 AM";

  const dailyCalories = 2100;
  const profileObjetivo = "Bajar grasa corporal";

  const progressKcal = 92;
  const progressProtein = 88;
  const progressCarbs = 95;
  const progressFats = 78;

  return (
    <RoleWorkspace
      roleTitle="Mi cuenta"
      links={userLinks}
      title="Resumen de tu plan"
      subtitle="Consulta el estado de tu suscripción, el menú de la semana y tu próxima entrega."
      actions={
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleTogglePause}>
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            {paused ? "Reanudar plan" : "Pausar plan"}
          </Button>
          <Link href="/planes">
            <Button variant="hero">
              <ShoppingBag className="h-4 w-4" /> Cambiar plan
            </Button>
          </Link>
        </div>
      }
    >
      {paused ? (
        <Card className="mb-6 border-warning/30 bg-warning/5 p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-warning/15">
              <Pause className="h-5 w-5 text-warning" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-warning">Plan pausado</h3>
              <p className="text-sm text-muted-foreground">
                Tu suscripción está temporalmente pausada. No recibiras entregas ni se realizaran cobros hasta que la reanudes.
              </p>
            </div>
          </div>
        </Card>
      ) : null}

      <div className="grid gap-5 md:grid-cols-4">
        <MetricCard icon={Calendar} label="Días restantes" tone="text-primary" value={String(daysRemaining)} />
        <MetricCard icon={Truck} label="Proxima entrega" tone="text-accent" value={nextDeliveryDay} description={nextDeliveryDesc} />
        <MetricCard icon={Flame} label="Calorías diarias" tone="text-primary" value={dailyCalories.toLocaleString()} description={`Objetivo: ${profileObjetivo.toLowerCase()}`} />
        <Card className="p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Plan activo</div>
              <div className="mt-3 font-display text-4xl font-extrabold text-primary">{userPlan.name}</div>
              <p className="mt-1 text-sm text-muted-foreground">
                {userPlan.currency} {userPlan.price.toFixed(2)} / {userPlan.period}
              </p>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10">
              <ShoppingBag className="h-5 w-5 text-accent" />
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-6 shadow-soft lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                <Utensils className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">Menu de la semana</h3>
                <p className="text-sm text-muted-foreground">
                  Plan {userPlan.name} · {userPlan.mealsPerWeek} comidas / {userPlan.period}
                </p>
              </div>
            </div>
            <Badge variant="secondary">7 días</Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {weeklyMenu.slice(0, userPlan.deliveriesPerWeek === 1 ? 4 : userPlan.deliveriesPerWeek === 2 ? 7 : 7).map((item) => (
              <div key={item.day} className="rounded-xl border border-border bg-secondary/40 p-4">
                <div className="text-xs font-semibold uppercase text-muted-foreground">{item.day}</div>
                <div className="mt-2 text-sm font-medium leading-snug">{item.meal}</div>
                <div className="mt-3 inline-flex rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent">
                  {item.kcal} kcal
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Progreso semanal</h3>
            <div className="mt-5 space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Calorías</span>
                  <span className="font-semibold">{progressKcal}%</span>
                </div>
                <Progress className="mt-2 h-3" value={progressKcal} />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Proteínas</span>
                  <span className="font-semibold">{progressProtein}%</span>
                </div>
                <Progress className="mt-2 h-3" value={progressProtein} />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Carbohidratos</span>
                  <span className="font-semibold">{progressCarbs}%</span>
                </div>
                <Progress className="mt-2 h-3" value={progressCarbs} />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Grasas</span>
                  <span className="font-semibold">{progressFats}%</span>
                </div>
                <Progress className="mt-2 h-3" value={progressFats} />
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Dirección de entrega</div>
                <div className="font-medium">Av. Pardo 456, Dpto 301, Miraflores</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Card className="overflow-hidden shadow-soft">
          <div className="flex items-center justify-between border-b border-border p-5 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">Proxima entrega</h3>
                <p className="text-sm text-muted-foreground">Lunes 8 de mayo · 9:00 - 12:00 AM</p>
              </div>
            </div>
            <Badge className="bg-primary text-primary-foreground hover:bg-primary">En preparación</Badge>
          </div>
          <div className="grid gap-4 p-5 md:grid-cols-4">
            {[
                { label: "Comidas totales", value: String(userPlan.mealsPerWeek), icon: Utensils },
                { label: "Entregas por semana", value: String(userPlan.deliveriesPerWeek), icon: Truck },
                { label: "Calorías diarias", value: dailyCalories.toLocaleString(), icon: Flame },
                { label: userPlan.deliveriesPerWeek === 1 ? "Almuerzos" : userPlan.deliveriesPerWeek === 2 ? "Almuerzos + cenas" : "Todas las comidas", value: String(userPlan.mealsPerWeek), icon: Apple },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-xl border border-border bg-secondary/40 p-4 text-center">
                  <Icon className="mx-auto h-6 w-6 text-muted-foreground" />
                  <div className="mt-2 font-display text-2xl font-extrabold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </RoleWorkspace>
  );
}

export function UserOrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const orders = defaultOrders;

  const totalPedidos = orders.length;
  const comidasRecibidas = orders.filter((o) => o.status === "entregado").reduce((s, o) => s + o.meals, 0);
  const totalGasto = orders.reduce((s, o) => {
    const numeric = parseFloat(o.total.replace(/[^0-9.]/g, ""));
    return s + (isNaN(numeric) ? 0 : numeric);
  }, 0);
  const semanasActivas = new Set(orders.map((o) => o.date.slice(0, 7))).size;

  return (
    <RoleWorkspace
      roleTitle="Mi cuenta"
      links={userLinks}
      title="Historial de pedidos"
      subtitle="Consulta el detalle de tus pedidos anteriores y el estado de cada entrega."
    >
      <div className="grid gap-5 md:grid-cols-4">
        {[
          { label: "Total de pedidos", value: String(totalPedidos), icon: ShoppingBag, tone: "text-primary" },
          { label: "Comidas recibidas", value: String(comidasRecibidas), icon: Utensils, tone: "text-accent" },
          { label: "Semanas activas", value: String(semanasActivas), icon: Calendar, tone: "text-primary" },
          { label: "Gasto total", value: `S/ ${totalGasto.toLocaleString()}`, icon: CreditCard, tone: "text-accent" },
        ].map((stat) => {
          const Icon = stat.icon;
          return <MetricCard key={stat.label} icon={Icon} label={stat.label} tone={stat.tone} value={stat.value} />;
        })}
      </div>

      <Card className="mt-6 overflow-hidden shadow-soft">
        <div className="flex items-center justify-between border-b border-border p-5 gap-4">
          <div>
            <h3 className="font-display text-lg font-bold">Pedidos recientes</h3>
            <p className="mt-1 text-sm text-muted-foreground">Últimos 5 pedidos registrados en tu cuenta.</p>
          </div>
          <Badge variant="secondary">5 pedidos</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Pedido</th>
                <th className="px-5 py-3">Fecha</th>
                <th className="px-5 py-3">Plan</th>
                <th className="px-5 py-3">Comidas</th>
                <th className="px-5 py-3">Dirección</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Estado</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const isExpanded = expandedOrder === order.id;
                return (
                  <React.Fragment key={order.id}>
                    <tr className="border-t border-border align-middle hover:bg-secondary/30 transition-smooth">
                      <td className="px-5 py-4 font-medium">{order.id}</td>
                      <td className="px-5 py-4 text-muted-foreground">{order.date}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">{order.plan}</span>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{order.meals}</td>
                      <td className="px-5 py-4 text-muted-foreground max-w-[200px] truncate">{order.address}</td>
                      <td className="px-5 py-4 font-semibold">{order.total}</td>
                      <td className="px-5 py-4">{orderStatusBadge(order.status)}</td>
                      <td className="px-5 py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                        >
                          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </Button>
                      </td>
                    </tr>
                    {isExpanded ? (
                      <tr className="border-t border-border bg-secondary/20">
                        <td colSpan={8} className="p-5">
                          <h4 className="mb-4 font-display text-lg font-bold">Detalle del pedido {order.id}</h4>
                          <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-xl border border-border bg-background p-4">
                              <div className="text-xs uppercase text-muted-foreground">Conductor</div>
                              <div className="mt-1 font-medium">{order.driver}</div>
                            </div>
                            <div className="rounded-xl border border-border bg-background p-4">
                              <div className="text-xs uppercase text-muted-foreground">Ruta / Lote</div>
                              <div className="mt-1 font-medium">{order.route} / {order.lote}</div>
                            </div>
                            <div className="rounded-xl border border-border bg-background p-4">
                              <div className="text-xs uppercase text-muted-foreground">Entregado</div>
                              <div className="mt-1 font-medium">{order.deliveredAt}</div>
                            </div>
                          </div>
                          <div className="mt-4 rounded-xl border border-border bg-background p-4">
                            <div className="text-xs uppercase text-muted-foreground mb-2">Contenido</div>
                            <div className="flex flex-wrap gap-3">
                              {order.items.map((item) => (
                                <div key={item} className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm">
                                  <Check className="h-3 w-3 text-accent" />
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </RoleWorkspace>
  );
}

export function UserProfilePage() {
  const { session } = useAuth();
  const userPlanData = PLANS.find((p) => p.id === "estandar")!;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(session?.name ?? "Juan Perez");
  const email = session?.email ?? "juan.perez@email.com";
  const [phone, setPhone] = useState("+51 999 111 222");
  const [address, setAddress] = useState("Av. Pardo 456, Dpto 301, Miraflores");
  const fechaNacimiento = "15/03/1990";
  const miembroDesde = "Febrero 2026";
  const caloriasDiarias = 2100;
  const objetivo = "Bajar grasa corporal";
  const restricciones: string[] = ["Sin lactosa"];
  const alergias: string[] = ["Ninguna"];

  function handleSave() {
    setEditing(false);
  }

  function handleCancel() {
    setName(session?.name ?? "Juan Perez");
    setPhone("+51 999 111 222");
    setAddress("Av. Pardo 456, Dpto 301, Miraflores");
    setEditing(false);
  }

  return (
    <RoleWorkspace
      roleTitle="Mi cuenta"
      links={userLinks}
      title="Tu perfil"
      subtitle="Gestiona tu información personal, preferencias alimenticias y método de pago."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 shadow-soft">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <User className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mt-4 font-display text-xl font-bold">{session?.name ?? "Juan Perez"}</h2>
            <p className="text-sm text-muted-foreground">{session?.email ?? email}</p>
            <Badge className="mt-3 bg-accent-soft text-accent hover:bg-accent-soft">Plan {userPlanData.name}</Badge>
            <div className="mt-4 flex w-full gap-2">
              {editing ? (
                <>
                  <Button variant="hero" className="flex-1" onClick={handleSave}>
                    <Save className="h-4 w-4" /> Guardar
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleCancel}>
                    <X className="h-4 w-4" /> Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="flex-1" onClick={() => setEditing(true)}>
                    <Pencil className="h-4 w-4" /> Editar
                  </Button>
                  <Link href="/planes" className="flex-1">
                    <Button variant="hero" className="w-full">
                      <CreditCard className="h-4 w-4" /> Planes
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-soft lg:col-span-2">
          <h3 className="font-display text-lg font-bold">Informacion personal</h3>
          {editing ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre completo</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input value={email} disabled />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Teléfono</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Dirección</label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                { label: "Nombre completo", value: name },
                { label: "Email", value: email },
                { label: "Teléfono", value: phone },
                { label: "Fecha de nacimiento", value: fechaNacimiento },
                { label: "Dirección", value: address },
                { label: "Miembro desde", value: miembroDesde },
              ].map((field) => (
                <div key={field.label} className="rounded-xl border border-border bg-secondary/40 p-4">
                  <div className="text-xs uppercase text-muted-foreground">{field.label}</div>
                  <div className="mt-1 font-medium">{field.value}</div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold">Preferencias alimenticias</h3>
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-4">
              <div>
                <div className="font-medium">Objetivo</div>
                <div className="text-sm text-muted-foreground">{objetivo}</div>
              </div>
              <Dumbbell className="h-5 w-5 text-accent" />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-4">
              <div>
                <div className="font-medium">Restricciones</div>
                <div className="text-sm text-muted-foreground">{restricciones.join(", ")}</div>
              </div>
              <Heart className="h-5 w-5 text-accent" />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-4">
              <div>
                <div className="font-medium">Alergias</div>
                <div className="text-sm text-muted-foreground">{alergias.length > 0 ? alergias.join(", ") : "Ninguna"}</div>
              </div>
              <Activity className="h-5 w-5 text-accent" />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-4">
              <div>
                <div className="font-medium">Calorías diarias</div>
                <div className="text-sm text-muted-foreground">{caloriasDiarias.toLocaleString()} kcal</div>
              </div>
              <Flame className="h-5 w-5 text-accent" />
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold">Metodo de pago</h3>
            <Link href="/checkout?plan=estandar">
              <Button variant="outline" size="sm">
                <Pencil className="h-3 w-3" /> Cambiar
              </Button>
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/40 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <CreditCard className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="font-medium">Tarjeta de crédito</div>
                  <div className="text-sm text-muted-foreground">**** **** **** 4242</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">Vence 12/2027</div>
            </div>
            <div className="rounded-xl border border-border bg-secondary/40 p-4">
              <div>
                <div className="font-medium">Proxima facturación</div>
                <div className="mt-1 font-display text-2xl font-extrabold text-primary">
                  {userPlanData.currency} {userPlanData.price.toFixed(2)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Lunes 8 de mayo de 2026</div>
                <Badge className="mt-3 bg-accent-soft text-accent hover:bg-accent-soft">Activo</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </RoleWorkspace>
  );
}

export function UserNutritionPage() {
  const nutritionLog = defaultNutritionLog;

  const avgKcal = Math.round(nutritionLog.reduce((s, d) => s + d.kcal, 0) / (nutritionLog.length || 1));
  const avgProtein = Math.round(nutritionLog.reduce((s, d) => s + d.protein, 0) / (nutritionLog.length || 1));
  const avgCarbs = Math.round(nutritionLog.reduce((s, d) => s + d.carbs, 0) / (nutritionLog.length || 1));
  const avgFats = Math.round(nutritionLog.reduce((s, d) => s + d.fats, 0) / (nutritionLog.length || 1));

  const proteinPct = 27;
  const carbsPct = 40;
  const fatsPct = 30;
  const fiberPct = 3;

  const weekWithinGoal = true;
  const fiveDaysNoFatExceed = true;
  const proteinsOnTarget = true;
  const sevenDaysLogged = true;

  return (
    <RoleWorkspace
      roleTitle="Mi cuenta"
      links={userLinks}
      title="Seguimiento nutricional"
      subtitle="Monitorea tu consumo diario de calorias y macronutrientes para alcanzar tus objetivos."
    >
      <div className="grid gap-5 md:grid-cols-4">
        {[
          { label: "Promedio semanal", value: avgKcal.toLocaleString(), icon: Flame, tone: "text-primary", description: "kcal / dia" },
          { label: "Proteínas", value: `${avgProtein}g`, icon: Dumbbell, tone: "text-accent", description: "promedio diario" },
          { label: "Carbohidratos", value: `${avgCarbs}g`, icon: Apple, tone: "text-primary", description: "promedio diario" },
          { label: "Grasas", value: `${avgFats}g`, icon: TrendingUp, tone: "text-accent", description: "promedio diario" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <MetricCard
              key={stat.label}
              icon={Icon}
              label={stat.label}
              tone={stat.tone}
              value={stat.value}
              description={stat.description}
            />
          );
        })}
      </div>

      <Card className="mt-6 overflow-hidden shadow-soft">
        <div className="flex items-center justify-between border-b border-border p-5 gap-4">
          <div>
            <h3 className="font-display text-lg font-bold">Registro diario</h3>
            <p className="mt-1 text-sm text-muted-foreground">Consumo de la semana actual vs tu objetivo de 2,100 kcal.</p>
          </div>
          <Badge variant="secondary">Esta semana</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Dia</th>
                <th className="px-5 py-3">Calorías</th>
                <th className="px-5 py-3">Proteínas</th>
                <th className="px-5 py-3">Carbohidratos</th>
                <th className="px-5 py-3">Grasas</th>
                <th className="px-5 py-3">Progreso</th>
              </tr>
            </thead>
            <tbody>
              {nutritionLog.map((day) => {
                const progress = Math.round((day.kcal / day.goal) * 100);
                const overGoal = day.kcal > day.goal;

                return (
                  <tr key={day.day} className="border-t border-border align-middle hover:bg-secondary/30 transition-smooth">
                    <td className="px-5 py-4 font-semibold">{day.day}</td>
                    <td className="px-5 py-4">
                      <span className={cn("font-medium", overGoal ? "text-destructive" : "text-foreground")}>
                        {day.kcal} kcal
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{day.protein}g</td>
                    <td className="px-5 py-4 text-muted-foreground">{day.carbs}g</td>
                    <td className="px-5 py-4 text-muted-foreground">{day.fats}g</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Progress className="h-2 w-24" value={Math.min(progress, 100)} />
                        <span className={cn("text-xs font-semibold", overGoal ? "text-destructive" : "text-muted-foreground")}>
                          {progress}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold">Objetivo nutricional</h3>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-border bg-secondary/40 p-4">
              <div className="text-sm text-muted-foreground">Meta diaria</div>
              <div className="mt-1 font-display text-2xl font-extrabold text-primary">2,100 kcal</div>
            </div>
            <div className="rounded-xl border border-border bg-secondary/40 p-4">
              <div className="text-sm text-muted-foreground">Objetivo</div>
              <div className="mt-1 font-medium">Pérdida de grasa</div>
              <div className="mt-1 text-sm text-muted-foreground">déficit de 300 kcal diarias</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold">Distribución de macros</h3>
          <div className="mt-5 space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Proteínas</span>
                <span className="font-semibold">140g ({proteinPct}%)</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${proteinPct}%` }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Carbohidratos</span>
                <span className="font-semibold">210g ({carbsPct}%)</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-accent" style={{ width: `${carbsPct}%` }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Grasas</span>
                <span className="font-semibold">70g ({fatsPct}%)</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-warning" style={{ width: `${fatsPct}%` }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fibra</span>
                <span className="font-semibold">30g ({Math.max(fiberPct, 1)}%)</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-success" style={{ width: `${Math.max(fiberPct, 1)}%` }} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold">Logros</h3>
          <div className="mt-5 space-y-3">
            {[
              { label: "Semana completa dentro del objetivo", achieved: weekWithinGoal },
              { label: "5 días seguidos sin exceder grasas", achieved: fiveDaysNoFatExceed },
              { label: "Proteínas diarias cumplidas", achieved: proteinsOnTarget },
              { label: "Racha de 7 días de registro", achieved: sevenDaysLogged },
            ].map((achievement) => (
              <div
                key={achievement.label}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4",
                  achievement.achieved
                    ? "border-accent/30 bg-accent/5"
                    : "border-border bg-secondary/40",
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    achievement.achieved ? "bg-accent/15 text-accent" : "bg-secondary text-muted-foreground",
                  )}
                >
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">{achievement.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {achievement.achieved ? "Completado" : "En progreso"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </RoleWorkspace>
  );
}
