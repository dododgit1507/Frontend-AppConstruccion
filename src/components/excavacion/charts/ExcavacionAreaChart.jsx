import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExcavacionAreaChart = ({ excavaciones, proyecto }) => {
  // Calcular el área total de las excavaciones
  const calcularAreaTotal = () => {
    if (!excavaciones || excavaciones.length === 0) {
      return 0;
    }
    
    return excavaciones.reduce((total, excavacion) => {
      let areaExc = parseFloat(excavacion.area);
      return total + (areaExc || 0);
    }, 0);
  };
  
  const areaExcavaciones = calcularAreaTotal();
  const areaProyecto = parseFloat(proyecto?.area) || 0;
  
  // Calcular el porcentaje de cobertura
  const porcentajeCobertura = areaProyecto > 0 
    ? Math.round((areaExcavaciones / areaProyecto) * 100) 
    : 0;
  
  // Configuración del gráfico
  const data = {
    labels: ['Área del Proyecto', 'Área Total Excavaciones'],
    datasets: [
      {
        label: 'Área (m²)',
        data: [areaProyecto, areaExcavaciones],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',  // Azul - Proyecto
          'rgba(75, 192, 192, 0.6)',  // Verde - Excavaciones
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
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
        position: 'top',
      },
      title: {
        display: true,
        text: 'Comparación de Áreas',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} m²`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Área (m²)'
        }
      }
    }
  };
  
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Cobertura de Excavaciones</h3>
      <div style={{ height: '250px', position: 'relative' }}>
        <Bar data={data} options={options} />
      </div>
      <div className="mt-4 text-center">
        <div className="text-sm text-slate-500">Cobertura del proyecto</div>
        <div className="flex items-center justify-center mt-2">
          <div className="w-full max-w-md bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-600 h-4 rounded-full" 
              style={{ width: `${Math.min(porcentajeCobertura, 100)}%` }}
            ></div>
          </div>
          <span className="ml-3 font-medium">{porcentajeCobertura}%</span>
        </div>
      </div>
    </div>
  );
};

export default ExcavacionAreaChart;
