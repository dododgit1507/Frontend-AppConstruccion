import { Building, Activity, Clock } from 'lucide-react';
import { useProyecto } from '../../context/ProyectoContext';

const DashboardHeader = () => {
  const { proyectoActual } = useProyecto();

  return (
    <>
      {/* CSS para animaciones suaves */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="bg-gradient-to-r from-blue-950 to-blue-800 border border-slate-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 opacity-0 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="opacity-0 animate-slide-in-left" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-xl hover:bg-blue-200 duration-300 hover:scale-105 transform transition-transform">
                <Building className="text-blue-700 transition-colors duration-300" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white transition-all duration-300 hover:text-blue-100">
                  Panel de Control
                </h1>
                <div className="flex items-center space-x-2 mt-1 transition-all duration-300">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm transition-colors duration-300">
                    Sistema Operativo
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-white text-sm max-w-md transition-all duration-300 hover:text-blue-100">
              Supervisión técnica y monitoreo de proyectos de construcción
            </p>
            
            <div className="flex items-center space-x-6 mt-3 text-sm text-white transition-all duration-300">
              <div className="flex items-center space-x-2 hover:text-emerald-300 transition-colors duration-300">
                <Activity size={16} className="text-emerald-500 transition-colors duration-300" />
                <span>Estado: Operacional</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-amber-300 transition-colors duration-300">
                <Clock size={16} className="text-amber-500 transition-colors duration-300" />
                <span>Última actualización: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block opacity-0 animate-slide-in-right" style={{ animationDelay: '400ms' }}>
            <div className="text-right">
              <div className="text-xs text-blue-200 uppercase tracking-wide mb-1 transition-colors duration-300">
                Proyecto Activo
              </div>
              <div className="text-4xl font-semibold text-white mb-1 transition-all duration-300 hover:text-blue-100">
                {proyectoActual ? proyectoActual.nombre : 'Sin proyecto seleccionado'}
              </div>
              {proyectoActual && (
                <div className="text-sm text-blue-200 transition-colors duration-300 opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
                  {proyectoActual.direccion}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;