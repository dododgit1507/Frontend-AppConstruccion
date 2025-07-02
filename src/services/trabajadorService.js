import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api.js";

// Clave para material
export const TRABAJADOR_QUERY_KEY = ["trabajadores"];

const trabajadorService = {
  // Consultar todos los materiales
  getAll: async () => {
    try {
      const response = await api.get("/trabajador");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Crear un nuevo material
  create: async (data) => {
    try {
      const response = await api.post("/trabajador", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Actualizar un material
  update: async (id, data) => {
    try {
      const response = await api.put(`/trabajador/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Hooks de TanStack Query

  useGetTrabajadores: () => {
    return useQuery({
      queryKey: TRABAJADOR_QUERY_KEY,
      queryFn: trabajadorService.getAll,
    });
  },

  useCreateTrabajador: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: trabajadorService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: TRABAJADOR_QUERY_KEY });
      },
    });
  },

  useUpdateTrabajador: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }) => trabajadorService.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: TRABAJADOR_QUERY_KEY });
      },
    });
  },
}

export default trabajadorService;