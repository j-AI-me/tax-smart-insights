import { expect, test, describe } from "bun:test";
import { simulateAutonomoTaxes, simulateSLTaxes, simulateCooperativeTaxes } from "../src/utils/taxSimulator";
import cases from "./aeatCases.json";

const baseFormData = {
  economicSector: "Tecnología e Informática",
  hasEmployees: "no",
  hasSpecialDeductions: "",
  hasPartners: "no"
};

const autonomoCase = cases.find(c => c.name === "autonomo_estimacion_directa")!;
const slCase = cases.find(c => c.name === "sl_sin_beneficios")!;
const coopCase = cases.find(c => c.name === "cooperativa_trabajo")!;

describe("Casos fiscales AEAT", () => {
  test("Autónomo en estimación directa", () => {
    const result = simulateAutonomoTaxes(
      autonomoCase.revenue,
      baseFormData,
      autonomoCase.expenses
    );
    expect(result.taxableIncome).toBe(40000);
    expect(Math.round(result.irpfTax)).toBe(10502);
    expect(result.totalTaxes).toBeGreaterThan(30000);
    expect(result.netIncome).toBeLessThan(10000);
    expect(result.totalTaxes).toBeGreaterThanOrEqual(0);
  });

  test("SL sin beneficios", () => {
    const form = { ...baseFormData, hasEmployees: "yes" };
    const result = simulateSLTaxes(
      slCase.revenue,
      form,
      slCase.expenses
    );
    expect(result.taxableIncome).toBe(0);
    expect(result.corporateTax).toBe(0);
    expect(result.totalTaxes).toBeGreaterThan(0);
    expect(result.totalTaxes).toBeGreaterThanOrEqual(0);
  });

  test("Cooperativa de trabajo", () => {
    const form = { ...baseFormData, hasEmployees: "yes" };
    const result = simulateCooperativeTaxes(
      coopCase.revenue,
      form,
      coopCase.expenses
    );
    expect(result.corporateTax).toBeCloseTo(0.2 * result.taxableIncome, 2);
    expect(result.totalTaxes).toBeGreaterThan(0);
    expect(result.effectiveTaxRate).toBeLessThan(100);
    expect(result.totalTaxes).toBeGreaterThanOrEqual(0);
  });
});
