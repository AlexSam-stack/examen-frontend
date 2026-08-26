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
import type { PageId } from './navigation'

type AppRoutesProps = {
  currentPage: PageId
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
