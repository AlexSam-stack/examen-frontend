import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorito } from "../../aplicacion/useFavorito";
import type { Enfermedad } from "../../dominio/Tipos";
import { NIVEL_RIESGO_LABELS } from "../../dominio/Tipos";
import { enfermedadesApi } from "../../infraestructura";

export default function FavoritosPage() {
  const { favoritos, alternar, esFavorito } = useFavorito();
  const [enfermedades, setEnfermedades] = useState<Enfermedad[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      if (favoritos.length === 0) {
        setEnfermedades([]);
        setCargando(false);
        return;
      }

      try {
        setCargando(true);
        setError("");
        const todas = await enfermedadesApi.listarTodas();
        setEnfermedades(todas.filter((e) => favoritos.includes(e.id)));
      } catch (fallo) {
        setError(
          fallo instanceof Error ? fallo.message : "No se pudieron cargar los favoritos"
        );
      } finally {
        setCargando(false);
      }
    }

    cargar();
  }, [favoritos]);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <p className="text-xs uppercase tracking-wide text-pink-400 font-medium">
          Tu biblioteca
        </p>
        <h2 className="text-2xl font-bold text-slate-100">Enfermedades favoritas</h2>
        <p className="text-sm text-slate-400 mt-1">
          Guardadas en tu dispositivo para consulta rápida.
        </p>
      </section>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {cargando ? (
        <p className="text-slate-400">Cargando favoritos...</p>
      ) : favoritos.length === 0 ? (
        <div className="bg-slate-900 border border-dashed border-slate-700 rounded-xl p-10 text-center">
          <p className="text-4xl mb-3">🤍</p>
          <p className="text-slate-300 font-medium">No tienes favoritos aún</p>
          <p className="text-sm text-slate-500 mt-2">
            Marca enfermedades desde el catálogo para verlas aquí.
          </p>
          <Link
            to="/enfermedades"
            className="inline-block mt-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-medium"
          >
            Explorar enfermedades
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {enfermedades.map((enfermedad) => (
            <article
              key={enfermedad.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-pink-500/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-slate-100 font-semibold text-lg">
                    {enfermedad.nombre}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {enfermedad.tipoPlanta?.nombre ?? "Afecta varias plantas"}
                  </p>
                </div>
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
                {esFavorito(enfermedad.id) ? "❤️ Quitar de favoritos" : "🤍 Agregar"}
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
