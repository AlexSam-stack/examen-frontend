import type { Usuario } from "../dominio/farm";



const BASE = 'https://dummyjson.com';
const MINUTOS_SESION = 10;

// usuario: emilys
//contraseña: emilypass

interface RespuestaLogin{
    id:number;
    firstName? : string ;
    username : string;
    email: string;
    accessToken: string;
}

export async function iniciarSesion( usuario: string , clave : String) : Promise<Usuario>{
    const r = await fetch(`${BASE}/auth/login`,{
        method:'POST',
        headers : {'Context-Type':'application/json'},
        body: JSON.stringify({username:usuario , password :clave , expiresInMins : MINUTOS_SESION}),
    });
    if(!r.ok) throw new Error ('Usuario o contraseña incorrecta');

    const data =(await r.json()) as RespuestaLogin;
    return {
        id : data.id,
        nombre : data.firstName || data.username,
        email : data.email,
        token: data.accessToken,
        expiraEn: Date.now() + MINUTOS_SESION * 60 * 1000
    }
}



export async function obtenerPerfil(token : string, signal?: AbortSignal) : Promise<void>{
console.log(token);
    const r = await fetch(`${BASE}/auth/me`, {
        headers : { Authorization : `Bearer ${token}`},
        signal
    });
    if(!r.ok) throw new Error(`Sesion rechazada por el servidor (HTTP ${r.status})`);

}