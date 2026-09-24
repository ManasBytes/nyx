import { useContext, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '@/lib/auth-context'
import { PREVIEW_AUTH } from '@/lib/access'

export function RequireAuth({ children }: { children: ReactNode }) {
  const context = useContext(AuthContext)
  if (PREVIEW_AUTH) return children
  if (context?.isLoading) return null
  return context?.isAuthenticated ? children : <Navigate to="/login" replace />
}
