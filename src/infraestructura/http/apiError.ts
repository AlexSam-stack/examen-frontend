import type { AxiosError } from "axios";
import type { ApiError, ValidationErrors } from "../types/agrotech-types";

/**
 * Error normalizado que usan todos los servicios de la capa de infraestructura.
 * Así los componentes de React nunca tienen que saber que por debajo se usa axios.
 */
export class AppApiError extends Error {
  public readonly status: number;
  public readonly validationErrors?: ValidationErrors;

  constructor(message: string, status: number, validationErrors?: ValidationErrors) {
    super(message);
    this.name = "AppApiError";
    this.status = status;
    this.validationErrors = validationErrors;
  }

  /** True cuando el error viene de @Valid (400 con mapa campo -> mensaje) */
  get esErrorDeValidacion(): boolean {
    return !!this.validationErrors;
  }
}

/**
 * Convierte cualquier error de axios (incluyendo timeouts y errores de red)
 * en un AppApiError consistente, leyendo el formato de GlobalExceptionHandler
 * del backend cuando está disponible.
 */
export function normalizarError(error: unknown): AppApiError {
  const axiosError = error as AxiosError<ApiError | ValidationErrors>;

  if (!axiosError.response) {
    // No hubo respuesta del servidor: caído, sin red, CORS, timeout, etc.
    return new AppApiError(
      "No se pudo conectar con el servidor. Verifica tu conexión e inténtalo de nuevo.",
      0
    );
  }

  const { status, data } = axiosError.response;

  // Errores de validación (@Valid): Record<string, string>
  if (status === 400 && data && typeof data === "object" && !("mensaje" in data)) {
    return new AppApiError(
      "Hay datos inválidos en el formulario.",
      status,
      data as ValidationErrors
    );
  }

  // Errores estándar del GlobalExceptionHandler: { status, mensaje, fecha }
  if (data && typeof data === "object" && "mensaje" in data) {
    return new AppApiError((data as ApiError).mensaje, status);
  }

  return new AppApiError("Ocurrió un error inesperado. Inténtalo de nuevo.", status);
}
