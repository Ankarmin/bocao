"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getRoleHomePath, type AuthRole } from "@/lib/auth";
import { useAuth } from "@/components/providers/auth-provider";

type ProtectedRouteProps = {
  roles: AuthRole[];
  children: React.ReactNode;
};

export function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isHydrated, session } = useAuth();

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!session) {
      router.replace(`/auth?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!roles.includes(session.role)) {
      router.replace(getRoleHomePath(session.role));
    }
  }, [isHydrated, pathname, roles, router, session]);

  if (!isHydrated || !session || !roles.includes(session.role)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
        <div>
          <p className="text-sm font-semibold text-primary">BOCAO</p>
          <p className="mt-2 text-muted-foreground">Validando tu sesion...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
