// Funcion para devolver correctamente los colores y iconos de los estados

import {
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';

export const getStatusColor = (estado) => {
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
export const getStatusIcon = (estado) => {
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