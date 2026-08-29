import { Link } from "react-router-dom";
import type { Usuario } from "../../dominio/farm";

interface HeaderProps {
  usuario: Usuario | null;
  cerarrSesion: () => void;
}

export function Header({ usuario, cerarrSesion }: HeaderProps) {
  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 px-6 flex items-center justify-end">
      
      <div className="flex items-center gap-4">

        {usuario ? (
          <div className="flex items-center gap-4 border-l border-slate-800 pl-4">
            
            <Link
              to="/perfil"
              className="flex items-center gap-3 text-sm font-medium text-slate-200 hover:opacity-80 transition-opacity"
            >
              <img
                src={usuario.perfil || "https://placehold.co/40x40"}
                alt={`Foto de ${usuario.nombre}`}
                className="w-8 h-8 rounded-full object-cover border border-slate-700"
              />

              <span>
                {usuario.nombre}
              </span>
            </Link>

            <button
              onClick={cerarrSesion}
              className="px-3 py-1.5 text-sm font-medium text-red-400 hover:bg-red-950/50 rounded-lg transition-colors"
              type="button"
            >
              Cerrar Sesión
            </button>

          </div>

        ) : (

          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
          >
            Iniciar Sesión
          </Link>

        )}

      </div>
    </header>
  );
}