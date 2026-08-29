import { useFarm } from '../../aplicacion/FarmContext'
import { CultivoCard } from '../components/CultivoCard'

export function CultivosPage() {
  const { cultivos } = useFarm()

  return (
    <div className="flex flex-col gap-6">
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-100">Cultivos</h3>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            Agregar cultivo
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cultivos.map((cultivo) => (
            <CultivoCard key={cultivo.id} cultivo={cultivo} />
          ))}
        </div>
      </section>
    </div>
  )
}