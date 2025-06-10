import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Hammer, 
  Building, 
  Truck, 
  Paintbrush,
  User,
  LogOut,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  Zap,
  Sun,
  Moon
} from 'lucide-react';
import { useApp } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const MainLayout = () => {
  const { sidebarOpen, toggleSidebar, theme, toggleTheme, isDark } = useApp();
  const { usuario, Logout } = useAuth();
  const location = useLocation();
  const menuItems = [
    {
      title: 'Panel de Control',
      icon: LayoutDashboard,
      path: '/dashboard',
      active: location.pathname === '/dashboard'
    },
    {
      title: 'Demolición',
      icon: Hammer,
      path: '/dashboard/demolicion',
      active: location.pathname === '/dashboard/demolicion'
    },
    {
      title: 'Construcción',
      icon: Building,
      path: '/dashboard/construccion',
      active: location.pathname === '/dashboard/construccion'
    },
    {
      title: 'Excavación',
      icon: Truck,
      path: '/dashboard/excavacion',
      active: location.pathname === '/dashboard/excavacion'
    },
    {
      title: 'Acabados',
      icon: Paintbrush,
      path: '/dashboard/acabados',
      active: location.pathname === '/dashboard/acabados'
    }
  ];
  return (
    <div className="flex h-screen bg-theme-background">      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-overlay backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar optimizado */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-80 transform transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        <div className="h-full bg-surface backdrop-blur-xl border-r border-theme-border shadow-2xl">
            {/* Header del Sidebar */}
          <div className="p-6 border-b border-theme-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Building className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-theme-text">BuildApp</h1>
                  <p className="text-xs text-theme-text-secondary">Construcción Pro</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleTheme}
                  className="p-2 text-theme-text-secondary hover:text-theme-text hover:bg-surface-hover rounded-lg transition-colors"
                  title={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button 
                  onClick={toggleSidebar}
                  className="lg:hidden text-theme-text-secondary hover:text-theme-text p-2 rounded-lg hover:bg-surface-hover"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>                  <Link
                    to={item.path}
                    onClick={() => toggleSidebar()}
                    className={`flex items-center space-x-3 p-4 rounded-2xl transition-all duration-200 group ${
                      item.active
                        ? 'bg-primary text-white shadow-xl'
                        : 'text-theme-text-secondary hover:text-theme-text hover:bg-surface-hover'
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${
                      item.active ? 'bg-white/20' : 'bg-surface-muted group-hover:bg-surface-hover'
                    }`}>
                      <item.icon size={20} />
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>          {/* User Section */}
          <div className="p-4 border-t border-theme-border">
            <div className="flex items-center space-x-3 mb-4 p-3 bg-surface rounded-2xl border border-theme-border">
              <div className="relative">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User className="text-white" size={18} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-theme-background" />
              </div>
              <div>
                <p className="font-medium text-theme-text text-sm">
                  {usuario?.nombre || 'Usuario'}
                </p>
                <p className="text-xs text-theme-text-secondary">
                  {usuario?.rol || 'Supervisor'}
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <button className="flex items-center space-x-2 w-full p-3 text-theme-text-secondary hover:text-theme-text hover:bg-surface-hover rounded-xl transition-colors">
                <Settings size={16} />
                <span className="text-sm">Configuración</span>
              </button>
              <button 
                onClick={Logout}
                className="flex items-center space-x-2 w-full p-3 text-theme-text-secondary hover:text-error hover:bg-error-light rounded-xl transition-colors"
              >
                <LogOut size={16} />
                <span className="text-sm">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">        {/* Header optimizado */}
        <header className="bg-surface backdrop-blur-xl border-b border-theme-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleSidebar}
                className="lg:hidden p-2 text-theme-text-secondary hover:text-theme-text hover:bg-surface-hover rounded-lg"
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-semibold text-theme-text">
                  {menuItems.find(item => item.active)?.title || 'Panel de Control'}
                </h2>
                <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-success-light text-success rounded-full text-xs">
                  <Zap size={12} />
                  <span>Sistema Activo</span>
                </div>
              </div>
            </div>
              <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-surface px-4 py-2 rounded-xl border border-theme-border">
                <Search size={16} className="text-theme-text-secondary" />
                <input 
                  type="text" 
                  placeholder="Buscar..."
                  className="bg-transparent text-theme-text placeholder-theme-text-secondary border-none outline-none w-40"
                />
              </div>
              <button 
                onClick={toggleTheme}
                className="p-2 text-theme-text-secondary hover:text-theme-text hover:bg-surface-hover rounded-lg transition-colors"
                title={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="relative p-2 text-theme-text-secondary hover:text-theme-text hover:bg-surface-hover rounded-lg">
                <Bell size={20} />
                <div className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content optimizado */}
        <main className="flex-1 overflow-y-auto p-8 bg-theme-background-secondary">
            <div className="max-w-7xl mx-auto px-4">
                <Outlet />
            </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;