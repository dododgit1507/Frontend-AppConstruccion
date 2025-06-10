// Construction Engineering Specific Charts
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart
} from 'recharts';
import { useApp } from '../../context/ThemeContext';
import { 
  Truck, 
  Clock, 
  Shield, 
  Thermometer, 
  CloudRain, 
  Building, 
  Users, 
  Wrench,
  AlertTriangle,
  CheckCircle,
  Activity,
  TrendingUp
} from 'lucide-react';

// Equipment Utilization Chart
export const EquipmentUtilizationChart = () => {
  const { isDark } = useApp();
  
  const data = [
    { name: 'Excavadora CAT 320', horas: 8.5, max: 10, eficiencia: 85, estado: 'operativo' },
    { name: 'Grúa Torre', horas: 6.2, max: 8, eficiencia: 77, estado: 'mantenimiento' },
    { name: 'Mixer Concreto', horas: 7.8, max: 10, eficiencia: 78, estado: 'operativo' },
    { name: 'Compactadora', horas: 4.1, max: 8, eficiencia: 51, estado: 'standby' },
    { name: 'Camión Volteo', horas: 9.2, max: 10, eficiencia: 92, estado: 'operativo' }
  ];

  const colors = {
    operativo: isDark ? '#10b981' : '#059669',
    mantenimiento: isDark ? '#f59e0b' : '#d97706',
    standby: isDark ? '#6b7280' : '#4b5563'
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Truck className="text-primary" size={20} />
        <h3 className="text-lg font-semibold text-theme-text">Utilización de Equipos</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: isDark ? '#d1d5db' : '#374151', fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fill: isDark ? '#d1d5db' : '#374151' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px'
            }}
            formatter={(value, name) => [
              name === 'horas' ? `${value} hrs` : `${value}%`,
              name === 'horas' ? 'Horas Operación' : 'Eficiencia'
            ]}
          />
          <Bar dataKey="horas" fill={isDark ? '#3b82f6' : '#2563eb'} radius={[4, 4, 0, 0]} />
          <Line 
            type="monotone" 
            dataKey="eficiencia" 
            stroke={isDark ? '#10b981' : '#059669'}
            strokeWidth={3}
            dot={{ fill: isDark ? '#10b981' : '#059669', strokeWidth: 2, r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      
      <div className="grid grid-cols-2 gap-3 text-xs">
        {data.map((equipo, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-surface-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors[equipo.estado] }}
              ></div>
              <span className="text-theme-text font-medium truncate">{equipo.name}</span>
            </div>
            <span className="text-theme-text">{equipo.eficiencia}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Construction Progress Timeline
export const ConstructionTimelineChart = () => {
  const { isDark } = useApp();
  
  const data = [
    { fase: 'Planificación', planificado: 100, real: 100, fecha: 'Ene 2024' },
    { fase: 'Demolición', planificado: 100, real: 75, fecha: 'Feb 2024' },
    { fase: 'Excavación', planificado: 80, real: 0, fecha: 'Mar 2024' },
    { fase: 'Cimentación', planificado: 60, real: 0, fecha: 'Abr 2024' },
    { fase: 'Estructura', planificado: 40, real: 0, fecha: 'May 2024' },
    { fase: 'Instalaciones', planificado: 20, real: 0, fecha: 'Jun 2024' },
    { fase: 'Acabados', planificado: 10, real: 0, fecha: 'Jul 2024' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Activity className="text-primary" size={20} />
        <h3 className="text-lg font-semibold text-theme-text">Cronograma de Construcción</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="planificado" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isDark ? '#3b82f6' : '#2563eb'} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={isDark ? '#3b82f6' : '#2563eb'} stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="real" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isDark ? '#10b981' : '#059669'} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={isDark ? '#10b981' : '#059669'} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
          <XAxis 
            dataKey="fase" 
            tick={{ fill: isDark ? '#d1d5db' : '#374151', fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fill: isDark ? '#d1d5db' : '#374151' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px'
            }}
            formatter={(value, name) => [
              `${value}%`,
              name === 'planificado' ? 'Planificado' : 'Real'
            ]}
          />
          <Area 
            type="monotone" 
            dataKey="planificado" 
            stackId="1"
            stroke={isDark ? '#3b82f6' : '#2563eb'}
            fill="url(#planificado)" 
          />
          <Area 
            type="monotone" 
            dataKey="real" 
            stackId="2"
            stroke={isDark ? '#10b981' : '#059669'}
            fill="url(#real)" 
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-theme-text">Planificado</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="text-theme-text">Progreso Real</span>
        </div>
      </div>
    </div>
  );
};

// Site Safety Metrics
export const SiteSafetyMetricsChart = () => {
  const { isDark } = useApp();
  
  const incidentData = [
    { mes: 'Ene', incidentes: 2, diasSinIncidentes: 28, capacitacion: 45 },
    { mes: 'Feb', incidentes: 1, diasSinIncidentes: 27, capacitacion: 52 },
    { mes: 'Mar', incidentes: 0, diasSinIncidentes: 31, capacitacion: 48 },
    { mes: 'Abr', incidentes: 1, diasSinIncidentes: 29, capacitacion: 60 },
    { mes: 'May', incidentes: 0, diasSinIncidentes: 31, capacitacion: 55 },
    { mes: 'Jun', incidentes: 0, diasSinIncidentes: 30, capacitacion: 58 }
  ];

  const safetyKPIs = [
    { name: 'Cumplimiento EPP', value: 98, color: '#10b981' },
    { name: 'Capacitación', value: 92, color: '#3b82f6' },
    { name: 'Inspecciones', value: 95, color: '#f59e0b' },
    { name: 'Reportes', value: 88, color: '#8b5cf6' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Shield className="text-success" size={20} />
        <h3 className="text-lg font-semibold text-theme-text">Métricas de Seguridad</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Incidentes por mes */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-theme-text">Incidentes Mensuales</h4>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={incidentData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="mes" 
                tick={{ fill: isDark ? '#d1d5db' : '#374151', fontSize: 10 }}
              />
              <YAxis tick={{ fill: isDark ? '#d1d5db' : '#374151', fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="incidentes" 
                fill={isDark ? '#ef4444' : '#dc2626'} 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* KPIs de Seguridad */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-theme-text">KPIs de Seguridad</h4>
          <div className="space-y-3">
            {safetyKPIs.map((kpi, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-theme-text">{kpi.name}</span>
                  <span className="text-theme-text font-semibold">{kpi.value}%</span>
                </div>
                <div className="h-2 bg-surface-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${kpi.value}%`,
                      backgroundColor: kpi.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center p-2 bg-success-light rounded-lg">
          <div className="text-success font-bold text-lg">142</div>
          <div className="text-success">Días sin incidentes</div>
        </div>
        <div className="text-center p-2 bg-info-light rounded-lg">
          <div className="text-info font-bold text-lg">318</div>
          <div className="text-info">Horas capacitación</div>
        </div>
        <div className="text-center p-2 bg-warning-light rounded-lg">
          <div className="text-warning font-bold text-lg">4</div>
          <div className="text-warning">Incidentes totales</div>
        </div>
      </div>
    </div>
  );
};

// Environmental Conditions Chart
export const EnvironmentalConditionsChart = () => {
  const { isDark } = useApp();
  
  const weatherData = [
    { hora: '6:00', temperatura: 18, humedad: 75, viento: 12, lluvia: 0 },
    { hora: '8:00', temperatura: 22, humedad: 68, viento: 15, lluvia: 0 },
    { hora: '10:00', temperatura: 28, humedad: 58, viento: 18, lluvia: 0 },
    { hora: '12:00', temperatura: 32, humedad: 52, viento: 22, lluvia: 2 },
    { hora: '14:00', temperatura: 35, humedad: 48, viento: 25, lluvia: 8 },
    { hora: '16:00', temperatura: 30, humedad: 62, viento: 20, lluvia: 15 },
    { hora: '18:00', temperatura: 25, humedad: 70, viento: 16, lluvia: 5 }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <CloudRain className="text-info" size={20} />
        <h3 className="text-lg font-semibold text-theme-text">Condiciones Ambientales</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={weatherData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
          <XAxis 
            dataKey="hora" 
            tick={{ fill: isDark ? '#d1d5db' : '#374151', fontSize: 11 }}
          />
          <YAxis tick={{ fill: isDark ? '#d1d5db' : '#374151' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px'
            }}
            formatter={(value, name) => [
              name === 'temperatura' ? `${value}°C` :
              name === 'humedad' ? `${value}%` :
              name === 'viento' ? `${value} km/h` : `${value}mm`,
              name === 'temperatura' ? 'Temperatura' :
              name === 'humedad' ? 'Humedad' :
              name === 'viento' ? 'Viento' : 'Lluvia'
            ]}
          />
          <Area 
            type="monotone" 
            dataKey="humedad" 
            fill={isDark ? '#3b82f6' : '#2563eb'}
            fillOpacity={0.3}
            stroke={isDark ? '#3b82f6' : '#2563eb'}
          />
          <Line 
            type="monotone" 
            dataKey="temperatura" 
            stroke={isDark ? '#ef4444' : '#dc2626'}
            strokeWidth={3}
            dot={{ fill: isDark ? '#ef4444' : '#dc2626', strokeWidth: 2, r: 4 }}
          />
          <Bar dataKey="lluvia" fill={isDark ? '#06b6d4' : '#0891b2'} />
        </ComposedChart>
      </ResponsiveContainer>
      
      <div className="grid grid-cols-4 gap-2 text-xs">
        <div className="text-center p-2 bg-error-light rounded-lg">
          <Thermometer className="text-error mx-auto mb-1" size={16} />
          <div className="text-error font-bold">32°C</div>
          <div className="text-error">Máx hoy</div>
        </div>
        <div className="text-center p-2 bg-info-light rounded-lg">
          <CloudRain className="text-info mx-auto mb-1" size={16} />
          <div className="text-info font-bold">68%</div>
          <div className="text-info">Humedad</div>
        </div>
        <div className="text-center p-2 bg-warning-light rounded-lg">
          <Activity className="text-warning mx-auto mb-1" size={16} />
          <div className="text-warning font-bold">25</div>
          <div className="text-warning">km/h viento</div>
        </div>
        <div className="text-center p-2 bg-primary-light rounded-lg">
          <TrendingUp className="text-primary mx-auto mb-1" size={16} />
          <div className="text-primary font-bold">8h</div>
          <div className="text-primary">Trabajo útil</div>
        </div>
      </div>
    </div>
  );
};

// Material Stock Levels
export const MaterialStockChart = () => {
  const { isDark } = useApp();
  
  const stockData = [
    { material: 'Cemento', actual: 850, minimo: 500, maximo: 1200, unidad: 'ton' },
    { material: 'Acero', actual: 320, minimo: 200, maximo: 800, unidad: 'ton' },
    { material: 'Arena', actual: 45, minimo: 100, maximo: 500, unidad: 'm³' },
    { material: 'Grava', actual: 180, minimo: 150, maximo: 400, unidad: 'm³' },
    { material: 'Ladrillos', actual: 15000, minimo: 10000, maximo: 25000, unidad: 'ud' }
  ];

  const getStockStatus = (actual, minimo, maximo) => {
    if (actual < minimo) return { status: 'critico', color: '#ef4444' };
    if (actual < minimo * 1.5) return { status: 'bajo', color: '#f59e0b' };
    return { status: 'normal', color: '#10b981' };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Building className="text-warning" size={20} />
        <h3 className="text-lg font-semibold text-theme-text">Stock de Materiales</h3>
      </div>
      
      <div className="space-y-3">
        {stockData.map((item, index) => {
          const status = getStockStatus(item.actual, item.minimo, item.maximo);
          const percentage = (item.actual / item.maximo) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: status.color }}
                  ></div>
                  <span className="text-sm font-medium text-theme-text">{item.material}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-theme-text">
                    {item.actual.toLocaleString()} {item.unidad}
                  </span>
                  <div className="text-xs text-theme-text-secondary">
                    Mín: {item.minimo} | Máx: {item.maximo}
                  </div>
                </div>
              </div>
              
              <div className="relative h-3 bg-surface-muted rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: status.color
                  }}
                ></div>
                {/* Marcador de mínimo */}
                <div 
                  className="absolute top-0 h-full w-0.5 bg-error"
                  style={{ left: `${(item.minimo / item.maximo) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-theme-text-secondary">
                <span>0</span>
                <span className="font-medium" style={{ color: status.color }}>
                  {status.status.toUpperCase()}
                </span>
                <span>{item.maximo.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-xs mt-4">
        <div className="text-center p-2 bg-success-light rounded-lg">
          <CheckCircle className="text-success mx-auto mb-1" size={16} />
          <div className="text-success font-bold">3</div>
          <div className="text-success">Stock Normal</div>
        </div>
        <div className="text-center p-2 bg-warning-light rounded-lg">
          <AlertTriangle className="text-warning mx-auto mb-1" size={16} />
          <div className="text-warning font-bold">1</div>
          <div className="text-warning">Stock Bajo</div>
        </div>
        <div className="text-center p-2 bg-error-light rounded-lg">
          <AlertTriangle className="text-error mx-auto mb-1" size={16} />
          <div className="text-error font-bold">1</div>
          <div className="text-error">Stock Crítico</div>
        </div>
      </div>
    </div>
  );
};

// Real-time Productivity Dashboard
export const ProductivityDashboardChart = () => {
  const { isDark } = useApp();
  
  const realTimeData = [
    { 
      zona: 'Sector A', 
      productividad: 85, 
      trabajadores: 8, 
      horas: 6.2, 
      tareas: { completadas: 12, pendientes: 3 },
      status: 'optimal'
    },
    { 
      zona: 'Sector B', 
      productividad: 92, 
      trabajadores: 6, 
      horas: 7.1, 
      tareas: { completadas: 15, pendientes: 1 },
      status: 'excellent'
    },
    { 
      zona: 'Sector C', 
      productividad: 68, 
      trabajadores: 4, 
      horas: 4.8, 
      tareas: { completadas: 8, pendientes: 6 },
      status: 'attention'
    },
    { 
      zona: 'Sector D', 
      productividad: 45, 
      trabajadores: 2, 
      horas: 3.2, 
      tareas: { completadas: 4, pendientes: 8 },
      status: 'critical'
    }
  ];

  const statusColors = {
    excellent: '#10b981',
    optimal: '#3b82f6',
    attention: '#f59e0b',
    critical: '#ef4444'
  };

  const totalStats = {
    productividadPromedio: Math.round(realTimeData.reduce((acc, item) => acc + item.productividad, 0) / realTimeData.length),
    totalTrabajadores: realTimeData.reduce((acc, item) => acc + item.trabajadores, 0),
    horasTotal: realTimeData.reduce((acc, item) => acc + item.horas, 0),
    tareasCompletadas: realTimeData.reduce((acc, item) => acc + item.tareas.completadas, 0),
    tareasPendientes: realTimeData.reduce((acc, item) => acc + item.tareas.pendientes, 0)
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Activity className="text-primary" size={20} />
        <h3 className="text-lg font-semibold text-theme-text">Dashboard de Productividad</h3>
        <div className="flex items-center space-x-1 ml-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-success font-medium">EN VIVO</span>
        </div>
      </div>
      
      {/* Resumen general */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="text-center p-3 bg-primary-light rounded-lg">
          <div className="text-primary font-bold text-xl">{totalStats.productividadPromedio}%</div>
          <div className="text-primary text-xs">Productividad Avg</div>
        </div>
        <div className="text-center p-3 bg-success-light rounded-lg">
          <div className="text-success font-bold text-xl">{totalStats.totalTrabajadores}</div>
          <div className="text-success text-xs">Trabajadores</div>
        </div>
        <div className="text-center p-3 bg-info-light rounded-lg">
          <div className="text-info font-bold text-xl">{totalStats.horasTotal.toFixed(1)}</div>
          <div className="text-info text-xs">Horas Acumuladas</div>
        </div>
        <div className="text-center p-3 bg-warning-light rounded-lg">
          <div className="text-warning font-bold text-xl">{totalStats.tareasCompletadas}</div>
          <div className="text-warning text-xs">Tareas Completadas</div>
        </div>
      </div>

      {/* Detalles por sector */}
      <div className="space-y-3">
        {realTimeData.map((sector, index) => (
          <div key={index} className="p-4 bg-surface-muted rounded-xl border-l-4" style={{ borderLeftColor: statusColors[sector.status] }}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: statusColors[sector.status] }}
                ></div>
                <h4 className="font-semibold text-theme-text">{sector.zona}</h4>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-theme-text">{sector.productividad}%</div>
                <div className="text-xs" style={{ color: statusColors[sector.status] }}>
                  {sector.status.toUpperCase()}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-3 text-xs">
              <div className="text-center">
                <Users className="text-theme-text-secondary mx-auto mb-1" size={14} />
                <div className="text-theme-text font-medium">{sector.trabajadores}</div>
                <div className="text-theme-text-secondary">Personal</div>
              </div>
              <div className="text-center">
                <Clock className="text-theme-text-secondary mx-auto mb-1" size={14} />
                <div className="text-theme-text font-medium">{sector.horas}h</div>
                <div className="text-theme-text-secondary">Trabajadas</div>
              </div>
              <div className="text-center">
                <CheckCircle className="text-success mx-auto mb-1" size={14} />
                <div className="text-success font-medium">{sector.tareas.completadas}</div>
                <div className="text-theme-text-secondary">Completadas</div>
              </div>
              <div className="text-center">
                <AlertTriangle className="text-warning mx-auto mb-1" size={14} />
                <div className="text-warning font-medium">{sector.tareas.pendientes}</div>
                <div className="text-theme-text-secondary">Pendientes</div>
              </div>
            </div>
            
            {/* Barra de progreso */}
            <div className="mt-3">
              <div className="h-2 bg-surface rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${sector.productividad}%`,
                    backgroundColor: statusColors[sector.status]
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Alertas críticas */}
      <div className="bg-error-light p-3 rounded-lg border border-error">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="text-error" size={16} />
          <span className="text-error font-semibold text-sm">Alertas Críticas</span>
        </div>
        <div className="space-y-1 text-xs">
          <div className="text-error">• Sector D: Productividad por debajo del 50%</div>
          <div className="text-error">• {totalStats.tareasPendientes} tareas pendientes requieren atención</div>
        </div>
      </div>
    </div>
  );
};

// Quality Control and Certifications Dashboard
export const QualityCertificationChart = () => {
  const { isDark } = useApp();
  
  const qualityTests = [
    { 
      test: 'Resistencia Concreto', 
      resultado: 28.5, 
      requerido: 25.0, 
      unidad: 'MPa', 
      status: 'aprobado',
      fecha: '2024-06-08'
    },
    { 
      test: 'Compactación Suelo', 
      resultado: 92, 
      requerido: 95, 
      unidad: '%', 
      status: 'rechazado',
      fecha: '2024-06-07'
    },
    { 
      test: 'Soldadura Acero', 
      resultado: 98, 
      requerido: 85, 
      unidad: '%', 
      status: 'aprobado',
      fecha: '2024-06-06'
    },
    { 
      test: 'Nivel Topográfico', 
      resultado: 0.8, 
      requerido: 1.0, 
      unidad: 'mm', 
      status: 'aprobado',
      fecha: '2024-06-05'
    }
  ];

  const certifications = [
    { 
      certificacion: 'ISO 9001:2015', 
      estado: 'vigente', 
      vencimiento: '2024-12-15',
      diasRestantes: 188
    },
    { 
      certificacion: 'OHSAS 18001', 
      estado: 'vigente', 
      vencimiento: '2024-09-20',
      diasRestantes: 102
    },
    { 
      certificacion: 'ISO 14001', 
      estado: 'por_vencer', 
      vencimiento: '2024-07-10',
      diasRestantes: 30
    },
    { 
      certificacion: 'Licencia Ambiental', 
      estado: 'vigente', 
      vencimiento: '2025-03-15',
      diasRestantes: 278
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'aprobado': return '#10b981';
      case 'rechazado': return '#ef4444';
      case 'pendiente': return '#f59e0b';
      case 'vigente': return '#10b981';
      case 'por_vencer': return '#f59e0b';
      case 'vencido': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const qualityStats = {
    aprobados: qualityTests.filter(t => t.status === 'aprobado').length,
    rechazados: qualityTests.filter(t => t.status === 'rechazado').length,
    porcentajeAprobacion: Math.round((qualityTests.filter(t => t.status === 'aprobado').length / qualityTests.length) * 100)
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Shield className="text-info" size={20} />
        <h3 className="text-lg font-semibold text-theme-text">Control de Calidad & Certificaciones</h3>
      </div>
      
      {/* Estadísticas de calidad */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-3 bg-success-light rounded-lg">
          <div className="text-success font-bold text-xl">{qualityStats.porcentajeAprobacion}%</div>
          <div className="text-success text-xs">Tasa de Aprobación</div>
        </div>
        <div className="text-center p-3 bg-info-light rounded-lg">
          <div className="text-info font-bold text-xl">{qualityStats.aprobados}</div>
          <div className="text-info text-xs">Tests Aprobados</div>
        </div>
        <div className="text-center p-3 bg-error-light rounded-lg">
          <div className="text-error font-bold text-xl">{qualityStats.rechazados}</div>
          <div className="text-error text-xs">Tests Rechazados</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Tests de Calidad */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-theme-text">Pruebas de Calidad Recientes</h4>
          {qualityTests.map((test, index) => (
            <div key={index} className="p-3 bg-surface-muted rounded-lg border-l-4" style={{ borderLeftColor: getStatusColor(test.status) }}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium text-theme-text text-sm">{test.test}</div>
                  <div className="text-xs text-theme-text-secondary">{test.fecha}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-theme-text">
                    {test.resultado} {test.unidad}
                  </div>
                  <div className="text-xs text-theme-text-secondary">
                    Req: {test.requerido} {test.unidad}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getStatusColor(test.status) }}
                  ></div>
                  <span 
                    className="text-xs font-medium uppercase"
                    style={{ color: getStatusColor(test.status) }}
                  >
                    {test.status}
                  </span>
                </div>
                
                {test.status === 'aprobado' ? (
                  <CheckCircle className="text-success" size={16} />
                ) : (
                  <AlertTriangle className="text-error" size={16} />
                )}
              </div>
              
              {/* Barra de progreso comparativo */}
              <div className="mt-2">
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min((test.resultado / test.requerido) * 100, 100)}%`,
                      backgroundColor: getStatusColor(test.status)
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificaciones */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-theme-text">Estado de Certificaciones</h4>
          {certifications.map((cert, index) => (
            <div key={index} className="p-3 bg-surface-muted rounded-lg border-l-4" style={{ borderLeftColor: getStatusColor(cert.estado) }}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium text-theme-text text-sm">{cert.certificacion}</div>
                  <div className="text-xs text-theme-text-secondary">Vence: {cert.vencimiento}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-theme-text">
                    {cert.diasRestantes}
                  </div>
                  <div className="text-xs text-theme-text-secondary">días restantes</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getStatusColor(cert.estado) }}
                  ></div>
                  <span 
                    className="text-xs font-medium uppercase"
                    style={{ color: getStatusColor(cert.estado) }}
                  >
                    {cert.estado.replace('_', ' ')}
                  </span>
                </div>
                
                {cert.estado === 'vigente' ? (
                  <CheckCircle className="text-success" size={16} />
                ) : cert.estado === 'por_vencer' ? (
                  <AlertTriangle className="text-warning" size={16} />
                ) : (
                  <AlertTriangle className="text-error" size={16} />
                )}
              </div>
              
              {/* Barra de tiempo restante */}
              <div className="mt-2">
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.max((cert.diasRestantes / 365) * 100, 5)}%`,
                      backgroundColor: getStatusColor(cert.estado)
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Alertas de vencimiento */}
      {certifications.some(c => c.estado === 'por_vencer') && (
        <div className="bg-warning-light p-3 rounded-lg border border-warning">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="text-warning" size={16} />
            <span className="text-warning font-semibold text-sm">Alertas de Vencimiento</span>
          </div>
          <div className="space-y-1 text-xs">
            {certifications.filter(c => c.estado === 'por_vencer').map((cert, index) => (
              <div key={index} className="text-warning">
                • {cert.certificacion}: Vence en {cert.diasRestantes} días
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
