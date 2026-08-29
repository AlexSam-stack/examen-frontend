import { NavLink } from "react-router-dom";

export function Navegacion() {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
    }`;

  return (
    <aside className="w-64 shrink-0 min-h-screen bg-slate-950 border-r border-slate-800 p-4">
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-slate-100">Mi App</h1>
      </div>
      <nav className="space-y-1">
        <NavLink to="/" className={linkStyle} end>
          Dashboard
        </NavLink>
        <NavLink to="/bitacora" className={linkStyle}>
          Bitácora
        </NavLink>
        <NavLink to="/catalogo" className={linkStyle}>
          Catálogo
        </NavLink>
        <NavLink to="/cultivos" className={linkStyle}>
          Cultivos
        </NavLink>
        <NavLink to="/enfermedades" className={linkStyle}>
          Enfermedades
        </NavLink>
        <NavLink to="/riego" className={linkStyle}>
          Riego
        </NavLink>
        <NavLink to="/analizadorFotos" className={linkStyle}>
          Analizar Fotos
        </NavLink>
        <NavLink to="/analizadorTierra" className={linkStyle}>
          Analizador de tierra
        </NavLink>
      </nav>
    </aside>
  );
}