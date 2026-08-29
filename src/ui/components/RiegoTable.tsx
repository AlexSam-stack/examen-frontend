import type { Riego } from "../../dominio/farm"

type RiegoTableProps = {
  riegos: Riego[]
}

export function RiegoTable({ riegos }: RiegoTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-900 text-slate-400 uppercase text-xs tracking-wide">
          <tr>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Terreno</th>
            <th className="px-4 py-3">Volumen</th>
            <th className="px-4 py-3">Método</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {riegos.map((riego) => (
            <tr key={riego.id} className="hover:bg-slate-900/60 transition-colors">
              <td className="px-4 py-3 text-slate-300">{riego.fecha}</td>
              <td className="px-4 py-3 text-slate-300">{riego.terreno}</td>
              <td className="px-4 py-3 text-slate-300">{riego.volumen}</td>
              <td className="px-4 py-3 text-slate-300">{riego.metodo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}