type AuthPageProps = {
  onLogin: () => void
}

export function AuthPage({ onLogin }: AuthPageProps) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-badge">FincaFlow</div>
        <h1>Controla tu finca con datos en tiempo real</h1>
        <p>
          Gestiona terrenos, cultivos, riegos y bitácora de forma centralizada para tu
          operación agrícola.
        </p>

        <div className="auth-form">
          <label>
            Correo
            <input type="email" defaultValue="maria@fincaloslaureles.com" />
          </label>
          <label>
            Contraseña
            <input type="password" defaultValue="********" />
          </label>
          <button type="button" className="primary-button" onClick={onLogin}>
            Iniciar sesión
          </button>
        </div>

        <div className="auth-highlights">
          <span>• Perfil de finca</span>
          <span>• Terrenos y parcelas</span>
          <span>• Bitácora de riego</span>
        </div>
      </div>
    </div>
  )
}
