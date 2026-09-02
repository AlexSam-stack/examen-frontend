
// Configuración
export { API_BASE_URL, ENDPOINTS } from "./config/apiConfig";

// HTTP
export { httpClient, registrarHandlerSesionExpirada } from "./http/httpClient";
export { AppApiError, normalizarError } from "./http/apiError";

// Storage
export { tokenStorage } from "./tokenStorage";
export type { UsuarioSesion } from "./tokenStorage";

// APIs por dominio
export { authApi } from "./api/auth.api";
export { terrenosApi } from "./api/terrenos.api";
export { cultivosApi } from "./api/cultivos.api";
export { riegosApi } from "./api/riegos.api";
export { abonosApi } from "./api/abonos.api";
export { enfermedadesApi } from "./api/enfermedades.api";
export { tiposPlantaApi } from "./api/tiposPlanta.api";
export { analisisFotosApi } from "./api/analisisFotos.api";
export { analisisTierraApi } from "./api/analisisTierra.api";

// Tipos (re-exportados para no tener que importar de dos sitios distintos)
export * from "../dominio/Tipos";
