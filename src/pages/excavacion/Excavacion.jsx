import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { toast } from 'sonner';

import ExcavacionCard from '@/components/excavacion/cards/ExcavacionCard';
import RegistrarExcavacion from '@/components/excavacion/modales/RegistrarExcavacion';
import ExcavacionDashboard from '@/components/excavacion/charts/ExcavacionDashboard';

import excavacionService from '@/services/excavacion/excavacionService';

const Excavacion = ({ proyecto, onBack, onSelectExcavacion }) => {
  // Estado para modal
  const [openExcavacionModal, setOpenExcavacionModal] = useState(false);

  // Usar React Query para obtener las excavaciones del proyecto con progreso calculado
  const { 
    data: excavacionesConProgreso = [], 
    isLoading: loading,
    error
  } = excavacionService.useExcavacionesConProgresoQuery(proyecto?.id_proyecto);

  // Mostrar error si ocurre
  if (error) {
    console.error('Error al cargar excavaciones:', error);
    toast.error('Error al cargar las excavaciones');
  }

  const handleExcavacionClick = (excavacion) => {
    if (onSelectExcavacion) {
      onSelectExcavacion(excavacion);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con título y botones */}
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
                {proyecto?.nombre} - Excavaciones
              </h1>
              <p className="text-slate-500">
                {proyecto?.direccion} • Responsable: {proyecto?.responsable}
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setOpenExcavacionModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={16} />
              <span>Nueva Excavación</span>
            </button>
          </div>
        </div>
      </div>

      {/* Información del proyecto */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-slate-500 text-sm">Estado</p>
            <p className="text-2xl font-bold text-slate-800 capitalize">{proyecto?.estado}</p>
          </div>
          <div className="text-center">
            <p className="text-slate-500 text-sm">Profundidad</p>
            <p className="text-2xl font-bold text-slate-800">{proyecto?.profundidad} m</p>
          </div>
          <div className="text-center">
            <p className="text-slate-500 text-sm">Volumen</p>
            <p className="text-2xl font-bold text-slate-800">{proyecto?.area * proyecto?.profundidad} m³</p>
          </div>
          <div className="text-center">
            <p className="text-slate-500 text-sm">Residente</p>
            <p className="text-2xl font-bold text-slate-800">{proyecto?.residente}</p>
          </div>
        </div>
      </div>

      {/* Dashboard de gráficos */}
      {!loading && excavacionesConProgreso.length > 0 && (
        <ExcavacionDashboard excavaciones={excavacionesConProgreso} proyecto={proyecto} />
      )}

      {/* Lista de excavaciones */}
      {loading ? (
        <div className="text-center py-10">
          <p className="text-slate-500">Cargando excavaciones...</p>
        </div>
      ) : excavacionesConProgreso.length === 0 ? (
        <div className="bg-white rounded-xl p-10 border border-slate-200 text-center">
          <p className="text-slate-500 mb-4">No hay excavaciones registradas para este proyecto</p>
          <button
            onClick={() => setOpenExcavacionModal(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={16} />
            <span>Crear Primera Excavación</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {excavacionesConProgreso.map((excavacion) => (
            <ExcavacionCard
              key={excavacion.id_excavacion}
              excavacion={excavacion}
              onClick={() => handleExcavacionClick(excavacion)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {openExcavacionModal && (
        <RegistrarExcavacion
          proyectoId={proyecto?.id_proyecto}
          onClose={() => setOpenExcavacionModal(false)}
          // Ya no necesitamos recargar manualmente los datos
          // React Query se encargará de invalidar la caché y actualizar los datos
        />
      )}
    </div>
  );
};

export default Excavacion;