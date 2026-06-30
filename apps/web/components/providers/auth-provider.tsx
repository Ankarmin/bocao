"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import {
  AUTH_STORAGE_KEY,
  getInitials,
  getRoleHomePath,
  getRoleLabel,
  inferRoleFromEmail,
  getNameFromEmail,
  type AuthRole,
  type AuthSession,
} from "@/lib/auth";

export type { AuthRole, AuthSession };
export { getInitials, getRoleHomePath, getRoleLabel };

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

type SignInResult =
  | { ok: true }
  | { ok: false; error: string };

type AuthContextValue = {
  status: AuthStatus;
  session: AuthSession | null;
  isHydrated: boolean;
  signIn: (email: string, password: string) => SignInResult;
  signUp: (name: string, email: string, password: string) => SignInResult;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [status, setStatus] = useState<AuthStatus>("idle");

  useEffect(() => {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!raw) {
      setStatus("unauthenticated");
      return;
    }

    try {
      const parsed = JSON.parse(raw) as AuthSession;
      setSession(parsed);
      setStatus("authenticated");
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      setStatus("unauthenticated");
    }
  }, []);

  const signIn = useCallback(
    (email: string, password: string): SignInResult => {
      const trimmedEmail = email.trim().toLowerCase();

      if (!trimmedEmail || !password.trim()) {
        return { ok: false, error: "Ingresa tu correo y contraseña para continuar." };
      }

      const role = inferRoleFromEmail(trimmedEmail);

      const nextSession: AuthSession = {
        name: getNameFromEmail(trimmedEmail, role),
        email: trimmedEmail,
        role,
      };

      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
      setSession(nextSession);
      setStatus("authenticated");

      return { ok: true };
    },
    [],
  );

  const signUp = useCallback(
    (name: string, email: string, password: string): SignInResult => {
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedName = name.trim();

      if (!trimmedName || !trimmedEmail || !password.trim()) {
        return { ok: false, error: "Completa nombre, correo y contraseña para crear tu cuenta." };
      }

      const role = inferRoleFromEmail(trimmedEmail);

      const nextSession: AuthSession = {
        name: trimmedName || getNameFromEmail(trimmedEmail, role),
        email: trimmedEmail,
        role,
      };

      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
      setSession(nextSession);
      setStatus("authenticated");

      return { ok: true };
    },
    [],
  );

  const signOut = useCallback(() => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setSession(null);
    setStatus("unauthenticated");
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      session,
      isHydrated: status !== "idle",
      signIn,
      signUp,
      signOut,
    }),
    [status, session, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
