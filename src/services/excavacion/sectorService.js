import api from "@/api/api";

const sectorService = {

  getById: async (id) => {
    const response = await api.get(`/excavacion/sector/${id}`);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/excavacion/sector");
    return response.data;
  },
  create: async (data) => {
    const response = await api.post("/excavacion/sector", data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/excavacion/sector/${id}`, data);
    return response.data;
  },
}

export default sectorService;
