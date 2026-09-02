import { useEffect, useState, type FormEvent } from "react";


import type {
    Cultivo,
    CultivoRequest,
    TipoPlanta,
    EstadoCultivo,
} from "../../dominio/Tipos";
import { cultivosApi, tiposPlantaApi } from "../../infraestructura";

interface CultivosProps {
    terrenoId: number;
}

export default function Cultivos({ terrenoId }: CultivosProps) {

    const [cultivos, setCultivos] = useState<Cultivo[]>([]);
    const [tiposPlanta, setTiposPlanta] = useState<TipoPlanta[]>([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [formulario, setFormulario] = useState<CultivoRequest>({
        terrenoId,
        tipoPlantaId: 0,
        fechaSiembra: "",
        estado: "ACTIVO",
        observaciones: "",
    });

    async function cargarDatos() {
        try {
            setCargando(true);
            setError("");

            const [cultivosData, plantasData] = await Promise.all([
                cultivosApi.listarPorTerreno(terrenoId),
                tiposPlantaApi.listar(),
            ]);

            setCultivos(cultivosData);
            setTiposPlanta(plantasData);

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudieron cargar los datos"
            );
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        cargarDatos();
    }, [terrenoId]);

    function manejarCambio(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) {
        const { name, value } = e.target;

        setFormulario((actual) => ({
            ...actual,
            [name]:
                name === "tipoPlantaId"
                    ? Number(value)
                    : value,
        }));
    }

    async function manejarEnvio(e: FormEvent) {
        e.preventDefault();

        try {
            setError("");

            const nuevo = await cultivosApi.crear({
                ...formulario,
                terrenoId,
            });

            setCultivos((actuales) => [
                ...actuales,
                nuevo,
            ]);

            setFormulario({
                terrenoId,
                tipoPlantaId: 0,
                fechaSiembra: "",
                estado: "ACTIVO",
                observaciones: "",
            });

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo crear el cultivo"
            );
        }
    }

    async function cambiarEstado(
        id: number,
        estado: EstadoCultivo
    ) {
        try {
            const actualizado =
                await cultivosApi.actualizarEstado(id, estado);

            setCultivos((actuales) =>
                actuales.map((cultivo) =>
                    cultivo.id === id
                        ? actualizado
                        : cultivo
                )
            );

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo actualizar el estado"
            );
        }
    }

    async function eliminar(id: number) {

        if (!confirm("¿Deseas eliminar este cultivo?")) {
            return;
        }

        try {
            await cultivosApi.eliminar(id);

            setCultivos((actuales) =>
                actuales.filter(
                    (cultivo) => cultivo.id !== id
                )
            );

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo eliminar el cultivo"
            );
        }
    }

    if (cargando) {
        return <p>Cargando cultivos...</p>;
    }

    return (
        <div>

            <h1>Cultivos</h1>

            {error && (
                <p>{error}</p>
            )}

            {/* FORMULARIO */}

            <form onSubmit={manejarEnvio}>

                <select
                    name="tipoPlantaId"
                    value={formulario.tipoPlantaId}
                    onChange={manejarCambio}
                    required
                >
                    <option value={0}>
                        Seleccionar planta
                    </option>

                    {tiposPlanta.map((planta) => (
                        <option
                            key={planta.id}
                            value={planta.id}
                        >
                            {planta.nombre}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    name="fechaSiembra"
                    value={formulario.fechaSiembra}
                    onChange={manejarCambio}
                    required
                />

                <select
                    name="estado"
                    value={formulario.estado}
                    onChange={manejarCambio}
                >
                    <option value="ACTIVO">
                        Activo
                    </option>

                    <option value="COSECHADO">
                        Cosechado
                    </option>

                    <option value="PERDIDO">
                        Perdido
                    </option>
                </select>

                <textarea
                    name="observaciones"
                    value={formulario.observaciones}
                    onChange={manejarCambio}
                    placeholder="Observaciones"
                />

                <button type="submit">
                    Crear cultivo
                </button>

            </form>

            {/* LISTADO */}

            <div>

                {cultivos.map((cultivo) => (

                    <div key={cultivo.id}>

                        <h2>
                            {cultivo.tipoPlanta.nombre}
                        </h2>

                        <p>
                            Siembra: {cultivo.fechaSiembra}
                        </p>

                        <p>
                            Estado: {cultivo.estado}
                        </p>

                        <p>
                            {cultivo.observaciones}
                        </p>

                        <select
                            value={cultivo.estado}
                            onChange={(e) =>
                                cambiarEstado(
                                    cultivo.id,
                                    e.target.value as EstadoCultivo
                                )
                            }
                        >
                            <option value="ACTIVO">
                                Activo
                            </option>

                            <option value="COSECHADO">
                                Cosechado
                            </option>

                            <option value="PERDIDO">
                                Perdido
                            </option>

                        </select>

                        <button
                            onClick={() =>
                                eliminar(cultivo.id)
                            }
                        >
                            Eliminar
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}