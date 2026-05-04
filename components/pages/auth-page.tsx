"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/components/providers/auth-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getRoleHomePath } from "@/lib/auth";
import { siteAssets } from "@/lib/assets";
import { cn } from "@/lib/utils";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [error, setError] = useState("");
  const { isHydrated, session, signIn, signUp } = useAuth();

  useEffect(() => {
    if (!isHydrated || !session) {
      return;
    }

    router.replace(getRoleHomePath(session.role));
  }, [isHydrated, router, session]);

  function resolveRedirectPath(defaultPath: string) {
    const nextPath = searchParams.get("next");

    if (!nextPath || !nextPath.startsWith("/")) {
      return defaultPath;
    }

    if (defaultPath === "/admin" && nextPath.startsWith("/admin")) {
      return nextPath;
    }

    if (defaultPath === "/cocina" && nextPath.startsWith("/cocina")) {
      return nextPath;
    }

    if (defaultPath === "/dashboard" && nextPath.startsWith("/dashboard")) {
      return nextPath;
    }

    return defaultPath;
  }

  function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = signIn(loginEmail, loginPassword);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError("");
    router.push(resolveRedirectPath(result.redirectTo));
  }

  function handleSignupSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      setError("Completa nombre, correo y contrasena para crear tu cuenta.");
      return;
    }

    const result = signUp({ name: signupName, email: signupEmail });
    setError("");
    router.push(result.redirectTo);
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <SiteHeader />
      <section className="container flex items-center justify-center py-16">
        <Card className="w-full max-w-md p-8 shadow-elegant">
          <div className="mb-6 flex flex-col items-center text-center">
            <Image
              src={siteAssets.logo}
              alt="BOCAO"
              className="h-16 w-16 object-contain md:h-[72px] md:w-[72px]"
              height={siteAssets.logoHeight}
              sizes="(min-width: 768px) 72px, 64px"
              width={siteAssets.logoWidth}
            />
            <h1 className="mt-3 font-display text-2xl font-bold">Bienvenido a BOCAO</h1>
            <p className="text-sm text-muted-foreground">Accede o crea tu cuenta para empezar</p>
          </div>

          <div className="mb-5 rounded-2xl border border-primary/15 bg-primary/5 p-4 text-sm text-muted-foreground">
            Tu acceso se detecta segun tu cuenta. Las cuentas corporativas de administracion y cocina entran automaticamente a su panel.
          </div>

          <div className="grid w-full grid-cols-2 rounded-md bg-muted p-1">
            <button
              className={cn(
                "rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                tab === "login" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground",
              )}
              onClick={() => setTab("login")}
              type="button"
            >
              Ingresar
            </button>
            <button
              className={cn(
                "rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                tab === "signup" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground",
              )}
              onClick={() => setTab("signup")}
              type="button"
            >
              Crear cuenta
            </button>
          </div>

          {error ? <p className="pt-4 text-sm font-medium text-destructive">{error}</p> : null}

          {tab === "login" ? (
            <form className="space-y-4 pt-5" onSubmit={handleLoginSubmit}>
              <div className="space-y-2">
                <label htmlFor="login-email" className="text-sm font-medium">
                  Correo
                </label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="tu@correo.com"
                  value={loginEmail}
                  onChange={(event) => setLoginEmail(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="login-password" className="text-sm font-medium">
                  Contrasena
                </label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="********"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                />
              </div>
              <button className={cn(buttonVariants({ variant: "hero", size: "lg" }), "w-full")} type="submit">
                Ingresar
              </button>
              <button className="block w-full text-center text-sm text-primary hover:underline" type="button">
                Olvidaste tu contrasena?
              </button>
            </form>
          ) : (
            <form className="space-y-4 pt-5" onSubmit={handleSignupSubmit}>
              <div className="space-y-2">
                <label htmlFor="signup-name" className="text-sm font-medium">
                  Nombre
                </label>
                <Input id="signup-name" placeholder="Tu nombre completo" value={signupName} onChange={(event) => setSignupName(event.target.value)} />
              </div>
              <div className="space-y-2">
                <label htmlFor="signup-email" className="text-sm font-medium">
                  Correo
                </label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="tu@correo.com"
                  value={signupEmail}
                  onChange={(event) => setSignupEmail(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="signup-password" className="text-sm font-medium">
                  Contrasena
                </label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Minimo 8 caracteres"
                  value={signupPassword}
                  onChange={(event) => setSignupPassword(event.target.value)}
                />
              </div>
              <button className={cn(buttonVariants({ variant: "hero", size: "lg" }), "w-full")} type="submit">
                Crear cuenta
              </button>
            </form>
          )}
        </Card>
      </section>
    </div>
  );
}
