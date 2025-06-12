
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, Calendar, TrendingDown, Shield, FileText, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { FormData } from "@/types/form";

interface ResultsPageProps {
  formData: FormData;
  onBack: () => void;
}

const ResultsPage = ({ formData, onBack }: ResultsPageProps) => {
  // Simple recommendation engine based on form data
  const generateRecommendations = () => {
    const recommendations = {
      taxStructure: "",
      taxRate: "",
      estimatedSavings: "",
      deductions: [] as string[],
      risks: [] as string[],
      nextSteps: [] as string[]
    };

    // Determine recommended tax structure
    if (formData.expectedRevenue === "Menos de 30.000€") {
      recommendations.taxStructure = "Autónomo";
      recommendations.taxRate = "15-47%";
      recommendations.estimatedSavings = "€2,000 - €5,000";
    } else if (formData.expectedRevenue.includes("30.000€ - 100.000€")) {
      recommendations.taxStructure = formData.hasPartners === "yes" ? "Sociedad Limitada" : "Autónomo optimizado";
      recommendations.taxRate = formData.hasPartners === "yes" ? "25%" : "20-30%";
      recommendations.estimatedSavings = "€5,000 - €12,000";
    } else {
      recommendations.taxStructure = "Sociedad Limitada";
      recommendations.taxRate = "25%";
      recommendations.estimatedSavings = "€15,000 - €40,000";
    }

    // Add deductions based on activity
    if (formData.hasSpecialDeductions?.includes("rdi")) {
      recommendations.deductions.push("Deducción I+D+i (hasta 42%)");
    }
    if (formData.hasSpecialDeductions?.includes("startup")) {
      recommendations.deductions.push("Incentivos fiscales para startups");
    }
    if (formData.economicSector === "Tecnología e Informática") {
      recommendations.deductions.push("Amortización acelerada de equipos informáticos");
    }

    // Add risks based on risk profile
    if (formData.riskLevel === "conservative") {
      recommendations.risks.push("Riesgo muy bajo - Estrategias tradicionales");
    } else if (formData.riskLevel === "aggressive") {
      recommendations.risks.push("Requiere documentación exhaustiva");
      recommendations.risks.push("Posible mayor escrutinio en inspecciones");
    }

    // Next steps
    recommendations.nextSteps = [
      "Constitución de la estructura recomendada",
      "Implementación de sistema contable optimizado",
      "Planificación fiscal anual",
      "Revisión trimestral de estrategias"
    ];

    return recommendations;
  };

  const recommendations = generateRecommendations();

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
              Su Plan Fiscal Personalizado
            </h1>
            <p className="text-muted-foreground">
              Basado en el análisis de {formData.companyName || "su empresa"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Descargar PDF
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600">
              <Calendar className="w-4 h-4 mr-2" />
              Agendar consulta
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Executive Summary */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-green-600" />
                  Resumen Ejecutivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{recommendations.estimatedSavings}</div>
                    <div className="text-sm text-muted-foreground">Ahorro estimado anual</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{recommendations.taxRate}</div>
                    <div className="text-sm text-muted-foreground">Tipo impositivo efectivo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">25%</div>
                    <div className="text-sm text-muted-foreground">Reducción fiscal posible</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Structure */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Estructura Recomendada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Badge className="bg-blue-100 text-blue-800 mb-2">
                      Recomendación principal
                    </Badge>
                    <h3 className="text-xl font-semibold">{recommendations.taxStructure}</h3>
                    <p className="text-muted-foreground">
                      Basado en su facturación prevista y estructura societaria
                    </p>
                  </div>
                  
                  {formData.hasPartners === "yes" && (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800">Estructura societaria</h4>
                          <p className="text-sm text-yellow-700">
                            Con {formData.partnerCount} socios, recomendamos una SL con pacto de socios optimizado fiscalmente.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Available Deductions */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Deducciones Aplicables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.deductions.length > 0 ? (
                    recommendations.deductions.map((deduction, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>{deduction}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      <Info className="w-8 h-8 mx-auto mb-2" />
                      <p>Analizaremos deducciones específicas en la consulta personalizada</p>
                    </div>
                  )}
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
                  {recommendations.nextSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {index + 1}
                      </div>
                      <span>{step}</span>
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
