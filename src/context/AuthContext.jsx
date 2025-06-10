 
 
import { createContext, useContext } from "react";
import { useState } from "react";
import api from "../api/api";
import { toast } from "sonner";
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
  const [loading, setLoading] = useState(false);

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

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario))
      localStorage.setItem("isAuthenticated", true);

      // Toast
      toast.success("Login exitoso");

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    finally {
      setLoading(false);
    }
  }

  const Logout = () => {
    try {
      setLoading(true);
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      localStorage.removeItem("isAuthenticated");
      setUsuario(null);
      setIsAuthenticated(false);

      // Toast
      toast.success("Logout exitoso");
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