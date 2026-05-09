import type { ReactNode } from "react";

import { notFound } from "next/navigation";

import { ProtectedRoute } from "@/components/auth/protected-route";
import AdminPage from "@/components/pages/admin-page";
import { AdminIncidentsPage, AdminLogisticsPage, AdminUsersPage } from "@/components/pages/admin-section-pages";
import AuthPage from "@/components/pages/auth-page";
import CheckoutPage from "@/components/pages/checkout-page";
import CocinaPage from "@/components/pages/cocina-page";
import ComoFuncionaPage from "@/components/pages/como-funciona-page";
import ConfigurarPage from "@/components/pages/configurar-page";
import ConfirmacionPage from "@/components/pages/confirmacion-page";
import ContactoPage from "@/components/pages/contacto-page";
import DashboardPage from "@/components/pages/dashboard-page";
import HomePage from "@/components/pages/home-page";
import { KitchenLabelingPage, KitchenLotsPage, KitchenProductionPage } from "@/components/pages/kitchen-section-pages";
import MenuSemanalPage from "@/components/pages/menu-semanal-page";
import PlanesPage from "@/components/pages/planes-page";
import ResumenPage from "@/components/pages/resumen-page";
import SobreNosotrosPage from "@/components/pages/sobre-nosotros-page";
import TestimoniosPage from "@/components/pages/testimonios-page";

type CatchAllPageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const { slug } = await params;
  const path = slug?.join("/") ?? "";

  const adminRoute = (page: ReactNode) => <ProtectedRoute roles={["admin"]}>{page}</ProtectedRoute>;
  const kitchenRoute = (page: ReactNode) => <ProtectedRoute roles={["kitchen"]}>{page}</ProtectedRoute>;

  switch (path) {
    case "":
      return <HomePage />;
    case "sobre-nosotros":
      return <SobreNosotrosPage />;
    case "como-funciona":
      return <ComoFuncionaPage />;
    case "menu-semanal":
      return <MenuSemanalPage />;
    case "planes":
      return <PlanesPage />;
    case "testimonios":
      return <TestimoniosPage />;
    case "contacto":
      return <ContactoPage />;
    case "auth":
      return <AuthPage />;
    case "configurar":
      return <ConfigurarPage />;
    case "resumen":
      return <ResumenPage />;
    case "checkout":
      return <CheckoutPage />;
    case "confirmacion":
      return <ConfirmacionPage />;
    case "dashboard":
      return (
        <ProtectedRoute roles={["customer"]}>
          <DashboardPage />
        </ProtectedRoute>
      );
    case "admin":
      return adminRoute(<AdminPage />);
    case "admin/logistica":
      return adminRoute(<AdminLogisticsPage />);
    case "admin/incidencias":
      return adminRoute(<AdminIncidentsPage />);
    case "admin/usuarios":
      return adminRoute(<AdminUsersPage />);
    case "cocina":
      return kitchenRoute(<CocinaPage />);
    case "cocina/produccion":
      return kitchenRoute(<KitchenProductionPage />);
    case "cocina/etiquetas":
      return kitchenRoute(<KitchenLabelingPage />);
    case "cocina/lotes":
      return kitchenRoute(<KitchenLotsPage />);
    default:
      notFound();
  }
}
