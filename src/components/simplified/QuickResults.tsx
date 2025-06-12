import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getRecommendedTaxStructure, parseRevenueValue } from "@/utils/fiscalRules";
import { compareScenarios } from "@/utils/taxSimulator";

interface QuickResultsProps {
  expectedRevenue: string;
  hasPartners: string;
  onReset: () => void;
}

const QuickResults = ({ expectedRevenue, hasPartners, onReset }: QuickResultsProps) => {
  const revenueValue = parseRevenueValue(expectedRevenue);
  const comparison = compareScenarios(revenueValue, { expectedRevenue, hasPartners });
  const recommended = getRecommendedTaxStructure({ expectedRevenue, hasPartners });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-lg">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-xl">Resultado Simplificado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Forma jurídica sugerida</div>
              <div className="text-2xl font-bold text-blue-600">{recommended.name}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Ahorro estimado</div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(Math.abs(comparison.savings))}
              </div>
            </div>
            <div className="space-y-2">
              <Button onClick={onReset} className="w-full bg-gradient-to-r from-blue-600 to-green-600">
                Volver
              </Button>
              <a href="tel:900123456" className="block text-center text-sm">📞 900 123 456</a>
              <a href="mailto:info@fiscaloptima.es" className="block text-center text-sm">
                ✉️ info@fiscaloptima.es
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickResults;
