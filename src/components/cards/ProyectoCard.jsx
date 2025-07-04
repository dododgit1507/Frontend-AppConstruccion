import { useState } from 'react';
import { Users, Pencil } from 'lucide-react';
import EditarProyecto from '@/components/modales/EditarProyecto';
import { getStatusColor, getStatusIcon } from '@/utils/getEstadoCards';

const ProyectoCard = ({ proyecto, onClick, index = 0 }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditarProyectoClick = (e) => {
    e.stopPropagation(); // Evitar que se propague el evento al contenedor padre
    setShowEditModal(true);
  };
    
  return (
    <>
      <div
        className="bg-white rounded-xl border border-gray-100 hover:border-blue-300 transition-all cursor-pointer shadow-lg hover:shadow-xl overflow-hidden"
        onClick={onClick}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {proyecto.nombre}
              </h3>
              <p className="text-sm text-gray-600">
                {proyecto.direccion}
              </p>
            </div>
            <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(proyecto.estado)}`}>
              {getStatusIcon(proyecto.estado)}
              <span className="ml-2 capitalize">{proyecto.estado}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <dt className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Profundidad
              </dt>
              <dd className="text-3xl font-extrabold text-gray-900">
                {proyecto.profundidad}
                <span className="text-base font-normal text-gray-500 ml-1">m</span>
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Área
              </dt>
              <dd className="text-3xl font-extrabold text-gray-900">
                {proyecto.area}
                <span className="text-base font-normal text-gray-500 ml-1">m²</span>
              </dd>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <Users size={18} className="mr-2 text-gray-500" />
            <span className="font-medium text-gray-700">Responsable: {proyecto.responsable}</span>
          </div>
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            onClick={handleEditarProyectoClick}
          >
            <Pencil size={16} className="mr-2" />
            Editar
          </button>
        </div>
      </div>
      {showEditModal && (
        <EditarProyecto
          proyecto={proyecto}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default ProyectoCard;