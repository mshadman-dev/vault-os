/**
 * Footer — minimal site footer for the landing page.
 */
import { Link } from 'react-router-dom'
import { PATHS } from '../../../../lib/constants/paths'
import styles from './Footer.module.css'

const FOOTER_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Privacy', href: '#security' },
  { label: 'Launch App', href: PATHS.LOGIN, isRoute: true },
]

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand */}
        <Link
          to={PATHS.LANDING}
          className={styles.brand}
          aria-label="Vault-OS home"
        >
          <div className={styles.logoMark} aria-hidden="true">V</div>
          <span className={styles.brandName}>Vault-OS</span>
        </Link>

        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <ul className={styles.links}>
            {FOOTER_LINKS.map(({ label, href, isRoute }) => (
              <li key={label}>
                {isRoute ? (
                  <Link to={href} className={styles.link}>{label}</Link>
                ) : (
                  <a href={href} className={styles.link}>{label}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <p className={styles.legal}>
          &copy; {YEAR} Vault-OS. Open source.
        </p>
      </div>
    </footer>
  )
}
