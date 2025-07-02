import { useState } from 'react';
import { Circle, Pencil } from 'lucide-react';
import { getStatusColor, getStatusIcon } from '@/utils/getEstadoCards';
import EditarAnillo from '../modales/EditarAnillo';

const AnilloCard = ({ anillo, onClick }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  // Obtener el progreso del anillo
  const getProgreso = () => {
    // El progreso ya viene calculado por el servicio
    if (anillo.progreso !== undefined) {
      return anillo.progreso;
    }
    
    // Si no tiene progreso calculado, devolver 0
    return 0;
  };

  const progreso = getProgreso();

  const handleEditarAnilloClick = (e) => {
    e.stopPropagation(); // Evitar que se propague el evento al contenedor padre
    setShowEditModal(true);
  };

  return (
    <>
      <div
        className={`rounded-lg border transition-all cursor-pointer shadow-sm hover:shadow-md ${getStatusColor(anillo.estado)}`}
        onClick={onClick}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-medium text-gray-900 mb-1">
                {anillo.nombre}
              </h3>
              <p className="text-sm text-gray-500 font-mono">
                #{anillo.id_anillo}
              </p>
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${getStatusColor(anillo.estado)}`}>
              {getStatusIcon(anillo.estado)}
              <span className="ml-2 capitalize">{anillo.estado}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Profundidad
              </dt>
              <dd className="text-2xl font-semibold text-gray-900">
                {anillo.profundidad}
                <span className="text-sm font-normal text-gray-500 ml-1">m</span>
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Volumen
              </dt>
              <dd className="text-2xl font-semibold text-gray-900">
                {anillo.volumen}
                <span className="text-sm font-normal text-gray-500 ml-1">m³</span>
              </dd>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Circle size={16} className="mr-2" />
              <span className="font-medium">Anillo de Construcción</span>
            </div>
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              onClick={handleEditarAnilloClick}
            >
              <Pencil size={16} className="mr-2" />
              Editar
            </button>
          </div>
        </div>
      </div>
      {showEditModal && (
        <EditarAnillo
          anillo={anillo}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default AnilloCard;