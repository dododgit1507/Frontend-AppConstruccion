import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApp } from "../context/ThemeContext";
import { toast } from "sonner";
import { 
  EyeIcon, 
  EyeSlashIcon,
  UserIcon,
  LockClosedIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const { Login: loginUser, isAuthenticated } = useAuth();
  const { theme } = useApp();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/seleccion-proyecto", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      await loginUser(data);
      toast.success("¡Bienvenido!", {
        description: "Has iniciado sesión correctamente",
      });
    } catch (error) {
      toast.error("Error al iniciar sesión", {
        description: error.message || "Verifica tus credenciales e intenta nuevamente",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md w-full">
      <div className={`p-8 backdrop-blur-xl rounded-2xl shadow-2xl border transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-white/10 border-white/10 shadow-white/5'
          : 'bg-white/95 border-gray-200 shadow-xl'
      }`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            theme === 'dark' 
              ? 'bg-primary/20 text-primary' 
              : 'bg-primary/10 text-primary'
          }`}>
            <UserIcon className="w-8 h-8" />
          </div>
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            BuildApp
          </h1>
          <p className={`text-sm mt-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="correo" className={`text-sm font-medium block ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Correo Electrónico
            </label>
            <div className="relative">
              <input 
                type="email" 
                id="correo" 
                className={`w-full px-4 py-3 pl-11 rounded-xl border outline-none transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white/10'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-primary focus:shadow-sm'
                } ${errors.correo ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="ejemplo@correo.com"
                {...register("correo", { 
                  required: "El correo es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Formato de correo inválido"
                  }
                })}
              />
              <UserIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
            {errors.correo && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-4 h-4 mr-1">⚠</span>
                {errors.correo.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="contrasena" className={`text-sm font-medium block ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Contraseña
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                id="contrasena" 
                className={`w-full px-4 py-3 pl-11 pr-11 rounded-xl border outline-none transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white/10'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-primary focus:shadow-sm'
                } ${errors.contrasena ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="••••••••"
                {...register("contrasena", { 
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres"
                  }
                })}
              />
              <LockClosedIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                } transition-colors`}
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.contrasena && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-4 h-4 mr-1">⚠</span>
                {errors.contrasena.message}
              </p>
            )}
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                {...register("recordarme")}
              />
              <span className={`ml-2 text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Recordarme
              </span>
            </label>
            <button
              type="button"
              className={`text-sm font-medium hover:underline transition-colors ${
                theme === 'dark' 
                  ? 'text-primary-light hover:text-primary' 
                  : 'text-primary hover:text-primary-dark'
              }`}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className={`w-full py-3 px-4 font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
              theme === 'dark'
                ? 'bg-primary hover:bg-primary-dark text-white shadow-primary/30 hover:shadow-primary/40'
                : 'bg-primary hover:bg-primary-dark text-white shadow-primary/20 hover:shadow-primary/30'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              <span className="flex items-center">
                Iniciar sesión
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            ¿No tienes una cuenta?{' '}
            <button
              type="button"
              className={`font-medium hover:underline transition-colors ${
                theme === 'dark' 
                  ? 'text-primary-light hover:text-primary' 
                  : 'text-primary hover:text-primary-dark'
              }`}
            >
              Registrarse
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;