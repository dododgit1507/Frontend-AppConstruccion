import api from "@/api/api";

const anilloService = {
  getAll: async () => {
    const response = await api.get("/excavacion/anillo");
    return response.data;
  },
  create: async (data) => {
    const response = await api.post("/excavacion/anillo", data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/excavacion/anillo/${id}`, data);
    return response.data;
  },
}

export default anilloService;