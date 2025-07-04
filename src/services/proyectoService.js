import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";
import excavacionService from "@/services/excavacion/excavacionService";

// Clave para la caché de proyectos
export const PROYECTO_QUERY_KEY = ["proyecto"];

const proyectoService = {
  // Funciones de Servicio
  getAll: async () => {
    try {
      const response = await api.get("/proyecto");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  create: async (data) => {
    try {
      const response = await api.post("/proyecto", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  update: async (id, data) => {
    try {
      const response = await api.put(`/proyecto/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // 🔧 HOOK CORREGIDO - Con verificación de autenticación
  useProyectoQuery: (isAuthenticated = false) => {
    return useQuery({
      queryKey: PROYECTO_QUERY_KEY,
      queryFn: proyectoService.getAll,
      enabled: isAuthenticated, // ← SOLO ejecutar si está autenticado
      retry: (failureCount, error) => {
        // No reintentar si es error de autenticación
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          return false;
        }
        return failureCount < 3;
      }
    });
  },

  useProyectosConProgresoQuery: (isAuthenticated = false) => {
    const queryClient = useQueryClient();
    
    return useQuery({
      queryKey: [...PROYECTO_QUERY_KEY, 'conProgreso'],
      enabled: isAuthenticated, // ← SOLO ejecutar si está autenticado
      queryFn: async () => {
        // Primero obtenemos todos los proyectos
        const proyectos = await proyectoService.getAll();
        
        // Luego calculamos el progreso para cada proyecto
        const proyectosActualizados = [];
        
        for (const proyecto of proyectos) {
          try {
            // Obtener las excavaciones del proyecto
            const excavaciones = await queryClient.fetchQuery({
              queryKey: ['excavacion', 'proyecto', proyecto.id_proyecto],
              queryFn: () => excavacionService.getByProyectoId(proyecto.id_proyecto),
            });
            
            // Calcular el progreso basado en las excavaciones
            const progreso = excavacionService.calcularProgresoProyecto(excavaciones);
            
            // Añadir el progreso y las excavaciones al proyecto
            proyectosActualizados.push({
              ...proyecto,
              progreso,
              excavaciones
            });
          } catch (error) {
            console.error(`Error al obtener excavaciones para el proyecto ${proyecto.id_proyecto}:`, error);
            // Si hay error, añadir el proyecto sin progreso calculado
            proyectosActualizados.push({
              ...proyecto,
              progreso: 0,
              excavaciones: []
            });
          }
        }
        
        return proyectosActualizados;
      },
      retry: (failureCount, error) => {
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          return false;
        }
        return failureCount < 3;
      }
    });
  },

  useProyectoCreateMutation: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: proyectoService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PROYECTO_QUERY_KEY })
      }
    });
  },

  useProyectoUpdateMutation: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, data }) => proyectoService.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PROYECTO_QUERY_KEY })
      }
    });
  }
};

export default proyectoService;