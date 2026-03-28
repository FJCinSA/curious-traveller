// NavDrawer — slide-in menu from the right.
// Accessed via the hamburger icon (top right of home screen).
// Houses all navigation and settings that were previously cluttering the top bar.
import { useSlowTravel } from '../context/SlowTravelContext'
import styles from './NavDrawer.module.css'

export default function NavDrawer({
  open,
  onClose,
  onOpenChecklist,
  onOpenJourney,
  onOpenMemoryJar,
  memoriesCount,
}) {
  const { slowTravel, setSlowTravel } = useSlowTravel()

  if (!open) return null

  // Close the drawer first, then open the feature
  function go(handler) {
    onClose()
    handler()
  }

  return (
    <>
      {/* Tap outside to close */}
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />

      <div className={styles.drawer} role="dialog" aria-modal="true" aria-label="Navigation menu">

        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>Menu</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            ×
          </button>
        </div>

        <nav className={styles.menu}>

          <button className={styles.menuItem} onClick={() => go(onOpenChecklist)}>
            <span className={styles.menuIcon} aria-hidden="true">✦</span>
            <span className={styles.menuLabel}>Before You Leave</span>
          </button>

          <button className={styles.menuItem} onClick={() => go(onOpenJourney)}>
            <span className={styles.menuIcon} aria-hidden="true">✦</span>
            <span className={styles.menuLabel}>Journey Tracker</span>
          </button>

          <button className={styles.menuItem} onClick={() => go(onOpenMemoryJar)}>
            <span className={styles.menuIcon} aria-hidden="true">✦</span>
            <span className={styles.menuLabel}>Memory Jar</span>
            {memoriesCount > 0 && (
              <span className={styles.menuBadge}>{memoriesCount}</span>
            )}
          </button>

          <div className={styles.divider} />

          {/* Slow travel toggle — inline, no navigation */}
          <div className={styles.toggleRow}>
            <span className={`${styles.menuIcon} ${slowTravel ? styles.menuIconGlow : ''}`} aria-hidden="true">✦</span>
            <span className={styles.toggleLabel}>Slow Travel Mode</span>
            <label className={styles.toggle} aria-label={slowTravel ? 'Slow travel on' : 'Slow travel off'}>
              <input
                type="checkbox"
                className={styles.toggleInput}
                checked={slowTravel}
                onChange={e => setSlowTravel(e.target.checked)}
              />
              <span className={styles.toggleSlider} />
            </label>
          </div>

          <div className={styles.divider} />

        </nav>

        {/* About — static, at the bottom of the drawer */}
        <div className={styles.about}>
          <p className={styles.aboutLabel}>About This App</p>
          <p className={styles.aboutText}>
            A wise and patient companion for the curious traveller.
            Built with care for Francois &amp; James · March 2026.
          </p>
        </div>

      </div>
    </>
  )
}
