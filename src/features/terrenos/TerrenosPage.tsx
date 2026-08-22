import { useFarm } from '../../context/FarmContext'

export function TerrenosPage() {
  const { terrenos } = useFarm()

  return (
    <div className="page-grid">
      <section className="panel">
        <div className="panel-header">
          <h3>Mis terrenos</h3>
          <button type="button" className="primary-button small">
            Nuevo terreno
          </button>
        </div>

        <div className="card-grid">
          {terrenos.map((terreno) => (
            <article key={terreno.id} className="info-card">
              <div className="card-header-row">
                <h4>{terreno.nombre}</h4>
                <span className="status-pill">{terreno.estado}</span>
              </div>
              <p>{terreno.ubicacion}</p>
              <ul>
                <li>{terreno.hectareas} ha</li>
                <li>{terreno.tipoSuelo}</li>
              </ul>
              <button type="button" className="secondary-button">
                Ver detalle
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
