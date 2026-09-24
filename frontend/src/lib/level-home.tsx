import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '@/lib/auth-context'
import { PREVIEW_AUTH, currentLevel } from '@/lib/access'
import { levelPath } from '@/lib/levels'

export function LevelHome() {
  const context = useContext(AuthContext)
  if (context?.isLoading) return null
  if (!PREVIEW_AUTH && !context?.isAuthenticated) return <Navigate to="/login" replace />

  const level = currentLevel()
  return <Navigate to={level ? levelPath(level) : '/no-workspace'} replace />
}
