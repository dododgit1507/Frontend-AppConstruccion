import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";

// Claves para React Query
export const CAMION_QUERY_KEY = ["camion"];

const camionService = {
  // Consultar todos los camiones
  getAll: async () => {
    try {
      const response = await api.get("/camion");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Consultar un camión por ID
  getCamionById: async (id) => {
    try {
      const response = await api.get(`/camion/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Crear un nuevo camión
  create: async (data) => {
    try {
      const response = await api.post("/camion", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Actualizar un camión
  update: async (id, data) => {
    try {
      const response = await api.put(`/camion/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Hooks de TanStack Query

  useGetCamiones: () => {
    return useQuery({
      queryFn: () => camionService.getAll(),
      queryKey: CAMION_QUERY_KEY,
    })
  },

  useCreateCamion: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: camionService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: CAMION_QUERY_KEY });
      }
    })
  },

  useUpdateCamion: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }) => camionService.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: CAMION_QUERY_KEY });
      }
    })
  },
};

export default camionService;
