import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/lib/auth-provider'
import { LevelHome } from '@/lib/level-home'
import { RequireLevel } from '@/lib/require-level'
import { LEVEL_IDS, levelPath } from '@/lib/levels'
import { ComponentsPage } from '@/pages/components/ComponentsPage'
import { LevelDashboardPage } from '@/pages/levels/LevelDashboardPage'
import { LevelSectionPage } from '@/pages/levels/LevelSectionPage'
import { NoWorkspacePage } from '@/pages/levels/NoWorkspacePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { StationDataPage } from '@/pages/manage/StationDataPage'
import { ZoneDataPage } from '@/pages/manage/ZoneDataPage'
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
          <Route path="/" element={<LevelHome />} />
          <Route path="/no-workspace" element={<NoWorkspacePage />} />
          {LEVEL_IDS.map((level) => (
            <Route key={level}>
              <Route
                path={levelPath(level)}
                element={
                  <RequireLevel level={level}>
                    <LevelDashboardPage level={level} />
                  </RequireLevel>
                }
              />
              <Route
                path={`/level${level}/:section`}
                element={
                  <RequireLevel level={level}>
                    <LevelSectionPage level={level} />
                  </RequireLevel>
                }
              />
            </Route>
          ))}
          <Route
            path="/level5/records"
            element={
              <RequireLevel level={5}>
                <StationDataPage />
              </RequireLevel>
            }
          />
          <Route
            path="/level4/records"
            element={
              <RequireLevel level={4}>
                <ZoneDataPage />
              </RequireLevel>
            }
          />
          <Route path="/records" element={<Navigate to="/level5/records" replace />} />
          <Route path="/dsp/records" element={<Navigate to="/level4/records" replace />} />
          <Route path="/dsp" element={<Navigate to="/" replace />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
