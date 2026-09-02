import { API_BASE_URL, API_TIMEOUT_MS } from "../config/apiConfig";
import { tokenStorage } from "../tokenStorage";
import { parsearErrorHttp } from "./apiError";


let onSesionExpirada: (() => void) | null = null;

export function registrarHandlerSesionExpirada(callback: () => void): void {
  onSesionExpirada = callback;
}




export async function httpClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // 1. Configurar Timeout usando AbortSignal
  const controller = new AbortController();
  const idTimeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  // 2. Interceptor de Request: Unificar headers y agregar JWT
  const token = tokenStorage.getToken();


  const headers: HeadersInit = {
     ...(options.body instanceof FormData
    ? {}
    : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
    signal: options.signal || controller.signal,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    clearTimeout(idTimeout);

    // 3. Interceptor de Response: Manejo de error 401 (Sesión Expirada)
    if (response.status === 401) {
      tokenStorage.clear();
      onSesionExpirada?.();
      throw new Error("Sesión expirada o no autorizada");
    }

    if (!response.ok) {
      let cuerpo: unknown = null;

      try {
        cuerpo = await response.json();
      } catch {
        cuerpo = null;
      }

      throw parsearErrorHttp(response.status, cuerpo);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    clearTimeout(idTimeout);

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(`Tiempo de espera agotado (${API_TIMEOUT_MS}ms)`);
    }

    throw error;
  }
}