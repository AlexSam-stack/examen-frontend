import type { Cultivo } from "../../dominio/farm"

type CultivoCardProps = {
  cultivo: Cultivo
}

export function CultivoCard({ cultivo }: CultivoCardProps) {
  return (
    <article className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-blue-500/50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-slate-100 font-semibold">{cultivo.nombre}</h4>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {cultivo.estado}
        </span>
      </div>
      <p className="text-sm text-slate-400 mb-3">{cultivo.tipo}</p>
      <ul className="space-y-1 text-sm text-slate-300">
        <li>Terreno: <span className="text-slate-200">{cultivo.terreno}</span></li>
        <li>Siembra: <span className="text-slate-200">{cultivo.fechaSiembra}</span></li>
      </ul>
    </article>
  )
}
