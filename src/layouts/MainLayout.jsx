import { useState } from 'react';
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
  Zap
} from 'lucide-react';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      title: 'Panel de Control',
      icon: LayoutDashboard,
      path: '/',
      active: location.pathname === '/'
    },
    {
      title: 'Demolición',
      icon: Hammer,
      path: '/demolicion',
      active: location.pathname === '/demolicion'
    },
    {
      title: 'Construcción',
      icon: Building,
      path: '/construccion',
      active: location.pathname === '/construccion'
    },
    {
      title: 'Excavación',
      icon: Truck,
      path: '/excavacion',
      active: location.pathname === '/excavacion'
    },
    {
      title: 'Acabados',
      icon: Paintbrush,
      path: '/acabados',
      active: location.pathname === '/acabados'
    }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar optimizado */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-80 transform transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        <div className="h-full bg-white/5 backdrop-blur-xl border-r border-white/10 shadow-2xl">
          
          {/* Header del Sidebar */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Building className="text-white" size={24} />
                </div>
                <div>
                  <h1 className=" text-xl font-bold text-white ">BuildApp</h1>
                  <p className="text-xs text-gray-400">Construcción Pro</p>
                </div>
              </div>
              <button 
                onClick={toggleSidebar}
                className="lg:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 p-4 rounded-2xl transition-all duration-200 group ${
                      item.active
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${
                      item.active ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'
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
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-3 mb-4 p-3 bg-white/5 rounded-2xl border border-white/10">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <User className="text-white" size={18} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800" />
              </div>
              <div>
                <p className="font-medium text-white text-sm">Juan Pérez</p>
                <p className="text-xs text-gray-400">Supervisor</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <button className="flex items-center space-x-2 w-full p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                <Settings size={16} />
                <span className="text-sm">Configuración</span>
              </button>
              <button className="flex items-center space-x-2 w-full p-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
                <LogOut size={16} />
                <span className="text-sm">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header optimizado */}
        <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleSidebar}
                className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-semibold text-white">
                  {menuItems.find(item => item.active)?.title || 'Panel de Control'}
                </h2>
                <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                  <Zap size={12} />
                  <span>Sistema Activo</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <Search size={16} className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Buscar..."
                  className="bg-transparent text-white placeholder-gray-400 border-none outline-none w-40"
                />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg">
                <Bell size={20} />
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content optimizado */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4">
                <Outlet />
            </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;