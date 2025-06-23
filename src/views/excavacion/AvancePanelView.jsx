import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { toast } from 'sonner';
import panelService from '@/services/excavacion/panelService';
import avance_panelService from '@/services/excavacion/avance_panelService';
import AvancePanelCard from '@/components/excavacion/cards/AvancePanelCard';
import RegistrarAvancePanel from '@/components/excavacion/modales/RegistrarAvancePanel';

const AvancePanelView = () => {
  const { panelId } = useParams();
  const navigate = useNavigate();
  
  const [panel, setPanel] = useState(null);
  const [avances, setAvances] = useState([]);
  const [volumenInfo, setVolumenInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegistrarModal, setShowRegistrarModal] = useState(false);
  
  // Cargar datos del panel y sus avances
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Obtener datos del panel
        const panelData = await panelService.getById(panelId);
        setPanel(panelData);
        
        // Obtener avances del panel
        const avancesData = await avance_panelService.getByPanelId(panelId);
        setAvances(avancesData);
        
        // Obtener información de volumen acumulado
        const volumenData = await avance_panelService.getVolumenAcumulado(panelId);
        setVolumenInfo(volumenData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        toast.error('Error al cargar los datos del panel y sus avances');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [panelId]);
  
  // Función para actualizar la lista después de crear/editar un avance
  const handleAvanceUpdated = async () => {
    try {
      // Recargar avances
      const avancesData = await avance_panelService.getByPanelId(panelId);
      setAvances(avancesData);
      
      // Recargar información de volumen
      const volumenData = await avance_panelService.getVolumenAcumulado(panelId);
      setVolumenInfo(volumenData);
      
      // Recargar panel para obtener estado actualizado
      const panelData = await panelService.getById(panelId);
      setPanel(panelData);
      
      toast.success('Avance registrado correctamente');
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      toast.error('Error al actualizar los datos');
    }
  };

  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cabecera */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/dashboard/excavacion')}
          className="mr-4 p-2 rounded-full hover:bg-slate-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-slate-800">
          Avances de Excavación - {panel?.nombre || 'Panel'}
        </h1>
      </div>
      
      {/* Información del panel y progreso */}
      {/* <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-500">Panel</h3>
            <p className="text-xl font-bold">{panel?.nombre}</p>
            <p className="text-sm text-slate-600">Estado: <span className="font-medium">{panel?.estado}</span></p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-500">Volumen</h3>
            <p className="text-xl font-bold">{panel?.volumen} m³</p>
            <p className="text-sm text-slate-600">
              Excavado: <span className="font-medium">{volumenInfo?.volumenAcumulado || 0} m³</span>
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-500">Progreso</h3>
            <div className="flex items-center">
              <div className="flex-1 bg-slate-200 rounded-full h-2.5 mr-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${volumenInfo?.porcentajeAvance || 0}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{volumenInfo?.porcentajeAvance || 0}%</span>
            </div>
          </div>
        </div>
      </div> */}
      
      {/* Botón para registrar nuevo avance */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Historial de Avances</h2>
        <button
          onClick={() => setShowRegistrarModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Registrar Avance
        </button>
      </div>
      
      {/* Lista de avances */}
      {avances.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {avances.map((avance) => (
            <AvancePanelCard 
              key={avance.id_avance_panel} 
              avance={avance} 
              onUpdate={handleAvanceUpdated}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
          <p className="text-slate-600">No hay avances registrados para este panel.</p>
          <p className="text-slate-500 mt-2">Registra el primer avance usando el botón superior.</p>
        </div>
      )}
      
      {/* Modal para registrar avance */}
      {showRegistrarModal && (
        <RegistrarAvancePanel
          panelId={panelId}
          onClose={() => setShowRegistrarModal(false)}
          onSuccess={handleAvanceUpdated}
        />
      )}
    </div>
  );
};

export default AvancePanelView;
