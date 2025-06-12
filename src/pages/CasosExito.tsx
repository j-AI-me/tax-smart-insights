
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Users, Building, Award, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const CasosExito = () => {
  const casosDetallados = [
    {
      empresa: "TechStart SL",
      sector: "Tecnología",
      fundador: "María González",
      facturacion: "€500K",
      empleados: 8,
      situacionInicial: {
        estructura: "Autónomo",
        impuestos: "€45,000",
        problemas: ["Alto IRPF", "Sin deducciones I+D", "Falta de planificación"]
      },
      solucionImplementada: {
        nuevaEstructura: "SL + Holding",
        deducciones: ["25% I+D+i", "Reducción tipo general", "Gastos deducibles optimizados"],
        timeline: "3 meses"
      },
      resultados: {
        ahorroAnual: "€12,000",
        porcentajeReduccion: "27%",
        nuevosImpuestos: "€33,000",
        beneficiosAdicionales: ["Protección patrimonial", "Facilita captación inversión", "Imagen corporativa"]
      },
      testimonio: "Redujimos nuestros impuestos un 27% y pudimos reinvertir esos €12,000 en contratar un desarrollador senior. El cambio de estructura nos ha permitido también negociar mejor con inversores.",
      avatar: "MG"
    },
    {
      empresa: "Consultoría Verde",
      sector: "Consultoría Ambiental",
      fundador: "Ana Martín",
      facturacion: "€280K",
      empleados: 3,
      situacionInicial: {
        estructura: "SL pequeña",
        impuestos: "€70,000",
        problemas: ["No aprovechaba incentivos verdes", "Tributación máxima", "Gastos mal estructurados"]
      },
      solucionImplementada: {
        nuevaEstructura: "SL + Cooperativa de trabajo",
        deducciones: ["Incentivos sostenibilidad", "Deducción cooperativa", "Gastos formación"],
        timeline: "4 meses"
      },
      resultados: {
        ahorroAnual: "€15,200",
        porcentajeReduccion: "22%",
        nuevosImpuestos: "€54,800",
        beneficiosAdicionales: ["Acceso a subvenciones verdes", "Mejor fiscalidad socios", "Imagen ESG"]
      },
      testimonio: "Descubrimos deducciones específicas del sector verde que no conocíamos. El ahorro nos permitió invertir en certificaciones ISO que han multiplicado nuestros clientes.",
      avatar: "AM"
    },
    {
      empresa: "Innovación Digital",
      sector: "Software/SaaS",
      fundador: "Carlos Rodríguez",
      facturacion: "€750K",
      empleados: 12,
      situacionInicial: {
        estructura: "SL estándar",
        impuestos: "€187,500",
        problemas: ["25% impuesto sociedades", "No optimización internacional", "Estructura rígida"]
      },
      solucionImplementada: {
        nuevaEstructura: "Holding + SL operativa + Entidad IP",
        deducciones: ["Patent Box", "I+D+i 25%", "Incentivos digitales"],
        timeline: "6 meses"
      },
      resultados: {
        ahorroAnual: "€45,000",
        porcentajeReduccion: "24%",
        nuevosImpuestos: "€142,500",
        beneficiosAdicionales: ["Optimización IP", "Flexibilidad internacional", "Planificación sucesoria"]
      },
      testimonio: "La reestructuración nos ha dado flexibilidad para expandirnos internacionalmente y optimizar la propiedad intelectual. Es una inversión que se paga sola.",
      avatar: "CR"
    }
  ];

  const metricas = [
    { valor: "€72,200", label: "Ahorro total generado", icon: TrendingUp },
    { valor: "23", label: "Empresas asesoradas", icon: Building },
    { valor: "24%", label: "Reducción media impuestos", icon: Award },
    { valor: "4.8", label: "Valoración media", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            🏆 Casos de Éxito Reales
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Empresas que ya han optimizado su fiscalidad
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre cómo otras empresas han reducido sus impuestos legalmente y reinvertido el ahorro en hacer crecer su negocio.
          </p>
        </div>

        {/* Métricas */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {metricas.map((metrica, index) => (
            <Card key={index} className="text-center p-6 border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center">
                  <metrica.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{metrica.valor}</div>
                <p className="text-sm text-muted-foreground">{metrica.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Casos detallados */}
      <section className="container mx-auto px-4 pb-16">
        <div className="space-y-12">
          {casosDetallados.map((caso, index) => (
            <Card key={index} className="p-8 border-0 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Info empresa */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {caso.avatar}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{caso.empresa}</h3>
                        <p className="text-muted-foreground">{caso.sector}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{caso.facturacion}</Badge>
                          <Badge variant="outline">{caso.empleados} empleados</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Situación inicial:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Estructura: {caso.situacionInicial.estructura}</li>
                          <li>• Impuestos anuales: {caso.situacionInicial.impuestos}</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Problemas detectados:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {caso.situacionInicial.problemas.map((problema, i) => (
                            <li key={i}>• {problema}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Solución */}
                  <div>
                    <h4 className="font-semibold mb-4">Solución implementada:</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-blue-600 mb-2">Nueva estructura:</p>
                        <p className="text-sm">{caso.solucionImplementada.nuevaEstructura}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-blue-600 mb-2">Deducciones aplicadas:</p>
                        <ul className="text-sm space-y-1">
                          {caso.solucionImplementada.deducciones.map((deduccion, i) => (
                            <li key={i}>• {deduccion}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-blue-600 mb-2">Tiempo de implementación:</p>
                        <p className="text-sm">{caso.solucionImplementada.timeline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Resultados */}
                  <div>
                    <h4 className="font-semibold mb-4">Resultados obtenidos:</h4>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{caso.resultados.ahorroAnual}</div>
                        <p className="text-sm text-green-700">Ahorro anual ({caso.resultados.porcentajeReduccion})</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Beneficios adicionales:</p>
                        <ul className="text-sm space-y-1">
                          {caso.resultados.beneficiosAdicionales.map((beneficio, i) => (
                            <li key={i}>• {beneficio}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm italic">"{caso.testimonio}"</p>
                        <p className="text-sm font-medium mt-2">- {caso.fundador}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">
              ¿Quieres ser el próximo caso de éxito?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Descubre cuánto puedes ahorrar con un plan fiscal personalizado gratuito
            </p>
            <Link to="/">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
              >
                Crear mi plan fiscal gratuito
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CasosExito;
