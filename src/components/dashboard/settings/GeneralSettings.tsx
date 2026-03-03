'use client';

export default function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-surface p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white">Información de la empresa</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Nombre de la empresa</label>
            <input
              type="text"
              defaultValue="MetaBuild Agents"
              className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-sm text-white outline-none focus:border-cyan/40"
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Sitio web</label>
            <input
              type="text"
              defaultValue="https://metabuild.cl"
              className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-sm text-white outline-none focus:border-cyan/40"
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Email de contacto</label>
            <input
              type="email"
              defaultValue="contacto@metabuild.cl"
              className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-sm text-white outline-none focus:border-cyan/40"
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Zona horaria</label>
            <select className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-sm text-white outline-none focus:border-cyan/40">
              <option value="America/Santiago">America/Santiago (GMT-3)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-surface p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white">Preferencias</h3>
        <div className="space-y-3">
          {[
            { label: 'Notificaciones por email', description: 'Recibir resumen diario de actividad', defaultChecked: true },
            { label: 'Modo oscuro', description: 'Siempre activo en el dashboard', defaultChecked: true },
            { label: 'Sonidos de notificación', description: 'Reproducir sonido al recibir mensaje nuevo', defaultChecked: false },
          ].map((pref) => (
            <div key={pref.label} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm text-white/80">{pref.label}</p>
                <p className="text-xs text-white/30">{pref.description}</p>
              </div>
              <button
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  pref.defaultChecked ? 'bg-cyan/30' : 'bg-white/10'
                }`}
              >
                <span
                  className="absolute top-0.5 w-4 h-4 rounded-full transition-all"
                  style={{
                    left: pref.defaultChecked ? '22px' : '2px',
                    backgroundColor: pref.defaultChecked ? '#29F8D4' : 'rgba(255,255,255,0.4)',
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-5 py-2.5 text-sm font-medium rounded-lg bg-cyan text-navy hover:bg-cyan-light transition-colors">
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
