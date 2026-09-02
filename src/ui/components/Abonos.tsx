import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { abonosApi, type Abono, type AbonoRequest } from "../../infraestructura";

const inputClass =
  "rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500";

interface AbonosProps {
  cultivoId: number;
}

export default function Abonos({ cultivoId }: AbonosProps) {
  const [abonos, setAbonos] = useState<Abono[]>([]);
  const [formulario, setFormulario] = useState<AbonoRequest>({
    cultivoId,
    tipoAbono: "organico",
    cantidadKg: undefined,
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
        const data = await abonosApi.listarPorCultivo(cultivoId);
        setAbonos(data);
      } catch (fallo) {
        setError(
          fallo instanceof Error ? fallo.message : "Error al cargar los abonos"
        );
      } finally {
        setCargando(false);
      }
    }

    cargar();
  }, [cultivoId]);

  function manejarCambio(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormulario((actual) => ({
      ...actual,
      [name]:
        name === "cantidadKg"
          ? value === ""
            ? undefined
            : Number(value)
          : value,
    }));
  }

  async function manejarEnvio(e: FormEvent) {
    e.preventDefault();

    try {
      setGuardando(true);
      setError("");
      const nuevo = await abonosApi.registrar({ ...formulario, cultivoId });
      setAbonos((actuales) => [...actuales, nuevo]);
      setFormulario({
        cultivoId,
        tipoAbono: "organico",
        cantidadKg: undefined,
        observaciones: "",
      });
    } catch (fallo) {
      setError(
        fallo instanceof Error ? fallo.message : "Error al registrar el abono"
      );
    } finally {
      setGuardando(false);
    }
  }

  async function eliminar(id: number) {
    if (!confirm("¿Eliminar este abono?")) return;

    try {
      await abonosApi.eliminar(id);
      setAbonos((actuales) => actuales.filter((a) => a.id !== id));
    } catch (fallo) {
      setError(fallo instanceof Error ? fallo.message : "Error al eliminar");
    }
  }

  if (cargando) {
    return <p className="text-slate-400">Cargando abonos...</p>;
  }

  const cultivoNombre = abonos[0]?.cultivo?.tipoPlanta?.nombre;

  return (
    <div className="flex flex-col gap-8">
      <section>
        <Link to="/abonos" className="text-sm text-amber-400 hover:text-amber-300">
          ← Volver a selección
        </Link>
        <h1 className="text-2xl font-bold text-slate-100 mt-2">
          Abonos{cultivoNombre ? ` — ${cultivoNombre}` : ""}
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Registra fertilizantes aplicados al cultivo.
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
          Nuevo abono
        </h2>

        <label className="flex flex-col text-sm text-slate-300 gap-1">
          Tipo de abono *
          <select
            name="tipoAbono"
            value={formulario.tipoAbono}
            onChange={manejarCambio}
            required
            className={inputClass}
          >
            <option value="organico">Orgánico</option>
            <option value="quimico">Químico</option>
            <option value="foliar">Foliar</option>
          </select>
        </label>

        <label className="flex flex-col text-sm text-slate-300 gap-1">
          Cantidad (kg)
          <input
            type="number"
            name="cantidadKg"
            min="0"
            step="0.1"
            placeholder="Ej: 25"
            value={formulario.cantidadKg ?? ""}
            onChange={manejarCambio}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col text-sm text-slate-300 gap-1 sm:col-span-2">
          Observaciones
          <textarea
            name="observaciones"
            placeholder="Marca, composición, modo de aplicación..."
            value={formulario.observaciones}
            onChange={manejarCambio}
            className={`${inputClass} min-h-[80px]`}
          />
        </label>

        <button
          type="submit"
          disabled={guardando}
          className="sm:col-span-2 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white px-4 py-2 font-medium transition-colors w-fit"
        >
          {guardando ? "Registrando..." : "Registrar abono"}
        </button>
      </form>

      <section>
        <h2 className="text-lg font-semibold text-slate-100 mb-4">
          Historial ({abonos.length})
        </h2>

        {abonos.length === 0 ? (
          <p className="text-slate-400">Aún no hay abonos registrados.</p>
        ) : (
          <div className="space-y-3">
            {abonos.map((abono) => (
              <article
                key={abono.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <p className="text-slate-100 font-medium capitalize">
                    {abono.tipoAbono}
                    {abono.cantidadKg != null && ` · ${abono.cantidadKg} kg`}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    {new Date(abono.fecha).toLocaleString("es-CO", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  {abono.observaciones && (
                    <p className="text-sm text-slate-500 mt-1">{abono.observaciones}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => eliminar(abono.id)}
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
