import { calculateIRPF, calculateCorporateTax } from './taxSimulator';

export interface IRPFScenario {
  grossIncome: number;
  deductibleExpenses: number;
  taxableIncome: number;
  tax: number;
}

export interface ISScenario {
  grossIncome: number;
  deductibleExpenses: number;
  taxableIncome: number;
  tax: number;
}

export interface DoubleEntryResult {
  irpf: IRPFScenario;
  is: ISScenario;
  difference: number;
}

export function simulateDoubleEntry(
  grossIncome: number,
  irpfExpenses: number,
  isExpenses: number,
  extraDeductions = 0
): DoubleEntryResult {
  const irpfTaxable = Math.max(0, grossIncome - irpfExpenses);
  const irpfTax = calculateIRPF(irpfTaxable);

  const isTaxable = Math.max(0, grossIncome - isExpenses - extraDeductions);
  const isTax = calculateCorporateTax(isTaxable);

  return {
    irpf: {
      grossIncome,
      deductibleExpenses: irpfExpenses,
      taxableIncome: irpfTaxable,
      tax: irpfTax,
    },
    is: {
      grossIncome,
      deductibleExpenses: isExpenses + extraDeductions,
      taxableIncome: isTaxable,
      tax: isTax,
    },
    difference: irpfTax - isTax,
  };
}
