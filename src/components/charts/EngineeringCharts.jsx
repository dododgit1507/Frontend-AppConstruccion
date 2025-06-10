import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TimeScale,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TimeScale
);

// Gráfico de Progreso de Obra vs Cronograma
export const ProgressVsScheduleChart = ({ isDark }) => {
  const data = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
    datasets: [
      {
        label: 'Progreso Planificado (%)',
        data: [12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Progreso Real (%)',
        data: [15, 28, 35, 48, 58, 72, 85, null],
        borderColor: 'rgb(234, 88, 12)',
        backgroundColor: 'rgba(234, 88, 12, 0.1)',
        borderWidth: 3,
        fill: false,
        tension: 0.1,
        borderDash: [5, 5],
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          font: { size: 12 }
        }
      },
      title: {
        display: true,
        text: 'Progreso vs Cronograma',
        color: isDark ? '#f9fafb' : '#111827',
        font: { size: 14, weight: 'bold' }
      },
      tooltip: {
        backgroundColor: isDark ? '#374151' : '#ffffff',
        titleColor: isDark ? '#f9fafb' : '#111827',
        bodyColor: isDark ? '#e5e7eb' : '#374151',
        borderColor: isDark ? '#6b7280' : '#d1d5db',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          color: isDark ? '#374151' : '#e5e7eb',
        }
      },
      x: {
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: isDark ? '#374151' : '#e5e7eb',
        }
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
      }
    }
  };

  return <Line data={data} options={options} />;
};

// Gráfico de Productividad por Cuadrilla
export const ProductivityChart = ({ isDark }) => {
  const data = {
    labels: ['Demolición', 'Excavación', 'Estructura', 'Mampostería', 'Acabados', 'Instalaciones'],
    datasets: [
      {
        label: 'Rendimiento Actual (m²/día)',
        data: [85, 120, 45, 65, 35, 28],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(168, 85, 247)',
          'rgb(236, 72, 153)',
        ],
        borderWidth: 2,
      },
      {
        label: 'Rendimiento Meta (m²/día)',
        data: [90, 100, 50, 70, 40, 30],
        backgroundColor: 'rgba(156, 163, 175, 0.3)',
        borderColor: 'rgb(156, 163, 175)',
        borderWidth: 2,
        type: 'line',
        fill: false,
        tension: 0.1,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          font: { size: 12 }
        }
      },
      title: {
        display: true,
        text: 'Productividad por Cuadrilla',
        color: isDark ? '#f9fafb' : '#111827',
        font: { size: 14, weight: 'bold' }
      },
      tooltip: {
        backgroundColor: isDark ? '#374151' : '#ffffff',
        titleColor: isDark ? '#f9fafb' : '#111827',
        bodyColor: isDark ? '#e5e7eb' : '#374151',
        borderColor: isDark ? '#6b7280' : '#d1d5db',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y + ' m²/día';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
          callback: function(value) {
            return value + ' m²/día';
          }
        },
        grid: {
          color: isDark ? '#374151' : '#e5e7eb',
        }
      },
      x: {
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: isDark ? '#374151' : '#e5e7eb',
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

// Gráfico de Control de Calidad
export const QualityControlChart = ({ isDark }) => {
  const data = {
    labels: ['Conformes', 'Observaciones Menores', 'No Conformes', 'Pendientes'],
    datasets: [
      {
        data: [78, 15, 4, 3],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(156, 163, 175)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          font: { size: 11 },
          padding: 15,
          usePointStyle: true,
        }
      },
      title: {
        display: true,
        text: 'Control de Calidad - Inspecciones',
        color: isDark ? '#f9fafb' : '#111827',
        font: { size: 14, weight: 'bold' }
      },
      tooltip: {
        backgroundColor: isDark ? '#374151' : '#ffffff',
        titleColor: isDark ? '#f9fafb' : '#111827',
        bodyColor: isDark ? '#e5e7eb' : '#374151',
        borderColor: isDark ? '#6b7280' : '#d1d5db',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return context.label + ': ' + context.parsed + ' (' + percentage + '%)';
          }
        }
      }
    },
    cutout: '50%',
  };

  return <Doughnut data={data} options={options} />;
};

// Gráfico de Consumo de Materiales
export const MaterialConsumptionChart = ({ isDark }) => {
  const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Cemento (Ton)',
        data: [45, 52, 48, 61, 58, 65],
        borderColor: 'rgb(75, 85, 99)',
        backgroundColor: 'rgba(75, 85, 99, 0.1)',
        yAxisID: 'y',
      },
      {
        label: 'Acero (Ton)',
        data: [12, 15, 18, 22, 20, 25],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        yAxisID: 'y',
      },
      {
        label: 'Concreto (m³)',
        data: [85, 92, 88, 105, 98, 112],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          font: { size: 12 }
        }
      },
      title: {
        display: true,
        text: 'Consumo de Materiales por Mes',
        color: isDark ? '#f9fafb' : '#111827',
        font: { size: 14, weight: 'bold' }
      },
      tooltip: {
        backgroundColor: isDark ? '#374151' : '#ffffff',
        titleColor: isDark ? '#f9fafb' : '#111827',
        bodyColor: isDark ? '#e5e7eb' : '#374151',
        borderColor: isDark ? '#6b7280' : '#d1d5db',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: isDark ? '#374151' : '#e5e7eb',
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: isDark ? '#374151' : '#e5e7eb',
        },
        title: {
          display: true,
          text: 'Toneladas',
          color: isDark ? '#9ca3af' : '#6b7280',
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
        },
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Metros Cúbicos',
          color: isDark ? '#9ca3af' : '#6b7280',
        }
      },
    },
  };

  return <Line data={data} options={options} />;
};

// Gráfico de Recursos vs Planificado
export const ResourcePlanningChart = ({ isDark }) => {
  const data = {
    labels: ['Personal', 'Equipos', 'Materiales', 'Subcontratos', 'Servicios'],
    datasets: [
      {
        label: 'Planificado (%)',
        data: [100, 100, 100, 100, 100],
        backgroundColor: 'rgba(156, 163, 175, 0.3)',
        borderColor: 'rgb(156, 163, 175)',
        borderWidth: 1,
      },
      {
        label: 'Actual (%)',
        data: [95, 85, 110, 88, 92],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(34, 197, 94)',
        ],
        borderWidth: 2,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          font: { size: 12 }
        }
      },
      title: {
        display: true,
        text: 'Recursos: Planificado vs Actual',
        color: isDark ? '#f9fafb' : '#111827',
        font: { size: 14, weight: 'bold' }
      },
      tooltip: {
        backgroundColor: isDark ? '#374151' : '#ffffff',
        titleColor: isDark ? '#f9fafb' : '#111827',
        bodyColor: isDark ? '#e5e7eb' : '#374151',
        borderColor: isDark ? '#6b7280' : '#d1d5db',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y + '%';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 120,
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          color: isDark ? '#374151' : '#e5e7eb',
        }
      },
      x: {
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: isDark ? '#374151' : '#e5e7eb',
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};
