import { useState, type ReactNode } from 'react'
import { clearTokens, getAccessToken, getUserEmail } from '@/lib/auth'
import { AuthContext } from '@/lib/auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState(() => getUserEmail())

  function signIn(nextEmail: string) {
    setEmail(nextEmail)
  }

  function signOut() {
    clearTokens()
    setEmail(null)
  }

  const isAuthenticated = Boolean(getAccessToken() && email)

  return (
    <AuthContext.Provider value={{ email, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
