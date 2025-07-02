import { Truck, Edit, Package } from 'lucide-react';
import { useState } from 'react';
import EditarMaterial from '@/components/modales/EditarMaterial';

/**
 * Componente para mostrar la información de un material en formato de tarjeta
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.material - Datos del material
 * @returns {JSX.Element} Componente MaterialCard
 */
const MaterialCard = ({ material }) => {
  // Estados
  const [showEditModal, setShowEditModal] = useState(false);

  // Función para determinar el color según el estado del material (booleano)
  const getEstadoColor = (activo) => {
    return activo ? 'bg-green-500' : 'bg-red-500';
  };

  // Función para determinar el color de texto según el estado del material (booleano)
  const getEstadoTextColor = (activo) => {
    return activo ? 'text-green-500' : 'text-red-500';
  };

  // Función para mostrar el texto del estado
  const getEstadoTexto = (activo) => {
    return activo ? 'Activo' : 'Inactivo';
  };

  // Función para determinar el color según si es peligroso
  const getPeligrosoColor = (esPeligroso) => {
    return esPeligroso ? 'text-red-500' : 'text-green-500';
  };

  const onEditClick = () => {
    setShowEditModal(true);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className={`${getEstadoColor(material.activo)} h-2 w-full`}></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="bg-white border border-slate-200 p-3 rounded-lg mr-4">
              <Package size={24} className='text-blue-500' />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">{material.nombre}</h3>
              <p className="text-slate-500">{material.tipo_material}</p>
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
            <p className="text-sm text-slate-500">Precio Unitario</p>
            <p className="font-medium">${material.precio_unitario}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Unidad de Medida</p>
            <p className="font-medium">{material.unidad_medida}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Stock Actual</p>
            <p className="font-medium">{material.stock_actual} {material.unidad_medida}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Estado</p>
            <p className={`font-medium ${getEstadoTextColor(material.activo)}`}>
              {getEstadoTexto(material.activo)}
            </p>
          </div>
        </div>

        {material.descripcion && (
          <div className="mb-4">
            <p className="text-sm text-slate-500">Descripción</p>
            <p className="text-sm">{material.descripcion}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">¿Es Peligroso?</p>
            <p className={`font-medium text-sm ${getPeligrosoColor(material.es_peligroso)}`}>
              {material.es_peligroso ? 'Si, es peligroso' : 'No, no es peligroso'}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Fecha de Creación</p>
            <p className="text-sm">
              {material.fecha_creacion ? new Date(material.fecha_creacion).toLocaleDateString() : 'No disponible'}
            </p>
          </div>
        </div>
      </div>
       {/* Modal de edición */}
       {showEditModal && (
        <EditarMaterial
          material={material}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default MaterialCard;