import { useState, useCallback, useEffect } from 'react'

/**
 * Manages mobile drawer open/close state.
 * Also closes the drawer when viewport crosses the 768px boundary
 * (e.g. user resizes from mobile to tablet/desktop).
 */
export function useMobileDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false)
    }

    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  return { isOpen, open, close, toggle }
}
