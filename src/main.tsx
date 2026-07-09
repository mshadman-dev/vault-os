import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
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
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
