import { DashboardPage } from '../features/dashboard/DashboardPage'
import { TerrenosPage } from '../features/terrenos/TerrenosPage'
import { CultivosPage } from '../features/cultivos/CultivosPage'
import { RiegosPage } from '../features/riegos/RiegosPage'
import { BitacoraPage } from '../features/bitacora/BitacoraPage'
import { AnalizadorFotosPage } from '../features/analizadorFotos/AnalizadorFotosPage'
import { AnalizadorTierraPage } from '../features/analizadorTierra/AnalizadorTierraPage'

export const navigationItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'terrenos', label: 'Mis Terrenos' },
  { id: 'cultivos', label: 'Cultivos' },
  { id: 'riegos', label: 'Riegos' },
  { id: 'bitacora', label: 'Bitácora' },
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
    case 'cultivos':
      return <CultivosPage />
    case 'riegos':
      return <RiegosPage />
    case 'bitacora':
      return <BitacoraPage />
    case 'analizador-fotos':
      return <AnalizadorFotosPage />
    case 'analizador-tierra':
      return <AnalizadorTierraPage />
    case 'dashboard':
    default:
      return <DashboardPage />
  }
}
