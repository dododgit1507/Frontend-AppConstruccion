import api from "@/api/api";

const avanceExcavacionService = {
  getAll: async () => {
    const response = await api.get("/excavacion/avance_excavacion");
    return response.data;
  },
  create: async (data) => {
    const response = await api.post("/excavacion/avance_excavacion", data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/excavacion/avance_excavacion/${id}`, data);
    return response.data;
  },
}

export default avanceExcavacionService;
