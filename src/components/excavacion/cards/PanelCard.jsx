import { useState } from 'react';
import { Edit, Ruler, Box, Layers } from 'lucide-react';
import EditarPanel from '../modales/EditarPanel';

const PanelCard = ({ panel, onClick }) => {
  const [showEditarModal, setShowEditarModal] = useState(false);

  // Función para determinar el color del estado
  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'iniciada':
        return 'bg-blue-100 text-blue-800';
      case 'finalizada':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  // Evitar la propagación del clic al editar
  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowEditarModal(true);
  };

  return (
    <>
      <div
        onClick={onClick}
        className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden"
      >
        {/* Indicador de estado */}
        <div className="">
          <div className="">
            {panel?.estado || 'Sin estado'}
          </div>
        </div>

        {/* Contenido del panel */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-slate-800 mb-2">{panel?.nombre || 'Panel sin nombre'}</h3>
            <button
              onClick={handleEditClick}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <Edit size={16} className="text-slate-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-2">
              <Ruler className="text-slate-400" size={16} />
              <span className="text-sm text-slate-600">
                Dimensiones: {panel?.ancho || '0'}m × {panel?.alto || '0'}m
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Box className="text-slate-400" size={16} />
              <span className="text-sm text-slate-600">
                Volumen: {panel?.volumen || '0'} m³
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Layers className="text-slate-400" size={16} />
              <span className="text-sm text-slate-600">
                Tipo: {panel?.tipo || 'No especificado'}
              </span>
            </div>
          </div>

          {/* Estado */}
          <div className="pt-2 border-t border-slate-100">
            <span className={`text-xs px-2 py-1 rounded-full ${getEstadoColor(panel?.estado)}`}>
              {panel?.estado || 'Sin estado'}
            </span>
          </div>
        </div>
      </div>

      {/* Modal para editar panel */}
      {showEditarModal && (
        <EditarPanel
          panel={panel}
          onClose={() => setShowEditarModal(false)}
        />
      )}
    </>
  );
};

export default PanelCard;