import api from "@/api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Claves para React Query
export const PANEL_QUERY_KEY = ["paneles"];
export const SECTOR_QUERY_KEY = ["sectores"];

const panelService = {
  // Métodos básicos CRUD
  getById: async (id) => {
    const response = await api.get(`/excavacion/panel/${id}`);
    return response.data;
  },

  getBySectorId: async (sectorId) => {
    const response = await api.get(`/excavacion/panel/sector/${sectorId}`);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/excavacion/panel");
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/excavacion/panel", data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/excavacion/panel/${id}`, data);
    return response.data;
  },

  // Hooks de React Query
  usePanelQuery: () => {
    return useQuery({
      queryKey: PANEL_QUERY_KEY,
      queryFn: panelService.getAll,
    });
  },

  usePanelBySectorQuery: (sectorId) => {
    return useQuery({
      queryKey: [...PANEL_QUERY_KEY, 'sector', sectorId],
      queryFn: () => panelService.getBySectorId(sectorId),
      enabled: !!sectorId, // Solo ejecuta la consulta si hay un ID de sector
    });
  },

  /**
   * Hook para obtener paneles con información de progreso
   * @param {string|number} sectorId - ID del sector
   * @returns {UseQueryResult} - Resultado de la consulta
   */
  usePanelesConProgresoQuery: (sectorId) => {
    return useQuery({
      queryKey: [...PANEL_QUERY_KEY, 'sector', sectorId, 'conProgreso'],
      queryFn: async () => {
        // Obtenemos todos los paneles del sector
        const paneles = await panelService.getBySectorId(sectorId);
        
        // Aquí podríamos enriquecer los paneles con más información si fuera necesario
        return paneles;
      },
      enabled: !!sectorId, // Solo ejecuta la consulta si hay un ID de sector
    });
  },

  usePanelCreateMutation: () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: panelService.create,
      onSuccess: () => {
        // Invalidar consultas relacionadas para actualizar la UI
        queryClient.invalidateQueries({ queryKey: PANEL_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: SECTOR_QUERY_KEY });
      }
    });
  },

  usePanelUpdateMutation: () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: ({ id, data }) => panelService.update(id, data),
      onSuccess: () => {
        // Invalidar consultas relacionadas para actualizar la UI
        queryClient.invalidateQueries({ queryKey: PANEL_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: SECTOR_QUERY_KEY });
      }
    });
  }
};

export default panelService;
