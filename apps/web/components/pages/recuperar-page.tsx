"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Lock, Mail, Send } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { siteAssets } from "@/lib/assets";
import { cn } from "@/lib/utils";

type Step = "solicitar" | "enviado" | "restablecer" | "exito";

export default function RecuperarPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("solicitar");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  function handleRequestReset(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim()) {
      setError("Ingresá tu correo para continuar.");
      return;
    }

    setError("");
    setStep("enviado");

    const timer = setTimeout(() => {
      setStep("restablecer");
    }, 2000);

    return () => clearTimeout(timer);
  }

  function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();

    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError("Completá ambos campos de contraseña.");
      return;
    }

    if (newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError("");
    setStep("exito");
  }

  function handleGoToLogin() {
    router.push("/auth");
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <SiteHeader />
      <section className="container flex items-center justify-center py-16">
        <Card className="w-full max-w-md p-8 shadow-elegant">
          <div className="mb-6 flex flex-col items-center text-center">
            <Link href="/">
              <Image
                src={siteAssets.logo}
                alt="BOCAO"
                className="h-16 w-16 object-contain md:h-[72px] md:w-[72px]"
                height={siteAssets.logoHeight}
                sizes="(min-width: 768px) 72px, 64px"
                width={siteAssets.logoWidth}
              />
            </Link>

            {step === "solicitar" && (
              <>
                <h1 className="mt-4 font-display text-2xl font-bold">Recuperá tu cuenta</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ingresá tu correo y te enviaremos un enlace para restablecer tu contraseña.
                </p>
              </>
            )}

            {step === "enviado" && (
              <>
                <div className="mx-auto mt-4 mb-2 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Send className="h-8 w-8" />
                </div>
                <h1 className="font-display text-2xl font-bold">¡Revisá tu correo!</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Si <strong>{email}</strong> está registrado, recibirás un enlace para restablecer tu contraseña.
                </p>
              </>
            )}

            {step === "restablecer" && (
              <>
                <h1 className="mt-4 font-display text-2xl font-bold">Nueva contraseña</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Elegí una contraseña segura para tu cuenta.
                </p>
              </>
            )}

            {step === "exito" && (
              <>
                <div className="mx-auto mt-4 mb-2 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-fresh text-accent-foreground shadow-fresh">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h1 className="font-display text-2xl font-bold">¡Contraseña actualizada!</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tu contraseña se cambió correctamente. Ya podés iniciar sesión.
                </p>
              </>
            )}
          </div>

          {error ? <p className="mb-4 text-sm font-medium text-destructive">{error}</p> : null}

          {step === "solicitar" && (
            <form className="space-y-5" onSubmit={handleRequestReset}>
              <div className="space-y-2">
                <label htmlFor="recover-email" className="text-sm font-medium">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="recover-email"
                    type="email"
                    className="pl-10"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <button
                className={cn(buttonVariants({ variant: "hero", size: "lg" }), "w-full")}
                type="submit"
              >
                <Send className="h-4 w-4" /> Enviar enlace de recuperación
              </button>
            </form>
          )}

          {step === "enviado" && (
            <div className="space-y-4">
              <Card className="border-accent/30 bg-accent/5 p-5 text-center shadow-sm">
                <Mail className="mx-auto h-8 w-8 text-accent" />
                <p className="mt-3 text-sm text-muted-foreground">
                  Hemos enviado un correo a <strong>{email}</strong> con las instrucciones para restablecer tu contraseña.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Si no lo encontrás, revisá tu carpeta de spam o correo no deseado.
                </p>
              </Card>

              <button
                className={cn(buttonVariants({ variant: "outline" }), "w-full")}
                onClick={() => {
                  setStep("solicitar");
                  setError("");
                }}
                type="button"
              >
                <ArrowLeft className="h-4 w-4" /> Volver
              </button>
            </div>
          )}

          {step === "restablecer" && (
            <form className="space-y-5" onSubmit={handleResetPassword}>
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10"
                    placeholder="Mínimo 8 caracteres"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword((v) => !v)}
                    type="button"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type={showConfirm ? "text" : "password"}
                    className="pl-10 pr-10"
                    placeholder="Repetí tu nueva contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirm((v) => !v)}
                    type="button"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button className={cn(buttonVariants({ variant: "hero", size: "lg" }), "w-full")} type="submit">
                <Lock className="h-4 w-4" /> Cambiar contraseña
              </button>
            </form>
          )}

          {step === "exito" && (
            <div className="space-y-4">
              <Card className="border-accent/30 bg-accent/5 p-5 text-center shadow-sm">
                <p className="text-sm text-muted-foreground">
                  Tu contraseña fue actualizada correctamente para <strong>{email}</strong>.
                </p>
              </Card>

              <button
                className={cn(buttonVariants({ variant: "hero", size: "lg" }), "w-full")}
                onClick={handleGoToLogin}
                type="button"
              >
                <ArrowLeft className="h-4 w-4" /> Ir al inicio de sesión
              </button>
            </div>
          )}

          {step === "solicitar" && (
            <div className="mt-6 border-t border-border pt-6 text-center">
              <Link href="/auth" className="text-sm text-primary hover:underline">
                <ArrowLeft className="mr-1 inline h-3 w-3" />
                Volver al inicio de sesión
              </Link>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}
