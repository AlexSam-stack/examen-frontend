const enfermedades = [
  {
    nombre: 'Mildiu',
    cultivo: 'Tomate y hortalizas',
    sintomas: 'Manchas amarillas y polvo blanquecino en el envés.',
    tratamiento: 'Mejorar ventilación, reducir humedad y aplicar fungicida preventivo.',
  },
  {
    nombre: 'Pulgón',
    cultivo: 'Hortalizas y frutales',
    sintomas: 'Hojas enrolladas, melaza y crecimiento debilitado.',
    tratamiento: 'Retirar focos afectados y aplicar jabón potásico o control biológico.',
  },
  {
    nombre: 'Roya',
    cultivo: 'Maíz y cereales',
    sintomas: 'Pústulas anaranjadas sobre hojas y tallos.',
    tratamiento: 'Retirar material afectado y vigilar la humedad del cultivo.',
  },
]

export function EnfermedadesPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-wide text-blue-400 font-medium">Consulta rápida</p>
          <h2 className="text-2xl font-bold text-slate-100">Enfermedades frecuentes</h2>
          <p className="text-sm text-slate-400">
            Identifica síntomas comunes y revisa acciones de manejo antes de solicitar un análisis.
          </p>
        </div>
        <input
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
          type="search"
          placeholder="Buscar enfermedad"
          aria-label="Buscar enfermedad"
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {enfermedades.map((enfermedad) => (
          <article
            className="relative bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 transition-colors"
            key={enfermedad.nombre}
          >
            <div
              aria-hidden="true"
              className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-3"
            >
              +
            </div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-slate-100 font-semibold">{enfermedad.nombre}</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Guía
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-1.5">
              <strong className="text-slate-300">Afecta:</strong> {enfermedad.cultivo}
            </p>
            <p className="text-sm text-slate-400 mb-1.5">
              <strong className="text-slate-300">Síntomas:</strong> {enfermedad.sintomas}
            </p>
            <p className="text-sm text-slate-400">
              <strong className="text-slate-300">Manejo:</strong> {enfermedad.tratamiento}
            </p>
          </article>
        ))}
      </section>
    </div>
  )
}