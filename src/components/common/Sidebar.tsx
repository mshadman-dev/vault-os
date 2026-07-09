import { LazyMotion, domAnimation, m } from 'framer-motion'
import { Vault } from 'lucide-react'
import { NAV_ITEMS } from '../../lib/constants/navigation'
import { NavLink } from './NavLink'
import styles from './Sidebar.module.css'

/**
 * Desktop sidebar.
 *
 * Breakpoint behaviour is CSS-only (no JS media queries):
 *   - Hidden below 768px — mobile drawer takes over
 *   - Icon-only between 768px and 1023px
 *   - Full-width from 1024px+
 *
 * Framer Motion `m.nav` with `layout` animates the width transition.
 */
export function Sidebar() {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.nav
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className={styles.sidebar}
        aria-label="Main navigation"
      >
        <div className={styles.brand}>
          <span className={styles.brandIcon} aria-hidden="true">
            <Vault size={22} strokeWidth={1.75} />
          </span>
          <span className={styles.brandName}>vault-os</span>
        </div>

        <ul className={styles.navList} role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.id} className={styles.navItem}>
              {/*
               * collapsed=false always — the label element is hidden via
               * .navItem [data-nav-label] CSS rule below the 1024px breakpoint.
               */}
              <NavLink item={item} />
            </li>
          ))}
        </ul>
      </m.nav>
    </LazyMotion>
  )
}
