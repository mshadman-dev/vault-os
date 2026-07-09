import styles from './Page.module.css'

export function TimelinePage() {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Timeline</h1>
      <p className={styles.subtitle}>Your financial history.</p>
    </div>
  )
}
