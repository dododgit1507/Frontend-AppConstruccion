import { useState } from 'react';
import { Shovel, Pencil } from 'lucide-react';
import { formatearFechaInversa } from "@/utils/FormatoFecha.js";
import { getStatusColor, getStatusIcon } from '@/utils/getEstadoCards';
import EditarExcavacion from '../modales/EditarExcavacion';

const ExcavacionCard = ({ excavacion, onClick }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  // Obtener el progreso de la excavación
  const getProgreso = () => {
    // Si la excavación tiene un progreso calculado, usarlo
    if (excavacion.progreso !== undefined) {
      return excavacion.progreso;
    }

    // Si no, usar el cálculo basado en el estado (para compatibilidad)
    switch (excavacion.estado) {
      case 'finalizada':
        return 100;
      case 'iniciada':
        return 50; // Valor por defecto para excavaciones iniciadas
      case 'pendiente':
        return 0;
      default:
        return 0;
    }
  };

  const progreso = getProgreso();

  const handleEditarExcavacionClick = (e) => {
    e.stopPropagation(); // Evitar que se propague el evento al contenedor padre
    setShowEditModal(true);
  };

  return (
    <>
      <div
        className={`rounded-lg border transition-all cursor-pointer shadow-sm hover:shadow-md ${getStatusColor(excavacion.estado)}`}
        onClick={onClick}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-medium text-gray-900 mb-1">
                {excavacion.nombre}
              </h3>
              <p className="text-sm text-gray-500">
                Inicio: {formatearFechaInversa(excavacion.fecha_inicio)}
              </p>
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200`}>
              {getStatusIcon(excavacion.estado)}
              <span className="ml-2 capitalize">{excavacion.estado}</span>
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
                {excavacion.profundidad}
                <span className="text-sm font-normal text-gray-500 ml-1">m</span>
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Volumen
              </dt>
              <dd className="text-2xl font-semibold text-gray-900">
                {excavacion.volumen}
                <span className="text-sm font-normal text-gray-500 ml-1">m³</span>
              </dd>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Shovel size={16} className="mr-2" />
              <span className="font-medium">Excavación</span>
            </div>
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              onClick={handleEditarExcavacionClick}
            >
              <Pencil size={16} className="mr-2" />
              Editar
            </button>
          </div>
        </div>
      </div>
      {showEditModal && (
        <EditarExcavacion
          excavacion={excavacion}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default ExcavacionCard;