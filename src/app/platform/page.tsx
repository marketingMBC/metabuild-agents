"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MessageCircle,
  Brain,
  BarChart3,
  Zap,
  Shield,
  Globe,
  Bot,
  Database,
  Workflow,
  Clock,
  Users,
  TrendingUp,
} from "lucide-react";

const capabilities = [
  {
    icon: MessageCircle,
    title: "Multi-Canal Nativo",
    description:
      "WhatsApp Business API, Instagram DM, Facebook Messenger, Telegram, Email y SMS. Un agente, todos los canales.",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    icon: Brain,
    title: "IA Contextual Avanzada",
    description:
      "Powered by Claude de Anthropic. Comprende contexto, mantiene memoria de conversaciones y aprende del comportamiento de tus clientes.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    icon: Database,
    title: "Dashboard Integrado en Tiempo Real",
    description:
      "Todas las conversaciones, métricas y KPIs en el Dashboard integrado. Vistas Kanban, tablas y calendarios actualizados automáticamente.",
    color: "text-cyan",
    bg: "bg-cyan/10",
  },
  {
    icon: Workflow,
    title: "Flow Builder Visual",
    description:
      "Editor drag & drop para crear automatizaciones visuales. Diseña flujos complejos sin código: lead scoring, seguimiento, escalamiento.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    icon: BarChart3,
    title: "Analytics e Inteligencia",
    description:
      "Reportes automáticos de performance, análisis de sentimiento, métricas de conversión y predicciones de venta basadas en datos.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Shield,
    title: "Seguridad Enterprise",
    description:
      "Datos encriptados end-to-end, cumplimiento GDPR, servidores en Chile/LATAM, backups automáticos y control de acceso granular.",
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
];

const agentTypes = [
  {
    icon: "🛒",
    name: "Agente de Ventas",
    description:
      "Califica leads, presenta productos, maneja objeciones, envía cotizaciones y cierra ventas. Funciona 24/7 sin descanso.",
    features: [
      "Calificación automática de leads (BANT)",
      "Catálogo de productos inteligente",
      "Generación de cotizaciones en PDF",
      "Seguimiento automático post-cotización",
      "Escalamiento a humano cuando es necesario",
    ],
  },
  {
    icon: "🎧",
    name: "Agente de Soporte",
    description:
      "Resuelve consultas frecuentes, gestiona reclamos, da seguimiento a tickets y mantiene satisfechos a tus clientes.",
    features: [
      "Base de conocimiento personalizada",
      "Gestión de tickets con priorización",
      "Resolución de FAQs en segundos",
      "Encuestas de satisfacción automáticas",
      "Historial completo de interacciones",
    ],
  },
  {
    icon: "📱",
    name: "Agente de RRSS",
    description:
      "Gestiona comentarios y mensajes en todas tus redes sociales. Responde, modera y genera engagement automáticamente.",
    features: [
      "Respuesta a comentarios en Instagram/Facebook",
      "Gestión de DMs en múltiples cuentas",
      "Moderación de contenido automática",
      "Generación de contenido sugerido",
      "Análisis de sentimiento en tiempo real",
    ],
  },
  {
    icon: "🏢",
    name: "Agente de Administración",
    description:
      "Para administración de edificios, comunidades y propiedades. Gestiona solicitudes, comunicados y mantención.",
    features: [
      "Atención a residentes 24/7",
      "Gestión de solicitudes de mantención",
      "Envío de comunicados masivos",
      "Registro de visitas y encomiendas",
      "Reportes de gastos comunes",
    ],
  },
];

export default function PlatformPage() {
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-hero bg-grid">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 rounded-full px-4 py-2 text-cyan text-sm mb-8">
            <Bot className="w-4 h-4" />
            Plataforma MetaBuild Agents
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            La Plataforma Más Completa de{" "}
            <span className="gradient-text">Agentes de IA</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Crea, configura y despliega agentes de inteligencia artificial que
            automatizan tus ventas, atención al cliente y marketing. Agent Studio,
            Base de Conocimiento, Flow Builder y Dashboard integrado en una sola plataforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-cyan hover:bg-cyan-dark text-navy font-bold px-8 py-4 rounded-lg transition-all glow-cyan-sm hover:glow-cyan"
            >
              Comenzar Gratis — 14 Días
            </Link>
            <Link
              href="/pricing"
              className="border border-cyan/30 hover:border-cyan text-cyan font-medium px-8 py-4 rounded-lg transition-all"
            >
              Ver Planes y Precios
            </Link>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Arquitectura de la <span className="gradient-text">Plataforma</span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
            Tecnología enterprise accesible para empresas de todos los tamaños
          </p>

          {/* Architecture Diagram */}
          <div className="glass-strong rounded-2xl p-8 md:p-12 mb-16">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {/* Input Layer */}
              <div>
                <div className="text-cyan font-semibold text-sm uppercase tracking-wider mb-4">
                  Canales de Entrada
                </div>
                <div className="space-y-3">
                  {[
                    "WhatsApp Business",
                    "Instagram DM",
                    "Facebook Messenger",
                    "Email",
                    "Telegram",
                    "Web Chat",
                  ].map((ch) => (
                    <div
                      key={ch}
                      className="bg-surface rounded-lg py-2 px-4 text-sm text-gray-300"
                    >
                      {ch}
                    </div>
                  ))}
                </div>
              </div>

              {/* Processing Layer */}
              <div>
                <div className="text-purple font-semibold text-sm uppercase tracking-wider mb-4">
                  Motor de IA
                </div>
                <div className="glass rounded-xl p-6 border border-purple/20">
                  <div className="text-2xl mb-2">🧠</div>
                  <h3 className="font-bold mb-2">MetaBuild Agents Engine</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>Claude AI (Anthropic)</p>
                    <p>Agent Studio</p>
                    <p>Base de Conocimiento</p>
                    <p>Flow Builder</p>
                    <p>Decision Router</p>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  Procesamiento en &lt;3 segundos
                </div>
              </div>

              {/* Output Layer */}
              <div>
                <div className="text-cyan font-semibold text-sm uppercase tracking-wider mb-4">
                  Integraciones
                </div>
                <div className="space-y-3">
                  {[
                    "Dashboard Integrado",
                    "CRM (HubSpot, etc.)",
                    "Google Calendar",
                    "Facturación",
                    "Analytics Avanzado",
                    "Custom APIs",
                  ].map((int) => (
                    <div
                      key={int}
                      className="bg-surface rounded-lg py-2 px-4 text-sm text-gray-300"
                    >
                      {int}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-8 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              Latencia promedio: 1.8 segundos end-to-end
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-20 px-6 bg-surface/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Capacidades <span className="gradient-text">Técnicas</span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
            Todo lo que necesitas para automatizar tu operación comercial
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="glass rounded-xl p-6 hover:scale-[1.02] transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${cap.bg} flex items-center justify-center mb-4`}
                >
                  <cap.icon className={`w-6 h-6 ${cap.color}`} />
                </div>
                <h3 className="font-bold text-lg mb-2">{cap.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Types */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Tipos de <span className="gradient-text">Agentes</span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
            Agentes especializados para cada área de tu negocio
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {agentTypes.map((agent) => (
              <div
                key={agent.name}
                className="glass-strong rounded-2xl p-8 hover:border-cyan/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{agent.icon}</div>
                <h3 className="text-xl font-bold mb-3">{agent.name}</h3>
                <p className="text-gray-400 mb-6">{agent.description}</p>
                <ul className="space-y-2">
                  {agent.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <span className="text-cyan mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 bg-surface/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Construido con <span className="gradient-text">lo Mejor</span>
          </h2>
          <p className="text-gray-400 mb-12">
            Tecnología de punta para resultados reales
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Claude AI",
                desc: "Anthropic",
                detail: "Motor de IA",
              },
              { name: "Agent Studio", desc: "Configuración", detail: "Creación de agentes" },
              { name: "Flow Builder", desc: "Automatización", detail: "Editor visual" },
              {
                name: "WhatsApp",
                desc: "Business API",
                detail: "Comunicación",
              },
            ].map((tech) => (
              <div
                key={tech.name}
                className="glass rounded-xl p-6 hover:glow-cyan-sm transition-all"
              >
                <h3 className="font-bold text-lg text-cyan">{tech.name}</h3>
                <p className="text-sm text-gray-400">{tech.desc}</p>
                <p className="text-xs text-gray-500 mt-1">{tech.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: Clock,
                stat: "< 3s",
                label: "Tiempo de respuesta",
              },
              {
                icon: Users,
                stat: "10.000+",
                label: "Mensajes diarios",
              },
              {
                icon: TrendingUp,
                stat: "45%",
                label: "Más conversiones",
              },
              {
                icon: Globe,
                stat: "24/7",
                label: "Disponibilidad",
              },
            ].map((m) => (
              <div key={m.label}>
                <m.icon className="w-8 h-8 text-cyan mx-auto mb-3" />
                <div className="text-3xl font-bold text-cyan mb-1">
                  {m.stat}
                </div>
                <div className="text-gray-400 text-sm">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-radial">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Comienza a Vender con IA Hoy
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            14 días de prueba gratuita. Sin tarjeta de crédito. Setup en menos
            de 24 horas.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-cyan hover:bg-cyan-dark text-navy font-bold px-10 py-4 rounded-lg transition-all glow-cyan"
          >
            Solicitar Acceso
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
