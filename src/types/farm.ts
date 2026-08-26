export type UserProfile = {
  name: string
  email: string
  role: string
  finca: string
}

export type Farm = {
  nombre: string
  ubicacion: string
  hectareas: number
}

export type Terreno = {
  id: number
  nombre: string
  ubicacion: string
  hectareas: number
  tipoSuelo: string
  estado: 'Activo' | 'En revisión' | 'Inactivo'
}

export type Cultivo = {
  id: number
  nombre: string
  tipo: string
  terreno: string
  fechaSiembra: string
  estado: 'En crecimiento' | 'Listo para cosecha' | 'Necesita revisión'
}

export type Riego = {
  id: number
  fecha: string
  terreno: string
  volumen: string
  metodo: string
}

export type Bitacora = {
  id: number
  fecha: string
  terreno: string
  tipo: 'Riego' | 'Abono'
  detalle: string
}
