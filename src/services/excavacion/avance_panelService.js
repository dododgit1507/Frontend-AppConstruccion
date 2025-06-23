import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";
import { PANEL_QUERY_KEY } from "./panelService";

// Claves para React Query
const AVANCE_PANEL_QUERY_KEY = ["avances"];

const avance_panelService = {

  getAll: async () => {
    try {
      const response = await api.get("/excavacion/avance_panel");
      return response.data;
    } catch (error) {
      console.error('Error al obtener avances de panel:', error);
      throw error;
    }
  },

  /**
   * Obtiene todos los avances de un panel específico
   * @param {string} panelId - ID del panel
   */
  getByPanelId: async (panelId) => {
    try {
      const response = await api.get(`/excavacion/avance_panel/panel/${panelId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener avances del panel ${panelId}:`, error);
      throw error;
    }
  },

  /**
   * Obtiene el volumen acumulado de un panel
   * @param {string} panelId - ID del panel
   */
  getVolumenAcumulado: async (panelId) => {
    try {
      const response = await api.get(`/excavacion/avance_panel/volumen/${panelId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener volumen acumulado del panel ${panelId}:`, error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await api.post("/excavacion/avance_panel", data);
      return response.data;
    } catch (error) {
      console.error('Error al crear avance de panel:', error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/excavacion/avance_panel/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar avance de panel ${id}:`, error);
      throw error;
    }
  },

  //Hooks de TanStack Query

  useGetAvances: () => {
    return useQuery({
      queryFn: avance_panelService.getAll,
      queryKey: AVANCE_PANEL_QUERY_KEY,
    })
  },

  useCreateAvance: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: avance_panelService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: AVANCE_PANEL_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: PANEL_QUERY_KEY });
      }
    })
  },

  useUpdateAvance: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }) => avance_panelService.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: AVANCE_PANEL_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: PANEL_QUERY_KEY });
      }
    })
  }
}

export default avance_panelService;