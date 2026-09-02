import { httpClient } from "../http/httpClient";
import { normalizarError } from "../http/apiError";
import { ENDPOINTS } from "../config/apiConfig";
import type {
  AnalisisTierra,
  AnalisisTierraRequest
} from "../../dominio/Tipos";

export const analisisTierraApi = {

  async analizar(
    datos: AnalisisTierraRequest
  ): Promise<AnalisisTierra> {

    try {
      const data = await httpClient<AnalisisTierra>(
        ENDPOINTS.analisisTierra.base,
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

  async historial(
    terrenoId: number
  ): Promise<AnalisisTierra[]> {

    try {
      const data = await httpClient<AnalisisTierra[]>(
        `${ENDPOINTS.analisisTierra.base}?terrenoId=${terrenoId}`,
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
