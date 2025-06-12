
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "@/types/form";

interface CompanyIdentityStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const CompanyIdentityStep = ({ formData, updateFormData }: CompanyIdentityStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="companyName" className="text-base font-medium">
          Nombre de la empresa o marca
        </Label>
        <Input
          id="companyName"
          value={formData.companyName}
          onChange={(e) => updateFormData({ companyName: e.target.value })}
          placeholder="Ej: TechStart Solutions"
          className="mt-2"
        />
      </div>

      <div>
        <Label className="text-base font-medium">Estado actual de la empresa</Label>
        <RadioGroup
          value={formData.currentStatus}
          onValueChange={(value) => updateFormData({ currentStatus: value })}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="idea" id="idea" />
            <Label htmlFor="idea">Es solo una idea</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="constitution" id="constitution" />
            <Label htmlFor="constitution">En proceso de constitución</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="operational" id="operational" />
            <Label htmlFor="operational">Ya está operativa</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">¿Tiene socios?</Label>
        <RadioGroup
          value={formData.hasPartners}
          onValueChange={(value) => updateFormData({ hasPartners: value })}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-partners" />
            <Label htmlFor="no-partners">No, soy el único propietario</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes-partners" />
            <Label htmlFor="yes-partners">Sí, tengo socios</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.hasPartners === "yes" && (
        <>
          <div>
            <Label htmlFor="partnerCount" className="text-base font-medium">
              ¿Cuántos socios?
            </Label>
            <Input
              id="partnerCount"
              type="number"
              value={formData.partnerCount}
              onChange={(e) => updateFormData({ partnerCount: e.target.value })}
              placeholder="Ej: 2"
              className="mt-2"
              min="1"
            />
          </div>

          <div>
            <Label htmlFor="partnerPercentages" className="text-base font-medium">
              Distribución de participaciones (opcional)
            </Label>
            <Textarea
              id="partnerPercentages"
              value={formData.partnerPercentages}
              onChange={(e) => updateFormData({ partnerPercentages: e.target.value })}
              placeholder="Ej: Yo 60%, Socio 1: 25%, Socio 2: 15%"
              className="mt-2"
              rows={3}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyIdentityStep;
