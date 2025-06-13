import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";
import anilloService from "./anilloService";


// Clave para la caché de excavaciones
export const EXCAVACION_QUERY_KEY = ["excavacion"];

const excavacionService = {

  // Funciones de Servicio
  getById: async (id) => {
    const response = await api.get(`/excavacion/${id}`);
    return response.data;
  },

  getByProyectoId: async (id) => {
    const response = await api.get(`/excavacion/proyecto/${id}`);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/excavacion");
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/excavacion", data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/excavacion/${id}`, data);
    return response.data;
  },
  
  /**
   * Calcula el progreso de un proyecto basado en sus excavaciones
   * @param {Array} excavaciones - Lista de excavaciones del proyecto
   * @returns {number} - Porcentaje de progreso (0-100)
   */
  calcularProgresoProyecto: (excavaciones) => {
    if (!excavaciones || excavaciones.length === 0) return 0;
    
    const excavacionesFinalizadas = excavaciones.filter(exc => exc.estado === 'finalizada').length;
    return Math.round((excavacionesFinalizadas / excavaciones.length) * 100);
  },

  /**
   * Calcula el progreso de una excavación basado en sus anillos
   * @param {Array} anillos - Lista de anillos de la excavación
   * @returns {number} - Porcentaje de progreso (0-100)
   */
  calcularProgresoExcavacion: (anillos) => {
    if (!anillos || anillos.length === 0) return 0;
    
    const anillosFinalizados = anillos.filter(anillo => anillo.estado === 'finalizada').length;
    return Math.round((anillosFinalizados / anillos.length) * 100);
  },

  // Hooks de React Query
  useExcavacionQuery: () => {
    return useQuery({
      queryKey: EXCAVACION_QUERY_KEY,
      queryFn: excavacionService.getAll,
    });
  },

  useExcavacionByProyectoQuery: (proyectoId) => {
    return useQuery({
      queryKey: [...EXCAVACION_QUERY_KEY, 'proyecto', proyectoId],
      queryFn: () => excavacionService.getByProyectoId(proyectoId),
      enabled: !!proyectoId, // Solo ejecuta la consulta si hay un ID de proyecto
    });
  },
  
  useExcavacionesConProgresoQuery: (proyectoId) => {
    const queryClient = useQueryClient();
    
    return useQuery({
      queryKey: [...EXCAVACION_QUERY_KEY, 'proyecto', proyectoId, 'conProgreso'],
      queryFn: async () => {
        // Primero obtenemos todas las excavaciones del proyecto
        const excavaciones = await excavacionService.getByProyectoId(proyectoId);
        
        // Luego calculamos el progreso para cada excavación
        const excavacionesActualizadas = [];
        
        for (const excavacion of excavaciones) {
          try {
            // Obtener los anillos de la excavación
            const anillos = await queryClient.fetchQuery({
              queryKey: ['anillo', 'excavacion', excavacion.id_excavacion],
              queryFn: () => anilloService.getByExcavacionId(excavacion.id_excavacion),
            });
            
            // Calcular el progreso basado en los anillos
            const progreso = excavacionService.calcularProgresoExcavacion(anillos);
            
            // Añadir el progreso y los anillos a la excavación
            excavacionesActualizadas.push({
              ...excavacion,
              progreso,
              anillos
            });
          } catch (error) {
            console.error(`Error al obtener anillos para la excavación ${excavacion.id_excavacion}:`, error);
            // Si hay error, añadir la excavación sin progreso calculado
            excavacionesActualizadas.push({
              ...excavacion,
              progreso: 0,
              anillos: []
            });
          }
        }
        
        return excavacionesActualizadas;
      },
      enabled: !!proyectoId, // Solo ejecuta la consulta si hay un ID de proyecto
    });
  },

  useExcavacionCreateMutation: () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: excavacionService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: EXCAVACION_QUERY_KEY })
      }
    });
  },

  useExcavacionUpdateMutation: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id, data) => excavacionService.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: EXCAVACION_QUERY_KEY })
      }
    });
  },
}

export default excavacionService;
