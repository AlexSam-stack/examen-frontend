import { Link } from "react-router-dom";

export default function NoEncontrada() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-slate-950 text-center px-4">
      <h1 className="text-5xl font-bold text-blue-500">404</h1>
      <p className="text-slate-400">Esta página no existe en la tienda.</p>
      <Link
        to="/"
        className="mt-2 text-sm text-blue-400 hover:text-blue-300 underline underline-offset-4"
      >
        Volver al catálogo
      </Link>
    </div>
  );
}