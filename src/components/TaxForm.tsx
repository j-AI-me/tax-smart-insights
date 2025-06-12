
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CompanyIdentityStep from "@/components/form-steps/CompanyIdentityStep";
import BusinessStructureStep from "@/components/form-steps/BusinessStructureStep";
import TaxStrategyStep from "@/components/form-steps/TaxStrategyStep";
import OperationalDataStep from "@/components/form-steps/OperationalDataStep";
import RiskProfileStep from "@/components/form-steps/RiskProfileStep";
import AccountingDataStep from "@/components/form-steps/AccountingDataStep";
import { toast } from "@/components/ui/sonner";
import ResultsPage from "@/components/ResultsPage";
import { FormData } from "@/types/form";

interface TaxFormProps {
  onBack: () => void;
}

const TaxForm = ({ onBack }: TaxFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    currentStatus: "",
    hasPartners: "",
    partnerCount: "",
    partnerPercentages: "",
    economicSector: "",
    businessModel: "",
    expectedRevenue: "",
    hasEmployees: "",
    hasInternationalActivity: "",
    annualIncome: "",
    annualExpenses: "",
    annualInvestment: "",
    activityType: "",
    currentLegalForm: "",
    cnae: "",
    expectedProfit: "",
    preferredTaxStructure: "",
    seekingInvestors: "",
    hasSpecialDeductions: "",
    interestedInAdvancedStructures: "",
    province: "",
    city: "",
    accountingSoftware: "",
    auditRequired: "",
    hasInspections: "",
    riskLevel: ""
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = [
    "Identidad Empresarial",
    "Estructura y Actividad",
    "Datos Contables",
    "Estrategia Fiscal",
    "Datos Operativos",
    "Perfil de Riesgo"
  ];

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      if (!formData.expectedProfit || Number(formData.expectedProfit) <= 0) {
        toast({ title: "Indica el beneficio esperado para comparar" });
        return;
      }
      setCurrentStep(7); // Show results
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CompanyIdentityStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <BusinessStructureStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <AccountingDataStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <TaxStrategyStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <OperationalDataStep formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <RiskProfileStep formData={formData} updateFormData={updateFormData} />;
      case 7:
        return <ResultsPage formData={formData} onBack={onBack} />;
      default:
        return null;
    }
  };

  if (currentStep === 7) {
    return renderStep();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Plan Fiscal Personalizado</h1>
            <p className="text-muted-foreground">Paso {currentStep} de {totalSteps}: {stepTitles[currentStep - 1]}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progreso</span>
            <span>{Math.round(progress)}% completado</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              {stepTitles[currentStep - 1]}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStep()}
            
            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </Button>
              
              <Button 
                onClick={nextStep}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 flex items-center gap-2"
              >
                {currentStep === totalSteps ? "Ver resultados" : "Siguiente"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaxForm;
