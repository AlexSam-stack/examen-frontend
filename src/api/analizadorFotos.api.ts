export type DiagnosticoFoto = {
  nombre: string
  confianza: number
  recomendacion: string
  sintomas: string[]
}

export async function analizarFoto(_fileName: string): Promise<DiagnosticoFoto> {
  return Promise.resolve({
    nombre: 'Mildiu en hoja',
    confianza: 91,
    recomendacion: 'Reducir humedad ambiental y aplicar tratamiento preventivo en las hojas afectadas.',
    sintomas: ['Manchas amarillentas', 'Punteado irregular', 'Hojas con clorosis'],
  })
}
