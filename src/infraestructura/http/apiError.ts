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
    return new AppApiError(error.message, 0);
  }

  return new AppApiError("Ocurrió un error inesperado. Inténtalo de nuevo.", 0);
}

export function parsearErrorHttp(status: number, data: unknown): AppApiError {
  if (status === 400 && data && typeof data === "object" && !("mensaje" in data)) {
    return new AppApiError(
      "Hay datos inválidos en el formulario.",
      status,
      data as ValidationErrors
    );
  }

  if (data && typeof data === "object" && "mensaje" in data) {
    return new AppApiError((data as ApiError).mensaje, status);
  }

  return new AppApiError("Ocurrió un error inesperado. Inténtalo de nuevo.", status);
}
