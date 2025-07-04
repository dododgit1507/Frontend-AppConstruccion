 
 
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import api from "../api/api";
import { toast } from "sonner";
import { queryClient } from "../config/queryClient";

// Crear el contexto de autenticacion
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

// Proveedor de autenticacion
export const AuthProvider = ({ children }) => {
  //Estados para la autenticacion
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar autenticación al cargar la app
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("usuario");
        const authStatus = localStorage.getItem("isAuthenticated");
        
        if (token && storedUser && authStatus === "true") {
          setUsuario(JSON.parse(storedUser));
          setIsAuthenticated(true);
          // Configurar el token en axios
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        // Limpiar datos corruptos
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        localStorage.removeItem("isAuthenticated");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Metodos
  const Login = async (data) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/login", data);
      // Data que retorna el backend
      const { usuario, token } = response.data;

      // Setear los estados globales
      setUsuario(usuario);
      setIsAuthenticated(true);

      // Configurar el token en axios
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario))
      localStorage.setItem("isAuthenticated", "true");

      // Toast
      toast.success(`¡Bienvenido ${usuario.nombre}!`);

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error al iniciar sesión");
      setLoading(false);
    }
    finally {
      setLoading(false);
    }
  }
  
  const Logout = () => {
    try {
      setLoading(true);
      
      // Remover token del axios
      delete api.defaults.headers.common['Authorization'];
      queryClient.clear();
      
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      localStorage.removeItem("isAuthenticated");
      setUsuario(null);
      setIsAuthenticated(false);

      // Toast
      toast.success("Sesión cerrada correctamente");
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{
      usuario,
      loading,
      isAuthenticated,
      // Metodos
      Login,
      Logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}