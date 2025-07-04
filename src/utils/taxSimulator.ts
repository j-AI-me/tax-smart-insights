import { evaluateFiscalRules, getRecommendedTaxStructure } from "./fiscalRules";

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

// Tarifas IRPF 2024 (Estatal + Autonómica media)
const IRPF_BRACKETS = [
  { min: 0, max: 12450, rate: 19 },
  { min: 12450, max: 20200, rate: 24 },
  { min: 20200, max: 35200, rate: 30 },
  { min: 35200, max: 60000, rate: 37 },
  { min: 60000, max: 300000, rate: 47 },
  { min: 300000, max: Infinity, rate: 47 }
];

// Tarifas IS 2024
const IS_RATE_GENERAL = 25;
const IS_RATE_REDUCED = 15; // Para startups y PYMEs
const IS_RATE_MINIMUM = 15000; // Cuota mínima para grandes empresas

// Bases de cotización SS 2024
const SS_BASES = {
  autonomo_minima: 294.30,
  autonomo_maxima: 1266.00,
  empleado_empresa_rate: 0.2955 // 29.55% total (empresa + trabajador)
};

// Supuestos generales de simulación
export const DEFAULT_EXPENSE_RATIO = 0.30; // 30% de gastos medios si no hay datos
export const EQUIPMENT_AMORTIZATION_RATE = 0.20; // Amortización anual del 20%

export function calculateIRPF(taxableIncome: number): number {
  let tax = 0;
  let remainingIncome = taxableIncome;

  for (const bracket of IRPF_BRACKETS) {
    if (remainingIncome <= 0) break;
    
    const taxableAtThisBracket = Math.min(remainingIncome, bracket.max - bracket.min);
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

  return sectorRatios[sector] || DEFAULT_EXPENSE_RATIO;
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

export function simulateCooperativeTaxes(
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

  const memberSalary = Math.min(revenue * 0.3, 50000);
  const totalExpenses = deductibleExpenses + memberSalary;

  const taxableIncome = Math.max(0, revenue - totalExpenses);
  const corporateTax = taxableIncome * 0.20;
  const vatTax = calculateVAT(revenue) * 0.8;
  const socialSecurity = calculateSocialSecurity('empleado', memberSalary);

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

function parseRevenue(range: string): number {
  if (!range) return 0;
  if (range.includes('Menos de 30.000€')) return 25000;
  if (range.includes('30.000€ - 100.000€')) return 65000;
  if (range.includes('100.000€ - 300.000€')) return 200000;
  if (range.includes('300.000€ - 1M€')) return 650000;
  if (range.includes('Más de 1M€')) return 1500000;
  return 0;
}

export interface SimulacionFiscal {
  estructura: string;
  cuotaTributaria: number;
  deduccionesAplicables: string[];
  ahorroNeto: number;
  bruto: number;
  neto: number;
}

export function simularFiscalidad(formData: any): SimulacionFiscal {
  const revenue = parseRevenue(formData.expectedRevenue);
  const regime = getRecommendedTaxStructure(formData);
  const autonomo = simulateAutonomoTaxes(revenue, formData);
  const sl = simulateSLTaxes(revenue, formData);

  const calc = regime.type === 'sl' ? sl : autonomo;
  const other = regime.type === 'sl' ? autonomo : sl;

  const deductions = evaluateFiscalRules(formData).flatMap(r => r.deductions || []);

  return {
    estructura: regime.name,
    cuotaTributaria: calc.totalTaxes,
    deduccionesAplicables: deductions,
    ahorroNeto: other.totalTaxes - calc.totalTaxes,
    bruto: revenue,
    neto: calc.netIncome
  };
}

