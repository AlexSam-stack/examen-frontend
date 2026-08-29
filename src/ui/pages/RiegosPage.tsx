import { useFarm } from '../../aplicacion/FarmContext'
import { RiegoTable } from '../components/RiegoTable'

export function RiegosPage() {
  const { riegos } = useFarm()

  return (
    <div className="flex flex-col gap-6">
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-100">Registro de riegos</h3>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            Registrar riego
          </button>
        </div>

        <RiegoTable riegos={riegos} />
      </section>
    </div>
  )
}