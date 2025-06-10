import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const { Login, isAuthenticated, usuario } = useAuth();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    await Login(data);
  }

  return (
    <div className="max-w-md w-full">
      <div className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
        <h1 className="text-2xl font-bold mb-6 text-white text-center">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="correo" className="text-sm font-medium text-gray-300 block">Correo Electrónico</label>
            <input 
              type="email" 
              id="correo" 
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              placeholder="ejemplo@correo.com"
              {...register("correo", { required: "El correo es requerido" })} 
            />
            {errors.correo && <p className="text-red-400 text-sm mt-1">{errors.correo.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="contrasena" className="text-sm font-medium text-gray-300 block">Contraseña</label>
            <input 
              type="password" 
              id="contrasena" 
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              placeholder="••••••••"
              {...register("contrasena", { required: "La contraseña es requerida" })} 
            />
            {errors.contrasena && <p className="text-red-400 text-sm mt-1">{errors.contrasena.message}</p>}
          </div>
          <button 
            type="submit"
            className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </>
            ) : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login