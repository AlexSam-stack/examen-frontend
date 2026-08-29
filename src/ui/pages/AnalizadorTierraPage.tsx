export function AnalizadorTierraPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-100">Analizador de tierra</h3>
        </div>
        <p className="text-sm text-slate-400 mb-4">
          Fase 2: ingresar datos del laboratorio o subir análisis para recibir recomendaciones de fertilización.
        </p>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
        >
          Cargar análisis
        </button>
      </section>
    </div>
  )
}