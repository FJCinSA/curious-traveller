// Memory Jar — a beautiful screen showing every moment they chose to keep.
// Memories are stored in localStorage under 'ct_memories'.
// Long press (600ms) on a memory brings up a delete confirmation.
// After 16 April shows: "Seventeen days. Every one of them yours."
import { useState, useRef } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import styles from './MemoryJarView.module.css'

const TRIP_END = '2026-04-16'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function formatDate(iso) {
  // e.g. "2026-04-03" → "3 April 2026"
  try {
    const d = new Date(iso + 'T12:00:00Z')
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return iso
  }
}

function MemoryCard({ memory, onDelete }) {
  const pressTimer = useRef(null)
  const [confirmId, setConfirmId] = useState(null)

  const startPress = () => {
    pressTimer.current = setTimeout(() => setConfirmId(memory.id), 600)
  }
  const cancelPress = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current)
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
      <p className={styles.memText}>{memory.text}</p>
    </div>
  )
}

export default function MemoryJarView({ onClose }) {
  const [memories, setMemories] = useLocalStorage('ct_memories', [])
  const today = todayISO()
  const tripOver = today > TRIP_END

  const handleDelete = (id) => {
    setMemories(prev => prev.filter(m => m.id !== id))
  }

  // Sort oldest first
  const sorted = [...memories].sort((a, b) => (a.date > b.date ? 1 : -1))

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={onClose} aria-label="Back to home">
        ← Home
      </button>

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
              <MemoryCard key={memory.id} memory={memory} onDelete={handleDelete} />
            ))}
            <p className={styles.holdHint}>Hold a memory to remove it.</p>
          </div>
        )}
      </div>
    </div>
  )
}
