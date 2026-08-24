import type { Cultivo } from '../../../context/FarmContext'

type CultivoCardProps = {
  cultivo: Cultivo
}

export function CultivoCard({ cultivo }: CultivoCardProps) {
  return (
    <article className="info-card">
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
  )
}
