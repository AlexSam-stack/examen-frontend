import { useFarm } from '../../aplicacion/FarmContext'

export function DashboardPage() {
  const { terrenos, cultivos, riegos, bitacora } = useFarm()

  const activeAlerts = [
    { label: 'Riego programado', value: 'Hoy 18:00', tone: 'warning' },
    { label: 'Cultivo con revisión', value: '3 pendientes', tone: 'danger' },
    { label: 'Suelo disponible', value: '92% saludable', tone: 'success' },
  ]

  return (
    <div className="page-grid">
      <section className="metrics-row">
        <div className="metric-card">
          <span>Total terrenos</span>
          <strong>{terrenos.length}</strong>
          <small>Parcelas activas</small>
        </div>
        <div className="metric-card">
          <span>Cultivos</span>
          <strong>{cultivos.length}</strong>
          <small>Lotes sembrados</small>
        </div>
        <div className="metric-card">
          <span>Riegos</span>
          <strong>{riegos.length}</strong>
          <small>Últimos 30 días</small>
        </div>
        <div className="metric-card">
          <span>Bitácora</span>
          <strong>{bitacora.length}</strong>
          <small>Eventos registrados</small>
        </div>
      </section>

      <section className="content-grid two-columns">
        <div className="panel">
          <div className="panel-header">
            <h3>Alertas activas</h3>
            <button type="button" className="secondary-button">
              Ver todo
            </button>
          </div>
          <ul className="alert-list">
            {activeAlerts.map((alert) => (
              <li key={alert.label} className={`alert-item ${alert.tone}`}>
                <div>
                  <strong>{alert.label}</strong>
                  <span>{alert.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Próximos riegos</h3>
            <button type="button" className="secondary-button">
              Programar
            </button>
          </div>
          <ul className="timeline-list">
            {riegos.map((riego) => (
              <li key={riego.id}>
                <span>{riego.fecha}</span>
                <strong>{riego.terreno}</strong>
                <small>{riego.volumen}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>Resumen de cultivo</h3>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Cultivo</th>
                <th>Terreno</th>
                <th>Fecha siembra</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {cultivos.map((cultivo) => (
                <tr key={cultivo.id}>
                  <td>{cultivo.nombre}</td>
                  <td>{cultivo.terreno}</td>
                  <td>{cultivo.fechaSiembra}</td>
                  <td>
                    <span className="status-pill">{cultivo.estado}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
