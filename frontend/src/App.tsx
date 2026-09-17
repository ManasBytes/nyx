import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/lib/auth-provider'
import { RequireAuth } from '@/lib/require-auth'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { ComponentsPage } from '@/pages/components/ComponentsPage'
import { DspDashboardPage } from '@/pages/dsp/DspDashboardPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { SignInPage } from '@/pages/auth/SignInPage'
import { SignUpPage } from '@/pages/auth/SignUpPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<SignInPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route
            path="/dsp"
            element={
              <RequireAuth>
                <DspDashboardPage />
              </RequireAuth>
            }
          />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
