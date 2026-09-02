import type { ApiError, ValidationErrors } from "../../dominio/Tipos";

export class AppApiError extends Error {
  public readonly status: number;
  public readonly validationErrors?: ValidationErrors;

  constructor(message: string, status: number, validationErrors?: ValidationErrors) {
    super(message);
    this.name = "AppApiError";
    this.status = status;
    this.validationErrors = validationErrors;
  }

  get esErrorDeValidacion(): boolean {
    return !!this.validationErrors;
  }
}

export function normalizarError(error: unknown): AppApiError {
  if (error instanceof AppApiError) {
    return error;
  }

  if (error instanceof Error) {
    if (error.message === "Failed to fetch") {
      return new AppApiError(
        "No se pudo conectar con el servidor. Verifica tu conexión o que el backend esté activo.",
        0
      );
    }

    return new AppApiError(error.message, 0);
  }

  return new AppApiError("Ocurrió un error inesperado. Inténtalo de nuevo.", 0);
}

export function parsearErrorHttp(status: number, data: unknown): AppApiError {
  if (status === 400 && data && typeof data === "object" && !("mensaje" in data)) {
    const errores = data as ValidationErrors;
    const primerMensaje = Object.values(errores)[0];

    return new AppApiError(
      primerMensaje ?? "Hay datos inválidos en el formulario.",
      status,
      errores
    );
  }

  if (data && typeof data === "object" && "mensaje" in data) {
    const mensaje = (data as ApiError).mensaje;

    if (status === 500 && mensaje.toLowerCase().includes("ya existe")) {
      return new AppApiError("Ese email ya está registrado. Prueba iniciar sesión.", status);
    }

    return new AppApiError(mensaje, status);
  }

  if (status === 403) {
    return new AppApiError(
      "Acceso denegado (403). Revisa que VITE_API_BASE_URL termine en /api y reinicia npm run dev.",
      status
    );
  }

  return new AppApiError(
    `Error del servidor (HTTP ${status}). Inténtalo de nuevo.`,
    status
  );
}
