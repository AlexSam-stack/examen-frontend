//import { useFarm } from '../../aplicacion/FarmContext'

export function DashboardPage() {
  //const { terrenos, cultivos, riegos, bitacora } = useFarm()

  const activeAlerts = [
    { label: 'Riego programado', value: 'Hoy 18:00', tone: 'warning' },
    { label: 'Cultivo con revisión', value: '3 pendientes', tone: 'danger' },
    { label: 'Suelo disponible', value: '92% saludable', tone: 'success' },
  ]

  const toneStyles: Record<string, string> = {
    warning: 'border-amber-500/30 bg-amber-500/10',
    danger: 'border-red-500/30 bg-red-500/10',
    success: 'border-emerald-500/30 bg-emerald-500/10',
  }

  const toneDot: Record<string, string> = {
    warning: 'bg-amber-400',
    danger: 'bg-red-400',
    success: 'bg-emerald-400',
  }

  return (
   /* <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-1">
          <span className="text-xs text-slate-500">Total terrenos</span>
          <strong className="text-2xl font-bold text-slate-100">{terrenos.length}</strong>
          <small className="text-xs text-slate-500">Parcelas activas</small>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-1">
          <span className="text-xs text-slate-500">Cultivos</span>
          <strong className="text-2xl font-bold text-slate-100">{cultivos.length}</strong>
          <small className="text-xs text-slate-500">Lotes sembrados</small>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-1">
          <span className="text-xs text-slate-500">Riegos</span>
          <strong className="text-2xl font-bold text-slate-100">{riegos.length}</strong>
          <small className="text-xs text-slate-500">Últimos 30 días</small>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-1">
          <span className="text-xs text-slate-500">Bitácora</span>
          <strong className="text-2xl font-bold text-slate-100">{bitacora.length}</strong>
          <small className="text-xs text-slate-500">Eventos registrados</small>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-100">Alertas activas</h3>
            <button
              type="button"
              className="border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
            >
              Ver todo
            </button>
          </div>
          <ul className="flex flex-col gap-2">
            {activeAlerts.map((alert) => (
              <li
                key={alert.label}
                className={`rounded-lg border px-4 py-3 flex items-center gap-3 ${toneStyles[alert.tone]}`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${toneDot[alert.tone]}`} />
                <div className="flex flex-col">
                  <strong className="text-sm text-slate-100">{alert.label}</strong>
                  <span className="text-xs text-slate-400">{alert.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-100">Próximos riegos</h3>
            <button
              type="button"
              className="border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
            >
              Programar
            </button>
          </div>
          <ul className="relative border-l border-slate-800 pl-6 space-y-5">
            {riegos.map((riego) => (
              <li key={riego.id} className="relative">
                <span className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="block text-xs text-slate-500">{riego.fecha}</span>
                <strong className="block text-slate-100 font-medium">{riego.terreno}</strong>
                <small className="text-slate-400">{riego.volumen}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-100">Resumen de cultivo</h3>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-950 text-slate-400 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-4 py-3">Cultivo</th>
                <th className="px-4 py-3">Terreno</th>
                <th className="px-4 py-3">Fecha siembra</th>
                <th className="px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {cultivos.map((cultivo) => (
                <tr key={cultivo.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3 text-slate-200 font-medium">{cultivo.nombre}</td>
                  <td className="px-4 py-3 text-slate-300">{cultivo.terreno}</td>
                  <td className="px-4 py-3 text-slate-300">{cultivo.fechaSiembra}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {cultivo.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )*/
 <h1> prueba qeweew</h1>)
}