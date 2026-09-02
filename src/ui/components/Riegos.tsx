import {
    useEffect,
    useState,
    type FormEvent,
} from "react";


import { riegosApi, type Riego, type RiegoRequest } from "../../infraestructura";

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

            } catch (error) {

                setError(
                    error instanceof Error
                        ? error.message
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

        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
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

        } catch (error) {

            setError(
                error instanceof Error
                    ? error.message
                    : "Error al eliminar"
            );
        }
    }

    if (cargando) {
        return <p>Cargando riegos...</p>;
    }

    return (
        <div>

            <h1>Riegos del cultivo</h1>

            {error && (
                <p>{error}</p>
            )}

            <form onSubmit={manejarEnvio}>

                <input
                    type="number"
                    name="cantidadLitros"
                    placeholder="Litros"
                    value={
                        formulario.cantidadLitros ?? ""
                    }
                    onChange={manejarCambio}
                />

                <select
                    name="metodo"
                    value={formulario.metodo}
                    onChange={manejarCambio}
                >
                    <option value="manual">
                        Manual
                    </option>

                    <option value="goteo">
                        Goteo
                    </option>

                    <option value="aspersion">
                        Aspersión
                    </option>
                </select>

                <textarea
                    name="observaciones"
                    placeholder="Observaciones"
                    value={
                        formulario.observaciones
                    }
                    onChange={manejarCambio}
                />

                <button
                    type="submit"
                    disabled={guardando}
                >
                    {guardando
                        ? "Registrando..."
                        : "Registrar riego"}
                </button>

            </form>

            <hr />

            <h2>Historial</h2>

            {riegos.map((riego) => (

                <div key={riego.id}>

                    <p>
                        Fecha:{" "}
                        {new Date(
                            riego.fecha
                        ).toLocaleString()}
                    </p>

                    <p>
                        Litros:{" "}
                        {riego.cantidadLitros}
                    </p>

                    <p>
                        Método: {riego.metodo}
                    </p>

                    <p>
                        {riego.observaciones}
                    </p>

                    <button
                        onClick={() =>
                            eliminar(riego.id)
                        }
                    >
                        Eliminar
                    </button>

                </div>

            ))}

        </div>
    );
}