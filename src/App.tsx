import { Route, Routes } from 'react-router-dom'
import LayoutPrueba from './ui/layout/LayoutPrueba'
import { RutaProtegida } from './ui/components/RutaProtegida'
import { AnalizadorFotosPage } from './ui/pages/AnalizadorFotosPage'
import { AnalizadorTierraPage } from './ui/pages/AnalizadorTierraPage'
import { BitacoraPage } from './ui/pages/BitacoraPage'
import { CatalogoCultivosPage } from './ui/pages/CatalogoCultivosPage'
import { CultivosPage } from './ui/pages/CultivosPage'
import { DashboardPage } from './ui/pages/DashboardPage'
import { EnfermedadesPage } from './ui/pages/EnfermedadesPage'
import { RiegosPage } from './ui/pages/RiegosPage'
import NoEncontrada from './ui/pages/NoEncontrada'
import Login from './ui/pages/Login'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<RutaProtegida />}>
        <Route element={<LayoutPrueba />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/bitacora" element={<BitacoraPage />} />
          <Route path="/catalogo" element={<CatalogoCultivosPage />} />
          <Route path="/cultivos" element={<CultivosPage />} />
          <Route path="/enfermedades" element={<EnfermedadesPage />} />
          <Route path="/riego" element={<RiegosPage />} />
          <Route path="/analizadorFotos" element={<AnalizadorFotosPage />} />
          <Route path="/analizadorTierra" element={<AnalizadorTierraPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NoEncontrada />} />
    </Routes>
  )
}