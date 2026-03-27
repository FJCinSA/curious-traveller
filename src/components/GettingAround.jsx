// Collapsible "Getting Around" panel — shown inside every trip chapter.
// Renders from trip.transport: headline, optional warning, optional Maps & Apps section,
// a list of transport tips (icon + title + body), and an optional closing note.
// Korean chapters include a Maps & Apps section with Naver Maps and Kakao Taxi info.
// Busan (first Korean chapter) includes a prominent pre-arrival download reminder.
import { useState } from 'react'
import styles from './GettingAround.module.css'

export default function GettingAround({ transport }) {
  const [open, setOpen] = useState(false)

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

          {/* Maps & Apps section — shown on Korean chapters */}
          {transport.mapsAndApps && (
            <div className={styles.mapsSection}>

              {/* Pre-arrival download reminder — Busan only */}
              {transport.mapsAndApps.downloadReminder && (
                <div className={styles.downloadReminder}>
                  <span className={styles.reminderIcon}>📱</span>
                  <p>{transport.mapsAndApps.downloadReminder}</p>
                </div>
              )}

              <div className={styles.appCards}>
                {transport.mapsAndApps.apps.map(app => (
                  <div key={app.name} className={styles.appCard}>
                    <div className={styles.appHeader}>
                      <strong className={styles.appName}>{app.name}</strong>
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.appLink}
                      >
                        Open ↗
                      </a>
                    </div>
                    <p className={styles.appDescription}>{app.description}</p>
                    <p className={styles.appNote}>{app.note}</p>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Transport tips */}
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

          {/* Closing line — Korean chapters end with "If you get lost" */}
          {transport.closing && (
            <p className={styles.closing}>{transport.closing}</p>
          )}

        </div>
      )}

    </div>
  )
}
