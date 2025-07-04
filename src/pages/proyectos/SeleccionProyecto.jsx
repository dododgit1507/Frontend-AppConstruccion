import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Search, Plus, Building2, User, Settings, LogOut, Menu, X, Home, ChevronDown, ChevronRight, Users, Shield } from 'lucide-react';
import { useProyecto } from '@/context/ProyectoContext';
import { useAuth } from '@/context/AuthContext';

// Servicios
import proyectoService from '@/services/proyectoService';

// Componentes
import ProyectoCard from '@/components/cards/ProyectoCard';
import RegistrarProyecto from '@/components/modales/RegistrarProyecto';

// Componente para mostrar información del usuario en el navbar
const UserInfo = () => {
  const { usuario, Logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  
  return (
    <div className="relative">
      <div 
        className="flex items-center gap-4 cursor-pointer p-3 hover:bg-blue-500 rounded-lg transition-colors"
        onClick={() => setShowMenu(!showMenu)}
      >
        <div className="relative">
          <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center">
            <User className="text-blue-500" size={20} />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        </div>
        <div className="hidden md:block">
          <p className="font-medium text-white text-base">
            {usuario?.nombre || 'Usuario'}
          </p>
          <p className="text-sm text-white text-opacity-80">
            {usuario?.rol || 'Administrador'}
          </p>
        </div>
      </div>
      
      {/* Menú desplegable */}
      {showMenu && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 z-20">
          <div className="p-3 border-b border-slate-100">
            <p className="font-medium text-slate-800">{usuario?.nombre || 'Usuario'}</p>
            <p className="text-xs text-slate-500">{usuario?.email || 'usuario@ejemplo.com'}</p>
          </div>
          <div className="p-1">
            <button className="flex items-center gap-2 w-full p-2 text-slate-600 hover:bg-slate-50 rounded-md transition-colors text-sm">
              <Settings size={16} />
              <span>Configuración</span>
            </button>
            <button 
              onClick={Logout}
              className="flex items-center gap-2 w-full p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors text-sm"
            >
              <LogOut size={16} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SeleccionProyecto = () => {
  // Estados
  const [searchTerm, setSearchTerm] = useState('');
  const [openProyectoModal, setOpenProyectoModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mantenimientoOpen, setMantenimientoOpen] = useState(false);
  const { usuario, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // 🔐 Verificar si el usuario es administrador
  const isAdmin = usuario?.rol === 'administrador';

  // Consulta de proyectos con React Query
  const {
    data: proyectos,
    isLoading,
    isError,
    error
  } = proyectoService.useProyectoQuery(isAuthenticated);

  // Filtrar proyectos según término de búsqueda
  const proyectosFiltrados = proyectos?.filter(proyecto =>
    proyecto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proyecto.razon_social.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Usar el contexto de proyecto
  const { seleccionarProyecto } = useProyecto();

  // Manejar selección de proyecto
  const handleSelectProyecto = (proyecto) => {
    // Usar la función del contexto para seleccionar el proyecto
    seleccionarProyecto(proyecto);

    // Navegar al dashboard
    navigate('/dashboard');
  };

  return (
    <div className="bg-gray-100 min-h-svh flex flex-col relative">
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full bg-white shadow-2xl border-r border-slate-200">
          {/* Header del Sidebar */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 flex items-center justify-center p-2 bg-blue-950 rounded-md">
                  <img 
                    src="/img/c4-logo.png" 
                    className="w-full h-full object-contain rounded-md" 
                    alt="C4 Logo" 
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-black">CONSTRUCTICON</h1>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-slate-600 hover:text-slate-800 p-2 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Menú de navegación */}
          <div className="p-4">
            <nav className="space-y-2">
              {/* Inicio */}
              <button
                onClick={() => {
                  navigate('/dashboard_inicio');
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors group"
              >
                <Home size={20} className="text-slate-500 group-hover:text-blue-600" />
                <span className="font-medium">Inicio</span>
              </button>

              {/* Mantenimiento - Solo para administradores */}
              {isAdmin && (
                <div>
                  <button
                    onClick={() => setMantenimientoOpen(!mantenimientoOpen)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Settings size={20} className="text-slate-500 group-hover:text-blue-600" />
                      <span className="font-medium">Mantenimiento</span>
                    </div>
                    {mantenimientoOpen ? (
                      <ChevronDown size={16} className="text-slate-400 group-hover:text-blue-600" />
                    ) : (
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600" />
                    )}
                  </button>

                  {/* Submenú de Mantenimiento */}
                  {mantenimientoOpen && (
                    <div className="ml-4 mt-2 space-y-1 border-l-2 border-slate-100 pl-4">
                      <button
                        onClick={() => {
                          navigate('/seleccion-proyecto');
                          setSidebarOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors group"
                      >
                        <Building2 size={16} className="text-slate-400 group-hover:text-blue-600" />
                        <span>Proyectos</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate('/dashboard/empleados');
                          setSidebarOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors group"
                      >
                        <Users size={16} className="text-slate-400 group-hover:text-blue-600" />
                        <span>Empleados</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate('/dashboard/roles');
                          setSidebarOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors group"
                      >
                        <Shield size={16} className="text-slate-400 group-hover:text-blue-600" />
                        <span>Roles</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </nav>
          </div>

          {/* Footer del Sidebar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={16} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {usuario?.nombre || 'Usuario'}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {usuario?.rol || 'Administrador'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar superior */}
      <header className="from-blue-950 to-blue-800 bg-gradient-to-r border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              {/* Botón del menú hamburguesa */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-white hover:bg-blue-500/30 rounded-lg transition-colors"
                title="Abrir menú"
              >
                <Menu size={24} />
              </button>
              <img src="/img/c4-logo.png" className="w-12 h-12 rounded-lg shadow-sm" alt="C4 Logo" />
              <h1 className="text-2xl font-bold text-white">CONSTRUCTICON</h1>
            </div>
            
            {/* Información del usuario */}
            <UserInfo />
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Building2 className="text-blue-800" />
              Proyectos
              {/* Mostrar cantidad de proyectos y rol */}
              <span className="text-sm font-normal text-slate-500">
                ({proyectosFiltrados.length} {isAdmin ? 'total' : 'asignados'})
              </span>
            </h2>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative flex-grow max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar proyecto..."
                  className="w-full pl-10 pr-4 text-black py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* 🔐 Botón Nuevo Proyecto - Solo para administradores */}
              {isAdmin && (
                <button
                  onClick={() => setOpenProyectoModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-800 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm font-medium"
                >
                  <Plus size={18} />
                  <span>Nuevo Proyecto</span>
                </button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-blue-800" size={32} />
              <span className="ml-3 font-medium text-slate-700">Cargando proyectos...</span>
            </div>
          ) : isError ? (
            <div className="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100">
              <p className="font-medium">Error al cargar los proyectos</p>
              <p className="text-sm mt-1">{error?.message || 'Error desconocido'}</p>
            </div>
          ) : proyectosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proyectosFiltrados.map((proyecto, index) => (
                <ProyectoCard
                  key={proyecto.id_proyecto}
                  proyecto={proyecto}
                  onClick={() => handleSelectProyecto(proyecto)}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 p-8 rounded-lg text-center border border-slate-200">
              <p className="text-slate-600 text-lg mb-4">
                {searchTerm 
                  ? 'No se encontraron proyectos que coincidan con la búsqueda.' 
                  : isAdmin 
                    ? 'No hay proyectos registrados.' 
                    : 'No tienes proyectos asignados.'
                }
              </p>
              {/* 🔐 Botón para crear primer proyecto - Solo para administradores */}
              {isAdmin && !searchTerm && (
                <button
                  onClick={() => setOpenProyectoModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-800 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm font-medium"
                >
                  <Plus size={18} />
                  <span>Crear Primer Proyecto</span>
                </button>
              )}
              {/* Mensaje para ingenieros sin proyectos */}
              {!isAdmin && !searchTerm && (
                <p className="text-sm text-slate-500 mt-2">
                  Los proyectos son asignados por el administrador.
                </p>
              )}
            </div>
          )}

          {/* 🔐 Modal para registrar proyecto - Solo se renderiza para administradores */}
          {isAdmin && openProyectoModal && (
            <RegistrarProyecto onClose={() => setOpenProyectoModal(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SeleccionProyecto;