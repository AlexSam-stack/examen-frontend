
import { useFarm } from '../../aplicacion/FarmContext'

export function BitacoraPage() {
  const { bitacora } = useFarm()

  return (
    <div className="flex flex-col gap-6">
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-100">Bitácora</h3>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            Agregar evento
          </button>
        </div>

        <ul className="relative border-l border-slate-800 pl-6 space-y-6">
          {bitacora.map((entry) => (
            <li key={entry.id} className="relative">
              <span className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="block text-xs text-slate-500">{entry.fecha}</span>
              <strong className="block text-slate-100 font-medium">{entry.tipo}</strong>
              <small className="text-slate-400">
                {entry.terreno} · {entry.detalle}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}