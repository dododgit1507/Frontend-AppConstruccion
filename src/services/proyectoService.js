import api from "@/api/api";

const proyectoService = {
  getAll: async () => {
    try {
      const response = await api.get("/proyectos");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  create: async (data) => {
    try {
      const response = await api.post("/proyectos", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export default proyectoService;