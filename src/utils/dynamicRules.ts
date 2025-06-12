import { FormData } from "@/types/form";
import { parseRevenueValue } from "@/utils/fiscalRules";

export interface ExternalRule {
  condiciones: {
    sector?: string;
    facturacionMin?: number;
    facturacionMax?: number;
    socios?: boolean;
  };
  recomendacion: string;
  tipoImpositivo?: number;
  deducciones?: string[];
}

let cachedRules: ExternalRule[] | null = null;

async function loadExternalRules(): Promise<ExternalRule[]> {
  if (cachedRules) return cachedRules;
  const response = await fetch("/rules.json");
  const data = await response.json();
  cachedRules = Array.isArray(data) ? data : [data];
  return cachedRules;
}

export async function evaluateExternalRules(formData: FormData): Promise<ExternalRule[]> {
  const rules = await loadExternalRules();
  const revenue = parseRevenueValue(formData.expectedRevenue);

  return rules.filter(rule => {
    const cond = rule.condiciones || {};
    if (cond.sector && cond.sector !== formData.economicSector) return false;
    if (cond.facturacionMin && revenue < cond.facturacionMin) return false;
    if (cond.facturacionMax && revenue > cond.facturacionMax) return false;
    if (typeof cond.socios === "boolean" && (formData.hasPartners === "yes") !== cond.socios) return false;
    return true;
  });
}

export async function getExternalRecommendation(formData: FormData): Promise<ExternalRule | null> {
  const applicable = await evaluateExternalRules(formData);
  return applicable.length > 0 ? applicable[0] : null;
}
