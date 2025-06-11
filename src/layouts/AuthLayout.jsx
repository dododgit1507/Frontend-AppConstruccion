import { Outlet } from 'react-router-dom';
import { Building } from 'lucide-react';
import { useApp } from '../context/ThemeContext';

const AuthLayout = () => {
  const { theme } = useApp();
  
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-primary via-primary-dark to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: theme === 'dark'
            ? `radial-gradient(circle at 20% 50%, rgb(var(--color-primary-light)) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgb(var(--color-primary)) 0%, transparent 50%),
               radial-gradient(circle at 40% 80%, rgb(var(--color-primary-dark)) 0%, transparent 50%)`
            : `radial-gradient(circle at 20% 50%, rgb(var(--color-primary) / 0.1) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgb(var(--color-primary-light) / 0.1) 0%, transparent 50%),
               radial-gradient(circle at 40% 80%, rgb(var(--color-primary-dark) / 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 backdrop-blur-xl rounded-2xl border mb-6 ${
            theme === 'dark'
              ? 'bg-white/10 border-white/20'
              : 'bg-white/80 border-primary/20 shadow-lg'
          }`}>
            <Building className={theme === 'dark' ? 'text-white' : 'text-primary'} size={40} />
          </div>
        </div>

        {/* Auth Form */}
        <Outlet />

        {/* Footer */}
        <div className="text-center mt-8">
          <p className={`text-sm ${
            theme === 'dark' ? 'text-white/60' : 'text-gray-500'
          }`}>
            © 2025 BuildApp. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

