import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type {
  Cultivo,
  CultivoRequest,
  EstadoCultivo,
  Terreno,
  TipoPlanta,
} from "../../dominio/Tipos";
import { ESTADO_CULTIVO_LABELS } from "../../dominio/Tipos";
import { completarCultivo, completarCultivos } from "../../dominio/cultivo";
import { cultivosApi, terrenosApi, tiposPlantaApi } from "../../infraestructura";
import { CultivoCard } from "./CultivoCard";

const inputClass =
  "rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500";

type CultivosPorTerrenoProps = {
  terrenoId: number;
};

export function CultivosPorTerreno({ terrenoId }: CultivosPorTerrenoProps) {
  const [cultivos, setCultivos] = useState<Cultivo[]>([]);
  const [tiposPlanta, setTiposPlanta] = useState<TipoPlanta[]>([]);
  const [terreno, setTerreno] = useState<Terreno | null>(null);
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

      const [cultivosData, plantasData, terrenoData] = await Promise.all([
        cultivosApi.listarPorTerreno(terrenoId),
        tiposPlantaApi.listar(),
        terrenosApi.obtener(terrenoId),
      ]);

      setCultivos(
        completarCultivos(cultivosData, {
          terreno: terrenoData,
          tiposPlanta: plantasData,
        })
      );
      setTiposPlanta(plantasData);
      setTerreno(terrenoData);
    } catch (fallo) {
      setError(
        fallo instanceof Error ? fallo.message : "No se pudieron cargar los datos"
      );
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarDatos();
  }, [terrenoId]);

  function manejarCambio(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormulario((actual) => ({
      ...actual,
      [name]: name === "tipoPlantaId" ? Number(value) : value,
    }));
  }

  async function manejarEnvio(e: FormEvent) {
    e.preventDefault();

    try {
      setError("");
      const nuevo = await cultivosApi.crear({ ...formulario, terrenoId });
      setCultivos((actuales) => [
        ...actuales,
        completarCultivo(
          { ...nuevo, tipoPlantaId: formulario.tipoPlantaId },
          { terreno, tiposPlanta }
        ),
      ]);
      setFormulario({
        terrenoId,
        tipoPlantaId: 0,
        fechaSiembra: "",
        estado: "ACTIVO",
        observaciones: "",
      });
    } catch (fallo) {
      setError(
        fallo instanceof Error ? fallo.message : "No se pudo crear el cultivo"
      );
    }
  }

  async function cambiarEstado(id: number, estado: EstadoCultivo) {
    try {
      const actualizado = await cultivosApi.actualizarEstado(id, estado);
      setCultivos((actuales) =>
        actuales.map((c) =>
          c.id === id
            ? completarCultivo(actualizado, {
                anterior: c,
                terreno,
                tiposPlanta,
              })
            : c
        )
      );
    } catch (fallo) {
      setError(
        fallo instanceof Error ? fallo.message : "No se pudo actualizar el estado"
      );
    }
  }

  async function eliminar(id: number) {
    if (!confirm("¿Deseas eliminar este cultivo?")) return;

    try {
      await cultivosApi.eliminar(id);
      setCultivos((actuales) => actuales.filter((c) => c.id !== id));
    } catch (fallo) {
      setError(
        fallo instanceof Error ? fallo.message : "No se pudo eliminar el cultivo"
      );
    }
  }

  if (cargando) {
    return <p className="text-slate-400">Cargando cultivos...</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      <section>
        <Link to="/dashboard" className="text-sm text-blue-400 hover:text-blue-300">
          ← Volver a terrenos
        </Link>
        <h2 className="text-2xl font-bold text-slate-100 mt-2">
          Cultivos en {terreno?.nombre ?? "terreno"}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Registra plantas sembradas y gestiona su estado.
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
        <h3 className="sm:col-span-2 text-lg font-semibold text-slate-100">
          Nuevo cultivo
        </h3>

        <label className="flex flex-col text-sm text-slate-300 gap-1">
          Planta *
          <select
            name="tipoPlantaId"
            value={formulario.tipoPlantaId}
            onChange={manejarCambio}
            required
            className={inputClass}
          >
            <option value={0}>Seleccionar planta</option>
            {tiposPlanta.map((planta) => (
              <option key={planta.id} value={planta.id}>
                {planta.nombre}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col text-sm text-slate-300 gap-1">
          Fecha de siembra *
          <input
            type="date"
            name="fechaSiembra"
            value={formulario.fechaSiembra}
            onChange={manejarCambio}
            required
            className={inputClass}
          />
        </label>

        <label className="flex flex-col text-sm text-slate-300 gap-1">
          Estado
          <select
            name="estado"
            value={formulario.estado}
            onChange={manejarCambio}
            className={inputClass}
          >
            {Object.entries(ESTADO_CULTIVO_LABELS).map(([valor, etiqueta]) => (
              <option key={valor} value={valor}>
                {etiqueta}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col text-sm text-slate-300 gap-1 sm:col-span-2">
          Observaciones
          <textarea
            name="observaciones"
            value={formulario.observaciones}
            onChange={manejarCambio}
            placeholder="Notas sobre el cultivo..."
            className={`${inputClass} min-h-[80px]`}
          />
        </label>

        <button
          type="submit"
          className="sm:col-span-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 font-medium transition-colors w-fit"
        >
          Crear cultivo
        </button>
      </form>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {cultivos.length === 0 ? (
          <p className="text-slate-400 col-span-full">
            No hay cultivos en este terreno. Registra el primero arriba.
          </p>
        ) : (
          cultivos.map((cultivo) => (
            <div key={cultivo.id} className="flex flex-col gap-2">
              <CultivoCard cultivo={cultivo} />
              <div className="flex flex-wrap gap-2 px-1">
                <Link
                  to={`/riego/${cultivo.id}`}
                  className="rounded-lg bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/30 border border-cyan-500/20 px-3 py-1.5 text-sm transition-colors"
                >
                  Riegos
                </Link>
                <Link
                  to={`/abonos/${cultivo.id}`}
                  className="rounded-lg bg-amber-600/20 text-amber-400 hover:bg-amber-600/30 border border-amber-500/20 px-3 py-1.5 text-sm transition-colors"
                >
                  Abonos
                </Link>
                <Link
                  to={`/diagnostico/${cultivo.id}`}
                  className="rounded-lg bg-violet-600/20 text-violet-400 hover:bg-violet-600/30 border border-violet-500/20 px-3 py-1.5 text-sm transition-colors"
                >
                  Diagnóstico
                </Link>
                <select
                  value={cultivo.estado}
                  onChange={(e) =>
                    cambiarEstado(cultivo.id, e.target.value as EstadoCultivo)
                  }
                  className="rounded-lg border border-slate-700 bg-slate-900 text-slate-300 px-2 py-1.5 text-sm"
                >
                  {Object.entries(ESTADO_CULTIVO_LABELS).map(([valor, etiqueta]) => (
                    <option key={valor} value={valor}>
                      {etiqueta}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => eliminar(cultivo.id)}
                  className="rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 px-3 py-1.5 text-sm transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
