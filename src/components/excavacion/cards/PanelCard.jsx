import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Edit2, 
  Activity, 
  CheckCircle,
  Pause,
  X,
  AlertTriangle,
  Clock,
  Layers,
  Hash,
  MapPin
} from 'lucide-react';
import EditarPanel from '../modales/EditarPanel';

const PanelCard = ({ panel, onClick, onSelectPanel }) => {
  const [showEditarModal, setShowEditarModal] = useState(false);
  const navigate = useNavigate();

  // Función para obtener colores de fondo de la card según el estado del panel
  const getPanelStatusBackground = (estadoNombre) => {
    switch (estadoNombre?.toLowerCase()) {
      case 'finalizado':
      case 'completado':
        return 'bg-green-50 border-green-200 hover:bg-green-100';
      case 'activo':
      case 'en_proceso':
      case 'en proceso':
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
      case 'pausado':
      case 'suspendido':
        return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
      case 'cancelado':
      case 'rechazado':
        return 'bg-red-50 border-red-200 hover:bg-red-100';
      case 'pendiente':
      case 'planificado':
        return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
      default:
        return 'bg-slate-50 border-slate-200 hover:bg-slate-100';
    }
  };

  // Función para obtener colores del badge de estado
  const getPanelStatusBadge = (estadoNombre) => {
    switch (estadoNombre?.toLowerCase()) {
      case 'finalizado':
      case 'completado':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'activo':
      case 'en_proceso':
      case 'en proceso':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pausado':
      case 'suspendido':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelado':
      case 'rechazado':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'pendiente':
      case 'planificado':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Función para obtener el ícono según el estado del panel
  const getPanelStatusIcon = (estadoNombre) => {
    switch (estadoNombre?.toLowerCase()) {
      case 'finalizado':
      case 'completado':
        return <CheckCircle size={16} />;
      case 'activo':
      case 'en_proceso':
      case 'en proceso':
        return <Activity size={16} />;
      case 'pausado':
      case 'suspendido':
        return <Pause size={16} />;
      case 'cancelado':
      case 'rechazado':
        return <X size={16} />;
      case 'pendiente':
      case 'planificado':
        return <Clock size={16} />;
      default:
        return <AlertTriangle size={16} />;
    }
  };

  // Función para manejar el click en el botón de avances
  const handleAvancesClick = (e) => {
    e.stopPropagation();
    
    if (onSelectPanel) {
      onSelectPanel(panel);
    } else {
      navigate(`/dashboard/excavacion/panel/${panel.id_panel}/avances`);
    }
  };

  // Función para manejar el click en editar
  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowEditarModal(true);
  };

  return (
    <>
      <div 
        className={`rounded-xl border-2 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg transform hover:-translate-y-1 ${getPanelStatusBackground(panel.Estado?.nombre)}`}
        onClick={onClick}
      >
        {/* Header con estado prominente */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {panel.nombre}
              </h3>
              <p className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                ID: {panel.id_panel}
              </p>
            </div>
            <div className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold border-2 shadow-sm ${getPanelStatusBadge(panel.Estado?.nombre)}`}>
              {getPanelStatusIcon(panel.Estado?.nombre)}
              <span className="ml-2 capitalize">
                {panel.Estado?.nombre || 'Sin estado'}
              </span>
            </div>
          </div>
        </div>

        {/* Content con datos reales */}
        <div className="px-6 py-5">
          {/* Métricas principales */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
              <dt className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                <Layers size={14} className="mr-1" />
                Volumen
              </dt>
              <dd className="text-2xl font-bold text-gray-900">
                {parseFloat(panel.volumen_proyectado || 0).toFixed(2)}
                <span className="text-sm font-normal text-gray-500 ml-1">m³</span>
              </dd>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
              <dt className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                <Layers size={14} className="mr-1" />
                Profundidad
              </dt>
              <dd className="text-2xl font-bold text-gray-900">
                {parseFloat(panel.profundidad || 0).toFixed(2)}
                <span className="text-sm font-normal text-gray-500 ml-1">m</span>
              </dd>
            </div>
          </div>

          {/* Información técnica específica */}
          <div className="space-y-4 mb-6">
            {/* Fase asignada (sin porcentajes) */}
            {panel.Fase && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Fase Asignada</span>
                    <p className="text-sm font-bold text-blue-900">{panel.Fase.nombre}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-blue-600">Estado</span>
                    <p className="text-sm font-bold text-blue-900">Configurada</p>
                  </div>
                </div>
              </div>
            )}

            {/* Información técnica del panel */}
            <div className="grid grid-cols-2 gap-4">
              {/* ID de Sector */}
              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center">
                  <MapPin size={14} className="text-gray-500 mr-2" />
                  <span className="text-xs font-medium text-gray-500">Sector</span>
                </div>
                <span className="text-sm font-bold text-gray-900 font-mono">
                  {panel.id_sector}
                </span>
              </div>

              {/* ID de Fase */}
              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center">
                  <Hash size={14} className="text-gray-500 mr-2" />
                  <span className="text-xs font-medium text-gray-500">Fase ID</span>
                </div>
                <span className="text-sm font-bold text-gray-900 font-mono">
                  {panel.id_fase}
                </span>
              </div>

              {/* Área calculada */}
              <div className="flex items-center justify-between py-3 px-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <Layers size={14} className="text-blue-600 mr-2" />
                  <span className="text-xs font-medium text-blue-600">Área Calc.</span>
                </div>
                <span className="text-sm font-bold text-blue-900">
                  {panel.volumen_proyectado && panel.profundidad 
                    ? (parseFloat(panel.volumen_proyectado) / parseFloat(panel.profundidad)).toFixed(1)
                    : '0.0'
                  } m²
                </span>
              </div>

              {/* ID de Estado */}
              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center">
                  <Hash size={14} className="text-gray-500 mr-2" />
                  <span className="text-xs font-medium text-gray-500">Estado ID</span>
                </div>
                <span className="text-sm font-bold text-gray-900 font-mono">
                  {panel.id_estado}
                </span>
              </div>
            </div>

            {/* Indicador visual del estado del panel */}
            <div className="flex items-center justify-between py-3 px-4 bg-white border-2 border-dashed border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  panel.Estado?.nombre?.toLowerCase() === 'finalizado' ? 'bg-green-500' :
                  panel.Estado?.nombre?.toLowerCase() === 'activo' ? 'bg-blue-500 animate-pulse' :
                  panel.Estado?.nombre?.toLowerCase() === 'pausado' ? 'bg-yellow-500' :
                  'bg-gray-400'
                }`}></div>
                <span className="text-sm font-medium text-gray-600">
                  Estado Operativo
                </span>
              </div>
              <span className="text-sm font-bold text-gray-900 capitalize">
                {panel.Estado?.nombre || 'Indefinido'}
              </span>
            </div>

            {/* Color del estado (si existe) */}
            {panel.Estado?.color_hex && (
              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm mr-2"
                    style={{ backgroundColor: panel.Estado.color_hex }}
                  ></div>
                  <span className="text-xs font-medium text-gray-500">Color de Estado</span>
                </div>
                <span className="text-sm font-mono text-gray-700">
                  {panel.Estado.color_hex}
                </span>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <button 
              onClick={handleAvancesClick}
              className="flex-1 inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
            >
              <Activity size={16} className="mr-2" />
              Ver Avances
            </button>
            
            <button 
              onClick={handleEditClick}
              className="inline-flex items-center px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
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
          }}
        />
      )}
    </>
  );
};

export default PanelCard;