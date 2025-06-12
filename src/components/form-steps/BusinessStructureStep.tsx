
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from "@/types/form";

interface BusinessStructureStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const BusinessStructureStep = ({ formData, updateFormData }: BusinessStructureStepProps) => {
  const sectors = [
    "Tecnología e Informática",
    "Comercio y Retail",
    "Servicios Profesionales",
    "Industria y Manufactura",
    "Construcción e Inmobiliaria",
    "Hostelería y Turismo",
    "Salud y Bienestar",
    "Educación y Formación",
    "Transporte y Logística",
    "Energía y Medio Ambiente",
    "Medios y Comunicación",
    "Agricultura y Alimentación",
    "Otro"
  ];

  const businessModels = [
    "B2B (Ventas a empresas)",
    "B2C (Ventas a consumidores)",
    "SaaS (Software como servicio)",
    "E-commerce",
    "Marketplace",
    "Servicios de consultoría",
    "Productos físicos",
    "Freemium",
    "Suscripción",
    "Otro"
  ];

  const revenueRanges = [
    "Menos de 30.000€",
    "30.000€ - 100.000€",
    "100.000€ - 300.000€",
    "300.000€ - 600.000€",
    "600.000€ - 1.000.000€",
    "Más de 1.000.000€"
  ];

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">Sector económico</Label>
        <Select value={formData.economicSector} onValueChange={(value) => updateFormData({ economicSector: value })}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Selecciona tu sector" />
          </SelectTrigger>
          <SelectContent>
            {sectors.map((sector) => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-medium">Modelo de negocio</Label>
        <Select value={formData.businessModel} onValueChange={(value) => updateFormData({ businessModel: value })}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Selecciona tu modelo de negocio" />
          </SelectTrigger>
          <SelectContent>
            {businessModels.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-medium">Facturación prevista este año</Label>
        <Select value={formData.expectedRevenue} onValueChange={(value) => updateFormData({ expectedRevenue: value })}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Selecciona el rango de facturación" />
          </SelectTrigger>
          <SelectContent>
            {revenueRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-medium">¿Emplea trabajadores o planea hacerlo?</Label>
        <RadioGroup
          value={formData.hasEmployees}
          onValueChange={(value) => updateFormData({ hasEmployees: value })}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-employees" />
            <Label htmlFor="no-employees">No, trabajo solo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="few" id="few-employees" />
            <Label htmlFor="few-employees">Sí, pocos empleados (1-10)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="many" id="many-employees" />
            <Label htmlFor="many-employees">Sí, muchos empleados (+10)</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">¿Exporta o tiene actividad internacional?</Label>
        <RadioGroup
          value={formData.hasInternationalActivity}
          onValueChange={(value) => updateFormData({ hasInternationalActivity: value })}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-international" />
            <Label htmlFor="no-international">No, solo actividad nacional</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="occasional" id="occasional-international" />
            <Label htmlFor="occasional-international">Ocasionalmente</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="regular" id="regular-international" />
            <Label htmlFor="regular-international">Sí, regularmente</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default BusinessStructureStep;
