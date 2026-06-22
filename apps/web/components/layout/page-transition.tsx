"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { siteAssets } from "@/lib/assets";

export function PageTransition() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const prevRef = useRef(pathname);

  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = pathname;
    if (prev === pathname) return;

    const isProtected = pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/cocina");
    if (!isProtected) return;

    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteAssets.logo}
            alt="BOCAO"
            className="h-10 w-10 animate-pulse object-contain"
          />
          <span className="font-display text-xl font-extrabold tracking-tight">Cargando...</span>
        </div>
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-24 animate-shimmer rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>
    </div>
  );
}
