import { useState, useEffect } from 'react';
import RegistrarExcavacion from '@/components/excavacion/modales/RegistrarExcavacion';
import excavacionService from '@/services/excavacion/excavacionService';
import { ArrowLeft, Plus, Shovel } from 'lucide-react';
import { toast } from 'sonner';
import { formatearFechaInversa } from "@/utils/FormatoFecha.js";

const Excavacion = ({ proyecto, onBack, onSelectExcavacion }) => {
  // Estado para modal
  const [openExcavacionModal, setOpenExcavacionModal] = useState(false);

  // Estados para datos
  const [excavaciones, setExcavaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar excavaciones del proyecto al montar el componente
  useEffect(() => {
    const fetchExcavaciones = async () => {
      if (!proyecto?.id_proyecto) return;

      try {
        setLoading(true);
        const data = await excavacionService.getByProyectoId(proyecto.id_proyecto);
        setExcavaciones(data);
      } catch (error) {
        console.error('Error al cargar excavaciones:', error);
        toast.error('Error al cargar las excavaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchExcavaciones();
  }, [proyecto?.id_proyecto, openExcavacionModal]); // Recargar cuando se cierre el modal o cambie el proyecto

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
            <p className="text-2xl font-bold text-slate-800">{proyecto?.profundidad}m</p>
          </div>
          <div className="text-center">
            <p className="text-slate-500 text-sm">Área</p>
            <p className="text-2xl font-bold text-slate-800">{proyecto?.area}m²</p>
          </div>
          <div className="text-center">
            <p className="text-slate-500 text-sm">Residente</p>
            <p className="text-2xl font-bold text-slate-800">{proyecto?.residente}</p>
          </div>
        </div>
      </div>

      {/* Lista de excavaciones */}
      {loading ? (
        <div className="text-center py-10">
          <p className="text-slate-500">Cargando excavaciones...</p>
        </div>
      ) : excavaciones.length === 0 ? (
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
          {excavaciones.map((excavacion) => (
            <div
              key={excavacion.id_excavacion}
              onClick={() => handleExcavacionClick(excavacion)}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">{excavacion.nombre}</h3>
                <div className="p-2 bg-blue-100 text-blue-500 rounded-lg">
                  <Shovel size={20} />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-slate-500">Profundidad: {excavacion.profundidad}m</p>
                <p className="text-sm text-slate-500">Área: {excavacion.area}m²</p>
                <p className="text-sm text-slate-500">Estado: {excavacion.estado}</p>
                <p className="text-sm text-slate-500">Fecha de inicio: {formatearFechaInversa(excavacion.fecha_inicio)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {openExcavacionModal && (
        <RegistrarExcavacion
          proyectoId={proyecto?.id_proyecto}
          onClose={() => setOpenExcavacionModal(false)}
        />
      )}
    </div>
  );
};

export default Excavacion;