import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingDown, Shield, FileText, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface LandingSectionProps {
  onStartForm: () => void;
}

const LandingSection = ({ onStartForm }: LandingSectionProps) => {
  const testimonials = [
    {
      name: "María González",
      company: "TechStart SL",
      savings: "€12,000",
      quote: "Redujimos nuestros impuestos un 40% con su asesoramiento. El informe fue muy claro y las recomendaciones, perfectas."
    },
    {
      name: "Carlos Rodríguez", 
      company: "Innovación Digital",
      savings: "€8,500",
      quote: "La optimización fiscal que nos propusieron nos permitió reinvertir más en I+D. Excelente servicio."
    },
    {
      name: "Ana Martín",
      company: "Consultoría Verde", 
      savings: "€15,200",
      quote: "Descubrimos deducciones que no conocíamos. El ROI ha sido increíble desde el primer año."
    }
  ];

  const benefits = [
    { icon: TrendingDown, title: "Reduce hasta 40% tus impuestos", description: "Estrategias fiscales legales y probadas" },
    { icon: Shield, title: "100% Legal y seguro", description: "Cumplimiento normativo garantizado" },
    { icon: FileText, title: "Informe personalizado", description: "Plan fiscal adaptado a tu negocio" },
    { icon: Users, title: "Asesoría experta", description: "Equipo de fiscalistas certificados" }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100">
            🎯 Optimización Fiscal Inteligente
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Descubre cómo pagar menos impuestos 
            <span className="block">legalmente</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Obtén un plan fiscal personalizado en 5 minutos. Nuestro sistema analiza tu empresa y te recomienda las mejores estrategias para optimizar tu carga tributaria.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={onStartForm}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FileText className="mr-2" />
              Crear mi plan fiscal gratuito
            </Button>
            <Link to="/casos-exito">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Ver casos de éxito
              </Button>
            </Link>
            <Link to="/expert">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Modo experto
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Sin compromiso
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              100% Gratuito
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Resultados inmediatos
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300 border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Success Cases */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Casos de éxito reales</h2>
          <p className="text-muted-foreground">Empresas que ya han optimizado su fiscalidad con nosotros</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <Badge className="bg-green-100 text-green-800 mb-2">
                    Ahorro: {testimonial.savings}
                  </Badge>
                </div>
                
                <p className="text-sm italic">"{testimonial.quote}"</p>
                
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para optimizar tu fiscalidad?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Únete a más de 500 empresas que ya han reducido sus impuestos legalmente
            </p>
            <Button 
              onClick={onStartForm}
              size="lg" 
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FileText className="mr-2" />
              Empezar ahora - Es gratis
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingSection;
