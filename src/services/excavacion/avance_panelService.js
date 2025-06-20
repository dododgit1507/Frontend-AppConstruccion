import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";

// Claves para React Query
const AVANCE_PANEL_QUERY_KEY = ["avances"];
const queryClient = useQueryClient();

const avance_panelService = {

  getAll: () => {
    const response = api.get("/excavacion/avance_panel");
    return response.data;
  },

  create: (data) => {
    const response = api.post("/excavacion/avance_panel", data);
    return response.data;
  },

  update: (id, data) => {
    const response = api.put(`/excavacion/avance_panel/${id}`, data);
    return response.data;
  },

  //Hooks de TanStack Query

  useGetAvances: () => {
    return useQuery({
      queryFn: avance_panelService.getAll,
      queryKey: AVANCE_PANEL_QUERY_KEY,
    })
  },

  useCreateAvance: () => {
    return useMutation({
      mutationFn: avance_panelService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: AVANCE_PANEL_QUERY_KEY });
      }
    })
  },

  useUpdateAvance: () => {
    return useMutation({
      mutationFn: avance_panelService.update,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: AVANCE_PANEL_QUERY_KEY });
      }
    })
  }
}

export default avance_panelService;