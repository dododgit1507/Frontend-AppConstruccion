import { Truck, Edit } from 'lucide-react';
import { useState } from 'react';
import EditarCamion from '../modales/EditarCamion';

/**
 * Componente para mostrar la información de un camión en formato de tarjeta
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.camion - Datos del camión
 * @returns {JSX.Element} Componente CamionCard
 */
const CamionCard = ({ camion }) => {
  // Estados
  const [showEditModal, setShowEditModal] = useState(false);

  // Función para determinar el color según el estado del camión
  const getEstadoColor = (estado) => {
    switch (estado.toLowerCase()) {
      case 'activo':
        return 'bg-green-500';
      case 'mantenimiento':
        return 'bg-yellow-500';
      case 'inactivo':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Función para determinar el color de texto según el estado del camión
  const getEstadoTextColor = (estado) => {
    switch (estado.toLowerCase()) {
      case 'activo':
        return 'text-green-500';
      case 'mantenimiento':
        return 'text-yellow-500';
      case 'inactivo':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const onEditClick = () => {
    setShowEditModal(true);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className={`${getEstadoColor(camion.estado)} h-2 w-full`}></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="bg-white border border-slate-200 p-3 rounded-lg mr-4">
              <Truck size={24} className='text-blue-500' />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">{camion.placa}</h3>
              <p className="text-slate-500">{camion.marca} {camion.modelo}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onEditClick}
              className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-slate-500">Tipo</p>
            <p className="font-medium">{camion.tipo_camion}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Año</p>
            <p className="font-medium">{camion.anio_fabricacion}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Capacidad</p>
            <p className="font-medium">{camion.capacidad_carga} m³</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Estado</p>
            <p className={`font-medium ${getEstadoTextColor(camion.estado)}`}>
              {camion.estado}
            </p>
          </div>
        </div>
      </div>
      {/* Modal de edición */}
      {showEditModal && (
        <EditarCamion
          camion={camion}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default CamionCard;
