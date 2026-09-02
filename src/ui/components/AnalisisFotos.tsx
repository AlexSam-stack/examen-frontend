import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { analisisFotosApi } from "../../infraestructura";
import type { AnalisisFoto, AnalisisFotoResponse } from "../../dominio/Tipos";

interface AnalisisFotosProps {
  cultivoId: number;
}

export default function AnalisisFotos({ cultivoId }: AnalisisFotosProps) {
  const [historial, setHistorial] = useState<AnalisisFoto[]>([]);
  const [resultado, setResultado] = useState<AnalisisFotoResponse | null>(null);
  const [vistaPrevia, setVistaPrevia] = useState<string | null>(null);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [cargando, setCargando] = useState(true);
  const [analizando, setAnalizando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        setCargando(true);
        setError("");
        const data = await analisisFotosApi.historial(cultivoId);
        setHistorial(data);
      } catch (fallo) {
        setError(
          fallo instanceof Error ? fallo.message : "Error al cargar el historial"
        );
      } finally {
        setCargando(false);
      }
    }

    cargar();
  }, [cultivoId]);

  function manejarArchivo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen válido");
      return;
    }

    setArchivo(file);
    setError("");
    setResultado(null);

    const reader = new FileReader();
    reader.onload = () => setVistaPrevia(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function analizar() {
    if (!archivo) {
      setError("Selecciona una imagen primero");
      return;
    }

    try {
      setAnalizando(true);
      setError("");
      const respuesta = await analisisFotosApi.analizar(cultivoId, archivo);
      setResultado(respuesta);

      const actualizado = await analisisFotosApi.historial(cultivoId);
      setHistorial(actualizado);
    } catch (fallo) {
      setError(
        fallo instanceof Error ? fallo.message : "Error al analizar la imagen"
      );
    } finally {
      setAnalizando(false);
    }
  }

  if (cargando) {
    return <p className="text-slate-400">Cargando...</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      <section>
        <Link to="/diagnostico" className="text-sm text-violet-400 hover:text-violet-300">
          ← Volver a selección
        </Link>
        <h1 className="text-2xl font-bold text-slate-100 mt-2">
          Diagnóstico por foto
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Sube una foto de la planta para obtener un diagnóstico automático.
        </p>
      </section>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col text-sm text-slate-300 gap-2">
            Imagen de la planta
            <input
              type="file"
              accept="image/*"
              onChange={manejarArchivo}
              className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-violet-600 file:text-white file:cursor-pointer hover:file:bg-violet-500"
            />
          </label>

          {vistaPrevia && (
            <img
              src={vistaPrevia}
              alt="Vista previa"
              className="rounded-lg border border-slate-700 max-h-64 object-cover w-full"
            />
          )}

          <button
            type="button"
            onClick={analizar}
            disabled={!archivo || analizando}
            className="rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white px-4 py-2 font-medium transition-colors w-fit"
          >
            {analizando ? "Analizando..." : "Analizar imagen"}
          </button>
        </div>

        {resultado && (
          <div className="bg-slate-950 border border-violet-500/30 rounded-xl p-5">
            <h3 className="text-violet-400 font-semibold mb-3">Resultado</h3>

            {resultado.diagnostico && (
              <p className="text-slate-100 text-lg font-medium">
                {resultado.diagnostico}
              </p>
            )}

            {resultado.confianza != null && (
              <p className="text-sm text-slate-400 mt-2">
                Confianza: {resultado.confianza.toFixed(1)}%
              </p>
            )}

            {resultado.recomendacion && (
              <p className="text-sm text-slate-300 mt-3">
                <span className="text-slate-500">Recomendación: </span>
                {resultado.recomendacion}
              </p>
            )}

            {resultado.predicciones.length > 0 && (
              <ul className="mt-4 space-y-2">
                {resultado.predicciones.map((pred) => (
                  <li
                    key={pred.clase}
                    className="flex justify-between text-sm bg-slate-900 rounded-lg px-3 py-2"
                  >
                    <span className="text-slate-300">{pred.clase}</span>
                    <span className="text-violet-400">{pred.confianza.toFixed(1)}%</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-100 mb-4">
          Historial ({historial.length})
        </h2>

        {historial.length === 0 ? (
          <p className="text-slate-400">Sin análisis previos para este cultivo.</p>
        ) : (
          <div className="space-y-3">
            {historial.map((item) => (
              <article
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-4"
              >
                {item.imagenUrl && (
                  <img
                    src={item.imagenUrl}
                    alt="Análisis"
                    className="w-24 h-24 rounded-lg object-cover border border-slate-700 shrink-0"
                  />
                )}
                <div>
                  <p className="text-slate-100 font-medium">
                    {item.diagnostico ?? "Sin diagnóstico"}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    {new Date(item.fecha).toLocaleString("es-CO", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                    {item.confianza != null && ` · ${item.confianza.toFixed(1)}%`}
                  </p>
                  {item.recomendacion && (
                    <p className="text-sm text-slate-500 mt-1">{item.recomendacion}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
