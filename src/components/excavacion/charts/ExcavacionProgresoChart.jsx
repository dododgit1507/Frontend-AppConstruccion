import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const ExcavacionProgresoChart = ({ excavaciones }) => {
  // Calcular el progreso general basado en los estados
  const calcularProgreso = () => {
    if (!excavaciones || excavaciones.length === 0) {
      return { completado: 0, pendiente: 100 };
    }
    
    const total = excavaciones.length;
    let completadas = 0;
    
    excavaciones.forEach(excavacion => {
      if (excavacion.estado?.toLowerCase() === 'finalizada') {
        completadas++;
      }
    });
    
    const porcentajeCompletado = (completadas / total) * 100;
    const porcentajePendiente = 100 - porcentajeCompletado;
    
    return {
      completado: porcentajeCompletado,
      pendiente: porcentajePendiente
    };
  };
  
  const progreso = calcularProgreso();
  
  // Configuración del gráfico
  const data = {
    labels: ['Completado', 'Pendiente'],
    datasets: [
      {
        data: [progreso.completado, progreso.pendiente],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',  // Verde - Completado
          'rgba(220, 220, 220, 0.6)',  // Gris - Pendiente
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(220, 220, 220, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw.toFixed(1) || 0;
            return `${label}: ${value}%`;
          }
        }
      }
    },
    cutout: '70%',
  };

  // Calcular el número de excavaciones completadas
  const excavacionesCompletadas = excavaciones?.filter(
    excavacion => excavacion.estado?.toLowerCase() === 'finalizada'
  ).length || 0;
  
  const totalExcavaciones = excavaciones?.length || 0;
  
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Progreso General</h3>
      <div className="flex items-center justify-center" style={{ height: '250px', position: 'relative' }}>
        <Doughnut data={data} options={options} />
        <div 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}
        >
          <div className="text-3xl font-bold text-slate-800">
            {Math.round(progreso.completado)}%
          </div>
          <div className="text-sm text-slate-500">
            {excavacionesCompletadas} de {totalExcavaciones}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcavacionProgresoChart;
