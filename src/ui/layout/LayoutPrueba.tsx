import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Navegacion } from "../components/navegacion";






export default function LayoutPrueba() {
  return (
    <div className={`min-h-screen flex`}>
      <div className="flex w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
        <Navegacion />
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            isAuthenticated={isAuthenticated}
            usuario={user}
            onLogout={onLogout}
          />
          <main className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  isAuthenticated,
  user,
  theme,
  onToggleTheme,
  onLogout,
}) => {
  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            isAuthenticated={isAuthenticated}
            user={user}
            theme={theme}
            onToggleTheme={onToggleTheme}
            onLogout={onLogout}
          />
          <main className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};