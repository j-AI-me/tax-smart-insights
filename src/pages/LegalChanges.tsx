import { useState } from "react";
import { getRuleChangesByFiscalYear, FiscalRule } from "@/utils/fiscalRules";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const LegalChanges = () => {
  const years = [2024, 2023];
  const [year, setYear] = useState<number>(years[0]);
  const changes: FiscalRule[] = getRuleChangesByFiscalYear(year);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold flex-1">Cambios legales por año</h1>
        </div>
        <div className="mb-4">
          <select
            value={year}
            onChange={e => setYear(parseInt(e.target.value))}
            className="border p-2 rounded"
          >
            {years.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Actualizaciones {year}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {changes.length === 0 && (
              <p className="text-muted-foreground">Sin cambios registrados</p>
            )}
            {changes.map(rule => (
              <div key={rule.id} className="border-b pb-2 last:border-b-0">
                <div className="font-medium">{rule.name}</div>
                <div className="text-sm text-muted-foreground">
                  BOE: {rule.sourceBOE} - {rule.startDate}
                  {rule.endDate ? ` → ${rule.endDate}` : ""}
                </div>
                <div className="text-sm">{rule.recommendation}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LegalChanges;
