/* Guard que protege rutas destinadas solo a usuarios NO autenticados (por ejemplo: login, registro).
 * - Si el usuario ESTÁ autenticado, lo redirige a la ruta principal (/home).
 * - Si el usuario NO está autenticado, permite renderizar la ruta hija mediante <Outlet />.
 * Centraliza esta regla para evitar duplicar la comprobación en cada página pública.
 */

import { Navigate, Outlet } from 'react-router-dom' // Navigate: componente para redirigir; Outlet: renderiza rutas hijas
import { authStorageService } from '@/core/services' // Servicio central que gestiona el estado de autenticación (ej. tokens / session)

/**
 * Guard para no autenticados
 * Protege rutas que solo deben ser accesibles cuando NO está autenticado
 * Redirige a la página de inicio si el usuario ya está autenticado
 * @returns {JSX.Element} Contenido de la ruta no protegida o redirección
 */

export const UnauthGuard = () => {
  // Comprueba si el usuario está autenticado usando el servicio centralizado
  const isAuthenticated = authStorageService.isAuthenticated()

  // Si está autenticado, redirige a /home y reemplaza la entrada del historial (evita volver atrás a la página pública)
  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  // Si NO está autenticado, renderiza la ruta hija (permitiendo ver la página pública)
  return <Outlet />
}