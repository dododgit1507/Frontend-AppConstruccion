import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import ProtectedRoute from './auth/ProtectedRoute';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Demolicion from './pages/demolicion/Demolicion';
import Construccion from './pages/construccion/Construccion';
import ExcavacionPage from './pages/excavacion/ExcavacionPage';
import Acabados from './pages/acabados/Acabados';
import SeleccionProyecto from './pages/proyectos/SeleccionProyecto';
import Administracion from './pages/administracion/Administracion';
import AvancePanelView from './views/excavacion/AvancePanelView';
import ConfiguracionUsuario from './pages/usuario/ConfiguracionUsuario';

// Componentes de administración
import Camiones from './components/administracion/Camiones';
import Materiales from './components/administracion/Materiales';
import Trabajadores from './components/administracion/Trabajadores';


export const router = createBrowserRouter([
  // Ruta raíz - redirige a login
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  // Rutas de autenticación (públicas)
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />
      }
    ]
  },
  // Selección de proyecto (requiere autenticación)
  {
    path: '/seleccion-proyecto',
    element: (
      <ProtectedRoute>
        <SeleccionProyecto />
      </ProtectedRoute>
    )
  },
  // Rutas protegidas (requieren autenticación y selección de proyecto)
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'demolicion',
        element: <Demolicion />
      },
      {
        path: 'construccion',
        element: <Construccion />
      },
      {
        path: 'excavacion',
        element: <ExcavacionPage />
      },
      {
        path: 'excavacion/panel/:panelId/avances',
        element: <AvancePanelView />
      },
      {
        path: 'acabados',
        element: <Acabados />
      },
      {
        path: 'administracion',
        element: <Administracion />
      },
      {
        path: 'administracion/camiones',
        element: <Camiones />
      },
      {
        path: 'administracion/materiales',
        element: <Materiales />
      },
      {
        path: 'administracion/trabajadores',
        element: <Trabajadores />
      },
      {
        path: 'configuracion-usuario',
        element: <ConfiguracionUsuario />
      }
    ]
  },
  // Ruta catch-all para manejar rutas no encontradas
  {
    path: '*',
    element: <Navigate to="/login" replace />
  }
]);