import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";

// Claves para React Query
export const ESTADO_QUERY_KEY = ["estados"];

const estadoService = {

  getAll: async () => {
    try {
      const response = await api.get("/estado");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await api.post("/estado", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/estado/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Hooks con TanStack Query
  useEstadoQuery: () => {
    return useQuery({
      queryFn: estadoService.getAll,
      queryKey: ESTADO_QUERY_KEY,
    })
  },

  useEstadoCreateMutation: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: estadoService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ESTADO_QUERY_KEY })
      }
    })
  },

  useEstadoUpdateMutation: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }) => estadoService.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ESTADO_QUERY_KEY })
      }
    })
  }
}

export default estadoService;