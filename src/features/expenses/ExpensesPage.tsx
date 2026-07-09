import styles from './Page.module.css'

export function ExpensesPage() {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Expenses</h1>
      <p className={styles.subtitle}>Monitor your spending.</p>
    </div>
  )
}
