'use client';

import Link from 'next/link';

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.39v-1.2h-2.5v8.5h2.5v-4.34c0-.77.62-1.4 1.4-1.4a1.4 1.4 0 0 1 1.4 1.4v4.34h2.5M6.5 8.31a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M8 19.5h-3v-8.5h3v8.5z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2m-.3 2c-2.1 0-3.5 1.4-3.5 3.5v8.4c0 2.1 1.4 3.5 3.5 3.5h8.4c2.1 0 3.5-1.4 3.5-3.5V7.5c0-2.1-1.4-3.5-3.5-3.5H7.5m9.6 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m-5.1 1.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9m0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-0.25 11-4-2.25 1-4.75 1.25-7.25 0.5 2-3.5 5.5-5.5 9.5-5.5z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#000031] border-t border-cyan-400/10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: MetaBuild Agents */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">MetaBuild Agents</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Plataforma SaaS de agentes de IA multicanal. Potenciado por Claude de Anthropic.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-900 border border-cyan-400/20 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-200 hover:shadow-lg shadow-cyan-500/20"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-900 border border-cyan-400/20 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-200 hover:shadow-lg shadow-cyan-500/20"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-900 border border-cyan-400/20 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-200 hover:shadow-lg shadow-cyan-500/20"
                aria-label="Twitter/X"
              >
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Plataforma */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
              Plataforma
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  Agentes WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  Agentes RRSS
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  Email Marketing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  Dashboard Integrado
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  Automatizaciones
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  Integraciones
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Empresa */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
              Empresa
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://metabuildcity.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  Casos de Éxito
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  Documentación
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  API
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  Status
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  Términos de Servicio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  Cookies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  SLA
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cyan-400/10" />

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-gray-400">
          <div>
            © {currentYear} MetaBuild Agents — Una empresa de{' '}
            <a
              href="https://metabuildcity.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              Meta Build City
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span>Santiago, Chile</span>
            <span>🇨🇱</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
