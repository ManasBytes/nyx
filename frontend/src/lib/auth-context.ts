import { createContext } from 'react'

export type AuthContextValue = {
  email: string | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (email: string) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
