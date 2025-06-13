// Configuracion global para TanStack Query
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tiempo que los datos se consideran frescos
      staleTime: 1000 * 60 * 5,
      // Tiempo que los datos permanecen en caché cuando no están en uso
      gcTime: 1000 * 60 * 10, // 10 minutos
      // Reintentos en caso de error
      retry: 1,
      // Refetch Automatico cuando la ventana recupera el foco
      refetchOnWindowFocus: true,
    },
  },
});