import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSesion } from "../../aplicacion/SesionContext";

export function RutaProtegida() {
  const { isAuthenticated, cargando } = useSesion();
  const location = useLocation();

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <span className="text-slate-400 text-sm">Cargando...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}