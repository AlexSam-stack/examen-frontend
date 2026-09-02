import { useContext } from "react";
import { FavoritosContext } from "./FavoritoContext";


export function useFavorito(){
    const contexto = useContext(FavoritosContext);
    if(!contexto) throw new Error('useFavorito solo funciona dentro de <FavoritosProvider>.');
    return contexto;
}