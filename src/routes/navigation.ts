export const navigationItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'terrenos', label: 'Mis Terrenos' },
  { id: 'detalle-terreno', label: 'Detalle de terreno' },
  { id: 'cultivos', label: 'Cultivos' },
  { id: 'catalogo-cultivos', label: 'Catálogo de cultivos' },
  { id: 'riegos', label: 'Riegos' },
  { id: 'bitacora', label: 'Bitácora' },
  { id: 'enfermedades', label: 'Enfermedades' },
  { id: 'analizador-fotos', label: 'Analizador de fotos' },
  { id: 'analizador-tierra', label: 'Analizador de tierra' },
] as const

export type PageId = (typeof navigationItems)[number]['id']
