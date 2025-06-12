import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, Calendar, TrendingDown, Shield, FileText, CheckCircle, AlertTriangle, Info, Calculator, Euro } from "lucide-react";
import { FormData } from "@/types/form";
import {
  evaluateFiscalRules,
  getRecommendedTaxStructure,
  compareScenarios,
  simulateAutonomoTaxes,
  simulateSLTaxes,
} from "@/lib/fiscal";

interface ResultsPageProps {
  formData: FormData;
  onBack: () => void;
}

const ResultsPage = ({ formData, onBack }: ResultsPageProps) => {
  // Evaluación con el nuevo sistema de reglas
  const applicableRules = evaluateFiscalRules(formData);
  const recommendedStructure = getRecommendedTaxStructure(formData);
  
  // Simulación fiscal real
  const parseRevenue = (revenueRange: string): number => {
    if (revenueRange.includes('Menos de 30.000€')) return 25000;
    if (revenueRange.includes('30.000€ - 100.000€')) return 65000;
    if (revenueRange.includes('100.000€ - 300.000€')) return 200000;
    if (revenueRange.includes('300.000€ - 1M€')) return 650000;
    if (revenueRange.includes('Más de 1M€')) return 1500000;
    return 65000;
  };

  const estimatedRevenue = parseRevenue(formData.expectedRevenue);
  const taxComparison = compareScenarios(estimatedRevenue, formData);
  
  // Cálculo específico para la estructura recomendada
  const recommendedCalculation = recommendedStructure.type === 'sl' 
    ? taxComparison.sl 
    : taxComparison.autonomo;

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Informe Fiscal Personalizado
            </h1>
            <p className="text-muted-foreground">
              {formData.companyName || "Su empresa"} - Análisis basado en normativa AEAT 2024
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Descargar PDF
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600">
              <Calendar className="w-4 h-4 mr-2" />
              Consulta gratuita
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Simulación Fiscal */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Simulación Fiscal AEAT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(recommendedCalculation.netIncome)}
                    </div>
                    <div className="text-sm text-muted-foreground">Beneficio neto anual</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {formatCurrency(recommendedCalculation.totalTaxes)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total impuestos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {recommendedCalculation.effectiveTaxRate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Tipo efectivo</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Facturación bruta:</span>
                    <span className="font-semibold">{formatCurrency(recommendedCalculation.grossRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Gastos deducibles:</span>
                    <span className="font-semibold text-green-600">-{formatCurrency(recommendedCalculation.deductibleExpenses)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Base imponible:</span>
                    <span className="font-semibold">{formatCurrency(recommendedCalculation.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded border border-red-200">
                    <span>Impuestos totales:</span>
                    <span className="font-semibold text-red-600">-{formatCurrency(recommendedCalculation.totalTaxes)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded border border-green-200">
                    <span className="font-semibold">Beneficio neto:</span>
                    <span className="font-bold text-green-600">{formatCurrency(recommendedCalculation.netIncome)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comparación de Estructuras */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Euro className="w-5 h-5 text-green-600" />
                  Comparación Autónomo vs SL
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Régimen de Autónomos</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>IRPF:</span>
                        <span>{formatCurrency(taxComparison.autonomo.irpfTax || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IVA:</span>
                        <span>{formatCurrency(taxComparison.autonomo.vatTax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Seg. Social:</span>
                        <span>{formatCurrency(taxComparison.autonomo.socialSecurity)}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-1">
                        <span>Total:</span>
                        <span>{formatCurrency(taxComparison.autonomo.totalTaxes)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Sociedad Limitada</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Imp. Sociedades:</span>
                        <span>{formatCurrency(taxComparison.sl.corporateTax || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IVA:</span>
                        <span>{formatCurrency(taxComparison.sl.vatTax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Seg. Social:</span>
                        <span>{formatCurrency(taxComparison.sl.socialSecurity)}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-1">
                        <span>Total:</span>
                        <span>{formatCurrency(taxComparison.sl.totalTaxes)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center p-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg">
                  <div className="text-lg font-semibold mb-1">
                    {taxComparison.recommendation}
                  </div>
                  <div className="text-sm opacity-90">
                    Cálculo basado en normativa AEAT 2024
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recomendaciones basadas en reglas */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Análisis Normativo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Badge className="bg-blue-100 text-blue-800 mb-2">
                      Estructura recomendada
                    </Badge>
                    <h3 className="text-xl font-semibold">{recommendedStructure.name}</h3>
                    <p className="text-muted-foreground">
                      Basado en su facturación prevista y normativa fiscal vigente
                    </p>
                  </div>
                  
                  {applicableRules.map((rule, index) => (
                    <div key={rule.id} className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-800">{rule.name}</h4>
                          <p className="text-sm text-green-700 mt-1">{rule.recommendation}</p>
                          {rule.deductions && rule.deductions.length > 0 && (
                            <ul className="text-xs text-green-600 mt-2 ml-4">
                              {rule.deductions.map((deduction, i) => (
                                <li key={i} className="list-disc">{deduction}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Timeline de Implementación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicableRules.slice(0, 4).map((rule, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {index + 1}
                      </div>
                      <span>{rule.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Risk Assessment */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Evaluación de Riesgo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Nivel de riesgo</span>
                    <span className="capitalize">{formData.riskLevel}</span>
                  </div>
                  <Progress 
                    value={
                      formData.riskLevel === "conservative" ? 20 : 
                      formData.riskLevel === "moderate" ? 50 : 80
                    } 
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground">
                    {formData.riskLevel === "conservative" && "Estrategias muy seguras"}
                    {formData.riskLevel === "moderate" && "Equilibrio riesgo-beneficio"}
                    {formData.riskLevel === "aggressive" && "Máxima optimización"}
                  </div>
                  {applicableRules.some(rule => rule.risks && rule.risks.length > 0) && (
                    <div className="mt-2 space-y-1">
                      <div className="font-medium">Riesgos identificados:</div>
                      {applicableRules.flatMap(rule => rule.risks || []).map((risk, i) => (
                        <div key={i} className="text-orange-700">• {risk}</div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 to-green-600 text-white">
              <CardHeader>
                <CardTitle>¿Necesita ayuda?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm opacity-90">
                    Nuestros expertos pueden ayudarle a implementar estas estrategias y maximizar su ahorro fiscal.
                  </p>
                  <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar consulta gratuita
                  </Button>
                  <div className="text-xs opacity-75 text-center">
                    📞 900 123 456 | ✉️ info@fiscaloptima.es
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Alerts */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm">Próximas Obligaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>IRPF/IS 2024</span>
                    <Badge variant="outline" className="text-xs">Jun 2025</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA T1</span>
                    <Badge variant="outline" className="text-xs">Ene 2025</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Modelo 303</span>
                    <Badge variant="outline" className="text-xs">Ene 2025</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
