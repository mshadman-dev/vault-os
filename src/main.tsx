import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './providers/auth-provider'
import { AuthGuard } from './features/auth/components/AuthGuard'
import { LoginPage } from './features/auth/pages/LoginPage'
import { SignupPage } from './features/auth/pages/SignupPage'
import { ForgotPasswordPage } from './features/auth/pages/ForgotPasswordPage'
import { AppLayout } from './components/common/AppLayout'
import { PATHS } from './lib/constants/paths'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { IncomePage } from './features/income/IncomePage'
import { ExpensesPage } from './features/expenses/ExpensesPage'
import { AnalyticsPage } from './features/analytics/AnalyticsPage'
import { BudgetsPage } from './features/budgets/BudgetsPage'
import { SavingsPage } from './features/savings/SavingsPage'
import { TimelinePage } from './features/timeline/TimelinePage'
import { SettingsPage } from './features/settings/SettingsPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public auth routes — redirect to dashboard if already signed in ── */}
          <Route element={<AuthGuard requireAuth={false} />}>
            <Route path={PATHS.LOGIN} element={<LoginPage />} />
            <Route path={PATHS.SIGNUP} element={<SignupPage />} />
            <Route path={PATHS.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          </Route>

          {/* ── Protected app routes — redirect to /login if not signed in ── */}
          <Route element={<AuthGuard requireAuth={true} />}>
            <Route element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path={PATHS.INCOME} element={<IncomePage />} />
              <Route path={PATHS.EXPENSES} element={<ExpensesPage />} />
              <Route path={PATHS.ANALYTICS} element={<AnalyticsPage />} />
              <Route path={PATHS.BUDGETS} element={<BudgetsPage />} />
              <Route path={PATHS.SAVINGS} element={<SavingsPage />} />
              <Route path={PATHS.TIMELINE} element={<TimelinePage />} />
              <Route path={PATHS.SETTINGS} element={<SettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
