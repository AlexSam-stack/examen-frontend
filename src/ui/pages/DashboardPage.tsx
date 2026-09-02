import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSesion } from "../../aplicacion/useSesion";
import type { Terreno } from "../../dominio/Tipos";
import { terrenosApi } from "../../infraestructura";
import { TerrenoCard } from "../components/TerrenoCard";
import { TerrenoForm } from "../components/TerrenoForm";

export default function DashboardPage() {
  const { usuario } = useSesion();
  const [terrenos, setTerrenos] = useState<Terreno[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [terrenoEditar, setTerrenoEditar] = useState<Terreno | null>(null);

  async function cargarTerrenos() {
    if (!usuario) return;

    try {
      setCargando(true);
      setError("");
      const data = await terrenosApi.listarPorUsuario(usuario.id);
      setTerrenos(data);
    } catch (fallo) {
      setError(
        fallo instanceof Error ? fallo.message : "No se pudieron cargar los terrenos"
      );
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarTerrenos();
  }, [usuario?.id]);

  async function eliminarTerreno(id: number) {
    if (!confirm("¿Eliminar este terreno y sus cultivos asociados?")) return;

    try {
      await terrenosApi.eliminar(id);
      setTerrenos((actuales) => actuales.filter((t) => t.id !== id));
    } catch (fallo) {
      setError(
        fallo instanceof Error ? fallo.message : "No se pudo eliminar el terreno"
      );
    }
  }

  function alGuardar(terreno: Terreno) {
    setTerrenos((actuales) => {
      const existe = actuales.some((t) => t.id === terreno.id);
      return existe
        ? actuales.map((t) => (t.id === terreno.id ? terreno : t))
        : [...actuales, terreno];
    });
    setMostrarFormulario(false);
    setTerrenoEditar(null);
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-blue-400 font-medium">
            Panel de control
          </p>
          <h2 className="text-2xl font-bold text-slate-100">Mis terrenos</h2>
          <p className="text-sm text-slate-400 mt-1">
            Registra parcelas, gestiona cultivos y programa riegos por terreno.
          </p>
        </div>

        {!mostrarFormulario && (
          <button
            type="button"
            onClick={() => {
              setTerrenoEditar(null);
              setMostrarFormulario(true);
            }}
            className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 font-medium transition-colors shrink-0"
          >
            + Nuevo terreno
          </button>
        )}
      </section>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {mostrarFormulario && usuario && (
        <TerrenoForm
          usuarioId={usuario.id}
          terrenoEditar={terrenoEditar}
          onGuardado={alGuardar}
          onCancelar={() => {
            setMostrarFormulario(false);
            setTerrenoEditar(null);
          }}
          onGuardar={(datos) =>
            terrenoEditar
              ? terrenosApi.actualizar(terrenoEditar.id, datos)
              : terrenosApi.crear(datos)
          }
        />
      )}

      {cargando ? (
        <p className="text-slate-400">Cargando terrenos...</p>
      ) : terrenos.length === 0 ? (
        <div className="bg-slate-900 border border-dashed border-slate-700 rounded-xl p-10 text-center">
          <p className="text-slate-300 font-medium">Aún no tienes terrenos registrados</p>
          <p className="text-sm text-slate-500 mt-2">
            Comienza registrando tu primera parcela para agregar cultivos y riegos.
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {terrenos.map((terreno) => (
            <div key={terreno.id} className="flex flex-col gap-2">
              <TerrenoCard terreno={terreno} />
              <div className="flex gap-2 px-1">
                <Link
                  to={`/terrenos/${terreno.id}/cultivos`}
                  className="flex-1 text-center rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/20 px-3 py-1.5 text-sm transition-colors"
                >
                  Ver cultivos
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setTerrenoEditar(terreno);
                    setMostrarFormulario(true);
                  }}
                  className="rounded-lg border border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800 px-3 py-1.5 text-sm transition-colors"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => eliminarTerreno(terreno.id)}
                  className="rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 px-3 py-1.5 text-sm transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
