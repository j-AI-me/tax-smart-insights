export interface FiscalAlert {
  id: string;
  title: string;
  description: string;
}

export interface TaxObligation {
  model: string;
  dueDate: string;
}

import { FormData } from "@/types/form";
import { parseRevenueValue } from "./fiscalRules";

export function getDefaultFiscalAlerts(formData: FormData): FiscalAlert[] {
  const alerts: FiscalAlert[] = [];
  const revenue = parseRevenueValue(formData.expectedRevenue);

  if (revenue > 600000) {
    alerts.push({
      id: "audit_alert",
      title: "Auditor\u00eda obligatoria",
      description:
        "Al superar 600.000\u20ac de ingresos, la ley exige auditar las cuentas (art. 263 LSC).",
    });
  }

  if (formData.hasPartners === "yes") {
    alerts.push({
      id: "partners_pact",
      title: "Pactos de socios",
      description:
        "Es recomendable formalizar pactos de socios que regulen las entradas, salidas y reparto de beneficios.",
    });
  }

  if (formData.hasInternationalActivity === "regular" || formData.hasInternationalActivity === "occasional") {
    alerts.push({
      id: "double_taxation",
      title: "Doble imposici\u00f3n",
      description:
        "Revise convenios para evitar la doble imposici\u00f3n internacional y presente los modelos correspondientes.",
    });
  }

  if (
    formData.currentStatus === "operational" &&
    formData.preferredTaxStructure &&
    formData.preferredTaxStructure !== "unsure"
  ) {
    alerts.push({
      id: "legal_change",
      title: "Cambio de forma jur\u00eddica",
      description:
        "El cambio de forma jur\u00eddica implica gastos notariales, registros y diversos tr\u00e1mites administrativos.",
    });
  }

  return alerts;
}

function nextDate(month: number, day: number, today: Date): Date {
  const date = new Date(today.getFullYear(), month, day);
  if (date <= today) {
    date.setFullYear(today.getFullYear() + 1);
  }
  return date;
}

export function getUpcomingObligations(today = new Date()): TaxObligation[] {
  const obligations: TaxObligation[] = [];

  const modelo200 = nextDate(6, 25, today); // 25 de julio
  obligations.push({
    model: "Modelo 200",
    dueDate: modelo200.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  });

  const ivaDates = [
    nextDate(0, 30, today),
    nextDate(3, 20, today),
    nextDate(6, 20, today),
    nextDate(9, 20, today),
  ].sort((a, b) => a.getTime() - b.getTime());
  const modelo303Date = ivaDates.find((d) => d > today) || ivaDates[0];
  obligations.push({
    model: "Modelo 303",
    dueDate: modelo303Date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  });

  const retDates = [
    nextDate(0, 20, today),
    nextDate(3, 20, today),
    nextDate(6, 20, today),
    nextDate(9, 20, today),
  ].sort((a, b) => a.getTime() - b.getTime());
  const modelo111Date = retDates.find((d) => d > today) || retDates[0];
  obligations.push({
    model: "Modelo 111",
    dueDate: modelo111Date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  });

  return obligations;
}
