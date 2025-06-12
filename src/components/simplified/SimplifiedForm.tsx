import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import QuickResults from "./QuickResults";

const revenueRanges = [
  "Menos de 30.000€",
  "30.000€ - 100.000€",
  "100.000€ - 300.000€",
  "300.000€ - 1M€",
  "Más de 1M€"
];

const SimplifiedForm = () => {
  const [step, setStep] = useState(1);
  const [expectedRevenue, setExpectedRevenue] = useState("");
  const [hasPartners, setHasPartners] = useState("");

  if (step === 3) {
    return (
      <QuickResults
        expectedRevenue={expectedRevenue}
        hasPartners={hasPartners}
        onReset={() => {
          setStep(1);
          setExpectedRevenue("");
          setHasPartners("");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-lg">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-xl">Diagnóstico Rápido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div>
                <label className="font-medium">Facturación prevista</label>
                <Select value={expectedRevenue} onValueChange={setExpectedRevenue}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecciona un rango" />
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
            )}
            {step === 2 && (
              <div>
                <label className="font-medium">¿Tienes socios?</label>
                <RadioGroup value={hasPartners} onValueChange={setHasPartners} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="partners-no" />
                    <label htmlFor="partners-no">No</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="partners-yes" />
                    <label htmlFor="partners-yes">Sí</label>
                  </div>
                </RadioGroup>
              </div>
            )}
            <div className="flex justify-between pt-4 border-t">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Anterior
                </Button>
              )}
              <Button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 ? !expectedRevenue : !hasPartners}
                className="bg-gradient-to-r from-blue-600 to-green-600"
              >
                {step === 2 ? "Ver resultado" : "Siguiente"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimplifiedForm;
