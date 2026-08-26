import type { ReactNode } from 'react'
import { navigationItems, type PageId } from '../routes/navigation'
import type { Farm, UserProfile } from '../types/farm'

type MainLayoutProps = {
  currentPage: PageId
  setCurrentPage: (page: PageId) => void
  user: UserProfile
  farm: Farm
  children: ReactNode
}

export function MainLayout({
  currentPage,
  setCurrentPage,
  user,
  farm,
  children,
}: MainLayoutProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">F</div>
          <div>
            <p className="eyebrow">Agricultura digital</p>
            <h2>FincaFlow</h2>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Navegación principal">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={currentPage === item.id ? 'nav-item active' : 'nav-item'}
              onClick={() => setCurrentPage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="profile-card">
          <p className="eyebrow">Perfil</p>
          <strong>{user.name}</strong>
          <span>{user.role}</span>
          <small>{user.finca}</small>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Finca</p>
            <h1>{farm.nombre}</h1>
          </div>
          <div className="topbar-meta">
            <span>{farm.ubicacion}</span>
            <span>{farm.hectareas} ha</span>
          </div>
        </header>

        {children}
      </main>
    </div>
  )
}
