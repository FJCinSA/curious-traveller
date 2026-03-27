// Collapsible "Getting Around" panel — shown inside every trip chapter.
// Renders transport tips from trip.transport: headline, optional warning banner,
// a list of tips (icon + title + body), and an optional closing note.
// Korea chapters include T-money first, Naver Maps, Kakao Taxi, and the "If you get lost" line.
import { useState } from 'react'
import styles from './GettingAround.module.css'

export default function GettingAround({ transport }) {
  const [open, setOpen] = useState(false)

  // Nothing to show if the trip has no transport data
  if (!transport) return null

  return (
    <div className={styles.wrapper}>

      <button
        className={`${styles.toggle} ${open ? styles.open : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        <span className={styles.toggleIcon}>✦</span>
        <span className={styles.toggleLabel}>Getting Around</span>
        <span className={styles.toggleChevron}>{open ? '↑' : '↓'}</span>
      </button>

      {open && (
        <div className={styles.panel}>

          <h3 className={styles.headline}>{transport.headline}</h3>

          {/* Prominent warning — used for Jinhae taxi timing */}
          {transport.warning && (
            <div className={styles.warning}>
              <span className={styles.warningIcon}>⚠</span>
              <p>{transport.warning}</p>
            </div>
          )}

          <div className={styles.tips}>
            {transport.tips.map((tip, i) => (
              <div key={i} className={styles.tip}>
                <span className={styles.tipIcon}>{tip.icon}</span>
                <div className={styles.tipContent}>
                  <strong className={styles.tipTitle}>{tip.title}</strong>
                  <p className={styles.tipBody}>{tip.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing line — Korea chapters end with "If you get lost" */}
          {transport.closing && (
            <p className={styles.closing}>{transport.closing}</p>
          )}

        </div>
      )}

    </div>
  )
}
