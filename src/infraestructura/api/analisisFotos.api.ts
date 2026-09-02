import { httpClient } from "../http/httpClient";
import { normalizarError } from "../http/apiError";
import { ENDPOINTS } from "../config/apiConfig";
import type {
  AnalisisFoto,
  AnalisisFotoResponse
} from "../../dominio/Tipos";

export const analisisFotosApi = {

  async analizar(
    cultivoId: number,
    imagen: File,
    _onProgress?: (porcentaje: number) => void
  ): Promise<AnalisisFotoResponse> {

    try {
      const formData = new FormData();

      formData.append("imagen", imagen);

      const data = await httpClient<AnalisisFotoResponse>(
        ENDPOINTS.analisisFotos.analizar(cultivoId),
        {
          method: "POST",
          body: formData,
        }
      );

      return data;

    } catch (error) {
      throw normalizarError(error);
    }
  },

  async historial(cultivoId: number): Promise<AnalisisFoto[]> {

    try {
      const data = await httpClient<AnalisisFoto[]>(
        `${ENDPOINTS.analisisFotos.historial}?cultivoId=${cultivoId}`,
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