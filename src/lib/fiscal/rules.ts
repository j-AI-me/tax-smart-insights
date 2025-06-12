
export interface FiscalRule {
  id: string;
  name: string;
  condition: (data: any) => boolean;
  recommendation: string;
  taxStructure?: string;
  deductions?: string[];
  risks?: string[];
  priority: number;
}

export interface TaxRegime {
  type: 'autonomo' | 'sl' | 'cooperativa' | 'comunidad_bienes';
  name: string;
  irpfRate?: number;
  isRate?: number;
  ivaRate: number;
  minRevenue?: number;
  maxRevenue?: number;
  socialSecurityBase?: number;
}

// Regímenes fiscales según normativa AEAT 2024
import taxRegimesData from "@/data/tax_regimes.json";

export const TAX_REGIMES: TaxRegime[] = taxRegimesData as TaxRegime[];

// Sistema de reglas basado en normativa fiscal española
export const FISCAL_RULES: FiscalRule[] = [
  // Regla 1: Facturación baja - Autónomo
  {
    id: 'low_revenue_autonomo',
    name: 'Facturación baja - Régimen de autónomos',
    condition: (data) => {
      const revenue = parseRevenueValue(data.expectedRevenue);
      return revenue < 30000;
    },
    recommendation: 'Para facturaciones inferiores a 30.000€, el régimen de autónomos es más beneficioso fiscalmente.',
    taxStructure: 'Autónomo',
    deductions: [
      'Gastos de suministros (30% máximo sin justificación)',
      'Amortización de vehículo (50% uso profesional)',
      'Gastos de formación (100% deducibles)'
    ],
    risks: ['Retenciones del 15% en facturas a empresas'],
    priority: 1
  },

  // Regla 2: Facturación media con socios - SL
  {
    id: 'medium_revenue_partners_sl',
    name: 'Facturación media con socios - Sociedad Limitada',
    condition: (data) => {
      const revenue = parseRevenueValue(data.expectedRevenue);
      return revenue >= 30000 && revenue <= 100000 && data.hasPartners === 'yes';
    },
    recommendation: 'Con socios y facturación entre 30.000€-100.000€, la SL permite mejor reparto de beneficios.',
    taxStructure: 'Sociedad Limitada',
    deductions: [
      'Gastos de constitución (100% deducibles)',
      'Sueldos de administradores',
      'Gastos de representación'
    ],
    risks: ['Obligación de llevar contabilidad mercantil', 'Depósito de cuentas en Registro Mercantil'],
    priority: 2
  },

  // Regla 3: Facturación alta - SL obligatoria
  {
    id: 'high_revenue_sl',
    name: 'Facturación alta - Sociedad Limitada obligatoria',
    condition: (data) => {
      const revenue = parseRevenueValue(data.expectedRevenue);
      return revenue > 100000;
    },
    recommendation: 'Para facturaciones superiores a 100.000€, la SL ofrece ventajas fiscales significativas.',
    taxStructure: 'Sociedad Limitada',
    deductions: [
      'Tipo reducido IS para startups (15% primeros dos períodos)',
      'Reserva de capitalización (10% sobre beneficios retenidos)',
      'Libertad de amortización para inversiones'
    ],
    risks: ['Auditoría obligatoria si supera límites del art. 263 LSC'],
    priority: 3
  },

  // Regla 4: I+D+i
  {
    id: 'rdi_deductions',
    name: 'Deducciones por I+D+i',
    condition: (data) => data.hasSpecialDeductions?.includes('rdi'),
    recommendation: 'Las actividades de I+D+i tienen importantes deducciones fiscales.',
    deductions: [
      'Deducción del 25% sobre gastos I+D+i',
      'Deducción adicional del 17% si supera la media de los dos años anteriores',
      'Deducción del 8% sobre inversiones en activos afectos a I+D+i'
    ],
    risks: ['Requiere documentación técnica específica', 'Posible inspección especializada'],
    priority: 4
  },

  // Regla 5: Sector tecnológico
  {
    id: 'tech_sector_benefits',
    name: 'Beneficios sector tecnológico',
    condition: (data) => data.economicSector === 'Tecnología e Informática',
    recommendation: 'El sector tecnológico tiene ventajas fiscales específicas.',
    deductions: [
      'Amortización libre de equipos informáticos',
      'Gastos de desarrollo de software (100% deducibles)',
      'Formación tecnológica de empleados'
    ],
    priority: 5
  },

  // Regla 6: Exportación
  {
    id: 'export_benefits',
    name: 'Beneficios por exportación',
    condition: (data) => data.hasInternationalActivity === 'yes',
    recommendation: 'Las empresas exportadoras tienen incentivos fiscales.',
    deductions: [
      'Exención en IS por rentas obtenidas en el extranjero',
      'Deducción por doble imposición internacional',
      'IVA 0% en exportaciones'
    ],
    priority: 6
  }
];

function parseRevenueValue(revenueRange: string): number {
  if (!revenueRange) return 0;
  
  if (revenueRange.includes('Menos de 30.000€')) return 25000;
  if (revenueRange.includes('30.000€ - 100.000€')) return 65000;
  if (revenueRange.includes('100.000€ - 300.000€')) return 200000;
  if (revenueRange.includes('300.000€ - 1M€')) return 650000;
  if (revenueRange.includes('Más de 1M€')) return 1500000;
  
  return 0;
}

export function evaluateFiscalRules(formData: any): FiscalRule[] {
  return FISCAL_RULES
    .filter(rule => rule.condition(formData))
    .sort((a, b) => a.priority - b.priority);
}

export function getRecommendedTaxStructure(formData: any): TaxRegime {
  const applicableRules = evaluateFiscalRules(formData);
  const revenue = parseRevenueValue(formData.expectedRevenue);
  
  // Lógica de decisión basada en reglas y facturación
  if (revenue < 30000 && formData.hasPartners !== 'yes') {
    return TAX_REGIMES.find(regime => regime.type === 'autonomo' && regime.name.includes('Directa'))!;
  }
  
  if (revenue >= 30000 || formData.hasPartners === 'yes') {
    return TAX_REGIMES.find(regime => regime.type === 'sl')!;
  }
  
  return TAX_REGIMES[0];
}
