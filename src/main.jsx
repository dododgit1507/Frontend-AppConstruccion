import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import { AppProvider } from './context/ThemeContext.jsx'
// COMENTADO TEMPORALMENTE: import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'sonner'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      {/* COMENTADO TEMPORALMENTE: <AuthProvider> */}
        <RouterProvider router={router} />

        <Toaster 
          richColors
          position="top-right"
          duration={5000}
        />
      {/* COMENTADO TEMPORALMENTE: </AuthProvider> */}
    </AppProvider>
  </StrictMode>,
)