import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AgentScore v2.0 | Evalua tu Chatbot con Estandares de Industria - MetaBuild Agents',
  description:
    'Herramienta gratuita para evaluar chatbots y agentes de IA en 6 dimensiones: calidad de respuesta, efectividad operacional, experiencia de usuario, velocidad, seguridad y deteccion. Basado en RAGAS, DeepEval e IEEE 3128.',
  keywords:
    'chatbot scoring, evaluacion chatbot, agente IA, calidad chatbot, test chatbot, chatbot grader, agent scorecard, RAGAS, DeepEval, benchmark chatbot, KPI chatbot',
  openGraph: {
    title: 'AgentScore v2.0 | ¿Tu chatbot realmente funciona?',
    description:
      'Evalua tu agente de IA en 6 dimensiones con metricas de la industria. Score de 0 a 100, benchmarks y recomendaciones accionables. Gratis.',
    type: 'website',
  },
};

export default function ScoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-theme="score" style={{ background: '#fafbfe', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
