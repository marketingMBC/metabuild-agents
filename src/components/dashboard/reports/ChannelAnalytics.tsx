'use client';

import { CHANNEL_CONFIGS } from '@/lib/constants';

const CHANNEL_METRICS = [
  { id: 'whatsapp', conversations: 3420, responseTime: '18s', satisfaction: 95.2, conversion: 28.5 },
  { id: 'instagram', conversations: 1560, responseTime: '32s', satisfaction: 91.8, conversion: 22.1 },
  { id: 'email', conversations: 1120, responseTime: '2m 15s', satisfaction: 93.5, conversion: 18.4 },
  { id: 'web', conversations: 890, responseTime: '12s', satisfaction: 96.1, conversion: 31.2 },
  { id: 'facebook', conversations: 340, responseTime: '45s', satisfaction: 89.3, conversion: 15.7 },
];

export default function ChannelAnalytics() {
  return (
    <div className="rounded-xl border border-white/10 bg-surface overflow-hidden">
      <div className="px-5 py-4 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white">Analytics por Canal</h3>
        <p className="text-xs text-white/40 mt-0.5">Rendimiento comparativo de cada canal</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-5 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Canal</th>
              <th className="text-right px-5 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Conversaciones</th>
              <th className="text-right px-5 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Tiempo Resp.</th>
              <th className="text-right px-5 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Satisfacción</th>
              <th className="text-right px-5 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Conversión</th>
            </tr>
          </thead>
          <tbody>
            {CHANNEL_METRICS.map((ch) => {
              const config = CHANNEL_CONFIGS.find((c) => c.id === ch.id);
              return (
                <tr key={ch.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config?.color }} />
                      <span className="text-sm text-white">{config?.label}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right text-sm text-white/70">{ch.conversations.toLocaleString('es-CL')}</td>
                  <td className="px-5 py-3 text-right text-sm text-white/70">{ch.responseTime}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`text-sm ${ch.satisfaction >= 95 ? 'text-green-400' : ch.satisfaction >= 90 ? 'text-cyan' : 'text-amber-400'}`}>
                      {ch.satisfaction}%
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right text-sm text-white/70">{ch.conversion}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
