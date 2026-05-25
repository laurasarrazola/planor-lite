import { QueryClient } from '@tanstack/react-query'

/**
 * React Query client instance with default configuration
 * @constant {QueryClient} queryClient - Configured QueryClient instance
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      retry: false,
    },
  },
})