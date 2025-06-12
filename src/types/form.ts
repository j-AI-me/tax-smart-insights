
export interface FormData {
  // Company Identity
  companyName: string;
  currentStatus: string;
  hasPartners: string;
  partnerCount: string;
  partnerPercentages: string;
  
  // Business Structure
  economicSector: string;
  businessModel: string;
  expectedRevenue: string;
  hasEmployees: string;
  hasInternationalActivity: string;

  // Accounting Data
  annualIncome: string;
  annualExpenses: string;
  annualInvestment: string;
  activityType: string;
  currentLegalForm: string;
  cnae: string;
  expectedProfit: string;
  
  // Tax Strategy
  preferredTaxStructure: string;
  seekingInvestors: string;
  hasSpecialDeductions: string;
  interestedInAdvancedStructures: string;
  
  // Operational Data
  province: string;
  city: string;
  accountingSoftware: string;
  auditRequired: string;
  
  // Risk Profile
  hasInspections: string;
  riskLevel: string;
}
