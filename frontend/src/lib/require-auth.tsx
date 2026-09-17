import { useContext, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '@/lib/auth-context'

export function RequireAuth({ children }: { children: ReactNode }) {
  const context = useContext(AuthContext)
  return context?.isAuthenticated ? children : <Navigate to="/login" replace />
}
