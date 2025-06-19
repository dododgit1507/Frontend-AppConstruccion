import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Crear el contexto
const ProyectoContext = createContext();

// Hook personalizado para usar el contexto
export const useProyecto = () => {
  const context = useContext(ProyectoContext);
  if (!context) {
    throw new Error('useProyecto debe ser usado dentro de un ProyectoProvider');
  }
  return context;
};

// Proveedor del contexto
export const ProyectoProvider = ({ children }) => {
  const [proyectoActual, setProyectoActual] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Al montar el componente, intentar cargar el proyecto desde localStorage
  useEffect(() => {
    const cargarProyectoGuardado = () => {
      try {
        const proyectoGuardado = localStorage.getItem('proyectoSeleccionado');
        if (proyectoGuardado) {
          setProyectoActual(JSON.parse(proyectoGuardado));
        }
      } catch (error) {
        console.error('Error al cargar el proyecto desde localStorage:', error);
        // Si hay un error, limpiar el localStorage
        localStorage.removeItem('proyectoSeleccionado');
      } finally {
        setCargando(false);
      }
    };

    cargarProyectoGuardado();
  }, []);

  // Función para seleccionar un proyecto
  const seleccionarProyecto = (proyecto) => {
    setProyectoActual(proyecto);
    localStorage.setItem('proyectoSeleccionado', JSON.stringify(proyecto));
    toast.success(`Proyecto "${proyecto.nombre}" seleccionado`);
  };

  // Función para cambiar de proyecto (ahora solo guarda el estado)
  const cambiarProyecto = () => {
    // En lugar de navegar directamente, solo limpiamos el proyecto actual
    // y la navegación se manejará en los componentes que usen este contexto
    limpiarProyecto();
  };

  // Función para limpiar el proyecto seleccionado
  const limpiarProyecto = () => {
    setProyectoActual(null);
    localStorage.removeItem('proyectoSeleccionado');
  };

  // Valores que se proporcionarán a través del contexto
  const value = {
    proyectoActual,
    cargando,
    seleccionarProyecto,
    cambiarProyecto,
    limpiarProyecto
  };

  return (
    <ProyectoContext.Provider value={value}>
      {children}
    </ProyectoContext.Provider>
  );
};

export default ProyectoContext;
