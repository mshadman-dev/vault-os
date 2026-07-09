import { useEffect, useRef } from 'react'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'
import { Vault } from 'lucide-react'
import { NAV_ITEMS } from '../../lib/constants/navigation'
import { NavLink } from './NavLink'
import styles from './MobileDrawer.module.css'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Mobile navigation drawer.
 * Slides in from the left with a backdrop on mobile (< 768px).
 * Focus is trapped inside while open; closes on Escape.
 */
export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)

  /* Close on Escape */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  /* Lock body scroll while drawer is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  /* Move focus into the drawer when it opens */
  useEffect(() => {
    if (isOpen) {
      const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(
        'a, button, [tabindex="0"]',
      )
      firstFocusable?.focus()
    }
  }, [isOpen])

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <m.div
              key="backdrop"
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <m.div
              key="drawer"
              id="mobile-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              className={styles.drawer}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            >
              <div className={styles.brand}>
                <span className={styles.brandIcon} aria-hidden="true">
                  <Vault size={22} strokeWidth={1.75} />
                </span>
                <span className={styles.brandName}>vault-os</span>
              </div>

              <nav aria-label="Mobile navigation">
                <ul className={styles.navList} role="list">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      <NavLink item={item} onClick={onClose} />
                    </li>
                  ))}
                </ul>
              </nav>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}
