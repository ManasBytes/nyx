import { useEffect, useState, type ReactNode } from 'react'
import { clearTokens, getAccessToken, getUserEmail, refreshSession } from '@/lib/auth'
import { AuthContext } from '@/lib/auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState(() => getUserEmail())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    refreshSession()
      .then((refreshed) => {
        if (!refreshed) {
          clearTokens()
          setEmail(null)
        }
      })
      .finally(() => setIsLoading(false))
  }, [])

  function signIn(nextEmail: string) {
    setEmail(nextEmail)
  }

  function signOut() {
    clearTokens()
    setEmail(null)
  }

  const isAuthenticated = Boolean(getAccessToken() && email)

  return (
    <AuthContext.Provider value={{ email, isAuthenticated, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
