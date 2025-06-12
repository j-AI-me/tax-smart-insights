
export interface TaxCalculation {
  grossRevenue: number;
  deductibleExpenses: number;
  taxableIncome: number;
  irpfTax?: number;
  corporateTax?: number;
  vatTax: number;
  socialSecurity: number;
  totalTaxes: number;
  netIncome: number;
  effectiveTaxRate: number;
}

export interface ExpenseBreakdown {
  officeExpenses: number;
  equipmentDepreciation: number;
  professionalServices: number;
  training: number;
  travel: number;
  supplies: number;
  other: number;
}

import irpfBrackets from "@/data/irpf_brackets.json";
import corporateTax from "@/data/corporate_tax.json";
import ssBases from "@/data/social_security.json";

// Datos normativos cargados desde archivos JSON
const IRPF_BRACKETS = irpfBrackets as { min: number; max: number | null; rate: number }[];
const IS_RATE_GENERAL = corporateTax.generalRate;
const IS_RATE_REDUCED = corporateTax.reducedRate;
const IS_RATE_MINIMUM = corporateTax.minimumQuota;
const SS_BASES = ssBases as Record<string, number>;

export function calculateIRPF(taxableIncome: number): number {
  let tax = 0;
  let remainingIncome = taxableIncome;

  for (const bracket of IRPF_BRACKETS) {
    if (remainingIncome <= 0) break;
    
    const bracketLimit = (bracket.max ?? Infinity) - bracket.min;
    const taxableAtThisBracket = Math.min(remainingIncome, bracketLimit);
    tax += taxableAtThisBracket * (bracket.rate / 100);
    remainingIncome -= taxableAtThisBracket;
  }

  return tax;
}

export function calculateCorporateTax(taxableIncome: number, isStartup: boolean = false): number {
  const rate = isStartup && taxableIncome <= 300000 ? IS_RATE_REDUCED : IS_RATE_GENERAL;
  return taxableIncome * (rate / 100);
}

export function calculateVAT(revenue: number, vatRate: number = 21): number {
  return revenue * (vatRate / 100);
}

export function calculateSocialSecurity(regime: 'autonomo' | 'empleado', income?: number): number {
  if (regime === 'autonomo') {
    // Base de cotización por ingresos reales (opcional desde 2023)
    if (income && income > 0) {
      const monthlyIncome = income / 12;
      const base = Math.max(900, Math.min(monthlyIncome, 4070)); // Límites 2024
      return base * 12 * 0.3065; // 30.65% para contingencias comunes
    }
    return SS_BASES.autonomo_minima * 12; // Base mínima anual
  }
  
  if (regime === 'empleado' && income) {
    return income * SS_BASES.empleado_empresa_rate;
  }
  
  return 0;
}

export function estimateDeductibleExpenses(
  revenue: number, 
  sector: string, 
  hasEmployees: boolean,
  customExpenses?: ExpenseBreakdown
): number {
  if (customExpenses) {
    return Object.values(customExpenses).reduce((sum, expense) => sum + expense, 0);
  }

  // Estimación por sector según estadísticas AEAT
  const baseExpenseRatio = getSectorExpenseRatio(sector);
  let estimatedExpenses = revenue * baseExpenseRatio;

  // Ajustes por características específicas
  if (hasEmployees) {
    estimatedExpenses += revenue * 0.15; // +15% por gastos de personal
  }

  // Límites razonables
  return Math.min(estimatedExpenses, revenue * 0.7); // Máximo 70% de gastos
}

function getSectorExpenseRatio(sector: string): number {
  const sectorRatios: Record<string, number> = {
    'Tecnología e Informática': 0.35,
    'Consultoría y Servicios Profesionales': 0.25,
    'Comercio': 0.60,
    'Hostelería y Restauración': 0.65,
    'Construcción': 0.55,
    'Industria': 0.50,
    'Educación': 0.20,
    'Salud': 0.30
  };

  return sectorRatios[sector] || 0.30; // 30% por defecto
}

export function simulateAutonomoTaxes(
  revenue: number,
  formData: any,
  customExpenses?: ExpenseBreakdown
): TaxCalculation {
  const deductibleExpenses = estimateDeductibleExpenses(
    revenue, 
    formData.economicSector, 
    formData.hasEmployees === 'yes',
    customExpenses
  );

  const taxableIncome = Math.max(0, revenue - deductibleExpenses);
  const irpfTax = calculateIRPF(taxableIncome);
  const vatTax = calculateVAT(revenue) * 0.8; // Asumiendo 80% de IVA efectivo
  const socialSecurity = calculateSocialSecurity('autonomo', taxableIncome);

  const totalTaxes = irpfTax + vatTax + socialSecurity;
  const netIncome = revenue - deductibleExpenses - totalTaxes;
  const effectiveTaxRate = revenue > 0 ? (totalTaxes / revenue) * 100 : 0;

  return {
    grossRevenue: revenue,
    deductibleExpenses,
    taxableIncome,
    irpfTax,
    vatTax,
    socialSecurity,
    totalTaxes,
    netIncome,
    effectiveTaxRate
  };
}

export function simulateSLTaxes(
  revenue: number,
  formData: any,
  customExpenses?: ExpenseBreakdown
): TaxCalculation {
  const deductibleExpenses = estimateDeductibleExpenses(
    revenue, 
    formData.economicSector, 
    formData.hasEmployees === 'yes',
    customExpenses
  );

  // En SL, los administradores pueden cobrar sueldo (deducible)
  const adminSalary = Math.min(revenue * 0.3, 60000); // Máximo razonable
  const totalExpenses = deductibleExpenses + adminSalary;

  const taxableIncome = Math.max(0, revenue - totalExpenses);
  const isStartup = formData.hasSpecialDeductions?.includes('startup');
  const corporateTax = calculateCorporateTax(taxableIncome, isStartup);
  const vatTax = calculateVAT(revenue) * 0.8;
  
  // SS del administrador asalariado
  const socialSecurity = calculateSocialSecurity('empleado', adminSalary);

  const totalTaxes = corporateTax + vatTax + socialSecurity;
  const netIncome = revenue - totalExpenses - totalTaxes;
  const effectiveTaxRate = revenue > 0 ? (totalTaxes / revenue) * 100 : 0;

  return {
    grossRevenue: revenue,
    deductibleExpenses: totalExpenses,
    taxableIncome,
    corporateTax,
    vatTax,
    socialSecurity,
    totalTaxes,
    netIncome,
    effectiveTaxRate
  };
}

export function compareScenarios(revenue: number, formData: any): {
  autonomo: TaxCalculation;
  sl: TaxCalculation;
  savings: number;
  recommendation: string;
} {
  const autonomoCalc = simulateAutonomoTaxes(revenue, formData);
  const slCalc = simulateSLTaxes(revenue, formData);
  
  const savings = autonomoCalc.totalTaxes - slCalc.totalTaxes;
  const recommendation = savings > 0 
    ? `La SL ahorra €${savings.toFixed(2)} anuales (${((savings/autonomoCalc.totalTaxes)*100).toFixed(1)}%)`
    : `El régimen de autónomos ahorra €${Math.abs(savings).toFixed(2)} anuales`;

  return {
    autonomo: autonomoCalc,
    sl: slCalc,
    savings,
    recommendation
  };
}
