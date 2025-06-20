import { useState } from 'react';
import { Box, Layers, Square, Pencil } from 'lucide-react';
import { getStatusColor } from '@/utils/getEstadoCards';
import EditarPanel from '../modales/EditarPanel';

const PanelCard = ({ panel, onClick }) => {
  const [showEditarModal, setShowEditarModal] = useState(false);

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
        <div className="absolute top-0 right-0 w-20 h-20">
          <div className={`absolute transform rotate-45 text-xs font-medium py-1 right-[-35px] top-[32px] w-[170px] flex justify-center ${getStatusColor(panel?.estado)}`}>
            {panel?.estado || 'Sin estado'}
          </div>
        </div>

        {/* Contenido del panel */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-slate-800 mb-2">{panel?.nombre || 'Panel sin nombre'}</h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-2">
              <Box className="text-slate-400" size={16} />
              <span className="text-sm text-slate-600">
                Profundidad: {panel?.profundidad || '0'} m
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Layers className="text-slate-400" size={16} />
              <span className="text-sm text-slate-600">
                Volumen: {panel?.volumen || '0'} m³
              </span>
            </div>
          </div>

          {/* Estado */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <Square size={14} />
              <span>Panel</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-blue-500">
              <button
                className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors'
                onClick={handleEditClick}><Pencil size={16} /> Editar</button>
            </div>
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