import { useState } from 'react'
import { AppRoutes } from './routes/AppRoutes'
import { AuthPage } from './features/auth/AuthPage'
import { MainLayout } from './layouts/MainLayout'
import { FarmProvider, useFarm } from './context/FarmContext'
import './App.css'

function AppShell() {
  const { user, farm, isAuthenticated, setAuthenticated } = useFarm()
  const [currentPage, setCurrentPage] = useState('dashboard')

  if (!isAuthenticated) {
    return <AuthPage onLogin={() => setAuthenticated(true)} />
  }

  return (
    <MainLayout
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      user={user}
      farm={farm}
    >
      <AppRoutes currentPage={currentPage} />
    </MainLayout>
  )
}

export default function App() {
  return (
    <FarmProvider>
      <AppShell />
    </FarmProvider>
  )
}
