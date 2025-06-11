import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import { AppProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'sonner'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <AuthProvider>        <RouterProvider router={router} />

        <Toaster 
          richColors
          position="top-right"
          duration={5000}
        />
      </AuthProvider>
    </AppProvider>
  </StrictMode>,
)