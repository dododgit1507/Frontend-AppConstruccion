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
            <h1 className="text-2xl font-bold text-theme-text mb-2">Panel de Control - BuildApp</h1>
            <p className="text-theme-text-secondary">Supervisión integral de proyectos de construcción</p>
          </div>
          <div className="hidden md:block w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
            <Building className="text-white" size={32} />
          </div>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Personal Activo */}
        <div className="bg-surface p-6 rounded-2xl border border-theme-border hover:border-success transition-all card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-success-light rounded-xl">
              <Users className="text-success" size={24} />
            </div>
            <span className="text-xs px-2 py-1 bg-success-light text-success rounded-full">Todas las etapas</span>
          </div>
          <div>
            <p className="text-sm font-medium text-theme-text-secondary mb-1">Personal Activo</p>
            <p className="text-3xl font-bold text-theme-text mb-1">20</p>
            <p className="text-xs text-success">✓ En operación</p>
          </div>
        </div>

        {/* Equipos en Uso */}
        <div className="bg-surface p-6 rounded-2xl border border-theme-border hover:border-warning transition-all card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-warning-light rounded-xl">
              <Truck className="text-warning" size={24} />
            </div>
            <span className="text-xs px-2 py-1 bg-warning-light text-warning rounded-full">Standby</span>
          </div>
          <div>
            <p className="text-sm font-medium text-theme-text-secondary mb-1">Equipos en Uso</p>
            <p className="text-3xl font-bold text-theme-text mb-1">0</p>
            <p className="text-xs text-warning">⚠ En operación</p>
          </div>
        </div>

        {/* Horas Trabajadas */}
        <div className="bg-surface p-6 rounded-2xl border border-theme-border hover:border-info transition-all card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-info-light rounded-xl">
              <Clock className="text-info" size={24} />
            </div>
            <span className="text-xs px-2 py-1 bg-info-light text-info rounded-full">Esta semana</span>
          </div>
          <div>
            <p className="text-sm font-medium text-theme-text-secondary mb-1">Horas Trabajadas</p>
            <p className="text-3xl font-bold text-theme-text mb-1">840</p>
            <p className="text-xs text-info">📅 Esta semana</p>
          </div>
        </div>

        {/* Presupuesto Utilizado */}
        <div className="bg-surface p-6 rounded-2xl border border-theme-border hover:border-primary transition-all card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-light rounded-xl">
              <TrendingUp className="text-primary" size={24} />
            </div>
            <span className="text-xs px-2 py-1 bg-primary-light text-primary rounded-full">72%</span>
          </div>
          <div>
            <p className="text-sm font-medium text-theme-text-secondary mb-1">Presupuesto Utilizado</p>
            <p className="text-3xl font-bold text-theme-text mb-1">72%</p>
            <p className="text-xs text-theme-text-secondary">$2.52M de $3.5M total</p>
          </div>
        </div>
      </div>

      {/* Grid Principal - 3 Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna 1: Estado de Permisos */}
        <div className="bg-surface p-6 rounded-2xl border border-theme-border">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-success-light rounded-lg">
              <FileCheck className="text-success" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-theme-text">Estado de Permisos</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-success-light rounded-xl">
              <div className="flex items-center space-x-2">
                <Shield className="text-success" size={16} />
                <span className="text-success font-medium">Vigentes</span>
              </div>
              <span className="text-2xl font-bold text-success">2</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-surface-muted rounded-xl">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-theme-text-secondary" size={16} />
                <span className="text-theme-text-secondary font-medium">Por Vencer</span>
              </div>
              <span className="text-2xl font-bold text-theme-text-secondary">0</span>
            </div>
            
            <div className="border-t border-theme-border pt-3">
              <div className="flex items-center justify-between">
                <span className="text-theme-text font-medium">Total:</span>
                <span className="text-xl font-bold text-theme-text">2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Columna 2: Instalaciones Campamento */}
        <div className="bg-surface p-6 rounded-2xl border border-theme-border">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-info-light rounded-lg">
              <Home className="text-info" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-theme-text">Instalaciones Campamento</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-info-light rounded-xl">
              <div className="flex items-center space-x-2">
                <Zap className="text-info" size={16} />
                <span className="text-info font-medium">Operativas</span>
              </div>
              <span className="text-2xl font-bold text-info">6</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-success-light rounded-xl">
              <div className="flex items-center space-x-2">
                <Users className="text-success" size={16} />
                <span className="text-success font-medium">Personal Activo</span>
              </div>
              <span className="text-2xl font-bold text-success">20</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-warning-light rounded-xl">
              <div className="flex items-center space-x-2">
                <Wrench className="text-warning" size={16} />
                <span className="text-warning font-medium">Equipos</span>
              </div>
              <span className="text-2xl font-bold text-warning">0</span>
            </div>
          </div>
        </div>

        {/* Columna 3: Avance General */}
        <div className="bg-surface p-6 rounded-2xl border border-theme-border">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-primary-light rounded-lg">
              <Activity className="text-primary" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-theme-text">Avance General</h3>
          </div>
          
          <div className="space-y-4">
            {/* Demolición */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Hammer className="text-error" size={16} />
                  <span className="font-medium text-theme-text">Demolición</span>
                </div>
                <span className="text-error font-bold">75%</span>
              </div>
              <div className="w-full bg-surface-muted rounded-full h-2">
                <div className="bg-error h-2 rounded-full w-3/4"></div>
              </div>
            </div>

            {/* Excavación */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Truck className="text-warning" size={16} />
                  <span className="font-medium text-theme-text">Excavación</span>
                </div>
                <span className="text-warning font-bold">0%</span>
              </div>
              <div className="w-full bg-surface-muted rounded-full h-2">
                <div className="bg-warning h-2 rounded-full w-0"></div>
              </div>
            </div>

            {/* Construcción */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Building className="text-success" size={16} />
                  <span className="font-medium text-theme-text">Construcción</span>
                </div>
                <span className="text-success font-bold">85%</span>
              </div>
              <div className="w-full bg-surface-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>

            {/* Acabados */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <HardHat className="text-info" size={16} />
                  <span className="font-medium text-theme-text">Acabados</span>
                </div>
                <span className="text-info font-bold">60%</span>
              </div>
              <div className="w-full bg-surface-muted rounded-full h-2">
                <div className="bg-info h-2 rounded-full w-3/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos de Seguimiento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Progreso por Etapa */}
        <div className="bg-surface p-6 rounded-2xl border border-theme-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-info-light rounded-lg">
                <BarChart3 className="text-info" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-theme-text">Progreso por Etapa</h3>
            </div>
            <button className="text-theme-text-secondary hover:text-theme-text">
              <Settings size={16} />
            </button>
          </div>
          
          {/* Gráfico de Barras Simple */}
          <div className="space-y-4">
            {[
              { name: 'Demolición', progress: 75, color: 'bg-error' },
              { name: 'Excavación', progress: 0, color: 'bg-warning' },
              { name: 'Construcción', progress: 85, color: 'bg-success' },
              { name: 'Acabados', progress: 60, color: 'bg-info' }
            ].map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-theme-text">{stage.name}</span>
                  <span className="text-sm font-bold text-theme-text">{stage.progress}%</span>
                </div>
                <div className="w-full bg-surface-muted rounded-full h-3">
                  <div 
                    className={`${stage.color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${stage.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seguimiento Presupuestario */}
        <div className="bg-surface p-6 rounded-2xl border border-theme-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-light rounded-lg">
                <PieChart className="text-primary" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-theme-text">Seguimiento Presupuestario</h3>
            </div>
            <button className="text-theme-text-secondary hover:text-theme-text">
              <Settings size={16} />
            </button>
          </div>
          
          {/* Gráfico Circular Representativo */}
          <div className="space-y-6">
            {/* Resumen Principal */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                {/* Círculo de fondo */}
                <div className="absolute inset-0 bg-surface-muted rounded-full"></div>
                {/* Círculo de progreso */}
                <div 
                  className="absolute inset-0 bg-primary rounded-full" 
                  style={{
                    background: `conic-gradient(rgb(var(--color-primary)) 0deg 259.2deg, rgb(var(--bg-tertiary)) 259.2deg 360deg)`,
                    borderRadius: '50%'
                  }}
                ></div>
                {/* Centro */}
                <div className="absolute inset-2 bg-surface rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-theme-text">72%</div>
                    <div className="text-xs text-theme-text-secondary">Utilizado</div>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-theme-text-secondary">Presupuesto Total: $3.5M</p>
                <p className="text-lg font-bold text-theme-text">$2.52M Utilizado</p>
                <p className="text-sm text-success">$980K Disponible</p>
              </div>
            </div>

            {/* Desglose por Categoría */}
            <div className="space-y-3">
              {[
                { category: 'Materiales', amount: '$1.2M', percentage: 48, color: 'bg-primary' },
                { category: 'Mano de Obra', amount: '$800K', percentage: 32, color: 'bg-success' },
                { category: 'Equipos', amount: '$320K', percentage: 13, color: 'bg-info' },
                { category: 'Otros', amount: '$200K', percentage: 7, color: 'bg-warning' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-surface-muted">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium text-theme-text">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-theme-text">{item.amount}</div>
                    <div className="text-xs text-theme-text-secondary">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
