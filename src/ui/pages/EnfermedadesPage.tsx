import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type {
    Enfermedad,
    TipoPlanta,
} from "../../dominio/Tipos";
import { NIVEL_RIESGO_LABELS } from "../../dominio/Tipos";
import { useFavorito } from "../../aplicacion/useFavorito";
import { enfermedadesApi, tiposPlantaApi } from "../../infraestructura";

const inputClass =
  "rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function EnfermedadesPage() {

    const [enfermedades, setEnfermedades] =
        useState<Enfermedad[]>([]);

    const [tiposPlanta, setTiposPlanta] =
        useState<TipoPlanta[]>([]);

    const [busqueda, setBusqueda] =
        useState("");

    const [tipoPlantaId, setTipoPlantaId] =
        useState<number | "">("");

    const [soloFavoritos, setSoloFavoritos] = useState(false);

    const [cargando, setCargando] =
        useState(true);

    const [error, setError] =
        useState("");

    const {
        favoritos,
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

            if (soloFavoritos) {
                data = data.filter((e) => favoritos.includes(e.id));
            }

            setEnfermedades(data);

        } catch (fallo) {

            setError(
                fallo instanceof Error
                    ? fallo.message
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

        } catch (fallo) {

            setError(
                fallo instanceof Error
                    ? fallo.message
                    : "No se pudieron cargar los tipos de planta"
            );

        }
    }

    useEffect(() => {

        cargarTiposPlanta();

    }, []);

    useEffect(() => {

        cargarEnfermedades();

    }, [tipoPlantaId, soloFavoritos, favoritos]);

    function buscar(e: React.FormEvent) {

        e.preventDefault();

        cargarEnfermedades();

    }

    function limpiarFiltros() {

        setBusqueda("");
        setTipoPlantaId("");
        setSoloFavoritos(false);

    }

    return (

        <div className="flex flex-col gap-8">

            <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <p className="text-xs uppercase tracking-wide text-amber-400 font-medium">
                        Salud vegetal
                    </p>
                    <h1 className="text-2xl font-bold text-slate-100">Enfermedades</h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Busca por nombre, filtra por planta y guarda tus favoritas.
                    </p>
                </div>
                <Link
                    to="/favoritos"
                    className="text-sm text-pink-400 hover:text-pink-300 shrink-0"
                >
                    Ver favoritos ({favoritos.length})
                </Link>
            </section>

            {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                    {error}
                </p>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row flex-wrap gap-3">
                <form onSubmit={buscar} className="flex flex-1 gap-2 min-w-[200px]">
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Buscar enfermedad..."
                        className={`${inputClass} flex-1`}
                    />
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-medium transition-colors"
                    >
                        Buscar
                    </button>
                </form>

                <select
                    value={tipoPlantaId}
                    onChange={(e) =>
                        setTipoPlantaId(
                            e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                        )
                    }
                    className={inputClass}
                >
                    <option value="">Todas las plantas</option>
                    {tiposPlanta.map((planta) => (
                        <option key={planta.id} value={planta.id}>
                            {planta.nombre}
                        </option>
                    ))}
                </select>

                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={soloFavoritos}
                        onChange={(e) => setSoloFavoritos(e.target.checked)}
                        className="rounded border-slate-600"
                    />
                    Solo favoritos
                </label>

                <button
                    type="button"
                    onClick={limpiarFiltros}
                    className="rounded-lg border border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800 px-4 py-2 text-sm transition-colors"
                >
                    Limpiar
                </button>
            </div>

            {cargando ? (

                <p className="text-slate-400">Cargando enfermedades...</p>

            ) : enfermedades.length === 0 ? (

                <p className="text-slate-400">No se encontraron enfermedades.</p>

            ) : (

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                    {enfermedades.map((enfermedad) => (

                        <article
                            key={enfermedad.id}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-amber-500/30 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <h2 className="text-slate-100 font-semibold text-lg">
                                    {enfermedad.nombre}
                                </h2>
                                <span
                                    className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                                        enfermedad.nivelRiesgo === "ALTO"
                                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                            : enfermedad.nivelRiesgo === "MEDIO"
                                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    }`}
                                >
                                    {NIVEL_RIESGO_LABELS[enfermedad.nivelRiesgo]}
                                </span>
                            </div>

                            <p className="text-sm text-slate-400 mt-1">
                                Planta:{" "}
                                {enfermedad.tipoPlanta?.nombre ?? "General"}
                            </p>

                            {enfermedad.sintomas && (
                                <p className="text-sm text-slate-300 mt-3">
                                    <span className="text-slate-500">Síntomas: </span>
                                    {enfermedad.sintomas}
                                </p>
                            )}

                            {enfermedad.tratamiento && (
                                <p className="text-sm text-slate-300 mt-2">
                                    <span className="text-slate-500">Tratamiento: </span>
                                    {enfermedad.tratamiento}
                                </p>
                            )}

                            <button
                                type="button"
                                onClick={() => alternar(enfermedad.id)}
                                className="mt-4 text-sm text-pink-400 hover:text-pink-300 transition-colors"
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
