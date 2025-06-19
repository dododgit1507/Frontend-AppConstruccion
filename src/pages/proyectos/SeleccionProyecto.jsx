import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Search, Plus } from 'lucide-react';
import { useProyecto } from '@/context/ProyectoContext';

// Servicios
import proyectoService from '@/services/proyectoService';

// Componentes
import ProyectoCard from '@/components/cards/ProyectoCard';
import RegistrarProyecto from '@/components/modales/RegistrarProyecto';

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
    <div className="bg-gray-100 min-h-svh py-10">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl md:text-4xl text-center font-bold text-slate-800">Bienvenido a C4 - Constructicon</h1>
        <p className="text-slate-500 text-lg text-center">Selecciona un proyecto para continuar, si no tienes un proyecto disponible, puedes crear uno nuevo</p>
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Proyectos</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar proyecto..."
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* <button
              onClick={() => setOpenProyectoModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={18} />
              <span>Nuevo Proyecto</span>
            </button> */}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin" size={32} />
              <span className="ml-2">Cargando proyectos...</span>
            </div>
          ) : isError ? (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg">
              Error al cargar los proyectos: {error?.message || 'Error desconocido'}
            </div>
          ) : proyectosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proyectosFiltrados.map((proyecto) => (
                <ProyectoCard
                  key={proyecto.id_proyecto}
                  proyecto={proyecto}
                  onClick={() => handleSelectProyecto(proyecto)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 p-8 rounded-lg text-center">
              <p className="text-slate-500 text-lg mb-4">
                {searchTerm ? 'No se encontraron proyectos que coincidan con la búsqueda.' : 'No hay proyectos registrados.'}
              </p>
              <button
                onClick={() => setOpenProyectoModal(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus size={16} />
                <span>Crear Primer Proyecto</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal para registrar proyecto */}
        {openProyectoModal && (
          <RegistrarProyecto onClose={() => setOpenProyectoModal(false)} />
        )}
      </div>
    </div>
  );
};

export default SeleccionProyecto;
