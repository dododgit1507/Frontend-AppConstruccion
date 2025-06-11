import api from "@/api/api";

const excavacionService = {
  getAll: async () => {
    const response = await api.get("/excavacion");
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/excavacion", data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/excavacion/${id}`, data);
    return response.data;
  },
}

export default excavacionService;
