import type { Bitacora, Cultivo, Farm, Riego, Terreno, UserProfile } from '../types/farm'

export const defaultUser: UserProfile = {
  name: 'María López',
  email: 'maria@fincaloslaureles.com',
  role: 'Administrador de finca',
  finca: 'Los Laureles',
}

export const defaultFarm: Farm = {
  nombre: 'Los Laureles',
  ubicacion: 'Vereda El Rosal, Antioquia',
  hectareas: 18.4,
}

export const defaultTerrenos: Terreno[] = [
  { id: 1, nombre: 'Lote Norte', ubicacion: 'Lat 6.233, Lng -75.568', hectareas: 6.2, tipoSuelo: 'Franco arcilloso', estado: 'Activo' },
  { id: 2, nombre: 'Parcela Sur', ubicacion: 'Lat 6.229, Lng -75.572', hectareas: 4.9, tipoSuelo: 'Limo arenoso', estado: 'En revisión' },
  { id: 3, nombre: 'Huerta Central', ubicacion: 'Lat 6.236, Lng -75.564', hectareas: 3.3, tipoSuelo: 'Arcilloso', estado: 'Activo' },
]

export const defaultCultivos: Cultivo[] = [
  { id: 1, nombre: 'Tomate Chonto', tipo: 'Hortaliza', terreno: 'Lote Norte', fechaSiembra: '2026-07-12', estado: 'En crecimiento' },
  { id: 2, nombre: 'Maíz híbrido', tipo: 'Cereal', terreno: 'Parcela Sur', fechaSiembra: '2026-06-28', estado: 'Listo para cosecha' },
  { id: 3, nombre: 'Pimentón', tipo: 'Hortaliza', terreno: 'Huerta Central', fechaSiembra: '2026-08-03', estado: 'Necesita revisión' },
]

export const defaultRiegos: Riego[] = [
  { id: 1, fecha: '2026-08-20', terreno: 'Lote Norte', volumen: '1.800 L', metodo: 'Goteo' },
  { id: 2, fecha: '2026-08-18', terreno: 'Parcela Sur', volumen: '1.200 L', metodo: 'Aspersión' },
  { id: 3, fecha: '2026-08-17', terreno: 'Huerta Central', volumen: '950 L', metodo: 'Microaspersión' },
]

export const defaultBitacora: Bitacora[] = [
  { id: 1, fecha: '2026-08-19', terreno: 'Lote Norte', tipo: 'Riego', detalle: 'Se ajustó programación por alta temperatura' },
  { id: 2, fecha: '2026-08-18', terreno: 'Parcela Sur', tipo: 'Abono', detalle: 'Aplicación de nitrógeno en franja' },
  { id: 3, fecha: '2026-08-15', terreno: 'Huerta Central', tipo: 'Riego', detalle: 'Riego de mantenimiento en tarde de lluvia' },
]
