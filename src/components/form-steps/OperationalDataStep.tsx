
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from "@/types/form";

interface OperationalDataStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const OperationalDataStep = ({ formData, updateFormData }: OperationalDataStepProps) => {
  const provinces = [
    "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona",
    "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba",
    "A Coruña", "Cuenca", "Girona", "Granada", "Guadalajara", "Gipuzkoa", "Huelva",
    "Huesca", "Islas Baleares", "Jaén", "León", "Lleida", "Lugo", "Madrid", "Málaga",
    "Murcia", "Navarra", "Ourense", "Palencia", "Las Palmas", "Pontevedra", "La Rioja",
    "Salamanca", "Segovia", "Sevilla", "Soria", "Tarragona", "Santa Cruz de Tenerife",
    "Teruel", "Toledo", "Valencia", "Valladolid", "Bizkaia", "Zamora", "Zaragoza"
  ];

  const accountingSoftware = [
    "Sage",
    "ContaPlus",
    "FacturaPlus",
    "A3CON",
    "Holded",
    "Contasimple",
    "Debitoor",
    "Excel / Hojas de cálculo",
    "Gestión manual",
    "Otro",
    "No uso ninguno"
  ];

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">Provincia</Label>
        <Select value={formData.province} onValueChange={(value) => updateFormData({ province: value })}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Selecciona tu provincia" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province} value={province}>
                {province}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="city" className="text-base font-medium">
          Ciudad
        </Label>
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => updateFormData({ city: e.target.value })}
          placeholder="Ej: Madrid"
          className="mt-2"
        />
      </div>

      <div>
        <Label className="text-base font-medium">Software contable utilizado</Label>
        <Select value={formData.accountingSoftware} onValueChange={(value) => updateFormData({ accountingSoftware: value })}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Selecciona tu software contable" />
          </SelectTrigger>
          <SelectContent>
            {accountingSoftware.map((software) => (
              <SelectItem key={software} value={software}>
                {software}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-medium">Auditoría</Label>
        <RadioGroup
          value={formData.auditRequired}
          onValueChange={(value) => updateFormData({ auditRequired: value })}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="required" id="audit-required" />
            <Label htmlFor="audit-required">Obligatoria por normativa</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="voluntary" id="audit-voluntary" />
            <Label htmlFor="audit-voluntary">Voluntaria</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not-applicable" id="audit-not-applicable" />
            <Label htmlFor="audit-not-applicable">No aplica</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unsure" id="audit-unsure" />
            <Label htmlFor="audit-unsure">No estoy seguro</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default OperationalDataStep;
