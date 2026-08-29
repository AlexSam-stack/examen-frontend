import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Navegacion } from "../components/navegacion";
import { useSesion } from "../../aplicacion/useSesion";


export default function LayoutPrueba() {
  const {usuario,salir} = useSesion();
  return (
    <div className="flex min-h-screen w-full bg-slate-950 text-slate-100">
      <Navegacion />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          usuario={usuario}
          cerarrSesion={salir}
        />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}