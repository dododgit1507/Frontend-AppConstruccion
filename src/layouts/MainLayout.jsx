import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
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
  Moon,
  MessageSquare,
  ChevronDown,
  Building2
} from 'lucide-react';
import { useApp } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useProyecto } from '../context/ProyectoContext';
import { useState } from 'react';
import AIChat from '../components/AIChat/AIChat';

const MainLayout = () => {
  const { sidebarOpen, toggleSidebar, theme, toggleTheme, isDark } = useApp();
  const { usuario, Logout } = useAuth();
  const { proyectoActual, cambiarProyecto } = useProyecto();
  const location = useLocation();
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
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
    },
    {
      title: 'Administración',
      icon: Settings,
      path: '/dashboard/administracion',
      active: location.pathname === '/dashboard/administracion'
    }
  ]; return (
    <div className="flex h-screen bg-theme-background">      {/* Overlay para móvil con transición */}
      <div
        className={`fixed inset-0 bg-overlay z-40 overlay-transition ${sidebarOpen
          ? 'opacity-100 visible'
          : 'opacity-0 invisible'
          }`}
        onClick={toggleSidebar}
      />{/* Sidebar optimizado con transiciones mejoradas */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 transform sidebar-transition ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full bg-surface backdrop-blur-xl border-r border-theme-border shadow-2xl sidebar-content"
          style={{
            transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
          }}>
          {/* Header del Sidebar */}
          <div className="p-6 border-b border-theme-border"
            style={{ transition: 'border-color 0.3s ease' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center shadow-lg">
                  <img src="/img/c4-logo.jpg" className="w-8 h-8 rounded-lg" alt="C4 Logo" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-theme-text">C4</h1>
                  <p className="text-xs text-theme-text-secondary">Constructicon</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 text-theme-text-secondary hover:text-theme-text hover:bg-surface-hover rounded-lg transition-colors"
                  title={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>                <button
                  onClick={toggleSidebar}
                  className="lg:hidden text-theme-text-secondary hover:text-theme-text p-2 rounded-lg hover:bg-surface-hover menu-button"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Proyecto Seleccionado */}
          <div className="px-4 py-3 mt-2 mb-4 bg-surface-hover rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 size={18} className="text-primary" />
                <div>
                  <p className="text-xs text-theme-text-secondary">Proyecto actual:</p>
                  <h3 className="text-sm font-medium text-theme-text truncate max-w-[180px]">
                    {proyectoActual ? proyectoActual.nombre : 'Sin proyecto'}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => {
                  cambiarProyecto();
                  navigate('/seleccion-proyecto');
                }}
                className="p-1.5 text-theme-text-secondary hover:text-theme-text hover:bg-surface rounded-lg transition-colors"
                title="Cambiar proyecto"
              >
                <ChevronDown size={16} />
              </button>
            </div>
            {proyectoActual && (
              <div className="mt-2 text-xs text-theme-text-secondary">
                <div className="flex justify-between">
                  <span>Estado:</span>
                  <span className="font-medium capitalize">{proyectoActual.estado}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Responsable:</span>
                  <span className="font-medium">{proyectoActual.responsable}</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => toggleSidebar()}
                    className={`flex items-center space-x-3 p-4 rounded-2xl sidebar-item ${item.active
                      ? 'bg-primary text-white shadow-xl'
                      : 'text-theme-text-secondary hover:text-theme-text hover:bg-surface-hover'
                      }`}
                  >
                    <div className={`p-2 rounded-xl ${item.active ? 'bg-white/20' : 'bg-surface-muted group-hover:bg-surface-hover'
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
              </div>              <div>
                <p className="font-medium text-theme-text text-sm">
                  {usuario?.nombre || 'Usuario'}
                </p>
                <p className="text-xs text-theme-text-secondary">
                  {usuario?.rol || 'Administrador'}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <button className="flex items-center space-x-2 w-full p-3 text-theme-text-secondary hover:text-theme-text hover:bg-surface-hover rounded-xl transition-colors">
                <Settings size={16} />
                <span className="text-sm">Configuración</span>
              </button>              <button
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
      <div className={`flex-1 flex flex-col overflow-hidden relative transition-all duration-300 ${chatOpen ? 'mr-[420px]' : 'mr-0'} ${sidebarOpen ? 'lg:ml-80' : 'ml-0'}`}>        {/* Header optimizado */}
        <header className="bg-surface backdrop-blur-xl border-b border-theme-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 text-theme-text-secondary hover:text-theme-text hover:bg-surface-hover rounded-lg menu-button"
                title="Mostrar/Ocultar menú"
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-semibold text-theme-text">
                  {menuItems.find(item => item.active)?.title || 'Panel de Control'}
                </h2>
                {proyectoActual && (
                  <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-primary-light text-primary rounded-lg text-sm border border-primary/20">
                    <Building2 size={14} />
                    <span className="font-medium">{proyectoActual.nombre}</span>
                    <button
                      onClick={() => {
                        cambiarProyecto();
                        navigate('/seleccion-proyecto');
                      }}
                      className="ml-1 hover:bg-primary/10 p-0.5 rounded"
                      title="Cambiar proyecto"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                )}
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
              <button
                onClick={() => setChatOpen(true)}
                className="relative p-2 text-theme-text-secondary hover:text-theme-text hover:bg-surface-hover rounded-lg"
                title="Asistente IA"
              >
                <MessageSquare size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content optimizado */}
        <main className="flex-1 overflow-y-auto p-8 bg-theme-background-secondary transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4">
            <Outlet />
          </div>
        </main>

        {/* Botón flotante para abrir el chat */}
        <button
          onClick={() => setChatOpen(true)}
          className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-primary-dark transition-all z-30 ${chatOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        >
          <MessageSquare size={24} />
        </button>

        {/* Componente de Chat IA */}
        <AIChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </div>
  );
};

export default MainLayout;