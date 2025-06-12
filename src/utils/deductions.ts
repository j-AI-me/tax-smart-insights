export interface DeductionMeta {
  applicableTo: 'autonomo' | 'sl' | 'both';
  incompatibleWith?: string[];
  warnings?: string[];
}

export const DEDUCTION_META: Record<string, DeductionMeta> = {
  'Tipo reducido IS para startups (15% primeros dos períodos)': {
    applicableTo: 'sl'
  },
  'Reserva de capitalización (10% sobre beneficios retenidos)': {
    applicableTo: 'sl',
    incompatibleWith: ['Tipo reducido IS para startups (15% primeros dos períodos)'],
    warnings: ['Límite máximo por empresa']
  },
  'Deducción del 25% sobre gastos I+D+i': {
    applicableTo: 'sl',
    warnings: ['Esta deducción requiere informe motivado']
  },
  'Deducción adicional del 17% si supera la media de los dos años anteriores': {
    applicableTo: 'sl'
  },
  'Deducción del 8% sobre inversiones en activos afectos a I+D+i': {
    applicableTo: 'sl'
  },
  'Exención en IS por rentas obtenidas en el extranjero': {
    applicableTo: 'sl'
  },
  'Deducción por doble imposición internacional': {
    applicableTo: 'sl'
  }
};

export interface ValidatedDeduction {
  name: string;
  warnings: string[];
}

export function validateDeductions(
  deductions: string[],
  taxStructure: 'autonomo' | 'sl'
): ValidatedDeduction[] {
  const results: ValidatedDeduction[] = [];
  const applied = new Set<string>();

  for (const name of deductions) {
    const meta = DEDUCTION_META[name];
    if (meta) {
      if (meta.applicableTo === 'sl' && taxStructure === 'autonomo') {
        continue;
      }
      if (meta.incompatibleWith && meta.incompatibleWith.some(i => applied.has(i))) {
        continue;
      }
      applied.add(name);
      results.push({ name, warnings: meta.warnings || [] });
    } else {
      results.push({ name, warnings: [] });
    }
  }

  return results;
}
