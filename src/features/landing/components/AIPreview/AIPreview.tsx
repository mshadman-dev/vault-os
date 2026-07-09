/**
 * AIPreview — teaser for future AI-powered financial insights.
 * Fully presentational — no real AI logic.
 */
import { Sparkles } from 'lucide-react'
import styles from './AIPreview.module.css'

export function AIPreview() {
  return (
    <section
      className={styles.section}
      aria-labelledby="ai-heading"
    >
      <div className={styles.inner}>
        {/* Text side */}
        <div>
          <p className={styles.eyebrow} aria-hidden="true">Intelligence</p>
          <h2 id="ai-heading" className={styles.heading}>
            AI insights are on the way
          </h2>
          <p className={styles.body}>
            We're building a natural-language layer on top of your data. Ask questions
            like "how much did I spend on food last month?" and get instant, private
            answers — without sending data to any external AI provider.
          </p>
          <div
            className={styles.comingSoonBadge}
            role="status"
            aria-label="Coming soon feature"
          >
            <span className={styles.comingSoonDot} aria-hidden="true" />
            Coming in a future release
          </div>
        </div>

        {/* Visual side */}
        <div className={styles.visualSide} aria-hidden="true">
          <div className={styles.chatCard}>
            {/* Chat header */}
            <div className={styles.chatHeader}>
              <div className={styles.aiAvatarIcon}>
                <Sparkles size={16} strokeWidth={1.75} />
              </div>
              <div>
                <p className={styles.aiName}>Vault AI</p>
                <p className={styles.aiStatus}>Analysing your data…</p>
              </div>
            </div>

            {/* User message */}
            <div className={styles.msgUser}>
              How much did I spend on food last month?
            </div>

            {/* AI response */}
            <div className={styles.msgAi}>
              You spent <span className={styles.highlight}>$847</span> on food in June —
              that's <span className={styles.highlight}>18% over</span> your $720 budget.
              Dining out accounted for 62% of that.
            </div>

            {/* Typing indicator */}
            <div className={styles.typingDots}>
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
