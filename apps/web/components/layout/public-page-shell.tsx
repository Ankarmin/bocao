"use client";

import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import ScrollRevealController from "@/components/ui/scroll-reveal-controller";

const PUBLIC_REVEAL_SCOPE_ID = "public-page-shell";

export function PublicPageShell({ children }: { children: ReactNode }) {
  return (
    <div id={PUBLIC_REVEAL_SCOPE_ID} data-scroll-reveal-scope className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
      <ScrollRevealController scopeId={PUBLIC_REVEAL_SCOPE_ID} />
    </div>
  );
}
