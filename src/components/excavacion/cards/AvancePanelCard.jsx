import { useState } from 'react';
import { Truck, Calendar, Timer, Shovel, Pencil, BrickWall, CloudSun, Image, MessageSquare } from 'lucide-react';
import { formatearFechaInversa, formatearHora } from '@/utils/FormatoFecha';
import EditarAvancePanel from '../modales/EditarAvancePanel';

const AvancePanelCard = ({ avance, onUpdate }) => {
  const [showEditarModal, setShowEditarModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 relative group">
        {/* Header con gradiente sutil */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-slate-100 relative">
          {/* Botón de editar mejorado */}
          <button
            onClick={() => setShowEditarModal(true)}
            className="absolute top-3 right-3 p-2 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-lg text-slate-600 hover:text-blue-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
            title="Editar avance"
          >
            <Pencil size={16} />
          </button>
          
          {/* Fecha y hora destacadas */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-100 px-3 py-1.5 rounded-full">
              <Calendar className="text-blue-600" size={16} />
              <span className="text-sm font-semibold text-blue-800">
                {formatearFechaInversa(avance.fecha)}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-indigo-100 px-3 py-1.5 rounded-full">
              <Timer className="text-indigo-600" size={16} />
              <span className="text-sm font-semibold text-indigo-800">
                {formatearHora(avance.hora)}
              </span>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-6 space-y-5">
          {/* Métricas principales en grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Volumen destacado */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shovel className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">Volumen</p>
                  <p className="text-sm font-bold text-blue-800">{avance.volumen_removido} m³</p>
                </div>
              </div>
            </div>

            {/* Camión */}
            <div className="bg-slate-100 rounded-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-200 rounded-lg">
                  <Truck className="text-slate-600" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Camión</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {avance.Camion?.placa || avance.id_camion || 'No disponible'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="p-1.5 bg-amber-100 rounded-lg">
                <BrickWall className="text-amber-600" size={16} />
              </div>
              <div className="flex-1">
                <span className="text-sm text-slate-600">Tipo de Material</span>
                <p className="font-medium text-slate-800">{avance.tipo_material || 'No disponible'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="p-1.5 bg-sky-100 rounded-lg">
                <CloudSun className="text-sky-600" size={16} />
              </div>
              <div className="flex-1">
                <span className="text-sm text-slate-600">Clima</span>
                <p className="font-medium text-slate-800">{avance.clima || 'No disponible'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="p-1.5 bg-purple-100 rounded-lg">
                <Timer className="text-purple-600" size={16} />
              </div>
              <div className="flex-1">
                <span className="text-sm text-slate-600">Turno</span>
                <p className="font-medium text-slate-800">{avance.turno || 'No disponible'}</p>
              </div>
            </div>
          </div>

          {/* Observaciones */}
          {avance.observaciones && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-100 rounded-lg mt-0.5">
                  <MessageSquare className="text-blue-600" size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-700 mb-1">Observaciones</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{avance.observaciones}</p>
                </div>
              </div>
            </div>
          )}

          {/* Imagen */}
          {avance.imagenurl && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-100 rounded-lg">
                  <Image className="text-emerald-600" size={16} />
                </div>
                <span className="text-sm font-medium text-slate-700">Imagen del avance</span>
              </div>
              <div className="relative overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50">
                <img
                  src={avance.imagenurl}
                  alt="Imagen del avance"
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity" />
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