import { httpClient } from "../http/httpClient";
import { normalizarError } from "../http/apiError";
import { ENDPOINTS } from "../config/apiConfig";
import type { TipoPlanta } from "../../dominio/Tipos";

export const tiposPlantaApi = {

  async listar(): Promise<TipoPlanta[]> {
    try {
      const data = await httpClient<TipoPlanta[]>(
        ENDPOINTS.tiposPlanta.base,
        {
          method: "GET",
        }
      );

      return data;

    } catch (error) {
      throw normalizarError(error);
    }
  },

  async crear(
    datos: Omit<TipoPlanta, "id">
  ): Promise<TipoPlanta> {
    try {
      const data = await httpClient<TipoPlanta>(
        ENDPOINTS.tiposPlanta.base,
        {
          method: "POST",
          body: JSON.stringify(datos),
        }
      );

      return data;

    } catch (error) {
      throw normalizarError(error);
    }
  },
};
