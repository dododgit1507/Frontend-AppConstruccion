import { useState } from 'react';
import { ArrowLeft, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Componentes
import PanelCard from '@/components/excavacion/cards/PanelCard';
import RegistrarPanel from '@/components/excavacion/modales/RegistrarPanel';

// Servicios
import panelService from '@/services/excavacion/panelService';

const Panel = ({ sector, onBack, onSelectPanel }) => {
  // Estados
  const [showRegistrarModal, setShowRegistrarModal] = useState(false);
  
  // Consulta de paneles con React Query
  const { 
    data: paneles, 
    isLoading, 
    isError, 
    error 
  } = panelService.usePanelesConProgresoQuery(sector?.id_sector);
  
  const handlePanelClick = (panel) => {
    if (onSelectPanel) {
      onSelectPanel(panel);
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
                {sector?.nombre} - Paneles
              </h1>
              <p className="text-slate-500">
                Profundidad: {sector?.profundidad}m • Volumen: {sector?.volumen}m³
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowRegistrarModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus size={18} /> Registrar Panel
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
            <p className="font-medium">Error al cargar los paneles</p>
            <p className="text-sm">{error?.message || 'Ha ocurrido un error desconocido'}</p>
          </div>
        ) : paneles?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-slate-600 mb-4">No hay paneles registrados para este sector</p>
            <button 
              onClick={() => setShowRegistrarModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Crear Primer Panel</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {paneles.map((panel) => (
              <PanelCard
                key={panel.id_panel}
                panel={panel}
                onClick={() => handlePanelClick(panel)}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Modal para registrar panel */}
      {showRegistrarModal && sector?.id_sector && (
        <RegistrarPanel 
          sectorId={sector.id_sector} 
          onClose={() => setShowRegistrarModal(false)} 
        />
      )}
    </div>
  );
};

export default Panel;