import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api.js";

// Clave para material
export const MATERIAL_QUERY_KEY = ["materiales"];

const materialService = {
  // Consultar todos los materiales
  getAll: async () => {
    try {
      const response = await api.get("/material");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Crear un nuevo material
  create: async (data) => {
    try {
      const response = await api.post("/material", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Actualizar un material
  update: async (id, data) => {
    try {
      const response = await api.put(`/material/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Hooks de TanStack Query

  useGetMateriales: () => {
    return useQuery({
      queryKey: MATERIAL_QUERY_KEY,
      queryFn: materialService.getAll,
    });
  },

  useCreateMaterial: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: materialService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: MATERIAL_QUERY_KEY });
      },
    });
  },

  useUpdateMaterial: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }) => materialService.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: MATERIAL_QUERY_KEY });
      },
    });
  },
}

export default materialService;