import { useNavigate } from 'react-router-dom';
import { 
  Wrench, 
  Mountain, 
  Hammer, 
  PaintBucket, 
  Settings,
  ArrowRight
} from 'lucide-react';

const ModuleNavigation = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "Demolición",
      icon: Wrench,
      path: "/dashboard/demolicion",
      description: "Control de procesos de demolición",
      color: "red"
    },
    {
      title: "Excavación",
      icon: Mountain,
      path: "/dashboard/excavacion",
      description: "Seguimiento de excavaciones",
      color: "orange"
    },
    {
      title: "Construcción",
      icon: Hammer,
      path: "/dashboard/construccion",
      description: "Supervisión de construcción",
      color: "blue"
    },
    {
      title: "Acabados",
      icon: PaintBucket,
      path: "/dashboard/acabados",
      description: "Control de acabados finales",
      color: "emerald"
    },
    {
      title: "Administración",
      icon: Settings,
      path: "/dashboard/administracion",
      description: "Gestión de recursos",
      color: "purple"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      red: {
        bg: "bg-red-50",
        hover: "hover:bg-red-100",
        icon: "bg-red-100",
        iconHover: "group-hover:bg-red-200",
        iconColor: "text-red-600"
      },
      orange: {
        bg: "bg-orange-50",
        hover: "hover:bg-orange-100",
        icon: "bg-orange-100",
        iconHover: "group-hover:bg-orange-200",
        iconColor: "text-orange-600"
      },
      blue: {
        bg: "bg-blue-50",
        hover: "hover:bg-blue-100",
        icon: "bg-blue-100",
        iconHover: "group-hover:bg-blue-200",
        iconColor: "text-blue-600"
      },
      emerald: {
        bg: "bg-emerald-50",
        hover: "hover:bg-emerald-100",
        icon: "bg-emerald-100",
        iconHover: "group-hover:bg-emerald-200",
        iconColor: "text-emerald-600"
      },
      purple: {
        bg: "bg-purple-50",
        hover: "hover:bg-purple-100",
        icon: "bg-purple-100",
        iconHover: "group-hover:bg-purple-200",
        iconColor: "text-purple-600"
      }
    };
    return colors[color];
  };

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Módulos del Proyecto</h2>
        <p className="text-sm text-slate-600 mt-1">Acceso directo a las fases de construcción</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {modules.map((module, index) => {
          const IconComponent = module.icon;
          const colorClasses = getColorClasses(module.color);
          
          return (
            <button
              key={index}
              onClick={() => navigate(module.path)}
              className={`group ${colorClasses.bg} ${colorClasses.hover} border border-slate-200 hover:border-slate-300 p-4 rounded-lg transition-all duration-200 text-left hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 ${colorClasses.icon} ${colorClasses.iconHover} rounded-lg transition-colors`}>
                  <IconComponent size={20} className={colorClasses.iconColor} />
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-slate-900 text-sm">{module.title}</h3>
                <p className="text-xs text-slate-600">{module.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleNavigation;
