import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Usuario } from "../dominio/Tipos";
import { borrarSesion, guardarSesion, leerSesion } from "../infraestructura/almacen";
import { iniciarSesion, obtenerPerfil } from "../infraestructura/auth";

interface SesionContextValue {
  usuario: Usuario| null;
  entrar: (usuario: string, clave: string) => Promise<void>;
  salir: () => void;
}

export const SesionContext = createContext<SesionContextValue | null>(null);


export function SesionProvider({ children }: { children: ReactNode }) {

  const [usuario, setUsuario] =useState< Usuario | null>(leerSesion);
    //entrar

  async function entrar(nombreUsuario: string, clave: string): Promise<void> {
    const conectado = await iniciarSesion(nombreUsuario, clave);
        guardarSesion(conectado);
        setUsuario(conectado);
  }

    function salir () {
        borrarSesion();
        setUsuario(null);
    }

 useEffect (() => {
        if(!usuario) return;
        const restante = usuario.expiraEn - Date.now();
        if(restante <= 0 ){
            borrarSesion();
            setUsuario(null);
            return;
        }
        const controlador = new AbortController();
        obtenerPerfil(usuario.token, controlador.signal)
        .catch((error : unknown) => {
            if(error instanceof DOMException && error.name === 'AbortError') return;
            console.warn('La sesion guardada ya no es valida: ', error instanceof Error ? error.message : error);
            borrarSesion();
            setUsuario(null);
        });
        const temporizador = setTimeout(() => {
            borrarSesion();
            setUsuario(null);
        }, restante);

        return () => {
            controlador.abort();
            clearTimeout(temporizador);
        }
    }, [usuario]);



    return (
        <SesionContext.Provider value={{usuario, entrar, salir}}>
            {children}
        </SesionContext.Provider>
    )
}