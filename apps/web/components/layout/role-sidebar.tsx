"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AlertTriangle, BarChart3, Boxes, Calendar, ChefHat, ClipboardList, ListChecks, LogOut, Package, Tag, Truck, User, Users, Utensils } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/components/providers/auth-provider";
import { siteAssets } from "@/lib/assets";
import { cn } from "@/lib/utils";

export type SidebarIconKey = "alert-triangle" | "bar-chart" | "boxes" | "calendar" | "chef-hat" | "clipboard-list" | "list-checks" | "package" | "tag" | "truck" | "user" | "users" | "utensils";

export type SidebarLink = {
  href: string;
  label: string;
  icon: SidebarIconKey;
};

type RoleSidebarProps = {
  title: string;
  links: SidebarLink[];
};

const iconMap = {
  "alert-triangle": AlertTriangle,
  "bar-chart": BarChart3,
  boxes: Boxes,
  calendar: Calendar,
  "chef-hat": ChefHat,
  "clipboard-list": ClipboardList,
  "list-checks": ListChecks,
  package: Package,
  tag: Tag,
  truck: Truck,
  user: User,
  users: Users,
  utensils: Utensils,
} as const;

export function RoleSidebar({ title, links }: RoleSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();
  const [confirm, setConfirm] = useState(false);

  function handleSignOut() {
    signOut();
    router.push("/");
  }

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-sidebar p-5 md:flex md:flex-col">
      <Link href="/" className="mb-8 flex items-center gap-3">
        <Image
          src={siteAssets.logo}
          alt="BOCAO"
          className="h-11 w-11 object-contain"
          height={siteAssets.logoHeight}
          sizes="44px"
          width={siteAssets.logoWidth}
        />
        <div>
          <div className="font-display text-lg font-extrabold leading-none">BOCAO</div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{title}</div>
        </div>
      </Link>
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        {links.map((link) => {
          const active = pathname === link.href;
          const Icon = iconMap[link.icon];

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-smooth",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-6 border-t border-border pt-6">
        {confirm ? (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">¿Cerrar sesión?</p>
            <div className="flex gap-2">
              <button
                className="flex-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                onClick={handleSignOut}
                type="button"
              >
                Sí, salir
              </button>
              <button
                className="flex-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary"
                onClick={() => setConfirm(false)}
                type="button"
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <button
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground"
            type="button"
            onClick={() => setConfirm(true)}
          >
            <LogOut className="h-4 w-4" />
            Salir
          </button>
        )}
      </div>
    </aside>
  );
}
