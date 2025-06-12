
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { FormData } from "@/types/form";

interface TaxStrategyStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const TaxStrategyStep = ({ formData, updateFormData }: TaxStrategyStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">Estructura tributaria preferida</Label>
        <RadioGroup
          value={formData.preferredTaxStructure}
          onValueChange={(value) => updateFormData({ preferredTaxStructure: value })}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="autonomo" id="autonomo" />
            <Label htmlFor="autonomo">Autónomo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sl" id="sl" />
            <Label htmlFor="sl">Sociedad Limitada (SL)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cooperativa" id="cooperativa" />
            <Label htmlFor="cooperativa">Cooperativa</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unsure" id="unsure" />
            <Label htmlFor="unsure">No estoy seguro, necesito asesoramiento</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">¿Busca inversores?</Label>
        <RadioGroup
          value={formData.seekingInvestors}
          onValueChange={(value) => updateFormData({ seekingInvestors: value })}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-investors" />
            <Label htmlFor="no-investors">No</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="short-term" id="short-term-investors" />
            <Label htmlFor="short-term-investors">Sí, en el corto plazo (6-12 meses)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium-term" id="medium-term-investors" />
            <Label htmlFor="medium-term-investors">Sí, en el medio plazo (1-3 años)</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">¿Su actividad tiene deducciones fiscales especiales?</Label>
        <div className="mt-2 space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="rdi" 
              checked={formData.hasSpecialDeductions?.includes("rdi")}
              onCheckedChange={(checked) => {
                const current = formData.hasSpecialDeductions || "";
                if (checked) {
                  updateFormData({ hasSpecialDeductions: current + "rdi," });
                } else {
                  updateFormData({ hasSpecialDeductions: current.replace("rdi,", "") });
                }
              }}
            />
            <Label htmlFor="rdi">I+D+i (Investigación, Desarrollo e Innovación)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="audiovisual" 
              checked={formData.hasSpecialDeductions?.includes("audiovisual")}
              onCheckedChange={(checked) => {
                const current = formData.hasSpecialDeductions || "";
                if (checked) {
                  updateFormData({ hasSpecialDeductions: current + "audiovisual," });
                } else {
                  updateFormData({ hasSpecialDeductions: current.replace("audiovisual,", "") });
                }
              }}
            />
            <Label htmlFor="audiovisual">Sector audiovisual</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="startup" 
              checked={formData.hasSpecialDeductions?.includes("startup")}
              onCheckedChange={(checked) => {
                const current = formData.hasSpecialDeductions || "";
                if (checked) {
                  updateFormData({ hasSpecialDeductions: current + "startup," });
                } else {
                  updateFormData({ hasSpecialDeductions: current.replace("startup,", "") });
                }
              }}
            />
            <Label htmlFor="startup">Incentivos para startups</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="none" 
              checked={formData.hasSpecialDeductions?.includes("none")}
              onCheckedChange={(checked) => {
                if (checked) {
                  updateFormData({ hasSpecialDeductions: "none," });
                } else {
                  updateFormData({ hasSpecialDeductions: "" });
                }
              }}
            />
            <Label htmlFor="none">No aplica / No lo sé</Label>
          </div>
        </div>
      </div>

      <div>
        <Label className="text-base font-medium">¿Le interesa reducir impuestos con estructuras legales avanzadas?</Label>
        <RadioGroup
          value={formData.interestedInAdvancedStructures}
          onValueChange={(value) => updateFormData({ interestedInAdvancedStructures: value })}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes-advanced" />
            <Label htmlFor="yes-advanced">Sí, me interesa maximizar el ahorro fiscal</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="conservative" id="conservative-advanced" />
            <Label htmlFor="conservative-advanced">Prefiero estrategias conservadoras</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unsure" id="unsure-advanced" />
            <Label htmlFor="unsure-advanced">No estoy seguro, necesito más información</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default TaxStrategyStep;
