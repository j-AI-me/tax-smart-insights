
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormData } from "@/types/form";

interface RiskProfileStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const RiskProfileStep = ({ formData, updateFormData }: RiskProfileStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">¿Ha tenido inspecciones fiscales anteriormente?</Label>
        <RadioGroup
          value={formData.hasInspections}
          onValueChange={(value) => updateFormData({ hasInspections: value })}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-inspections" />
            <Label htmlFor="no-inspections">No, nunca</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes-resolved" id="yes-resolved" />
            <Label htmlFor="yes-resolved">Sí, pero se resolvió favorablemente</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes-penalties" id="yes-penalties" />
            <Label htmlFor="yes-penalties">Sí, con sanciones o regularizaciones</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="first-business" id="first-business" />
            <Label htmlFor="first-business">Es mi primera empresa</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">Nivel de riesgo fiscal asumible</Label>
        <RadioGroup
          value={formData.riskLevel}
          onValueChange={(value) => updateFormData({ riskLevel: value })}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="conservative" id="conservative" />
            <Label htmlFor="conservative">
              <div>
                <div className="font-medium">Conservador</div>
                <div className="text-sm text-muted-foreground">
                  Prefiero estrategias 100% seguras, aunque el ahorro sea menor
                </div>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="moderate" id="moderate" />
            <Label htmlFor="moderate">
              <div>
                <div className="font-medium">Intermedio</div>
                <div className="text-sm text-muted-foreground">
                  Acepto cierto riesgo si las estrategias están bien fundamentadas
                </div>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="aggressive" id="aggressive" />
            <Label htmlFor="aggressive">
              <div>
                <div className="font-medium">Agresivo</div>
                <div className="text-sm text-muted-foreground">
                  Quiero maximizar el ahorro fiscal dentro de la legalidad
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex-shrink-0 mt-0.5"></div>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Información importante</h4>
            <p className="text-sm text-blue-800">
              Todas nuestras recomendaciones son 100% legales y están basadas en la normativa fiscal vigente. 
              El nivel de riesgo se refiere únicamente a la agresividad de las estrategias de optimización fiscal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskProfileStep;
