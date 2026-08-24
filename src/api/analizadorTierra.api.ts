export type AnalisisTierraResult = {
  ph: number
  nitrogeno: number
  fosforo: number
  potasio: number
  recomendacion: string
}

export async function analizarTierra(_payload: Record<string, unknown>): Promise<AnalisisTierraResult> {
  return Promise.resolve({
    ph: 6.4,
    nitrogeno: 72,
    fosforo: 49,
    potasio: 58,
    recomendacion: 'Aplicar abono nitrogenado en banda y ajustar pH con cal agrícola.',
  })
}
