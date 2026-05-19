import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PlansGrid } from "@/components/plans/plan-card";

export default function PlanesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container py-16">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="font-display text-4xl font-extrabold md:text-5xl">Planes BOCAO</h1>
          <p className="mt-3 text-muted-foreground">Compara y elige el plan que mejor se adapta a tu estilo de vida.</p>
        </div>
        <PlansGrid />
      </section>
      <SiteFooter />
    </div>
  );
}
