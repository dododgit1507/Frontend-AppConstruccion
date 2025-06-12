import api from "@/api/api";

const anilloService = {

  getById: async (id) => {
    const response = await api.get(`/excavacion/anillo/${id}`);
    return response.data;
  },

  getByExcavacionId: async (id) => {
    const response = await api.get(`/excavacion/excavacion/${id}`);
    return response.data;
  },

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