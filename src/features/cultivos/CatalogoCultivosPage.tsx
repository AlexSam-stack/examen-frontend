const fichas = [
  { nombre: 'Tomate Chonto', tipo: 'Hortaliza', ciclo: '90-110 días', riego: 'Moderado', suelo: 'Franco arcilloso' },
  { nombre: 'Maíz híbrido', tipo: 'Cereal', ciclo: '120-140 días', riego: 'Regular', suelo: 'Limo arenoso' },
  { nombre: 'Pimentón', tipo: 'Hortaliza', ciclo: '90-120 días', riego: 'Frecuente', suelo: 'Franco bien drenado' },
]

export function CatalogoCultivosPage() {
  return (
    <div className="page-grid">
      <section className="page-intro">
        <div>
          <p className="eyebrow">Biblioteca agrícola</p>
          <h2>Catálogo de cultivos</h2>
          <p>Consulta fichas técnicas para planificar siembra, riego y manejo del suelo.</p>
        </div>
      </section>
      <section className="card-grid">
        {fichas.map((ficha) => (
          <article className="info-card" key={ficha.nombre}>
            <div className="card-header-row"><h3>{ficha.nombre}</h3><span className="status-pill">{ficha.tipo}</span></div>
            <dl className="detail-list compact">
              <div><dt>Ciclo</dt><dd>{ficha.ciclo}</dd></div>
              <div><dt>Riego</dt><dd>{ficha.riego}</dd></div>
              <div><dt>Suelo ideal</dt><dd>{ficha.suelo}</dd></div>
            </dl>
          </article>
        ))}
      </section>
    </div>
  )
}
