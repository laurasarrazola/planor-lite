/* Componente guard que protege rutas privadas comprobando si el usuario está autenticado.
  - Si el usuario NO está autenticado, redirige a "/login".
  - Si el usuario SÍ está autenticado, permite renderizar la ruta hija mediante <Outlet />.
 Este archivo centraliza la lógica de acceso para evitar duplicarla en páginas individuales. */

import { Navigate, Outlet } from 'react-router-dom' // Navigate: componente para redirigir; Outlet: renderiza rutas hijas
import { authStorageService } from '@/core/services' // Servicio central que gestiona el estado de autenticación (ej. tokens / session)

 /**
  * Guard de autenticación
  * Protege rutas que requieren autenticación
  * Redirige al login si el usuario no está autenticado
  * @returns {JSX.Element} Contenido de la ruta protegida o redirección
  */
export const AuthGuard = () => {
  // Comprueba si el usuario está autenticado usando el servicio centralizado
  const isAuthenticated = authStorageService.isAuthenticated()

  // Si no está autenticado, redirige al login y reemplaza la entrada en el historial
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Si está autenticado, renderiza la ruta hija correspondiente (Outlet representa el <Route> hijo)
  return <Outlet />
}