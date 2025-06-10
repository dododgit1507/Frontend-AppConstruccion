import { createBrowserRouter } from 'react-router-dom';
import Login from './auth/Login';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Demolicion from './pages/demolicion/Demolicion';
import Construccion from './pages/construccion/Construccion';
import Excavacion from './pages/excavacion/Excavacion';
import Acabados from './pages/acabados/Acabados';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'auth/login',
        element: <Login />
      },
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
  }
]);