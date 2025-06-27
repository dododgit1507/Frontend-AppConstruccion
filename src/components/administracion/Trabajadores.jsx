import { useState } from 'react';
import { Plus, Loader2, AlertCircle } from 'lucide-react';

// Componentes
import SearchBar from '@/components/ui/SearchBar';
import CamionCard from '@/components/cards/MaterialCard';
import RegistrarCamion from '@/components/modales/RegistrarCamion';

// Servicios
import camionService from '@/services/camionService';

import { useProyecto } from '@/context/ProyectoContext';


const Trabajadores = () => {


  // Estados
  const { proyectoActual } = useProyecto();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Consulta de camiones con React Query
  const {
    data: camiones,
    isLoading,
    isError,
    error
  } = camionService.useGetCamiones();

  // Filtrar camiones según término de búsqueda
  const camionesFiltrados = camiones?.filter(camion =>
    camion.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camion.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camion.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camion.tipo_camion.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Manejar apertura del modal para crear un nuevo camión
  const handleOpenCreateModal = () => {
    setShowModal(true);
  };

  // Manejar cierre del modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Gestión de Trabajadores</h1>
        <p className="text-slate-500">Trabajadores disponibles para {proyectoActual ? proyectoActual.nombre : 'Sin proyecto'} </p>
      </div>
      
      {/* Barra de búsqueda y botón de nuevo camión */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <SearchBar
            placeholder="Buscar material por nombre, tipo o unidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={18} />
          <span>Agregar Material</span>
        </button>
      </div>
      
      {/* Contenido principal */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin" size={32} />
          <span className="ml-2">Cargando camiones...</span>
        </div>
      ) : isError ? (
        <div className="bg-red-50 p-4 rounded-lg flex items-center text-red-500">
          <AlertCircle className="mr-2" size={20} />
          Error al cargar los camiones: {error?.message || 'Error desconocido'}
        </div>
      ) : camionesFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {camionesFiltrados.map((camion) => (
            <CamionCard
              key={camion.id_camion}
              camion={camion}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 p-8 rounded-lg text-center">
          <p className="text-slate-500 text-lg mb-4">
            {searchTerm ? 'No se encontraron camiones que coincidan con la búsqueda.' : 'No hay camiones registrados.'}
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={16} />
            <span>Registrar Primer Camión</span>
          </button>
        </div>
      )}
      
      {/* Modal para crear/editar camión */}
      {showModal && (
        <RegistrarCamion 
          onClose={handleCloseModal} 
        />
      )}
    </div>

  )
}

export default Trabajadores
