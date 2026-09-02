import { useEffect, useState } from "react";


import type {
    Enfermedad,
    TipoPlanta,
} from "../../dominio/Tipos";
import { useFavorito } from "../../aplicacion/useFavorito";
import { enfermedadesApi, tiposPlantaApi } from "../../infraestructura";

export default function Enfermedades() {

    const [enfermedades, setEnfermedades] =
        useState<Enfermedad[]>([]);

    const [tiposPlanta, setTiposPlanta] =
        useState<TipoPlanta[]>([]);

    const [busqueda, setBusqueda] =
        useState("");

    const [tipoPlantaId, setTipoPlantaId] =
        useState<number | "">("");

    const [cargando, setCargando] =
        useState(true);

    const [error, setError] =
        useState("");

    const {
        alternar,
        esFavorito,
    } = useFavorito();

    async function cargarEnfermedades() {

        try {

            setCargando(true);
            setError("");

            let data: Enfermedad[];

            if (busqueda.trim()) {

                data =
                    await enfermedadesApi.buscarPorNombre(
                        busqueda
                    );

            } else if (tipoPlantaId !== "") {

                data =
                    await enfermedadesApi.listarPorTipoPlanta(
                        tipoPlantaId
                    );

            } else {

                data =
                    await enfermedadesApi.listarTodas();

            }

            setEnfermedades(data);

        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudieron cargar las enfermedades"
            );

        } finally {

            setCargando(false);

        }
    }

    async function cargarTiposPlanta() {

        try {

            const data =
                await tiposPlantaApi.listar();

            setTiposPlanta(data);

        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudieron cargar los tipos de planta"
            );

        }
    }

    useEffect(() => {

        cargarTiposPlanta();

    }, []);

    useEffect(() => {

        cargarEnfermedades();

    }, [tipoPlantaId]);

    function buscar(e: React.FormEvent) {

        e.preventDefault();

        cargarEnfermedades();

    }

    function limpiarFiltros() {

        setBusqueda("");
        setTipoPlantaId("");

    }

    return (

        <div>

            <h1>Enfermedades</h1>

            {error && (
                <p>{error}</p>
            )}

            {/* BUSCADOR */}

            <form onSubmit={buscar}>

                <input
                    type="text"
                    value={busqueda}
                    onChange={(e) =>
                        setBusqueda(e.target.value)
                    }
                    placeholder="Buscar enfermedad..."
                />

                <button type="submit">
                    Buscar
                </button>

            </form>

            {/* FILTRO */}

            <select
                value={tipoPlantaId}
                onChange={(e) =>
                    setTipoPlantaId(
                        e.target.value === ""
                            ? ""
                            : Number(e.target.value)
                    )
                }
            >

                <option value="">
                    Todas las plantas
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

            <button onClick={limpiarFiltros}>
                Limpiar
            </button>

            {/* LISTADO */}

            {cargando ? (

                <p>Cargando enfermedades...</p>

            ) : (

                <div>

                    {enfermedades.map((enfermedad) => (

                        <article key={enfermedad.id}>

                            <h2>
                                {enfermedad.nombre}
                            </h2>

                            <p>
                                Planta:{" "}
                                {enfermedad.tipoPlanta?.nombre ??
                                    "General"}
                            </p>

                            <p>
                                Riesgo:{" "}
                                {enfermedad.nivelRiesgo}
                            </p>

                            <p>
                                Síntomas:{" "}
                                {enfermedad.sintomas ??
                                    "No especificados"}
                            </p>

                            <p>
                                Tratamiento:{" "}
                                {enfermedad.tratamiento ??
                                    "No especificado"}
                            </p>

                            <button
                                onClick={() =>
                                    alternar(enfermedad.id)
                                }
                            >
                                {esFavorito(enfermedad.id)
                                    ? "❤️ Quitar favorito"
                                    : "🤍 Agregar favorito"}
                            </button>

                        </article>

                    ))}

                </div>

            )}

        </div>

    );
}