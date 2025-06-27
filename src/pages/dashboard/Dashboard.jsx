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
import '../../components/charts/EngineeringCharts.css';
import { 
  ProgressVsScheduleChart, 
  ProductivityChart, 
  QualityControlChart, 
  MaterialConsumptionChart,
  ResourcePlanningChart 
} from '../../components/charts/EngineeringCharts';
import { 
  SafetyChart, 
  CostAnalysisChart, 
  EquipmentEfficiencyChart, 
  WeatherImpactChart,
  KPIRadialChart 
} from '../../components/charts/AdvancedCharts';
import { 
  EquipmentUtilizationChart, 
  ConstructionTimelineChart, 
  SiteSafetyMetricsChart, 
  EnvironmentalConditionsChart,
  MaterialStockChart,
  ProductivityDashboardChart,
  QualityCertificationChart 
} from '../../components/charts/ConstructionCharts';

const Dashboard = () => {
  const { isDark } = useApp();

  return (
    <div className="space-y-8">
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
          animation: slideInFromTop 0.6s ease-out;
        }

        .metrics-animation {
          animation: slideInFromBottom 0.4s ease-out both;
        }

        .grid-animation {
          animation: slideInFromLeft 0.5s ease-out both;
        }

        .chart-animation {
          animation: scaleIn 0.4s ease-out both;
        }

        .section-animation {
          animation: fadeIn 0.6s ease-out both;
        }

        .card-animation {
          animation: slideInFromBottom 0.3s ease-out both;
        }
      `}</style>

      {/* Welcome Card */}
      <div className="bg-primary-light p-6 rounded-2xl border border-primary/30 header-animation">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-theme-text mb-2">Panel de Control</h1>
            <p className="text-theme-text-secondary">Supervisión integral de proyectos de construcción</p>
          </div>
          <div className="hidden md:flex w-16 h-16 bg-primary rounded-xl items-center justify-center">
            <Building className="text-white" size={32} />
          </div>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Personal Activo */}
        <div 
          className="bg-surface p-6 rounded-2xl border border-theme-border hover:border-success transition-all card-hover metrics-animation"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-success-light rounded-xl">
              <Users className="text-success" size={24} />
            </div>
            <div className="flex items-center space-x-1">
              <span className="status-led active"></span>
              <span className="text-xs px-2 py-1 bg-success-light text-success rounded-full">Todas las etapas</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-theme-text-secondary mb-1">Personal Activo</p>
            <p className="text-3xl font-bold text-theme-text mb-1">20</p>
            <p className="text-xs text-success">✓ En operación</p>
          </div>
        </div>

        {/* Equipos en Uso */}
        <div 
          className="bg-surface p-6 rounded-2xl border border-theme-border hover:border-warning transition-all card-hover metrics-animation"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-warning-light rounded-xl">
              <Truck className="text-warning" size={24} />
            </div>
            <div className="flex items-center space-x-1">
              <span className="status-led inactive"></span>
              <span className="text-xs px-2 py-1 bg-warning-light text-warning rounded-full">Standby</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-theme-text-secondary mb-1">Equipos en Uso</p>
            <p className="text-3xl font-bold text-theme-text mb-1">0</p>
            <p className="text-xs text-warning">⚠ En operación</p>
          </div>
        </div>

        {/* Horas Trabajadas */}
        <div 
          className="bg-surface p-6 rounded-2xl border border-theme-border hover:border-info transition-all card-hover metrics-animation"
          style={{ animationDelay: '0.3s' }}
        >
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
            {/* Timeline visual */}
            <div className="mt-3 timeline-chart">
              <div className="timeline-point timeline-point-1"></div>
              <div className="timeline-point timeline-point-2"></div>
              <div className="timeline-point timeline-point-3"></div>
              <div className="timeline-point timeline-point-4"></div>
            </div>
          </div>
        </div>

        {/* Presupuesto Utilizado */}
        <div 
          className="bg-surface p-6 rounded-2xl border border-theme-border hover:border-primary transition-all card-hover metric-glow metrics-animation"
          style={{ animationDelay: '0.4s' }}
        >
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
            {/* Gauge visual */}
            <div className="mt-3 gauge-container">
              <div className="gauge-bg">
                <div className="gauge-fill"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Principal - 3 Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna 1: Estado de Permisos */}
        <div 
          className="bg-surface p-6 rounded-2xl border border-theme-border engineering-grid grid-animation"
          style={{ animationDelay: '0.5s' }}
        >
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
                <span className="status-led active"></span>
              </div>
              <span className="text-2xl font-bold text-success">2</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-surface-muted rounded-xl">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-theme-text-secondary" size={16} />
                <span className="text-theme-text-secondary font-medium">Por Vencer</span>
                <span className="status-led inactive"></span>
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
        <div 
          className="bg-surface p-6 rounded-2xl border border-theme-border grid-animation"
          style={{ animationDelay: '0.6s' }}
        >
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
                <span className="status-led active"></span>
              </div>
              <span className="text-2xl font-bold text-info">6</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-success-light rounded-xl">
              <div className="flex items-center space-x-2">
                <Users className="text-success" size={16} />
                <span className="text-success font-medium">Personal Activo</span>
                <span className="status-led active"></span>
              </div>
              <span className="text-2xl font-bold text-success">20</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-warning-light rounded-xl">
              <div className="flex items-center space-x-2">
                <Wrench className="text-warning" size={16} />
                <span className="text-warning font-medium">Equipos</span>
                <span className="status-led inactive"></span>
              </div>
              <span className="text-2xl font-bold text-warning">0</span>
            </div>
          </div>
        </div>

        {/* Columna 3: Avance General */}
        <div 
          className="bg-surface p-6 rounded-2xl border border-theme-border grid-animation"
          style={{ animationDelay: '0.7s' }}
        >
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
              <div className="tech-progress-bar h-3">
                <div className="tech-progress-fill" style={{width: '75%', background: 'rgb(var(--color-error))'}}></div>
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
              <div className="tech-progress-bar h-3">
                <div className="tech-progress-fill" style={{width: '0%', background: 'rgb(var(--color-warning))'}}></div>
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
              <div className="tech-progress-bar h-3">
                <div className="tech-progress-fill" style={{width: '85%', background: 'rgb(var(--color-success))'}}></div>
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
              <div className="tech-progress-bar h-3">
                <div className="tech-progress-fill" style={{width: '60%', background: 'rgb(var(--color-info))'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard de Productividad en Tiempo Real */}
      <div 
        className="bg-surface p-6 rounded-2xl border border-theme-border engineering-grid chart-animation"
        style={{ animationDelay: '0.8s' }}
      >
        <ProductivityDashboardChart />
      </div>

      {/* Gráficos Profesionales de Ingeniería */}
      <div className="space-y-6 section-animation" style={{ animationDelay: '0.9s' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-theme-text flex items-center space-x-2">
            <BarChart3 className="text-primary" size={24} />
            <span>Análisis de Ingeniería</span>
          </h2>
          <div className="text-sm text-theme-text-secondary">
            Actualizado en tiempo real
          </div>
        </div>
        
        {/* Primera fila de gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div 
            className="bg-surface p-6 rounded-2xl border border-theme-border chart-animation"
            style={{ animationDelay: '1.0s' }}
          >
            <ProgressVsScheduleChart />
          </div>
          <div 
            className="bg-surface p-6 rounded-2xl border border-theme-border chart-animation"
            style={{ animationDelay: '1.1s' }}
          >
            <ProductivityChart />
          </div>
          <div 
            className="bg-surface p-6 rounded-2xl border border-theme-border chart-animation"
            style={{ animationDelay: '1.2s' }}
          >
            <QualityControlChart />
          </div>
        </div>
        
        {/* Segunda fila de gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div 
            className="bg-surface p-6 rounded-2xl border border-theme-border chart-animation"
            style={{ animationDelay: '1.3s' }}
          >
            <MaterialConsumptionChart />
          </div>
          <div 
            className="bg-surface p-6 rounded-2xl border border-theme-border chart-animation"
            style={{ animationDelay: '1.4s' }}
          >
            <ResourcePlanningChart />
          </div>
        </div>
        
        {/* Tercera fila - Gráficos avanzados */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div 
            className="bg-surface p-6 rounded-2xl border border-theme-border chart-animation"
            style={{ animationDelay: '1.5s' }}
          >
            <SafetyChart />
          </div>
          <div 
            className="bg-surface p-6 rounded-2xl border border-theme-border chart-animation"
            style={{ animationDelay: '1.6s' }}
          >
            <CostAnalysisChart />
          </div>
          <div 
            className="bg-surface p-6 rounded-2xl border border-theme-border chart-animation"
            style={{ animationDelay: '1.7s' }}
          >
            <EquipmentEfficiencyChart />
          </div>
        </div>

        {/* Cuarta fila - Análisis meteorológico y KPIs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div 
            className="bg-surface p-6 rounded-2xl border border-theme-border chart-animation"
            style={{ animationDelay: '1.8s' }}
          >
            <WeatherImpactChart />
          </div>
          <div 
            className="bg-surface p-6 rounded-2xl border border-theme-border chart-animation"
            style={{ animationDelay: '1.9s' }}
          >
            <KPIRadialChart />
          </div>
        </div>
      </div>

      {/* Gráficos Especializados de Construcción */}
      <div className="space-y-6 section-animation" style={{ animationDelay: '2.0s' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-theme-text flex items-center space-x-2">
            <Building className="text-warning" size={24} />
            <span>Monitoreo Especializado de Obra</span>
          </h2>
          <div className="text-sm text-theme-text-secondary">
            Datos en vivo de la construcción
          </div>
        </div>
        
        {/* Primera fila - Timeline y Equipos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div 
            className="bg-surface p-6 rounded-2xl border border-theme-border engineering-grid chart-animation"
            style={{ animationDelay: '2.1s' }}
          >
            <ConstructionTimelineChart />
          </div>
          <div 
            className="bg-surface p-6 rounded-2xl border border-theme-border chart-animation"
            style={{ animationDelay: '2.2s' }}
          >
            <EquipmentUtilizationChart />
          </div>
        </div>
        
        {/* Segunda fila - Seguridad y Ambiente */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div 
            className="bg-surface p-6 rounded-2xl border border-theme-border chart-animation"
            style={{ animationDelay: '2.3s' }}
          >
            <SiteSafetyMetricsChart />
          </div>
          <div 
            className="bg-surface p-6 rounded-2xl border border-theme-border chart-animation"
            style={{ animationDelay: '2.4s' }}
          >
            <EnvironmentalConditionsChart />
          </div>
        </div>

        {/* Tercera fila - Materiales y Calidad */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div 
            className="bg-surface p-6 rounded-2xl border border-theme-border chart-animation"
            style={{ animationDelay: '2.5s' }}
          >
            <MaterialStockChart />
          </div>
          <div 
            className="bg-surface p-6 rounded-2xl border border-theme-border chart-animation"
            style={{ animationDelay: '2.6s' }}
          >
            <QualityCertificationChart />
          </div>
        </div>
      </div>

      {/* Gráficos de Seguimiento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progreso por Etapa */}
        <div 
          className="bg-surface p-6 rounded-2xl border border-theme-border engineering-grid chart-animation"
          style={{ animationDelay: '2.7s' }}
        >
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
          
          {/* Gráfico de Barras Técnico */}
          <div className="space-y-4">
            {[
              { name: 'Demolición', progress: 75, color: 'rgb(var(--color-error))', icon: Hammer },
              { name: 'Excavación', progress: 0, color: 'rgb(var(--color-warning))', icon: Truck },
              { name: 'Construcción', progress: 85, color: 'rgb(var(--color-success))', icon: Building },
              { name: 'Acabados', progress: 60, color: 'rgb(var(--color-info))', icon: HardHat }
            ].map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <stage.icon size={16} style={{color: stage.color}} />
                    <span className="text-sm font-medium text-theme-text">{stage.name}</span>
                  </div>
                  <span className="text-sm font-bold text-theme-text">{stage.progress}%</span>
                </div>
                <div className="tech-progress-bar h-4">
                  <div 
                    className="tech-progress-fill"
                    style={{ 
                      width: `${stage.progress}%`,
                      background: stage.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seguimiento Presupuestario */}
        <div 
          className="bg-surface p-6 rounded-2xl border border-theme-border chart-animation"
          style={{ animationDelay: '2.8s' }}
        >
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