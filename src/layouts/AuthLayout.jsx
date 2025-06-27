import { Outlet } from 'react-router-dom';
import { Building } from 'lucide-react';
import { useApp } from '../context/ThemeContext';

const AuthLayout = () => {
  const { theme } = useApp();
  
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 bg-blue-950`}>
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
        <div className="text-center mb-6">
          <div className="flex-col items-center justify-center gap-4">
            <div className={`inline-flex items-center justify-center w-30 h-30 backdrop-blur-xl rounded-2xl mb-3`}>
              <img src="public/img/c4-logo.png" alt="" />
            </div>
            <h1 className="text-4xl font-extrabold text-white">CONSTRUCTICON</h1>
          </div>
        </div>
        

        {/* Auth Form */}
        <Outlet />

        {/* Footer */}
        <div className="text-center mt-8">
          <p className={`text-sm text-white`}>
            © 2025 C4 Constructicon Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

