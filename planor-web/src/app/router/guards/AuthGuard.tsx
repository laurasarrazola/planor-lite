import { Navigate, Outlet } from 'react-router-dom'
import { authStorageService } from '@/core/services'

/**
 * Auth Guard
 * Protects routes that require authentication
 * Redirects to login if user is not authenticated
 * @returns {JSX.Element} Protected route content or redirect
 */
export const AuthGuard = () => {
  const isAuthenticated = authStorageService.isAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}