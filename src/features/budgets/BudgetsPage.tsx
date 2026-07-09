import styles from './Page.module.css'

export function BudgetsPage() {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Budgets</h1>
      <p className={styles.subtitle}>Manage your budgets.</p>
    </div>
  )
}
