const CLAVE_FAVORITOS = "agrotech.favoritos.enfermedades";

export function leerFavoritos(): number[] {

    try {

        const crudo: unknown = JSON.parse(
            localStorage.getItem(CLAVE_FAVORITOS) ?? "[]"
        );

        return Array.isArray(crudo)
            ? (crudo as number[])
            : [];

    } catch {

        return [];
    }
}

export function guardarFavoritos(
    favoritos: number[]
) {

    try {

        localStorage.setItem(
            CLAVE_FAVORITOS,
            JSON.stringify(favoritos)
        );

    } catch (error) {

        console.warn(
            "No se pudieron guardar los favoritos",
            error instanceof Error
                ? error.message
                : error
        );
    }
}