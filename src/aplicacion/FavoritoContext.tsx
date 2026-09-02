import {createContext,useEffect,useState,type ReactNode,} from "react";

import {alternarFavorito, comprobarFavorito,} from "../dominio/favorito";
import { guardarFavoritos, leerFavoritos } from "../infraestructura/Fovoritoalmacen";


interface ValorFavoritos {

    favoritos: number[];

    alternar: (enfermedadId: number) => void;

    esFavorito: (enfermedadId: number ) => boolean;
}

export const FavoritosContext =createContext<ValorFavoritos | null>(null);

export function FavoritosProvider({children}: {children: ReactNode;}) {

    const [favoritos, setFavoritos] =
        useState<number[]>(leerFavoritos);

    useEffect(() => {

        guardarFavoritos(favoritos);

    }, [favoritos]);


    function alternar(enfermedadId: number) {

        setFavoritos((actuales) =>
            alternarFavorito(
                actuales,
                enfermedadId
            )
        );
    }


    function esFavorito(enfermedadId: number) {

        return comprobarFavorito(
            favoritos,
            enfermedadId
        );
    }


    return (
        <FavoritosContext.Provider
            value={{
                favoritos,
                alternar,
                esFavorito,
            }}
        >
            {children}
        </FavoritosContext.Provider>
    );
}
