import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";
import { EXCAVACION_QUERY_KEY } from "./excavacionService";

// Clave para la caché de anillos
export const ANILLO_QUERY_KEY = ["anillo"];

const anilloService = {
  // Funciones de Servicio
  getById: async (id) => {
    const response = await api.get(`/excavacion/anillo/${id}`);
    return response.data;
  },

  getByExcavacionId: async (id) => {
    const response = await api.get(`/excavacion/anillo/excavacion/${id}`);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/excavacion/anillo");
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/excavacion/anillo", data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/excavacion/anillo/${id}`, data);
    return response.data;
  },

  // Hooks de React Query
  useAnilloQuery: () => {
    return useQuery({
      queryKey: ANILLO_QUERY_KEY,
      queryFn: anilloService.getAll,
    });
  },

  useAnilloByExcavacionQuery: (excavacionId) => {
    return useQuery({
      queryKey: [...ANILLO_QUERY_KEY, 'excavacion', excavacionId],
      queryFn: () => anilloService.getByExcavacionId(excavacionId),
      enabled: !!excavacionId, // Solo ejecuta la consulta si hay un ID de excavación
    });
  },

  /**
   * Hook para obtener anillos con información de progreso
   * @param {string|number} excavacionId - ID de la excavación
   * @returns {UseQueryResult} - Resultado de la consulta
   */
  useAnillosConProgresoQuery: (excavacionId) => {
    return useQuery({
      queryKey: [...ANILLO_QUERY_KEY, 'excavacion', excavacionId, 'conProgreso'],
      queryFn: async () => {
        // Obtenemos todos los anillos de la excavación
        const anillos = await anilloService.getByExcavacionId(excavacionId);
        
        // Aquí podríamos enriquecer los anillos con más información si fuera necesario
        return anillos;
      },
      enabled: !!excavacionId, // Solo ejecuta la consulta si hay un ID de excavación
    });
  },

  useAnilloCreateMutation: () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: anilloService.create,
      onSuccess: () => {
        // Invalidar consultas relacionadas para actualizar la UI
        queryClient.invalidateQueries({ queryKey: ANILLO_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: EXCAVACION_QUERY_KEY });
      }
    });
  },

  useAnilloUpdateMutation: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, data }) => anilloService.update(id, data),
      onSuccess: () => {
        // Invalidar consultas relacionadas para actualizar la UI
        queryClient.invalidateQueries({ queryKey: ANILLO_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: EXCAVACION_QUERY_KEY });
      }
    });
  },
};

export default anilloService;