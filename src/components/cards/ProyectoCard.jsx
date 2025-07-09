import { useState } from 'react';
import { 
  Users, Pencil, Calendar, MapPin, TrendingUp, AlertTriangle, 
  Clock, DollarSign, Ruler, Building2, CheckCircle2, Target
} from 'lucide-react';
import EditarProyecto from '@/components/modales/EditarProyecto';
import { getStatusColor, getStatusIcon } from '@/utils/getEstadoCards';

const ProyectoCard = ({ proyecto, onClick, index = 0 }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  // Debug: verificar que los datos lleguen
  console.log('ProyectoCard - datos recibidos:', proyecto);

  const handleEditarProyectoClick = (e) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  // Valores por defecto para evitar errores
  const proyectoData = {
    nombre: proyecto?.nombre || 'Proyecto sin nombre',
    direccion: proyecto?.direccion || 'Dirección no especificada',
    estado: proyecto?.estado || 'pendiente',
    profundidad: proyecto?.profundidad || 0,
    area: proyecto?.area || 0,
    responsable: proyecto?.responsable || 'Sin asignar',
    razon_social: proyecto?.razon_social || '',
    fecha_inicio: proyecto?.fecha_inicio || null,
    fecha_fin: proyecto?.fecha_fin || null,
    presupuesto: proyecto?.presupuesto || null
  };

  // Calcular progreso del proyecto
  const getProjectProgress = (estado) => {
    switch (estado) {
      case 'pendiente': return 0;
      case 'iniciada': return 45;
      case 'finalizada': return 100;
      default: return 25;
    }
  };

  // const progress = getProjectProgress(proyectoData.estado); // Comentado - no se usa

  // Si no hay proyecto, mostrar error
  if (!proyecto) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <p className="text-red-600">Error: No se pudieron cargar los datos del proyecto</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all cursor-pointer shadow-sm hover:shadow-md overflow-hidden relative"
        onClick={onClick}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Header con información principal */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Building2 size={20} className="text-gray-600" />
                <h3 className="text-xl font-bold text-gray-900 transition-colors">
                  {proyectoData.nombre}
                </h3>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin size={14} />
                <span>{proyectoData.direccion}</span>
              </div>
              {proyectoData.razon_social && (
                <p className="text-xs text-gray-500 mt-1">
                  Cliente: {proyectoData.razon_social}
                </p>
              )}
            </div>
            <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(proyectoData.estado)}`}>
              {getStatusIcon(proyectoData.estado)}
              <span className="ml-2 capitalize">{proyectoData.estado}</span>
            </div>
          </div>
        </div>

        {/* Métricas técnicas principales */}
        <div className="px-6 py-4 bg-white">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Profundidad */}
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                  <Ruler size={12} className="text-white" />
                </div>
                <dt className="text-xs font-semibold text-blue-700 uppercase">
                  Profundidad
                </dt>
              </div>
              <dd className="text-2xl font-bold text-blue-900">
                {proyectoData.profundidad}
                <span className="text-sm font-normal text-blue-600 ml-1">m</span>
              </dd>
            </div>

            {/* Área */}
            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                  <Target size={12} className="text-white" />
                </div>
                <dt className="text-xs font-semibold text-green-700 uppercase">
                  Área Total
                </dt>
              </div>
              <dd className="text-2xl font-bold text-green-900">
                {proyectoData.area}
                <span className="text-sm font-normal text-green-600 ml-1">m²</span>
              </dd>
            </div>
          </div>

          {/* Información adicional */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              {proyectoData.fecha_inicio && (
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-500" />
                  <span className="text-gray-600">
                    Inicio: {new Date(proyectoData.fecha_inicio).toLocaleDateString('es-ES')}
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-gray-500" />
                <span className="text-gray-600">
                  Vol: {(proyectoData.area * proyectoData.profundidad).toFixed(1)} m³
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center text-sm">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <Users size={14} className="text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{proyectoData.responsable}</p>
              <p className="text-xs text-gray-500">Responsable</p>
            </div>
          </div>
          
          <button
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            onClick={handleEditarProyectoClick}
          >
            <Pencil size={14} className="mr-2" />
            Editar
          </button>
        </div>
      </div>

      {showEditModal && (
        <EditarProyecto
          proyecto={proyecto}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default ProyectoCard;