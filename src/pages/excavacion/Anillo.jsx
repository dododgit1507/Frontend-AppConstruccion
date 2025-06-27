import { useState } from 'react';
import { ArrowLeft, Plus, Loader2, BarChart3, Grid3X3 } from 'lucide-react';
import { toast } from 'sonner';

// Componentes
import AnilloCard from '@/components/excavacion/cards/AnilloCard';
import RegistrarAnillo from '@/components/excavacion/modales/RegistrarAnillo';

// Servicios
import anilloService from '@/services/excavacion/anilloService';

const Anillo = ({ excavacion, onBack, onSelectAnillo }) => {
  // Estados
  const [showRegistrarModal, setShowRegistrarModal] = useState(false);
  const [activeTab, setActiveTab] = useState('anillos'); // 'anillos' o 'graficos'

  // Consulta de anillos con React Query
  const {
    data: anillos,
    isLoading,
    isError,
    error
  } = anilloService.useAnillosConProgresoQuery(excavacion?.id_excavacion);

  const handleAnilloClick = (anillo) => {
    if (onSelectAnillo) {
      onSelectAnillo(anillo);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-2">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Principal */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Barra superior con gradiente */}
          <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6">
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
                    {excavacion?.nombre} - Anillos
                  </h1>
                  <p className="text-blue-100 text-sm">
                    Profundidad: {excavacion?.profundidad}m • Volumen: {excavacion?.volumen}m³
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Métricas de la excavación */}

        </div>

        {/* Navegación por pestañas */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex">
            <button 
              onClick={() => setActiveTab('anillos')}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-semibold text-sm transition-all ${
                activeTab === 'anillos' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Grid3X3 size={18} />
              <span>Anillos</span>
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
              <span>Análisis y Métricas</span>
            </button>
          </div>
        </div>

        {/* Contenido de las pestañas */}
        {isLoading ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 shadow-sm">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 font-medium">Cargando anillos...</p>
          </div>
        ) : isError ? (
          <div className="bg-white rounded-2xl p-16 border border-slate-200 text-center shadow-sm">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Error al cargar</h3>
            <p className="text-red-500 mb-6">
              {error?.message || 'Error desconocido al cargar los anillos'}
            </p>
          </div>
        ) : anillos?.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 border border-slate-200 text-center shadow-sm">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No hay anillos</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              No hay anillos registrados para esta excavación. Comienza registrando el primer anillo.
            </p>
            <button
              onClick={() => setShowRegistrarModal(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium shadow-sm"
            >
              <Plus size={18} />
              <span>Registrar Primer Anillo</span>
            </button>
          </div>
        ) : (
          <>
            {/* PESTAÑA 1: ANILLOS */}
            {activeTab === 'anillos' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Lista de Anillos</h2>
                      <p className="text-slate-600 text-sm">Gestiona todos los anillos de la excavación</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 px-4 py-2 rounded-full">
                        <span className="text-blue-700 font-semibold text-sm">
                          Total: {anillos?.length || 0}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowRegistrarModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                      >
                        <Plus size={16} />
                        Agregar Anillo
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  {/* Grid de anillos con más espacio */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {anillos?.map((anillo) => (
                      <AnilloCard
                        key={anillo.id_anillo}
                        anillo={anillo}
                        onClick={() => handleAnilloClick(anillo)}
                      />
                    ))}
                  </div>

                  {/* Resumen rápido en la sección de anillos */}

                </div>
              </div>
            )}

            {/* PESTAÑA 2: GRÁFICOS Y MÉTRICAS */}
            {activeTab === 'graficos' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Dashboard de Análisis</h2>
                      <p className="text-slate-600 text-sm">Visualización completa del progreso y métricas de anillos</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
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
                  <div className="space-y-8">
                    {/* Métricas principales */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white text-center">
                        <p className="text-2xl font-bold">{anillos?.length || 0}</p>
                        <p className="text-sm opacity-90">Total Anillos</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-xl text-white text-center">
                        <p className="text-2xl font-bold">
                          {Math.round(anillos?.reduce((acc, anillo) => acc + (anillo.progreso || 0), 0) / anillos?.length) || 0}%
                        </p>
                        <p className="text-sm opacity-90">Progreso Total</p>
                      </div>
                      <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-4 rounded-xl text-white text-center">
                        <p className="text-2xl font-bold">
                          {anillos?.filter(anillo => anillo.estado === 'activo').length || 0}
                        </p>
                        <p className="text-sm opacity-90">En Proceso</p>
                      </div>
                      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 rounded-xl text-white text-center">
                        <p className="text-2xl font-bold">
                          {anillos?.reduce((acc, anillo) => acc + (anillo.volumen_excavado || 0), 0) || 0} m³
                        </p>
                        <p className="text-sm opacity-90">Vol. Excavado</p>
                      </div>
                    </div>

                    {/* Área para gráficos personalizados */}
                    <div className="min-h-[400px] bg-slate-50 rounded-xl p-8 text-center">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                          <BarChart3 className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">Gráficos de Anillos</h3>
                        <p className="text-slate-500 max-w-md">
                          Aquí se mostrarán los gráficos detallados de progreso, volúmenes y análisis de anillos una vez que implementes el componente de dashboard específico para anillos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Modal para registrar anillo */}
        {showRegistrarModal && excavacion?.id_excavacion && (
          <RegistrarAnillo
            excavacionId={excavacion.id_excavacion}
            onClose={() => setShowRegistrarModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Anillo;