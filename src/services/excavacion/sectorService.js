import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";
import panelService from "./panelService";

// Claves para React Query
const SECTOR_QUERY_KEY = ["sectores"];
const ANILLO_QUERY_KEY = ["anillos"];

const sectorService = {
  // Métodos básicos CRUD
  getById: async (id) => {
    const response = await api.get(`/excavacion/sector/${id}`);
    return response.data;
  },

  getByAnilloId: async (anilloId) => {
    const response = await api.get(`/excavacion/sector/anillo/${anilloId}`);
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

  /**
   * Verifica y actualiza automáticamente el estado del sector basado en sus paneles
   * @param {string} id - ID del sector
   * @returns {Promise<Object>} - Resultado de la verificación
   */
  verificarEstado: async (id) => {
    const response = await api.post(`/excavacion/sector/${id}/verificar-estado`);
    return response.data;
  },

  /**
   * Calcula el progreso de un sector basado en sus paneles
   * @param {Array} paneles - Lista de paneles del sector
   * @returns {number} - Porcentaje de progreso (0-100)
   */
  calcularProgresoSector: (paneles) => {
    if (!paneles || paneles.length === 0) return 0;
    
    const panelesFinalizados = paneles.filter(panel => panel.estado === 'finalizada').length;
    return Math.round((panelesFinalizados / paneles.length) * 100);
  },

  // Hooks de React Query
  useSectorQuery: () => {
    return useQuery({
      queryKey: SECTOR_QUERY_KEY,
      queryFn: sectorService.getAll,
    });
  },

  useSectorByAnilloQuery: (anilloId) => {
    return useQuery({
      queryKey: [...SECTOR_QUERY_KEY, 'anillo', anilloId],
      queryFn: () => sectorService.getByAnilloId(anilloId),
      enabled: !!anilloId, // Solo ejecuta la consulta si hay un ID de anillo
    });
  },

  /**
   * Hook para obtener sectores con información de progreso
   * @param {string|number} anilloId - ID del anillo
   * @returns {UseQueryResult} - Resultado de la consulta
   */
  useSectoresConProgresoQuery: (anilloId) => {
    const queryClient = useQueryClient();
    
    return useQuery({
      queryKey: [...SECTOR_QUERY_KEY, 'anillo', anilloId, 'conProgreso'],
      queryFn: async () => {
        // Obtenemos todos los sectores del anillo
        const sectores = await sectorService.getByAnilloId(anilloId);
        
        // Calculamos el progreso para cada sector
        const sectoresActualizados = [];
        
        for (const sector of sectores) {
          try {
            // Obtener los paneles del sector
            const paneles = await queryClient.fetchQuery({
              queryKey: ['paneles', 'sector', sector.id_sector],
              queryFn: () => panelService.getBySectorId(sector.id_sector),
            });
            
            // Calcular el progreso basado en los paneles
            const progreso = sectorService.calcularProgresoSector(paneles);
            
            // Añadir el progreso y los paneles al sector
            sectoresActualizados.push({
              ...sector,
              progreso,
              paneles
            });
          } catch (error) {
            console.error(`Error al obtener paneles para el sector ${sector.id_sector}:`, error);
            // Si hay error, añadir el sector sin progreso calculado
            sectoresActualizados.push({
              ...sector,
              progreso: 0,
              paneles: []
            });
          }
        }
        
        return sectoresActualizados;
      },
      enabled: !!anilloId, // Solo ejecuta la consulta si hay un ID de anillo
    });
  },

  useSectorCreateMutation: () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: sectorService.create,
      onSuccess: () => {
        // Invalidar consultas relacionadas para actualizar la UI
        queryClient.invalidateQueries({ queryKey: SECTOR_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: ANILLO_QUERY_KEY });
      }
    });
  },

  useSectorUpdateMutation: () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: ({ id, data }) => sectorService.update(id, data),
      onSuccess: () => {
        // Invalidar consultas relacionadas para actualizar la UI
        queryClient.invalidateQueries({ queryKey: SECTOR_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: ANILLO_QUERY_KEY });
      }
    });
  },

  /**
   * Hook para verificar automáticamente el estado de un sector
   * @returns {UseMutationResult} - Mutación para verificar estado
   */
  useVerificarEstadoMutation: () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: (sectorId) => sectorService.verificarEstado(sectorId),
      onSuccess: (data, sectorId) => {
        // Invalidar consultas relacionadas para actualizar la UI
        queryClient.invalidateQueries({ queryKey: SECTOR_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: ANILLO_QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: ['paneles'] });
        
        // Mostrar mensaje de éxito si se actualizó el estado
        if (data.actualizado) {
          console.log(`Sector ${sectorId}: ${data.mensaje}`);
        }
      },
      onError: (error, sectorId) => {
        console.error(`Error al verificar estado del sector ${sectorId}:`, error);
      }
    });
  }
};

export default sectorService;
