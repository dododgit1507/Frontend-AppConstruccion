import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Search, Plus, Building2, User, Settings, LogOut } from 'lucide-react';
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
  const navigate = useNavigate();

  // Consulta de proyectos con React Query
  const {
    data: proyectos,
    isLoading,
    isError,
    error
  } = proyectoService.useProyectoQuery();

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
    <div className="bg-gray-100 min-h-svh flex flex-col">
      {/* Navbar superior */}
      <header className="from-blue-400 to-blue-600 bg-gradient-to-r  border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <img src="/img/c4-logo.png" className="w-12 h-12 rounded-lg shadow-sm" alt="C4 Logo" />
              <h1 className="text-2xl font-bold text-white">Constructicon</h1>
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
              <Building2 className="text-blue-500" />
              Proyectos
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
              <button
                onClick={() => setOpenProyectoModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm font-medium"
              >
                <Plus size={18} />
                <span>Nuevo Proyecto</span>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-blue-500" size={32} />
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
                {searchTerm ? 'No se encontraron proyectos que coincidan con la búsqueda.' : 'No hay proyectos registrados.'}
              </p>
              <button
                onClick={() => setOpenProyectoModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm font-medium"
              >
                <Plus size={18} />
                <span>Crear Primer Proyecto</span>
              </button>
            </div>
          )}

          {/* Modal para registrar proyecto */}
          {openProyectoModal && (
            <RegistrarProyecto onClose={() => setOpenProyectoModal(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SeleccionProyecto;
