import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from "@/types/form";

interface AccountingDataStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const AccountingDataStep = ({ formData, updateFormData }: AccountingDataStepProps) => {
  const activityTypes = [
    "Agricultura",
    "Industria",
    "Comercio",
    "Servicios",
    "Profesional",
    "Otro"
  ];

  const legalForms = [
    "Autónomo",
    "Sociedad Limitada",
    "Sociedad Anónima",
    "Comunidad de Bienes",
    "Cooperativa",
    "Otro"
  ];

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="annualIncome" className="text-base font-medium">
          Ingresos anuales (€)
        </Label>
        <Input
          id="annualIncome"
          type="number"
          min="0"
          value={formData.annualIncome}
          onChange={(e) => updateFormData({ annualIncome: e.target.value })}
          placeholder="Ej: 50000"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="annualExpenses" className="text-base font-medium">
          Gastos anuales (€)
        </Label>
        <Input
          id="annualExpenses"
          type="number"
          min="0"
          value={formData.annualExpenses}
          onChange={(e) => updateFormData({ annualExpenses: e.target.value })}
          placeholder="Ej: 20000"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="annualInvestment" className="text-base font-medium">
          Inversión prevista (€)
        </Label>
        <Input
          id="annualInvestment"
          type="number"
          min="0"
          value={formData.annualInvestment}
          onChange={(e) => updateFormData({ annualInvestment: e.target.value })}
          placeholder="Ej: 10000"
          className="mt-2"
        />
      </div>

      <div>
        <Label className="text-base font-medium">Tipo de actividad</Label>
        <Select value={formData.activityType} onValueChange={(value) => updateFormData({ activityType: value })}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Selecciona tipo de actividad" />
          </SelectTrigger>
          <SelectContent>
            {activityTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-medium">Forma jurídica actual</Label>
        <Select value={formData.currentLegalForm} onValueChange={(value) => updateFormData({ currentLegalForm: value })}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Selecciona la forma jurídica" />
          </SelectTrigger>
          <SelectContent>
            {legalForms.map((form) => (
              <SelectItem key={form} value={form}>
                {form}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="cnae" className="text-base font-medium">
          Código CNAE
        </Label>
        <Input
          id="cnae"
          value={formData.cnae}
          onChange={(e) => updateFormData({ cnae: e.target.value })}
          placeholder="Ej: 6201"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="expectedProfit" className="text-base font-medium">
          Beneficio esperado (€)
        </Label>
        <Input
          id="expectedProfit"
          type="number"
          min="0"
          value={formData.expectedProfit}
          onChange={(e) => updateFormData({ expectedProfit: e.target.value })}
          placeholder="Ej: 15000"
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default AccountingDataStep;
