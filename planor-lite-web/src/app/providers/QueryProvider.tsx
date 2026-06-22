/* Wrapper (Provider) que inyecta la instancia global de React Query (QueryClient) en toda la aplicación y añade las DevTools para facilitar el debug en desarrollo. Se utiliza para que hooks como useQuery y useMutation funcionen con la misma configuración y caché */

import { QueryClientProvider } from '@tanstack/react-query' // Provider que provee el QueryClient a la app
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' // DevTools para inspeccionar queries y caché (solo en desarrollo)
import { queryClient } from '@/core/config' // Instancia central de QueryClient con la configuración global

interface QueryProviderProps {
  children: React.ReactNode // Tipo para permitir cualquier elemento React como hijo
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  // Componente que envuelve la aplicación con QueryClientProvider
  return (
    <QueryClientProvider client={queryClient}>
      {children} {/* Aquí se renderiza la aplicación (o los componentes que necesitan React Query) */}
      <ReactQueryDevtools initialIsOpen={false} /> {/* Panel de DevTools: útil para desarrollo; se puede ocultar en producción */}
    </QueryClientProvider>
  )
}