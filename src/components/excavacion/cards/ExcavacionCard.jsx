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
        className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all cursor-pointer group"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-500 transition-colors">
              {excavacion.nombre}
            </h3>
            <p className="text-slate-500 text-sm">
              Fecha inicio: {formatearFechaInversa(excavacion.fecha_inicio)}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(excavacion.estado)}`}>
            <div className="flex items-center space-x-1">
              {getStatusIcon(excavacion.estado)}
              <span className="capitalize">{excavacion.estado}</span>
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
              <span className="font-medium text-slate-700 ml-1">{excavacion.profundidad}m</span>
            </div>
            <div>
              <span className="text-slate-500">Área:</span>
              <span className="font-medium text-slate-700 ml-1">{excavacion.area}m²</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <Shovel size={14} />
              <span>Excavación</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-blue-500">
              <button
                className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors'
                onClick={handleEditarExcavacionClick}><Pencil size={16} /> Editar</button>
            </div>
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
