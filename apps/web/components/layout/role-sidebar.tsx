"use client";

import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, Boxes, ChefHat, ListChecks, LogOut, Package, Tag, Truck, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/components/providers/auth-provider";
import { siteAssets } from "@/lib/assets";
import { cn } from "@/lib/utils";

export type SidebarIconKey = "alert-triangle" | "boxes" | "chef-hat" | "list-checks" | "package" | "tag" | "truck" | "users";

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
  boxes: Boxes,
  "chef-hat": ChefHat,
  "list-checks": ListChecks,
  package: Package,
  tag: Tag,
  truck: Truck,
  users: Users,
} as const;

export function RoleSidebar({ title, links }: RoleSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  function handleSignOut() {
    signOut();
    router.push("/");
  }

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-sidebar p-5 md:flex md:flex-col">
      <div className="mb-8 flex items-center gap-3">
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
      </div>
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
        <button
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground"
          type="button"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          Salir
        </button>
      </div>
    </aside>
  );
}
