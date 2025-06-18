import api from "@/api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Claves para React Query
const SECTOR_QUERY_KEY = ["sectores"];
const ANILLO_QUERY_KEY = ["anillos"];

const sectorService = {
  // Métodos básicos CRUD
  getById: async (id) => {
    const response = await api.get(`/excavacion/sector/${id}`);
    return response.data;
  },

  getByAnilloId: async (anilloId) => {
    const response = await api.get(`/excavacion/sector/anillo/${anilloId}`);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/excavacion/sector");
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/excavacion/sector", data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/excavacion/sector/${id}`, data);
    return response.data;
  },

  // Hooks de React Query
  useSectorQuery: () => {
    return useQuery({
      queryKey: SECTOR_QUERY_KEY,
      queryFn: sectorService.getAll,
    });
  },

  useSectorByAnilloQuery: (anilloId) => {
    return useQuery({
      queryKey: [...SECTOR_QUERY_KEY, 'anillo', anilloId],
      queryFn: () => sectorService.getByAnilloId(anilloId),
      enabled: !!anilloId, // Solo ejecuta la consulta si hay un ID de anillo
    });
  },

  /**
   * Hook para obtener sectores con información de progreso
   * @param {string|number} anilloId - ID del anillo
   * @returns {UseQueryResult} - Resultado de la consulta
   */
  useSectoresConProgresoQuery: (anilloId) => {
    return useQuery({
      queryKey: [...SECTOR_QUERY_KEY, 'anillo', anilloId, 'conProgreso'],
      queryFn: async () => {
        // Obtenemos todos los sectores del anillo
        const sectores = await sectorService.getByAnilloId(anilloId);
        
        // Aquí podríamos enriquecer los sectores con más información si fuera necesario
        return sectores;
      },
      enabled: !!anilloId, // Solo ejecuta la consulta si hay un ID de anillo
    });
  },

  useSectorCreateMutation: () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: sectorService.create,
      onSuccess: () => {
        // Invalidar consultas relacionadas para actualizar la UI
        queryClient.invalidateQueries({ queryKey: SECTOR_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: ANILLO_QUERY_KEY });
      }
    });
  },

  useSectorUpdateMutation: () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: ({ id, data }) => sectorService.update(id, data),
      onSuccess: () => {
        // Invalidar consultas relacionadas para actualizar la UI
        queryClient.invalidateQueries({ queryKey: SECTOR_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: ANILLO_QUERY_KEY });
      }
    });
  }
};

export default sectorService;
