import React, { useState } from 'react';
import { useApp } from '../context/ThemeContext';
import {
  Building,
  Layers,
  Grid,
  Square,
  ArrowLeft,
  Plus,
  CheckCircle,
  Clock,
  Activity,
  AlertTriangle,
  MapPin,
  Calendar,
  Users,
  Truck,
  Target,
  TrendingUp,
  Eye,
  ChevronRight,
  Settings
} from 'lucide-react';

const ExcavacionSystem = () => {
  const { theme } = useApp();
  const [currentView, setCurrentView] = useState('proyectos'); // proyectos, excavaciones, anillos, sectores
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExcavacion, setSelectedExcavacion] = useState(null);
  const [selectedAnillo, setSelectedAnillo] = useState(null);

  // Datos de proyectos de excavación
  const proyectosExcavacion = [
    {
      id: 'proyecto-1',
      nombre: 'Torre Residencial Norte',
      ubicacion: 'Av. Libertador 1250',
      estado: 'en-progreso',
      fechaInicio: '2025-03-15',
      fechaEstimada: '2025-08-30',
      supervisor: 'Carlos Mendoza',
      profundidadTotal: '15m',
      areaTotal: '1,200 m²',
      progreso: 68,
      excavaciones: [
        {
          id: 'exc-1',
          nombre: 'Excavación Principal - Sótanos',
          profundidad: '15m',
          area: '1,200 m²',
          progreso: 68,
          estado: 'en-progreso',
          anillos: 5
        }
      ]
    },
    {
      id: 'proyecto-2', 
      nombre: 'Centro Comercial Plaza',
      ubicacion: 'Calle 45 #23-67',
      estado: 'completado',
      fechaInicio: '2025-01-10',
      fechaEstimada: '2025-04-25',
      supervisor: 'Ana García',
      profundidadTotal: '12m',
      areaTotal: '2,800 m²',
      progreso: 100,
      excavaciones: [
        {
          id: 'exc-2',
          nombre: 'Excavación Zona A - Sótano Comercial',
          profundidad: '8m',
          area: '1,600 m²',
          progreso: 100,
          estado: 'completado',
          anillos: 4
        },
        {
          id: 'exc-3',
          nombre: 'Excavación Zona B - Parqueadero',
          profundidad: '12m',
          area: '1,200 m²',
          progreso: 100,
          estado: 'completado',
          anillos: 3
        }
      ]
    },
    {
      id: 'proyecto-3',
      nombre: 'Edificio Corporativo Sur',
      ubicacion: 'Carrera 15 #89-34',
      estado: 'planificado',
      fechaInicio: '2025-07-01',
      fechaEstimada: '2025-11-15',
      supervisor: 'Roberto Silva',
      profundidadTotal: '18m',
      areaTotal: '900 m²',
      progreso: 15,
      excavaciones: [
        {
          id: 'exc-4',
          nombre: 'Excavación Única - Edificio Corporativo',
          profundidad: '18m',
          area: '900 m²',
          progreso: 15,
          estado: 'planificado',
          anillos: 6
        }
      ]
    }
  ];
  // Datos detallados de anillos por excavación
  const getAnillosData = (excavacionId) => {
    const anillosMap = {
      'exc-1': [
        { id: 'anillo-1', numero: 1, profundidad: '0-3m', sectores: 8, progreso: 100, estado: 'completado' },
        { id: 'anillo-2', numero: 2, profundidad: '3-6m', sectores: 8, progreso: 100, estado: 'completado' },
        { id: 'anillo-3', numero: 3, profundidad: '6-9m', sectores: 8, progreso: 85, estado: 'en-progreso' },
        { id: 'anillo-4', numero: 4, profundidad: '9-12m', sectores: 8, progreso: 45, estado: 'en-progreso' },
        { id: 'anillo-5', numero: 5, profundidad: '12-15m', sectores: 8, progreso: 0, estado: 'planificado' }
      ],
      'exc-2': [
        { id: 'anillo-6', numero: 1, profundidad: '0-2m', sectores: 6, progreso: 100, estado: 'completado' },
        { id: 'anillo-7', numero: 2, profundidad: '2-4m', sectores: 6, progreso: 100, estado: 'completado' },
        { id: 'anillo-8', numero: 3, profundidad: '4-6m', sectores: 6, progreso: 100, estado: 'completado' },
        { id: 'anillo-9', numero: 4, profundidad: '6-8m', sectores: 6, progreso: 100, estado: 'completado' }
      ],
      'exc-3': [
        { id: 'anillo-10', numero: 1, profundidad: '0-4m', sectores: 6, progreso: 100, estado: 'completado' },
        { id: 'anillo-11', numero: 2, profundidad: '4-8m', sectores: 6, progreso: 100, estado: 'completado' },
        { id: 'anillo-12', numero: 3, profundidad: '8-12m', sectores: 6, progreso: 100, estado: 'completado' }
      ],
      'exc-4': [
        { id: 'anillo-13', numero: 1, profundidad: '0-3m', sectores: 10, progreso: 60, estado: 'en-progreso' },
        { id: 'anillo-14', numero: 2, profundidad: '3-6m', sectores: 10, progreso: 20, estado: 'en-progreso' },
        { id: 'anillo-15', numero: 3, profundidad: '6-9m', sectores: 10, progreso: 0, estado: 'planificado' },
        { id: 'anillo-16', numero: 4, profundidad: '9-12m', sectores: 10, progreso: 0, estado: 'planificado' },
        { id: 'anillo-17', numero: 5, profundidad: '12-15m', sectores: 10, progreso: 0, estado: 'planificado' },
        { id: 'anillo-18', numero: 6, profundidad: '15-18m', sectores: 10, progreso: 0, estado: 'planificado' }
      ]
    };
    return anillosMap[excavacionId] || [];
  };

  // Datos de sectores por anillo
  const getSectoresData = (anilloId) => {
    // Generar sectores dinámicamente basado en el anillo
    const anillo = getAnillosData(selectedExcavacion?.id).find(a => a.id === anilloId);
    if (!anillo) return [];

    return Array.from({ length: anillo.sectores }, (_, index) => ({
      id: `sector-${anilloId}-${index + 1}`,
      numero: index + 1,
      letra: String.fromCharCode(65 + index), // A, B, C, etc.
      panosTotal: Math.floor(Math.random() * 8) + 4, // 4-12 paños por sector
      panosCompletados: Math.floor(Math.random() * 8) + (anillo.progreso > 80 ? 6 : 2),
      progreso: anillo.progreso > 80 ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * anillo.progreso),
      estado: anillo.progreso === 100 ? 'completado' : anillo.progreso > 0 ? 'en-progreso' : 'planificado'
    }));
  };

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'completado':
        return 'bg-green-100 text-green-600 border-green-200';
      case 'en-progreso':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'planificado':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (estado) => {
    switch (estado) {
      case 'completado':
        return <CheckCircle size={16} />;
      case 'en-progreso':
        return <Activity size={16} />;
      case 'planificado':
        return <Clock size={16} />;
      default:
        return <AlertTriangle size={16} />;
    }
  };

  // Vista de sectores
  if (currentView === 'sectores' && selectedAnillo) {
    const sectores = getSectoresData(selectedAnillo.id);
    const anillo = getAnillosData(selectedExcavacion?.id).find(a => a.id === selectedAnillo.id);

    return (
      <div className="space-y-6">
        {/* Header con navegación */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentView('anillos')}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <ArrowLeft className="text-content-primary" size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-content-primary">
              Anillo {anillo.numero} - Sectores
            </h1>
            <p className="text-content-secondary">
              {selectedProject?.nombre} → {selectedExcavacion?.nombre} → Profundidad: {anillo.profundidad}
            </p>
          </div>
        </div>

        {/* Información del anillo */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-content-secondary text-sm">Progreso General</p>
              <p className="text-2xl font-bold text-content-primary">{anillo.progreso}%</p>
            </div>
            <div className="text-center">
              <p className="text-content-secondary text-sm">Total Sectores</p>
              <p className="text-2xl font-bold text-content-primary">{sectores.length}</p>
            </div>
            <div className="text-center">
              <p className="text-content-secondary text-sm">Completados</p>
              <p className="text-2xl font-bold text-content-primary">
                {sectores.filter(s => s.estado === 'completado').length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-content-secondary text-sm">En Progreso</p>
              <p className="text-2xl font-bold text-content-primary">
                {sectores.filter(s => s.estado === 'en-progreso').length}
              </p>
            </div>
          </div>
        </div>

        {/* Grid de sectores */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sectores.map((sector) => (
            <div key={sector.id} className="bg-surface rounded-xl p-4 border border-border hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-content-primary">
                  Sector {sector.letra}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(sector.estado)}`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(sector.estado)}
                    <span className="capitalize">{sector.estado.replace('-', ' ')}</span>
                  </div>
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-content-secondary">Progreso</span>
                  <span className="font-medium text-content-primary">{sector.progreso}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all" 
                    style={{ width: `${sector.progreso}%` }}
                  ></div>
                </div>

                <div className="text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-content-secondary">Paños:</span>
                    <span className="font-medium text-content-primary">
                      {sector.panosCompletados}/{sector.panosTotal}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1 mt-3">
                  {Array.from({ length: sector.panosTotal }, (_, index) => (
                    <div
                      key={index}
                      className={`h-4 rounded ${
                        index < sector.panosCompletados
                          ? 'bg-primary'
                          : 'bg-background border border-border'
                      }`}
                      title={`Paño ${index + 1} - ${index < sector.panosCompletados ? 'Completado' : 'Pendiente'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vista de anillos
  if (currentView === 'anillos' && selectedExcavacion) {
    const anillos = getAnillosData(selectedExcavacion.id);

    return (
      <div className="space-y-6">
        {/* Header con navegación */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentView('excavaciones')}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <ArrowLeft className="text-content-primary" size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-content-primary">
              {selectedExcavacion.nombre} - Anillos
            </h1>
            <p className="text-content-secondary">
              {selectedProject?.nombre} → Profundidad total: {selectedExcavacion.profundidad}
            </p>
          </div>
        </div>

        {/* Información de la excavación */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-content-secondary text-sm">Progreso Total</p>
              <p className="text-2xl font-bold text-content-primary">{selectedExcavacion.progreso}%</p>
            </div>
            <div className="text-center">
              <p className="text-content-secondary text-sm">Total Anillos</p>
              <p className="text-2xl font-bold text-content-primary">{anillos.length}</p>
            </div>
            <div className="text-center">
              <p className="text-content-secondary text-sm">Área</p>
              <p className="text-2xl font-bold text-content-primary">{selectedExcavacion.area}</p>
            </div>
            <div className="text-center">
              <p className="text-content-secondary text-sm">Profundidad</p>
              <p className="text-2xl font-bold text-content-primary">{selectedExcavacion.profundidad}</p>
            </div>
          </div>
        </div>

        {/* Lista de anillos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {anillos.map((anillo) => (
            <div 
              key={anillo.id} 
              className="bg-surface rounded-xl p-6 border border-border hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => {
                setSelectedAnillo(anillo);
                setCurrentView('sectores');
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-content-primary group-hover:text-primary transition-colors">
                    Anillo {anillo.numero}
                  </h3>
                  <p className="text-content-secondary text-sm">
                    Profundidad: {anillo.profundidad}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(anillo.estado)}`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(anillo.estado)}
                    <span className="capitalize">{anillo.estado.replace('-', ' ')}</span>
                  </div>
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-content-secondary">Progreso</span>
                  <span className="font-medium text-content-primary">{anillo.progreso}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all" 
                    style={{ width: `${anillo.progreso}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center space-x-2 text-sm text-content-secondary">
                    <Grid size={14} />
                    <span>{anillo.sectores} sectores</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-primary">
                    <Eye size={14} />
                    <span>Ver sectores</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vista de excavaciones de un proyecto
  if (currentView === 'excavaciones' && selectedProject) {
    return (
      <div className="space-y-6">
        {/* Header con navegación */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentView('proyectos')}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <ArrowLeft className="text-content-primary" size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-content-primary">
              {selectedProject.nombre} - Excavaciones
            </h1>
            <p className="text-content-secondary">
              {selectedProject.ubicacion} → Supervisor: {selectedProject.supervisor}
            </p>
          </div>
        </div>

        {/* Información del proyecto */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-content-secondary text-sm">Progreso General</p>
              <p className="text-2xl font-bold text-content-primary">{selectedProject.progreso}%</p>
            </div>
            <div className="text-center">
              <p className="text-content-secondary text-sm">Excavaciones</p>
              <p className="text-2xl font-bold text-content-primary">{selectedProject.excavaciones.length}</p>
            </div>
            <div className="text-center">
              <p className="text-content-secondary text-sm">Área Total</p>
              <p className="text-2xl font-bold text-content-primary">{selectedProject.areaTotal}</p>
            </div>
            <div className="text-center">
              <p className="text-content-secondary text-sm">Profundidad</p>
              <p className="text-2xl font-bold text-content-primary">{selectedProject.profundidadTotal}</p>
            </div>
          </div>
        </div>

        {/* Lista de excavaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selectedProject.excavaciones.map((excavacion) => (
            <div 
              key={excavacion.id} 
              className="bg-surface rounded-xl p-6 border border-border hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => {
                setSelectedExcavacion(excavacion);
                setCurrentView('anillos');
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-content-primary group-hover:text-primary transition-colors">
                    {excavacion.nombre}
                  </h3>
                  <p className="text-content-secondary text-sm">
                    Área: {excavacion.area} | Profundidad: {excavacion.profundidad}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(excavacion.estado)}`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(excavacion.estado)}
                    <span className="capitalize">{excavacion.estado.replace('-', ' ')}</span>
                  </div>
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-content-secondary">Progreso</span>
                  <span className="font-medium text-content-primary">{excavacion.progreso}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all" 
                    style={{ width: `${excavacion.progreso}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center space-x-2 text-sm text-content-secondary">
                    <Layers size={14} />
                    <span>{excavacion.anillos} anillos</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-primary">
                    <Eye size={14} />
                    <span>Ver anillos</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vista principal de proyectos
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-2xl p-6 border border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Building className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-content-primary">
                Proyectos de Excavación
              </h1>
              <p className="text-content-secondary">
                Gestión completa de excavaciones por proyecto
              </p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            <Plus size={16} />
            <span>Nuevo Proyecto</span>
          </button>
        </div>
      </div>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-content-secondary text-sm">Total Proyectos</p>
              <p className="text-2xl font-bold text-content-primary">{proyectosExcavacion.length}</p>
            </div>
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Building size={20} />
            </div>
          </div>
        </div>
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-content-secondary text-sm">En Progreso</p>
              <p className="text-2xl font-bold text-content-primary">
                {proyectosExcavacion.filter(p => p.estado === 'en-progreso').length}
              </p>
            </div>
            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
              <Activity size={20} />
            </div>
          </div>
        </div>
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-content-secondary text-sm">Completados</p>
              <p className="text-2xl font-bold text-content-primary">
                {proyectosExcavacion.filter(p => p.estado === 'completado').length}
              </p>
            </div>
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <CheckCircle size={20} />
            </div>
          </div>
        </div>
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-content-secondary text-sm">Total Excavaciones</p>
              <p className="text-2xl font-bold text-content-primary">
                {proyectosExcavacion.reduce((sum, p) => sum + p.excavaciones.length, 0)}
              </p>
            </div>
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <Layers size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de proyectos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {proyectosExcavacion.map((proyecto) => (
          <div 
            key={proyecto.id} 
            className="bg-surface rounded-xl p-6 border border-border hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => {
              setSelectedProject(proyecto);
              setCurrentView('excavaciones');
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-content-primary group-hover:text-primary transition-colors">
                  {proyecto.nombre}
                </h3>
                <p className="text-content-secondary text-sm">
                  {proyecto.ubicacion}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(proyecto.estado)}`}>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(proyecto.estado)}
                  <span className="capitalize">{proyecto.estado.replace('-', ' ')}</span>
                </div>
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-content-secondary">Progreso</span>
                <span className="font-medium text-content-primary">{proyecto.progreso}%</span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all" 
                  style={{ width: `${proyecto.progreso}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-content-secondary">Profundidad:</span>
                  <span className="font-medium text-content-primary ml-1">{proyecto.profundidadTotal}</span>
                </div>
                <div>
                  <span className="text-content-secondary">Área:</span>
                  <span className="font-medium text-content-primary ml-1">{proyecto.areaTotal}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center space-x-2 text-sm text-content-secondary">
                  <MapPin size={14} />
                  <span>Supervisor: {proyecto.supervisor}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-content-secondary">
                  <Layers size={14} />
                  <span>{proyecto.excavaciones.length} excavación{proyecto.excavaciones.length > 1 ? 'es' : ''}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExcavacionSystem;
      proyecto: 'Torre Residencial Norte',
      status: 'en-progreso',
      progreso: 75,
      profundidad: '12m',
      volumen: '2,450 m³',
      fechaInicio: '2025-05-15',
      fechaEstimada: '2025-06-20',
      supervisor: 'Carlos Mendoza',
      maquinaria: ['Excavadora CAT 320', 'Retroexcavadora JCB', 'Dumper Volvo'],
      personal: 8,
      ubicacion: 'Sector A - Zona 1'
    },
    {
      id: 'modulo-2',
      nombre: 'Excavación Sótano Comercial',
      proyecto: 'Centro Comercial Plaza',
      status: 'completado',
      progreso: 100,
      profundidad: '8m',
      volumen: '1,850 m³',
      fechaInicio: '2025-04-20',
      fechaEstimada: '2025-05-25',
      supervisor: 'Ana García',
      maquinaria: ['Excavadora Hitachi', 'Miniexcavadora Bobcat'],
      personal: 6,
      ubicacion: 'Sector B - Zona 2'
    },
    {
      id: 'modulo-3',
      nombre: 'Excavación Tanque Almacenamiento',
      proyecto: 'Planta Industrial Sur',
      status: 'planificado',
      progreso: 15,
      profundidad: '15m',
      volumen: '3,200 m³',
      fechaInicio: '2025-06-10',
      fechaEstimada: '2025-07-30',
      supervisor: 'Roberto Silva',
      maquinaria: ['Excavadora CAT 345', 'Dumper Mercedes'],
      personal: 12,
      ubicacion: 'Sector C - Zona Industrial'
    },
    {
      id: 'modulo-4',
      nombre: 'Excavación Acceso Vehicular',
      proyecto: 'Conjunto Habitacional',
      status: 'en-progreso',
      progreso: 45,
      profundidad: '3m',
      volumen: '890 m³',
      fechaInicio: '2025-05-28',
      fechaEstimada: '2025-06-15',
      supervisor: 'María López',
      maquinaria: ['Miniexcavadora Caterpillar', 'Compactador'],
      personal: 4,
      ubicacion: 'Sector D - Entrada Principal'
    }
  ];

  // Datos detallados para cada módulo
  const getModuleDetails = (moduleId) => {
    const module = excavacionModules.find(m => m.id === moduleId);
    return {
      manoObra: {
        supervisor: module.supervisor,
        operadores: Math.floor(module.personal * 0.6),
        ayudantes: Math.floor(module.personal * 0.3),
        seguridad: Math.floor(module.personal * 0.1),
        turnos: ['07:00-15:00', '15:00-23:00'],
        capacitaciones: ['Seguridad en Excavación', 'Manejo de Maquinaria', 'Primeros Auxilios']
      },
      maquinariaAsignada: {
        principal: module.maquinaria,
        herramientas: ['Picas', 'Palas', 'Niveles láser', 'GPS topográfico'],
        mantenimiento: 'Al día',
        combustible: '85% disponible',
        operatividad: '98%'
      },
      seguridadCalidad: {
        inspecciones: 'Diarias',
        incidentes: 0,
        certificaciones: ['ISO 45001', 'OHSAS 18001'],
        equiposProteccion: ['Cascos', 'Chalecos', 'Botas', 'Guantes'],
        monitoreoAmbiental: 'Activo'
      },
      planificacionControl: {
        cronograma: 'En tiempo',
        presupuesto: '92% utilizado',
        materialesRetirados: `${Math.floor(parseInt(module.volumen) * 0.7)} m³`,
        proximaEtapa: 'Compactación de base',
        riesgos: ['Lluvias estacionales', 'Servicios subterráneos']
      }
    };
  };

  // Secciones disponibles para cada módulo
  const moduleSections = [
    {
      id: 'mano-obra',
      title: 'Mano de Obra',
      icon: Users,
      description: 'Personal asignado y gestión de recursos humanos'
    },
    {
      id: 'maquinaria',
      title: 'Maquinaria Asignada',
      icon: Settings,
      description: 'Equipos, herramientas y mantenimiento'
    },
    {
      id: 'seguridad',
      title: 'Seguridad y Calidad',
      icon: HardHat,
      description: 'Protocolos de seguridad y control de calidad'
    },
    {
      id: 'planificacion',
      title: 'Planificación y Control',
      icon: Target,
      description: 'Cronograma, presupuesto y seguimiento'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completado':
        return 'bg-green-100 text-green-600 border-green-200';
      case 'en-progreso':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'planificado':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completado':
        return <CheckCircle size={20} />;
      case 'en-progreso':
        return <Activity size={20} />;
      case 'planificado':
        return <Clock size={20} />;
      default:
        return <AlertTriangle size={20} />;
    }
  };

  if (selectedModule) {
    const moduleData = excavacionModules.find(m => m.id === selectedModule);
    const details = getModuleDetails(selectedModule);

    return (
      <div className="space-y-6">
        {/* Header con botón de regreso */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedModule(null)}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <ArrowLeft className="text-content-primary" size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-content-primary">
              {moduleData.nombre}
            </h1>
            <p className="text-content-secondary">
              {moduleData.proyecto} - {moduleData.ubicacion}
            </p>
          </div>
        </div>

        {/* Información del módulo */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-content-secondary text-sm">Progreso</p>
              <p className="text-2xl font-bold text-content-primary">{moduleData.progreso}%</p>
            </div>
            <div className="text-center">
              <p className="text-content-secondary text-sm">Profundidad</p>
              <p className="text-2xl font-bold text-content-primary">{moduleData.profundidad}</p>
            </div>
            <div className="text-center">
              <p className="text-content-secondary text-sm">Volumen</p>
              <p className="text-2xl font-bold text-content-primary">{moduleData.volumen}</p>
            </div>
            <div className="text-center">
              <p className="text-content-secondary text-sm">Personal</p>
              <p className="text-2xl font-bold text-content-primary">{moduleData.personal}</p>
            </div>
          </div>
        </div>

        {/* Navegación de secciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {moduleSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  group relative p-4 rounded-xl border transition-all duration-200
                  ${isActive
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                    : 'bg-surface border-border hover:border-primary/50 hover:bg-primary/5'
                  }
                `}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <Icon 
                    size={24} 
                    className={isActive ? 'text-white' : 'text-primary'} 
                  />
                  <span className={`font-medium text-sm ${
                    isActive ? 'text-white' : 'text-content-primary'
                  }`}>
                    {section.title}
                  </span>
                </div>
                
                {isActive && (
                  <ChevronRight 
                    size={16} 
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white" 
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Contenido de la sección activa */}
        <div className="min-h-96">
          {activeSection === 'mano-obra' && (
            <ManoObraModule data={details.manoObra} moduleData={moduleData} />
          )}
          {activeSection === 'maquinaria' && (
            <MaquinariaModule data={details.maquinariaAsignada} moduleData={moduleData} />
          )}
          {activeSection === 'seguridad' && (
            <SeguridadModule data={details.seguridadCalidad} moduleData={moduleData} />
          )}
          {activeSection === 'planificacion' && (
            <PlanificacionModule data={details.planificacionControl} moduleData={moduleData} />
          )}
        </div>
      </div>
    );
  }

  // Vista principal con lista de módulos
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-2xl p-6 border border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Truck className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-content-primary">
                Módulos de Excavación
              </h1>
              <p className="text-content-secondary">
                Gestión y seguimiento de proyectos de excavación
              </p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            <Plus size={16} />
            <span>Nuevo Módulo</span>
          </button>
        </div>
      </div>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-content-secondary text-sm">Total Módulos</p>
              <p className="text-2xl font-bold text-content-primary">{excavacionModules.length}</p>
            </div>
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Target size={20} />
            </div>
          </div>
        </div>
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-content-secondary text-sm">En Progreso</p>
              <p className="text-2xl font-bold text-content-primary">
                {excavacionModules.filter(m => m.status === 'en-progreso').length}
              </p>
            </div>
            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
              <Activity size={20} />
            </div>
          </div>
        </div>
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-content-secondary text-sm">Completados</p>
              <p className="text-2xl font-bold text-content-primary">
                {excavacionModules.filter(m => m.status === 'completado').length}
              </p>
            </div>
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <CheckCircle size={20} />
            </div>
          </div>
        </div>
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-content-secondary text-sm">Personal Total</p>
              <p className="text-2xl font-bold text-content-primary">
                {excavacionModules.reduce((sum, m) => sum + m.personal, 0)}
              </p>
            </div>
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <Users size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de módulos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {excavacionModules.map((module) => (
          <div 
            key={module.id} 
            className="bg-surface rounded-xl p-6 border border-border hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => setSelectedModule(module.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-content-primary group-hover:text-primary transition-colors">
                  {module.nombre}
                </h3>
                <p className="text-content-secondary text-sm">
                  {module.proyecto}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(module.status)}`}>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(module.status)}
                  <span className="capitalize">{module.status.replace('-', ' ')}</span>
                </div>
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-content-secondary">Progreso</span>
                <span className="font-medium text-content-primary">{module.progreso}%</span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all" 
                  style={{ width: `${module.progreso}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-content-secondary">Profundidad:</span>
                  <span className="font-medium text-content-primary ml-1">{module.profundidad}</span>
                </div>
                <div>
                  <span className="text-content-secondary">Volumen:</span>
                  <span className="font-medium text-content-primary ml-1">{module.volumen}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center space-x-2 text-sm text-content-secondary">
                  <MapPin size={14} />
                  <span>{module.ubicacion}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-content-secondary">
                  <Users size={14} />
                  <span>{module.personal} personas</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para Mano de Obra
const ManoObraModule = ({ data, moduleData }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-content-primary">
      Mano de Obra - {moduleData.nombre}
    </h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-surface rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-content-primary mb-4">Personal Asignado</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <span className="text-content-primary">Supervisor</span>
            <span className="font-medium text-primary">{data.supervisor}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <span className="text-content-primary">Operadores</span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
              {data.operadores} personas
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <span className="text-content-primary">Ayudantes</span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
              {data.ayudantes} personas
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <span className="text-content-primary">Seguridad</span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
              {data.seguridad} personas
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-surface rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-content-primary mb-4">Horarios y Capacitación</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-content-primary mb-2">Turnos de Trabajo</h4>
            {data.turnos.map((turno, index) => (
              <div key={index} className="p-3 bg-background rounded-lg mb-2">
                <span className="text-content-primary">Turno {index + 1}: {turno}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 className="font-medium text-content-primary mb-2">Capacitaciones</h4>
            {data.capacitaciones.map((capacitacion, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 text-sm">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-content-primary">{capacitacion}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Componente para Maquinaria
const MaquinariaModule = ({ data, moduleData }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-content-primary">
      Maquinaria Asignada - {moduleData.nombre}
    </h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-surface rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-content-primary mb-4">Maquinaria Principal</h3>
        <div className="space-y-3">
          {data.principal.map((maquina, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Truck size={16} className="text-primary" />
                </div>
                <span className="text-content-primary">{maquina}</span>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                Operativa
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium text-content-primary mb-3">Estado General</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-background rounded-lg">
              <span className="text-content-secondary">Operatividad:</span>
              <span className="font-medium text-green-600 ml-1">{data.operatividad}</span>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <span className="text-content-secondary">Combustible:</span>
              <span className="font-medium text-blue-600 ml-1">{data.combustible}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-surface rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-content-primary mb-4">Herramientas y Mantenimiento</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-content-primary mb-2">Herramientas Asignadas</h4>
            {data.herramientas.map((herramienta, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 text-sm">
                <Wrench size={16} className="text-primary" />
                <span className="text-content-primary">{herramienta}</span>
              </div>
            ))}
          </div>
          <div className="p-4 bg-background rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Settings size={16} className="text-primary" />
              <span className="font-medium text-content-primary">Estado de Mantenimiento</span>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
              {data.mantenimiento}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Componente para Seguridad
const SeguridadModule = ({ data, moduleData }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-content-primary">
      Seguridad y Calidad - {moduleData.nombre}
    </h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-surface rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-content-primary mb-4">Protocolos de Seguridad</h3>
        <div className="space-y-4">
          <div className="p-4 bg-background rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-content-primary">Inspecciones</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                {data.inspecciones}
              </span>
            </div>
          </div>
          <div className="p-4 bg-background rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-content-primary">Incidentes</span>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                {data.incidentes} reportados
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-content-primary mb-2">Certificaciones</h4>
            {data.certificaciones.map((cert, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 text-sm">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-content-primary">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-surface rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-content-primary mb-4">Equipos de Protección</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {data.equiposProteccion.map((equipo, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-background rounded-lg">
                <HardHat size={16} className="text-primary" />
                <span className="text-content-primary text-sm">{equipo}</span>
              </div>
            ))}
          </div>
          <div className="p-4 bg-background rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Activity size={16} className="text-primary" />
              <span className="font-medium text-content-primary">Monitoreo Ambiental</span>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
              {data.monitoreoAmbiental}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Componente para Planificación
const PlanificacionModule = ({ data, moduleData }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-content-primary">
      Planificación y Control - {moduleData.nombre}
    </h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-surface rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-content-primary mb-4">Estado del Proyecto</h3>
        <div className="space-y-4">
          <div className="p-4 bg-background rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-content-primary">Cronograma</span>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                {data.cronograma}
              </span>
            </div>
          </div>
          <div className="p-4 bg-background rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-content-primary">Presupuesto</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                {data.presupuesto}
              </span>
            </div>
          </div>
          <div className="p-4 bg-background rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-content-primary">Material Retirado</span>
              <span className="font-bold text-content-primary">
                {data.materialesRetirados}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-surface rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-content-primary mb-4">Próximas Etapas y Riesgos</h3>
        <div className="space-y-4">
          <div className="p-4 bg-background rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target size={16} className="text-primary" />
              <span className="font-medium text-content-primary">Próxima Etapa</span>
            </div>
            <span className="text-content-secondary">{data.proximaEtapa}</span>
          </div>
          <div>
            <h4 className="font-medium text-content-primary mb-2">Riesgos Identificados</h4>
            {data.riesgos.map((riesgo, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 text-sm">
                <AlertTriangle size={16} className="text-yellow-500" />
                <span className="text-content-primary">{riesgo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ExcavacionModules;
