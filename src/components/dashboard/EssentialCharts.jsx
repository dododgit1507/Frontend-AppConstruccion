import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

const ProgressChart = () => {
  const phases = [
    { name: 'Demolición', completed: 100, planned: 100, color: 'bg-red-500' },
    { name: 'Excavación', completed: 75, planned: 80, color: 'bg-orange-500' },
    { name: 'Cimentación', completed: 45, planned: 60, color: 'bg-blue-500' },
    { name: 'Estructura', completed: 20, planned: 30, color: 'bg-emerald-500' },
    { name: 'Acabados', completed: 0, planned: 10, color: 'bg-purple-500' }
  ];

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <BarChart3 className="text-blue-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Progreso por Fases</h3>
          <p className="text-sm text-slate-600">Avance vs planificación</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {phases.map((phase, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-900">{phase.name}</span>
              <div className="text-right">
                <span className="text-sm text-slate-900 font-medium">{phase.completed}%</span>
                <span className="text-xs text-slate-500 ml-1">/ {phase.planned}%</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-slate-300 h-2 rounded-full"
                  style={{ width: `${phase.planned}%` }}
                ></div>
              </div>
              <div className="absolute top-0 left-0 w-full bg-slate-200 rounded-full h-2">
                <div 
                  className={`${phase.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${phase.completed}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ResourceDistribution = () => {
  const resources = [
    { name: 'Materiales', value: 35, amount: '$1.2M', color: 'bg-blue-500' },
    { name: 'Mano de obra', value: 40, amount: '$1.4M', color: 'bg-emerald-500' },
    { name: 'Maquinaria', value: 15, amount: '$525K', color: 'bg-amber-500' },
    { name: 'Otros', value: 10, amount: '$350K', color: 'bg-purple-500' }
  ];

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <PieChart className="text-emerald-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Distribución de Costos</h3>
          <p className="text-sm text-slate-600">Total: $3.475M</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {resources.map((resource, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${resource.color}`}></div>
              <span className="text-sm font-medium text-slate-900">{resource.name}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-slate-900">{resource.amount}</div>
              <div className="text-xs text-slate-600">{resource.value}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WeeklyProgress = () => {
  const weeks = [
    { week: 'S1', progress: 15 },
    { week: 'S2', progress: 25 },
    { week: 'S3', progress: 40 },
    { week: 'S4', progress: 55 },
    { week: 'S5', progress: 70 },
    { week: 'S6', progress: 82 }
  ];

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <TrendingUp className="text-purple-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Progreso Semanal</h3>
          <p className="text-sm text-slate-600">Avance acumulado (%)</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-6 gap-2 text-xs text-slate-600 mb-2">
          {weeks.map((week, index) => (
            <div key={index} className="text-center">{week.week}</div>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-2">
          {weeks.map((week, index) => (
            <div key={index} className="text-center">
              <div className="bg-slate-200 rounded-full h-16 flex items-end justify-center p-1">
                <div 
                  className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-full w-full transition-all duration-500"
                  style={{ height: `${week.progress}%` }}
                ></div>
              </div>
              <div className="text-xs font-medium text-slate-700 mt-1">{week.progress}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EssentialCharts = () => {
  return (
    <div className="space-y-6">
      <ProgressChart />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResourceDistribution />
        <WeeklyProgress />
      </div>
    </div>
  );
};

export default EssentialCharts;
