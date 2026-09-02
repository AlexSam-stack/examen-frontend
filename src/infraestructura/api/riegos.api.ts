import { httpClient } from "../http/httpClient";
import { normalizarError } from "../http/apiError";
import { ENDPOINTS } from "../config/apiConfig";
import type { Riego, RiegoRequest } from "../../dominio/Tipos";

export const riegosApi = {

  async listarPorCultivo(
    cultivoId: number
  ): Promise<Riego[]> {
    try {
      const data = await httpClient<Riego[]>(
        `${ENDPOINTS.riegos.base}?cultivoId=${cultivoId}`,
        {
          method: "GET",
        }
      );

      return data;

    } catch (error) {
      throw normalizarError(error);
    }
  },

  async registrar(
    datos: RiegoRequest
  ): Promise<Riego> {
    try {
      const data = await httpClient<Riego>(
        ENDPOINTS.riegos.base,
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

  async eliminar(id: number): Promise<void> {
    try {
      await httpClient<void>(
        ENDPOINTS.riegos.porId(id),
        {
          method: "DELETE",
        }
      );

    } catch (error) {
      throw normalizarError(error);
    }
  },
};