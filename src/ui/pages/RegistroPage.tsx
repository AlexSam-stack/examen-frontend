import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { useSesion } from "../../aplicacion/useSesion";
import type { RegistroRequest } from "../../dominio/Tipos";

const inputClass =
  "rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

export default function RegistroPage() {
  const { registrar } = useSesion();
  const navegar = useNavigate();

  const [datos, setDatos] = useState<RegistroRequest>({
    nombre: "",
    email: "",
    password: "",
  });

  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  function manejarCambio(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDatos((actuales) => ({ ...actuales, [name]: value }));
  }

  async function manejarEnvio(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (datos.password !== confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (datos.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setEnviando(true);

    try {
      await registrar(datos);
      navegar("/dashboard");
    } catch (fallo) {
      setError(
        fallo instanceof Error ? fallo.message : "No se pudo crear la cuenta"
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={manejarEnvio}
        className="w-full max-w-sm flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-8"
      >
        <h1 className="text-2xl font-bold text-slate-100 text-center mb-2">
          Crear cuenta
        </h1>
        <p className="text-sm text-slate-400 text-center -mt-2">
          Únete para gestionar tus terrenos y cultivos
        </p>

        <label className="flex flex-col text-sm text-slate-300 gap-1">
          Nombre
          <input
            type="text"
            name="nombre"
            value={datos.nombre}
            onChange={manejarCambio}
            required
            className={inputClass}
            placeholder="Tu nombre"
          />
        </label>

        <label className="flex flex-col text-sm text-slate-300 gap-1">
          Email
          <input
            type="email"
            name="email"
            value={datos.email}
            onChange={manejarCambio}
            required
            className={inputClass}
            placeholder="correo@ejemplo.com"
          />
        </label>

        <label className="flex flex-col text-sm text-slate-300 gap-1">
          Contraseña
          <input
            type="password"
            name="password"
            value={datos.password}
            onChange={manejarCambio}
            required
            minLength={6}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col text-sm text-slate-300 gap-1">
          Confirmar contraseña
          <input
            type="password"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            required
            className={inputClass}
          />
        </label>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          disabled={enviando}
          type="submit"
          className="mt-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 font-medium transition-colors"
        >
          {enviando ? "Creando cuenta..." : "Registrarse"}
        </button>

        <p className="text-sm text-slate-400 text-center">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
