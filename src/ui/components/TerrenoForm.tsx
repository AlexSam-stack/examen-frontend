import { useState, type FormEvent } from "react";
import type { Terreno, TerrenoRequest } from "../../dominio/Tipos";

const inputClass =
  "rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

type TerrenoFormProps = {
  usuarioId: number;
  terrenoEditar?: Terreno | null;
  onGuardado: (terreno: Terreno) => void;
  onCancelar?: () => void;
  onGuardar: (datos: TerrenoRequest) => Promise<Terreno>;
};

export function TerrenoForm({
  usuarioId,
  terrenoEditar,
  onGuardado,
  onCancelar,
  onGuardar,
}: TerrenoFormProps) {
  const [formulario, setFormulario] = useState<TerrenoRequest>({
    usuarioId,
    nombre: terrenoEditar?.nombre ?? "",
    ubicacion: terrenoEditar?.ubicacion ?? "",
    latitud: terrenoEditar?.latitud ?? undefined,
    longitud: terrenoEditar?.longitud ?? undefined,
    areaHectareas: terrenoEditar?.areaHectareas ?? undefined,
    tipoSuelo: terrenoEditar?.tipoSuelo ?? "",
  });

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  function manejarCambio(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]:
        name === "latitud" || name === "longitud" || name === "areaHectareas"
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

      const guardado = await onGuardar({
        ...formulario,
        usuarioId,
      });

      onGuardado(guardado);
    } catch (fallo) {
      setError(
        fallo instanceof Error ? fallo.message : "No se pudo guardar el terreno"
      );
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form
      onSubmit={manejarEnvio}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-4"
    >
      <h3 className="text-lg font-semibold text-slate-100">
        {terrenoEditar ? "Editar terreno" : "Registrar terreno"}
      </h3>

      <label className="flex flex-col text-sm text-slate-300 gap-1">
        Nombre *
        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
          className={inputClass}
          placeholder="Finca El Roble"
        />
      </label>

      <label className="flex flex-col text-sm text-slate-300 gap-1">
        Ubicación
        <input
          type="text"
          name="ubicacion"
          value={formulario.ubicacion ?? ""}
          onChange={manejarCambio}
          className={inputClass}
          placeholder="Valle del Cauca, Colombia"
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col text-sm text-slate-300 gap-1">
          Latitud
          <input
            type="number"
            name="latitud"
            step="any"
            value={formulario.latitud ?? ""}
            onChange={manejarCambio}
            className={inputClass}
            placeholder="3.4516"
          />
        </label>

        <label className="flex flex-col text-sm text-slate-300 gap-1">
          Longitud
          <input
            type="number"
            name="longitud"
            step="any"
            value={formulario.longitud ?? ""}
            onChange={manejarCambio}
            className={inputClass}
            placeholder="-76.5320"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col text-sm text-slate-300 gap-1">
          Área (hectáreas)
          <input
            type="number"
            name="areaHectareas"
            step="0.01"
            min="0"
            value={formulario.areaHectareas ?? ""}
            onChange={manejarCambio}
            className={inputClass}
            placeholder="2.5"
          />
        </label>

        <label className="flex flex-col text-sm text-slate-300 gap-1">
          Tipo de suelo
          <select
            name="tipoSuelo"
            value={formulario.tipoSuelo ?? ""}
            onChange={manejarCambio}
            className={inputClass}
          >
            <option value="">Seleccionar</option>
            <option value="Arcilloso">Arcilloso</option>
            <option value="Arenoso">Arenoso</option>
            <option value="Franco">Franco</option>
            <option value="Limoso">Limoso</option>
            <option value="Orgánico">Orgánico</option>
          </select>
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={guardando}
          className="rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 font-medium transition-colors"
        >
          {guardando ? "Guardando..." : terrenoEditar ? "Actualizar" : "Registrar"}
        </button>

        {onCancelar && (
          <button
            type="button"
            onClick={onCancelar}
            className="rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 px-4 py-2 text-sm transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
