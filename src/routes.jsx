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
  // Rutas protegidas (requieren autenticación)
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
        path: 'acabados',
        element: <Acabados />
      }
    ]
  },
  // Ruta catch-all para manejar rutas no encontradas
  {
    path: '*',
    element: <Navigate to="/login" replace />
  }
]);