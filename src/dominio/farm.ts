

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


export interface Usuario {
  id: number;
  nombre : string;
  email: string;
  token: string;
  expiraEn: number
  role?: string
  finca?: string
  perfil?: string
}

export interface Usuario2{
  nombre : string;
  email: string;
  role?: string
  finca?: string
}