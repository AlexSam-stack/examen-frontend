import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { SesionProvider } from './aplicacion/SesionContext'
import { FavoritosProvider } from './aplicacion/FavoritoContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SesionProvider>
        <FavoritosProvider>
          <App />
        </FavoritosProvider>
      </SesionProvider>
    </BrowserRouter>
  </StrictMode>,
)