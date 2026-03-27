// Before You Depart checklist — 9 items, each saved to localStorage.
// Accessible from the home screen via a small icon top-left.
import { useLocalStorage } from '../hooks/useLocalStorage'
import styles from './Checklist.module.css'

const ITEMS = [
  {
    id: 'train',
    label: 'Book Gyeongju to Seoul train',
    detail: 'srt.co.kr or letskorail.com. Do this today. SRT to Suseo: ₩41,000. KTX to Seoul: ₩52,000. Seats fill up. Book now.',
  },
  {
    id: 'naver',
    label: 'Download Naver Map on both phones',
    detail: null,
  },
  {
    id: 'kakao',
    label: 'Download Kakao T on both phones',
    detail: null,
  },
  {
    id: 'mfds',
    label: 'Confirm Korea MFDS permit status',
    detail: 'Call Korean Embassy Pretoria if needed: +27 12 460 2508',
  },
  {
    id: 'earrival',
    label: 'Complete Korea e-Arrival Card',
    detail: 'e-arrivalcard.go.kr — within 72 hours of arrival. You land 2 April so complete on 30 March or after.',
  },
  {
    id: 'tmoney',
    label: 'Get T-money cards at Changi Airport',
    detail: 'Before the Singapore to Busan flight. Or buy at Busan Airport arrivals convenience store.',
  },
  {
    id: 'hotels',
    label: 'Print or screenshot hotel confirmation numbers',
    detail: null,
  },
  {
    id: 'charge',
    label: 'Charge all devices fully before departure',
    detail: null,
  },
  {
    id: 'pwa',
    label: 'Install The Curious Traveller on both phones',
    detail: 'From curious-traveller.netlify.app — tap Share → Add to Home Screen',
  },
]

export default function Checklist({ onClose }) {
  const [checked, setChecked] = useLocalStorage('ct_checklist', {})

  const toggle = (id) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const allDone = ITEMS.every(item => checked[item.id])

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={onClose} aria-label="Back to home">
        ← Home
      </button>

      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Before Sunday 30 March</p>
          <h1 className={styles.title}>Before You Depart</h1>
          <p className={styles.subtitle}>Things that cannot wait</p>
        </header>

        <div className={styles.items}>
          {ITEMS.map(item => (
            <button
              key={item.id}
              className={`${styles.item} ${checked[item.id] ? styles.done : ''}`}
              onClick={() => toggle(item.id)}
              aria-pressed={!!checked[item.id]}
            >
              <span className={styles.checkbox} aria-hidden="true">
                {checked[item.id] ? '✓' : ''}
              </span>
              <div className={styles.itemBody}>
                <span className={styles.itemLabel}>{item.label}</span>
                {item.detail && (
                  <span className={styles.itemDetail}>{item.detail}</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {allDone && (
          <p className={styles.allDone}>
            You are ready. Go have the honeymoon of your lives.
          </p>
        )}
      </div>
    </div>
  )
}
