import { Link } from "react-router-dom";
import type { Terreno } from "../../dominio/Tipos"

type TerrenoCardProps = {
  terreno: Terreno
}

export function TerrenoCard({ terreno }: TerrenoCardProps) {
  return (
    <article className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-blue-500/50 transition-colors flex-1">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-slate-100 font-semibold">{terreno.nombre}</h4>
        {terreno.tipoSuelo && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {terreno.tipoSuelo}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-400 mb-3">
        {terreno.ubicacion ?? "Sin ubicación"}
      </p>
      <ul className="space-y-1 text-sm text-slate-300 mb-4">
        {terreno.areaHectareas != null && (
          <li>{terreno.areaHectareas} ha</li>
        )}
        {terreno.latitud != null && terreno.longitud != null && (
          <li className="text-slate-500 text-xs">
            {terreno.latitud.toFixed(4)}, {terreno.longitud.toFixed(4)}
          </li>
        )}
      </ul>
      <Link
        to={`/terrenos/${terreno.id}/cultivos`}
        className="block w-full text-center border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
      >
        Ver cultivos
      </Link>
    </article>
  )
}