import { DashboardPage } from '../features/dashboard/DashboardPage'
import { TerrenosPage } from '../features/terrenos/TerrenosPage'
import { CultivosPage } from '../features/cultivos/CultivosPage'
import { RiegosPage } from '../features/riegos/RiegosPage'
import { BitacoraPage } from '../features/bitacora/BitacoraPage'
import { AnalizadorFotosPage } from '../features/analizadorFotos/AnalizadorFotosPage'
import { AnalizadorTierraPage } from '../features/analizadorTierra/AnalizadorTierraPage'
import { DetalleTerrenoPage } from '../features/terrenos/DetalleTerrenoPage'
import { CatalogoCultivosPage } from '../features/cultivos/CatalogoCultivosPage'
import { EnfermedadesPage } from '../features/enfermedades/EnfermedadesPage'

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
]

type AppRoutesProps = {
  currentPage: string
}

export function AppRoutes({ currentPage }: AppRoutesProps) {
  switch (currentPage) {
    case 'terrenos':
      return <TerrenosPage />
    case 'detalle-terreno':
      return <DetalleTerrenoPage />
    case 'cultivos':
      return <CultivosPage />
    case 'catalogo-cultivos':
      return <CatalogoCultivosPage />
    case 'riegos':
      return <RiegosPage />
    case 'bitacora':
      return <BitacoraPage />
    case 'enfermedades':
      return <EnfermedadesPage />
    case 'analizador-fotos':
      return <AnalizadorFotosPage />
    case 'analizador-tierra':
      return <AnalizadorTierraPage />
    case 'dashboard':
    default:
      return <DashboardPage />
  }
}
