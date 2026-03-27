// "Add Our Own Place" — lets Francois and James save personal discoveries per trip chapter.
// Places are stored in localStorage keyed by trip ID and persist between sessions.
// Shown as gold-bordered cards visually distinct from the curated location cards.
import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import styles from './CustomPlaces.module.css'

export default function CustomPlaces({ tripId }) {
  const [places, setPlaces] = useLocalStorage(`places-${tripId}`, [])
  const [adding, setAdding]   = useState(false)
  const [form, setForm]       = useState({ name: '', neighbourhood: '', note: '' })

  const save = () => {
    if (!form.name.trim()) return
    setPlaces(prev => [
      ...prev,
      {
        id: Date.now(),
        name:         form.name.trim(),
        neighbourhood: form.neighbourhood.trim(),
        note:         form.note.trim(),
      },
    ])
    setForm({ name: '', neighbourhood: '', note: '' })
    setAdding(false)
  }

  const cancel = () => {
    setForm({ name: '', neighbourhood: '', note: '' })
    setAdding(false)
  }

  const remove = (id) => {
    setPlaces(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className={styles.wrapper}>

      <div className={styles.header}>
        <span className={styles.label}>✦ Your Own Places</span>
        <button
          className={`${styles.addBtn} ${adding ? styles.cancel : ''}`}
          onClick={adding ? cancel : () => setAdding(true)}
        >
          {adding ? 'Cancel' : '+ Add a Place'}
        </button>
      </div>

      {adding && (
        <div className={styles.form}>
          <input
            className={styles.input}
            placeholder="Place name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            autoFocus
          />
          <input
            className={styles.input}
            placeholder="Neighbourhood (optional)"
            value={form.neighbourhood}
            onChange={e => setForm(f => ({ ...f, neighbourhood: e.target.value }))}
          />
          <textarea
            className={styles.textarea}
            placeholder="Your note (optional)"
            value={form.note}
            onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
            rows={3}
          />
          <button className={styles.saveBtn} onClick={save}>
            Save Place
          </button>
        </div>
      )}

      {places.length > 0 && (
        <div className={styles.places}>
          {places.map(place => (
            <div key={place.id} className={styles.place}>
              <div className={styles.placeBody}>
                {place.neighbourhood && (
                  <p className={styles.placeNeighbourhood}>{place.neighbourhood}</p>
                )}
                <p className={styles.placeName}>{place.name}</p>
                {place.note && (
                  <p className={styles.placeNote}>{place.note}</p>
                )}
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => remove(place.id)}
                aria-label={`Remove ${place.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {places.length === 0 && !adding && (
        <p className={styles.empty}>Nothing added yet. Tap + to record a place you loved.</p>
      )}

    </div>
  )
}
