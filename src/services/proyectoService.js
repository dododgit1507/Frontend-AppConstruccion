import api from "@/api/api";

const proyectoService = {
  getAll: async () => {
    try {
      const response = await api.get("/proyecto");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  create: async (data) => {
    try {
      const response = await api.post("/proyecto", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  update: async (id, data) => {
    try {
      const response = await api.put(`/proyecto/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export default proyectoService;