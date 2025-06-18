import { useState } from 'react';
import { ArrowLeft, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Componentes
import SectorCard from '@/components/excavacion/cards/SectorCard';
import RegistrarSector from '@/components/excavacion/modales/RegistrarSector';

// Servicios
import sectorService from '@/services/excavacion/sectorService';

const Sector = ({ anillo, onBack, onSelectSector }) => {
  // Estados
  const [showRegistrarModal, setShowRegistrarModal] = useState(false);
  
  // Consulta de sectores con React Query
  const { 
    data: sectores, 
    isLoading, 
    isError, 
    error 
  } = sectorService.useSectoresConProgresoQuery(anillo?.id_anillo);
  
  const handleSectorClick = (sector) => {
    if (onSelectSector) {
      onSelectSector(sector);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-blue-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="text-blue-500" size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {anillo?.nombre} - Sectores
              </h1>
              <p className="text-slate-500">
                Profundidad: {anillo?.profundidad}m • Área: {anillo?.area}m²
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowRegistrarModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus size={18} /> Registrar Sector
          </button>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-500" size={48} />
          </div>
        ) : isError ? (
          <div className="bg-red-50 text-red-800 p-4 rounded-lg border border-red-200">
            <p className="font-medium">Error al cargar los sectores</p>
            <p className="text-sm">{error?.message || 'Ha ocurrido un error desconocido'}</p>
          </div>
        ) : sectores?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-slate-600 mb-4">No hay sectores registrados para este anillo</p>
            <button 
              onClick={() => setShowRegistrarModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Crear Primer Sector</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {sectores.map((sector) => (
              <SectorCard
                key={sector.id_sector}
                sector={sector}
                onClick={() => handleSectorClick(sector)}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Modal para registrar sector */}
      {showRegistrarModal && anillo?.id_anillo && (
        <RegistrarSector 
          anilloId={anillo.id_anillo} 
          onClose={() => setShowRegistrarModal(false)} 
        />
      )}
    </div>
  );
};

export default Sector;