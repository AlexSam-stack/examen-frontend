import { httpClient } from "../http/httpClient";
import { normalizarError } from "../http/apiError";
import { ENDPOINTS } from "../config/apiConfig";
import type {
  Cultivo,
  CultivoRequest,
  EstadoCultivo
} from "../../dominio/Tipos";

export const cultivosApi = {

  async listarPorTerreno(
    terrenoId: number,
    signal?: AbortSignal
  ): Promise<Cultivo[]> {
    try {
      const data = await httpClient<Cultivo[]>(
        `${ENDPOINTS.cultivos.base}?terrenoId=${terrenoId}`,
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

  async obtener(id: number): Promise<Cultivo> {
    try {
      const data = await httpClient<Cultivo>(
        ENDPOINTS.cultivos.porId(id),
        {
          method: "GET",
        }
      );

      return data;

    } catch (error) {
      throw normalizarError(error);
    }
  },

  async crear(datos: CultivoRequest): Promise<Cultivo> {
    try {
      const data = await httpClient<Cultivo>(
        ENDPOINTS.cultivos.base,
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

  async actualizarEstado(
    id: number,
    estado: EstadoCultivo
  ): Promise<Cultivo> {
    try {
      const data = await httpClient<Cultivo>(
        ENDPOINTS.cultivos.estado(id),
        {
          method: "PATCH",
          body: JSON.stringify({
            estado,
          }),
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
        ENDPOINTS.cultivos.porId(id),
        {
          method: "DELETE",
        }
      );

    } catch (error) {
      throw normalizarError(error);
    }
  },
};