import { httpClient } from "../http/httpClient";
import { normalizarError } from "../http/apiError";
import { ENDPOINTS } from "../config/apiConfig";
import type { Abono, AbonoRequest } from "../../dominio/Tipos";

export const abonosApi = {

  async listarPorCultivo(cultivoId: number): Promise<Abono[]> {
    try {
      const data = await httpClient<Abono[]>(
        `${ENDPOINTS.abonos.base}?cultivoId=${cultivoId}`,
        {
          method: "GET",
        }
      );

      return data;
    } catch (error) {
      throw normalizarError(error);
    }
  },

  async registrar(datos: AbonoRequest): Promise<Abono> {
    try {
      const data = await httpClient<Abono>(
        ENDPOINTS.abonos.base,
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
        ENDPOINTS.abonos.porId(id),
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      throw normalizarError(error);
    }
  },
};