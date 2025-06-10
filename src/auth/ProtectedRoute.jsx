import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Building } from "lucide-react"

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-background-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-2xl mb-4 animate-pulse">
            <Building className="text-primary" size={32} />
          </div>
          <h2 className="text-xl font-semibold text-theme-text mb-2">BuildApp</h2>
          <p className="text-theme-text-secondary">Verificando autenticación...</p>
          <div className="mt-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children;
}

export default ProtectedRoute;