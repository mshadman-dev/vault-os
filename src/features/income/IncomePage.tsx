import styles from './Page.module.css'

export function IncomePage() {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Income</h1>
      <p className={styles.subtitle}>Track your income streams.</p>
    </div>
  )
}
