import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";


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
