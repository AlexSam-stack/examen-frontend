import { useFarm } from './FarmContext'

export function useTerrenos() {
  const { terrenos } = useFarm()

  return {
    terrenos,
    totalHectareas: terrenos.reduce((sum, terreno) => sum + terreno.hectareas, 0),
  }
}
