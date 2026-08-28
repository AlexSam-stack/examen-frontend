import { useFarm } from '../../aplicacion/FarmContext'
import { CultivoCard } from '../components/CultivoCard'

export function CultivosPage() {
  const { cultivos } = useFarm()

  return (
    <div className="page-grid">
      <section className="panel">
        <div className="panel-header">
          <h3>Cultivos</h3>
          <button type="button" className="primary-button small">
            Agregar cultivo
          </button>
        </div>

        <div className="card-grid">
          {cultivos.map((cultivo) => (
            <CultivoCard key={cultivo.id} cultivo={cultivo} />
          ))}
        </div>
      </section>
    </div>
  )
}
