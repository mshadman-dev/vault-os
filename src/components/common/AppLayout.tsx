import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'
import { MobileDrawer } from './MobileDrawer'
import { LayoutSkeleton } from './LayoutSkeleton'
import { useMobileDrawer } from '../../hooks/useMobileDrawer'
import styles from './AppLayout.module.css'

interface AppLayoutProps {
  /** Show the layout skeleton while the app is bootstrapping */
  loading?: boolean
}

/**
 * Root application shell.
 *
 * Structure:
 *   <AppLayout>
 *     <Sidebar />          ← sticky, desktop only (CSS)
 *     <div.main>
 *       <TopNav />         ← sticky, always visible
 *       <main>
 *         <Outlet />       ← page content via React Router
 *       </main>
 *     </div.main>
 *     <MobileDrawer />     ← portal-like overlay, mobile only
 *   </AppLayout>
 */
export function AppLayout({ loading = false }: AppLayoutProps) {
  const { isOpen, close, toggle } = useMobileDrawer()

  if (loading) return <LayoutSkeleton />

  return (
    <div className={styles.root}>
      <Sidebar />

      <div className={styles.main}>
        <TopNav drawerOpen={isOpen} onDrawerToggle={toggle} />

        <main className={styles.content} id="main-content">
          <Outlet />
        </main>
      </div>

      <MobileDrawer isOpen={isOpen} onClose={close} />
    </div>
  )
}
