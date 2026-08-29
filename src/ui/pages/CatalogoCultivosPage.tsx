const fichas = [
  { nombre: 'Tomate Chonto', tipo: 'Hortaliza', ciclo: '90-110 días', riego: 'Moderado', suelo: 'Franco arcilloso' },
  { nombre: 'Maíz híbrido', tipo: 'Cereal', ciclo: '120-140 días', riego: 'Regular', suelo: 'Limo arenoso' },
  { nombre: 'Pimentón', tipo: 'Hortaliza', ciclo: '90-120 días', riego: 'Frecuente', suelo: 'Franco bien drenado' },
]

export function CatalogoCultivosPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-wide text-blue-400 font-medium">Biblioteca agrícola</p>
        <h2 className="text-2xl font-bold text-slate-100">Catálogo de cultivos</h2>
        <p className="text-sm text-slate-400">
          Consulta fichas técnicas para planificar siembra, riego y manejo del suelo.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fichas.map((ficha) => (
          <article
            className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-blue-500/50 transition-colors"
            key={ficha.nombre}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-slate-100 font-semibold">{ficha.nombre}</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {ficha.tipo}
              </span>
            </div>
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Ciclo</dt>
                <dd className="text-slate-300">{ficha.ciclo}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Riego</dt>
                <dd className="text-slate-300">{ficha.riego}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Suelo ideal</dt>
                <dd className="text-slate-300">{ficha.suelo}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </div>
  )
}