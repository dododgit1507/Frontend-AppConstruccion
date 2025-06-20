import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import { AppProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProyectoProvider } from './context/ProyectoContext.jsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './config/queryClient'
import { Toaster } from 'sonner'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AuthProvider>
          <ProyectoProvider>
            <RouterProvider router={router} />
            <Toaster
              richColors
              position="top-center"
              duration={3000}
            />
          </ProyectoProvider>
        </AuthProvider>
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>,
)