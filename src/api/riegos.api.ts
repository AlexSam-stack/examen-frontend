export type RiegoSummary = {
  id: number
  fecha: string
  terreno: string
  volumen: string
  metodo: string
}

const riegosMock: RiegoSummary[] = [
  { id: 1, fecha: '2026-08-20', terreno: 'Lote Norte', volumen: '1.800 L', metodo: 'Goteo' },
  { id: 2, fecha: '2026-08-18', terreno: 'Parcela Sur', volumen: '1.200 L', metodo: 'Aspersión' },
]

export async function getRiegos(): Promise<RiegoSummary[]> {
  return Promise.resolve(riegosMock)
}

export async function createRiego(payload: Partial<RiegoSummary>) {
  return Promise.resolve({ id: Date.now(), ...payload })
}
