import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { Check, X, HelpCircle } from "lucide-react";
import Link from "next/link";

const comparisonFeatures = [
  {
    category: "Agentes de IA",
    features: [
      {
        name: "Agentes incluidos",
        starter: "1",
        professional: "3",
        enterprise: "Ilimitados",
      },
      {
        name: "Conversaciones/mes",
        starter: "1.000",
        professional: "5.000",
        enterprise: "Ilimitadas",
      },
      {
        name: "Memoria contextual",
        starter: true,
        professional: true,
        enterprise: true,
      },
      {
        name: "Multi-idioma",
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: "Lead scoring con IA",
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: "IA predictiva",
        starter: false,
        professional: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "Canales",
    features: [
      {
        name: "WhatsApp Business",
        starter: true,
        professional: true,
        enterprise: true,
      },
      {
        name: "Instagram DM",
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: "Facebook Messenger",
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: "Email",
        starter: true,
        professional: true,
        enterprise: true,
      },
      {
        name: "Telegram",
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: "Web Chat",
        starter: false,
        professional: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "Dashboard & Analytics",
    features: [
      {
        name: "Dashboard Integrado",
        starter: "Básico",
        professional: "Avanzado",
        enterprise: "Personalizado",
      },
      {
        name: "Reportes",
        starter: "Semanales",
        professional: "Diarios",
        enterprise: "Tiempo real",
      },
      {
        name: "Analytics de conversación",
        starter: true,
        professional: true,
        enterprise: true,
      },
      {
        name: "Análisis de sentimiento",
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: "Exportación de datos",
        starter: false,
        professional: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Automatizaciones",
    features: [
      {
        name: "Flujos (Flow Builder)",
        starter: "3",
        professional: "10",
        enterprise: "Ilimitados",
      },
      {
        name: "Integraciones CRM",
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: "Integraciones custom",
        starter: false,
        professional: false,
        enterprise: true,
      },
      {
        name: "Webhooks",
        starter: true,
        professional: true,
        enterprise: true,
      },
      {
        name: "API access",
        starter: false,
        professional: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Soporte",
    features: [
      {
        name: "Soporte email",
        starter: true,
        professional: true,
        enterprise: true,
      },
      {
        name: "Soporte WhatsApp",
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: "Soporte 24/7",
        starter: false,
        professional: false,
        enterprise: true,
      },
      {
        name: "Account manager",
        starter: false,
        professional: false,
        enterprise: true,
      },
      {
        name: "Onboarding personalizado",
        starter: false,
        professional: false,
        enterprise: true,
      },
      {
        name: "SLA garantizado",
        starter: false,
        professional: "99.5%",
        enterprise: "99.9%",
      },
    ],
  },
];

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-cyan mx-auto" />
    ) : (
      <X className="w-5 h-5 text-gray-600 mx-auto" />
    );
  }
  return <span className="text-white text-sm font-medium">{value}</span>;
}

const faqs = [
  {
    q: "¿Hay un período de prueba gratuito?",
    a: "Sí, todos los planes incluyen 14 días de prueba gratuita con acceso completo. No necesitas tarjeta de crédito para comenzar.",
  },
  {
    q: "¿Puedo cambiar de plan en cualquier momento?",
    a: "Sí, puedes upgrade o downgrade en cualquier momento. Si haces upgrade, se te cobra la diferencia prorrateada. Si haces downgrade, el crédito se aplica al siguiente ciclo.",
  },
  {
    q: "¿Qué pasa si supero el límite de conversaciones?",
    a: "Te avisaremos cuando estés cerca del límite. Puedes hacer upgrade a un plan superior o comprar conversaciones adicionales a un costo variable. Tu agente nunca se detendrá abruptamente.",
  },
  {
    q: "¿Necesito la API de WhatsApp Business?",
    a: "Nosotros gestionamos la conexión con WhatsApp Business API por ti. Solo necesitas un número de teléfono dedicado para el agente. Te guiamos en todo el proceso de verificación.",
  },
  {
    q: "¿Cuánto tarda la implementación?",
    a: "El setup básico toma menos de 24 horas. Configuraciones más complejas (integraciones custom, flujos avanzados) pueden tomar 3-5 días hábiles. Incluimos onboarding completo.",
  },
  {
    q: "¿Puedo cancelar en cualquier momento?",
    a: "Sí, sin contratos de permanencia. Puedes cancelar cuando quieras. Tus datos se mantienen disponibles para descarga durante 30 días después de cancelar.",
  },
  {
    q: "¿Mis datos están seguros?",
    a: "Absolutamente. Usamos encriptación end-to-end, cumplimos con GDPR, y nuestros servidores están en infraestructura cloud de primer nivel. Nunca compartimos datos con terceros.",
  },
  {
    q: "¿Funciona en español y otros idiomas?",
    a: "Sí. El plan Starter incluye español. Professional agrega inglés. Enterprise soporta cualquier idioma. Claude AI se maneja con fluidez en más de 50 idiomas.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Precios <span className="gradient-text">Transparentes</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Elige el plan que se adapte a tu negocio. Escala cuando quieras,
            cancela cuando quieras.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <Pricing />

      {/* Comparison Table */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Comparación <span className="gradient-text">Detallada</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Todas las funcionalidades plan por plan
          </p>

          <div className="glass-strong rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-6 py-4 text-gray-400 font-medium w-[40%]">
                      Funcionalidad
                    </th>
                    <th className="text-center px-4 py-4 text-white font-medium">
                      Starter
                    </th>
                    <th className="text-center px-4 py-4 text-cyan font-medium">
                      Professional
                    </th>
                    <th className="text-center px-4 py-4 text-purple font-medium">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category) => (
                    <>
                      <tr key={category.category}>
                        <td
                          colSpan={4}
                          className="px-6 py-3 bg-surface/50 text-sm font-semibold text-cyan uppercase tracking-wider"
                        >
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature) => (
                        <tr
                          key={feature.name}
                          className="border-b border-white/5 hover:bg-white/[0.02]"
                        >
                          <td className="px-6 py-3 text-sm text-gray-300">
                            {feature.name}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <CellValue value={feature.starter} />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <CellValue value={feature.professional} />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <CellValue value={feature.enterprise} />
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-6 bg-surface/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Preguntas <span className="gradient-text">Frecuentes</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Todo lo que necesitas saber antes de comenzar
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="glass rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <HelpCircle className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-sm">{faq.q}</h3>
                </div>
                <p className="text-gray-400 text-sm pl-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 bg-gradient-radial">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Aún tienes dudas?</h2>
          <p className="text-gray-300 mb-8">
            Agenda una demo personalizada y te mostramos la plataforma en acción
            con un caso real de tu industria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-cyan hover:bg-cyan-dark text-navy font-bold px-8 py-4 rounded-lg transition-all glow-cyan-sm"
            >
              Agendar Demo Gratis
            </Link>
            <a
              href="https://wa.me/56912345678"
              className="border border-green-400/30 hover:border-green-400 text-green-400 font-medium px-8 py-4 rounded-lg transition-all"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
