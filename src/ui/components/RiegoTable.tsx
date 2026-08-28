import type { Riego } from "../../dominio/farm"


type RiegoTableProps = {
  riegos: Riego[]
}

export function RiegoTable({ riegos }: RiegoTableProps) {
  return (
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
  )
}
