/**
 * Features — six-card feature grid section.
 */
import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  Wallet,
  PiggyBank,
  ShieldCheck,
} from 'lucide-react'
import styles from './Features.module.css'

const FEATURES = [
  {
    icon: TrendingUp,
    title: 'Income Tracking',
    description:
      'Log every income source and watch your earning trends over time with clear breakdowns.',
  },
  {
    icon: TrendingDown,
    title: 'Expense Control',
    description:
      'Categorise and monitor spending. Spot where your money goes and cut waste fast.',
  },
  {
    icon: BarChart2,
    title: 'Deep Analytics',
    description:
      'Visualise cash flow, net worth over time, and category distributions in one dashboard.',
  },
  {
    icon: Wallet,
    title: 'Smart Budgets',
    description:
      'Set monthly budget limits per category and get instant feedback on your progress.',
  },
  {
    icon: PiggyBank,
    title: 'Savings Goals',
    description:
      'Define goals, track contributions, and stay motivated with visual progress bars.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by Default',
    description:
      'Your data lives in your own Supabase instance. No ads, no tracking, no third parties.',
  },
]

export function Features() {
  return (
    <section
      id="features"
      className={styles.section}
      aria-labelledby="features-heading"
    >
      <p className={styles.eyebrow} aria-hidden="true">Features</p>
      <h2 id="features-heading" className={styles.heading}>
        Everything you need, nothing you don't
      </h2>
      <p className={styles.subheading}>
        Purpose-built for individuals who want full visibility into their finances
        without the bloat of traditional budgeting apps.
      </p>

      <ul className={styles.grid} role="list">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <li key={title} className={styles.card}>
            <div className={styles.iconWrap} aria-hidden="true">
              <Icon size={22} strokeWidth={1.75} />
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDesc}>{description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
