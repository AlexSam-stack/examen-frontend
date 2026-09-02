import { createContext, useEffect, useState, type ReactNode } from "react";
import type { LoginRequest, RegistroRequest } from "../dominio/Tipos";
import { authApi, registrarHandlerSesionExpirada, tokenStorage, type UsuarioSesion } from "../infraestructura";
import { tokenExpirado } from "../dominio/sesion";




interface AuthContextValue {
  usuario: UsuarioSesion | null;
  cargandoSesion: boolean;
  estaAutenticado: boolean;
  login: (datos: LoginRequest) => Promise<void>;
  registrar: (datos: RegistroRequest) => Promise<void>;
  logout: () => void;
}

 export const SesionContext = createContext<AuthContextValue | undefined>(undefined);


export function SesionProvider({ children }: { children: ReactNode }) {

  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);

  useEffect(() => {
    const token = tokenStorage.getToken();
    const usuarioGuardado = tokenStorage.getUsuario();

    if (token && usuarioGuardado && !tokenExpirado(token)) {
      setUsuario(usuarioGuardado);
    } else {
      tokenStorage.clear();
      setUsuario(null);
    }
    setCargandoSesion(false);

    // Si el backend responde 401 en cualquier momento (token inválido/expirado),
    // cerramos la sesión en el frontend también.
    registrarHandlerSesionExpirada(() => setUsuario(null));
  }, []);

  async function login(datos: LoginRequest) {
    const respuesta = await authApi.login(datos);
    setUsuario({
      id: respuesta.id,
      nombre: respuesta.nombre,
      email: respuesta.email,
      rol: respuesta.rol,
    });
  }

  async function registrar(datos: RegistroRequest) {
    const respuesta = await authApi.registro(datos);
    setUsuario({
      id: respuesta.id,
      nombre: respuesta.nombre,
      email: respuesta.email,
      rol: respuesta.rol,
    });
  }

  function logout() {
    authApi.logout();
    setUsuario(null);
  }

  return (
    <SesionContext.Provider
      value={{ usuario, cargandoSesion, estaAutenticado: !!usuario, login, registrar, logout }}
    >
      {children}
    </SesionContext.Provider>
  );
}