import styles from './Page.module.css'

export function SettingsPage() {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Settings</h1>
      <p className={styles.subtitle}>Configure your preferences.</p>
    </div>
  )
}
