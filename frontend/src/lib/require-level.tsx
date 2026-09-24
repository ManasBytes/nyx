import { useContext, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '@/lib/auth-context'
import { PREVIEW_AUTH, currentLevel } from '@/lib/access'
import { levelPath, type LevelId } from '@/lib/levels'

export function RequireLevel({ level, children }: { level: LevelId; children: ReactNode }) {
  const context = useContext(AuthContext)
  if (context?.isLoading) return null
  if (!PREVIEW_AUTH && !context?.isAuthenticated) return <Navigate to="/login" replace />

  const userLevel = currentLevel()
  if (!userLevel) return <Navigate to="/no-workspace" replace />
  if (userLevel !== level) return <Navigate to={levelPath(userLevel)} replace />
  return children
}
