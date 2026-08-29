import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSesion } from "../../aplicacion/useSesion";


export function RutaProtegida() {
  const {usuario} = useSesion();
  const location = useLocation();
  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}