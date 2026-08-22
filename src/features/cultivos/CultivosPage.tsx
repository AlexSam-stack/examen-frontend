import { useFarm } from '../../context/FarmContext'

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
            <article key={cultivo.id} className="info-card">
              <div className="card-header-row">
                <h4>{cultivo.nombre}</h4>
                <span className="status-pill">{cultivo.estado}</span>
              </div>
              <p>{cultivo.tipo}</p>
              <ul>
                <li>Terreno: {cultivo.terreno}</li>
                <li>Siembra: {cultivo.fechaSiembra}</li>
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
