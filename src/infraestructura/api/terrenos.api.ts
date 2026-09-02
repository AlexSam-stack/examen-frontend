import { httpClient } from "../http/httpClient";
import { normalizarError } from "../http/apiError";
import { ENDPOINTS } from "../config/apiConfig";
import type { Terreno, TerrenoRequest } from "../../dominio/Tipos";

export const terrenosApi = {

  async listarPorUsuario(
    usuarioId: number,
    signal?: AbortSignal
  ): Promise<Terreno[]> {
    try {
      const data = await httpClient<Terreno[]>(
        `${ENDPOINTS.terrenos.base}?usuarioId=${usuarioId}`,
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

  async obtener(id: number): Promise<Terreno> {
    try {
      const data = await httpClient<Terreno>(
        ENDPOINTS.terrenos.porId(id),
        {
          method: "GET",
        }
      );

      return data;

    } catch (error) {
      throw normalizarError(error);
    }
  },

  async crear(datos: TerrenoRequest): Promise<Terreno> {
    try {
      const data = await httpClient<Terreno>(
        ENDPOINTS.terrenos.base,
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

  async actualizar(
    id: number,
    datos: TerrenoRequest
  ): Promise<Terreno> {
    try {
      const data = await httpClient<Terreno>(
        ENDPOINTS.terrenos.porId(id),
        {
          method: "PUT",
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
        ENDPOINTS.terrenos.porId(id),
        {
          method: "DELETE",
        }
      );

    } catch (error) {
      throw normalizarError(error);
    }
  },
};