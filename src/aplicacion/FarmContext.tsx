import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { defaultBitacora, defaultCultivos, defaultFarm, defaultRiegos, defaultTerrenos, defaultUser } from '../infraestructura/farmData'
import type { Bitacora, Cultivo, Farm, Riego, Terreno, Usuario2 } from '../dominio/Tipos'

type FarmContextValue = {
  user: Usuario2
  farm: Farm
  terrenos: Terreno[]
  cultivos: Cultivo[]
  riegos: Riego[]
  bitacora: Bitacora[]
  isAuthenticated: boolean
  setAuthenticated: (value: boolean) => void
}

const FarmContext = createContext<FarmContextValue | undefined>(undefined)

export function FarmProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const value = useMemo<FarmContextValue>(
    () => ({
      user: defaultUser,
      farm: defaultFarm,
      terrenos: defaultTerrenos,
      cultivos: defaultCultivos,
      riegos: defaultRiegos,
      bitacora: defaultBitacora,
      isAuthenticated,
      setAuthenticated: setIsAuthenticated,
    }),
    [isAuthenticated],
  )

  return <FarmContext.Provider value={value}>{children}</FarmContext.Provider>
}

export function useFarm() {
  const context = useContext(FarmContext)

  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider')
  }

  return context
}
