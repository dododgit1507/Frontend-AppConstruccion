import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import panelService from '@/services/excavacion/panelService';
import avance_panelService from '@/services/excavacion/avance_panelService';
import AvancePanelCard from '@/components/excavacion/cards/AvancePanelCard';
import RegistrarAvancePanel from '@/components/excavacion/modales/RegistrarAvancePanel';

const AvancePanelView = ({ 
  onBack, 
  panelId: propPanelId,
  panel: propPanel
}) => {
  const { panelId: urlPanelId } = useParams();
  const navigate = useNavigate();
  
  const panelId = propPanelId || urlPanelId;
  
  const [panel, setPanel] = useState(propPanel || null);
  const [avances, setAvances] = useState([]);
  const [volumenInfo, setVolumenInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegistrarModal, setShowRegistrarModal] = useState(false);
  
  // Estado para controlar qué secciones están colapsadas
  const [collapsedSections, setCollapsedSections] = useState({});

  // Configuración de fases con iconos y colores
  const fasesConfig = {
    'Marcado': { 
      icon: '⛏️', 
      color: 'blue', 
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      description: 'Marcado y señalización del área'
    },
    'Excavación': { 
      icon: '⛏️', 
      color: 'amber', 
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-700',
      description: 'Excavación y remoción de material'
    },
    'Proyección': { 
      icon: '⛏️', 
      color: 'purple', 
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      description: 'Proyección de materiales'
    },
    'Armadura': { 
      icon: '⛏️', 
      color: 'green', 
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      description: 'Colocación y amarre de armadura'
    },
    'Encofrado': { 
      icon: '⛏️', 
      color: 'orange', 
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      description: 'Instalación de encofrado'
    },
    'Vaciado de Concreto': { 
      icon: '⛏️', 
      color: 'gray', 
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-700',
      description: 'Vaciado y nivelación de concreto'
    },
    'Desencofrado': { 
      icon: '⛏️', 
      color: 'emerald', 
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      description: 'Retiro de encofrado'
    },
    'Tensado': { 
      icon: '⛏️', 
      color: 'red', 
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      description: 'Tensado de cables y elementos'
    },
    'Revisión': { 
      icon: '⛏️', 
      color: 'indigo', 
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-700',
      description: 'Inspección y control de calidad'
    }
  };

  // Orden de las fases
  const ordenFases = [
    'Marcado', 'Excavación', 'Proyección', 'Armadura', 
    'Encofrado', 'Vaciado de Concreto', 'Desencofrado', 
    'Tensado', 'Revisión'
  ];

  // Cargar datos del panel y sus avances
  useEffect(() => {
    const fetchData = async () => {
      if (!panelId) {
        console.error('No hay panelId disponible');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        if (!propPanel) {
          const panelData = await panelService.getById(panelId);
          setPanel(panelData);
        }
        
        const avancesData = await avance_panelService.getByPanelId(panelId);
        setAvances(avancesData);
        
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
  }, [panelId, propPanel]);
  
  // Función para actualizar la lista después de crear/editar un avance
  const handleAvanceUpdated = async () => {
    try {
      const avancesData = await avance_panelService.getByPanelId(panelId);
      setAvances(avancesData);
      
      const volumenData = await avance_panelService.getVolumenAcumulado(panelId);
      setVolumenInfo(volumenData);
      
      if (!propPanel) {
        const panelData = await panelService.getById(panelId);
        setPanel(panelData);
      }
      
      toast.success('Avance registrado correctamente');
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      toast.error('Error al actualizar los datos');
    }
  };

  // Función para manejar el botón de regreso
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  // Agrupar avances por fase
  const avancesPorFase = avances.reduce((acc, avance) => {
    const fase = avance.fase || 'Sin Fase';
    if (!acc[fase]) {
      acc[fase] = [];
    }
    acc[fase].push(avance);
    return acc;
  }, {});

  // Función para toggle collapse de sección
  const toggleSection = (fase) => {
    setCollapsedSections(prev => ({
      ...prev,
      [fase]: !prev[fase]
    }));
  };

  // Mostrar loading si está cargando
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500">Cargando avances...</p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar error si no hay panelId
  if (!panelId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <p className="text-slate-500">No se encontró el panel</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-1min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-2">
      {/* Header profesional */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
        {/* Barra superior con gradiente */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="text-white" size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Avances del Panel - {panel?.nombre || 'Panel'}
                </h1>
                <p className="text-blue-100 text-sm">
                  Profundidad: {panel?.profundidad || 0}m • Volumen: {panel?.volumen || 0}m³
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Botón para registrar nuevo avance */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Avances por Fases</h2>
        <button
          onClick={() => setShowRegistrarModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          Registrar Avance
        </button>
      </div>
      
      {/* Lista de avances agrupados por fase */}
      {avances.length > 0 ? (
        <div className="space-y-6">
          {ordenFases.map(fase => {
            const avancesFase = avancesPorFase[fase];
            if (!avancesFase || avancesFase.length === 0) return null;
            
            const config = fasesConfig[fase];
            const isCollapsed = collapsedSections[fase];
            
            return (
              <div key={fase} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Header de la sección */}
                <div 
                  className={`${config.bgColor} ${config.borderColor} border-b p-4 cursor-pointer hover:bg-opacity-80 transition-colors`}
                  onClick={() => toggleSection(fase)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{config.icon}</span>
                      <div>
                        <h3 className={`text-lg font-bold ${config.textColor}`}>
                          {fase}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {config.description} • {avancesFase.length} avance{avancesFase.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full bg-white ${config.borderColor} border`}>
                        <span className={`text-sm font-medium ${config.textColor}`}>
                          {avancesFase.length} registro{avancesFase.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      {isCollapsed ? (
                        <ChevronRight className={config.textColor} size={20} />
                      ) : (
                        <ChevronDown className={config.textColor} size={20} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Contenido de la sección */}
                {!isCollapsed && (
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {avancesFase
                        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                        .map((avance) => (
                          <AvancePanelCard 
                            key={avance.id_avance_panel} 
                            avance={avance} 
                            onUpdate={handleAvanceUpdated}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
              <Plus size={24} className="text-slate-400" />
            </div>
            <div>
              <p className="text-slate-600 font-medium">No hay avances registrados</p>
              <p className="text-slate-500 mt-1">
                Registra el primer avance de este panel para comenzar el seguimiento por fases
              </p>
            </div>
            <button
              onClick={() => setShowRegistrarModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <Plus size={16} />
              Registrar Primer Avance
            </button>
          </div>
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