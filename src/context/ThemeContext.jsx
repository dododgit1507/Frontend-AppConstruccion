import { createContext, useContext, useState, useEffect } from 'react';

// Contexto para el tema y configuración global de la app
const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Estado del tema (siempre light - modo oscuro deshabilitado)
  const [theme, setTheme] = useState('light');

  // Estado del sidebar (abierto/cerrado en móvil)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Estado de configuración global
  const [config, setConfig] = useState({
    companyName: 'C4 - Construccion',
    version: '1.0.0',
    language: 'es',
  });

  // Efecto para aplicar el tema al documento (siempre light)
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('c4-theme', 'light');
  }, []);

  // Función para cambiar el tema (DESHABILITADA - siempre modo claro)
  const toggleTheme = () => {
    // No hace nada - modo oscuro deshabilitado
    console.log('Modo oscuro deshabilitado - siempre en modo claro');
  };

  // Función para cambiar a un tema específico (DESHABILITADA - siempre modo claro)
  const setSpecificTheme = (newTheme) => {
    // No hace nada - modo oscuro deshabilitado
    console.log('Modo oscuro deshabilitado - siempre en modo claro');
  };

  // Función para toggle del sidebar
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  // Colores del sistema (accesibles via JS)
  const colors = {
    primary: 'rgb(234 88 12)', // orange-600
    primaryLight: 'rgb(251 146 60)', // orange-400
    primaryDark: 'rgb(194 65 12)', // orange-700
    success: 'rgb(34 197 94)', // green-500
    warning: 'rgb(234 179 8)', // yellow-500
    error: 'rgb(239 68 68)', // red-500
    info: 'rgb(59 130 246)', // blue-500
  };

  const value = {
    // Tema (siempre modo claro)
    theme,
    toggleTheme,
    setSpecificTheme,
    isDark: false, // Siempre false - modo oscuro deshabilitado
    
    // Sidebar
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    
    // Configuración
    config,
    setConfig,
    
    // Colores
    colors,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
