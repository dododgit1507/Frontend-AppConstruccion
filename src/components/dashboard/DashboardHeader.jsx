import { Building, Activity, Clock } from 'lucide-react';
import { useProyecto } from '../../context/ProyectoContext';

const DashboardHeader = () => {
  const { proyectoActual } = useProyecto();

  return (
    <div className="bg-gradient-to-r from-blue-950 to-blue-800 border border-slate-200 p-8 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Building className="text-blue-700" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Panel de Control</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm ">Sistema Operativo</span>
              </div>
            </div>
          </div>
          <p className="text-white text-sm max-w-md">
            Supervisión técnica y monitoreo de proyectos de construcción
          </p>
          <div className="flex items-center space-x-6 mt-3 text-sm text-white">
            <div className="flex items-center space-x-2">
              <Activity size={16} className="text-emerald-600" />
              <span>Estado: Operacional</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-amber-600" />
              <span>Última actualización: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          
        </div>
        <div className="hidden lg:block">
          <div className="text-right">
            <div className="text-xs text-white uppercase tracking-wide mb-1">Proyecto Activo</div>
            <div className="text-4xl font-semibold text-white mb-1">
              {proyectoActual ? proyectoActual.nombre : 'Sin proyecto seleccionado'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
