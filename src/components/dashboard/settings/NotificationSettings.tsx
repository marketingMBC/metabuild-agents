'use client';

const notifications = [
  { label: 'Nueva conversación', description: 'Cuando un nuevo contacto inicia una conversación', email: true, push: true },
  { label: 'Escalación a humano', description: 'Cuando un agente escala una conversación al equipo', email: true, push: true },
  { label: 'Lead caliente', description: 'Cuando un lead alcanza score alto (>80)', email: true, push: false },
  { label: 'Error de agente', description: 'Cuando un agente tiene problemas de conexión', email: true, push: true },
  { label: 'Reporte diario', description: 'Resumen de actividad del día anterior', email: true, push: false },
  { label: 'Facturación', description: 'Recordatorios de pago y facturas', email: true, push: false },
];

export default function NotificationSettings() {
  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <h3 className="text-sm font-semibold text-white mb-1">Preferencias de notificación</h3>
      <p className="text-xs text-white/40 mb-4">Configura cómo y cuándo recibir notificaciones</p>

      <table className="w-full">
        <thead>
          <tr className="text-[11px] text-white/30 uppercase tracking-wider border-b border-white/5">
            <th className="text-left pb-3 font-medium">Notificación</th>
            <th className="text-center pb-3 font-medium">Email</th>
            <th className="text-center pb-3 font-medium">Push</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notif) => (
            <tr key={notif.label} className="border-b border-white/5">
              <td className="py-3">
                <p className="text-sm text-white/80">{notif.label}</p>
                <p className="text-[11px] text-white/30">{notif.description}</p>
              </td>
              <td className="text-center py-3">
                <input
                  type="checkbox"
                  defaultChecked={notif.email}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan accent-cyan-dark"
                />
              </td>
              <td className="text-center py-3">
                <input
                  type="checkbox"
                  defaultChecked={notif.push}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan accent-cyan-dark"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
