import { 
  Building, 
  Users, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Hammer,
  Truck,
  HardHat,
  FileCheck,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  Settings,
  Shield,
  Home,
  Wrench
} from 'lucide-react';
import { useApp } from '../../context/ThemeContext';

const Dashboard = () => {
  const { isDark } = useApp();

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="bg-primary-light p-6 rounded-2xl border border-primary/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-theme-text mb-2">¡Bienvenido de vuelta!</h1>
            <p className="text-theme-text-secondary">Tienes 5 proyectos activos y 12 tareas pendientes hoy</p>
          </div>
          <div className="hidden md:block w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
            <Building className="text-white" size={32} />
          </div>
        </div>
      </div>      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface p-6 rounded-2xl border border-theme-border hover:border-info transition-all card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-info-light rounded-xl">
              <Building className="text-info" size={24} />
            </div>
            <span className="text-xs px-2 py-1 bg-info-light text-info rounded-full">+2</span>
          </div>
          <div>
            <p className="text-sm font-medium text-theme-text-secondary mb-1">Proyectos Activos</p>
            <p className="text-3xl font-bold text-theme-text mb-1">12</p>
            <p className="text-xs text-success">↗ Desde el mes pasado</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-theme-border hover:border-success transition-all card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-success-light rounded-xl">
              <Users className="text-success" size={24} />
            </div>
            <span className="text-xs px-2 py-1 bg-success-light text-success rounded-full">+5</span>
          </div>
          <div>
            <p className="text-sm font-medium text-theme-text-secondary mb-1">Trabajadores</p>
            <p className="text-3xl font-bold text-theme-text mb-1">48</p>
            <p className="text-xs text-success">↗ Esta semana</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-theme-border hover:border-warning transition-all card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-warning-light rounded-xl">
              <Calendar className="text-warning" size={24} />
            </div>
            <span className="text-xs px-2 py-1 bg-warning-light text-warning rounded-full">8</span>
          </div>
          <div>
            <p className="text-sm font-medium text-theme-text-secondary mb-1">Tareas Pendientes</p>
            <p className="text-3xl font-bold text-theme-text mb-1">23</p>
            <p className="text-xs text-warning">⚡ 8 urgentes</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-theme-border hover:border-primary transition-all card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-light rounded-xl">
              <TrendingUp className="text-primary" size={24} />
            </div>
            <span className="text-xs px-2 py-1 bg-primary-light text-primary rounded-full">+12%</span>
          </div>
          <div>
            <p className="text-sm font-medium text-theme-text-secondary mb-1">Presupuesto</p>
            <p className="text-3xl font-bold text-theme-text mb-1">85%</p>
            <p className="text-xs text-theme-text-secondary">Del total asignado</p>
          </div>
        </div>
      </div>      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-2xl border border-theme-border">
          <h3 className="text-lg font-semibold text-theme-text mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-surface-muted rounded-xl hover:bg-surface-hover transition-all card-hover">
              <div className="p-2 bg-success-light rounded-lg">
                <CheckCircle className="text-success" size={18} />
              </div>
              <div>
                <p className="font-medium text-theme-text mb-1">Excavación completada</p>
                <p className="text-sm text-theme-text-secondary mb-1">Proyecto Residencial Norte</p>
                <p className="text-xs text-theme-text-muted">Hace 2 horas</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-surface-muted rounded-xl hover:bg-surface-hover transition-all card-hover">
              <div className="p-2 bg-warning-light rounded-lg">
                <AlertTriangle className="text-warning" size={18} />
              </div>
              <div>
                <p className="font-medium text-theme-text mb-1">Retraso en materiales</p>
                <p className="text-sm text-theme-text-secondary mb-1">Centro Comercial Sur</p>
                <p className="text-xs text-theme-text-muted">Hace 4 horas</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-surface-muted rounded-xl hover:bg-surface-hover transition-all card-hover">
              <div className="p-2 bg-info-light rounded-lg">
                <Building className="text-info" size={18} />
              </div>
              <div>
                <p className="font-medium text-theme-text mb-1">Nuevo proyecto iniciado</p>
                <p className="text-sm text-theme-text-secondary mb-1">Torre Empresarial</p>
                <p className="text-xs text-theme-text-muted">Ayer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-theme-border">
          <h3 className="text-lg font-semibold text-theme-text mb-4">Proyectos en Progreso</h3>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-theme-text">Residencial Norte</h4>
                <span className="text-theme-text-secondary font-medium">75%</span>
              </div>
              <div className="w-full bg-surface-muted rounded-full h-2">
                <div className="bg-info h-2 rounded-full w-3/4"></div>
              </div>
              <p className="text-theme-text-secondary text-sm">Fase: Excavación</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-theme-text">Centro Comercial</h4>
                <span className="text-theme-text-secondary font-medium">60%</span>
              </div>
              <div className="w-full bg-surface-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full w-3/5"></div>
              </div>
              <p className="text-theme-text-secondary text-sm">Fase: Construcción</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-theme-text">Torre Empresarial</h4>
                <span className="text-theme-text-secondary font-medium">30%</span>
              </div>
              <div className="w-full bg-surface-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-1/3"></div>
              </div>
              <p className="text-theme-text-secondary text-sm">Fase: Acabados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;