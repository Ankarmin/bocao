import Image from "next/image";

import { siteAssets } from "@/lib/assets";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="container grid gap-8 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <Image
              src={siteAssets.logo}
              alt="BOCAO"
              className="h-9 w-9 object-contain md:h-10 md:w-10"
              height={siteAssets.logoHeight}
              sizes="(min-width: 768px) 40px, 36px"
              width={siteAssets.logoWidth}
            />
            <span className="font-display text-xl font-extrabold md:text-2xl">BOCAO</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Comida real, planificada por nutricionistas y entregada cada semana.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Plataforma</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Planes</li>
            <li>Como funciona</li>
            <li>Menus</li>
            <li>Preguntas frecuentes</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Empresa</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Sobre nosotros</li>
            <li>Dark kitchens</li>
            <li>Trabaja con BOCAO</li>
            <li>Contacto</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Terminos</li>
            <li>Privacidad</li>
            <li>Cookies</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} BOCAO. Todos los derechos reservados.
      </div>
    </footer>
  );
}
