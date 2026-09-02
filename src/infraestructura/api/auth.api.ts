import { httpClient } from "../http/httpClient";
import { normalizarError } from "../http/apiError";
import { ENDPOINTS } from "../config/apiConfig";
import { tokenStorage } from "../tokenStorage";
import type { LoginRequest, RegistroRequest, Rol } from "../../dominio/Tipos";


interface RespuestaAuth {
  token: string;
  id: number;
  nombre: string;
  email: string;
  rol: Rol;
}


export const authApi = {

   async login(datos: LoginRequest): Promise<RespuestaAuth> {
    try {
      const  data  = await httpClient<RespuestaAuth>(ENDPOINTS.auth.login, {
        method: "POST",
        body: JSON.stringify(datos),
      });
      tokenStorage.setToken(data.token);
      tokenStorage.setUsuario({
        id: data.id,
        nombre: data.nombre,
        email: data.email,
        rol: data.rol,
      });
      return data;
    } catch (error) {
      throw normalizarError(error);
    }
  },

  async registro(datos: RegistroRequest): Promise<RespuestaAuth> {
    try {
      const data  = await httpClient<RespuestaAuth>(ENDPOINTS.auth.registro, {
        method: "POST",
        body: JSON.stringify(datos),
      });
      tokenStorage.setToken(data.token);
      tokenStorage.setUsuario({
        id: data.id,
        nombre: data.nombre,
        email: data.email,
        rol: data.rol,
      });
      return data;
    } catch (error) {
      throw normalizarError(error);
    }
  },

  logout(): void {
    tokenStorage.clear();
  },

  usuarioActual() {
    return tokenStorage.getUsuario();
  },

  estaAutenticado(): boolean {
    return tokenStorage.isAutenticado();
  },
};
