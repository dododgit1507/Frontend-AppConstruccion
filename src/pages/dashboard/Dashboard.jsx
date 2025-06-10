import { Building, Users, Calendar, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 p-6 rounded-2xl border border-orange-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">¡Bienvenido de vuelta!</h1>
            <p className="text-gray-300">Tienes 5 proyectos activos y 12 tareas pendientes hoy</p>
          </div>
          <div className="hidden md:block w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
            <Building className="text-white" size={32} />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Building className="text-blue-400" size={24} />
            </div>
            <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">+2</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">Proyectos Activos</p>
            <p className="text-3xl font-bold text-white mb-1">12</p>
            <p className="text-xs text-green-400">↗ Desde el mes pasado</p>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Users className="text-green-400" size={24} />
            </div>
            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">+5</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">Trabajadores</p>
            <p className="text-3xl font-bold text-white mb-1">48</p>
            <p className="text-xs text-green-400">↗ Esta semana</p>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <Calendar className="text-yellow-400" size={24} />
            </div>
            <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">8</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">Tareas Pendientes</p>
            <p className="text-3xl font-bold text-white mb-1">23</p>
            <p className="text-xs text-yellow-400">⚡ 8 urgentes</p>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <TrendingUp className="text-purple-400" size={24} />
            </div>
            <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">+12%</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">Presupuesto</p>
            <p className="text-3xl font-bold text-white mb-1">85%</p>
            <p className="text-xs text-gray-400">Del total asignado</p>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="text-green-400" size={18} />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Excavación completada</p>
                <p className="text-sm text-gray-400 mb-1">Proyecto Residencial Norte</p>
                <p className="text-xs text-gray-500">Hace 2 horas</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <AlertTriangle className="text-yellow-400" size={18} />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Retraso en materiales</p>
                <p className="text-sm text-gray-400 mb-1">Centro Comercial Sur</p>
                <p className="text-xs text-gray-500">Hace 4 horas</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Building className="text-blue-400" size={18} />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Nuevo proyecto iniciado</p>
                <p className="text-sm text-gray-400 mb-1">Torre Empresarial</p>
                <p className="text-xs text-gray-500">Ayer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Proyectos en Progreso</h3>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-white">Residencial Norte</h4>
                <span className="text-gray-400 font-medium">75%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full w-3/4"></div>
              </div>
              <p className="text-gray-400 text-sm">Fase: Excavación</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-white">Centro Comercial</h4>
                <span className="text-gray-400 font-medium">60%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full w-3/5"></div>
              </div>
              <p className="text-gray-400 text-sm">Fase: Construcción</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-white">Torre Empresarial</h4>
                <span className="text-gray-400 font-medium">30%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full w-1/3"></div>
              </div>
              <p className="text-gray-400 text-sm">Fase: Acabados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;