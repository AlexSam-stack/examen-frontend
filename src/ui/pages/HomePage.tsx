import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-start justify-center px-4">
      <h1 className="font-display text-4xl font-semibold leading-tight text-field-900">
        Lleva el control de tus cultivos, terreno por terreno.
      </h1>
      <p className="mt-4 max-w-lg text-field-700/80">
        Registra tus terrenos, consulta enfermedades comunes y guarda las que quieras
        vigilar de cerca. Todo en un solo lugar.
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/enfermedades">
          Explorar catálogo
        </Link>
        <Link to="/dashboard">
          Ir a mis terrenos
        </Link>
      </div>
    </div>
  );
}
