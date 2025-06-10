import React, { useState } from 'react';
import { useApp } from '../context/ThemeContext';
import {
  FolderOpen,
  Users,
  FileCheck,
  Building2,
  Calendar,
  ChevronRight,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const ProjectSections = ({ projectType, projectData = {} }) => {
  const { theme } = useApp();
  const [activeSection, setActiveSection] = useState('mano-obra'); // Cambiar default a mano-obra
  // Definir las secciones disponibles (sin Gestión de Proyecto)
  const sections = [
    {
      id: 'mano-obra',
      title: 'Mano de Obra',
      icon: Users,
      description: 'Gestión de personal y recursos humanos'
    },
    {
      id: 'permisos',
      title: 'Permisos',
      icon: FileCheck,
      description: 'Documentación y permisos requeridos'
    },
    {
      id: 'campamento',
      title: 'Campamento',
      icon: Building2,
      description: 'Instalaciones y logística del sitio'
    },
    {
      id: 'look-ahead',
      title: 'Look Ahead',
      icon: Calendar,
      description: 'Planificación a futuro y cronograma'
    }
  ];
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'mano-obra':
        return <ManoObra projectType={projectType} data={projectData.manoObra} />;
      case 'permisos':
        return <Permisos projectType={projectType} data={projectData.permisos} />;
      case 'campamento':
        return <Campamento projectType={projectType} data={projectData.campamento} />;
      case 'look-ahead':
        return <LookAhead projectType={projectType} data={projectData.lookAhead} />;
      default:
        return <ManoObra projectType={projectType} data={projectData.manoObra} />;
    }
  };

  return (
    <div className="space-y-6">      {/* Header del Proyecto */}
      <div className="bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-2xl p-6 border border-primary/20">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/20 rounded-xl">
            <Building2 className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-content-primary capitalize">
              {projectType}
            </h1>
            <p className="text-content-secondary">
              Sistema de gestión integral para proyectos de {projectType}
            </p>
          </div>
        </div>
      </div>

      {/* Gestión de Proyecto - Información General */}
      <div className="bg-surface rounded-2xl p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-primary/20 rounded-lg">
            <FolderOpen className="text-primary" size={20} />
          </div>
          <h2 className="text-xl font-semibold text-content-primary">
            Gestión de Proyecto - {projectType}
          </h2>
        </div>

        {/* Estadísticas del Proyecto */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Progreso General', value: projectData.gestion?.progreso || '75%', status: 'success' },
            { label: 'Tareas Completadas', value: projectData.gestion?.tareasCompletadas || '18/24', status: 'info' },
            { label: 'Días Restantes', value: projectData.gestion?.diasRestantes || '12', status: 'warning' },
            { label: 'Presupuesto Usado', value: projectData.gestion?.presupuestoUsado || '68%', status: 'info' }
          ].map((stat, index) => (
            <div key={index} className="bg-background rounded-xl p-4 border border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-content-secondary text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-content-primary">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${
                  stat.status === 'success' ? 'bg-green-100 text-green-600' :
                  stat.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <Target size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navegación de Secciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((section) => {
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

      {/* Contenido de la Sección Activa */}
      <div className="min-h-96">
        {renderSectionContent()}
      </div>
    </div>
  );
};

// Componente para Gestión de Proyecto
const GestionProyecto = ({ projectType, data = {} }) => {
  const stats = [
    { label: 'Progreso General', value: data.progreso || '75%', status: 'success' },
    { label: 'Tareas Completadas', value: data.tareasCompletadas || '18/24', status: 'info' },
    { label: 'Días Restantes', value: data.diasRestantes || '12', status: 'warning' },
    { label: 'Presupuesto Usado', value: data.presupuestoUsado || '68%', status: 'info' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-content-primary">
          Gestión de Proyecto - {projectType}
        </h2>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
          Nuevo Proyecto
        </button>
      </div>

      {/* Estadísticas del Proyecto */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-surface rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-content-secondary text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-content-primary">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${
                stat.status === 'success' ? 'bg-green-100 text-green-600' :
                stat.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                <Target size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lista de Tareas Recientes */}
      <div className="bg-surface rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-content-primary mb-4">Tareas Recientes</h3>
        <div className="space-y-3">
          {[
            { task: `Planificación inicial de ${projectType}`, status: 'completed', priority: 'high' },
            { task: 'Revisión de especificaciones técnicas', status: 'in-progress', priority: 'medium' },
            { task: 'Coordinación con proveedores', status: 'pending', priority: 'high' },
            { task: 'Inspección de calidad', status: 'pending', priority: 'low' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/50">
              <div className="flex items-center space-x-3">
                {item.status === 'completed' ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : item.status === 'in-progress' ? (
                  <Clock className="text-blue-500" size={20} />
                ) : (
                  <AlertTriangle className="text-yellow-500" size={20} />
                )}
                <span className="text-content-primary">{item.task}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.priority === 'high' ? 'bg-red-100 text-red-600' :
                item.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'
              }`}>
                {item.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente para Mano de Obra
const ManoObra = ({ projectType, data = {} }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-content-primary">
        Mano de Obra - {projectType}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-content-primary mb-4">Personal Asignado</h3>
          <div className="space-y-3">
            {['Supervisor de Obra', 'Operadores', 'Técnicos Especializados', 'Personal de Seguridad'].map((role, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <span className="text-content-primary">{role}</span>
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                  {Math.floor(Math.random() * 10) + 2} personas
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-surface rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-content-primary mb-4">Horarios y Turnos</h3>
          <div className="space-y-3">
            <div className="p-3 bg-background rounded-lg">
              <p className="font-medium text-content-primary">Turno Diurno</p>
              <p className="text-content-secondary text-sm">07:00 - 17:00</p>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <p className="font-medium text-content-primary">Turno Nocturno</p>
              <p className="text-content-secondary text-sm">19:00 - 05:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para Permisos
const Permisos = ({ projectType, data = {} }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-content-primary">
        Permisos - {projectType}
      </h2>
      <div className="bg-surface rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-content-primary mb-4">Estado de Permisos</h3>
        <div className="space-y-3">
          {[
            { permit: 'Licencia de Construcción', status: 'approved', expires: '2025-12-31' },
            { permit: 'Permiso Ambiental', status: 'pending', expires: '2025-08-15' },
            { permit: 'Autorización Municipal', status: 'approved', expires: '2025-10-20' },
            { permit: 'Certificado de Seguridad', status: 'in-review', expires: '2025-09-10' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border/50">
              <div>
                <p className="font-medium text-content-primary">{item.permit}</p>
                <p className="text-content-secondary text-sm">Vence: {item.expires}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                item.status === 'approved' ? 'bg-green-100 text-green-600' :
                item.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {item.status === 'approved' ? 'Aprobado' :
                 item.status === 'pending' ? 'Pendiente' : 'En Revisión'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente para Campamento
const Campamento = ({ projectType, data = {} }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-content-primary">
        Campamento - {projectType}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-content-primary mb-4">Instalaciones</h3>
          <div className="space-y-3">
            {['Oficina Principal', 'Almacén de Materiales', 'Vestuarios', 'Comedor', 'Enfermería'].map((facility, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <span className="text-content-primary">{facility}</span>
                <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                  Operativo
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-surface rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-content-primary mb-4">Servicios</h3>
          <div className="space-y-3">
            {['Agua Potable', 'Energía Eléctrica', 'Internet/Comunicaciones', 'Gestión de Residuos'].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <span className="text-content-primary">{service}</span>
                <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                  Activo
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para Look Ahead
const LookAhead = ({ projectType, data = {} }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-content-primary">
        Look Ahead - {projectType}
      </h2>
      <div className="bg-surface rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-content-primary mb-4">Próximas Actividades</h3>
        <div className="space-y-4">
          {[
            { activity: `Inicio de ${projectType} - Fase 1`, date: '15 Jun 2025', status: 'scheduled' },
            { activity: 'Inspección de Seguridad', date: '18 Jun 2025', status: 'scheduled' },
            { activity: 'Entrega de Materiales', date: '20 Jun 2025', status: 'confirmed' },
            { activity: 'Revisión de Calidad', date: '25 Jun 2025', status: 'pending' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg border-l-4 border-primary">
              <div>
                <p className="font-medium text-content-primary">{item.activity}</p>
                <p className="text-content-secondary text-sm">{item.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                item.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                item.status === 'scheduled' ? 'bg-blue-100 text-blue-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                {item.status === 'confirmed' ? 'Confirmado' :
                 item.status === 'scheduled' ? 'Programado' : 'Pendiente'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectSections;
