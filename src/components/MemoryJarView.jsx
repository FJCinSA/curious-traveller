// Memory Jar — every moment they chose to keep, in two layers.
// "What you wrote" — raw, preserved exactly as typed, small cream italic.
// "What it became" — shaped by the companion via API, gold Playfair, larger.
// Long press (600ms) on any memory brings up a delete confirmation.
// After 16 April: "Seventeen days. Every one of them yours."
// After 15 April: envelope icon navigates to The Letter.
import { useState, useRef } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { shapeMemory } from '../lib/anthropic'
import styles from './MemoryJarView.module.css'

const TRIP_END    = '2026-04-16'
const LETTER_DATE = '2026-04-15'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function formatDate(iso) {
  try {
    const d = new Date(iso + 'T12:00:00Z')
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return iso
  }
}

// A single memory card — shows raw + poetic layers, long-press to delete, refresh to regen.
function MemoryCard({ memory, onDelete, onUpdatePoetic }) {
  const pressTimer     = useRef(null)
  const [confirmId, setConfirmId] = useState(null)
  const [regening, setRegening]   = useState(false)

  const startPress = () => {
    pressTimer.current = setTimeout(() => setConfirmId(memory.id), 600)
  }
  const cancelPress = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current)
  }

  const handleRegen = async (e) => {
    e.stopPropagation()
    if (regening) return
    setRegening(true)
    try {
      const poetic = await shapeMemory(memory.text, memory.date, memory.city)
      onUpdatePoetic(memory.id, poetic)
    } catch {
      // Silent fail — keep existing poetic text
    } finally {
      setRegening(false)
    }
  }

  if (confirmId === memory.id) {
    return (
      <div className={styles.memory}>
        <p className={styles.deleteConfirm}>Remove this memory?</p>
        <div className={styles.deleteActions}>
          <button className={styles.deleteYes} onClick={() => onDelete(memory.id)}>Remove</button>
          <button className={styles.deleteNo} onClick={() => setConfirmId(null)}>Keep</button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={styles.memory}
      onPointerDown={startPress}
      onPointerUp={cancelPress}
      onPointerLeave={cancelPress}
    >
      <p className={styles.memDate}>{formatDate(memory.date)}</p>
      <p className={styles.memCity}>{memory.city}</p>

      {/* What it became — the shaped poetic version */}
      {memory.poeticText && (
        <div className={styles.poeticLayer}>
          <p className={styles.layerLabel}>What it became</p>
          <p className={styles.poeticText}>{memory.poeticText}</p>
          <button
            className={`${styles.regenBtn} ${regening ? styles.regenSpinning : ''}`}
            onClick={handleRegen}
            aria-label="Regenerate shaped memory"
            title="Try a different interpretation"
          >
            ↻
          </button>
        </div>
      )}

      {/* What you wrote — always preserved exactly */}
      <div className={styles.rawLayer}>
        {memory.poeticText && <p className={styles.layerLabel}>What you wrote</p>}
        <p className={styles.memText}>{memory.text}</p>
        {/* If no poetic text yet, show the regen button to try fetching it */}
        {!memory.poeticText && (
          <button
            className={`${styles.regenBtn} ${styles.regenInline} ${regening ? styles.regenSpinning : ''}`}
            onClick={handleRegen}
            aria-label="Shape this memory"
            title="Ask your companion to shape this memory"
          >
            {regening ? '↻' : '✦ Shape'}
          </button>
        )}
      </div>
    </div>
  )
}

export default function MemoryJarView({ onClose }) {
  const [memories, setMemories] = useLocalStorage('ct_memories', [])
  const today    = todayISO()
  const tripOver = today > TRIP_END
  const showLetterIcon = today >= LETTER_DATE

  const handleDelete = (id) => {
    setMemories(prev => prev.filter(m => m.id !== id))
  }

  const handleUpdatePoetic = (id, poeticText) => {
    setMemories(prev =>
      prev.map(m => m.id === id ? { ...m, poeticText } : m)
    )
  }

  const handleOpenLetter = () => {
    window.scrollTo(0, 0)
    window.location.hash = 'letter'
  }

  // Sort oldest first
  const sorted = [...memories].sort((a, b) => (a.date > b.date ? 1 : -1))

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={onClose} aria-label="Back to home">
        ← Home
      </button>

      {/* Letter icon — only visible from 15 April */}
      {showLetterIcon && (
        <button
          className={styles.letterBtn}
          onClick={handleOpenLetter}
          aria-label="Read our letter"
          title="Our letter from the companion"
        >
          ✉
        </button>
      )}

      <div className={styles.inner}>
        <header className={styles.header}>
          {tripOver && (
            <p className={styles.epilogue}>Seventeen days. Every one of them yours.</p>
          )}
          <p className={styles.eyebrow}>Memory Jar</p>
          <h1 className={styles.title}>Every moment you chose to keep.</h1>
        </header>

        {sorted.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>
              After 6pm each evening, open the chapter you are in and write down one moment. They will all appear here.
            </p>
          </div>
        ) : (
          <div className={styles.memories}>
            {sorted.map(memory => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                onDelete={handleDelete}
                onUpdatePoetic={handleUpdatePoetic}
              />
            ))}
            <p className={styles.holdHint}>Hold a memory to remove it.</p>
          </div>
        )}
      </div>
    </div>
  )
}
