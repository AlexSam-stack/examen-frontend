import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useSesion } from "../../aplicacion/useSesion";
import type { AnalisisTierra, AnalisisTierraRequest, Terreno } from "../../dominio/Tipos";
import { analisisTierraApi, terrenosApi } from "../../infraestructura";
import { IndicadorSuelo } from "../components/IndicadorSuelo";

const inputClass =
  "rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500";

export function AnalizadorTierraPage() {
  const { usuario } = useSesion();
  const [terrenos, setTerrenos] = useState<Terreno[]>([]);
  const [terrenoId, setTerrenoId] = useState<number | "">("");
  const [historial, setHistorial] = useState<AnalisisTierra[]>([]);
  const [ultimoResultado, setUltimoResultado] = useState<AnalisisTierra | null>(null);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const [formulario, setFormulario] = useState<Omit<AnalisisTierraRequest, "terrenoId">>({
    ph: undefined,
    nitrogenoPpm: undefined,
    fosforoPpm: undefined,
    potasioPpm: undefined,
    materiaOrganicaPc: undefined,
    humedadPc: undefined,
  });

  useEffect(() => {
    if (!usuario) return;

    terrenosApi
      .listarPorUsuario(usuario.id)
      .then(setTerrenos)
      .finally(() => setCargando(false));
  }, [usuario?.id]);

  useEffect(() => {
    if (terrenoId === "") {
      setHistorial([]);
      return;
    }

    analisisTierraApi.historial(terrenoId).then(setHistorial).catch(() => setHistorial([]));
  }, [terrenoId]);

  function manejarCambio(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    if (name === "terrenoId") {
      setTerrenoId(value === "" ? "" : Number(value));
      return;
    }

    setFormulario((actual) => ({
      ...actual,
      [name]: value === "" ? undefined : Number(value),
    }));
  }

  async function manejarEnvio(e: FormEvent) {
    e.preventDefault();

    if (terrenoId === "") {
      setError("Selecciona un terreno");
      return;
    }

    try {
      setEnviando(true);
      setError("");

      const resultado = await analisisTierraApi.analizar({
        terrenoId,
        ...formulario,
      });

      setUltimoResultado(resultado);
      setHistorial((actual) => [resultado, ...actual]);
    } catch (fallo) {
      setError(
        fallo instanceof Error ? fallo.message : "No se pudo analizar el suelo"
      );
    } finally {
      setEnviando(false);
    }
  }

  const terrenoSeleccionado = terrenos.find((t) => t.id === terrenoId);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <p className="text-xs uppercase tracking-wide text-emerald-400 font-medium">
          Laboratorio de suelo
        </p>
        <h2 className="text-2xl font-bold text-slate-100">Analizador de tierra</h2>
        <p className="text-sm text-slate-400 mt-1">
          Ingresa los datos de tu análisis de suelo y recibe recomendaciones de fertilización.
        </p>
      </section>

      {cargando ? (
        <p className="text-slate-400">Cargando terrenos...</p>
      ) : terrenos.length === 0 ? (
        <div className="bg-slate-900 border border-dashed border-slate-700 rounded-xl p-8 text-center">
          <p className="text-slate-300">Necesitas un terreno registrado para analizar el suelo.</p>
          <Link
            to="/dashboard"
            className="inline-block mt-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-medium"
          >
            Registrar terreno
          </Link>
        </div>
      ) : (
        <>
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <form
            onSubmit={manejarEnvio}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <label className="flex flex-col text-sm text-slate-300 gap-1 sm:col-span-2 lg:col-span-3">
              Terreno *
              <select
                name="terrenoId"
                value={terrenoId}
                onChange={manejarCambio}
                required
                className={inputClass}
              >
                <option value="">Seleccionar terreno</option>
                {terrenos.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nombre}
                    {t.tipoSuelo ? ` (${t.tipoSuelo})` : ""}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col text-sm text-slate-300 gap-1">
              pH
              <input
                type="number"
                name="ph"
                step="0.1"
                min="0"
                max="14"
                placeholder="6.5"
                value={formulario.ph ?? ""}
                onChange={manejarCambio}
                className={inputClass}
              />
            </label>

            <label className="flex flex-col text-sm text-slate-300 gap-1">
              Nitrógeno (ppm)
              <input
                type="number"
                name="nitrogenoPpm"
                min="0"
                placeholder="40"
                value={formulario.nitrogenoPpm ?? ""}
                onChange={manejarCambio}
                className={inputClass}
              />
            </label>

            <label className="flex flex-col text-sm text-slate-300 gap-1">
              Fósforo (ppm)
              <input
                type="number"
                name="fosforoPpm"
                min="0"
                placeholder="25"
                value={formulario.fosforoPpm ?? ""}
                onChange={manejarCambio}
                className={inputClass}
              />
            </label>

            <label className="flex flex-col text-sm text-slate-300 gap-1">
              Potasio (ppm)
              <input
                type="number"
                name="potasioPpm"
                min="0"
                placeholder="180"
                value={formulario.potasioPpm ?? ""}
                onChange={manejarCambio}
                className={inputClass}
              />
            </label>

            <label className="flex flex-col text-sm text-slate-300 gap-1">
              Materia orgánica (%)
              <input
                type="number"
                name="materiaOrganicaPc"
                step="0.1"
                min="0"
                placeholder="3.5"
                value={formulario.materiaOrganicaPc ?? ""}
                onChange={manejarCambio}
                className={inputClass}
              />
            </label>

            <label className="flex flex-col text-sm text-slate-300 gap-1">
              Humedad (%)
              <input
                type="number"
                name="humedadPc"
                step="0.1"
                min="0"
                max="100"
                placeholder="22"
                value={formulario.humedadPc ?? ""}
                onChange={manejarCambio}
                className={inputClass}
              />
            </label>

            <button
              type="submit"
              disabled={enviando}
              className="sm:col-span-2 lg:col-span-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-4 py-2 font-medium transition-colors w-fit"
            >
              {enviando ? "Analizando..." : "Analizar suelo"}
            </button>
          </form>

          {ultimoResultado && (
            <section className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6">
              <h3 className="text-emerald-400 font-semibold mb-4">
                Resultado — {terrenoSeleccionado?.nombre}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                <IndicadorSuelo etiqueta="pH" valor={ultimoResultado.ph} unidad="" rangoOptimo="5.5 – 7.0" />
                <IndicadorSuelo etiqueta="N" valor={ultimoResultado.nitrogenoPpm} unidad="ppm" rangoOptimo="30 – 50" />
                <IndicadorSuelo etiqueta="P" valor={ultimoResultado.fosforoPpm} unidad="ppm" rangoOptimo="20 – 40" />
                <IndicadorSuelo etiqueta="K" valor={ultimoResultado.potasioPpm} unidad="ppm" rangoOptimo="150 – 250" />
                <IndicadorSuelo etiqueta="M.O." valor={ultimoResultado.materiaOrganicaPc} unidad="%" rangoOptimo="3 – 5" />
                <IndicadorSuelo etiqueta="Humedad" valor={ultimoResultado.humedadPc} unidad="%" rangoOptimo="15 – 25" />
              </div>

              {ultimoResultado.recomendacion && (
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
                    Recomendación
                  </p>
                  <p className="text-slate-200">{ultimoResultado.recomendacion}</p>
                </div>
              )}
            </section>
          )}

          {historial.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-slate-100 mb-4">
                Historial de análisis ({historial.length})
              </h3>
              <div className="space-y-3">
                {historial.map((analisis) => (
                  <article
                    key={analisis.id}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-slate-300 text-sm">
                        {new Date(analisis.fecha).toLocaleString("es-CO", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                      {analisis.ph != null && (
                        <span className="text-xs text-emerald-400">pH {analisis.ph}</span>
                      )}
                    </div>
                    {analisis.recomendacion && (
                      <p className="text-sm text-slate-400">{analisis.recomendacion}</p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
