// The Letter — a full-page screen showing the companion's letter to Francois and James.
// Generated on 15 April after 6pm from all saved Memory Jar entries.
// Saved permanently to localStorage under 'ct_letter'.
// Accessible from the Memory Jar envelope icon and from the LetterPrompt screen.
import styles from './TheLetter.module.css'

// SVG compass rose — small, gold, centered at the foot of the letter
function CompassRose({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line x1="16" y1="2"  x2="16" y2="30" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="2"  y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="5"  y1="5"  x2="27" y2="27" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.35" />
      <line x1="27" y1="5"  x2="5"  y2="27" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.35" />
      <polygon points="16,2 14,14 16,12 18,14" fill="currentColor" fillOpacity="0.9" />
      <polygon points="16,30 14,18 16,20 18,18" fill="currentColor" fillOpacity="0.5" />
      <circle cx="16" cy="16" r="2" fill="currentColor" fillOpacity="0.7" />
    </svg>
  )
}

export default function TheLetter({ onClose }) {
  let letter = null
  try {
    const raw = localStorage.getItem('ct_letter')
    if (raw) letter = JSON.parse(raw)
  } catch {
    // nothing
  }

  // Split the letter into paragraphs — letter text uses double newlines as separators
  const paragraphs = letter
    ? letter.split(/\n\n+/).filter(p => p.trim())
    : []

  // First paragraph is "Dear Francois and James," — render it separately in gold
  const salutation = paragraphs[0] || 'Dear Francois and James,'
  const body = paragraphs.slice(1)

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={onClose} aria-label="Back">
        ← Back
      </button>

      <div className={styles.inner}>
        <div className={styles.envelope}>

          <p className={styles.eyebrow}>A letter from your companion</p>

          <div className={styles.letterBody}>
            <p className={styles.salutation}>{salutation}</p>

            {body.map((para, i) => (
              <p key={i} className={styles.para}>{para}</p>
            ))}

            {!letter && (
              <p className={styles.empty}>
                The letter has not been written yet.{'\n'}
                Return on the evening of 15 April.
              </p>
            )}
          </div>

          <div className={styles.foot}>
            <CompassRose size={28} className={styles.compass} />
            <p className={styles.attribution}>
              Written by your companion. 15 April 2026. Seoul.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
