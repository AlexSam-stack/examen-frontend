
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutPrueba from './ui/layout/LayoutPrueba'
import { AnalizadorFotosPage } from './ui/pages/AnalizadorFotosPage'
import { AnalizadorTierraPage } from './ui/pages/AnalizadorTierraPage'
import { BitacoraPage } from './ui/pages/BitacoraPage'
import { CatalogoCultivosPage } from './ui/pages/CatalogoCultivosPage'
import { CultivosPage } from './ui/pages/CultivosPage'
import { DashboardPage } from './ui/pages/DashboardPage'
import { EnfermedadesPage } from './ui/pages/EnfermedadesPage'
import { RiegosPage } from './ui/pages/RiegosPage'
import AuthPage from './ui/pages/AuthPage'
import NoEncontrada from './ui/pages/NoEncontrada'

export default function App() {
  return (
    <Routes>
    <Route element={<LayoutPrueba/>}>
      <Route path='/analizadorFotos' element={<AnalizadorFotosPage/>}/>
      <Route path='/login' element={<AuthPage/>}/>
      <Route path='/analizadorTierra' element={<AnalizadorTierraPage/>}/>
      <Route path='/bitacora' element={<BitacoraPage/>}/>
      <Route path='/catalogo' element={<CatalogoCultivosPage/>}/>
      <Route path='/cultivos' element={<CultivosPage/>}/>
      <Route path='/' element={<DashboardPage/>}/>
      <Route path='/enfermedades' element={<EnfermedadesPage/>}/>
      <Route path='/riego' element={<RiegosPage/>}/>
    </Route>
    <Route path='*' element={<NoEncontrada></NoEncontrada>}/>
    </Routes>
  )
}
