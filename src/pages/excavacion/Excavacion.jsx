import { useState } from 'react';
import { ArrowLeft, Plus, BarChart3, Grid3X3, Users, Truck, Calculator, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import ExcavacionCard from '@/components/excavacion/cards/ExcavacionCard';
import RegistrarExcavacion from '@/components/excavacion/modales/RegistrarExcavacion';
import ExcavacionDashboard from '@/components/excavacion/charts/ExcavacionDashboard';

import excavacionService from '@/services/excavacion/excavacionService';

const Excavacion = ({ proyecto, onBack, onSelectExcavacion }) => {
  // Estados
  const [openExcavacionModal, setOpenExcavacionModal] = useState(false);
  const [activeTab, setActiveTab] = useState('excavaciones'); // 'excavaciones', 'contratas', 'maquinarias', 'presupuesto', 'graficos'
  const navigate = useNavigate();

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

  // Datos simulados para contratas y maquinarias
  const contratasData = [
    {
      id: 1,
      nombre: "Constructora Los Andes SAC",
      tipo: "excavacion_eliminacion",
      estado: "activo",
      presupuesto_total: 85000,
      presupuesto_asignado: 65000,
      cobertura: "completa", // completa, parcial
      servicios: ["Excavación", "Eliminación de material", "Transporte"],
      equipos: ["Excavadora CAT 320", "Camiones 15m³"],
      contacto: "Ing. Carlos Mendoza - 999888777"
    },
    {
      id: 2,
      nombre: "Alquiler de Maquinarias JEMSA",
      tipo: "alquiler_maquinaria",
      estado: "activo",
      presupuesto_total: 45000,
      presupuesto_asignado: 45000,
      cobertura: "parcial",
      servicios: ["Alquiler excavadora", "Operador incluido"],
      equipos: ["Excavadora Komatsu PC200"],
      contacto: "Sr. Luis Vargas - 987654321"
    },
    {
      id: 3,
      nombre: "Transportes Norte EIRL",
      tipo: "transporte",
      estado: "pendiente",
      presupuesto_total: 25000,
      presupuesto_asignado: 0,
      cobertura: "parcial",
      servicios: ["Transporte de material", "Eliminación"],
      equipos: ["Camiones 20m³", "Volquetes"],
      contacto: "Ing. Ana Flores - 965432187"
    }
  ];

  const maquinariasData = [
    {
      id: 1,
      nombre: "Excavadora CAT 320",
      tipo: "excavadora",
      estado: "operativo",
      contrata: "Constructora Los Andes SAC",
      ubicacion: "Sector A - Anillo 1",
      operador: "Op. Juan Rodriguez",
      horas_trabajadas: 120,
      mantenimiento: "al_dia"
    },
    {
      id: 2,
      nombre: "Excavadora Komatsu PC200",
      tipo: "excavadora",
      estado: "operativo",
      contrata: "Alquiler de Maquinarias JEMSA",
      ubicacion: "Sector B - Anillo 2",
      operador: "Op. Pedro Silva",
      horas_trabajadas: 95,
      mantenimiento: "al_dia"
    },
    {
      id: 3,
      nombre: "Mini Excavadora JCB 8025",
      tipo: "mini_excavadora",
      estado: "mantenimiento",
      contrata: "Propia",
      ubicacion: "Taller",
      operador: "No asignado",
      horas_trabajadas: 180,
      mantenimiento: "en_proceso"
    },
    {
      id: 4,
      nombre: "Excavadora Volvo EC210",
      tipo: "excavadora",
      estado: "disponible",
      contrata: "Por asignar",
      ubicacion: "Almacén",
      operador: "No asignado",
      horas_trabajadas: 0,
      mantenimiento: "al_dia"
    }
  ];

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
          <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <ArrowLeft className="text-white" size={20} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Gestión de Excavaciones - {proyecto?.nombre}
                  </h1>
                  <p className="text-blue-100 text-sm">
                    {proyecto?.direccion} • Responsable: {proyecto?.responsable}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Métricas del proyecto mejoradas */}
          <div className="p-6 bg-gradient-to-r from-slate-50 to-white">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div 
                className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm metrics-soft-animation"
                style={{ animationDelay: '0.1s' }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-slate-500 text-xs font-medium mb-1">Estado</p>
                <p className="text-lg font-bold text-slate-800 capitalize">{proyecto?.estado}</p>
              </div>
              
              <div 
                className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm metrics-soft-animation"
                style={{ animationDelay: '0.15s' }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 border-2 border-blue-500 rounded border-dashed"></div>
                </div>
                <p className="text-slate-500 text-xs font-medium mb-1">Profundidad</p>
                <p className="text-lg font-bold text-slate-800">{proyecto?.profundidad} m</p>
              </div>
              
              <div 
                className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm metrics-soft-animation"
                style={{ animationDelay: '0.2s' }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-5 h-5 bg-purple-500 rounded-sm"></div>
                </div>
                <p className="text-slate-500 text-xs font-medium mb-1">Volumen</p>
                <p className="text-lg font-bold text-slate-800">{proyecto?.area * proyecto?.profundidad} m³</p>
              </div>

              <div 
                className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm metrics-soft-animation"
                style={{ animationDelay: '0.25s' }}
              >
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <p className="text-slate-500 text-xs font-medium mb-1">Contratas</p>
                <p className="text-lg font-bold text-slate-800">{contratasData.filter(c => c.estado === 'activo').length}</p>
              </div>

              <div 
                className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm metrics-soft-animation"
                style={{ animationDelay: '0.3s' }}
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-slate-500 text-xs font-medium mb-1">Excavadoras</p>
                <p className="text-lg font-bold text-slate-800">{maquinariasData.filter(m => m.estado === 'operativo').length}/4</p>
              </div>
              
              <div 
                className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm metrics-soft-animation"
                style={{ animationDelay: '0.35s' }}
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <p className="text-slate-500 text-xs font-medium mb-1">Residente</p>
                <p className="text-sm font-bold text-slate-800 truncate">{proyecto?.residente}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación por pestañas expandida */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden tabs-animation">
          <div className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('excavaciones')}
              className={`flex-shrink-0 flex items-center justify-center gap-2 px-4 py-4 font-medium text-sm transition-all ${
                activeTab === 'excavaciones' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Grid3X3 size={16} />
              <span>Excavaciones</span>
            </button>

            <button 
              onClick={() => setActiveTab('contratas')}
              className={`flex-shrink-0 flex items-center justify-center gap-2 px-4 py-4 font-medium text-sm transition-all ${
                activeTab === 'contratas' 
                  ? 'bg-green-50 text-green-600 border-b-2 border-green-500' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Grid3X3 size={16} />
              <span>Contratas</span>
            </button>

            <button 
              onClick={() => setActiveTab('maquinarias')}
              className={`flex-shrink-0 flex items-center justify-center gap-2 px-4 py-4 font-medium text-sm transition-all ${
                activeTab === 'maquinarias' 
                  ? 'bg-yellow-50 text-yellow-600 border-b-2 border-yellow-500' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Truck size={16} />
              <span>Excavadoras</span>
            </button>

            <button 
              onClick={() => setActiveTab('presupuesto')}
              className={`flex-shrink-0 flex items-center justify-center gap-2 px-4 py-4 font-medium text-sm transition-all ${
                activeTab === 'presupuesto' 
                  ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-500' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Calculator size={16} />
              <span>Presupuesto</span>
            </button>

            <button 
              onClick={() => setActiveTab('graficos')}
              className={`flex-shrink-0 flex items-center justify-center gap-2 px-4 py-4 font-medium text-sm transition-all ${
                activeTab === 'graficos' 
                  ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-500' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BarChart3 size={16} />
              <span>Análisis</span>
            </button>
          </div>
        </div>

        {/* Contenido de las pestañas */}
        {loading ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 shadow-sm loading-animation">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 font-medium">Cargando información...</p>
          </div>
        ) : (
          <>
            {/* PESTAÑA 1: EXCAVACIONES */}
            {activeTab === 'excavaciones' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden content-animation">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">📋 Lista de Excavaciones</h2>
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
                  {excavacionesConProgreso.length === 0 ? (
                    <div className="text-center py-16 empty-state-animation">
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
                  )}
                </div>
              </div>
            )}

            {/* PESTAÑA 2: CONTRATAS */}
            {activeTab === 'contratas' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden content-animation">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">🤝 Gestión de Contratas</h2>
                      <p className="text-slate-600 text-sm">Administra contratas para excavación, eliminación de material y alquiler de maquinarias</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 px-4 py-2 rounded-full">
                        <span className="text-green-700 font-semibold text-sm">
                          Activas: {contratasData.filter(c => c.estado === 'activo').length}
                        </span>
                      </div>
                      <button
                        onClick={() => {}} // TODO: Agregar modal de contrata
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                      >
                        <Plus size={16} />
                        Nueva Contrata
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {contratasData.map((contrata, index) => (
                      <div
                        key={contrata.id}
                        className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow card-animation"
                        style={{ animationDelay: `${(index * 100) + 200}ms` }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              contrata.estado === 'activo' ? 'bg-green-500' :
                              contrata.estado === 'pendiente' ? 'bg-yellow-500' :
                              'bg-gray-400'
                            }`}></div>
                            <h3 className="font-bold text-slate-800">{contrata.nombre}</h3>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            contrata.cobertura === 'completa' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {contrata.cobertura === 'completa' ? '🔵 Completa' : '🟡 Parcial'}
                          </span>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Building2 size={14} />
                            <span className="font-medium">Tipo:</span>
                            <span className="capitalize">{contrata.tipo.replace('_', ' ')}</span>
                          </div>
                          
                          <div className="text-sm text-slate-600">
                            <span className="font-medium">Servicios:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {contrata.servicios.map((servicio, idx) => (
                                <span key={idx} className="px-2 py-1 bg-slate-100 rounded text-xs">
                                  {servicio}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="text-sm text-slate-600">
                            <span className="font-medium">Equipos:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {contrata.equipos.map((equipo, idx) => (
                                <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                  {equipo}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4 mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-slate-600">Presupuesto</span>
                            <span className="text-lg font-bold text-slate-800">
                              S/ {contrata.presupuesto_total.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ 
                                width: `${(contrata.presupuesto_asignado / contrata.presupuesto_total) * 100}%` 
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>Asignado: S/ {contrata.presupuesto_asignado.toLocaleString()}</span>
                            <span>
                              {Math.round((contrata.presupuesto_asignado / contrata.presupuesto_total) * 100)}%
                            </span>
                          </div>
                        </div>

                        <div className="text-xs text-slate-500 mb-4">
                          📞 {contrata.contacto}
                        </div>

                        <div className="flex gap-2">
                          <button className="flex-1 bg-slate-100 text-slate-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                            Ver Detalles
                          </button>
                          <button className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                            Asignar Presupuesto
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PESTAÑA 3: EXCAVADORAS */}
            {activeTab === 'maquinarias' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden content-animation">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 border-b border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">🚜 Control de Excavadoras</h2>
                      <p className="text-slate-600 text-sm">Gestiona todas las excavadoras asignadas al proyecto</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-yellow-100 px-4 py-2 rounded-full">
                        <span className="text-yellow-700 font-semibold text-sm">
                          Operativas: {maquinariasData.filter(m => m.estado === 'operativo').length}/4
                        </span>
                      </div>
                      <button
                        onClick={() => {}} // TODO: Agregar modal de maquinaria
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                      >
                        <Plus size={16} />
                        Asignar Excavadora
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {maquinariasData.map((maquinaria, index) => (
                      <div
                        key={maquinaria.id}
                        className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow card-animation"
                        style={{ animationDelay: `${(index * 100) + 200}ms` }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            maquinaria.estado === 'operativo' ? 'bg-green-100' :
                            maquinaria.estado === 'disponible' ? 'bg-blue-100' :
                            maquinaria.estado === 'mantenimiento' ? 'bg-red-100' :
                            'bg-gray-100'
                          }`}>
                            <Truck className={`w-6 h-6 ${
                              maquinaria.estado === 'operativo' ? 'text-green-600' :
                              maquinaria.estado === 'disponible' ? 'text-blue-600' :
                              maquinaria.estado === 'mantenimiento' ? 'text-red-600' :
                              'text-gray-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-slate-800 text-sm">{maquinaria.nombre}</h3>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              maquinaria.estado === 'operativo' ? 'bg-green-100 text-green-700' :
                              maquinaria.estado === 'disponible' ? 'bg-blue-100 text-blue-700' :
                              maquinaria.estado === 'mantenimiento' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {maquinaria.estado === 'operativo' ? '🟢 Operativo' :
                               maquinaria.estado === 'disponible' ? '🔵 Disponible' :
                               maquinaria.estado === 'mantenimiento' ? '🔴 Mantenimiento' :
                               '⚫ Fuera de servicio'}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="text-xs text-slate-600">
                            <span className="font-medium">Contrata:</span> {maquinaria.contrata}
                          </div>
                          <div className="text-xs text-slate-600">
                            <span className="font-medium">Ubicación:</span> {maquinaria.ubicacion}
                          </div>
                          <div className="text-xs text-slate-600">
                            <span className="font-medium">Operador:</span> {maquinaria.operador}
                          </div>
                          <div className="text-xs text-slate-600">
                            <span className="font-medium">Horas trabajadas:</span> {maquinaria.horas_trabajadas}h
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-medium text-slate-600">Mantenimiento</span>
                          <span className={`text-xs font-medium ${
                            maquinaria.mantenimiento === 'al_dia' ? 'text-green-600' :
                            maquinaria.mantenimiento === 'en_proceso' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {maquinaria.mantenimiento === 'al_dia' ? '✅ Al día' :
                             maquinaria.mantenimiento === 'en_proceso' ? '🔧 En proceso' :
                             '⚠️ Requerido'}
                          </span>
                        </div>

                        <button className="w-full bg-slate-100 text-slate-700 py-2 px-3 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors">
                          Ver Detalles
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PESTAÑA 4: PRESUPUESTO COMBINADO */}
            {activeTab === 'presupuesto' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden content-animation">
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 border-b border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">💰 Presupuesto Combinado de Excavación</h2>
                      <p className="text-slate-600 text-sm">Gestiona presupuestos completos y parciales de todas las contratas</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-100 px-4 py-2 rounded-full">
                        <span className="text-purple-700 font-semibold text-sm">
                          Total: S/ {contratasData.reduce((acc, c) => acc + c.presupuesto_total, 0).toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={() => {}} // TODO: Generar presupuesto combinado
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
                      >
                        <Calculator size={16} />
                        Generar Presupuesto
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  {/* Resumen general */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white text-center">
                      <h3 className="text-2xl font-bold">S/ {contratasData.reduce((acc, c) => acc + c.presupuesto_total, 0).toLocaleString()}</h3>
                      <p className="text-sm opacity-90">Presupuesto Total</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white text-center">
                      <h3 className="text-2xl font-bold">S/ {contratasData.reduce((acc, c) => acc + c.presupuesto_asignado, 0).toLocaleString()}</h3>
                      <p className="text-sm opacity-90">Presupuesto Asignado</p>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl text-white text-center">
                      <h3 className="text-2xl font-bold">S/ {contratasData.reduce((acc, c) => acc + (c.presupuesto_total - c.presupuesto_asignado), 0).toLocaleString()}</h3>
                      <p className="text-sm opacity-90">Pendiente Asignar</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white text-center">
                      <h3 className="text-2xl font-bold">{Math.round((contratasData.reduce((acc, c) => acc + c.presupuesto_asignado, 0) / contratasData.reduce((acc, c) => acc + c.presupuesto_total, 0)) * 100)}%</h3>
                      <p className="text-sm opacity-90">Avance Presupuestal</p>
                    </div>
                  </div>

                  {/* Desglose por contrata */}
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                      <h3 className="font-bold text-slate-800">Desglose por Contrata</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contrata</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Cobertura</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Presupuesto Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Asignado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Pendiente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                          {contratasData.map((contrata) => (
                            <tr key={contrata.id} className="hover:bg-slate-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-slate-900">{contrata.nombre}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-slate-600 capitalize">{contrata.tipo.replace('_', ' ')}</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  contrata.cobertura === 'completa' 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {contrata.cobertura}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">
                                S/ {contrata.presupuesto_total.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                                S/ {contrata.presupuesto_asignado.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                                S/ {(contrata.presupuesto_total - contrata.presupuesto_asignado).toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  contrata.estado === 'activo' ? 'bg-green-100 text-green-800' :
                                  contrata.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {contrata.estado}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-purple-600 hover:text-purple-900 mr-3">
                                  Asignar
                                </button>
                                <button className="text-blue-600 hover:text-blue-900">
                                  Editar
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Área para presupuesto combinado */}
                  <div className="mt-8 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
                    <h3 className="font-bold text-slate-800 mb-4">💡 Generador de Presupuesto Combinado</h3>
                    <p className="text-slate-600 text-sm mb-4">
                      Combina presupuestos completos y parciales para crear un presupuesto integral de excavación.
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors font-medium">
                        Generar Presupuesto PDF
                      </button>
                      <button className="bg-white border border-purple-300 text-purple-700 px-6 py-2 rounded-lg hover:bg-purple-50 transition-colors font-medium">
                        Exportar Excel
                      </button>
                      <button className="bg-white border border-purple-300 text-purple-700 px-6 py-2 rounded-lg hover:bg-purple-50 transition-colors font-medium">
                        Configurar Plantilla
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PESTAÑA 5: GRÁFICOS */}
            {activeTab === 'graficos' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden content-animation">
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 border-b border-indigo-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">📊 Dashboard de Análisis</h2>
                      <p className="text-slate-600 text-sm">Visualización completa del progreso y métricas del proyecto</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-indigo-600" />
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
                  {/* Métricas principales expandidas */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white text-center metrics-card-animation"
                      style={{ animationDelay: '0.1s' }}
                    >
                      <p className="text-2xl font-bold">{excavacionesConProgreso.length}</p>
                      <p className="text-xs opacity-90">Excavaciones</p>
                    </div>
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl text-white text-center metrics-card-animation"
                      style={{ animationDelay: '0.15s' }}
                    >
                      <p className="text-2xl font-bold">
                        {Math.round(excavacionesConProgreso.reduce((acc, exc) => acc + (exc.progreso || 0), 0) / excavacionesConProgreso.length) || 0}%
                      </p>
                      <p className="text-xs opacity-90">Progreso</p>
                    </div>
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-xl text-white text-center metrics-card-animation"
                      style={{ animationDelay: '0.2s' }}
                    >
                      <p className="text-2xl font-bold">{contratasData.filter(c => c.estado === 'activo').length}</p>
                      <p className="text-xs opacity-90">Contratas</p>
                    </div>
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl text-white text-center metrics-card-animation"
                      style={{ animationDelay: '0.25s' }}
                    >
                      <p className="text-2xl font-bold">{maquinariasData.filter(m => m.estado === 'operativo').length}</p>
                      <p className="text-xs opacity-90">Excavadoras</p>
                    </div>
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white text-center metrics-card-animation"
                      style={{ animationDelay: '0.3s' }}
                    >
                      <p className="text-xl font-bold">S/ {Math.round(contratasData.reduce((acc, c) => acc + c.presupuesto_total, 0) / 1000)}K</p>
                      <p className="text-xs opacity-90">Presupuesto</p>
                    </div>
                    <div 
                      className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-xl text-white text-center metrics-card-animation"
                      style={{ animationDelay: '0.35s' }}
                    >
                      <p className="text-xl font-bold">
                        {excavacionesConProgreso.reduce((acc, exc) => acc + (exc.volumen_excavado || 0), 0)} m³
                      </p>
                      <p className="text-xs opacity-90">Vol. Excavado</p>
                    </div>
                  </div>

                  {/* Dashboard principal */}
                  <div className="min-h-[600px] dashboard-animation">
                    <ExcavacionDashboard excavaciones={excavacionesConProgreso} />
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