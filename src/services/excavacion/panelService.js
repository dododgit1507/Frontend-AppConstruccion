import api from "@/api/api";

const panelService = {
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
}

export default panelService;
