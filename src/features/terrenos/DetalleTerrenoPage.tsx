import { useFarm } from '../../context/FarmContext'

type DetalleTerrenoPageProps = {
  terrenoId?: number
}

export function DetalleTerrenoPage({ terrenoId = 1 }: DetalleTerrenoPageProps) {
  const { terrenos, cultivos, bitacora } = useFarm()
  const terreno = terrenos.find((item) => item.id === terrenoId) ?? terrenos[0]

  if (!terreno) {
    return <section className="panel">No hay terrenos registrados.</section>
  }

  const cultivosDelTerreno = cultivos.filter((cultivo) => cultivo.terreno === terreno.nombre)
  const eventosDelTerreno = bitacora.filter((evento) => evento.terreno === terreno.nombre)

  return (
    <div className="page-grid">
      <section className="detail-hero">
        <div>
          <p className="eyebrow">Detalle de terreno</p>
          <h2>{terreno.nombre}</h2>
          <p>{terreno.ubicacion}</p>
        </div>
        <span className="status-pill">{terreno.estado}</span>
      </section>

      <section className="content-grid two-columns">
        <div className="panel">
          <div className="panel-header">
            <h3>Ficha de parcela</h3>
            <button type="button" className="secondary-button">Editar</button>
          </div>
          <dl className="detail-list">
            <div><dt>Superficie</dt><dd>{terreno.hectareas} ha</dd></div>
            <div><dt>Tipo de suelo</dt><dd>{terreno.tipoSuelo}</dd></div>
            <div><dt>Ubicación</dt><dd>{terreno.ubicacion}</dd></div>
          </dl>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Ubicación</h3>
          </div>
          <div className="map-preview" aria-label={`Mapa de ${terreno.nombre}`}>
            <span className="map-pin">+</span>
            <strong>{terreno.nombre}</strong>
            <small>{terreno.ubicacion}</small>
          </div>
        </div>
      </section>

      <section className="content-grid two-columns">
        <div className="panel">
          <div className="panel-header"><h3>Cultivos asociados</h3></div>
          {cultivosDelTerreno.length > 0 ? (
            <ul className="compact-list">
              {cultivosDelTerreno.map((cultivo) => (
                <li key={cultivo.id}><strong>{cultivo.nombre}</strong><span>{cultivo.estado}</span></li>
              ))}
            </ul>
          ) : <p className="empty-state">No hay cultivos asociados.</p>}
        </div>

        <div className="panel">
          <div className="panel-header"><h3>Historial reciente</h3></div>
          {eventosDelTerreno.length > 0 ? (
            <ul className="compact-list">
              {eventosDelTerreno.map((evento) => (
                <li key={evento.id}><strong>{evento.tipo}</strong><span>{evento.fecha} · {evento.detalle}</span></li>
              ))}
            </ul>
          ) : <p className="empty-state">No hay eventos registrados.</p>}
        </div>
      </section>
    </div>
  )
}
