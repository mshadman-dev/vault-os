import styles from './LayoutSkeleton.module.css'

/**
 * Loading skeleton for the application shell.
 * Mirrors the visual footprint of the full layout:
 *   - Sidebar placeholder on the left
 *   - Top nav placeholder at the top
 *   - Content area placeholder (no widgets/content)
 */
export function LayoutSkeleton() {
  return (
    <div className={styles.root} aria-busy="true" aria-label="Loading layout">
      {/* Sidebar skeleton */}
      <div className={styles.sidebar}>
        <div className={styles.brandSkeleton} />
        <div className={styles.navSkeleton}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={styles.navItemSkeleton} />
          ))}
        </div>
      </div>

      {/* Main area skeleton */}
      <div className={styles.main}>
        {/* Top nav skeleton */}
        <div className={styles.topNav} />
        {/* Content area — intentionally empty per Phase 3 requirements */}
        <div className={styles.content} />
      </div>
    </div>
  )
}
