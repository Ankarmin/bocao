"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { getInitials, getRoleHomePath, getRoleLabel } from "@/lib/auth";
import { siteAssets } from "@/lib/assets";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/#beneficios", label: "Beneficios" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#menu-semanal", label: "Menu" },
  { href: "/#planes", label: "Planes" },
  { href: "/#testimonios", label: "Testimonios" },
  { href: "/#faq", label: "FAQ" },
];

function AccountAvatar({ name }: { name: string }) {
  const initials = getInitials(name) || "BO";

  return (
    <svg aria-hidden="true" className="h-10 w-10 shrink-0" viewBox="0 0 40 40">
      <circle cx="20" cy="20" fill="hsl(var(--primary))" r="20" />
      <text
        dominantBaseline="middle"
        fill="hsl(var(--primary-foreground))"
        fontFamily="var(--font-display), sans-serif"
        fontSize="14"
        fontWeight="700"
        textAnchor="middle"
        x="20"
        y="21"
      >
        {initials}
      </text>
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isHydrated, session, signOut } = useAuth();

  const accountPath = session ? getRoleHomePath(session.role) : "/dashboard";
  const accountLabel = session ? getRoleLabel(session.role) : "Mi cuenta";

  function handleSignOut() {
    signOut();
    setMobileMenuOpen(false);
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-20 items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src={siteAssets.logo}
            alt="BOCAO logo"
            className="h-10 w-10 object-contain md:h-12 md:w-12"
            height={siteAssets.logoHeight}
            sizes="(min-width: 768px) 48px, 40px"
            width={siteAssets.logoWidth}
          />
          <span className="font-display text-2xl font-extrabold tracking-tight text-foreground md:text-[1.75rem]">BOCAO</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isAnchor = link.href.includes("#");
            const active = !isAnchor && pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-smooth xl:px-4",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center justify-end gap-2 md:flex md:min-w-[270px] lg:min-w-[290px]">
          {isHydrated ? (
            session ? (
              <>
                <Link
                  href={accountPath}
                  className="flex items-center gap-3 rounded-full border border-border/70 bg-background px-3 py-2 transition-smooth hover:bg-secondary"
                >
                  <AccountAvatar name={session.name} />
                  <div className="min-w-0 text-left">
                    <div className="truncate text-sm font-semibold text-foreground">{session.name}</div>
                    <div className="text-xs text-muted-foreground">{accountLabel}</div>
                  </div>
                </Link>
                <Button variant="ghost" onClick={handleSignOut}>
                  <LogOut /> Salir
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth" className={buttonVariants({ variant: "ghost" })}>
                  Ingresar
                </Link>
                <Link href="/planes" className={buttonVariants({ variant: "hero" })}>
                  Empezar
                </Link>
              </>
            )
          ) : null}
        </div>

        <Button
          aria-label={mobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
          className="md:hidden"
          size="icon"
          variant="ghost"
          onClick={() => setMobileMenuOpen((current) => !current)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="container flex flex-col gap-2 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isHydrated ? (
              session ? (
                <>
                  <Link
                    href={accountPath}
                    className="mt-2 flex items-center gap-3 rounded-xl border border-border/70 bg-background px-3 py-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <AccountAvatar name={session.name} />
                    <div>
                      <div className="text-sm font-semibold text-foreground">{session.name}</div>
                      <div className="text-xs text-muted-foreground">{accountLabel}</div>
                    </div>
                  </Link>
                  <Button className="mt-2 justify-center" variant="ghost" onClick={handleSignOut}>
                    <LogOut /> Cerrar sesion
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth"
                    className={cn(buttonVariants({ variant: "ghost" }), "mt-2")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ingresar
                  </Link>
                  <Link
                    href="/planes"
                    className={cn(buttonVariants({ variant: "hero" }), "mt-2")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Empezar ahora
                  </Link>
                </>
              )
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
