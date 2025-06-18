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

const ExcavacionEstadoChart = ({ excavaciones }) => {
  // Contamos las excavaciones por estado
  const contarPorEstado = () => {
    const conteo = {
      pendiente: 0,
      iniciada: 0,
      finalizada: 0,
      suspendida: 0,
    };
    
    excavaciones?.forEach(excavacion => {
      const estado = excavacion.estado?.toLowerCase() || 'pendiente';
      if (conteo.hasOwnProperty(estado)) {
        conteo[estado] += 1;
      } else {
        conteo[estado] = 1;
      }
    });
    
    return conteo;
  };
  
  const estadoConteo = contarPorEstado();
  
  // Configuración del gráfico
  const data = {
    labels: ['Pendiente', 'Iniciada', 'Finalizada', 'Suspendida'],
    datasets: [
      {
        label: 'Excavaciones por Estado',
        data: [
          estadoConteo.pendiente,
          estadoConteo.iniciada,
          estadoConteo.finalizada,
          estadoConteo.suspendida,
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)', // Amarillo - Pendiente
          'rgba(54, 162, 235, 0.6)',  // Azul - Iniciada
          'rgba(75, 192, 192, 0.6)',  // Verde - Finalizada
          'rgba(255, 99, 132, 0.6)',  // Rojo - Suspendida
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Excavaciones por Estado',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            const total = excavaciones?.length || 0;
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };
  
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribución por Estado</h3>
      <Bar data={data} options={options} height={300} />
    </div>
  );
};

export default ExcavacionEstadoChart;
