import { QueryClient } from '@tanstack/react-query'

/**
 * Instancia de `QueryClient` de React Query con configuración por defecto
 * @constant {QueryClient} queryClient - Instancia de `QueryClient` configurada
 */

// Exportamos la instancia de `QueryClient` para su uso en toda la aplicación. QueryClient es el núcleo de React Query y se encarga de gestionar el estado de las consultas y mutaciones.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Número de reintentos automáticos cuando una consulta falla
      retry: 1,
      //Si vuelve a pedir datos al volver a la pestaña del navegador
      refetchOnWindowFocus: false,
      //	Tiempo (ms) que los datos se consideran “frescos” antes de poder volver a solicitarlos
      staleTime: 1000 * 60 * 5, // 5 minutos
    },
    mutations: {
      //Reintentos automáticos para mutaciones (envío/creación/borrado)
      retry: false,
    },
  },
})