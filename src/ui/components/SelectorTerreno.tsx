import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSesion } from "../../aplicacion/useSesion";
import type { Terreno } from "../../dominio/Tipos";
import { terrenosApi } from "../../infraestructura";

export function SelectorTerreno() {
  const { usuario } = useSesion();
  const [terrenos, setTerrenos] = useState<Terreno[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!usuario) {
      setCargando(false);
      return;
    }

    terrenosApi
      .listarPorUsuario(usuario.id)
      .then(setTerrenos)
      .catch(() => setTerrenos([]))
      .finally(() => setCargando(false));
  }, [usuario?.id]);

  if (cargando) return <p className="text-slate-400">Cargando terrenos...</p>;

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="text-2xl font-bold text-slate-100">Cultivos</h2>
        <p className="text-sm text-slate-400 mt-1">
          Selecciona un terreno para ver o registrar cultivos.
        </p>
      </section>

      {terrenos.length === 0 ? (
        <div className="bg-slate-900 border border-dashed border-slate-700 rounded-xl p-8 text-center">
          <p className="text-slate-300">Primero necesitas registrar un terreno.</p>
          <Link
            to="/dashboard"
            className="inline-block mt-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-medium"
          >
            Ir al dashboard
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {terrenos.map((terreno) => (
            <Link
              key={terreno.id}
              to={`/terrenos/${terreno.id}/cultivos`}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-blue-500/50 transition-colors"
            >
              <h3 className="text-slate-100 font-semibold">{terreno.nombre}</h3>
              <p className="text-sm text-slate-400 mt-1">
                {terreno.ubicacion ?? "Sin ubicación"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
