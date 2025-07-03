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
  Calendar,
  Bell,
  Search,
  Zap,
  Clock,
  MessageSquare,
  ChevronDown,
  ChevronLeft,
  Building2
} from 'lucide-react';
import { useApp } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useProyecto } from '../context/ProyectoContext';
import { useState } from 'react';
import AIChat from '../components/AIChat/AIChat';

const MainLayout = () => {
  const { sidebarOpen, toggleSidebar } = useApp();
  const { usuario, Logout } = useAuth();
  const { proyectoActual, cambiarProyecto } = useProyecto();
  const location = useLocation();
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Mover menuItems ANTES del return
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
  ];

  return (
    <div className="flex h-screen bg-theme-background">
      <style jsx>{`
        .sidebar-transition {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .overlay-transition {
          transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
        }
        
        .menu-button {
          transition: all 0.2s ease-in-out;
        }
        
        .menu-button:hover {
          transform: scale(1.05);
        }
      `}</style>

      {/* Overlay para móvil con transición */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 overlay-transition ${sidebarOpen
          ? 'opacity-100 visible'
          : 'opacity-0 invisible'
          }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar optimizado con transiciones mejoradas - SIEMPRE ENCIMA */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 sidebar-transition ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full bg-white backdrop-blur-xl border-r border-slate-200 shadow-2xl">
          {/* Header del Sidebar */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex  items-center space-x-3">
                <div className="w-14 h-14 flex items-center justify-center p-2 bg-blue-950 rounded-md">
                  <img 
                    src="/img/c4-logo.png" 
                    className="w-full h-full object-contain rounded-md" 
                    alt="C4 Logo" 
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-black">CONSTRUCTICON</h1>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleSidebar}
                  className="text-slate-600 hover:text-slate-800 p-2 rounded-lg cursor-pointer menu-button"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Proyecto Seleccionado - Nuevo Diseño */}
          <div className="mt-2 mb-4">
            <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-800 p-1.5 rounded-lg">
                    <Building2 size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-medium">PROYECTO ACTUAL</p>
                    <h3 className="text-sm font-bold text-blue-800 truncate max-w-[180px]">
                      {proyectoActual ? proyectoActual.nombre : 'Sin proyecto'}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            
            {proyectoActual && (
              <div className="px-4 py-2 bg-white border-x border-b border-blue-200 rounded-b-xl">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Estado:</span>
                  <span className="font-medium capitalize">{proyectoActual.estado}</span>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-600">
                  <span>Responsable:</span>
                  <span className="font-medium">{proyectoActual.responsable}</span>
                </div>
                
                <div className="mt-3 flex justify-center">
                  <button
                    onClick={() => {
                      cambiarProyecto();
                      navigate('/seleccion-proyecto');
                    }}
                    className="w-full py-1.5 px-3 cursor-pointer text-xs font-medium text-white bg-blue-800 hover:bg-blue-600 border border-blue-200 rounded-lg flex items-center justify-center gap-1 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l-6-6 6-6"/>
                      <path d="M3 12h18"/>
                    </svg>
                    Proyectos
                  </button>
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
                    className={`flex items-center space-x-3 p-4 rounded-xl sidebar-item transition-all duration-200 ${item.active
                      ? 'bg-blue-800 text-white shadow-xl'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                      }`}
                  >
                    <div className={`p-2 rounded-xl transition-colors duration-200 ${item.active ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-slate-200'
                      }`}>
                      <item.icon size={20} />
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-slate-200">
            <button 
              onClick={() => navigate('/dashboard/configuracion-usuario')}
              className="flex items-center space-x-3 mb-4 p-3 w-full cursor-pointer bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-200 transition-colors group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <User className="text-white" size={18} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-slate-800 text-sm group-hover:text-blue-700">
                  {usuario?.nombre || 'Usuario'}
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-xs text-slate-500">
                    {usuario?.rol || 'Administrador'}
                  </p>
                </div>
              </div>
            </button>

            <div className="space-y-1">
              <button
                onClick={Logout}
                className="flex items-center space-x-2 w-full p-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut size={16} />
                <span className="text-sm">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - SIEMPRE OCUPA TODO EL ANCHO */}
      <div className={`flex-1 flex flex-col overflow-hidden relative transition-all duration-300 ${chatOpen ? 'mr-[420px]' : 'mr-0'}`}>
        {/* Header optimizado */}
        <header className="from-blue-950 to-blue-800 bg-gradient-to-r backdrop-blur-xl border-b border-blue-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 text-white hover:text-white hover:bg-blue-500/30 rounded-lg menu-button"
                title="Mostrar/Ocultar menú"
              >
                <Menu size={24} />
              </button>
              <button
                onClick={() => navigate(-1)}
                className="p-1 text-white hover:text-white hover:bg-blue-500/30 rounded-lg"
                title="Regresar"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => navigate('/seleccion-proyecto')}
                className="p-2 text-white hover:text-white hover:bg-blue-500/30 rounded-lg"
                title="Ir a Proyectos"
              >
                <Building2 size={20} />
              </button>
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-semibold text-white">
                  {menuItems.find(item => item.active)?.title || 'Panel de Control'}
                </h2>
                {proyectoActual && (
                  <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-blue-100 text-blue-500 rounded-lg text-sm border border-blue-200">
                    <Building2 size={14} />
                    <span className="font-medium">{proyectoActual.nombre}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Hora fecha */}
              <div className="flex items-center space-x-2">
                <span className="text-white text-lg">
                  {new Date().toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric', 
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>

              {/* Botón de tema DESHABILITADO - modo oscuro removido */}
              {/* 
              <button
                className="p-2 text-white hover:text-white hover:bg-blue-500/30 rounded-lg"
                title="Cambiar tema"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              */}
              <button
                onClick={() => setChatOpen(!chatOpen)}
                className="p-2 text-white hover:text-white hover:bg-blue-500/30 rounded-lg relative"
                title="Chat"
              >
                <MessageSquare size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-300 rounded-full"></span>

              </button>
              <div className="relative ml-1">
                <div 
                  className="flex items-center p-2 hover:bg-blue-500/30 rounded-lg"
                >
                  <div className="w-8 h-8 bg-white/20 text-white rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span className="ml-2 text-sm font-medium text-white hidden md:block">{usuario?.nombre || 'Usuario'}</span>
                </div>
              </div>
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
          className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all z-30 ${chatOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
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