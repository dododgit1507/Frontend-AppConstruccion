import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Square, Pencil, Shovel, HardHat, CheckCircle, Clock, AlertCircle, Activity } from 'lucide-react';
import EditarSector from '../modales/EditarSector';
import estadoService from '@/services/excavacion/estadoService';

const SectorCard = ({ sector, onClick, onSelectSector }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();
  
  // Obtener estados desde el servicio
  const { data: estados } = estadoService.useEstadoQuery();

  // Función para obtener el fondo según el estado
  const getEstadoBackground = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'en proceso':
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
      case 'finalizado':
      case 'terminado':
        return 'bg-green-50 border-green-200 hover:bg-green-100';
      default:
        return 'bg-slate-50 border-slate-200 hover:bg-slate-100';
    }
  };

  // Función para obtener el ícono según el estado
  const getEstadoIcon = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'en proceso':
        return <Activity size={20} className="text-blue-600" />;
      case 'finalizado':
      case 'terminado':
        return <CheckCircle size={20} className="text-green-600" />;
      default:
        return <AlertCircle size={20} className="text-slate-600" />;
    }
  };

  const handleEditarSectorClick = (e) => {
    e.stopPropagation(); 
    setShowEditModal(true);
  };

  return (
    <>
      <div
        className={`rounded-lg border transition-all cursor-pointer shadow-sm hover:shadow-md ${getEstadoBackground(sector.estado)}`}
        onClick={onClick}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-medium text-gray-900 mb-1">
                {sector.nombre}
              </h3>
              <p className="text-sm text-gray-500 font-mono">
                #{sector.id_sector}
              </p>
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
              {getEstadoIcon(sector.estado)}
              <span className="ml-2 capitalize">{sector.estado}</span>
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
                {sector.profundidad}
                <span className="text-sm font-normal text-gray-500 ml-1">m</span>
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Volumen
              </dt>
              <dd className="text-2xl font-semibold text-gray-900">
                {sector.volumen}
                <span className="text-sm font-normal text-gray-500 ml-1">m³</span>
              </dd>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-100">
          <div className="flex items-center justify-end">
            <div className="flex gap-2">
              <button
                className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Navegando a avances del sector:', sector.id_sector);
                  navigate(`/dashboard/excavacion/sector/${sector.id_sector}/avances`);
                }}
              >
                <Activity size={16} className="mr-1" />
                Avances
              </button>
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                onClick={handleEditarSectorClick}
              >
                <Pencil size={16} className="mr-2" />
                Editar
              </button>
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