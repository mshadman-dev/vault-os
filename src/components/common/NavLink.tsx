import { NavLink as RouterNavLink } from 'react-router-dom'
import type { KeyboardEvent } from 'react'
import type { NavItem } from '../../types/navigation'
import styles from './NavLink.module.css'

interface NavLinkProps {
  item: NavItem
  onClick?: () => void
}

/**
 * Single keyboard-accessible navigation link.
 * Uses React Router NavLink for active-state management.
 * The label span carries `data-nav-label` so parent CSS can hide it
 * in collapsed layouts without JS.
 */
export function NavLink({ item, onClick }: NavLinkProps) {
  const Icon = item.icon

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.currentTarget.click()
    }
  }

  return (
    <RouterNavLink
      to={item.path}
      end={item.end}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={({ isActive }) =>
        [styles.link, isActive ? styles.active : ''].filter(Boolean).join(' ')
      }
      title={item.label}
    >
      <span className={styles.iconWrapper} aria-hidden="true">
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <span className={styles.label} data-nav-label>
        {item.label}
      </span>
    </RouterNavLink>
  )
}
