import { Outlet } from 'react-router-dom';
import { Building } from 'lucide-react';

const AuthLayout = () => {
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
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-6">
            <Building className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">BuildApp</h1>
          <p className="text-white/80">Sistema de Gestión de Construcción</p>
        </div>

        {/* Auth Form */}
        <Outlet />

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            © 2025 BuildApp. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

