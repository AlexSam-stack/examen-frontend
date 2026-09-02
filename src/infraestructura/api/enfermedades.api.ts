import { httpClient } from "../http/httpClient";
import { normalizarError } from "../http/apiError";
import { ENDPOINTS } from "../config/apiConfig";
import type { Enfermedad } from "../../dominio/Tipos";

export const enfermedadesApi = {

  async listarTodas(signal?: AbortSignal): Promise<Enfermedad[]> {
    try {
      const data = await httpClient<Enfermedad[]>(
        ENDPOINTS.enfermedades.base,
        {
          method: "GET",
          signal,
        }
      );

      return data;

    } catch (error) {
      throw normalizarError(error);
    }
  },

  async listarPorTipoPlanta(
    tipoPlantaId: number,
    signal?: AbortSignal
  ): Promise<Enfermedad[]> {
    try {
      const data = await httpClient<Enfermedad[]>(
        `${ENDPOINTS.enfermedades.base}?tipoPlantaId=${tipoPlantaId}`,
        {
          method: "GET",
          signal,
        }
      );

      return data;

    } catch (error) {
      throw normalizarError(error);
    }
  },

  async buscarPorNombre(
    nombre: string,
    signal?: AbortSignal
  ): Promise<Enfermedad[]> {
    try {
      const data = await httpClient<Enfermedad[]>(
        `${ENDPOINTS.enfermedades.base}?nombre=${encodeURIComponent(nombre)}`,
        {
          method: "GET",
          signal,
        }
      );

      return data;

    } catch (error) {
      throw normalizarError(error);
    }
  },

  async obtener(id: number): Promise<Enfermedad> {
    try {
      const data = await httpClient<Enfermedad>(
        ENDPOINTS.enfermedades.porId(id),
        {
          method: "GET",
        }
      );

      return data;

    } catch (error) {
      throw normalizarError(error);
    }
  },
};