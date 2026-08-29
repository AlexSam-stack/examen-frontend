import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSesion } from "../../aplicacion/useSesion";

export default function Login() {
  const { entrar } = useSesion();
  const navegar = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function manejarEnvio(e: FormEvent) {
    e.preventDefault();
    setError('');
    setEnviando(true);
    try {
      await entrar(usuario, clave);
      navegar('/');
    } catch (fallo) {
      setError(fallo instanceof Error ? fallo.message : 'No se puede iniciar sesion');
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
        <h1 className="text-2xl font-bold text-slate-100 text-center mb-2">Inicia Sesión</h1>

        <label className="flex flex-col text-sm text-slate-300 gap-1">
          Usuario
          <input
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </label>

        <label className="flex flex-col text-sm text-slate-300 gap-1">
          Contraseña
          <input
            type="password"
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
        </label>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          disabled={enviando}
          type="submit"
          className="mt-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 font-medium transition-colors"
        >
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}