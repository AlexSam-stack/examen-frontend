import { NavLink } from "react-router-dom";



export function Navegacion() {

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white dark:bg-blue-500'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`;

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 transition-colors">
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Mi App</h1>
      </div>
      <nav className="space-y-1">
        <NavLink to="/dashboard" className={linkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/bitacora" className={linkStyle}>
          Bitacora 
        </NavLink>
        <NavLink to="/catalogo" className={linkStyle}>
          Catalogo
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
};