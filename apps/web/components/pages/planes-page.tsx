import { PublicPageShell } from "@/components/layout/public-page-shell";
import { PlansGrid } from "@/components/plans/plan-card";

export default function PlanesPage() {
  return (
    <PublicPageShell>
      <section className="container py-16">
        <div data-scroll-reveal="hero" className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="font-display text-4xl font-extrabold md:text-5xl">Planes BOCAO</h1>
          <p className="mt-3 text-muted-foreground">Compara y elige el plan que mejor se adapta a tu estilo de vida.</p>
        </div>
        <PlansGrid />
      </section>
    </PublicPageShell>
  );
}
