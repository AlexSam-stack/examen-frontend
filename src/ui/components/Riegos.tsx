import {
    useEffect,
    useState,
    type FormEvent,
} from "react";
import { Link } from "react-router-dom";

import { riegosApi, type Riego, type RiegoRequest } from "../../infraestructura";

const inputClass =
  "rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500";

interface RiegosProps {
    cultivoId: number;
}

export default function Riegos({
    cultivoId,
}: RiegosProps) {

    const [riegos, setRiegos] = useState<Riego[]>([]);

    const [formulario, setFormulario] =
        useState<RiegoRequest>({
            cultivoId,
            cantidadLitros: undefined,
            metodo: "manual",
            observaciones: "",
        });

    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        async function cargar() {

            try {

                setCargando(true);
                setError("");

                const data =
                    await riegosApi.listarPorCultivo(
                        cultivoId
                    );

                setRiegos(data);

            } catch (fallo) {

                setError(
                    fallo instanceof Error
                        ? fallo.message
                        : "Error al cargar los riegos"
                );

            } finally {

                setCargando(false);

            }
        }

        cargar();

    }, [cultivoId]);

    function manejarCambio(
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement |
            HTMLTextAreaElement
        >
    ) {

        const { name, value } = e.target;

        setFormulario((actual) => ({
            ...actual,

            [name]:
                name === "cantidadLitros"
                    ? value === ""
                        ? undefined
                        : Number(value)
                    : value,
        }));
    }

    async function manejarEnvio(
        e: FormEvent
    ) {

        e.preventDefault();

        try {

            setGuardando(true);
            setError("");

            const nuevo =
                await riegosApi.registrar({
                    ...formulario,
                    cultivoId,
                });

            setRiegos((actuales) => [
                ...actuales,
                nuevo,
            ]);

            setFormulario({
                cultivoId,
                cantidadLitros: undefined,
                metodo: "manual",
                observaciones: "",
            });

        } catch (fallo) {

            setError(
                fallo instanceof Error
                    ? fallo.message
                    : "Error al registrar el riego"
            );

        } finally {

            setGuardando(false);

        }
    }

    async function eliminar(id: number) {

        if (!confirm("¿Eliminar este riego?")) {
            return;
        }

        try {

            await riegosApi.eliminar(id);

            setRiegos((actuales) =>
                actuales.filter(
                    (riego) => riego.id !== id
                )
            );

        } catch (fallo) {

            setError(
                fallo instanceof Error
                    ? fallo.message
                    : "Error al eliminar"
            );
        }
    }

    if (cargando) {
        return <p className="text-slate-400">Cargando riegos...</p>;
    }

    const cultivoNombre = riegos[0]?.cultivo?.tipoPlanta?.nombre;

    return (
        <div className="flex flex-col gap-8">

            <section>
                <Link to="/riego" className="text-sm text-cyan-400 hover:text-cyan-300">
                    ← Volver a selección
                </Link>
                <h1 className="text-2xl font-bold text-slate-100 mt-2">
                    Riegos{cultivoNombre ? ` — ${cultivoNombre}` : ""}
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                    Registra cantidad, método y observaciones. La fecha se asigna automáticamente.
                </p>
            </section>

            {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                    {error}
                </p>
            )}

            <form
                onSubmit={manejarEnvio}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
                <h2 className="sm:col-span-2 text-lg font-semibold text-slate-100">
                    Nuevo riego
                </h2>

                <label className="flex flex-col text-sm text-slate-300 gap-1">
                    Litros de agua
                    <input
                        type="number"
                        name="cantidadLitros"
                        placeholder="Ej: 150"
                        min="0"
                        value={formulario.cantidadLitros ?? ""}
                        onChange={manejarCambio}
                        className={inputClass}
                    />
                </label>

                <label className="flex flex-col text-sm text-slate-300 gap-1">
                    Método
                    <select
                        name="metodo"
                        value={formulario.metodo}
                        onChange={manejarCambio}
                        className={inputClass}
                    >
                        <option value="manual">Manual</option>
                        <option value="goteo">Goteo</option>
                        <option value="aspersion">Aspersión</option>
                    </select>
                </label>

                <label className="flex flex-col text-sm text-slate-300 gap-1 sm:col-span-2">
                    Observaciones
                    <textarea
                        name="observaciones"
                        placeholder="Condiciones del suelo, hora del día..."
                        value={formulario.observaciones}
                        onChange={manejarCambio}
                        className={`${inputClass} min-h-[80px]`}
                    />
                </label>

                <button
                    type="submit"
                    disabled={guardando}
                    className="sm:col-span-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-4 py-2 font-medium transition-colors w-fit"
                >
                    {guardando ? "Registrando..." : "Registrar riego"}
                </button>
            </form>

            <section>
                <h2 className="text-lg font-semibold text-slate-100 mb-4">
                    Historial ({riegos.length})
                </h2>

                {riegos.length === 0 ? (
                    <p className="text-slate-400">Aún no hay riegos registrados.</p>
                ) : (
                    <div className="space-y-3">
                        {riegos.map((riego) => (
                            <article
                                key={riego.id}
                                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                            >
                                <div>
                                    <p className="text-slate-100 font-medium">
                                        {new Date(riego.fecha).toLocaleString("es-CO", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </p>
                                    <p className="text-sm text-slate-400 mt-1">
                                        {riego.cantidadLitros != null
                                            ? `${riego.cantidadLitros} L`
                                            : "Cantidad no registrada"}
                                        {" · "}
                                        {riego.metodo ?? "manual"}
                                    </p>
                                    {riego.observaciones && (
                                        <p className="text-sm text-slate-500 mt-1">
                                            {riego.observaciones}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => eliminar(riego.id)}
                                    className="rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 px-3 py-1.5 text-sm transition-colors shrink-0"
                                >
                                    Eliminar
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
