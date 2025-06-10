import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { Building, Home, RefreshCw } from 'lucide-react';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-secondary flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgb(var(--color-primary-light)) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgb(var(--color-primary)) 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, rgb(var(--color-primary-dark)) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-6">
            <Building className="text-white" size={40} />
          </div>

          {/* Error Info */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 mb-6">
            <h1 className="text-3xl font-bold text-white mb-4">
              ¡Oops! Algo salió mal
            </h1>
            
            <div className="mb-6">
              {error?.status === 404 ? (
                <>
                  <h2 className="text-xl text-white/90 mb-2">Página no encontrada</h2>
                  <p className="text-white/70">
                    La página que buscas no existe o ha sido movida.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-xl text-white/90 mb-2">Error inesperado</h2>
                  <p className="text-white/70">
                    Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
                  </p>
                </>
              )}
            </div>

            {/* Error Details (only in development) */}
            {import.meta.env.DEV && error && (
              <div className="bg-white/5 rounded-lg p-4 mb-6 text-left">
                <p className="text-white/60 text-sm font-mono break-all">
                  {error.statusText || error.message || 'Error desconocido'}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/login"
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-medium rounded-xl hover:from-primary-dark hover:to-primary transition-all shadow-lg hover:shadow-primary/30"
              >
                <Home size={18} />
                <span>Ir al Inicio</span>
              </Link>
              
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                <RefreshCw size={18} />
                <span>Recargar</span>
              </button>
            </div>
          </div>

          {/* BuildApp Branding */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">BuildApp</h3>
            <p className="text-white/60 text-sm">
              Sistema de Gestión de Construcción
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
