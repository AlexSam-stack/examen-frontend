

export function alternarFavorito(
    favoritos: number[],
    enfermedadId: number
): number[] {

    const esFavorito = favoritos.includes(enfermedadId);

    if (esFavorito) {
        return favoritos.filter(
            (id) => id !== enfermedadId
        );
    }

    return [...favoritos, enfermedadId];
}

export function comprobarFavorito(
    favoritos: number[],
    enfermedadId: number
): boolean {

    return favoritos.includes(enfermedadId);
}