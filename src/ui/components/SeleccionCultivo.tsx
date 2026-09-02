import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSesion } from "../../aplicacion/useSesion";
import type { Cultivo, Terreno } from "../../dominio/Tipos";
import { cultivosApi, terrenosApi } from "../../infraestructura";
import { completarCultivos } from "../../dominio/cultivo";

type SeleccionCultivoProps = {
  titulo: string;
  subtitulo: string;
  rutaDestino: string;
  etiquetaAccion: string;
  colorActivo: string;
  colorHover: string;
};

export function SeleccionCultivo({
  titulo,
  subtitulo,
  rutaDestino,
  etiquetaAccion,
  colorActivo,
  colorHover,
}: SeleccionCultivoProps) {
  const { usuario } = useSesion();
  const [terrenos, setTerrenos] = useState<Terreno[]>([]);
  const [terrenoSeleccionado, setTerrenoSeleccionado] = useState<number | null>(null);
  const [cultivos, setCultivos] = useState<Cultivo[]>([]);
  const [cargandoTerrenos, setCargandoTerrenos] = useState(true);
  const [cargandoCultivos, setCargandoCultivos] = useState(false);

  useEffect(() => {
    if (!usuario) return;

    terrenosApi
      .listarPorUsuario(usuario.id)
      .then(setTerrenos)
      .finally(() => setCargandoTerrenos(false));
  }, [usuario?.id]);

  useEffect(() => {
    if (!terrenoSeleccionado) {
      setCultivos([]);
      return;
    }

    setCargandoCultivos(true);
    cultivosApi
      .listarPorTerreno(terrenoSeleccionado)
      .then((data) =>
        setCultivos(
          completarCultivos(data, {
            terreno: terrenos.find((t) => t.id === terrenoSeleccionado) ?? null,
          })
        )
      )
      .catch(() => setCultivos([]))
      .finally(() => setCargandoCultivos(false));
  }, [terrenoSeleccionado, terrenos]);

  if (cargandoTerrenos) {
    return <p className="text-slate-400">Cargando...</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="text-2xl font-bold text-slate-100">{titulo}</h2>
        <p className="text-sm text-slate-400 mt-1">{subtitulo}</p>
      </section>

      {terrenos.length === 0 ? (
        <div className="bg-slate-900 border border-dashed border-slate-700 rounded-xl p-8 text-center">
          <p className="text-slate-300">Registra un terreno y cultivo primero.</p>
          <Link
            to="/dashboard"
            className="inline-block mt-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-medium"
          >
            Ir al dashboard
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {terrenos.map((terreno) => (
              <button
                key={terreno.id}
                type="button"
                onClick={() => setTerrenoSeleccionado(terreno.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  terrenoSeleccionado === terreno.id
                    ? colorActivo
                    : "bg-slate-900 border border-slate-700 text-slate-300 hover:border-slate-500"
                }`}
              >
                {terreno.nombre}
              </button>
            ))}
          </div>

          {terrenoSeleccionado && (
            <section>
              {cargandoCultivos ? (
                <p className="text-slate-400">Cargando cultivos...</p>
              ) : cultivos.length === 0 ? (
                <p className="text-slate-400">
                  Este terreno no tiene cultivos.{" "}
                  <Link
                    to={`/terrenos/${terrenoSeleccionado}/cultivos`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Agregar cultivo
                  </Link>
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cultivos.map((cultivo) => (
                    <Link
                      key={cultivo.id}
                      to={`${rutaDestino}/${cultivo.id}`}
                      className={`bg-slate-900 border border-slate-800 rounded-xl p-4 transition-colors ${colorHover}`}
                    >
                      <h3 className="text-slate-100 font-semibold">
                        {cultivo.tipoPlanta?.nombre ?? "Planta sin identificar"}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        Siembra: {cultivo.fechaSiembra}
                      </p>
                      <p className="text-xs mt-2 opacity-80">{etiquetaAccion} →</p>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}
