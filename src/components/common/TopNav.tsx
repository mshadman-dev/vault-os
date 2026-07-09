import { Menu, X } from 'lucide-react'
import styles from './TopNav.module.css'

interface TopNavProps {
  drawerOpen: boolean
  onDrawerToggle: () => void
}

/**
 * Sticky top navigation bar with frosted-glass background.
 * The hamburger button is visible only on mobile (< 768px) via CSS.
 */
export function TopNav({ drawerOpen, onDrawerToggle }: TopNavProps) {
  return (
    <header className={styles.topNav} role="banner">
      {/* Mobile-only hamburger */}
      <button
        type="button"
        className={styles.menuButton}
        onClick={onDrawerToggle}
        aria-label={drawerOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={drawerOpen}
        aria-controls="mobile-drawer"
      >
        {drawerOpen ? (
          <X size={20} strokeWidth={1.75} />
        ) : (
          <Menu size={20} strokeWidth={1.75} />
        )}
      </button>

      {/* Page title slot — kept empty for the shell */}
      <div className={styles.titleSlot} aria-hidden="true" />

      {/* Right-side action slot — reserved for future items */}
      <div className={styles.actions} />
    </header>
  )
}
