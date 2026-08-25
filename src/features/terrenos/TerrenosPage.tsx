import { TerrenoCard } from './components/TerrenoCard'
import { useTerrenos } from './hooks/useTerrenos'

export function TerrenosPage() {
  const { terrenos, totalHectareas } = useTerrenos()

  return (
    <div className="page-grid">
      <section className="panel">
        <div className="panel-header">
          <h3>Mis terrenos</h3>
          <button type="button" className="primary-button small">
            Nuevo terreno
          </button>
        </div>

        <div className="metrics-row">
          <div className="metric-card">
            <span>Parcelas</span>
            <strong>{terrenos.length}</strong>
            <small>Activas</small>
          </div>
          <div className="metric-card">
            <span>Hectáreas</span>
            <strong>{totalHectareas.toFixed(1)}</strong>
            <small>Total</small>
          </div>
        </div>

        <div className="card-grid">
          {terrenos.map((terreno) => (
            <TerrenoCard key={terreno.id} terreno={terreno} />
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Vista general</p>
            <h3>Ubicación de parcelas</h3>
          </div>
          <span className="map-status">Mapa operativo</span>
        </div>
        <div className="farm-map" aria-label="Mapa de parcelas de la finca">
          {terrenos.map((terreno, index) => (
            <div
              className={`map-marker marker-${index + 1}`}
              key={terreno.id}
              title={`${terreno.nombre}: ${terreno.ubicacion}`}
            >
              <span>{index + 1}</span>
              <strong>{terreno.nombre}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
