import type { Terreno } from '../../../context/FarmContext'

type TerrenoCardProps = {
  terreno: Terreno
}

export function TerrenoCard({ terreno }: TerrenoCardProps) {
  return (
    <article className="info-card">
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
  )
}
