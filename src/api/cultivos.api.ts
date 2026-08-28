import type { Cultivo } from '../dominio/farm'

const cultivosMock: Cultivo[] = [
  {
    id: 1,
    nombre: 'Tomate Chonto',
    tipo: 'Hortaliza',
    terreno: 'Lote Norte',
    fechaSiembra: '2026-07-12',
    estado: 'En crecimiento',
  },
  {
    id: 2,
    nombre: 'Maíz híbrido',
    tipo: 'Cereal',
    terreno: 'Parcela Sur',
    fechaSiembra: '2026-06-28',
    estado: 'Listo para cosecha',
  },
]

export async function getCultivos(): Promise<Cultivo[]> {
  return Promise.resolve(cultivosMock)
}

export async function createCultivo(payload: Partial<Cultivo>) {
  return Promise.resolve({ id: Date.now(), ...payload })
}
