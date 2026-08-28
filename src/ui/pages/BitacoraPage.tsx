import { useFarm } from '../../aplicacion/FarmContext'

export function BitacoraPage() {
  const { bitacora } = useFarm()

  return (
    <div className="page-grid">
      <section className="panel">
        <div className="panel-header">
          <h3>Bitácora</h3>
          <button type="button" className="primary-button small">
            Agregar evento
          </button>
        </div>

        <ul className="timeline-list vertical">
          {bitacora.map((entry) => (
            <li key={entry.id}>
              <span>{entry.fecha}</span>
              <strong>{entry.tipo}</strong>
              <small>
                {entry.terreno} · {entry.detalle}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
