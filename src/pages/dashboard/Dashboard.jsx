import React from 'react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import ModuleNavigation from '../../components/dashboard/ModuleNavigation';
import OperationalMetrics from '../../components/dashboard/OperationalMetrics';
import EssentialCharts from '../../components/dashboard/EssentialCharts';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header del Dashboard */}
        <DashboardHeader />
        
        {/* Navegación de Módulos */}
        <ModuleNavigation />
        
        {/* Métricas Operativas */}
        <OperationalMetrics />
        
        {/* Análisis del Proyecto */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Análisis del Proyecto</h2>
            <p className="text-sm text-slate-600 mt-1">Seguimiento técnico y control de avance</p>
          </div>
          <EssentialCharts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
