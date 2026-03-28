// CherryBlossoms — animated petals falling continuously on 3 April (Jinhae day).
// Fixed overlay, behind all content, pointer-events none.
// 22 petals with seeded-random placement so the layout is consistent across re-renders.
// Respects prefers-reduced-motion — entirely hidden when the user requests reduced motion.
import { useMemo } from 'react'
import styles from './CherryBlossoms.module.css'

const PETAL_COUNT = 6

// Deterministic PRNG — same seed → same petals every render
function makeRand(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export default function CherryBlossoms() {
  const petals = useMemo(() => {
    const r = makeRand(42)
    return Array.from({ length: PETAL_COUNT }, (_, i) => ({
      id: i,
      left:     r() * 100,               // % across viewport
      delay:    r() * 18,                // 0–18 s — spread far apart
      duration: 10 + r() * 8,           // 10–18 s to fall — very slow
      size:     4 + r() * 5,            // 4–9 px wide — smaller
      drift:    (r() - 0.5) * 80,       // gentle horizontal drift
      rotate:   180 + r() * 180,         // half rotation — subtle
      opacity:  0.15 + r() * 0.2,       // 0.15–0.35 — barely there
      pink:     r() > 0.45,             // pink vs soft white
    }))
  }, [])

  return (
    <div className={styles.layer} aria-hidden="true">
      {petals.map(p => (
        <span
          key={p.id}
          className={`${styles.petal} ${p.pink ? styles.pink : styles.white}`}
          style={{
            left:              `${p.left}%`,
            width:             `${p.size}px`,
            height:            `${p.size * 0.68}px`,
            animationDuration: `${p.duration}s`,
            animationDelay:    `${p.delay}s`,
            '--drift':         `${p.drift}px`,
            '--rotate':        `${p.rotate}deg`,
            opacity:           p.opacity,
          }}
        />
      ))}
    </div>
  )
}
