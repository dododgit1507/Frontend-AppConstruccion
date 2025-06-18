import React from 'react';
import ExcavacionEstadoChart from './ExcavacionEstadoChart';
import ExcavacionProgresoChart from './ExcavacionProgresoChart';
import ExcavacionAreaChart from './ExcavacionAreaChart';

const ExcavacionDashboard = ({ excavaciones, proyecto }) => {
  if (!excavaciones || excavaciones.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
        <p className="text-center text-slate-500">No hay datos de excavaciones disponibles para mostrar gráficos.</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      {/* <h2 className="text-xl font-bold text-slate-800 mb-4">Dashboard de Excavaciones</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 overflow-y-auto">
        <ExcavacionEstadoChart excavaciones={excavaciones} />
        <ExcavacionProgresoChart excavaciones={excavaciones} />
        <ExcavacionAreaChart excavaciones={excavaciones} proyecto={proyecto} />
      </div>
    </div>
  );
};

export default ExcavacionDashboard;
