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
  // Estado del tema (light/dark)
  const [theme, setTheme] = useState(() => {
    // Verificar si hay tema guardado en localStorage
    const savedTheme = localStorage.getItem('buildapp-theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Si no hay tema guardado, usar preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Estado del sidebar (abierto/cerrado en móvil)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Estado de configuración global
  const [config, setConfig] = useState({
    companyName: 'BuildApp',
    version: '1.0.0',
    language: 'es',
  });

  // Efecto para aplicar el tema al documento
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('buildapp-theme', theme);
  }, [theme]);

  // Función para cambiar el tema
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Función para cambiar a un tema específico
  const setSpecificTheme = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
    }
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
    // Tema
    theme,
    toggleTheme,
    setSpecificTheme,
    isDark: theme === 'dark',
    
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
