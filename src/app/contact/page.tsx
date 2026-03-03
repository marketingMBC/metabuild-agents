"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Send, MessageCircle, Mail, Calendar } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Hablemos de tu{" "}
            <span className="gradient-text">Próximo Agente</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Cuéntanos sobre tu negocio y te mostraremos cómo un agente de IA
            puede transformar tus ventas y atención al cliente.
          </p>
        </div>
      </section>

      {/* Contact Options + Form */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Left: Contact Methods */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Formas de Contactarnos
              </h2>
              <p className="text-gray-400 mb-8">
                Elige el canal que prefieras. Respondemos en menos de 2 horas en
                horario laboral.
              </p>
            </div>

            <div className="space-y-6">
              <div className="glass rounded-xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">WhatsApp</h3>
                  <p className="text-gray-400 text-sm">
                    Escríbenos directamente y prueba nuestro agente en acción.
                  </p>
                  <a
                    href="https://wa.me/56912345678"
                    className="text-cyan text-sm font-medium mt-2 inline-block hover:underline"
                  >
                    +56 9 1234 5678
                  </a>
                </div>
              </div>

              <div className="glass rounded-xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-cyan/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-400 text-sm">
                    Para propuestas detalladas y documentación.
                  </p>
                  <a
                    href="mailto:agents@metabuildcity.com"
                    className="text-cyan text-sm font-medium mt-2 inline-block hover:underline"
                  >
                    agents@metabuildcity.com
                  </a>
                </div>
              </div>

              <div className="glass rounded-xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-purple" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Agendar Demo</h3>
                  <p className="text-gray-400 text-sm">
                    Reserva 30 minutos y te mostramos la plataforma en vivo.
                  </p>
                  <button className="text-cyan text-sm font-medium mt-2 inline-block hover:underline">
                    Seleccionar horario →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-3">
            <div className="glass-strong rounded-2xl p-8 md:p-10">
              <h2 className="text-xl font-bold mb-6">Solicitar Información</h2>
              <form
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre de tu empresa"
                      className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="tu@empresa.com"
                      className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      placeholder="+56 9 XXXX XXXX"
                      className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Industria
                  </label>
                  <select className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan focus:outline-none transition-colors">
                    <option value="">Selecciona tu industria</option>
                    <option value="inmobiliaria">Inmobiliaria</option>
                    <option value="retail">Retail / E-commerce</option>
                    <option value="servicios">Servicios Profesionales</option>
                    <option value="construccion">Construcción</option>
                    <option value="administracion">
                      Administración de Edificios
                    </option>
                    <option value="salud">Salud</option>
                    <option value="educacion">Educación</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    ¿Qué te gustaría automatizar?
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Cuéntanos sobre tu negocio, volumen de consultas, canales que usas..."
                    className="w-full bg-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Plan de interés
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Starter", "Professional", "Enterprise"].map((plan) => (
                      <label
                        key={plan}
                        className="flex items-center justify-center p-3 border border-white/10 rounded-lg cursor-pointer hover:border-cyan/50 transition-colors text-sm text-center"
                      >
                        <input
                          type="radio"
                          name="plan"
                          value={plan.toLowerCase()}
                          className="sr-only"
                        />
                        {plan}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan hover:bg-cyan-dark text-navy font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 glow-cyan-sm hover:glow-cyan"
                >
                  <Send className="w-5 h-5" />
                  Enviar Solicitud
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Al enviar, aceptas nuestra{" "}
                  <Link href="#" className="text-cyan hover:underline">
                    Política de Privacidad
                  </Link>
                  . Respondemos en menos de 2 horas.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
