import { useState } from 'react';
import { ArrowLeft, Plus, Loader2, BarChart3, Grid3X3 } from 'lucide-react';
import { toast } from 'sonner';

// Componentes
import PanelCard from '@/components/excavacion/cards/PanelCard';
import RegistrarPanel from '@/components/excavacion/modales/RegistrarPanel';

// Servicios
import panelService from '@/services/excavacion/panelService';

const Panel = ({ sector, onBack, onSelectPanel }) => {
  // Estados
  const [showRegistrarModal, setShowRegistrarModal] = useState(false);
  const [activeTab, setActiveTab] = useState('paneles'); // 'paneles' o 'graficos'
  
  // Consulta de paneles con React Query
  const { 
    data: paneles, 
    isLoading, 
    isError, 
    error 
  } = panelService.usePanelesConProgresoQuery(sector?.id_sector);
  
  const handlePanelClick = (panel) => {
    console.log('Panel.jsx - handlePanelClick:', panel);
    if (onSelectPanel) {
      onSelectPanel(panel);
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
                    {sector?.nombre} - Paneles
                  </h1>
                  <p className="text-blue-100 text-sm">
                    Profundidad: {sector?.profundidad}m • Volumen: {sector?.volumen}m³
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación por pestañas */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex">
            <button 
              onClick={() => setActiveTab('paneles')}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-semibold text-sm transition-all ${
                activeTab === 'paneles' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Grid3X3 size={18} />
              <span>Paneles</span>
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
            <p className="text-slate-500 font-medium">Cargando paneles...</p>
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
              {error?.message || 'Ha ocurrido un error desconocido al cargar los paneles'}
            </p>
          </div>
        ) : paneles?.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 border border-slate-200 text-center shadow-sm">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No hay paneles</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              No hay paneles registrados para este sector. Comienza registrando el primer panel.
            </p>
            <button
              onClick={() => setShowRegistrarModal(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium shadow-sm"
            >
              <Plus size={18} />
              <span>Registrar Primer Panel</span>
            </button>
          </div>
        ) : (
          <>
            {/* PESTAÑA 1: PANELES */}
            {activeTab === 'paneles' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Lista de Paneles</h2>
                      <p className="text-slate-600 text-sm">Gestiona todos los paneles del sector</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 px-4 py-2 rounded-full">
                        <span className="text-blue-700 font-semibold text-sm">
                          Total: {paneles?.length || 0}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowRegistrarModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                      >
                        <Plus size={16} />
                        Agregar Panel
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  {/* Grid de paneles con más espacio */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paneles?.map((panel) => (
                      <PanelCard
                        key={panel.id_panel}
                        panel={panel}
                        onClick={() => handlePanelClick(panel)}
                        onSelectPanel={onSelectPanel} // ✅ PASAR EL CALLBACK AQUÍ
                      />
                    ))}
                  </div>
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
                      <p className="text-slate-600 text-sm">Visualización completa del progreso y métricas de paneles</p>
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
                        <p className="text-2xl font-bold">{paneles?.length || 0}</p>
                        <p className="text-sm opacity-90">Total Paneles</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-xl text-white text-center">
                        <p className="text-2xl font-bold">
                          {Math.round(paneles?.reduce((acc, panel) => acc + (panel.progreso || 0), 0) / paneles?.length) || 0}%
                        </p>
                        <p className="text-sm opacity-90">Progreso Total</p>
                      </div>
                      <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-4 rounded-xl text-white text-center">
                        <p className="text-2xl font-bold">
                          {paneles?.filter(panel => panel.estado === 'activo').length || 0}
                        </p>
                        <p className="text-sm opacity-90">En Proceso</p>
                      </div>
                      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 rounded-xl text-white text-center">
                        <p className="text-2xl font-bold">
                          {paneles?.reduce((acc, panel) => acc + (panel.volumen_excavado || 0), 0) || 0} m³
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
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">Gráficos de Paneles</h3>
                        <p className="text-slate-500 max-w-md">
                          Aquí se mostrarán los gráficos detallados de progreso, volúmenes y análisis de paneles una vez que implementes el componente de dashboard específico para paneles.
                        </p>
                      </div>
                    </div>

                    {/* Información adicional del sector */}
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <h4 className="text-lg font-semibold text-slate-800 mb-4">Información del Sector Padre</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-slate-600 text-sm">Nombre del Sector</p>
                          <p className="font-semibold text-slate-800">{sector?.nombre}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-slate-600 text-sm">Profundidad Total</p>
                          <p className="font-semibold text-slate-800">{sector?.profundidad} m</p>
                        </div>
                        <div className="text-center">
                          <p className="text-slate-600 text-sm">Volumen Total</p>
                          <p className="font-semibold text-slate-800">{sector?.volumen} m³</p>
                        </div>
                      </div>
                    </div>

                    {/* Progreso del sector vs paneles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white border border-slate-200 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-slate-800 mb-4">Distribución de Estados</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Activos</span>
                            <span className="font-semibold text-blue-600">
                              {paneles?.filter(panel => panel.estado === 'activo').length || 0}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Completados</span>
                            <span className="font-semibold text-green-600">
                              {paneles?.filter(panel => panel.estado === 'completado').length || 0}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Pausados</span>
                            <span className="font-semibold text-orange-600">
                              {paneles?.filter(panel => panel.estado === 'pausado').length || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-slate-200 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-slate-800 mb-4">Resumen de Volúmenes</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Volumen Total Sector</span>
                            <span className="font-semibold text-slate-800">{sector?.volumen} m³</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Volumen Excavado</span>
                            <span className="font-semibold text-blue-600">
                              {paneles?.reduce((acc, panel) => acc + (panel.volumen_excavado || 0), 0) || 0} m³
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Progreso</span>
                            <span className="font-semibold text-green-600">
                              {Math.round(((paneles?.reduce((acc, panel) => acc + (panel.volumen_excavado || 0), 0) || 0) / (sector?.volumen || 1)) * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Modal para registrar panel */}
        {showRegistrarModal && sector?.id_sector && (
          <RegistrarPanel 
            sectorId={sector.id_sector} 
            onClose={() => setShowRegistrarModal(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default Panel;