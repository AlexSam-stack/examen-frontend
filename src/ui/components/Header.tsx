import { Link } from "react-router-dom";
import type { UserProfile } from "../../dominio/farm";



interface HeaderProps{
  isAuthenticated: boolean;
  usuario: UserProfile | null;
  onLogout: () => void;
}

export function Header ({isAuthenticated,usuario,onLogout}: HeaderProps) {
  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-end transition-colors">
      <div className="flex items-center gap-4">
        {/* Sección Autenticación */}
        {isAuthenticated ? (
          <div className="flex items-center gap-4 border-l border-gray-200 dark:border-gray-700 pl-4">
            <Link
              to="/perfil"
              className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:opacity-80 transition-opacity"
            >
              <img
                src={usuario?.perfil || 'https://via.placeholder.com/40'}
                alt={`Foto de ${usuario?.name || 'usuario'}`}
                className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
              />
              <span>{usuario?.name || 'Mi Perfil'}</span>
            </Link>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors"
              type="button"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </header>
  );
};