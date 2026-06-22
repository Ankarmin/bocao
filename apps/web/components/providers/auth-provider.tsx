"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { AUTH_STORAGE_KEY, getNameFromEmail, getRoleHomePath, inferRoleFromEmail, type AuthSession } from "@/lib/auth";

type SignInResult =
  | { ok: true; redirectTo: string }
  | { ok: false; error: string };

type SignUpInput = {
  name: string;
  email: string;
};

type AuthContextValue = {
  isHydrated: boolean;
  session: AuthSession | null;
  signIn: (email: string, password: string) => SignInResult;
  signOut: () => void;
  signUp: (input: SignUpInput) => { redirectTo: string };
};

const AuthContext = createContext<AuthContextValue | null>(null);

function persistSession(session: AuthSession | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (session) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let nextSession: AuthSession | null = null;

    try {
      const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY);

      if (rawSession) {
        nextSession = JSON.parse(rawSession) as AuthSession;
      }
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    const frame = window.requestAnimationFrame(() => {
      setSession(nextSession);
      setIsHydrated(true);

    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isHydrated,
      session,
      signIn: (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail || !password.trim()) {
          return { ok: false, error: "Ingresa tu correo y contraseña para continuar." };
        }

        const role = inferRoleFromEmail(normalizedEmail);

        const nextSession: AuthSession = {
          name: getNameFromEmail(normalizedEmail, role),
          email: normalizedEmail,
          role,
        };

        setSession(nextSession);
        persistSession(nextSession);

        return { ok: true, redirectTo: getRoleHomePath(role) };
      },
      signOut: () => {
        setSession(null);
        persistSession(null);
      },
      signUp: ({ name, email }) => {
        const nextSession: AuthSession = {
          name: name.trim() || "Nuevo usuario",
          email: email.trim().toLowerCase(),
          role: "customer",
        };

        setSession(nextSession);
        persistSession(nextSession);

        return { redirectTo: getRoleHomePath("customer") };
      },
    }),
    [isHydrated, session],
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
