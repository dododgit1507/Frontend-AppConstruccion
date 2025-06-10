import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import ProtectedRoute from './auth/ProtectedRoute';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Demolicion from './pages/demolicion/Demolicion';
import Construccion from './pages/construccion/Construccion';
import Excavacion from './pages/excavacion/Excavacion';
import Acabados from './pages/acabados/Acabados';

export const router = createBrowserRouter([
  // TEMPORAL: Ruta raíz - redirige directamente a dashboard (sin login)
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  
  // COMENTADO TEMPORALMENTE: Rutas de autenticación 
  /*
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
  */
  
  // TEMPORAL: Rutas sin protección (para demo sin backend)
  {
    path: '/dashboard',
    element: <MainLayout />, // Sin ProtectedRoute temporalmente
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
        element: <Excavacion />
      },
      {
        path: 'acabados',
        element: <Acabados />
      }
    ]
  },
  
  // COMENTADO TEMPORALMENTE: Ruta catch-all
  /*
  {
    path: '*',
    element: <Navigate to="/login" replace />
  }
  */
  
  // TEMPORAL: Ruta catch-all redirige a dashboard
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />
  }
]);