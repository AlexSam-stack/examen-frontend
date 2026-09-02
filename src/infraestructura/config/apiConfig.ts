/**
 * apiConfig.ts
 * ------------------------------------------------------------------
 * Configuración central de la API. Usa variables de entorno de Vite
 * (import.meta.env) — si el proyecto usa Create React App, cambia
 * `import.meta.env.VITE_API_BASE_URL` por `process.env.REACT_APP_API_BASE_URL`.
 * ------------------------------------------------------------------
 */

export const API_BASE_URL: string =
  (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:8080/api";

/** Tiempo máximo de espera por request, en milisegundos. */
export const API_TIMEOUT_MS = 15000;

/**
 * Rutas de la API agrupadas por dominio. Centralizarlas acá evita
 * strings mágicos repetidos en cada archivo *.api.ts y facilita
 * actualizar el backend sin tocar la capa de servicios.
 */
export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    registro: "/auth/registro",
  },
  terrenos: {
    base: "/terrenos",
    porId: (id: number) => `/terrenos/${id}`,
  },
  cultivos: {
    base: "/cultivos",
    porId: (id: number) => `/cultivos/${id}`,
    estado: (id: number) => `/cultivos/${id}/estado`,
  },
  riegos: {
    base: "/riegos",
    porId: (id: number) => `/riegos/${id}`,
  },
  abonos: {
    base: "/abonos",
    porId: (id: number) => `/abonos/${id}`,
  },
  enfermedades: {
    base: "/enfermedades",
    porId: (id: number) => `/enfermedades/${id}`,
  },
  tiposPlanta: {
    base: "/tipos-planta",
  },
  analisisFotos: {
    analizar: (cultivoId: number) => `/analisis-fotos/cultivo/${cultivoId}`,
    historial: "/analisis-fotos",
  },
  analisisTierra: {
    base: "/analisis-tierra",
  },
} as const;
