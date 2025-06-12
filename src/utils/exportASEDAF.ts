import { FormData } from '@/types/form';
import { TaxCalculation } from '@/utils/taxSimulator';

interface AsedafRecord {
  companyName: string;
  regime: string;
  grossRevenue: number;
  deductibleExpenses: number;
  taxableIncome: number;
  totalTaxes: number;
  netIncome: number;
}

export function generateAsedafRecord(
  form: FormData,
  calc: TaxCalculation,
  regime: string
): AsedafRecord {
  return {
    companyName: form.companyName || 'Empresa',
    regime,
    grossRevenue: calc.grossRevenue,
    deductibleExpenses: calc.deductibleExpenses,
    taxableIncome: calc.taxableIncome,
    totalTaxes: calc.totalTaxes,
    netIncome: calc.netIncome,
  };
}

export function downloadAsedaf(records: AsedafRecord[], fileName: string) {
  const header = [
    'companyName',
    'regime',
    'grossRevenue',
    'deductibleExpenses',
    'taxableIncome',
    'totalTaxes',
    'netIncome',
  ].join(';');

  const lines = records.map(r =>
    [
      r.companyName,
      r.regime,
      r.grossRevenue,
      r.deductibleExpenses,
      r.taxableIncome,
      r.totalTaxes,
      r.netIncome,
    ].join(';')
  );

  const csv = [header, ...lines].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
