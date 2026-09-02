import type {
    Cultivo,
    EstadoCultivo,
    Terreno,
    TipoPlanta,
} from "../dominio/Tipos";

const PLANTA_DESCONOCIDA: TipoPlanta = {
    id: 0,
    nombre: "Planta sin identificar",
    nombreCientifico: null,
    descripcion: null,
    condicionesOptimas: null,
    diasCosecha: null,
};

type OpcionesCompletarCultivo = {
    anterior?: Cultivo;
    terreno?: Terreno | null;
    tiposPlanta?: TipoPlanta[];
};

export function completarCultivo(
    cultivo: Cultivo,
    opciones: OpcionesCompletarCultivo = {}
): Cultivo {
    const { anterior, terreno, tiposPlanta } = opciones;

    let tipoPlanta = cultivo.tipoPlanta ?? anterior?.tipoPlanta ?? null;

    if (!tipoPlanta && cultivo.tipoPlantaId && tiposPlanta) {
        tipoPlanta =
            tiposPlanta.find((planta) => planta.id === cultivo.tipoPlantaId) ??
            null;
    }

    if (!tipoPlanta) {
        tipoPlanta = PLANTA_DESCONOCIDA;
    }

    const terrenoResuelto =
        cultivo.terreno ?? anterior?.terreno ?? terreno ?? null;

    return {
        ...cultivo,
        tipoPlanta,
        terreno: terrenoResuelto,
    };
}

export function completarCultivos(
    cultivos: Cultivo[],
    opciones: Omit<OpcionesCompletarCultivo, "anterior"> = {}
): Cultivo[] {
    return cultivos.map((cultivo) => completarCultivo(cultivo, opciones));
}

export function agregarCultivo(
    cultivos: Cultivo[],
    cultivo: Cultivo
): Cultivo[] {
    return [...cultivos, cultivo];
}

export function actualizarCultivo(
    cultivos: Cultivo[],
    cultivoActualizado: Cultivo
): Cultivo[] {
    return cultivos.map((cultivo) =>
        cultivo.id === cultivoActualizado.id
            ? completarCultivo(cultivoActualizado, { anterior: cultivo })
            : cultivo
    );
}

export function cambiarEstadoCultivo(
    cultivos: Cultivo[],
    id: number,
    estado: EstadoCultivo
): Cultivo[] {
    return cultivos.map((cultivo) =>
        cultivo.id === id
            ? { ...cultivo, estado }
            : cultivo
    );
}

export function eliminarCultivo(
    cultivos: Cultivo[],
    id: number
): Cultivo[] {
    return cultivos.filter(
        (cultivo) => cultivo.id !== id
    );
}