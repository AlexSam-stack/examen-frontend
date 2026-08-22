import { useFarm } from '../../context/FarmContext'

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

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Terreno</th>
                <th>Volumen</th>
                <th>Método</th>
              </tr>
            </thead>
            <tbody>
              {riegos.map((riego) => (
                <tr key={riego.id}>
                  <td>{riego.fecha}</td>
                  <td>{riego.terreno}</td>
                  <td>{riego.volumen}</td>
                  <td>{riego.metodo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
