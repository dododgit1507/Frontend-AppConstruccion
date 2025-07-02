import { useState } from 'react';
import { 
  Calendar, 
  Timer, 
  Pencil, 
  Image, 
  MessageSquare,
  MapPin,
  Activity,
  Settings,
  User,
  Wrench
} from 'lucide-react';
import { formatearFechaInversa, formatearHora } from '@/utils/FormatoFecha';
import EditarAvancePanel from '../modales/EditarAvancePanel';

const AvancePanelCard = ({ avance, onUpdate }) => {
  const [showEditarModal, setShowEditarModal] = useState(false);

  // Configuración de fases con colores
  const fasesConfig = {
    'Marcado': { 
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      icon: MapPin
    },
    'Excavación': { 
      color: 'amber',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-700',
      icon: Activity
    },
    'Proyección': { 
      color: 'purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      icon: Settings
    },
    'Armadura': { 
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      icon: Settings
    },
    'Encofrado': { 
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      icon: Settings
    },
    'Vaciado de Concreto': { 
      color: 'gray',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-700',
      icon: Wrench
    },
    'Desencofrado': { 
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      icon: Settings
    },
    'Tensado': { 
      color: 'red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      icon: Settings
    },
    'Revisión': { 
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-700',
      icon: Settings
    }
  };

  const config = fasesConfig[avance.fase] || fasesConfig['Marcado'];
  const IconComponent = config.icon;

  return (
    <>
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 relative group">
        {/* Header con fase e información temporal */}
        <div className={`${config.bgColor} ${config.borderColor} border-b px-4 py-3 relative`}>
          {/* Botón de editar */}
          <button
            onClick={() => setShowEditarModal(true)}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md text-slate-600 hover:text-blue-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
            title="Editar avance"
          >
            <Pencil size={14} />
          </button>
          
          {/* Indicador de fase */}
          <div className="flex items-center gap-2 mb-2">
            <IconComponent className={config.textColor} size={16} />
            <span className={`text-sm font-semibold ${config.textColor}`}>
              {avance.fase}
            </span>
          </div>
          
          {/* Fecha y hora */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Calendar className="text-slate-600" size={14} />
              <span className="text-xs font-medium text-slate-700">
                {formatearFechaInversa(avance.fecha)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Timer className="text-slate-600" size={14} />
              <span className="text-xs font-medium text-slate-700">
                {formatearHora(avance.hora)}
              </span>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-4 space-y-3">
          {/* Responsable */}
          {avance.responsable && (
            <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
              <User className="text-slate-500" size={14} />
              <div>
                <span className="text-xs text-slate-500">Responsable</span>
                <p className="text-sm font-medium text-slate-700">{avance.responsable}</p>
              </div>
            </div>
          )}

          {/* Descripción del trabajo */}
          {avance.descripcion && (
            <div className="space-y-1">
              <span className="text-xs text-slate-500">Descripción del trabajo</span>
              <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">
                {avance.descripcion}
              </p>
            </div>
          )}

          {/* Métricas específicas por fase */}
          <div className="space-y-2">
            {/* Para Excavación - mostrar volumen y material */}
            {avance.fase === 'Excavación' && (
              <>
                {avance.volumen_removido && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-slate-500">Volumen excavado</span>
                    <span className="text-sm font-medium text-slate-700">{avance.volumen_removido} m³</span>
                  </div>
                )}
                {avance.tipo_material && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-slate-500">Material</span>
                    <span className="text-sm font-medium text-slate-700">{avance.tipo_material}</span>
                  </div>
                )}
                {avance.Camion?.placa && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-slate-500">Camión</span>
                    <span className="text-sm font-medium text-slate-700">{avance.Camion.placa}</span>
                  </div>
                )}
              </>
            )}

            {/* Para otras fases - mostrar área y materiales */}
            {avance.fase !== 'Excavación' && (
              <>
                {avance.area_trabajada && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-slate-500">Área trabajada</span>
                    <span className="text-sm font-medium text-slate-700">{avance.area_trabajada} m²</span>
                  </div>
                )}
                {avance.materiales_utilizados && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-slate-500">Materiales</span>
                    <span className="text-sm font-medium text-slate-700 truncate">{avance.materiales_utilizados}</span>
                  </div>
                )}
                {avance.equipos_utilizados && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-slate-500">Equipos</span>
                    <span className="text-sm font-medium text-slate-700 truncate">{avance.equipos_utilizados}</span>
                  </div>
                )}
              </>
            )}

            {/* Información común */}
            {avance.turno && (
              <div className="flex justify-between items-center py-1">
                <span className="text-xs text-slate-500">Turno</span>
                <span className="text-sm font-medium text-slate-700">{avance.turno}</span>
              </div>
            )}

            {avance.clima && (
              <div className="flex justify-between items-center py-1">
                <span className="text-xs text-slate-500">Clima</span>
                <span className="text-sm font-medium text-slate-700">{avance.clima}</span>
              </div>
            )}
          </div>

          {/* Observaciones */}
          {avance.observaciones && (
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <div className="flex items-start gap-2">
                <MessageSquare className="text-blue-600 mt-0.5" size={14} />
                <div>
                  <p className="text-xs font-medium text-blue-700 mb-1">Observaciones</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{avance.observaciones}</p>
                </div>
              </div>
            </div>
          )}

          {/* Imagen */}
          {avance.imagenurl && (
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Image className="text-slate-500" size={14} />
                <span className="text-xs font-medium text-slate-600">Evidencia fotográfica</span>
              </div>
              <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                <img
                  src={avance.imagenurl}
                  alt={`Evidencia - ${avance.fase}`}
                  className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                  <p className="text-white text-xs font-medium">{avance.fase}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de edición */}
      {showEditarModal && (
        <EditarAvancePanel
          avance={avance}
          onClose={() => setShowEditarModal(false)}
          onSuccess={onUpdate}
        />
      )}
    </>
  );
};

export default AvancePanelCard;