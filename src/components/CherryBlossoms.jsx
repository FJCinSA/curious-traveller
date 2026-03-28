// CherryBlossoms — animated petals falling continuously on 3 April (Jinhae day).
// Fixed overlay, behind all content, pointer-events none.
// 22 petals with seeded-random placement so the layout is consistent across re-renders.
// Respects prefers-reduced-motion — entirely hidden when the user requests reduced motion.
import { useMemo } from 'react'
import styles from './CherryBlossoms.module.css'

const PETAL_COUNT = 22

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
      delay:    r() * 9,                 // 0–9 s animation delay
      duration: 5 + r() * 6,            // 5–11 s to fall
      size:     5 + r() * 7,            // 5–12 px wide
      drift:    (r() - 0.5) * 130,      // horizontal drift in px
      rotate:   360 + r() * 360,         // 360–720 deg total rotation
      opacity:  0.3 + r() * 0.55,       // 0.3–0.85
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
