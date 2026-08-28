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
    <div className="page-grid">
      <section className="page-intro">
        <div>
          <p className="eyebrow">Consulta rápida</p>
          <h2>Enfermedades frecuentes</h2>
          <p>Identifica síntomas comunes y revisa acciones de manejo antes de solicitar un análisis.</p>
        </div>
        <input className="search-input" type="search" placeholder="Buscar enfermedad" aria-label="Buscar enfermedad" />
      </section>

      <section className="card-grid disease-grid">
        {enfermedades.map((enfermedad) => (
          <article className="info-card disease-card" key={enfermedad.nombre}>
            <div className="disease-icon" aria-hidden="true">+</div>
            <div className="card-header-row"><h3>{enfermedad.nombre}</h3><span className="status-pill">Guía</span></div>
            <p><strong>Afecta:</strong> {enfermedad.cultivo}</p>
            <p><strong>Síntomas:</strong> {enfermedad.sintomas}</p>
            <p><strong>Manejo:</strong> {enfermedad.tratamiento}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
