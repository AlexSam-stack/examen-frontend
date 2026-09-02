import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="flex flex-col gap-10 max-w-3xl">
      <section>
        <p className="text-xs uppercase tracking-wide text-blue-400 font-medium">
          AgroTech
        </p>
        <h1 className="text-4xl font-bold leading-tight text-slate-100 mt-2">
          Lleva el control de tus cultivos, terreno por terreno.
        </h1>
        <p className="mt-4 text-slate-400 text-lg">
          Registra tus terrenos, consulta enfermedades comunes y guarda las que quieras
          vigilar de cerca. Todo en un solo lugar.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/dashboard"
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 transition-colors group"
        >
          <span className="text-2xl">🌾</span>
          <h2 className="text-slate-100 font-semibold mt-3 group-hover:text-blue-400 transition-colors">
            Mis terrenos
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Registra parcelas, área y tipo de suelo.
          </p>
        </Link>

        <Link
          to="/cultivos"
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-colors group"
        >
          <span className="text-2xl">🌱</span>
          <h2 className="text-slate-100 font-semibold mt-3 group-hover:text-emerald-400 transition-colors">
            Cultivos
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Siembra plantas y sigue su estado.
          </p>
        </Link>

        <Link
          to="/riego"
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-cyan-500/50 transition-colors group"
        >
          <span className="text-2xl">💧</span>
          <h2 className="text-slate-100 font-semibold mt-3 group-hover:text-cyan-400 transition-colors">
            Riegos
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Registra fechas y cantidades de agua.
          </p>
        </Link>

        <Link
          to="/abonos"
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-amber-500/50 transition-colors group"
        >
          <span className="text-2xl">🧪</span>
          <h2 className="text-slate-100 font-semibold mt-3 group-hover:text-amber-400 transition-colors">
            Abonos
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Registra fertilizantes por cultivo.
          </p>
        </Link>

        <Link
          to="/diagnostico"
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-violet-500/50 transition-colors group"
        >
          <span className="text-2xl">📷</span>
          <h2 className="text-slate-100 font-semibold mt-3 group-hover:text-violet-400 transition-colors">
            Diagnóstico
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Analiza fotos de tus plantas con IA.
          </p>
        </Link>

        <Link
          to="/analizadorTierra"
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-colors group"
        >
          <span className="text-2xl">🌍</span>
          <h2 className="text-slate-100 font-semibold mt-3 group-hover:text-emerald-400 transition-colors">
            Analizador de tierra
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Ingresa datos de laboratorio del suelo.
          </p>
        </Link>

        <Link
          to="/enfermedades"
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-amber-500/50 transition-colors group"
        >
          <span className="text-2xl">🔬</span>
          <h2 className="text-slate-100 font-semibold mt-3 group-hover:text-amber-400 transition-colors">
            Enfermedades
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Consulta síntomas y guarda favoritos.
          </p>
        </Link>
      </div>
    </div>
  );
}
