import type { Terreno } from '../dominio/Tipos'

const terrenosMock: Terreno[] = [
  {
    id: 1,
    nombre: 'Lote Norte',
    ubicacion: 'Lat 6.233, Lng -75.568',
    hectareas: 6.2,
    tipoSuelo: 'Franco arcilloso',
    estado: 'Activo',
  },
  {
    id: 2,
    nombre: 'Parcela Sur',
    ubicacion: 'Lat 6.229, Lng -75.572',
    hectareas: 4.9,
    tipoSuelo: 'Limo arenoso',
    estado: 'En revisión',
  },
]

export async function getTerrenos(): Promise<Terreno[]> {
  return Promise.resolve(terrenosMock)
}

export async function createTerreno(payload: Partial<Terreno>) {
  return Promise.resolve({
    id: Date.now(),
    ...payload,
  })
}
