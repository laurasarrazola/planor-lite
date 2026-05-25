import { Navigate, Outlet } from 'react-router-dom'
import { authStorageService } from '@/core/services'

/**
 * Unauth Guard
 * Protects routes that should only be accessible when NOT authenticated
 * Redirects to home if user is already authenticated
 * @returns {JSX.Element} Unprotected route content or redirect
 */
export const UnauthGuard = () => {
  const isAuthenticated = authStorageService.isAuthenticated()

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return <Outlet />
}