import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Edit2, 
  Activity, 
  Calendar, 
  BarChart3, 
  MapPin,
  ChevronRight,
  CheckCircle,
  Pause,
  X,
  AlertTriangle
} from 'lucide-react';
import EditarPanel from '../modales/EditarPanel';

const PanelCard = ({ panel, onClick, onSelectPanel }) => {
  const [showEditarModal, setShowEditarModal] = useState(false);
  const navigate = useNavigate();

  // Función para obtener colores de fondo de la card según el estado del panel
  const getPanelStatusBackground = (estadoNombre) => {
    switch (estadoNombre?.toLowerCase()) {
      case 'finalizado':
        return 'bg-green-50 border-green-200 hover:bg-green-100';
      case 'activo':
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
      case 'pausado':
        return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
      case 'cancelado':
        return 'bg-red-50 border-red-200 hover:bg-red-100';
      default:
        return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
    }
  };

  // Función para obtener colores del badge de estado
  const getPanelStatusBadge = (estadoNombre) => {
    switch (estadoNombre?.toLowerCase()) {
      case 'finalizado':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'activo':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pausado':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelado':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Función para obtener el ícono según el estado del panel
  const getPanelStatusIcon = (estadoNombre) => {
    switch (estadoNombre?.toLowerCase()) {
      case 'finalizado':
        return <CheckCircle size={16} />;
      case 'activo':
        return <Activity size={16} />;
      case 'pausado':
        return <Pause size={16} />;
      case 'cancelado':
        return <X size={16} />;
      default:
        return <AlertTriangle size={16} />;
    }
  };

  // Función para manejar el click en el botón de avances
  const handleAvancesClick = (e) => {
    e.stopPropagation(); // Evitar que se dispare el onClick del card
    console.log('PanelCard - handleAvancesClick:', panel);
    
    if (onSelectPanel) {
      // Si hay callback jerárquico, usarlo (flujo interno)
      console.log('Usando callback jerárquico para avances');
      onSelectPanel(panel);
    } else {
      // Si no hay callback, usar navegación por URL (fallback)
      console.log('Usando navegación por URL para avances');
      navigate(`/dashboard/excavacion/panel/${panel.id_panel}/avances`);
    }
  };

  // Función para manejar el click en editar
  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowEditarModal(true);
  };

  console.log('=== DATOS COMPLETOS DEL PANEL ===');
  console.log('Panel completo:', panel);
  console.log('Volumen desde panel.volumen:', panel.volumen);
  console.log('Volumen desde panel.volumen_proyectado:', panel.volumen_proyectado);
  console.log('Profundidad desde panel.profundidad:', panel.profundidad);
  console.log('Todas las propiedades del panel:', Object.keys(panel));

  return (
    <>
      <div 
        className={`rounded-lg border transition-all cursor-pointer shadow-sm hover:shadow-md ${getPanelStatusBackground(panel.Estado?.nombre)}`}
        onClick={onClick}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-medium text-gray-900 mb-1">
                {panel.nombre}
              </h3>
              <p className="text-sm text-gray-500 font-mono">
                #{panel.id_panel}
              </p>
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium border ${getPanelStatusBadge(panel.Estado?.nombre)}`}>
              {getPanelStatusIcon(panel.Estado?.nombre)}
              <span className="ml-2 capitalize">{panel.Estado?.nombre || 'Sin estado'}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {/* Métricas principales */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-1">
              <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Volumen
              </dt>
              <dd className="text-2xl font-semibold text-gray-900">
                {panel.volumen_proyectado || 0}
                <span className="text-sm font-normal text-gray-500 ml-1">m³</span>
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Profundidad
              </dt>
              <dd className="text-2xl font-semibold text-gray-900">
                {panel.profundidad || 0}
                <span className="text-sm font-normal text-gray-500 ml-1">m</span>
              </dd>
            </div>
          </div>

          {/* Información adicional */}
          <div className="space-y-3 mb-6">
            {panel.fase_actual && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-500">Fase Actual</span>
                <span className="text-sm text-gray-900">{panel.fase_actual}</span>
              </div>
            )}

            {panel.fecha_inicio && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-500">Fecha de Inicio</span>
                <span className="text-sm text-gray-900">
                  {new Date(panel.fecha_inicio).toLocaleDateString()}
                </span>
              </div>
            )}

            {panel.progreso !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Progreso</span>
                  <span className="text-sm font-medium text-gray-900">{panel.progreso || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${panel.progreso || 0}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <button 
              onClick={handleAvancesClick}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Activity size={16} className="mr-2" />
              Ver Avances
            </button>
            
            <button 
              onClick={handleEditClick}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Edit2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      {showEditarModal && (
        <EditarPanel
          panel={panel}
          onClose={() => setShowEditarModal(false)}
          onSuccess={() => {
            setShowEditarModal(false);
            // Aquí podrías llamar a una función de refresh si la tienes
          }}
        />
      )}
    </>
  );
};

export default PanelCard;