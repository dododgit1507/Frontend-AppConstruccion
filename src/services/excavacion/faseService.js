import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";

// Claves para React Query
export const FASE_QUERY_KEY = ["fases"];

const faseService = {

  getAll: async () => {
    try {
      const response = await api.get("/fase");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await api.post("/fase", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/fase/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Hooks con TanStack Query
  useFaseQuery: () => {
    return useQuery({
      queryFn: faseService.getAll,
      queryKey: FASE_QUERY_KEY,
    })
  },

  useFaseCreateMutation: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: faseService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: FASE_QUERY_KEY })
      }
    })
  },

  useFaseUpdateMutation: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }) => faseService.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: FASE_QUERY_KEY })
      }
    })
  }
}

export default faseService;