import { useFarm } from '../../aplicacion/FarmContext'
import { RiegoTable } from '../components/RiegoTable'

export function RiegosPage() {
  const { riegos } = useFarm()

  return (
    <div className="page-grid">
      <section className="panel">
        <div className="panel-header">
          <h3>Registro de riegos</h3>
          <button type="button" className="primary-button small">
            Registrar riego
          </button>
        </div>

        <RiegoTable riegos={riegos} />
      </section>
    </div>
  )
}
