import React from 'react';
import { 
  Building, 
  Layers, 
  MapPin, 
  Users, 
  Activity, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

const ExcavacionCard = ({ proyecto, onClick }) => {
  // Función para determinar el color según el estado
  const getStatusColor = (estado) => {
    switch (estado) {
      case 'finalizada':
        return 'bg-green-100 text-green-600 border-green-200';
      case 'iniciada':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  // Función para determinar el icono según el estado
  const getStatusIcon = (estado) => {
    switch (estado) {
      case 'finalizada':
        return <CheckCircle size={16} />;
      case 'iniciada':
        return <Activity size={16} />;
      case 'pendiente':
        return <Clock size={16} />;
      default:
        return <AlertTriangle size={16} />;
    }
  };

  // Obtener el progreso del proyecto
  const getProgreso = () => {
    // Si el proyecto tiene un progreso calculado, usarlo
    if (proyecto.progreso !== undefined) {
      return proyecto.progreso;
    }
    
    // Si no, usar el cálculo basado en el estado (para compatibilidad)
    switch (proyecto.estado) {
      case 'finalizada':
        return 100;
      case 'iniciada':
        return 50; // Valor por defecto para proyectos iniciados
      case 'pendiente':
        return 0;
      default:
        return 0;
    }
  };

  const progreso = getProgreso();

  return (
    <div 
      className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-500 transition-colors">
            {proyecto.nombre}
          </h3>
          <p className="text-slate-500 text-sm">
            {proyecto.direccion}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(proyecto.estado)}`}>
          <div className="flex items-center space-x-1">
            {getStatusIcon(proyecto.estado)}
            <span className="capitalize">{proyecto.estado}</span>
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
            <span className="font-medium text-slate-700 ml-1">{proyecto.profundidad}m</span>
          </div>
          <div>
            <span className="text-slate-500">Área:</span>
            <span className="font-medium text-slate-700 ml-1">{proyecto.area}m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <Users size={14} />
            <span>Resp: {proyecto.responsable}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-blue-500">
            <span>Ver excavaciones</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcavacionCard;