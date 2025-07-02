import { User, Edit, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import EditarTrabajador from '@/components/modales/EditarTrabajador';

/**
 * Componente para mostrar la información de un trabajador en formato de tarjeta
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.trabajador - Datos del trabajador
 * @returns {JSX.Element} Componente TrabajadorCard
 */
const TrabajadorCard = ({ trabajador }) => {
  // Estados
  const [showEditModal, setShowEditModal] = useState(false);

  // Función para determinar el color según el estado del trabajador
  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'activo':
        return 'bg-green-500';
      case 'inactivo':
        return 'bg-red-500';
      case 'suspendido':
        return 'bg-yellow-500';
      case 'vacaciones':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Función para determinar el color de texto según el estado del trabajador
  const getEstadoTextColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'activo':
        return 'text-green-500';
      case 'inactivo':
        return 'text-red-500';
      case 'suspendido':
        return 'text-yellow-600';
      case 'vacaciones':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  // Función para capitalizar la primera letra
  const capitalizeFirst = (texto) => {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  };

  const onEditClick = () => {
    setShowEditModal(true);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className={`${getEstadoColor(trabajador.estado)} h-2 w-full`}></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="bg-white border border-slate-200 p-3 rounded-lg mr-4">
              <User size={24} className='text-blue-500' />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">{trabajador.nombre}</h3>
              <p className="text-slate-500">ID: {trabajador.id_trabajador}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onEditClick}
              className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              title="Editar trabajador"
            >
              <Edit size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="flex items-center">
            <Mail size={16} className="text-slate-400 mr-2" />
            <div>
              <p className="text-sm text-slate-500">Correo Electrónico</p>
              <p className="font-medium">{trabajador.correo}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Phone size={16} className="text-slate-400 mr-2" />
            <div>
              <p className="text-sm text-slate-500">Teléfono</p>
              <p className="font-medium">{trabajador.telefono}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">Estado</p>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${getEstadoColor(trabajador.estado)} mr-2`}></div>
                <p className={`font-medium ${getEstadoTextColor(trabajador.estado)}`}>
                  {capitalizeFirst(trabajador.estado)}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-slate-500">Empleado</p>
              <p className="font-medium text-slate-700">#{trabajador.id_trabajador}</p>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-4 p-3 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">
              Contacto: {trabajador.telefono} • {trabajador.correo}
            </span>
          </div>
        </div>
      </div>
      
      {/* Modal de edición */}
      {showEditModal && (
        <EditarTrabajador
          trabajador={trabajador}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default TrabajadorCard;