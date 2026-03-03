'use client';

import Link from 'next/link';

interface IntegrationBadgeProps {
  name: string;
}

interface IntegrationCategory {
  title: string;
  integrations: string[];
}

const IntegrationBadge = ({ name }: IntegrationBadgeProps) => {
  return (
    <div className="group relative inline-block">
      <div className="absolute inset-0 rounded-full bg-cyan-400/20 opacity-0 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium backdrop-blur-md hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-400/30">
        {name}
      </div>
    </div>
  );
};

const IntegrationCategory = ({
  title,
  integrations,
}: IntegrationCategory) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider px-2">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2 px-2">
        {integrations.map((integration) => (
          <IntegrationBadge key={integration} name={integration} />
        ))}
      </div>
    </div>
  );
};

const Integrations = () => {
  const categories: IntegrationCategory[] = [
    {
      title: 'Canales de Comunicación',
      integrations: [
        'WhatsApp Business',
        'Instagram DM',
        'Facebook Messenger',
        'Email (SMTP)',
        'Web Chat',
        'Telegram',
        'SMS',
      ],
    },
    {
      title: 'CRM & Ventas',
      integrations: ['HubSpot', 'Salesforce', 'Pipedrive', 'Monday.com'],
    },
    {
      title: 'Automatización & Productividad',
      integrations: ['Zapier', 'n8n', 'Make (Integromat)', 'Slack', 'Notion', 'Google Sheets', 'Calendly'],
    },
    {
      title: 'Productividad',
      integrations: ['Google Calendar', 'Microsoft Teams'],
    },
    {
      title: 'E-commerce',
      integrations: ['Shopify', 'WooCommerce', 'MercadoLibre'],
    },
    {
      title: 'Pagos',
      integrations: ['Stripe', 'MercadoPago', 'Transbank'],
    },
  ];

  return (
    <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Se Integra con{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent">
              Todo
            </span>{' '}
            tu Ecosistema
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Conecta con las herramientas que ya usas. Soportamos 30+ integraciones
            y contamos.
          </p>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => (
            <div
              key={category.title}
              className="p-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all duration-300"
            >
              <IntegrationCategory
                title={category.title}
                integrations={category.integrations}
              />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center py-8 border-t border-white/10">
          <p className="text-slate-300 text-sm sm:text-base">
            ¿No ves tu herramienta?{' '}
            <Link
              href="/contact"
              className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-300 underline underline-offset-2"
            >
              Contáctanos
            </Link>
            {' — si tiene API, la conectamos.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
