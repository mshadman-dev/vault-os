/**
 * DashboardPreview — stylised mock of the app UI to give visitors
 * a sense of the product before signing up.
 * All content is presentational — no real data.
 */
import styles from './DashboardPreview.module.css'

export function DashboardPreview() {
  return (
    <section
      className={styles.section}
      aria-labelledby="preview-heading"
    >
      <div className={styles.header}>
        <p className={styles.eyebrow} aria-hidden="true">The App</p>
        <h2 id="preview-heading" className={styles.heading}>
          A dashboard built for clarity
        </h2>
        <p className={styles.subheading}>
          Every number you need, zero clutter. Designed for dark environments and
          focused work sessions.
        </p>
      </div>

      {/* Browser chrome mock */}
      <div
        className={styles.browserWrap}
        role="img"
        aria-label="Vault-OS dashboard preview screenshot"
      >
        {/* Chrome bar */}
        <div className={styles.chrome} aria-hidden="true">
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
          <div className={styles.urlBar}>vault-os.app/dashboard</div>
        </div>

        {/* Faux app UI */}
        <div className={styles.mockContent} aria-hidden="true">
          {/* Sidebar */}
          <aside className={styles.mockSidebar}>
            <div className={styles.sidebarLogo} />
            {[true, false, false, false, false, false].map((active, i) => (
              <div
                key={i}
                className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
              />
            ))}
          </aside>

          {/* Main content */}
          <div className={styles.mockMain}>
            {/* Hero balance */}
            <div className={styles.heroCard}>
              <div className={styles.mockLabel} />
              <div className={styles.mockValue} />
            </div>

            {/* Income / Expense row */}
            <div className={styles.metricRow}>
              <div className={`${styles.metricCard} ${styles.income}`}>
                <div className={styles.mockLabel} />
                <div className={styles.mockValue} />
                <div className={styles.mockBar}>
                  <div className={`${styles.mockBarFill} ${styles.green}`} />
                </div>
              </div>
              <div className={`${styles.metricCard} ${styles.expense}`}>
                <div className={styles.mockLabel} />
                <div className={styles.mockValue} />
                <div className={styles.mockBar}>
                  <div className={`${styles.mockBarFill} ${styles.red}`} />
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className={styles.chartCard}>
              {[...Array(7)].map((_, i) => (
                <div key={i} className={styles.chartBar} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
