import { useState } from 'react';
import { ArrowLeft, Plus, BarChart3, Grid3X3 } from 'lucide-react';
import { toast } from 'sonner';

import ExcavacionCard from '@/components/excavacion/cards/ExcavacionCard';
import RegistrarExcavacion from '@/components/excavacion/modales/RegistrarExcavacion';
import ExcavacionDashboard from '@/components/excavacion/charts/ExcavacionDashboard';

import excavacionService from '@/services/excavacion/excavacionService';

const Excavacion = ({ proyecto, onBack, onSelectExcavacion }) => {
  // Estados
  const [openExcavacionModal, setOpenExcavacionModal] = useState(false);
  const [activeTab, setActiveTab] = useState('excavaciones'); // 'excavaciones' o 'graficos'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-2">
      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .header-animation {
          animation: slideInFromTop 0.5s ease-out;
        }

        .metrics-animation {
          animation: slideInFromBottom 0.3s ease-out;
        }

        .tabs-animation {
          animation: slideInFromLeft 0.4s ease-out 0.3s both;
        }

        .content-animation {
          animation: slideInFromRight 0.4s ease-out;
        }

        .card-animation {
          animation: slideInFromBottom 0.3s ease-out both;
        }

        .metrics-card-animation {
          animation: slideInFromLeft 0.3s ease-out both;
        }

        .dashboard-animation {
          animation: fadeIn 0.5s ease-out 0.4s both;
        }

        .empty-state-animation {
          animation: scaleIn 0.5s ease-out 0.2s both;
        }

        .loading-animation {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Principal */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden header-animation">
          {/* Barra superior con gradiente */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <ArrowLeft className="text-white" size={20} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {proyecto?.nombre}
                  </h1>
                  <p className="text-blue-100 text-sm">
                    {proyecto?.direccion} • Responsable: {proyecto?.responsable}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Métricas del proyecto */}
          <div className="p-6 bg-gradient-to-r from-slate-50 to-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div 
                className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm metrics-soft-animation"
                style={{ animationDelay: '0.2s' }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-1">Estado</p>
                <p className="text-xl font-bold text-slate-800 capitalize">{proyecto?.estado}</p>
              </div>
              
              <div 
                className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm metrics-soft-animation"
                style={{ animationDelay: '0.3s' }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 border-2 border-blue-500 rounded border-dashed"></div>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-1">Profundidad</p>
                <p className="text-xl font-bold text-slate-800">{proyecto?.profundidad} m</p>
              </div>
              
              <div 
                className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm metrics-soft-animation"
                style={{ animationDelay: '0.4s' }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-5 h-5 bg-purple-500 rounded-sm"></div>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-1">Volumen</p>
                <p className="text-xl font-bold text-slate-800">{proyecto?.area * proyecto?.profundidad} m³</p>
              </div>
              
              <div 
                className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm metrics-soft-animation"
                style={{ animationDelay: '0.5s' }}
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-1">Residente</p>
                <p className="text-lg font-bold text-slate-800 truncate">{proyecto?.residente}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación por pestañas */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden tabs-animation">
          <div className="flex">
            <button 
              onClick={() => setActiveTab('excavaciones')}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-semibold text-sm transition-all ${
                activeTab === 'excavaciones' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Grid3X3 size={18} />
              <span>Excavaciones</span>
            </button>
            <button 
              onClick={() => setActiveTab('graficos')}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-semibold text-sm transition-all ${
                activeTab === 'graficos' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BarChart3 size={18} />
              <span>Análisis y Gráficos</span>
            </button>
          </div>
        </div>

        {/* Contenido de las pestañas */}
        {loading ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 shadow-sm loading-animation">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 font-medium">Cargando excavaciones...</p>
          </div>
        ) : excavacionesConProgreso.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 border border-slate-200 text-center shadow-sm empty-state-animation">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No hay excavaciones</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              No hay excavaciones registradas para este proyecto. Comienza creando tu primera excavación.
            </p>
            <button
              onClick={() => setOpenExcavacionModal(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium shadow-sm"
            >
              <Plus size={18} />
              <span>Crear Primera Excavación</span>
            </button>
          </div>
        ) : (
          <>
            {/* PESTAÑA 1: EXCAVACIONES */}
            {activeTab === 'excavaciones' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden content-animation">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Lista de Excavaciones</h2>
                      <p className="text-slate-600 text-sm">Gestiona todas las excavaciones del proyecto</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 px-4 py-2 rounded-full">
                        <span className="text-blue-700 font-semibold text-sm">
                          Total: {excavacionesConProgreso.length}
                        </span>
                      </div>
                      <button
                        onClick={() => setOpenExcavacionModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                      >
                        <Plus size={16} />
                        Agregar Excavación
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  {/* Grid de excavaciones con más espacio */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                    {excavacionesConProgreso.map((excavacion, index) => (
                      <div
                        key={excavacion.id_excavacion}
                        className="card-animation"
                        style={{ animationDelay: `${(index * 100) + 200}ms` }}
                      >
                        <ExcavacionCard
                          excavacion={excavacion}
                          onClick={() => handleExcavacionClick(excavacion)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Resumen rápido en la sección de excavaciones */}

                </div>
              </div>
            )}

            {/* PESTAÑA 2: GRÁFICOS COMPLETOS */}
            {activeTab === 'graficos' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden content-animation">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 border-b border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Dashboard de Análisis</h2>
                      <p className="text-slate-600 text-sm">Visualización completa del progreso y métricas del proyecto</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">Última actualización</p>
                        <p className="text-sm font-medium text-slate-700">
                          {new Date().toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  {/* Dashboard con espacio completo */}
                  <div className="space-y-8">
                    {/* Métricas principales */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white text-center metrics-card-animation"
                        style={{ animationDelay: '0.1s' }}
                      >
                        <p className="text-2xl font-bold">{excavacionesConProgreso.length}</p>
                        <p className="text-sm opacity-90">Total Excavaciones</p>
                      </div>
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl text-white text-center metrics-card-animation"
                        style={{ animationDelay: '0.15s' }}
                      >
                        <p className="text-2xl font-bold">
                          {Math.round(excavacionesConProgreso.reduce((acc, exc) => acc + (exc.progreso || 0), 0) / excavacionesConProgreso.length) || 0}%
                        </p>
                        <p className="text-sm opacity-90">Progreso Total</p>
                      </div>
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl text-white text-center metrics-card-animation"
                        style={{ animationDelay: '0.2s' }}
                      >
                        <p className="text-2xl font-bold">
                          {excavacionesConProgreso.filter(exc => exc.estado === 'activo').length}
                        </p>
                        <p className="text-sm opacity-90">En Proceso</p>
                      </div>
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white text-center metrics-card-animation"
                        style={{ animationDelay: '0.25s' }}
                      >
                        <p className="text-2xl font-bold">
                          {excavacionesConProgreso.filter(exc => exc.estado === 'completado').length}
                        </p>
                        <p className="text-sm opacity-90">Terminadas</p>
                      </div>
                      <div 
                        className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-xl text-white text-center metrics-card-animation"
                        style={{ animationDelay: '0.3s' }}
                      >
                        <p className="text-2xl font-bold">
                          {excavacionesConProgreso.reduce((acc, exc) => acc + (exc.volumen_excavado || 0), 0)} m³
                        </p>
                        <p className="text-sm opacity-90">Vol. Excavado</p>
                      </div>
                    </div>

                    {/* Dashboard principal con altura completa */}
                    <div className="min-h-[600px] dashboard-animation">
                      <ExcavacionDashboard excavaciones={excavacionesConProgreso} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Modal */}
        {openExcavacionModal && (
          <RegistrarExcavacion
            proyectoId={proyecto?.id_proyecto}
            onClose={() => setOpenExcavacionModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Excavacion;