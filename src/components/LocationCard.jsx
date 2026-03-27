import { useState } from 'react'
import styles from './LocationCard.module.css'

export default function LocationCard({ location, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      className={styles.card}
      style={{ '--accent': location.accent, '--grad': location.gradient }}
    >
      <div className={styles.cardInner}>
        {/* Left: time + number */}
        <div className={styles.meta}>
          <span className={styles.time}>{location.time}</span>
          <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
        </div>

        {/* Right: content */}
        <div className={styles.body}>
          <div className={styles.header}>
            <div>
              <p className={styles.neighbourhood}>{location.neighbourhood}</p>
              <h3 className={styles.name}>{location.name}</h3>
            </div>
            <div className={styles.accentBar} />
          </div>

          {/* WOW FACT — always visible */}
          <div className={styles.wow}>
            <span className={styles.wowLabel}>WOW</span>
            <p className={styles.wowText}>{location.wow}</p>
          </div>

          {/* History — always visible, subtle */}
          <p className={styles.history}>{location.history}</p>

          {/* Expandable: what to do + practical */}
          <button
            className={styles.toggle}
            onClick={() => setExpanded(e => !e)}
            aria-expanded={expanded}
          >
            <span>{expanded ? 'Less' : 'What to do'}</span>
            <span className={styles.toggleIcon} style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              ↓
            </span>
          </button>

          {expanded && (
            <div className={styles.details}>
              <ul className={styles.doList}>
                {location.do.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className={styles.practical}>
                <span className={styles.practicalLabel}>Practical</span>
                {location.practical}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Background gradient strip */}
      <div className={styles.gradientStrip} />
    </article>
  )
}
