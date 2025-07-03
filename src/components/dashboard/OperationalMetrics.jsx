import { Truck, Users, Clock, TrendingUp } from 'lucide-react';

const MetricCard = ({ title, value, icon: Icon, subtitle, trend, status, color }) => {
  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-50",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        accent: "text-blue-600"
      },
      emerald: {
        bg: "bg-emerald-50",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        accent: "text-emerald-600"
      },
      amber: {
        bg: "bg-amber-50",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
        accent: "text-amber-600"
      },
      purple: {
        bg: "bg-purple-50",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        accent: "text-purple-600"
      }
    };
    return colors[color];
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className={`${colorClasses.bg} border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-2 ${colorClasses.iconBg} rounded-lg`}>
              <Icon size={20} className={colorClasses.iconColor} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{title}</p>
              {status && (
                <div className="flex items-center space-x-1 mt-1">
                  <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                  <span className="text-xs text-slate-500">{status === 'active' ? 'Activo' : 'Inactivo'}</span>
                </div>
              )}
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
          {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
          {trend && (
            <div className="flex items-center space-x-1 mt-2">
              <TrendingUp size={14} className={colorClasses.accent} />
              <span className={`text-xs ${colorClasses.accent}`}>{trend}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OperationalMetrics = () => {
  const metrics = [
    {
      title: "Personal Activo",
      value: "45",
      subtitle: "Trabajadores en campo",
      icon: Users,
      trend: "+5 esta semana",
      status: "active",
      color: "blue"
    },
    {
      title: "Equipos en Operación",
      value: "12",
      subtitle: "De 15 disponibles",
      icon: Truck,
      trend: "+2 desde ayer",
      status: "active",
      color: "emerald"
    },
    {
      title: "Horas Acumuladas",
      value: "1,240",
      subtitle: "Esta semana",
      icon: Clock,
      trend: "160 horas promedio/día",
      status: "active",
      color: "amber"
    },
    {
      title: "Eficiencia General",
      value: "87%",
      subtitle: "Objetivo: 85%",
      icon: TrendingUp,
      trend: "+3% vs semana anterior",
      status: "active",
      color: "purple"
    }
  ];

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Métricas Operativas</h2>
        <p className="text-sm text-slate-600 mt-1">Indicadores clave de rendimiento</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default OperationalMetrics;
