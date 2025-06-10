import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
  Cell,
  ScatterChart,
  Scatter,
} from 'recharts';

// Datos para gráficos de ingeniería
const safetyData = [
  { mes: 'Ene', incidentes: 2, actos: 8, condiciones: 5, horas: 3200 },
  { mes: 'Feb', incidentes: 1, actos: 6, condiciones: 3, horas: 3400 },
  { mes: 'Mar', incidentes: 0, actos: 4, condiciones: 2, horas: 3600 },
  { mes: 'Abr', incidentes: 1, actos: 5, condiciones: 4, horas: 3500 },
  { mes: 'May', incidentes: 0, actos: 3, condiciones: 1, horas: 3700 },
  { mes: 'Jun', incidentes: 0, actos: 2, condiciones: 2, horas: 3800 },
];

const costAnalysisData = [
  { categoria: 'Material', planificado: 850000, actual: 920000, variacion: 8.2 },
  { categoria: 'Mano Obra', planificado: 650000, actual: 580000, variacion: -10.8 },
  { categoria: 'Equipos', planificado: 320000, actual: 285000, variacion: -10.9 },
  { categoria: 'Subcontratos', planificado: 450000, actual: 520000, variacion: 15.6 },
  { categoria: 'Servicios', planificado: 180000, actual: 175000, variacion: -2.8 },
];

const equipmentEfficiencyData = [
  { equipo: 'Excavadora', horas: 85, eficiencia: 92 },
  { equipo: 'Grúa Torre', horas: 95, eficiencia: 88 },
  { equipo: 'Mixer', horas: 72, eficiencia: 95 },
  { equipo: 'Compactador', horas: 45, eficiencia: 90 },
  { equipo: 'Soldadora', horas: 68, eficiencia: 85 },
  { equipo: 'Vibrador', horas: 52, eficiencia: 93 },
];

const weatherImpactData = [
  { dia: 'L', temp: 22, lluvia: 0, trabajo: 100 },
  { dia: 'M', temp: 25, lluvia: 5, trabajo: 85 },
  { dia: 'X', temp: 28, lluvia: 0, trabajo: 100 },
  { dia: 'J', temp: 24, lluvia: 15, trabajo: 60 },
  { dia: 'V', temp: 26, lluvia: 0, trabajo: 100 },
  { dia: 'S', temp: 23, lluvia: 8, trabajo: 75 },
];

// Gráfico de Seguridad e Incidentes
export const SafetyChart = ({ isDark }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
          <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{`Mes: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={safetyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="incidentes" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="actos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="condiciones" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
        <XAxis 
          dataKey="mes" 
          tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
          axisLine={{ stroke: isDark ? '#4b5563' : '#d1d5db' }}
        />
        <YAxis 
          tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
          axisLine={{ stroke: isDark ? '#4b5563' : '#d1d5db' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="incidentes" stackId="1" stroke="#ef4444" fill="url(#incidentes)" />
        <Area type="monotone" dataKey="actos" stackId="1" stroke="#f59e0b" fill="url(#actos)" />
        <Area type="monotone" dataKey="condiciones" stackId="1" stroke="#3b82f6" fill="url(#condiciones)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// Gráfico de Análisis de Costos
export const CostAnalysisChart = ({ isDark }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
          <p className={`font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{label}</p>
          <p className="text-sm text-blue-500">Planificado: ${data.planificado.toLocaleString()}</p>
          <p className="text-sm text-orange-500">Actual: ${data.actual.toLocaleString()}</p>
          <p className={`text-sm ${data.variacion > 0 ? 'text-red-500' : 'text-green-500'}`}>
            Variación: {data.variacion > 0 ? '+' : ''}{data.variacion}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={costAnalysisData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
        <XAxis 
          dataKey="categoria" 
          tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 11 }}
          axisLine={{ stroke: isDark ? '#4b5563' : '#d1d5db' }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
          axisLine={{ stroke: isDark ? '#4b5563' : '#d1d5db' }}
          tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="planificado" fill="#3b82f6" name="Planificado" />
        <Bar dataKey="actual" fill="#ea580c" name="Actual" />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Gráfico de Eficiencia de Equipos
export const EquipmentEfficiencyChart = ({ isDark }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
          <p className={`font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{data.equipo}</p>
          <p className="text-sm text-blue-500">Horas trabajadas: {data.horas}h</p>
          <p className="text-sm text-green-500">Eficiencia: {data.eficiencia}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart data={equipmentEfficiencyData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
        <XAxis 
          type="number" 
          dataKey="horas" 
          name="horas"
          tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
          axisLine={{ stroke: isDark ? '#4b5563' : '#d1d5db' }}
          label={{ value: 'Horas Trabajadas', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fill: isDark ? '#9ca3af' : '#6b7280' } }}
        />
        <YAxis 
          type="number" 
          dataKey="eficiencia" 
          name="eficiencia"
          tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
          axisLine={{ stroke: isDark ? '#4b5563' : '#d1d5db' }}
          label={{ value: 'Eficiencia (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: isDark ? '#9ca3af' : '#6b7280' } }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Scatter fill="#8884d8" />
        {equipmentEfficiencyData.map((entry, index) => (
          <Scatter key={index} fill={entry.eficiencia > 90 ? '#22c55e' : entry.eficiencia > 85 ? '#f59e0b' : '#ef4444'} />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

// Gráfico de Impacto Climático
export const WeatherImpactChart = ({ isDark }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
          <p className={`font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Día: {label}</p>
          <p className="text-sm text-red-500">Temperatura: {data.temp}°C</p>
          <p className="text-sm text-blue-500">Lluvia: {data.lluvia}mm</p>
          <p className="text-sm text-green-500">Productividad: {data.trabajo}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={weatherImpactData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
        <XAxis 
          dataKey="dia" 
          tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
          axisLine={{ stroke: isDark ? '#4b5563' : '#d1d5db' }}
        />
        <YAxis 
          yAxisId="left"
          tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
          axisLine={{ stroke: isDark ? '#4b5563' : '#d1d5db' }}
          label={{ value: 'Productividad (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: isDark ? '#9ca3af' : '#6b7280' } }}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right"
          tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
          axisLine={{ stroke: isDark ? '#4b5563' : '#d1d5db' }}
          label={{ value: 'Lluvia (mm)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: isDark ? '#9ca3af' : '#6b7280' } }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line yAxisId="left" type="monotone" dataKey="trabajo" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', r: 4 }} />
        <Line yAxisId="right" type="monotone" dataKey="lluvia" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#3b82f6', r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Indicador Radial de KPIs
export const KPIRadialChart = ({ isDark }) => {
  const data = [
    { name: 'Cronograma', value: 85, fill: '#22c55e' },
    { name: 'Presupuesto', value: 72, fill: '#f59e0b' },
    { name: 'Calidad', value: 92, fill: '#3b82f6' },
    { name: 'Seguridad', value: 95, fill: '#8b5cf6' },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={data}>
        <RadialBar
          minAngle={15}
          label={{ position: 'insideStart', fill: '#fff', fontSize: 12 }}
          background={{ fill: isDark ? '#374151' : '#f3f4f6' }}
          clockWise={true}
          dataKey="value"
        />
        <Tooltip 
          formatter={(value) => [`${value}%`, 'Cumplimiento']}
          labelStyle={{ color: isDark ? '#f9fafb' : '#111827' }}
          contentStyle={{ 
            backgroundColor: isDark ? '#374151' : '#ffffff',
            border: `1px solid ${isDark ? '#6b7280' : '#d1d5db'}`,
            borderRadius: '8px'
          }}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
