export type Plan = {
  id: "basico" | "estandar" | "premium";
  name: string;
  tagline: string;
  price: number;
  currency: string;
  period: string;
  mealsPerWeek: number;
  deliveriesPerWeek: number;
  features: string[];
  highlight?: boolean;
  accent: "primary" | "fresh";
};

export const PLANS: Plan[] = [
  {
    id: "basico",
    name: "Basico",
    tagline: "Empieza tu camino saludable",
    price: 199,
    currency: "S/",
    period: "semana",
    mealsPerWeek: 7,
    deliveriesPerWeek: 1,
    accent: "fresh",
    features: [
      "7 almuerzos balanceados",
      "1 entrega semanal",
      "Perfil nutricional basico",
      "Sustituciones limitadas",
    ],
  },
  {
    id: "estandar",
    name: "Estandar",
    tagline: "El mas elegido por nuestra comunidad",
    price: 329,
    currency: "S/",
    period: "semana",
    mealsPerWeek: 14,
    deliveriesPerWeek: 2,
    highlight: true,
    accent: "primary",
    features: [
      "14 comidas (almuerzo + cena)",
      "2 entregas semanales",
      "Perfil nutricional personalizado",
      "Snacks saludables incluidos",
      "Soporte con nutricionista",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Maxima personalizacion y resultados",
    price: 499,
    currency: "S/",
    period: "semana",
    mealsPerWeek: 21,
    deliveriesPerWeek: 3,
    accent: "primary",
    features: [
      "21 comidas (3 al dia)",
      "3 entregas frescas por semana",
      "Plan 1:1 con nutricionista",
      "Recetas premium de chef",
      "Ajuste mensual de macros",
      "Prioridad en entregas",
    ],
  },
];
