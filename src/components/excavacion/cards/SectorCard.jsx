import { useState } from 'react';
import { Square, Pencil } from 'lucide-react';
import { getStatusColor, getStatusIcon } from '@/utils/getEstadoCards';
import EditarSector from '../modales/EditarSector';

const SectorCard = ({ sector, onClick }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  // Obtener el progreso del sector
  const getProgreso = () => {
    // El progreso ya viene calculado por el servicio
    if (sector.progreso !== undefined) {
      return sector.progreso;
    }
    
    // Si no tiene progreso calculado, devolver 0
    return 0;
  };

  const progreso = getProgreso();

  const handleEditarSectorClick = (e) => {
    e.stopPropagation(); // Evitar que se propague el evento al contenedor padre
    setShowEditModal(true);
  };

  return (
    <>
      <div
        className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all cursor-pointer group"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-500 transition-colors">
              {sector.nombre}
            </h3>
            <p className="text-slate-500 text-sm">
              ID: {sector.id_sector}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(sector.estado)}`}>
            <div className="flex items-center space-x-1">
              {getStatusIcon(sector.estado)}
              <span className="capitalize">{sector.estado}</span>
            </div>
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Progreso</span>
            <span className="font-medium text-slate-700">{progreso}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Profundidad:</span>
              <span className="font-medium text-slate-700 ml-1">{sector.profundidad} m</span>
            </div>
            <div>
              <span className="text-slate-500">Volumen:</span>
              <span className="font-medium text-slate-700 ml-1">{sector.volumen} m³</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <Square size={14} />
              <span>Sector</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-blue-500">
              <button
                className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors'
                onClick={handleEditarSectorClick}><Pencil size={16} /> Editar</button>
            </div>
          </div>
        </div>
      </div>
      {showEditModal && (
        <EditarSector
          sector={sector}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default SectorCard;